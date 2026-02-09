import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdmin } from "@/lib/checkAuth";
import { z } from "zod";
import { generateExactQuestions } from "@/lib/quizGenerator";

export async function GET() {
  try {
    const admin = await checkAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Admin access required" }, { status: 403 });
    }

    const tournaments = await prisma.tournament.findMany({ orderBy: { createdAt: "desc" }});

    return NextResponse.json({ success: true, tournaments }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}

const tournamentSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  category: z.string().min(2),
  startTime: z.string().transform((str) => new Date(str)),
  windowOpenTime: z.string().transform((str) => new Date(str)),
  durationPerQ: z.number().min(5),
  totalQuestions: z.number().min(1),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  entryFee: z.number().min(0),
  prizePool: z.number().min(0),
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

    if (data.windowOpenTime >= data.startTime) {
      return NextResponse.json({ success: false, message: "Window Open Time must be BEFORE Start Time" }, { status: 400 });
    }

    let generatedQuestions;
    try {
      generatedQuestions = await generateExactQuestions({
        title: data.title,
        description: data.description || "",
        category: data.category,
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
        category: data.category,
        startTime: data.startTime,
        windowOpenTime: data.windowOpenTime,
        durationPerQ: data.durationPerQ,
        totalQuestions: data.totalQuestions,
        difficulty: data.difficulty,
        entryFee: data.entryFee,
        prizePool: data.prizePool,
        status: "PUBLISHED",
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