import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdmin } from "@/lib/checkAuth";
import z from "zod";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { tournaments: true } 
        }
        ,subCategories: true
      }
    });

    return NextResponse.json({ success: true, categories });
  } catch {
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}

const categorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export async function POST(req: NextRequest) {
  try {
    const admin = await checkAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Admin access required" }, { status: 403 });
    }

    const body = await req.json();
    const validation = categorySchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ success: false, message: "Invalid Name" }, { status: 400 });
    }

    const { name } = validation.data;

    const existing = await prisma.category.findUnique({ where: { name } });
    if (existing) {
      return NextResponse.json({ success: false, message: "Category already exists" }, { status: 409 });
    }

    const category = await prisma.category.create({ data: { name } });

    return NextResponse.json({ success: true, message: "Category Created", category }, { status: 201 });

  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}