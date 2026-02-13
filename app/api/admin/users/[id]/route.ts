import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdmin } from "@/lib/checkAuth";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await checkAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Admin access required" }, { status: 403 });
    }

    const { id: userId } = await params;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        registration: {
            take: 10,  // last 10 quiz games
            orderBy: { createdAt: "desc" },
            include: { tournament: { select: { title: true } } }
        },
        wallet: {
            include: {
                tokenLogs: { 
                    take: 20, // last 20 token logs
                    orderBy: { createdAt: "desc" }
                }
            }
        }
      }
    });

    if (!user){ 
        return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user }, { status: 200 });

  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await checkAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Admin access required" }, { status: 403 });
    }

    const { id: userId } = await params;
    const body = await req.json();
    const { status, balance } = body;

    if (status && !["ACTIVE", "SUSPENDED"].includes(status)) {
      return NextResponse.json({ success: false, message: "Invalid Status. Use ACTIVE or SUSPENDED." }, { status: 400 });
    }

    if (balance !== undefined && typeof balance !== "number") {
      return NextResponse.json({ success: false, message: "Balance must be a number." }, { status: 400 });
    }

    const updateData: any = {};

    if (status) {
        updateData.status = status;
    }

    if (balance !== undefined) {
        updateData.wallet = {
            update: {
                balance: balance 
            }
        };
    }

    if (Object.keys(updateData).length === 0) {
        return NextResponse.json({ success: false, message: "No valid fields to update" }, { status: 400 });
    }

    await prisma.user.update({
      where: { id: userId },
      data: updateData
    });

    return NextResponse.json({ success: true, message: "User updated successfully" }, { status: 200 });

  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}