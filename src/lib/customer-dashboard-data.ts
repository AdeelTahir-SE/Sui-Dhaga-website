/**
 * Customer Dashboard Data & API Layer for Sui Dhāga
 * Connects directly to the live backend services (/users/me, /orders, /appointments, /designs, /measurements)
 * with robust local session caching and graceful fallback.
 */

import {
  userService,
  orderService,
  appointmentService,
  designService,
  measurementService,
  tailorService,
} from "./api";

export interface CustomerProfile {
  name: string;
  email: string;
  avatar: string;
  city: string;
}

export interface DashboardStats {
  upcomingAppointmentsCount: number;
  ordersInProgressCount: number;
  savedDesignsCount: number;
  measurementsSavedCount: number;
}

export interface RecentOrderSummary {
  id: string;
  orderNumber: string; // e.g. "#SD1256"
  itemTitle: string; // e.g. "Anarkali Suit"
  tailorName: string;
  image: string;
  status: "In Progress" | "Delivered" | "Out for Delivery" | "Processing";
  date: string;
  amount: string;
}

export interface UpcomingAppointmentSummary {
  id: string;
  date: string; // e.g. "20 May, 2024"
  time: string; // e.g. "2:00 PM"
  tailorId: string;
  tailorName: string;
  tailorImage: string;
  serviceName: string;
  status: "Upcoming" | "Confirmed" | "Pending";
}

export interface SavedDesignSummary {
  id: string;
  title: string;
  type: string;
  image: string;
  savedDate: string;
}

export interface RecommendedOutfit {
  id: string;
  title: string;
  startingPrice: string;
  priceValue: number;
  image: string;
  tailorId: string;
  tailorName: string;
}

export const initialCustomerProfile: CustomerProfile = {
  name: "Ayesha Khan",
  email: "ayesha.khan@email.com",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
  city: "Faisalabad, Pakistan"
};

export const initialDashboardStats: DashboardStats = {
  upcomingAppointmentsCount: 3,
  ordersInProgressCount: 2,
  savedDesignsCount: 5,
  measurementsSavedCount: 12
};

export const initialRecentOrders: RecentOrderSummary[] = [
  {
    id: "ord-1256",
    orderNumber: "Order #SD1256",
    itemTitle: "Anarkali Suit",
    tailorName: "Rekha Tailors",
    image: "/images/booking/ref-gold-anarkali.jpg",
    status: "In Progress",
    date: "20 May, 2024",
    amount: "Rs. 2,000"
  },
  {
    id: "ord-1250",
    orderNumber: "Order #SD1250",
    itemTitle: "Lehenga Set",
    tailorName: "Stitch Craft",
    image: "/images/booking/ref-peach-gown.jpg",
    status: "Delivered",
    date: "18 May, 2024",
    amount: "Rs. 12,500"
  },
  {
    id: "ord-1048",
    orderNumber: "Order #SD1048",
    itemTitle: "Sharara Set",
    tailorName: "Aarav Bespoke",
    image: "/images/booking/ref-pink-kurti.jpg",
    status: "Out for Delivery",
    date: "14 May, 2024",
    amount: "Rs. 1,800"
  }
];

export const initialUpcomingAppointments: UpcomingAppointmentSummary[] = [
  {
    id: "apt-101",
    date: "20 May, 2024",
    time: "2:00 PM",
    tailorId: "rekha-tailors",
    tailorName: "Rekha Tailors",
    tailorImage: "/images/home/tailor-rekha.png",
    serviceName: "Custom Stitching",
    status: "Upcoming"
  },
  {
    id: "apt-102",
    date: "23 May, 2024",
    time: "11:00 AM",
    tailorId: "stitch-craft",
    tailorName: "Stitch Craft",
    tailorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    serviceName: "Blouse Stitching",
    status: "Upcoming"
  }
];

