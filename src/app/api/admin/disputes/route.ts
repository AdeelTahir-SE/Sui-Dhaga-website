import { NextResponse } from "next/server";
import { initialDisputes } from "@/lib/admin-data";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: initialDisputes,
    timestamp: new Date().toISOString()
  });
}
