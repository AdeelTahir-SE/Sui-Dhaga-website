import { NextResponse } from "next/server";
import { initialAdminStats } from "@/lib/admin-data";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: initialAdminStats,
    timestamp: new Date().toISOString()
  });
}
