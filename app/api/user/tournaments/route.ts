import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getTournamentStatus } from "@/lib/getTournamentStatus";
import { Prisma, Tournament } from "@prisma/client";
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const filter = searchParams.get("filter");
    const search = searchParams.get("search");
    const categoryId = searchParams.get("categoryId");
    const cursor = searchParams.get("cursor");
    const subCategoryId = searchParams.get("subCategoryId");
    const limit = parseInt(searchParams.get("limit") || "10");
    const defaultStatus = ["LIVE", "PUBLISHED"];
    const Timenow = new Date();
    let isNextPage = false;
    let nextCursor = null;
    if (filter) {
      defaultStatus.push(filter);
    }
    const whereClause: Prisma.TournamentWhereInput = {};

    if (search) {
      whereClause.title = {
        contains: search,
        mode: "insensitive",
      };
    }

    if (categoryId) {
      whereClause.categoryId = categoryId;
    }
    if (subCategoryId) {
      whereClause.subCategoryId = subCategoryId;
    }
    
    const tournaments = await prisma.tournament.findMany({
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      where: {
        ...whereClause,
        AND:[
          {windowOpenTime: {lte: Timenow}},
          {endTime: {gte: Timenow}}
        ]
      },
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
    if(tournaments.length > limit){
      const lastItem = tournaments.pop();
      nextCursor = lastItem!.id;
    }
    const formatted = tournaments
      ?.map(({ winningSeats, entryFee, prizePool, _count, ...rest }) => ({
        ...rest,
        prizePool: Math.round(prizePool),
        entryFee: Math.round(entryFee),
        status: getTournamentStatus({ ...rest }),
        seatsLeft: rest.totalSeats - winningSeats - _count.registration,
      }))
      ?.filter((tournament) => defaultStatus.includes(tournament.status));
    return NextResponse.json(
      { success: true, tournaments: formatted,isLeft: isNextPage, nextCursor },
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