export const initialSavedDesigns: SavedDesignSummary[] = [
  {
    id: "dsg-1",
    title: "Pastel Anarkali",
    type: "Anarkali",
    image: "/images/booking/ref-pink-kurti.jpg",
    savedDate: "10 May, 2024"
  },
  {
    id: "dsg-2",
    title: "Blue Lehenga",
    type: "Lehenga",
    image: "/images/booking/ref-peach-gown.jpg",
    savedDate: "12 May, 2024"
  },
  {
    id: "dsg-3",
    title: "Oman Kurta Set",
    type: "Kurta",
    image: "/images/booking/ref-gold-anarkali.jpg",
    savedDate: "14 May, 2024"
  }
];

export const initialRecommendedOutfits: RecommendedOutfit[] = [
  {
    id: "rec-1",
    title: "Designer Lehenga",
    startingPrice: "Rs. 2,000",
    priceValue: 2000,
    image: "/images/booking/ref-peach-gown.jpg",
    tailorId: "rekha-tailors",
    tailorName: "Rekha Tailors"
  }
];

/**
 * Fetch Customer Profile from backend (/users/me) or active session cache
 */
export async function fetchCustomerProfileApi(): Promise<CustomerProfile> {
  // 1. Try to fetch live user profile from backend via JWT
  try {
    const res = await userService.getMe();
    if (res?.success && res.data) {
      const u = res.data;
      return {
        name: u.full_name || u.name || "Customer",
        email: u.email || "",
        avatar:
          u.avatar_url ||
          u.avatar ||
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
        city: u.city || u.address || "Pakistan",
      };
    }
  } catch (err) {
    console.warn("[Customer API] Live profile fetch fallback:", err);
  }

  // 2. Fall back to local auth session if offline
  if (typeof window !== "undefined") {
    try {
      const rawUser = localStorage.getItem("sui_dhaga_user");
      if (rawUser) {
        const u = JSON.parse(rawUser);
        return {
          name: u.full_name || u.name || u.email?.split("@")[0] || "Customer",
          email: u.email || "",
          avatar:
            u.avatar_url ||
            u.avatar ||
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
          city: u.city || u.address || "Pakistan",
        };
      }
    } catch {}
  }

  return initialCustomerProfile;
}

/**
 * Fetch Customer Dashboard Stats (Computed from live orders, appointments, designs, measurements)
 */
export async function fetchDashboardStatsApi(): Promise<DashboardStats> {
  const hasToken = typeof window !== "undefined" && !!localStorage.getItem("sui_dhaga_auth_token");

  if (!hasToken) {
    return initialDashboardStats;
  }

  try {
    const [ordersRes, apptsRes, designsRes, measRes] = await Promise.allSettled([
      orderService.getOrders({ limit: 100 }),
      appointmentService.getAppointments({ limit: 100 }),
      designService.getDesigns(),
      measurementService.getMeasurements(),
    ]);

    const orders =
      ordersRes.status === "fulfilled" && ordersRes.value?.success && Array.isArray(ordersRes.value.data)
        ? ordersRes.value.data
        : [];

    const appts =
      apptsRes.status === "fulfilled" && apptsRes.value?.success && Array.isArray(apptsRes.value.data)
        ? apptsRes.value.data
        : [];

    const designs =
      designsRes.status === "fulfilled" && designsRes.value?.success && Array.isArray(designsRes.value.data)
        ? designsRes.value.data
        : [];

    const measurements =
      measRes.status === "fulfilled" && measRes.value?.success && Array.isArray(measRes.value.data)
        ? measRes.value.data
        : [];

    const inProgressCount = orders.filter((o: any) => {
      const s = (o.status || "").toLowerCase();
      return s !== "completed" && s !== "delivered" && s !== "cancelled";
    }).length;

    const upcomingCount = appts.filter((a: any) => {
      const s = (a.status || "").toLowerCase();
      return s !== "cancelled" && s !== "completed";
    }).length;

    return {
      upcomingAppointmentsCount: upcomingCount,
      ordersInProgressCount: inProgressCount,
      savedDesignsCount: designs.length,
      measurementsSavedCount: measurements.length,
    };
  } catch (err) {
    console.warn("[Customer API] Error calculating dashboard stats:", err);
  }

  return {
    upcomingAppointmentsCount: 0,
    ordersInProgressCount: 0,
    savedDesignsCount: 0,
    measurementsSavedCount: 0,
  };
}

