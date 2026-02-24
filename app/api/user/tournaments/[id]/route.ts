import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getTournamentStatus } from "@/lib/getTournamentStatus";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      throw Error();
    }
    const tournament = await prisma.tournament.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        category: true,
        startTime: true,
        durationPerQ: true,
        totalQuestions: true,
        windowOpenTime: true,
        endTime: true,
        entryFee: true,
        prizePool: true,
        totalSeats: true,
        winningSeats: true,
        difficulty: true,
        _count: { select: { registration: true } },
      },
    });
    if(!tournament){
      throw Error("Tournament Not Found!");
    }
    const recommendedTournaments = await prisma.tournament.findMany({
      where: { NOT: { id: id },categoryId: tournament.category.id, },
      select: {
        id: true,
        title: true,
        category: true,
        startTime: true,
        durationPerQ: true,
        totalQuestions: true,
        windowOpenTime: true,
        endTime: true,
        entryFee: true,
        prizePool: true,
        totalSeats: true,
        winningSeats: true,
        difficulty: true,
        _count: { select: { registration: true } },
      },
    });
    const formatted = ({
      winningSeats,
      entryFee,
      prizePool,
      _count,
      ...rest
    }: any) => ({
      ...rest,
      winningSeats,
      prizePool: Math.round(prizePool),
      entryFee: Math.round(entryFee),
      status: getTournamentStatus({ ...rest }),
      seatsLeft: rest.totalSeats - winningSeats - _count.registration,
    });
    const finalRecommendations = recommendedTournaments.map(
      ({ winningSeats, entryFee, prizePool, _count, ...rest }: any) => ({
        ...rest,
        winningSeats,
        prizePool: Math.round(prizePool),
        entryFee: Math.round(entryFee),
        status: getTournamentStatus({ ...rest }),
        seatsLeft: rest.totalSeats - winningSeats - _count.registration,
      })
    );

    return NextResponse.json(
      {
        success: true,
        tournament: formatted(tournament),
        recommendations: finalRecommendations,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
