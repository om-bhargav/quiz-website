import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdmin } from "@/lib/checkAuth";
import { z } from "zod";
import { PLAN_STATUS } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const plans = await prisma.plan.findMany({orderBy:{updatedAt: "desc"}});
    return NextResponse.json({ success: true, plans: plans }, { status: 200 });
  } catch {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

const createPlanSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  tokens: z.number().int().positive("Tokens must be positive"),
  price: z.number().int().nonnegative("Price cannot be negative"),
  status: z.nativeEnum(PLAN_STATUS).optional(),
});

export async function POST(req: Request) {
  try {
    const admin = await checkAdmin();
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Admin access required" },
        { status: 403 }
      );
    }
    const body = await req.json();
    const parsedBody = createPlanSchema.safeParse(body);
    if (!parsedBody.success) {
      throw Error("Validation Failed");
    }
    const newPlan = await prisma.plan.create({
      data: body,
    });
    return NextResponse.json({ success: true, data: newPlan }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to create plan" },
      { status: 500 }
    );
  }
}

const updatePlanSchema = z.object({
  id: z.string().min(3).optional(),
  title: z.string().min(3).optional(),
  description: z.string().min(5).optional(),
  tokens: z.number().int().positive().optional(),
  price: z.number().int().nonnegative().optional(),
  status: z.enum(PLAN_STATUS).optional(),
});

export async function PUT(req: NextRequest) {
  try {
    const admin = await checkAdmin();
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Admin access required" },
        { status: 403 }
      );
    }
    const body = await req.json();
    const parsedBody = updatePlanSchema.safeParse(body);
    if (!parsedBody.success) {
      throw Error("Validation Failed");
    }
    const { id, ...data } = parsedBody.data;
    const exist = await prisma.plan.findUnique({
      where: { id },
    });
    if (!exist) throw Error("Plan Not Exist!");
    const updatedPlan = await prisma.plan.update({
      where: {
        id,
      },
      data,
    });
    return NextResponse.json(
      { success: true, data: updatedPlan },
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
    const admin = await checkAdmin();
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Admin access required" },
        { status: 403 }
      );
    }
    const { id } = await req.json();
    if (!id) {
      throw Error("Id Not Provided!");
    }
    const exist = await prisma.plan.findUnique({
      where: { id },
    });
    if (!exist) throw Error("Plan Not Exist!");
    await prisma.plan.delete({
      where: { id },
    });
    return NextResponse.json(
      { success: true, message: "Plan Deleted!" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
