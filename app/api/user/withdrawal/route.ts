import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkUser } from "@/lib/checkAuth";
import {z} from "zod";

const withdrawalSchema = z.object({
  tokens: z.coerce.number().min(100),
});
const MINIMUM_BALANCE = 100;

export async function POST(req: NextRequest) {
  try {
    const userId = await checkUser();
    if (!userId){
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 404 });
    }
    const body = await req.json();
    const parsedBody = withdrawalSchema.safeParse(body);
    if(!parsedBody.success){
        return NextResponse.json({ success: false, message: "Validation Failed" }, { status: 404 });
    }
    const {tokens} = parsedBody.data;

    if (tokens<MINIMUM_BALANCE) return NextResponse.json({ success: false, message: `Withdrawal Tokens Should Be At Least ${MINIMUM_BALANCE}!` }, { status: 404 });

    const wallet = await prisma.wallet.findUnique({
      where: { userId: userId },
    });

    if (!wallet) return NextResponse.json({ success: false, message: "Wallet not found" }, { status: 404 });
    const balance = wallet.balance;
    
    if(balance<tokens){
        return NextResponse.json({ success: false, message: "Balance Should Be More Than Withdrawal Amount!" }, { status: 404 });
    }
    await prisma.transactionHistory.create({
        data:{
            amount: tokens,
            tokens: tokens,
            paymentId: "ThisisId",
            walletId: wallet.id 
        }
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}