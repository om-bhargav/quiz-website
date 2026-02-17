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
    const subCategoryId = url.searchParams.get("subCategoryId");
    const whereFilter:any = {};
    if (!categoryId) {
      throw Error("No Category Id Passed");
    }
    whereFilter["categoryId"] = categoryId;
    if(subCategoryId){
        whereFilter["subCategoryId"] = subCategoryId;
    } 
    const tournaments = await prisma.tournament.findMany({
      where: whereFilter,
    });
    return NextResponse.json({ success: true, tournaments }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}