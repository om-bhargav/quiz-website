import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const filter = searchParams.get("filter");
    const search = searchParams.get("search");
    const categoryId = searchParams.get("categoryId");

    const whereClause: any = { 
      status: { in: ["PUBLISHED", "LIVE"] }
    };

    if (search) {
      whereClause.title = {
        contains: search,
        mode: "insensitive",
      };
    }

    if (categoryId) {
      whereClause.categoryId = categoryId;
    }

    
    if (filter === "upcoming") {
      whereClause.startTime = { gt: new Date() };
    } else if (filter === "live") {
      whereClause.status = "LIVE";
    }

    const tournaments = await prisma.tournament.findMany({
      where: whereClause,
      orderBy: { startTime: "asc" },
      select: {
        id: true,
        title: true,
        category: true,
        startTime: true,
        windowOpenTime: true,
        entryFee: true,
        prizePool: true,
        totalSeats: true,
        winningSeats: true,
        difficulty: true,
        status: true,
        _count: { select: { registration: true } }
      }
    });

    const formatted = tournaments.map(({ winningSeats, _count, ...rest }) => ({
      ...rest,
      seatsLeft: (rest.totalSeats - winningSeats) - _count.registration
    }));

    return NextResponse.json({ success: true, tournaments: formatted }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}