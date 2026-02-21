import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature, 
      transactionId 
    } = await req.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      await prisma.transactionHistory.update({
        where: { id: transactionId },
        data: { status: "CANCELLED" }
      });
      return NextResponse.json({ success: false, message: "Invalid Signature" }, { status: 400 });
    }

    const transaction = await prisma.transactionHistory.findUnique({ where: { id: transactionId } });
    if (!transaction || transaction.status === "DONE") {
      return NextResponse.json({ success: false, message: "Transaction already processed" }, { status: 400 });
    }

    await prisma.$transaction(async (tx) => {
      await tx.transactionHistory.update({
        where: { id: transactionId },
        data: { 
          status: "DONE", 
          paymentId: razorpay_payment_id 
        },
      });

      await tx.wallet.update({
        where: { id: transaction.walletId },
        data: { balance: { increment: transaction.tokens } },
      });

      await tx.tokenHistory.create({
        data: {
          walletId: transaction.walletId,
          amount: transaction.tokens,
          type: "DEPOSIT",
          description: `Purchased ${transaction.tokens} tokens for ${transaction.amount} INR`,
        },
      });
    });

    return NextResponse.json({ success: true, message: "Payment verified & tokens credited!" });

  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}