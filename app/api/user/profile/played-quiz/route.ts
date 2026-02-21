import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkUser } from "@/lib/checkAuth";
import z from "zod";
import { getTournamentStatus } from "@/lib/getTournamentStatus";

export async function GET() {
  try {
    const userId = await checkUser();
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        _count: {
          select: {
            registration: {
              where: {
                status: {
                  equals: "PLAYED",
                },
              },
            },
          },
        },
        registration: {
          where: {
            status: {
              equals: "PLAYED",
            },
          },
          include: {
            tournament: {
              select: {
                id: true,
                title: true,
                startTime: true,
                totalQuestions: true,
                prizePool: true,
                endTime: true,
                windowOpenTime: true,
              },
            },
          },
        },
      },
    });
    const quizInfo = user?.registration?.filter(
      (quiz) => getTournamentStatus(quiz.tournament) === "COMPLETED"
    );
    const response = {
      playedQuiz: quizInfo?.length,
      quizInfo,
    };
    return NextResponse.json(
      { success: true, data: response },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
