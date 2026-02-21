import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkUser } from "@/lib/checkAuth";

export async function GET() {
  try {
    const userId = await checkUser();
    if (!userId){
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 404 });
    }

    const transactionHistory = await prisma.transactionHistory.findMany({
      where: { wallet: {userId: userId} ,status:{
        in: ["SUCCESS","CANCELLED"]
      }}
    });

    if (!transactionHistory) return NextResponse.json({ success: false, message: "Wallet not found" }, { status: 404 });

    return NextResponse.json({ success: true, data:transactionHistory }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}