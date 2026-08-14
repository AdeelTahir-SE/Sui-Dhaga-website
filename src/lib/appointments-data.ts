/**
 * Customer Appointments Data & API Layer for Sui Dhāga
 * Connects to process.env.NEXT_PUBLIC_API_URL if configured,
 * with reliable local storage synchronization and mock fallback data.
 */

export interface AppointmentItem {
  id: string;
  referenceNo: string;
  tailorId: string;
  tailorName: string;
  tailorAvatar: string;
  tailorRating: number;
  tailorReviewsCount: number;
  tailorAddress: string;
  distance: string;
  serviceId: string;
  serviceName: string;
  serviceCategory?: string;
  price: string;
  priceValue: number;
  date: string;
  time: string;
  duration: string;
  deliveryTime?: string;
  status: "Upcoming" | "Completed" | "Cancelled";
  notes?: string;
  referenceImages?: string[];
  cancelReason?: string;
  createdAt: string;
}

export const initialAppointmentsData: AppointmentItem[] = [
  {
    id: "apt-101",
    referenceNo: "APT1256",
    tailorId: "rekha-tailors",
    tailorName: "Rekha Tailors",
    tailorAvatar: "/images/home/tailor-rekha.png",
    tailorRating: 4.8,
    tailorReviewsCount: 128,
    tailorAddress: "Block B, Commercial Area, D Ground, Faisalabad",
    distance: "0.6 km away",
    serviceId: "srv-custom-stitching",
    serviceName: "Custom Stitching",
    serviceCategory: "Women's Wear",
    price: "Rs. 2,000",
    priceValue: 2000,
    date: "20 May, 2024",
    time: "2:00 PM",
    duration: "45 mins",
    deliveryTime: "7-10 days",
    status: "Upcoming",
    notes: "Light pink Anarkali with embroidery on neckline and sleeves.",
    referenceImages: [
      "/images/booking/ref-pink-kurti.jpg",
      "/images/booking/ref-peach-gown.jpg",
      "/images/booking/ref-neckline-detail.jpg",
      "/images/booking/ref-gold-anarkali.jpg"
    ],
    createdAt: "2024-05-15T10:00:00Z"
  },
  {
    id: "apt-102",
    referenceNo: "APT1257",
    tailorId: "stitch-craft",
    tailorName: "Stitch Craft",
    tailorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    tailorRating: 4.8,
    tailorReviewsCount: 94,
    tailorAddress: "Jaranwala Road, Kohinoor City, Faisalabad",
    distance: "1.2 km away",
    serviceId: "srv-saree-blouse",
    serviceName: "Blouse Stitching",
    serviceCategory: "Sarees",
    price: "Rs. 1,200",
    priceValue: 1200,
    date: "23 May, 2024",
    time: "11:00 AM",
    duration: "30 mins",
    deliveryTime: "5-7 days",
    status: "Upcoming",
    notes: "Padded blouse with deep back neck design and tie-up dori.",
    referenceImages: [
      "/images/booking/ref-gold-anarkali.jpg",
      "/images/booking/ref-neckline-detail.jpg"
    ],
    createdAt: "2024-05-16T11:30:00Z"
  },
  {
    id: "apt-103",
    referenceNo: "APT1258",
    tailorId: "aarav-bespoke",
    tailorName: "Aarav Bespoke",
    tailorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    tailorRating: 4.7,
    tailorReviewsCount: 96,
    tailorAddress: "Chenone Road, People's Colony No 1, Faisalabad",
    distance: "2.1 km away",
    serviceId: "srv-sherwani",
    serviceName: "Men's Sherwani",
    serviceCategory: "Ethnic Wear",
    price: "Rs. 4,500",
    priceValue: 4500,
    date: "25 May, 2024",
    time: "4:00 PM",
    duration: "60 mins",
    deliveryTime: "10-14 days",
    status: "Upcoming",
    notes: "Trial fitting for groom sherwani with raw silk fabric.",
    referenceImages: ["/images/booking/ref-gold-anarkali.jpg"],
    createdAt: "2024-05-18T09:15:00Z"
  },
  {
    id: "apt-104",
    referenceNo: "APT1201",
    tailorId: "noor-thread",
    tailorName: "Noor & Thread",
    tailorAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80",
    tailorRating: 4.5,
    tailorReviewsCount: 64,
    tailorAddress: "Bazar Kalan, Near Clock Tower, Faisalabad",
    distance: "3.4 km away",
    serviceId: "srv-anarkali-suit",
    serviceName: "Custom Anarkali Suit",
    serviceCategory: "Bridal Wear",
    price: "Rs. 3,500",
    priceValue: 3500,
    date: "12 May, 2024",
    time: "3:00 PM",
    duration: "60 mins",
    deliveryTime: "Completed",
    status: "Completed",
    notes: "Flared anarkali with cancan and gold gotta border.",
    referenceImages: ["/images/booking/ref-peach-gown.jpg"],
    createdAt: "2024-05-05T14:20:00Z"
  },
  {
    id: "apt-105",
    referenceNo: "APT1202",
    tailorId: "meena-couture",
    tailorName: "Meena Couture",
    tailorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80",
    tailorRating: 4.9,
    tailorReviewsCount: 152,
    tailorAddress: "Main Plaza, Kohinoor City, Faisalabad",
    distance: "1.8 km away",
    serviceId: "srv-bridal-lehenga",
    serviceName: "Bridal Lehenga Consultation",
    serviceCategory: "Bridal Wear",
    price: "Rs. 12,500",
    priceValue: 12500,
    date: "08 May, 2024",
    time: "1:30 PM",
    duration: "90 mins",
    deliveryTime: "Completed",
    status: "Completed",
    notes: "Detailed bridal embroidery placement and final fitting measurement.",
    referenceImages: ["/images/booking/ref-peach-gown.jpg"],
    createdAt: "2024-05-01T12:00:00Z"
  },
  {
    id: "apt-106",
    referenceNo: "APT1203",
    tailorId: "ethnic-craft",
    tailorName: "Ethnic Craft Studio",
    tailorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
    tailorRating: 4.8,
    tailorReviewsCount: 112,
    tailorAddress: "Main Market, People's Colony No 2, Faisalabad",
    distance: "4.1 km away",
    serviceId: "srv-kurta-set",
    serviceName: "Kurta & Trouser Set",
    serviceCategory: "Daily Wear",
    price: "Rs. 1,500",
    priceValue: 1500,
    date: "02 May, 2024",
    time: "5:00 PM",
    duration: "30 mins",
    deliveryTime: "Completed",
    status: "Completed",
    notes: "Straight cut cotton lawn kurta.",
    referenceImages: [],
    createdAt: "2024-04-28T16:00:00Z"
  },
  {
    id: "apt-107",
    referenceNo: "APT1190",
    tailorId: "royal-threads",
    tailorName: "Royal Threads Studio",
    tailorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    tailorRating: 4.6,
    tailorReviewsCount: 78,
    tailorAddress: "Near Gate Plaza, Satyana Road, Faisalabad",
    distance: "2.8 km away",
    serviceId: "srv-alterations",
    serviceName: "Fitting & Alterations",
    serviceCategory: "Alterations",
    price: "Rs. 600",
    priceValue: 600,
    date: "26 Apr, 2024",
    time: "2:00 PM",
    duration: "20 mins",
    deliveryTime: "Completed",
    status: "Completed",
    notes: "Waistline adjustment for festive suit.",
    referenceImages: [],
    createdAt: "2024-04-22T09:00:00Z"
  },
  {
    id: "apt-108",
    referenceNo: "APT1185",
    tailorId: "heritage-bespoke",
    tailorName: "Heritage Bespoke",
    tailorAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80",
    tailorRating: 4.7,
    tailorReviewsCount: 85,
    tailorAddress: "Canal Park Complex, Main Canal Road, Faisalabad",
    distance: "5.0 km away",
    serviceId: "srv-suit-stitching",
    serviceName: "Bespoke 2-Piece Suit",
    serviceCategory: "Suits",
    price: "Rs. 3,500",
    priceValue: 3500,
    date: "20 Apr, 2024",
    time: "11:30 AM",
    duration: "45 mins",
    deliveryTime: "Completed",
    status: "Completed",
    notes: "Italian wool blended suit fitting.",
    referenceImages: [],
    createdAt: "2024-04-15T11:00:00Z"
  },
  {
    id: "apt-109",
    referenceNo: "APT1180",
    tailorId: "rekha-tailors",
    tailorName: "Rekha Tailors",
    tailorAvatar: "/images/home/tailor-rekha.png",
    tailorRating: 4.8,
    tailorReviewsCount: 128,
    tailorAddress: "Block B, Commercial Area, D Ground, Faisalabad",
    distance: "0.6 km away",
    serviceId: "srv-saree-blouse",
    serviceName: "Saree Fall & Pico Finishing",
    serviceCategory: "Sarees",
    price: "Rs. 800",
    priceValue: 800,
    date: "14 Apr, 2024",
    time: "4:30 PM",
    duration: "30 mins",
    deliveryTime: "Completed",
    status: "Completed",
    notes: "Chiffon saree edging.",
    referenceImages: [],
    createdAt: "2024-04-10T15:00:00Z"
  },
  {
    id: "apt-110",
    referenceNo: "APT1150",
    tailorId: "stitch-craft",
    tailorName: "Stitch Craft",
    tailorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    tailorRating: 4.8,
    tailorReviewsCount: 94,
    tailorAddress: "Jaranwala Road, Kohinoor City, Faisalabad",
    distance: "1.2 km away",
    serviceId: "srv-custom-stitching",
    serviceName: "Lehenga Stitching",
    serviceCategory: "Women's Wear",
    price: "Rs. 3,500",
    priceValue: 3500,
    date: "10 May, 2024",
    time: "2:00 PM",
    duration: "60 mins",
    deliveryTime: "Cancelled",
    status: "Cancelled",
    cancelReason: "Schedule conflict on client side",
    notes: "Party wear lehenga.",
    referenceImages: [],
    createdAt: "2024-05-02T10:00:00Z"
  },
  {
    id: "apt-111",
    referenceNo: "APT1145",
    tailorId: "aarav-bespoke",
    tailorName: "Aarav Bespoke",
    tailorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    tailorRating: 4.7,
    tailorReviewsCount: 96,
    tailorAddress: "Chenone Road, People's Colony No 1, Faisalabad",
    distance: "2.1 km away",
    serviceId: "srv-sherwani",
    serviceName: "Achkan Measurement Session",
    serviceCategory: "Ethnic Wear",
    price: "Rs. 2,000",
    priceValue: 2000,
    date: "04 May, 2024",
    time: "12:00 PM",
    duration: "45 mins",
    deliveryTime: "Cancelled",
    status: "Cancelled",
    cancelReason: "Fabric delivery delayed",
    notes: "Bespoke traditional Achkan.",
    referenceImages: [],
    createdAt: "2024-04-26T13:00:00Z"
  }
];

