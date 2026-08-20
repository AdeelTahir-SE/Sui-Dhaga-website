import { NextResponse } from "next/server";
import { initialPlatformSettings } from "@/lib/admin-data";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: initialPlatformSettings,
    timestamp: new Date().toISOString()
  });
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      data: body,
      message: "Platform settings updated successfully"
    });
  } catch {
    return NextResponse.json(
      { success: false, error: { code: "INVALID_BODY", message: "Failed to parse JSON" } },
      { status: 400 }
    );
  }
}
