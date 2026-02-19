import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const date = new Date();
    date.setUTCHours(0, 0, 0, 0);
    await prisma.logTraffic.upsert({
      where: {
        date: date,
      },
      create: {
        date: date,
      },
      update: {
        views: {
          increment: 1,
        },
      },
    });
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
