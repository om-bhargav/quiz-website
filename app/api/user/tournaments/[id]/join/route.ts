import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkUser } from "@/lib/checkAuth";
import { getTournamentStatus } from "@/lib/getTournamentStatus";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await checkUser();
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id: tournamentId } = await params;

    const exist = await prisma.tournament.findUnique({
      where: { id: tournamentId },
      include: {
        questions: {
          orderBy: { text: "asc" },
          include: {
            options: {
              select: { id: true, text: true }
            }
          },
        },
      },
    });

    if (!exist) {
      return NextResponse.json({ success: false, message: "Tournament Not Found" }, { status: 404 });
    }
    const tournament = {...exist,status: getTournamentStatus(exist)}
    const registration = await prisma.registration.findUnique({
      where: { userId_tournamentId: { userId, tournamentId } }
    });
    
    if (!registration || !registration.hasPaid) {
      return NextResponse.json({ success: false, message: "Not registered" }, { status: 403 });
    }

    const now = new Date();
    const startTime = new Date(tournament.startTime);

    if (now < startTime) {
      return NextResponse.json({
        success: true,
        status: "WAITING",
        message: "Tournament has not started yet",
        startTime: tournament.startTime,
      }, { status: 200 });
    }

    if (tournament.status === "COMPLETED") {
      return NextResponse.json({
        success: true,
        status: "FINISHED",
        message: "Tournament has ended",
        startTime: tournament.startTime,
      }, { status: 200 });
    }

    if (tournament.status === "PUBLISHED" && now >= tournament.startTime) {

      tournament.status = "LIVE"; 
    }

    const userResponses = await prisma.userResponse.findMany({
      where: {
        userId: userId,
        questionId: { in: tournament.questions.map(q => q.id) }
      },
      select: { questionId: true, optionId: true }
    });

    return NextResponse.json({
      success: true,
      status: "LIVE",
      tournament: {
        id: tournament.id,
        title: tournament.title,
        status: "LIVE",
        startTime: tournament.startTime,
        durationPerQ: tournament.durationPerQ,
        totalQuestions: tournament.totalQuestions,
        questions: tournament.questions
      },
      userAnswers: userResponses
    }, { status: 200 });

  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}