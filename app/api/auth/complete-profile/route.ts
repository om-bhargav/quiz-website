import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import z from "zod";

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

const profileSchema = z.object({
  fullName: z.string().min(2, "Full Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be valid"),
  dob: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" }),
  country: z.string().min(2, "Country is required"),
  age: z.coerce.number().min(18, "You must be at least 18 years old").max(100),
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const body = await req.json();
    const validation = profileSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ success: false, message: "Validation Error", errors: validation.error.flatten().fieldErrors }, { status: 400 });
    }

    const data = validation.data;

    const currentUser = await prisma.user.findUnique({
        where: { id: userId },
        select: { username: true }
    });

    if (!currentUser) return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });

    let finalUsername = currentUser.username;

    if (!finalUsername) {
        finalUsername = await generateUniqueUsername(data.fullName);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        username: finalUsername, 
        name: data.fullName, 
        phone: data.phone,
        dob: new Date(data.dob),
        country: data.country,
        age: Number(data.age),
        isProfileComplete: true, 
      },
      select: {
        id: true,
        username: true,
        name: true,
        isProfileComplete: true
      }
    });

    return NextResponse.json({ success: true, message: "Profile updated successfully", user: updatedUser });

  } catch{
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}