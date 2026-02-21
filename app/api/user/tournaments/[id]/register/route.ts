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

    const [tournament, wallet] = await Promise.all([
      prisma.tournament.findUnique({
        where: { id: tournamentId },
        include: { _count: { select: { registration: true } } }
      }),
      prisma.wallet.findUnique({ where: { userId } })
    ]);

    if (!tournament) return NextResponse.json({ success: false, message: "Tournament Not Found" }, { status: 404 });
    if (!wallet) return NextResponse.json({ success: false, message: "Wallet error" }, { status: 400 });

    const now = new Date();
    if (now < tournament.windowOpenTime) {
      return NextResponse.json({ success: false, message: "Registration is not open yet" }, { status: 400 });
    }

    const registrationDeadline = new Date(tournament.startTime.getTime());

    if (now > registrationDeadline) {
      return NextResponse.json({ success: false, message: "Registration closed (Must join 15 mins before start)" }, { status: 400 });
    }

    const existing = await prisma.registration.findUnique({
      where: { userId_tournamentId: { userId, tournamentId } }
    });

    if (existing) return NextResponse.json({ success: false, message: "Already joined" }, { status: 409 });

    // check if tournament is full
    const maxRealPlayers = tournament.totalSeats - tournament.winningSeats;
    if (tournament._count.registration >= maxRealPlayers) {
      return NextResponse.json({ success: false, message: "No real players left" }, { status: 400 });
    }

    // check tokens
    if (wallet.balance < tournament.entryFee) {
      return NextResponse.json({ success: false, message: "Insufficient Tokens" }, { status: 402 });
    }

    await prisma.$transaction([

      prisma.wallet.update({
        where: { userId },
        data: { balance: { decrement: tournament.entryFee } }
      }),

      prisma.tokenHistory.create({
        data: {
          walletId: wallet.id,
          amount: -tournament.entryFee,
          type: "ENTRY_FEE",
          description: `Joined ${tournament.title}`
        }
      }),

      prisma.registration.create({
        data: { userId, tournamentId, hasPaid: true }
      })
    ]);

    return NextResponse.json({ success: true, message: "Joined successfully" }, { status: 200 });

  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}