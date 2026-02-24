import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateExactBotNames } from "@/lib/botGenerator";
import { getTournamentStatus } from "@/lib/getTournamentStatus";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: tournamentId } = await params;

    const exist = await prisma.tournament.findUnique({ where: { id: tournamentId } });
    if (!exist) return NextResponse.json({ success: false, message: "Tournament not found" }, { status: 404 });
    const tournament = {...exist,status: getTournamentStatus(exist)}
    if (tournament.leaderboardCalculated) {
      return NextResponse.json({ success: false, message: "Leaderboard Already Calculated!" }, { status: 400 });
    }

    const topHuman = await prisma.registration.findFirst({
      where: { tournamentId, hasPaid: true },
      orderBy: [
        { score: 'desc' },
        { totalTime: 'asc' }
      ]
    });

    let currentScoreToBeat = topHuman ? topHuman.score : 0;
    let currentTimeToBeat = topHuman ? topHuman.totalTime : (tournament.totalQuestions * 5);
    
    let botNames: string[] = [];
    if (tournament.winningSeats > 0) {
        try {
            botNames = await generateExactBotNames(tournament.winningSeats);
        } catch {
           return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
        }
    }

    const botsReversed = [];
    
    for (let i = tournament.winningSeats - 1; i >= 0; i--) {
        const name = botNames[i];
        
        let newScore = currentScoreToBeat;
        let newTime = currentTimeToBeat;

        const canIncreaseScore = currentScoreToBeat < tournament.totalQuestions;
        const shouldBumpScore = currentScoreToBeat === 0 || (canIncreaseScore && Math.random() > 0.6);

        if (shouldBumpScore) {
            newScore = currentScoreToBeat + 1;
            newTime = currentTimeToBeat + (Math.random() * 5); 

        } 
        else {
            const shave = currentTimeToBeat > 10  ? (Math.random() * 2 + 1) : (Math.random() * 0.4 + 0.1);
            newTime = currentTimeToBeat - shave;
        }

        if (newTime < 1) newTime = 1 + (Math.random() * 0.5); 

        
        if (newScore === currentScoreToBeat && newTime >= currentTimeToBeat) {
             newTime = currentTimeToBeat - 0.1; 
        }

        botsReversed.push({
            tournamentId,
            name,
            score: newScore,
            timeTaken: Number(newTime.toFixed(2)),
            rank: i + 1 
        });

        currentScoreToBeat = newScore;
        currentTimeToBeat = newTime;
    }

    const botsToCreate = botsReversed.reverse();

    await prisma.$transaction(async (tx) => {

        if (botsToCreate.length > 0) {
            await tx.bots.createMany({ data: botsToCreate });
        }

        const allHumans = await tx.registration.findMany({
            where: { tournamentId, hasPaid: true },
            orderBy: [{ score: 'desc' }, { totalTime: 'asc' }]
        });

        const startRank = botsToCreate.length + 1;
        
        await Promise.all(allHumans.map((human, i) => 
            tx.registration.update({
                where: { id: human.id },
                data: { rank: startRank + i }
            })
        ));
        await tx.tournament.update({
            where:{
                id: tournamentId
            },
            data:{
                leaderboardCalculated: true
            }
        })
    });
    return GET_LEADERBOARD(tournamentId);

  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}

async function GET_LEADERBOARD(tournamentId: string) {
    const [bots, humans] = await Promise.all([
        prisma.bots.findMany({ where: { tournamentId }, orderBy: { rank: 'asc' } }),
        prisma.registration.findMany({
            where: { tournamentId, hasPaid: true },
            orderBy: { rank: 'asc' }, 
            include: { user: { select: { name: true, image: true } } }
        })
    ]);

    const leaderboard = [
        ...bots.map(b => ({
            rank: b.rank,
            name: b.name,
            score: b.score,
            time: b.timeTaken
        })),
        ...humans.map(h => ({
            rank: h.rank,
            name: h.user.name,
            score: h.score,
            time: h.totalTime
        }))
    ];

    return NextResponse.json({ success: true, leaderboard });
}