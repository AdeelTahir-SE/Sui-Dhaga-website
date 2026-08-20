/**
 * Tailor Dashboard Domain Model & Backend-Integratable Service Layer
 * Sui Dhāga Tailor Portal
 */

export interface TailorAppointmentSummary {
  id: string;
  time: string;
  type: string; // e.g. "In-Shop" | "Home Visit"
  serviceName: string;
  customerName: string;
  customerPhone?: string;
  garmentImage: string;
  status: "Confirmed" | "Pending" | "Completed" | "Cancelled";
}

export interface TailorNewOrderItem {
  id: string;
  orderNumber: string; // e.g. "SD1206"
  itemTitle: string;
  category: string;
  customerName: string;
  amount: number; // e.g. 8500
  timeAgo: string; // e.g. "10 mins ago"
  garmentImage: string;
  status: "new" | "in_progress" | "completed";
}

export interface TailorRecentMessageItem {
  id: string;
  customerName: string;
  avatar: string;
  lastMessage: string;
  timeAgo: string;
  unreadCount?: number;
}

export interface TailorDashboardData {
  tailor: {
    id: string;
    name: string;
    shopName: string;
    avatar: string;
    rating: number;
    reviewsCount: number;
    profileCompletion: number; // 80%
  };
  overview: {
    newOrdersCount: number;
    newOrdersChange: string; // "+2 today"
    appointmentsCount: number;
    appointmentsChange: string; // "+1 today"
    ordersInProgressCount: number;
    thisMonthEarnings: number; // 24860
  };
  todayAppointments: TailorAppointmentSummary[];
  newOrders: TailorNewOrderItem[];
  recentMessages: TailorRecentMessageItem[];
  earningsSummary: {
    totalEarnings: number;
    completedAmount: number;
    pendingAmount: number;
  };
}

export const initialTailorDashboardData: TailorDashboardData = {
  tailor: {
    id: "tlr-arjun",
    name: "Arjun",
    shopName: "Verma Stitch Studio",
    avatar: "/images/tailor-onboarding-avatar.jpg",
    rating: 4.9,
    reviewsCount: 94,
    profileCompletion: 80
  },
  overview: {
    newOrdersCount: 12,
    newOrdersChange: "+2 today",
    appointmentsCount: 5,
    appointmentsChange: "+1 today",
    ordersInProgressCount: 18,
    thisMonthEarnings: 24860
  },
  todayAppointments: [
    {
      id: "apt-1",
      time: "10:00 AM",
      type: "In-Shop Fitting",
      serviceName: "Anarkali Suit Fitting",
      customerName: "Neha Verma",
      customerPhone: "+91 98765-11223",
      garmentImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=120&auto=format&fit=crop&q=80",
      status: "Confirmed"
    },
    {
      id: "apt-2",
      time: "12:30 PM",
      type: "Home Visit",
      serviceName: "Blouse Stitching",
      customerName: "Pooja Mehta",
      customerPhone: "+91 98112-33445",
      garmentImage: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=120&auto=format&fit=crop&q=80",
      status: "Confirmed"
    },
    {
      id: "apt-3",
      time: "04:00 PM",
      type: "In-Shop Trial",
      serviceName: "Sherwani Trial",
      customerName: "Rohan Singh",
      customerPhone: "+91 99001-22334",
      garmentImage: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=120&auto=format&fit=crop&q=80",
      status: "Confirmed"
    }
  ],
  newOrders: [
    {
      id: "ord-1",
      orderNumber: "SD1206",
      itemTitle: "Custom Anarkali Suit",
      category: "Women's Formal",
      customerName: "Ayesha Khan",
      amount: 8500,
      timeAgo: "10 mins ago",
      garmentImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=120&auto=format&fit=crop&q=80",
      status: "new"
    },
    {
      id: "ord-2",
      orderNumber: "SD1257",
      itemTitle: "Lehenga Set",
      category: "Bridal Wear",
      customerName: "Fatima Noor",
      amount: 14500,
      timeAgo: "25 mins ago",
      garmentImage: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=120&auto=format&fit=crop&q=80",
      status: "new"
    },
    {
      id: "ord-3",
      orderNumber: "SD1258",
      itemTitle: "Kurta Set",
      category: "Men's Ethnic",
      customerName: "Zainab Rashid",
      amount: 4200,
      timeAgo: "1 hour ago",
      garmentImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=120&auto=format&fit=crop&q=80",
      status: "new"
    }
  ],
  recentMessages: [
    {
      id: "msg-1",
      customerName: "Neha Verma",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
      lastMessage: "Thanks! Please share the updates.",
      timeAgo: "10m ago",
      unreadCount: 1
    },
    {
      id: "msg-2",
      customerName: "Pooja Mehta",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
      lastMessage: "Can you share the fabric options?",
      timeAgo: "30m ago",
      unreadCount: 0
    }
  ],
  earningsSummary: {
    totalEarnings: 24860,
    completedAmount: 18400,
    pendingAmount: 6460
  }
};

const KEY_TAILOR_DASHBOARD = "sui_dhaga_tailor_dashboard";

export const tailorDashboardService = {
  getDashboardData: async (): Promise<TailorDashboardData> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (apiUrl) {
      try {
        const res = await fetch(`${apiUrl}/api/tailor/dashboard`, {
          headers: { "Content-Type": "application/json" }
        });
        if (res.ok) {
          const json = await res.json();
          return json.data || json;
        }
      } catch (err) {
        console.warn("Backend API unavailable, using local mock for tailor dashboard:", err);
      }
    }

    if (typeof window !== "undefined") {
      try {
        const local = localStorage.getItem(KEY_TAILOR_DASHBOARD);
        if (local) {
          return JSON.parse(local);
        } else {
          localStorage.setItem(KEY_TAILOR_DASHBOARD, JSON.stringify(initialTailorDashboardData));
        }
      } catch (e) {
        console.warn("Failed to load local storage for tailor dashboard:", e);
      }
    }

    return initialTailorDashboardData;
  },

  updateProfileCompletion: async (newPercent: number): Promise<void> => {
    if (typeof window !== "undefined") {
      try {
        const current = await tailorDashboardService.getDashboardData();
        current.tailor.profileCompletion = newPercent;
        localStorage.setItem(KEY_TAILOR_DASHBOARD, JSON.stringify(current));
      } catch (e) {
        console.warn("Failed to update profile completion in localStorage:", e);
      }
    }
  }
};
