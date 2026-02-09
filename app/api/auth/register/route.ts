import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import z from "zod";

const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  phone: z.string().min(10, "Phone number must be at least 10 characters").optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ success: false, message: "Validation Error", errors: validation.error.flatten().fieldErrors }, { status: 400 });
    }

    const { email, password, name, phone } = validation.data;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json({ success: false, message: "User with this email already exists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        phone,
        role: "USER",
      },
    });

    const { password: _, ...rest } = user;

    return NextResponse.json({ success: true, message: "User created successfully", user: rest }, { status: 201 });

  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" },{ status: 500 });
  }
}