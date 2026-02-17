import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest,{params}:{params:Promise<{id: string}>}) {
  try {
    const {id} = await params;
    const tournament = await prisma.tournament.findUnique({
        where:{
            id: id
        }
    });
    if(!id){
        throw Error();
    }
    return NextResponse.json({ success: true, tournament: tournament }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}