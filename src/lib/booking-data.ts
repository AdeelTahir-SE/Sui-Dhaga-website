/**
 * Booking Data & API Layer for Sui Dhāga
 * Prepared for seamless REST backend integration.
 * Connects to process.env.NEXT_PUBLIC_API_URL if configured,
 * with reliable local fallback and localStorage persistence.
 */

import { getTailorById, TailorItem } from "./tailors-data";

export interface TailorBookingService {
  id: string;
  name: string;
  category: string;
  price: string;
  priceValue: number;
  deliveryTime: string;
  durationMins: number;
  description?: string;
  popular?: boolean;
}

export interface BookingAppointmentRequest {
  tailorId: string;
  tailorName?: string;
  serviceId: string;
  serviceName?: string;
  price?: string;
  priceValue?: number;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "2:00 PM"
  notes?: string;
  referenceImages?: string[];
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
}

export interface BookingAppointmentResponse {
  id: string;
  referenceNo: string;
  tailorId: string;
  tailorName: string;
  tailorOwner: string;
  tailorImage: string;
  tailorAddress: string;
  serviceId: string;
  serviceName: string;
  date: string;
  timeSlot: string;
  price: string;
  priceValue: number;
  deliveryTime: string;
  notes?: string;
  referenceImages?: string[];
  status: "Confirmed" | "Pending" | "Completed" | "Cancelled";
  createdAt: string;
}

export const defaultTailorServices: Record<string, TailorBookingService[]> = {
  "rekha-tailors": [
    {
      id: "srv-custom-stitching",
      name: "Custom Stitching",
      category: "Women's Wear",
      price: "Rs. 2,000",
      priceValue: 2000,
      deliveryTime: "7-10 days",
      durationMins: 45,
      description: "Complete custom tailored outfit made precisely to your measurements with luxury finishing.",
      popular: true
    },
    {
      id: "srv-anarkali-suit",
      name: "Custom Anarkali Suit",
      category: "Ethnic Wear",
      price: "Rs. 3,500",
      priceValue: 3500,
      deliveryTime: "7-10 days",
      durationMins: 60,
      description: "Full flared Anarkali dress with custom yoke, neck design, and dupatta edging."
    },
    {
      id: "srv-saree-blouse",
      name: "Designer Saree Blouse",
      category: "Sarees",
      price: "Rs. 1,200",
      priceValue: 1200,
      deliveryTime: "3-5 days",
      durationMins: 30,
      description: "Padded or unpadded bespoke blouse stitching with custom neck and back patterns."
    },
    {
      id: "srv-bridal-lehenga",
      name: "Bridal Lehenga Ensemble",
      category: "Bridal Wear",
      price: "Rs. 12,500",
      priceValue: 12500,
      deliveryTime: "14-21 days",
      durationMins: 90,
      description: "Heavy bridal lehenga tailoring with cancan insertion, custom latkans, and blouse work.",
      popular: true
    },
    {
      id: "srv-kurta-set",
      name: "Kurta & Trouser Set",
      category: "Daily Wear",
      price: "Rs. 1,500",
      priceValue: 1500,
      deliveryTime: "4-6 days",
      durationMins: 30,
      description: "Straight or A-line kurta paired with tailored cigarette pants or shalwar."
    },
    {
      id: "srv-alterations",
      name: "Fitting & Alterations",
      category: "Alterations",
      price: "Rs. 600",
      priceValue: 600,
      deliveryTime: "2-3 days",
      durationMins: 20,
      description: "Precision size adjustments, length shortening, and sleeve remodeling."
    }
  ],
  "default": [
    {
      id: "srv-custom-stitching",
      name: "Custom Stitching",
      category: "General",
      price: "Rs. 2,000",
      priceValue: 2000,
      deliveryTime: "7-10 days",
      durationMins: 45,
      popular: true
    },
    {
      id: "srv-suit-stitching",
      name: "Bespoke 2-Piece Suit",
      category: "Suits",
      price: "Rs. 3,200",
      priceValue: 3200,
      deliveryTime: "5-7 days",
      durationMins: 60
    },
    {
      id: "srv-ethnic-wear",
      name: "Ethnic Kurta Set",
      category: "Ethnic",
      price: "Rs. 1,600",
      priceValue: 1600,
      deliveryTime: "4-6 days",
      durationMins: 30
    },
    {
      id: "srv-alterations",
      name: "Fitting & Alterations",
      category: "Alterations",
      price: "Rs. 500",
      priceValue: 500,
      deliveryTime: "2-3 days",
      durationMins: 20
    }
  ]
};