/**
 * Fetch all appointments with optional tab filtering
 */
export async function fetchCustomerAppointmentsApi(
  tab: "Upcoming" | "Completed" | "Cancelled" | "All" = "Upcoming"
): Promise<AppointmentItem[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

  if (apiUrl) {
    try {
      const res = await fetch(
        `${apiUrl}/api/customer/appointments?status=${encodeURIComponent(tab)}`,
        {
          headers: { "Content-Type": "application/json" },
          cache: "no-store"
        }
      );
      if (res.ok) {
        const data = await res.json();
        return data.appointments || data.data || [];
      }
    } catch (err) {
      console.warn("[Appointments API] Backend unavailable, using local store:", err);
    }
  }

  // Local storage sync
  let appointmentsList = [...initialAppointmentsData];
  try {
    if (typeof window !== "undefined") {
      const storedJson = localStorage.getItem("sui_dhaga_appointments");
      if (storedJson) {
        const storedList = JSON.parse(storedJson);
        const mappedStored: AppointmentItem[] = storedList.map((apt: any) => ({
          id: apt.id || `apt-${Date.now()}`,
          referenceNo: apt.referenceNo || `APT${Math.floor(1000 + Math.random() * 9000)}`,
          tailorId: apt.tailorId || "rekha-tailors",
          tailorName: apt.tailorName || "Rekha Tailors",
          tailorAvatar: apt.tailorImage || "/images/home/tailor-rekha.png",
          tailorRating: 4.8,
          tailorReviewsCount: 128,
          tailorAddress: apt.tailorAddress || "Commercial Area, Faisalabad",
          distance: "0.6 km away",
          serviceId: apt.serviceId || "srv-custom-stitching",
          serviceName: apt.serviceName || "Custom Stitching",
          serviceCategory: "Women's Wear",
          price: apt.price || "Rs. 2,000",
          priceValue: apt.priceValue || 2000,
          date: apt.date || "20 May, 2024",
          time: apt.timeSlot || "2:00 PM",
          duration: "45 mins",
          deliveryTime: apt.deliveryTime || "7-10 days",
          status: apt.status || "Upcoming",
          notes: apt.notes || "",
          referenceImages: apt.referenceImages || [
            "/images/booking/ref-pink-kurti.jpg",
            "/images/booking/ref-peach-gown.jpg",
            "/images/booking/ref-neckline-detail.jpg",
            "/images/booking/ref-gold-anarkali.jpg"
          ],
          createdAt: apt.createdAt || new Date().toISOString()
        }));

        // Deduplicate
        const storedIds = new Set(mappedStored.map((m) => m.id));
        appointmentsList = [
          ...mappedStored,
          ...appointmentsList.filter((a) => !storedIds.has(a.id))
        ];
      }
    }
  } catch (e) {
    console.warn("Error reading local appointments:", e);
  }

  if (tab === "All") return appointmentsList;
  return appointmentsList.filter((a) => a.status === tab);
}

