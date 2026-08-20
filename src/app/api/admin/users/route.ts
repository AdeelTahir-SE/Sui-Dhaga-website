import { NextResponse } from "next/server";
import { initialUsers } from "@/lib/admin-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.toLowerCase();
  const role = searchParams.get("role");
  const status = searchParams.get("status");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  let filtered = [...initialUsers];

  if (search) {
    filtered = filtered.filter(
      (u) =>
        u.name.toLowerCase().includes(search) ||
        u.email.toLowerCase().includes(search) ||
        u.phone.toLowerCase().includes(search) ||
        u.city.toLowerCase().includes(search)
    );
  }

  if (role && role !== "all") {
    filtered = filtered.filter((u) => u.role === role);
  }

  if (status && status !== "all") {
    filtered = filtered.filter((u) => u.status === status);
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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newUser = {
      id: `usr-${Date.now()}`,
      name: body.name || "New User",
      email: body.email,
      phone: body.phone || "+92 300 0000000",
      avatar:
        body.avatar ||
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
      role: body.role || "customer",
      status: "active" as const,
      city: body.city || "Lahore",
      joinedDate: new Date().toISOString().split("T")[0],
      ordersCount: 0,
      totalSpent: 0,
      lastActive: "Just now",
      isEmailVerified: true,
      notes: body.notes
    };

    return NextResponse.json({
      success: true,
      data: newUser,
      message: "User created successfully"
    });
  } catch {
    return NextResponse.json(
      { success: false, error: { code: "INVALID_REQUEST", message: "Invalid payload" } },
      { status: 400 }
    );
  }
}
