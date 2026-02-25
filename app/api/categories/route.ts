import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdmin } from "@/lib/checkAuth";
import z from "zod";
import { getTournamentStatus } from "@/lib/getTournamentStatus";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const categoryId = url.searchParams.get("categoryId");
    if (categoryId) {
      const category = await prisma.category.findUnique({
        where: {
          id: categoryId,
        },
      });
      if (!category) {
        throw Error("No Category Found!");
      }
      return NextResponse.json(
        { success: true, category: category },
        { status: 200 }
      );
    }
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { tournaments: true, subCategories: true },
        },
        tournaments: true,
        subCategories: true
      },
    });
    const finalCategories = categories?.map(({ tournaments, ...rest }) => {
      const tournamentsSize =
        tournaments.filter((tournament) =>
          ["PUBLISHED", "LIVE"].includes(getTournamentStatus(tournament))
        )?.length ?? 0;
      return { ...rest, tournamentsSize };
    });
    return NextResponse.json({ success: true, categories: finalCategories });
  } catch {
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}

const categorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  image: z.string().min(2, "Image is Required!"),
});

export async function POST(req: NextRequest) {
  try {
    const admin = await checkAdmin();
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Admin access required" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const validation = categorySchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: "Invalid Name" },
        { status: 400 }
      );
    }

    const { name, image } = validation.data;

    const existing = await prisma.category.findUnique({ where: { name } });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "Category already exists" },
        { status: 409 }
      );
    }

    const category = await prisma.category.create({ data: { name, image } });

    return NextResponse.json(
      { success: true, message: "Category Created", category },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
