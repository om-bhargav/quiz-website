import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { emailTemplates } from "@/lib/emailTemplates";
import z from "zod";
import sendEmail from "@/lib/email";

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = forgotPasswordSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ success: false, message: "Invalid Email" }, { status: 400 });
    }

    const { email } = validation.data;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ success: true, message: "User Not Found" }, { status: 404 });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.otp.upsert({
      where: { email },
      update: { code, expiresAt },
      create: { email, code, expiresAt },
    });

    await sendEmail( email, "Reset Your Password", emailTemplates.passwordReset(code));

    return NextResponse.json({ success: true, message: "OTP sent successfully" });

  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}