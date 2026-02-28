import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { emailTemplates } from "@/lib/emailTemplates";
import z from "zod";
import sendEmail from "@/lib/email";
import { hash } from "bcryptjs";

const forgotPasswordSchema = z.object({
  email: z.string().email(),
  phase: z.string().min(1, "Phase is required!"),
  password: z.string().optional(),
  otp: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = forgotPasswordSchema.safeParse(body);
    console.log(validation.data);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: "Data Format Is Invalid!" },
        { status: 400 }
      );
    }

    const { email, phase, password, otp } = validation.data;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User Doesn't exist!",
      });
    }
    switch (phase) {
      case "request":
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        await prisma.otp.upsert({
          where: { email },
          update: { code, expiresAt },
          create: { email, code, expiresAt },
        });
        await sendEmail(
          email,
          "Reset Your Password",
          emailTemplates.passwordReset(code)
        );
        return NextResponse.json({
          success: true,
          message: "OTP sent successfully",
        });

      case "verify":
        if (!otp) {
          return NextResponse.json({
            success: false,
            message: "OTP is Invalid!",
          });
        }
        const otpRecord = await prisma.otp.findUnique({
          where: { email },
        });

        if (!otpRecord) {
          return NextResponse.json(
            { success: false, message: "OTP not found or expired" },
            { status: 400 }
          );
        }

        if (new Date() > otpRecord.expiresAt) {
          return NextResponse.json(
            { success: false, message: "OTP has expired" },
            { status: 400 }
          );
        }
        if (otpRecord.code !== otp) {
          return NextResponse.json(
            { success: false, message: "Invalid Code" },
            { status: 400 }
          );
        }

        await prisma.otp.delete({ where: { email } });

        return NextResponse.json({
          success: true,
          message: "OTP Verified Successfully!",
        });

      case "reset":
        if (!password) {
          return NextResponse.json({
            success: false,
            message: "Password Not Provided!",
          });
        }
        const hashedPassword = await hash(password, 12);
        await prisma.user.update({
          where: {
            email: email,
          },
          data: {
            password: hashedPassword,
          },
        });
        return NextResponse.json({
          success: true,
          message: "Password Reset Successfully!",
        });
      default:
        throw Error("Invalid Phase Provided!");
    }
  } catch {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
