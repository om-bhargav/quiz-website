import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdmin } from "@/lib/checkAuth";

export async function GET() {
  try {
    const admin = await checkAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Admin access required" }, { status: 403 });
    }

    const users = await prisma.user.findMany({
      where: { role: "USER" }, 
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json({ success: true, users }, { status: 200 });

  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}