/**
 * Fetch Recent Customer Orders from backend (/orders)
 */
export async function fetchRecentOrdersApi(): Promise<RecentOrderSummary[]> {
  try {
    const res = await orderService.getOrders({ page: 1, limit: 5 });
    if (res?.success && Array.isArray(res.data)) {
      return res.data.map((order: any, idx: number) => {
        const orderNum = order.order_number || `#SD${String(order.id).slice(-4).toUpperCase()}`;
        const itemTitle =
          order.item_title ||
          order.garment_type ||
          order.service?.title ||
          order.title ||
          "Custom Stitch";
        const tailorName = order.tailor?.shop_name || order.tailor?.name || "Bespoke Tailor";
        const image =
          order.reference_image_url ||
          order.design?.preview_url ||
          order.image ||
          "/images/booking/ref-gold-anarkali.jpg";

        let status: RecentOrderSummary["status"] = "In Progress";
        const rawStatus = (order.status || "").toLowerCase();
        if (rawStatus.includes("deliver") || rawStatus === "completed") {
          status = "Delivered";
        } else if (rawStatus.includes("out") || rawStatus.includes("transit")) {
          status = "Out for Delivery";
        } else if (rawStatus.includes("process") || rawStatus.includes("pending")) {
          status = "Processing";
        }

        const dateStr = order.created_at
          ? new Date(order.created_at).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          : "Recent";

        const amountStr =
          order.total_amount || order.amount
            ? `Rs. ${Number(order.total_amount || order.amount).toLocaleString()}`
            : "Rs. 2,500";

        return {
          id: String(order.id || `ord-${idx + 1}`),
          orderNumber: orderNum,
          itemTitle,
          tailorName,
          image,
          status,
          date: dateStr,
          amount: amountStr,
        };
      });
    }
  } catch (err) {
    console.warn("[Customer API] Live orders endpoint fallback:", err);
  }

  // Check localStorage for locally placed orders
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem("sui_dhaga_orders");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
  }

  const hasToken = typeof window !== "undefined" && !!localStorage.getItem("sui_dhaga_auth_token");
  if (hasToken) {
    return [];
  }

  return initialRecentOrders;
}

/**
 * Fetch Upcoming Customer Appointments from backend (/appointments)
 */
