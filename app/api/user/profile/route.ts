import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkUser } from "@/lib/checkAuth";
import z from "zod";

export async function GET() {
  try {
    const userId = await checkUser();
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true, 
        username: true, 
        email: true, 
        image: true,
        phone: true,
        dob: true,
        country: true,
        age: true,
        isProfileComplete: true,
        _count:{
          select:{
            registration: true,
          }
        },
        wallet:{
          select:{
            balance: true
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user }, { status: 200 });

  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}

const profileSchema = z.object({
  fullName: z.string().min(2, "Full Name must be at least 2 characters").optional(),
  username: z.string().min(3, "Username must be at least 3 characters").regex(/^[a-zA-Z0-9_]+$/, "Username must be alphanumeric").optional(),
  phone: z.string().min(10, "Phone number must be valid").optional(),
  dob: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" }).optional(),
  country: z.string().min(2, "Country is required").optional(),
  age: z.coerce.number().min(10).max(100).optional(),
});

export async function PUT(req: NextRequest) {
  try {
    const userId = await checkUser();
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validation = profileSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ success: false, message: "Validation Error", errors: validation.error.flatten().fieldErrors }, { status: 400 });
    }

    const data = validation.data;

    if (data.username) {
      const existingUser = await prisma.user.findFirst({ where: { username: data.username }});
      
      if (existingUser && existingUser.id !== userId) {
        return NextResponse.json({ success: false, message: "Username already taken" }, { status: 409 });
      }
    }

    const updateData: any = {};
    if (data.fullName) {
        updateData.name = data.fullName; 
    }

    if (data.username) updateData.username = data.username;
    if (data.phone) updateData.phone = data.phone;
    if (data.dob) updateData.dob = new Date(data.dob);
    if (data.country) updateData.country = data.country;
    if (data.age) updateData.age = Number(data.age);

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: { 
        id: true,
        name: true, 
        username: true, 
        email: true, 
        phone: true,
        dob: true,
        country: true,
        age: true,
        image: true 
      }
    });

    return NextResponse.json({ success: true, message: "Profile updated successfully", user: updatedUser });

  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}