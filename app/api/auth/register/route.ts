import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import z from "zod";

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ success: false, message: "Validation Error", errors: validation.error.flatten().fieldErrors }, { status: 400 });
    }

    const { email, password, username } = validation.data;

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          { username: username }
        ]
      }
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return NextResponse.json({ success: false, message: "Email already registered" }, { status: 409 });
      }
      return NextResponse.json({ success: false, message: "Username already taken" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        username, 
        name: username,
        password: hashedPassword,
        role: "USER",
        status: "ACTIVE",
        isProfileComplete: false,
        wallet: {
          create: {
            balance: 0
          }
        }
      },
    });

    const { password: _, ...rest } = user;

    return NextResponse.json({ success: true, message: "User created successfully", user: rest }, { status: 201 });

  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" },{ status: 500 });
  }
}