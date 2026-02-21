import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkUser } from "@/lib/checkAuth";
import { getTournamentStatus } from "@/lib/getTournamentStatus";

export async function GET() {
  try {
    const userId = await checkUser();
    if (!userId){
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 404 });
    }

    const history = await prisma.registration.findMany({
      where: { userId, hasPaid: true },
      orderBy: { createdAt: "desc" },
      include: {
        tournament: {
          select: {
            id: true,
            title: true,
            totalQuestions: true,
            startTime: true,
            endTime: true,
            windowOpenTime: true
          }
        }
      }
    });

    const formattedHistory = history.map(record => ({
      tournamentId: record.tournament.id,
      title: record.tournament.title,
      status: getTournamentStatus(record.tournament),
      score: `${record.score}/${record.tournament.totalQuestions}`,
      timeTaken: record.totalTime.toFixed(2) + "s",
      rank: record.rank ? `${record.rank}` : "Pending",
      date: record.createdAt
    }));

    return NextResponse.json({ success: true, history: formattedHistory });

  } catch (e) {
    console.log(e);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}