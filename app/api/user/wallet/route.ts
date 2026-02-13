import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkUser } from "@/lib/checkAuth";

export async function GET() {
  try {
    const userId = await checkUser();
    if (!userId){
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 404 });
    }

    const wallet = await prisma.wallet.findUnique({
      where: { userId: userId },
      include: {
        transactions: { orderBy: { createdAt: 'desc' }, take: 10 },
        tokenLogs: { orderBy: { createdAt: 'desc' }, take: 20 }
      }
    });

    if (!wallet) return NextResponse.json({ success: false, message: "Wallet not found" }, { status: 404 });

    return NextResponse.json({ success: true, wallet }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}