import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import z from "zod";

const resetPasswordSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = resetPasswordSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ success: false, message: "Invalid Data", errors: validation.error.flatten().fieldErrors }, { status: 400 });
    }

    const { email, code, newPassword } = validation.data;

    const otpRecord = await prisma.otp.findUnique({ where: { email } });

    if (!otpRecord) {
      return NextResponse.json({ success: false, message: "Invalid or expired code" }, { status: 400 });
    }

    if (new Date() > otpRecord.expiresAt) {
      return NextResponse.json({ success: false, message: "Code has expired" }, { status: 400 });
    }

    if (otpRecord.code !== code) {
      return NextResponse.json({ success: false, message: "Incorrect code" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword }
    });

    await prisma.otp.delete({ where: { email } });

    return NextResponse.json({ success: true, message: "Password reset successfully. You can now login." });

  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}