export async function fetchUpcomingAppointmentsApi(): Promise<UpcomingAppointmentSummary[]> {
  try {
    const res = await appointmentService.getAppointments({ page: 1, limit: 5 });
    if (res?.success && Array.isArray(res.data)) {
      return res.data.map((apt: any, idx: number) => {
        const tailorName = apt.tailor?.shop_name || apt.tailor?.name || "Bespoke Tailor";
        const tailorImage =
          apt.tailor?.avatar_url || apt.tailor?.banner_url || "/images/home/tailor-rekha.png";
        const serviceName = apt.service?.title || apt.service_name || apt.notes || "Custom Consultation";

        let status: UpcomingAppointmentSummary["status"] = "Upcoming";
        const rawStatus = (apt.status || "").toLowerCase();
        if (rawStatus === "confirmed") status = "Confirmed";
        else if (rawStatus === "pending") status = "Pending";

        const dateStr = apt.appointment_date || apt.date || "Upcoming";
        const timeStr = apt.appointment_time || apt.time || "11:00 AM";

        return {
          id: String(apt.id || `apt-${idx + 1}`),
          date: dateStr,
          time: timeStr,
          tailorId: String(apt.tailor_id || apt.tailorId || ""),
          tailorName,
          tailorImage,
          serviceName,
          status,
        };
      });
    }
  } catch (err) {
    console.warn("[Customer API] Live appointments endpoint fallback:", err);
  }

  // Sync locally confirmed appointments
  if (typeof window !== "undefined") {
    try {
      const json = localStorage.getItem("sui_dhaga_appointments");
      if (json) {
        const storedList = JSON.parse(json);
        if (Array.isArray(storedList) && storedList.length > 0) {
          return storedList.map((apt: any) => ({
            id: String(apt.id),
            date: apt.date || "Upcoming",
            time: apt.timeSlot || apt.time || "11:00 AM",
            tailorId: String(apt.tailorId || ""),
            tailorName: apt.tailorName || "Bespoke Tailor",
            tailorImage: apt.tailorImage || "/images/home/tailor-rekha.png",
            serviceName: apt.serviceName || "Tailoring Consultation",
            status: "Upcoming",
          }));
        }
      }
    } catch {}
  }

  const hasToken = typeof window !== "undefined" && !!localStorage.getItem("sui_dhaga_auth_token");
  if (hasToken) {
    return [];
  }

  return initialUpcomingAppointments;
}

/**
 * Fetch Customer Saved Designs from backend (/designs)
 */
export async function fetchSavedDesignsApi(): Promise<SavedDesignSummary[]> {
  try {
    const res = await designService.getDesigns();
    if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
      return res.data.map((dsg: any, idx: number) => ({
        id: String(dsg.id || `dsg-${idx + 1}`),
        title: dsg.title || dsg.name || "AI Generated Outfit",
        type: dsg.garment_type || dsg.style || "Custom",
        image: dsg.preview_url || dsg.image_url || "/images/booking/ref-pink-kurti.jpg",
        savedDate: dsg.created_at
          ? new Date(dsg.created_at).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          : "Saved",
      }));
    }
  } catch (err) {
    console.warn("[Customer API] Live designs endpoint fallback:", err);
  }

  // Check localStorage for AI Studio designs saved on client
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem("sui_dhaga_saved_designs");
      if (raw) {
        const list = JSON.parse(raw);
        if (Array.isArray(list) && list.length > 0) {
          return list.map((item: any, idx: number) => ({
            id: item.id || `local-dsg-${idx + 1}`,
            title: item.title || item.name || "AI Studio Design",
            type: item.garmentType || item.type || "Custom",
            image: item.image || item.imageUrl || "/images/booking/ref-pink-kurti.jpg",
            savedDate: item.date || "Saved",
          }));
        }
      }
    } catch {}
  }

  const hasToken = typeof window !== "undefined" && !!localStorage.getItem("sui_dhaga_auth_token");
  if (hasToken) {
    return [];
  }

  return initialSavedDesigns;
}

/**
 * Fetch Recommended Outfits from live tailors directory
 */
export async function fetchRecommendedOutfitsApi(): Promise<RecommendedOutfit[]> {
  try {
    const res = await tailorService.getTailors({ limit: 4 });
    if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
      return res.data.map((tailor: any, idx: number) => {
        const s = tailor.services?.[0];
        return {
          id: String(tailor.id || `rec-${idx + 1}`),
          title: s?.title || tailor.specialties?.[0] || "Custom Couture",
          startingPrice: s?.price ? `Rs. ${Number(s.price).toLocaleString()}` : "Rs. 2,000",
          priceValue: Number(s?.price) || 2000,
          image:
            tailor.banner_url ||
            tailor.avatar_url ||
            "/images/booking/ref-peach-gown.jpg",
          tailorId: String(tailor.id),
          tailorName: tailor.shop_name || tailor.name || "Bespoke Master",
        };
      });
    }
  } catch (err) {
    console.warn("[Customer API] Live recommendations fallback:", err);
  }

  return initialRecommendedOutfits;
}
