import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdmin } from "@/lib/checkAuth";


export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await checkAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Admin access required" }, { status: 403 });
    }

    const { id } = await params;
    const { name } = await req.json();

    if (!name || name.length < 2) {
      return NextResponse.json({ success: false, message: "Invalid Name" }, { status: 400 });
    }

    const existingCategory = await prisma.category.findUnique({ where: { id } });
    if (!existingCategory) {
      return NextResponse.json({ success: false, message: "Category not found" }, { status: 404 });
    }

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { name }
    });

    return NextResponse.json({ success: true, message: "Category Updated", category: updatedCategory });

  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await checkAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Admin access required" }, { status: 403 });
    }

    const { id } = await params;

    const existingCategory = await prisma.category.findUnique({ where: { id } });
    if (!existingCategory) {
      return NextResponse.json({ success: false, message: "Category not found" }, { status: 404 });
    }

    const linkedTournaments = await prisma.tournament.count({
      where: { categoryId: id }
    });

    if (linkedTournaments > 0) {
      return NextResponse.json({ success: false, message: `Cannot delete: ${linkedTournaments} tournaments are using this category.` }, { status: 400 });
    }

    await prisma.category.delete({
      where: { id }
    });

    return NextResponse.json({ success: true, message: "Category Deleted" }, { status: 200 });

  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}