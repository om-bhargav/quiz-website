import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdmin } from "@/lib/checkAuth";


// ✅ GET ALL BANNERS
export async function GET() {
  try {
    const banners = await prisma.banner.findMany({
      orderBy: { id: "desc" },
    });

    return NextResponse.json(
      { success: true, data: banners },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET BANNERS ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch banners." },
      { status: 500 }
    );
  }
}



// ✅ CREATE BANNER
export async function POST(req: Request) {
  try {
    const user = await checkAdmin();
    if(!user){
        throw Error("Not Authorized");
    }
    const body = await req.json();
    const { title, mainHeadline, subtitle, image } = body;

    if (!title || !mainHeadline || !subtitle || !image) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    const banner = await prisma.banner.create({
      data: {
        title,
        mainHeadline,
        subtitle,
        image,
      },
    });

    return NextResponse.json(
      { success: true, data: banner },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE BANNER ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create banner." },
      { status: 500 }
    );
  }
}