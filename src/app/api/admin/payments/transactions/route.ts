import { NextResponse } from "next/server";
import { initialTransactions } from "@/lib/admin-data";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: initialTransactions,
    timestamp: new Date().toISOString()
  });
}
