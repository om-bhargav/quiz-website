import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import sendEmail from "@/lib/email";
import { emailTemplates } from "@/lib/emailTemplates";
import z from "zod";

const sendOtpSchema = z.object({
  email: z.string().email(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = sendOtpSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ success: false, message: "Invalid Email" }, { status: 400 });
    }

    const { email } = validation.data;

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await prisma.otp.upsert({
      where: { email },
      update: {
        code,
        expiresAt,
      },
      create: {
        email,
        code,
        expiresAt,
      },
    });

    const emailSent = await sendEmail(email, "Your Verification Code", emailTemplates.otpVerification(code));

    if (!emailSent) {
      return NextResponse.json({ success: false, message: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "OTP Sent Successfully" }, { status: 200 });

  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}