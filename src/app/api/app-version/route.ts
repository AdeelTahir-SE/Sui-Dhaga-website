import { NextResponse } from "next/server";
import { getLatestAppVersion } from "@/lib/app-version";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const versionInfo = await getLatestAppVersion();
    return NextResponse.json(
      {
        success: true,
        data: versionInfo,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch app version",
      },
      { status: 500 }
    );
  }
}
