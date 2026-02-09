import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdmin } from "@/lib/checkAuth";
import { z } from "zod";

const updateQuestionSchema = z.object({
  text: z.string().min(3),
  options: z.array(z.object({
    id: z.string(),
    text: z.string(),
    isCorrect: z.boolean()
  })).length(4)
});


export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await checkAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Admin access required" }, { status: 403 });
    }

    const { id: questionId } = await params;
    const body = await req.json();
    
    const validation = updateQuestionSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ success: false, errors: validation.error.flatten().fieldErrors }, { status: 400 });
    }

    const existingQuestion = await prisma.question.findUnique({ where: { id: questionId } });
    if (!existingQuestion) {
      return NextResponse.json({ success: false, message: "Question not found" }, { status: 404 });
    }

    const { text, options } = validation.data;

    const correctCount = options.filter(o => o.isCorrect).length;
    if (correctCount !== 1) {
      return NextResponse.json({ success: false, message: "Exactly one option must be correct" }, { status: 400 });
    }

    await prisma.$transaction(async (tx) => {

      await tx.question.update({
        where: { id: questionId },
        data: { text }
      });

      for (const opt of options) {
        await tx.option.update({
          where: { id: opt.id },
          data: { 
            text: opt.text, 
            isCorrect: opt.isCorrect 
          }
        });
      }
    });

    return NextResponse.json({ success: true, message: "Question updated" }, { status: 200 });

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

    const { id: questionId } = await params;

    const existingQuestion = await prisma.question.findUnique({ where: { id: questionId } });
    if (!existingQuestion) {
      return NextResponse.json({ success: false, message: "Question not found" }, { status: 404 });
    }
    
    await prisma.$transaction([
      prisma.question.delete({ where: { id: questionId } }),
      prisma.tournament.update({
        where: { id: existingQuestion.tournamentId },
        data: { totalQuestions: { decrement: 1 } }
      })
    ]);

    return NextResponse.json({ success: true, message: "Question deleted" }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}