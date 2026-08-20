import { NextResponse } from "next/server";
import { initialRecentActivities } from "@/lib/admin-data";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: initialRecentActivities,
    timestamp: new Date().toISOString()
  });
}
