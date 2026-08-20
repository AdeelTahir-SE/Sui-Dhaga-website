import { NextResponse } from "next/server";
import { initialOrders } from "@/lib/admin-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.toLowerCase();
  const status = searchParams.get("status");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  let filtered = [...initialOrders];

  if (search) {
    filtered = filtered.filter(
      (o) =>
        o.orderNumber.toLowerCase().includes(search) ||
        o.customerName.toLowerCase().includes(search) ||
        o.tailorShop.toLowerCase().includes(search) ||
        o.itemTitle.toLowerCase().includes(search)
    );
  }

  if (status && status !== "all") {
    filtered = filtered.filter((o) => o.status === status);
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