/**
 * Fetch a single appointment by ID
 */
export async function fetchAppointmentByIdApi(appointmentId: string): Promise<AppointmentItem | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/api/customer/appointments/${encodeURIComponent(appointmentId)}`, {
        headers: { "Content-Type": "application/json" },
        cache: "no-store"
      });
      if (res.ok) {
        const data = await res.json();
        return data.appointment || data;
      }
    } catch (err) {
      console.warn("[Appointments API] Fetch by ID failed, falling back locally:", err);
    }
  }

  const all = await fetchCustomerAppointmentsApi("All");
  const found = all.find(
    (a) => a.id === appointmentId || a.referenceNo.toLowerCase() === appointmentId.toLowerCase()
  );
  if (found) return found;

  // Default fallback to first appointment item
  return all[0] || initialAppointmentsData[0];
}

/**
 * Reschedule an appointment
 */
export async function rescheduleCustomerAppointmentApi(
  appointmentId: string,
  newDate: string,
  newTime: string
): Promise<{ success: boolean; appointment?: AppointmentItem; error?: string }> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/api/customer/appointments/${encodeURIComponent(appointmentId)}/reschedule`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: newDate, time: newTime })
      });
      if (res.ok) {
        const data = await res.json();
        return { success: true, appointment: data.appointment || data };
      }
    } catch (err) {
      console.warn("[Appointments API] Reschedule failed on backend, updating locally:", err);
    }
  }

  // Update in localStorage
  try {
    if (typeof window !== "undefined") {
      const storedJson = localStorage.getItem("sui_dhaga_appointments");
      if (storedJson) {
        const list = JSON.parse(storedJson);
        const target = list.find((a: any) => a.id === appointmentId);
        if (target) {
          target.date = newDate;
          target.timeSlot = newTime;
          localStorage.setItem("sui_dhaga_appointments", JSON.stringify(list));
        }
      }
    }
  } catch (e) {
    // ignore
  }

  return { success: true };
}

/**
 * Cancel an appointment
 */
export async function cancelCustomerAppointmentApi(
  appointmentId: string,
  reason: string
): Promise<{ success: boolean; error?: string }> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/api/customer/appointments/${encodeURIComponent(appointmentId)}/cancel`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason })
      });
      if (res.ok) return { success: true };
    } catch (err) {
      console.warn("[Appointments API] Cancel failed on backend, updating locally:", err);
    }
  }

  // Update in localStorage
  try {
    if (typeof window !== "undefined") {
      const storedJson = localStorage.getItem("sui_dhaga_appointments");
      if (storedJson) {
        const list = JSON.parse(storedJson);
        const target = list.find((a: any) => a.id === appointmentId);
        if (target) {
          target.status = "Cancelled";
          target.cancelReason = reason;
          localStorage.setItem("sui_dhaga_appointments", JSON.stringify(list));
        }
      }
    }
  } catch (e) {
    // ignore
  }

  return { success: true };
}
