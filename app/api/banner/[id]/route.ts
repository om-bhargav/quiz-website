import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdmin } from "@/lib/checkAuth";

// ✅ GET SINGLE BANNER
// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const banner = await prisma.banner.findUnique({
//       where: { id: params.id },
//     });

//     if (!banner) {
//       return NextResponse.json(
//         { success: false, message: "Banner not found." },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { success: true, data: banner },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("GET SINGLE BANNER ERROR:", error);
//     return NextResponse.json(
//       { success: false, message: "Failed to fetch banner." },
//       { status: 500 }
//     );
//   }
// }

// ✅ UPDATE BANNER
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const {id} = await params;
  try {
    const user = await checkAdmin();
    if (!user) {
      throw Error("Not Authorized");
    }
    const body = await req.json();
    const { title, mainHeadline, subtitle, image } = body;

    const updatedBanner = await prisma.banner.update({
      where: { id: id },
      data: {
        title,
        mainHeadline,
        subtitle,
        image,
      },
    });

    return NextResponse.json(
      { success: true, data: updatedBanner },
      { status: 200 }
    );
  } catch (error) {
    console.error("UPDATE BANNER ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update banner." },
      { status: 500 }
    );
  }
}

// ✅ DELETE BANNER
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const {id} = await params;
    const user = await checkAdmin();
    if (!user) {
      throw Error("Not Authorized");
    }
    console.log(id);
    await prisma.banner.delete({
      where: { id: id },
    });

    return NextResponse.json(
      { success: true, message: "Banner deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE BANNER ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete banner." },
      { status: 500 }
    );
  }
}
