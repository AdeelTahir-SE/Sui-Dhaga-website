import { NextResponse } from "next/server";
import { initialPayoutRequests } from "@/lib/admin-data";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: initialPayoutRequests,
    timestamp: new Date().toISOString()
  });
}
