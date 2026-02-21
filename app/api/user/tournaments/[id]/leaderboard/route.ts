import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getTournamentStatus } from "@/lib/getTournamentStatus";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: tournamentId } = await params;

    const exist = await prisma.tournament.findUnique({
      where: { id: tournamentId }
    });

    if (!exist) {
      return NextResponse.json({ success: false, message: "Tournament not found" }, { status: 404 });
    }
    const tournament = {...exist,status: getTournamentStatus(exist)};

    if (tournament.status !== "COMPLETED") {
      return NextResponse.json({ success: false, message: "Tournament not completed" }, { status: 400 });
    }

    const [bots, humans] = await Promise.all([
      prisma.bots.findMany({
        where: { tournamentId },
        orderBy: { rank: 'asc' }
      }),
      prisma.registration.findMany({
        where: { tournamentId, hasPaid: true },
        orderBy: { rank: 'asc' },
        take: 50,  // Limit to 50
        include: {
          user: { select: { name: true, image: true } }
        }
      })
    ]);

    const leaderboard = [
      ...bots.map(b => ({
        rank: b.rank,
        name: b.name,
        score: b.score,
        time: b.timeTaken.toFixed(2),
      })),
      ...humans.map(h => ({
        rank: h.rank,
        name: h.user.name,
        score: h.score,
        time: h.totalTime.toFixed(2),
      }))
    ];

    return NextResponse.json({ success: true, leaderboard }, { status: 200 });

  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}