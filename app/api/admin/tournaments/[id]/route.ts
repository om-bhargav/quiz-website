import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdmin } from "@/lib/checkAuth";
import z from "zod";
import { generateExactQuestions } from "@/lib/quizGenerator";

export async function GET( req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await checkAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Admin access required" }, { status: 403 });
    }

    const { id: tournamentId } = await params;

    const tournament = await prisma.tournament.findUnique({
      where: { id: tournamentId },
      include: {
        questions: { include: { options: true } },
        category: true
      }
    });

    if (!tournament) {
      return NextResponse.json({ success: true, message: "Tournament not found" }, { status: 404 });
    }

    return NextResponse.json({ success: false, tournament }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}

const updateTournamentSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().optional(),
  categoryId: z.string().min(1).optional(),
  startTime: z.string().transform((str) => new Date(str)).optional(),
  windowOpenTime: z.string().transform((str) => new Date(str)).optional(),
  durationPerQ: z.number().min(5).optional(),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]).optional(),
  entryFee: z.number().min(0).optional(),
  prizePool: z.number().min(0).optional(),
  totalQuestions: z.number().min(1).optional(),
  totalSeats: z.number().min(2).optional(),
  winningSeats: z.number().min(0).optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "LIVE", "COMPLETED"]).optional(),
});

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await checkAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Admin access required" }, { status: 403 });
    }

    const { id: tournamentId } = await params;
    const body = await req.json();

    const validation = updateTournamentSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ success: false, message: "Validation Error", errors: validation.error.flatten().fieldErrors }, { status: 400 });
    }

    const data = validation.data;

    if (data.startTime && data.windowOpenTime) {
      if (data.windowOpenTime >= data.startTime) {
        return NextResponse.json({ success: false, message: "Window Open Time must be BEFORE Start Time" }, { status: 400 });
      }
    }

    const currentTournament = await prisma.tournament.findUnique({ 
      where: { id: tournamentId },
      include: { 
        category: true, 
        questions: { select: { id: true } } 
      }
    });

    if (!currentTournament) {
      return NextResponse.json({ success: false, message: "Tournament not found" }, { status: 404 });
    }

    const finalTotalSeats = data.totalSeats ?? currentTournament.totalSeats;
    const finalWinningSeats = data.winningSeats ?? currentTournament.winningSeats;

    if (finalWinningSeats >= finalTotalSeats) {
        return NextResponse.json({ success: false, message: `Winning seats (${finalWinningSeats}) must be less than Total seats (${finalTotalSeats})` }, { status: 400 });
    }

    if (data.totalQuestions && data.totalQuestions !== currentTournament.questions.length) {
      const difference = data.totalQuestions - currentTournament.questions.length;

      if (difference > 0) {
        try {
          const newQuestions = await generateExactQuestions({
            title: data.title || currentTournament.title,
            description: data.description || currentTournament.description || "",
            category: currentTournament.category.name,
            difficulty: data.difficulty || currentTournament.difficulty,
            count: difference 
          });

          for (const q of newQuestions) {
            await prisma.question.create({
              data: {
                text: q.text,
                tournamentId: tournamentId,
                options: { create: q.options },
              },
            });
          }
        } catch {
          return NextResponse.json({ success: false, message: "Failed to generate extra questions" }, { status: 500 });
        }
      } 
      else if (difference < 0) {
        const countToRemove = Math.abs(difference);
        const toRemove = currentTournament.questions.slice(-countToRemove).map(q => q.id);
        await prisma.question.deleteMany({ where: { id: { in: toRemove } } });
      }
    }
    
    const updatedTournament = await prisma.tournament.update({
      where: { id: tournamentId },
      data: {
        title: data.title,
        description: data.description,
        categoryId: data.categoryId,
        startTime: data.startTime,
        windowOpenTime: data.windowOpenTime,
        durationPerQ: data.durationPerQ,
        difficulty: data.difficulty,
        entryFee: data.entryFee,
        prizePool: data.prizePool,
        status: data.status,
        totalQuestions: data.totalQuestions,
        totalSeats: data.totalSeats,
        winningSeats: data.winningSeats,
      },
    });

    return NextResponse.json({ success: true, message: "Tournament updated successfully", tournament: updatedTournament }, { status: 200 });

  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE( req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await checkAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Admin access required" }, { status: 403 });
    }

    const { id: tournamentId } = await params;

    const tournament = await prisma.tournament.findUnique({ where: { id: tournamentId }});

    if (!tournament) {
      return NextResponse.json({ success: true, message: "Tournament not found" }, { status: 404 });
    }

    await prisma.tournament.delete({ where: { id: tournamentId }});

    return NextResponse.json({ success: true, message: "Tournament deleted successfully" }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}