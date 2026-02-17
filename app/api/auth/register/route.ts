import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import z from "zod";

const registerSchema = z.object({
  name: z.string().min(3, "Full Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().length(10, "Phone must be at least of 10 digits"),
  gender: z.string().min(1, "Please Select The Gender")
});

async function generateUniqueUsername(baseName: string) {
  let cleanName = baseName.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (cleanName.length < 3) cleanName = "user";

  let uniqueName = cleanName;
  let isUnique = false;
  
  while (!isUnique) {
    const existing = await prisma.user.findFirst({
      where: { username: uniqueName }
    });

    if (!existing) {
      isUnique = true;
    } else {
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      uniqueName = `${cleanName}${randomSuffix}`;
    }
  }
  return uniqueName;
}


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ success: false, message: "Validation Error", errors: validation.error.flatten().fieldErrors }, { status: 400 });
    }

    const { email, password, name,gender,phone } = validation.data;

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
        ]
      }
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return NextResponse.json({ success: false, message: "Email already registered" }, { status: 409 });
      }
      // return NextResponse.json({ success: false, message: "Username already taken" }, { status: 409 });
    }
    const username = await generateUniqueUsername(name);
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        username, 
        name: name,
        phone: phone,
        gender: gender,
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