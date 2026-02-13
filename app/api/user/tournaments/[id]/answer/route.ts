import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkUser } from "@/lib/checkAuth";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await checkUser();
    if (!userId){
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 404 });
    }

    const { id: tournamentId } = await params;
    const { questionId, optionId, timeTaken } = await req.json();

    const tournament = await prisma.tournament.findUnique({ where: { id: tournamentId } });
    if (!tournament) return NextResponse.json({ success: false, message: "Tournament not found" }, { status: 404 });

    if (tournament.status === "COMPLETED"){
      return NextResponse.json({ success: false, message: "Tournament completed" }, { status: 400 });
    }

    const question = await prisma.question.findUnique({ 
      where: { id: questionId },
      include: { options: true }
    });

    if (!question || question.tournamentId !== tournamentId) return NextResponse.json({ success: false, message: "Question not found" }, { status: 404 });

    const selectedOption = question.options.find(o => o.id === optionId);
    if (!selectedOption) return NextResponse.json({ success: false, message: "Option not found" }, { status: 404 });

    const isCorrect = selectedOption.isCorrect;

    const existingResponse = await prisma.userResponse.findUnique({ where: { userId_questionId: { userId, questionId } } });
    if (existingResponse) return NextResponse.json({ success: false, message: "Answer already submitted" }, { status: 400 });

    await prisma.$transaction([

      prisma.userResponse.create({
        data: {
          userId: userId,
          questionId,
          optionId,
          isCorrect,
          timeTaken: Number(timeTaken)
        }
      }),

      prisma.registration.update({
        where: { userId_tournamentId: { userId: userId, tournamentId } },
        data: {
          score: isCorrect ? { increment: 1 } : undefined,
          totalTime: { increment: Number(timeTaken) }
        }
      })
    ]);

    return NextResponse.json({ success: true, message: "Answer submitted successfully" }, { status: 200 });

  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}