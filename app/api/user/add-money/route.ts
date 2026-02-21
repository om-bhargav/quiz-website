import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkUser } from "@/lib/checkAuth";
import { z} from "zod";
import {v4 as uuid} from "uuid";
const addMoneySchema = z.object({
  money: z.coerce.number().min(100),
});
const MINIMUM_BALANCE = 100;

export async function POST(req: NextRequest) {
  try {
    const userId = await checkUser();
    if (!userId){
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 404 });
    }
    const body = await req.json();
    const parsedBody = addMoneySchema.safeParse(body);
    if(!parsedBody.success){
        return NextResponse.json({ success: false, message: "Validation Failed" }, { status: 404 });
    }
    const {money} = parsedBody.data;

    if (money<MINIMUM_BALANCE) return NextResponse.json({ success: false, message: `Amount Should Be At Least ${MINIMUM_BALANCE}!` }, { status: 404 });

    const wallet = await prisma.wallet.findUnique({
      where: { userId: userId },
    });

    if (!wallet) return NextResponse.json({ success: false, message: "Wallet not found" }, { status: 404 });

    await prisma.wallet.update({
      where:{
        userId: userId
      },
      data:{
        balance:{
          increment: money
        }
      }
    })
    await prisma.transactionHistory.create({
        data:{
            amount: money,
            tokens: money,
            type: "CREDIT",
            status: "SUCCESS",
            paymentId: uuid(),
            walletId: wallet.id 
        }
    });
    return NextResponse.json({ success: true, message: "Tokens Added Successfully!" }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}