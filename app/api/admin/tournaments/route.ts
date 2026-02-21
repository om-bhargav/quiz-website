import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdmin } from "@/lib/checkAuth";
import { z } from "zod";
import { generateExactQuestions } from "@/lib/quizGenerator";
import { getTournamentStatus } from "@/lib/getTournamentStatus";
export async function GET(req: NextRequest) {
  try {
    const admin = await checkAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Admin access required" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");
    const difficulty = searchParams.get("difficulty");
    const categoryId = searchParams.get("categoryId"); 
    const status = searchParams.get("status");

    const whereClause: any = {};

    if (search) {
      whereClause.title = {
        contains: search,
        mode: "insensitive",
      };
    }

    if (difficulty) {
      whereClause.difficulty = difficulty as "EASY" | "MEDIUM" | "HARD";
    }

    if (categoryId) {
      whereClause.categoryId = categoryId;
    }

    const tournaments = await prisma.tournament.findMany({
        where: whereClause,
        orderBy: { createdAt: "desc" },
        include: {
            category: true,
            subCategory: true
        }
    });
    let filteredResults = tournaments.map((tournament)=>({
      ...tournament,
      status: getTournamentStatus(tournament)
    }));
    if(status){
      filteredResults = filteredResults.filter((tournament)=>tournament.status===status);
    }
    return NextResponse.json({ success: true, count: tournaments.length, tournaments:filteredResults }, { status: 200 });

  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}

const tournamentSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  categoryId: z.string().min(1, "Category is required"),
  subCategoryId: z.string().min(1, "SubCategory is required"),
  startTime: z.string().transform((str) => new Date(str)),
  endTime: z.string().transform((str) => new Date(str)),
  windowOpenTime: z.string().transform((str) => new Date(str)),
  durationPerQ: z.number().min(5),
  totalQuestions: z.number().min(1),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD","EXPERT"]),
  entryFee: z.number().min(0),
  prizePool: z.number().min(0),
  totalSeats: z.number().min(2, "Must have at least 2 seats"),
  winningSeats: z.number().min(0, "Cannot be negative"),
});

export async function POST(req: NextRequest) {
  try {
    const admin = await checkAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Admin access required" }, { status: 403 });
    }

    const body = await req.json();
    const validation = tournamentSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ success: false, message: "Validation Error", errors: validation.error.flatten().fieldErrors }, { status: 400 });
    }

    const data = validation.data;

    const category = await prisma.category.findUnique({
        where: { id: data.categoryId }
    });

    if (!category) {
        return NextResponse.json({ success: false, message: "Invalid Category ID" }, { status: 400 });
    }

    const checkTitle = await prisma.tournament.findFirst({ where: { title: data.title } });
    if (checkTitle) {
      return NextResponse.json({ success: false, message: "Tournament with this title already exists" }, { status: 409 });
    }

    if (data.windowOpenTime >= data.startTime) {
      return NextResponse.json({ success: false, message: "Window Open Time must be BEFORE Start Time" }, { status: 400 });
    }

    if (data.winningSeats >= data.totalSeats) {
       return NextResponse.json({ success: false, message: "Winning seats must be less than Total seats" }, { status: 400 });
    }

    let generatedQuestions;
    try {
      generatedQuestions = await generateExactQuestions({
        title: data.title,
        description: data.description || "",
        category: category.name,
        difficulty: data.difficulty,
        count: data.totalQuestions
      });
    } catch (error: any) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    const tournament = await prisma.tournament.create({
      data: {
        title: data.title,
        description: data.description,
        categoryId: category.id,
        startTime: data.startTime,
        subCategoryId: data.subCategoryId,
        endTime: data.endTime,
        windowOpenTime: data.windowOpenTime,
        durationPerQ: data.durationPerQ,
        totalQuestions: data.totalQuestions,
        difficulty: data.difficulty,
        entryFee: data.entryFee,
        prizePool: data.prizePool,
        totalSeats: data.totalSeats,
        winningSeats: data.winningSeats,
        questions: {
          create: generatedQuestions.map((q: any) => ({
            text: q.text,
            options: {
              create: q.options
            }
          }))
        }
      },
    });

    return NextResponse.json({ success: true, message: "Tournament Created Successfully", id: tournament.id }, { status: 201 });

  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}