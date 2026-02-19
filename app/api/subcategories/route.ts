import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkUser } from "@/lib/checkAuth";

export async function GET(req: NextRequest) {
  try {
    const userId = await checkUser();
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    const url = new URL(req.url);
    const categoryId = url.searchParams.get("categoryId");
    if (!categoryId) {
      throw Error("No Category Id Passed");
    }
    const subcategories = await prisma.subCategory.findMany({
      where: {
        categoryId: categoryId,
      },
    });
    return NextResponse.json({ success: true, subcategories }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = await checkUser();
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    const { categoryId, name } = await req.json();
    const exists = await prisma.subCategory.findFirst({
      where: {
        name: name,
      },
    });
    if (exists) {
      throw Error("Subcategory with name already exists");
    }
    const newSubCategory = await prisma.subCategory.create({
      data: {
        categoryId: categoryId,
        name: name,
      },
    });
    return NextResponse.json(
      { success: true, newSubCategory },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const userId = await checkUser();
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    const { categoryId, subCategoryId, name } = await req.json();
    const exists = await prisma.subCategory.findUnique({
      where: {
        categoryId: categoryId,
        id: subCategoryId,
      },
    });
    if (!exists) {
      throw Error("Subcategory Does Not Exists!");
    }
    const updatedSubCategory = await prisma.subCategory.update({
      where: {
        id: subCategoryId,
        categoryId: categoryId,
      },
      data: {
        name: name,
      },
    });
    return NextResponse.json(
      { success: true, updatedSubCategory },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const userId = await checkUser();
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    const { subCategoryId } = await req.json();
    const exists = await prisma.subCategory.findUnique({
      where: {
        id: subCategoryId
      },
    });
    if (!exists) {
      throw Error("Sub Category Does not exist!");
    }
    await prisma.subCategory.delete({
      where:{
        id: subCategoryId
      },
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
