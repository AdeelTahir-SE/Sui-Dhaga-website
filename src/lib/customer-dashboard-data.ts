/**
 * Customer Dashboard Data & API Layer for Sui Dhāga
 * Connects to process.env.NEXT_PUBLIC_API_URL if configured,
 * with reliable local fallback and localStorage synchronization.
 */

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
 * Fetch Customer Profile from API or mock store
 */
export async function fetchCustomerProfileApi(): Promise<CustomerProfile> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/api/customer/profile`, {
        headers: { "Content-Type": "application/json" },
        cache: "no-store"
      });
      if (res.ok) {
        const data = await res.json();
        return data.profile || data;
      }
    } catch (err) {
      console.warn("[Customer API] Profile endpoint unavailable:", err);
    }
  }

  return initialCustomerProfile;
}

/**
 * Fetch Customer Dashboard Stats
 */
export async function fetchDashboardStatsApi(): Promise<DashboardStats> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/api/customer/stats`, {
        headers: { "Content-Type": "application/json" },
        cache: "no-store"
      });
      if (res.ok) {
        const data = await res.json();
        return data.stats || data;
      }
    } catch (err) {
      console.warn("[Customer API] Stats endpoint unavailable:", err);
    }
  }

  // Check localStorage for dynamically added appointments
  let localAppointmentsCount = initialDashboardStats.upcomingAppointmentsCount;
  try {
    if (typeof window !== "undefined") {
      const json = localStorage.getItem("sui_dhaga_appointments");
      if (json) {
        const list = JSON.parse(json);
        localAppointmentsCount = Math.max(list.length, initialDashboardStats.upcomingAppointmentsCount);
      }
    }
  } catch (e) {
    // ignore
  }

  return {
    ...initialDashboardStats,
    upcomingAppointmentsCount: localAppointmentsCount
  };
}

/**
 * Fetch Recent Customer Orders
 */
export async function fetchRecentOrdersApi(): Promise<RecentOrderSummary[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/api/customer/orders/recent`, {
        headers: { "Content-Type": "application/json" },
        cache: "no-store"
      });
      if (res.ok) {
        const data = await res.json();
        return data.orders || data.data || [];
      }
    } catch (err) {
      console.warn("[Customer API] Recent orders endpoint unavailable:", err);
    }
  }

  return initialRecentOrders;
}

/**
 * Fetch Upcoming Customer Appointments
 */
export async function fetchUpcomingAppointmentsApi(): Promise<UpcomingAppointmentSummary[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/api/customer/appointments/upcoming`, {
        headers: { "Content-Type": "application/json" },
        cache: "no-store"
      });
      if (res.ok) {
        const data = await res.json();
        return data.appointments || data.data || [];
      }
    } catch (err) {
      console.warn("[Customer API] Upcoming appointments endpoint unavailable:", err);
    }
  }

  // Sync locally confirmed appointments
  let appointmentsList = [...initialUpcomingAppointments];
  try {
    if (typeof window !== "undefined") {
      const json = localStorage.getItem("sui_dhaga_appointments");
      if (json) {
        const storedList = JSON.parse(json);
        const mappedStored = storedList.map((apt: any) => ({
          id: apt.id,
          date: apt.date,
          time: apt.timeSlot,
          tailorId: apt.tailorId,
          tailorName: apt.tailorName,
          tailorImage: apt.tailorImage || "/images/home/tailor-rekha.png",
          serviceName: apt.serviceName,
          status: "Upcoming"
        }));
        appointmentsList = [...mappedStored, ...appointmentsList];
      }
    }
  } catch (e) {
    // ignore
  }

  return appointmentsList;
}

/**
 * Fetch Customer Saved Designs
 */
export async function fetchSavedDesignsApi(): Promise<SavedDesignSummary[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/api/customer/saved-designs`, {
        headers: { "Content-Type": "application/json" },
        cache: "no-store"
      });
      if (res.ok) {
        const data = await res.json();
        return data.designs || data.data || [];
      }
    } catch (err) {
      console.warn("[Customer API] Saved designs endpoint unavailable:", err);
    }
  }

  return initialSavedDesigns;
}

/**
 * Fetch Recommended Outfits
 */
export async function fetchRecommendedOutfitsApi(): Promise<RecommendedOutfit[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/api/customer/recommendations`, {
        headers: { "Content-Type": "application/json" },
        cache: "no-store"
      });
      if (res.ok) {
        const data = await res.json();
        return data.recommendations || data.data || [];
      }
    } catch (err) {
      console.warn("[Customer API] Recommendations endpoint unavailable:", err);
    }
  }

  return initialRecommendedOutfits;
}
