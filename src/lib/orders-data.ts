/**
 * Customer Orders Data & API Layer for Sui Dhāga
 * Connects to process.env.NEXT_PUBLIC_API_URL if configured,
 * with reliable local storage synchronization and mock fallback data.
 */

export interface OrderTimelineEvent {
  title: string;
  subtitle: string;
  complete: boolean;
}

export interface OrderItem {
  id: string;
  orderNumber: string; // e.g. "Order #SD1256"
  tailorId: string;
  tailorName: string;
  tailorAvatar: string;
  tailorRating: number;
  tailorReviewsCount: number;
  tailorAddress: string;
  itemTitle: string; // e.g. "Custom Stitching"
  serviceCategory: string;
  garmentImage: string;
  placedDate: string; // e.g. "20 May, 2024"
  estimatedDelivery: string; // e.g. "05 Jun, 2024"
  amount: string; // e.g. "₹2,000" or "Rs. 2,000"
  amountValue: number;
  status: "Processing" | "In Progress" | "Delivered" | "Cancelled";
  fabric?: string;
  color?: string;
  work?: string;
  size?: string;
  notes?: string;
  referenceImages?: string[];
  timeline: OrderTimelineEvent[];
}

export const initialOrdersData: OrderItem[] = [
  {
    id: "SD1256",
    orderNumber: "Order #SD1256",
    tailorId: "rekha-tailors",
    tailorName: "Rekha Tailors",
    tailorAvatar: "/images/home/tailor-rekha.png",
    tailorRating: 4.8,
    tailorReviewsCount: 128,
    tailorAddress: "Block B, Commercial Area, D Ground, Faisalabad",
    itemTitle: "Custom Stitching",
    serviceCategory: "Anarkali Suit",
    garmentImage: "/images/booking/ref-gold-anarkali.jpg",
    placedDate: "20 May, 2024",
    estimatedDelivery: "28 May, 2024",
    amount: "₹2,000",
    amountValue: 2000,
    status: "In Progress",
    fabric: "Raw Silk & Chiffon",
    color: "Gold & Peach",
    work: "Zari & Sequin Neckline Embroidery",
    size: "Custom Fit (M)",
    notes: "Light pink/gold Anarkali with intricate embroidery on neckline and matching sleeves piping.",
    referenceImages: [
      "/images/booking/ref-gold-anarkali.jpg",
      "/images/booking/ref-pink-kurti.jpg",
      "/images/booking/ref-neckline-detail.jpg"
    ],
    timeline: [
      { title: "Order Placed & Confirmed", subtitle: "20 May 2024, 10:30 AM", complete: true },
      { title: "Design Discussion & Approval", subtitle: "21 May 2024, 02:15 PM", complete: true },
      { title: "Fabric Cut & Measurements Taken", subtitle: "22 May 2024, 11:00 AM", complete: true },
      { title: "In Production / Stitching", subtitle: "24 May 2024, 09:40 AM", complete: true },
      { title: "Quality Check & Finishing", subtitle: "Est. 27 May 2024", complete: false },
      { title: "Ready for Pickup / Out for Delivery", subtitle: "Est. 28 May 2024", complete: false },
      { title: "Delivered", subtitle: "Pending", complete: false }
    ]
  },
  {
    id: "SD1250",
    orderNumber: "Order #SD1250",
    tailorId: "stitch-craft",
    tailorName: "Stitch Craft",
    tailorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    tailorRating: 4.8,
    tailorReviewsCount: 94,
    tailorAddress: "Jaranwala Road, Kohinoor City, Faisalabad",
    itemTitle: "Blouse Stitching",
    serviceCategory: "Designer Blouse",
    garmentImage: "/images/booking/ref-peach-gown.jpg",
    placedDate: "18 May, 2024",
    estimatedDelivery: "25 May, 2024",
    amount: "₹1,200",
    amountValue: 1200,
    status: "Processing",
    fabric: "Silk Brocade",
    color: "Soft Peach Pink",
    work: "Padded Sweetheart Neckline with Dori",
    size: "Custom Fit (34B)",
    notes: "Deep back neck pattern with handcrafted latkans and piped borders.",
    referenceImages: [
      "/images/booking/ref-peach-gown.jpg",
      "/images/booking/ref-neckline-detail.jpg"
    ],
    timeline: [
      { title: "Order Placed & Confirmed", subtitle: "18 May 2024, 11:15 AM", complete: true },
      { title: "Fabric Inspection & Measurement Verify", subtitle: "19 May 2024, 04:00 PM", complete: true },
      { title: "In Production / Stitching", subtitle: "In Progress", complete: false },
      { title: "Quality Check", subtitle: "Pending", complete: false },
      { title: "Delivered", subtitle: "Pending", complete: false }
    ]
  },
  {
    id: "SD1048",
    orderNumber: "Order #SD1048",
    tailorId: "aarav-bespoke",
    tailorName: "Aarav Bespoke",
    tailorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    tailorRating: 4.7,
    tailorReviewsCount: 96,
    tailorAddress: "Chenone Road, People's Colony No 1, Faisalabad",
    itemTitle: "Sherwani",
    serviceCategory: "Men's Ethnic Wear",
    garmentImage: "/images/booking/ref-pink-kurti.jpg",
    placedDate: "15 May, 2024",
    estimatedDelivery: "22 May, 2024",
    amount: "₹4,500",
    amountValue: 4500,
    status: "Delivered",
    fabric: "Raw Silk & Jamawar",
    color: "Champagne Gold",
    work: "Handcrafted Zardozi Collar & Buttons",
    size: "Custom Fit (40 Regular)",
    notes: "Royal wedding sherwani with matching churidar and pocket square.",
    referenceImages: ["/images/booking/ref-pink-kurti.jpg"],
    timeline: [
      { title: "Order Placed & Confirmed", subtitle: "15 May 2024, 09:30 AM", complete: true },
      { title: "Trial Fitting Completed", subtitle: "18 May 2024, 03:00 PM", complete: true },
      { title: "Final Finishing & Steam Press", subtitle: "21 May 2024, 11:00 AM", complete: true },
      { title: "Delivered & Received", subtitle: "22 May 2024, 05:30 PM", complete: true }
    ]
  },
  {
    id: "SD1040",
    orderNumber: "Order #SD1040",
    tailorId: "noor-thread",
    tailorName: "Noor & Thread",
    tailorAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80",
    tailorRating: 4.5,
    tailorReviewsCount: 64,
    tailorAddress: "Bazar Kalan, Near Clock Tower, Faisalabad",
    itemTitle: "Lehenga Set",
    serviceCategory: "Bridal Wear",
    garmentImage: "/images/booking/ref-peach-gown.jpg",
    placedDate: "10 May, 2024",
    estimatedDelivery: "18 May, 2024",
    amount: "₹8,500",
    amountValue: 8500,
    status: "Delivered",
    fabric: "Georgette & Net",
    color: "Dusty Rose Pink",
    work: "Gotta Patti & Threadwork Embroidery",
    size: "Custom Fit (L)",
    notes: "Flared lehenga with cancan lining and custom stitched blouse.",
    referenceImages: ["/images/booking/ref-peach-gown.jpg"],
    timeline: [
      { title: "Order Placed", subtitle: "10 May 2024", complete: true },
      { title: "Stitching & Embroidery", subtitle: "14 May 2024", complete: true },
      { title: "Delivered", subtitle: "18 May 2024", complete: true }
    ]
  },
  {
    id: "SD1035",
    orderNumber: "Order #SD1035",
    tailorId: "meena-couture",
    tailorName: "Meena Couture",
    tailorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80",
    tailorRating: 4.9,
    tailorReviewsCount: 152,
    tailorAddress: "Main Plaza, Kohinoor City, Faisalabad",
    itemTitle: "Sharara Suit",
    serviceCategory: "Party Wear",
    garmentImage: "/images/booking/ref-gold-anarkali.jpg",
    placedDate: "05 May, 2024",
    estimatedDelivery: "14 May, 2024",
    amount: "₹3,200",
    amountValue: 3200,
    status: "In Progress",
    fabric: "Chiffon & Crepe",
    color: "Mustard Gold",
    work: "Mirror Work & Tassels",
    size: "Custom Fit (M)",
    notes: "Flared sharara pants with short embroidered kurti.",
    referenceImages: ["/images/booking/ref-gold-anarkali.jpg"],
    timeline: [
      { title: "Order Placed", subtitle: "05 May 2024", complete: true },
      { title: "Stitching", subtitle: "In Progress", complete: true }
    ]
  },
  {
    id: "SD1022",
    orderNumber: "Order #SD1022",
    tailorId: "ethnic-craft",
    tailorName: "Ethnic Craft Studio",
    tailorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
    tailorRating: 4.8,
    tailorReviewsCount: 112,
    tailorAddress: "Main Market, People's Colony No 2, Faisalabad",
    itemTitle: "Kurta Trouser Set",
    serviceCategory: "Casual Wear",
    garmentImage: "/images/booking/ref-pink-kurti.jpg",
    placedDate: "28 Apr, 2024",
    estimatedDelivery: "04 May, 2024",
    amount: "₹1,500",
    amountValue: 1500,
    status: "Delivered",
    fabric: "Cotton Lawn",
    color: "Powder Blue",
    work: "Thread Neckline & Lace Inserts",
    size: "Custom Fit (S)",
    notes: "Straight shirt with cigarette pants.",
    referenceImages: ["/images/booking/ref-pink-kurti.jpg"],
    timeline: [
      { title: "Order Placed", subtitle: "28 Apr 2024", complete: true },
      { title: "Delivered", subtitle: "04 May 2024", complete: true }
    ]
  },
  {
    id: "SD1015",
    orderNumber: "Order #SD1015",
    tailorId: "heritage-bespoke",
    tailorName: "Heritage Bespoke",
    tailorAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80",
    tailorRating: 4.7,
    tailorReviewsCount: 85,
    tailorAddress: "Canal Park Complex, Main Canal Road, Faisalabad",
    itemTitle: "2-Piece Formal Suit",
    serviceCategory: "Suits",
    garmentImage: "/images/booking/ref-gold-anarkali.jpg",
    placedDate: "20 Apr, 2024",
    estimatedDelivery: "29 Apr, 2024",
    amount: "₹3,500",
    amountValue: 3500,
    status: "Delivered",
    fabric: "Italian Wool Blend",
    color: "Charcoal Navy",
    work: "Bespoke Notch Lapel Cut",
    size: "Custom Fit (38R)",
    notes: "Slim fit trousers and single-breasted blazer.",
    referenceImages: ["/images/booking/ref-gold-anarkali.jpg"],
    timeline: [
      { title: "Order Placed", subtitle: "20 Apr 2024", complete: true },
      { title: "Delivered", subtitle: "29 Apr 2024", complete: true }
    ]
  },
  {
    id: "SD1008",
    orderNumber: "Order #SD1008",
    tailorId: "royal-threads",
    tailorName: "Royal Threads Studio",
    tailorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    tailorRating: 4.6,
    tailorReviewsCount: 78,
    tailorAddress: "Near Gate Plaza, Satyana Road, Faisalabad",
    itemTitle: "Saree Fall & Pico",
    serviceCategory: "Alterations",
    garmentImage: "/images/booking/ref-peach-gown.jpg",
    placedDate: "14 Apr, 2024",
    estimatedDelivery: "18 Apr, 2024",
    amount: "₹800",
    amountValue: 800,
    status: "Processing",
    fabric: "Pure Chiffon",
    color: "Coral Peach",
    work: "Pico Edging & Cotton Fall",
    size: "Standard (6.5m)",
    notes: "Color matched silk thread pico on pallu.",
    referenceImages: ["/images/booking/ref-peach-gown.jpg"],
    timeline: [
      { title: "Order Placed", subtitle: "14 Apr 2024", complete: true },
      { title: "In Progress", subtitle: "Processing", complete: true }
    ]
  }
];