export const defaultAvailableTimeSlots = [
  "9:00 AM",
  "10:30 AM",
  "12:00 PM",
  "2:00 PM",
  "4:00 PM",
  "6:00 PM"
];

export const samplePresetReferences = [
  {
    id: "ref-1",
    title: "Embroidered Pink Kurti",
    image: "/images/booking/ref-pink-kurti.jpg",
    category: "Kurti / Suit"
  },
  {
    id: "ref-2",
    title: "Gold Flared Anarkali",
    image: "/images/booking/ref-gold-anarkali.jpg",
    category: "Anarkali"
  },
  {
    id: "ref-3",
    title: "Peach Designer Gown",
    image: "/images/booking/ref-peach-gown.jpg",
    category: "Gown / Lehenga"
  }
];

/**
 * Get services list for a tailor
 */
export function getTailorServices(tailorId: string): TailorBookingService[] {
  return defaultTailorServices[tailorId] || defaultTailorServices["default"];
}

/**
 * Async API function to fetch services for a tailor
 */
export async function fetchTailorServicesApi(tailorId: string): Promise<TailorBookingService[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/api/tailors/${encodeURIComponent(tailorId)}/services`, {
        headers: { "Content-Type": "application/json" },
        cache: "no-store"
      });
      if (res.ok) {
        const data = await res.json();
        return data.services || data.data || [];
      }
    } catch (err) {
      console.warn("[Booking API] Services endpoint unavailable, falling back:", err);
    }
  }

  return getTailorServices(tailorId);
}

/**
 * Async API function to fetch available time slots for a given tailor and date
 */
export async function fetchAvailableSlotsApi(tailorId: string, date: string): Promise<string[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

  if (apiUrl) {
    try {
      const res = await fetch(
        `${apiUrl}/api/tailors/${encodeURIComponent(tailorId)}/availability?date=${encodeURIComponent(date)}`,
        {
          headers: { "Content-Type": "application/json" },
          cache: "no-store"
        }
      );
      if (res.ok) {
        const data = await res.json();
        return data.slots || data.availableSlots || defaultAvailableTimeSlots;
      }
    } catch (err) {
      console.warn("[Booking API] Slots endpoint unavailable, falling back:", err);
    }
  }

  return defaultAvailableTimeSlots;
}

/**
 * Submit appointment booking to backend or local store
 */
export async function createBookingAppointmentApi(
  payload: BookingAppointmentRequest
): Promise<{ success: boolean; appointment?: BookingAppointmentResponse; error?: string }> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/api/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        return { success: true, appointment: data.appointment || data.data || data };
      }
      const err = await res.json().catch(() => ({}));
      return { success: false, error: err.message || "Failed to confirm appointment" };
    } catch (err: any) {
      console.warn("[Booking API] Backend booking error, saving locally:", err);
    }
  }

  // Local storage / mock fallback
  const tailor = getTailorById(payload.tailorId);
  const services = getTailorServices(payload.tailorId);
  const selectedService = services.find((s) => s.id === payload.serviceId) || services[0];

  const randomRefNum = Math.floor(10000 + Math.random() * 90000);
  const appointment: BookingAppointmentResponse = {
    id: `apt-${Date.now()}`,
    referenceNo: `SD-APT-${randomRefNum}`,
    tailorId: payload.tailorId,
    tailorName: tailor?.name || payload.tailorName || "Rekha Tailors",
    tailorOwner: tailor?.owner || "Tailor Master",
    tailorImage: tailor?.image || "/images/home/tailor-rekha.png",
    tailorAddress: tailor?.address || "Commercial Area, Faisalabad",
    serviceId: payload.serviceId,
    serviceName: selectedService?.name || payload.serviceName || "Custom Stitching",
    date: payload.date,
    timeSlot: payload.timeSlot,
    price: selectedService?.price || payload.price || "Rs. 2,000",
    priceValue: selectedService?.priceValue || payload.priceValue || 2000,
    deliveryTime: selectedService?.deliveryTime || "7-10 days",
    notes: payload.notes || "",
    referenceImages: payload.referenceImages || [],
    status: "Confirmed",
    createdAt: new Date().toISOString()
  };

  try {
    if (typeof window !== "undefined") {
      const existingJson = localStorage.getItem("sui_dhaga_appointments");
      const existing = existingJson ? JSON.parse(existingJson) : [];
      existing.unshift(appointment);
      localStorage.setItem("sui_dhaga_appointments", JSON.stringify(existing));
    }
  } catch (storageErr) {
    console.warn("Error storing appointment locally:", storageErr);
  }

  return { success: true, appointment };
}
