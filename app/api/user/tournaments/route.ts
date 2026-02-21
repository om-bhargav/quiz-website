import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getTournamentStatus } from "@/lib/getTournamentStatus";
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const filter = searchParams.get("filter");
    const search = searchParams.get("search");
    const categoryId = searchParams.get("categoryId");
    const defaultStatus = ["LIVE","PUBLISHED"];
    if (filter) {
      defaultStatus.push(filter);
    }
    const whereClause: any = {};

    if (search) {
      whereClause.title = {
        contains: search,
        mode: "insensitive",
      };
    }

    if (categoryId) {
      whereClause.categoryId = categoryId;
    }

    const tournaments = await prisma.tournament.findMany({
      where: whereClause,
      orderBy: { startTime: "asc" },
      select: {
        id: true,
        title: true,
        category: true,
        startTime: true,
        endTime: true,
        windowOpenTime: true,
        entryFee: true,
        prizePool: true,
        totalSeats: true,
        winningSeats: true,
        difficulty: true,
        _count: { select: { registration: true } },
      },
    });
    const formatted = tournaments
      ?.map(({ winningSeats, _count, ...rest }) => ({
        ...rest,
        status: getTournamentStatus({ ...rest }),
        seatsLeft: rest.totalSeats - winningSeats - _count.registration,
      }))
      ?.filter((tournament) => defaultStatus.includes(tournament.status));
    return NextResponse.json(
      { success: true, tournaments: formatted },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
