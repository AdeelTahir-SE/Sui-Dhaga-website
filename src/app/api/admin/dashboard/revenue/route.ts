import { NextResponse } from "next/server";
import { initialRevenueChartData } from "@/lib/admin-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const range = searchParams.get("range") || "7days";

  return NextResponse.json({
    success: true,
    data: initialRevenueChartData,
    range,
    timestamp: new Date().toISOString()
  });
}
