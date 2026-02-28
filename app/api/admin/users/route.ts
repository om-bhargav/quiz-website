import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdmin, checkUser } from "@/lib/checkAuth";

export async function GET() {
  try {
    const admin = await checkAdmin();
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Admin access required" },
        { status: 403 }
      );
    }

    const users = await prisma.user.findMany({
      where: {
        NOT:{
          id:{
            equals: admin.id
          }
        }
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        status: true,
        createdAt: true,
        isProfileComplete: true,
        role: true,
        wallet: {
          select: { balance: true },
        },
        _count: {
          select: { registration: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, users }, { status: 200 });
  } catch(error: any) {
    console.log(error.message);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
