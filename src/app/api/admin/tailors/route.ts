import { NextResponse } from "next/server";
import { initialTailors } from "@/lib/admin-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.toLowerCase();
  const status = searchParams.get("status");
  const city = searchParams.get("city");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  let filtered = [...initialTailors];

  if (search) {
    filtered = filtered.filter(
      (t) =>
        t.shopName.toLowerCase().includes(search) ||
        t.ownerName.toLowerCase().includes(search) ||
        t.city.toLowerCase().includes(search) ||
        t.specialties.some((s) => s.toLowerCase().includes(search))
    );
  }

  if (status && status !== "all") {
    filtered = filtered.filter((t) => t.verificationStatus === status);
  }

  if (city) {
    filtered = filtered.filter((t) => t.city.toLowerCase() === city.toLowerCase());
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const paginated = filtered.slice((page - 1) * limit, page * limit);

  return NextResponse.json({
    success: true,
    data: paginated,
    total,
    page,
    limit,
    totalPages
  });
}
