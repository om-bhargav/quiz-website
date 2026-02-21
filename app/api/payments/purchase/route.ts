import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkUser } from "@/lib/checkAuth";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const userId = await checkUser();
    if (!userId){
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { planId } = await req.json();

    const plan = await prisma.plan.findUnique({ where: { id: planId } });
    if (!plan || plan.status !== "ACTIVATED") {
      return NextResponse.json({ success: false, message: "Invalid or inactive plan" }, { status: 400 });
    }

    const wallet = await prisma.wallet.findUnique({ where: { userId } });
    if (!wallet){
      return NextResponse.json({ success: false, message: "Wallet not found" }, { status: 404 });
    }

    const shortPlanId = plan.id.replace(/-/g, '').substring(0, 8);
    const shortReceipt = `rcpt_${shortPlanId}_${Date.now()}`;

    const orderOptions = {
      amount: plan.price * 100, 
      currency: "INR",
      receipt: shortReceipt,
    };

    const order = await razorpay.orders.create(orderOptions);

    const transaction = await prisma.transactionHistory.create({
      data: {
        walletId: wallet.id,
        paymentId: order.id, 
        amount: plan.price,
        tokens: plan.tokens,
        status: "PENDING",
      },
    });

    return NextResponse.json({ success: true, order, transactionId: transaction.id });

  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}