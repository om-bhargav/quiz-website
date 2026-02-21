import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkUser } from "@/lib/checkAuth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await checkUser();
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id: tournamentId } = await params;

    const registration = await prisma.registration.findUnique({
      where: { userId_tournamentId: { userId, tournamentId } },
    });

    if (!registration || !registration.hasPaid) {
      return NextResponse.json(
        { success: false, message: "Not registered" },
        { status: 403 }
      );
    }
    return NextResponse.json({ success: true, registration }, { status: 200 });
  } catch {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