/**
 * Fetch all customer orders with optional tab filtering
 */
export async function fetchCustomerOrdersApi(
  tab: "All" | "Processing" | "In Progress" | "Delivered" | "Cancelled" = "All"
): Promise<OrderItem[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

  if (apiUrl) {
    try {
      const res = await fetch(
        `${apiUrl}/api/customer/orders?status=${encodeURIComponent(tab)}`,
        {
          headers: { "Content-Type": "application/json" },
          cache: "no-store"
        }
      );
      if (res.ok) {
        const data = await res.json();
        return data.orders || data.data || [];
      }
    } catch (err) {
      console.warn("[Orders API] Backend unavailable, using local store:", err);
    }
  }

  // Local storage sync
  let ordersList = [...initialOrdersData];
  try {
    if (typeof window !== "undefined") {
      const storedJson = localStorage.getItem("sui_dhaga_orders");
      if (storedJson) {
        const storedList = JSON.parse(storedJson);
        ordersList = [...storedList, ...ordersList];
      }
    }
  } catch (e) {
    console.warn("Error reading local orders:", e);
  }

  if (tab === "All") return ordersList;
  return ordersList.filter((o) => o.status === tab);
}

/**
 * Fetch a single order by ID
 */
export async function fetchOrderByIdApi(orderId: string): Promise<OrderItem | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/api/customer/orders/${encodeURIComponent(orderId)}`, {
        headers: { "Content-Type": "application/json" },
        cache: "no-store"
      });
      if (res.ok) {
        const data = await res.json();
        return data.order || data;
      }
    } catch (err) {
      console.warn("[Orders API] Fetch by ID failed, falling back locally:", err);
    }
  }

  const all = await fetchCustomerOrdersApi("All");
  const found = all.find(
    (o) =>
      o.id.toLowerCase() === orderId.toLowerCase() ||
      o.orderNumber.toLowerCase().includes(orderId.toLowerCase())
  );

  return found || all[0] || initialOrdersData[0];
}
