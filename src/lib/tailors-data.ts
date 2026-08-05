export interface TailorPackage {
  id: string;
  name: string;
  price: string;
  priceValue: number;
  turnaround: string;
  popular?: boolean;
  features?: string[];
}

export interface TailorReview {
  id: string;
  author: string;
  avatar: string;
  date: string;
  rating: number;
  comment: string;
}

export interface TailorAvailabilityDay {
  day: string;
  hours: string;
  closed?: boolean;
}

export interface TailorItem {
  id: string;
  name: string;
  handle: string;
  owner: string;
  rating: number;
  reviewsCount: number;
  distance: string;
  distanceKm: number;
  startingPrice: string;
  priceValue: number;
  turnaroundTime: string;
  specialties: string[];
  services: string[];
  city: string;
  locality: string;
  address: string;
  lat: number;
  lng: number;
  image: string;
  topRated: boolean;
  verified: boolean;
  about?: string;
  experience?: string;
  happyCustomers?: string;
  onTimeDelivery?: string;
  similarOutfitPrice?: string;
  reviewsSummary?: string;
  gallery?: string[];
  packages?: TailorPackage[];
  availability?: TailorAvailabilityDay[];
  reviews?: TailorReview[];
  ratingBreakdown?: Record<number, number>;
  mapPin: {
    x: number;
    y: number;
    label: string;
  };
}

export interface FilterOptions {
  searchQuery?: string;
  location?: string;
  specialty?: string;
  service?: string;
  priceRange?: string;
  ratingMin?: number;
  topRatedOnly?: boolean;
  verifiedOnly?: boolean;
  sortBy?: 'top-rated' | 'nearest' | 'price-low' | 'price-high';
}

export const initialTailors: TailorItem[] = [
  {
    id: "rekha-tailors",
    name: "Rekha Tailors",
    handle: "@rekhatailors",
    owner: "Rekha Verma",
    rating: 4.9,
    reviewsCount: 128,
    distance: "0.6 km",
    distanceKm: 0.6,
    startingPrice: "Starting from Rs. 1,000",
    priceValue: 1000,
    turnaroundTime: "3-5 days",
    specialties: ["Women's Wear", "Sarees", "Lehengas"],
    services: ["Sarees", "Lehengas", "Custom Suits", "Blouse Stitching"],
    city: "Faisalabad, Pakistan",
    locality: "D Ground",
    address: "Block B, Commercial Area, D Ground, Faisalabad",
    lat: 31.4132,
    lng: 73.1065,
    image: "/images/home/tailor-rekha.png",
    topRated: true,
    verified: true,
    mapPin: { x: 32, y: 44, label: "D Ground" }
  },
  {
    id: "stitch-craft",
    name: "Stitch Craft",
    handle: "@stitchcraft",
    owner: "Neha Sharma",
    rating: 4.8,
    reviewsCount: 94,
    distance: "1.2 km",
    distanceKm: 1.2,
    startingPrice: "Starting from Rs. 1,500",
    priceValue: 1500,
    turnaroundTime: "4-6 days",
    specialties: ["Men's Wear", "Kids Wear", "Shirts"],
    services: ["Shirts", "Suits", "Trousers", "Kurtas"],
    city: "Faisalabad, Pakistan",
    locality: "Kohinoor City",
    address: "Jaranwala Road, Kohinoor City, Faisalabad",
    lat: 31.4187,
    lng: 73.1165,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    topRated: true,
    verified: true,
    mapPin: { x: 72, y: 32, label: "Kohinoor City" }
  },
  {
    id: "aarav-bespoke",
    name: "Aarav Bespoke",
    handle: "@aaravbespoke",
    owner: "Aarav Khan",
    rating: 4.7,
    reviewsCount: 96,
    distance: "2.1 km",
    distanceKm: 2.1,
    startingPrice: "Starting from Rs. 2,000",
    priceValue: 2000,
    turnaroundTime: "5-7 days",
    specialties: ["Ethnic Wear", "Indo Western", "Sherwani"],
    services: ["Sherwani", "Indo Western", "Achkan", "Kurtas"],
    city: "Faisalabad, Pakistan",
    locality: "People's Colony",
    address: "Chenone Road, People's Colony No 1, Faisalabad",
    lat: 31.4095,
    lng: 73.0988,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    topRated: false,
    verified: true,
    mapPin: { x: 48, y: 62, label: "People's Colony" }
  },
  {
    id: "noor-thread",
    name: "Noor & Thread",
    handle: "@noorandthread",
    owner: "Noor Fatima",
    rating: 4.5,
    reviewsCount: 64,
    distance: "3.4 km",
    distanceKm: 3.4,
    startingPrice: "Starting from Rs. 3,000",
    priceValue: 3000,
    turnaroundTime: "7-10 days",
    specialties: ["Bridal Wear", "Lehengas", "Gowns"],
    services: ["Lehengas", "Gowns", "Anarkalis", "Dupattas"],
    city: "Faisalabad, Pakistan",
    locality: "Anarkali Bazaar",
    address: "Bazar Kalan, Near Clock Tower, Faisalabad",
    lat: 31.4180,
    lng: 73.0790,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80",
    topRated: false,
    verified: true,
    mapPin: { x: 26, y: 78, label: "Anarkali Bazaar" }
  },
  {
    id: "meena-couture",
    name: "Meena Couture",
    handle: "@meenacouture",
    owner: "Meena Devi",
    rating: 4.9,
    reviewsCount: 152,
    distance: "1.8 km",
    distanceKm: 1.8,
    startingPrice: "Starting from Rs. 2,500",
    priceValue: 2500,
    turnaroundTime: "4-6 days",
    specialties: ["Bridal Wear", "Anarkalis", "Sarees"],
    services: ["Anarkalis", "Sarees", "Bridal Sets"],
    city: "Faisalabad, Pakistan",
    locality: "Kohinoor City",
    address: "Main Plaza, Kohinoor City, Faisalabad",
    lat: 31.4200,
    lng: 73.1180,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80",
    topRated: true,
    verified: true,
    mapPin: { x: 82, y: 22, label: "Kohinoor City" }
  },
  {
    id: "royal-threads",
    name: "Royal Threads Studio",
    handle: "@royalthreads",
    owner: "Rohit Sharma",
    rating: 4.6,
    reviewsCount: 78,
    distance: "2.8 km",
    distanceKm: 2.8,
    startingPrice: "Starting from Rs. 1,800",
    priceValue: 1800,
    turnaroundTime: "3-5 days",
    specialties: ["Men's Wear", "Sherwani", "Suits"],
    services: ["Suits", "Sherwani", "Jackets"],
    city: "Faisalabad, Pakistan",
    locality: "Satyana Road",
    address: "Near Gate Plaza, Satyana Road, Faisalabad",
    lat: 31.4020,
    lng: 73.1100,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    topRated: false,
    verified: true,
    mapPin: { x: 38, y: 28, label: "Satyana Road" }
  },
  {
    id: "ethnic-craft",
    name: "Ethnic Craft Studio",
    handle: "@ethniccraft",
    owner: "Pooja Mehta",
    rating: 4.8,
    reviewsCount: 112,
    distance: "4.1 km",
    distanceKm: 4.1,
    startingPrice: "Starting from Rs. 1,200",
    priceValue: 1200,
    turnaroundTime: "4-7 days",
    specialties: ["Women's Wear", "Kurta Sets", "Shararas"],
    services: ["Kurta Sets", "Shararas", "Dupattas"],
    city: "Faisalabad, Pakistan",
    locality: "People's Colony",
    address: "Main Market, People's Colony No 2, Faisalabad",
    lat: 31.4050,
    lng: 73.0920,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
    topRated: true,
    verified: true,
    mapPin: { x: 68, y: 72, label: "People's Colony" }
  },
  {
    id: "heritage-bespoke",
    name: "Heritage Bespoke",
    handle: "@heritagebespoke",
    owner: "Vikram Malhotra",
    rating: 4.7,
    reviewsCount: 85,
    distance: "5.0 km",
    distanceKm: 5.0,
    startingPrice: "Starting from Rs. 3,500",
    priceValue: 3500,
    turnaroundTime: "6-8 days",
    specialties: ["Ethnic Wear", "Indo-Western", "Tuxedos"],
    services: ["Tuxedos", "Indo-Western", "Bandhgala"],
    city: "Faisalabad, Pakistan",
    locality: "Canal Road",
    address: "Canal Park Complex, Main Canal Road, Faisalabad",
    lat: 31.4300,
    lng: 73.1300,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80",
    topRated: false,
    verified: true,
    mapPin: { x: 18, y: 52, label: "Canal Road" }
  }
];

export interface PaginatedTailorsResponse {
  tailors: TailorItem[];
  totalCount: number;
  hasMore: boolean;
  page?: number;
  pageSize?: number;
}

// Backend-ready synchronous fallback service
export function getTailors(filters: FilterOptions = {}, page = 1, pageSize = 4): PaginatedTailorsResponse {
  let result = [...initialTailors];

  // Search filter
  if (filters.searchQuery && filters.searchQuery.trim() !== '') {
    const q = filters.searchQuery.toLowerCase().trim();
    result = result.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.owner.toLowerCase().includes(q) ||
        t.locality.toLowerCase().includes(q) ||
        t.address.toLowerCase().includes(q) ||
        t.specialties.some((s) => s.toLowerCase().includes(q)) ||
        t.services.some((s) => s.toLowerCase().includes(q))
    );
  }

  // Location filter
  if (filters.location && filters.location !== 'all') {
    result = result.filter((t) => t.locality.toLowerCase().includes(filters.location!.toLowerCase()));
  }

  // Specialty filter
  if (filters.specialty && filters.specialty !== 'all') {
    result = result.filter((t) =>
      t.specialties.some((s) => s.toLowerCase().includes(filters.specialty!.toLowerCase()))
    );
  }

  // Service filter
  if (filters.service && filters.service !== 'all') {
    result = result.filter((t) =>
      t.services.some((s) => s.toLowerCase().includes(filters.service!.toLowerCase()))
    );
  }

  // Price range filter
  if (filters.priceRange && filters.priceRange !== 'all') {
    if (filters.priceRange === 'under-1500') {
      result = result.filter((t) => t.priceValue <= 1500);
    } else if (filters.priceRange === '1500-3000') {
      result = result.filter((t) => t.priceValue >= 1500 && t.priceValue <= 3000);
    } else if (filters.priceRange === 'above-3000') {
      result = result.filter((t) => t.priceValue > 3000);
    }
  }

  // Rating filter
  if (filters.ratingMin) {
    result = result.filter((t) => t.rating >= filters.ratingMin!);
  }

  // Top Rated filter
  if (filters.topRatedOnly) {
    result = result.filter((t) => t.topRated);
  }

  // Verified filter
  if (filters.verifiedOnly) {
    result = result.filter((t) => t.verified);
  }

  // Sorting
  const sortBy = filters.sortBy || 'top-rated';
  if (sortBy === 'top-rated') {
    result.sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount);
  } else if (sortBy === 'nearest') {
    result.sort((a, b) => a.distanceKm - b.distanceKm);
  } else if (sortBy === 'price-low') {
    result.sort((a, b) => a.priceValue - b.priceValue);
  } else if (sortBy === 'price-high') {
    result.sort((a, b) => b.priceValue - a.priceValue);
  }

  const totalCount = result.length;
  const paginated = result.slice(0, page * pageSize);
  const hasMore = paginated.length < totalCount;

  return {
    tailors: paginated,
    totalCount,
    hasMore,
    page,
    pageSize
  };
}

/**
 * Async API Data fetcher configured for seamless backend REST integration.
 * Automatically connects to process.env.NEXT_PUBLIC_API_URL if defined,
 * with graceful fallback to local data service if backend is offline.
 */
export async function fetchTailorsApi(
  filters: FilterOptions = {},
  page = 1,
  pageSize = 4
): Promise<PaginatedTailorsResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

  if (apiUrl) {
    try {
      const params = new URLSearchParams();
      if (filters.searchQuery) params.append("q", filters.searchQuery);
      if (filters.location && filters.location !== "all") params.append("location", filters.location);
      if (filters.specialty && filters.specialty !== "all") params.append("specialty", filters.specialty);
      if (filters.service && filters.service !== "all") params.append("service", filters.service);
      if (filters.priceRange && filters.priceRange !== "all") params.append("priceRange", filters.priceRange);
      if (filters.ratingMin) params.append("ratingMin", filters.ratingMin.toString());
      if (filters.topRatedOnly) params.append("topRated", "true");
      if (filters.verifiedOnly) params.append("verified", "true");
      if (filters.sortBy) params.append("sortBy", filters.sortBy);
      params.append("page", page.toString());
      params.append("pageSize", pageSize.toString());

      const res = await fetch(`${apiUrl}/api/tailors?${params.toString()}`, {
        headers: { "Content-Type": "application/json" },
        cache: "no-store"
      });

      if (res.ok) {
        const data = await res.json();
        return {
          tailors: data.tailors ?? data.data ?? [],
          totalCount: data.totalCount ?? data.total ?? 0,
          hasMore: data.hasMore ?? (page * pageSize < (data.totalCount ?? data.total ?? 0)),
          page,
          pageSize
        };
      }
    } catch (err) {
      console.warn("[Tailors API] Backend endpoint unavailable, fallback to mock data:", err);
    }
  }

  return getTailors(filters, page, pageSize);
}

export async function fetchTailorByIdApi(id: string): Promise<TailorItem | undefined> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/api/tailors/${encodeURIComponent(id)}`, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.ok) {
        const data = await res.json();
        return data.tailor ?? data;
      }
    } catch (err) {
      console.warn("[Tailors API] Backend tailor detail unavailable, fallback to mock data:", err);
    }
  }

  return getTailorById(id);
}

export async function toggleWishlistApi(tailorId: string, wishlisted: boolean): Promise<boolean> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/api/wishlist`, {
        method: wishlisted ? "POST" : "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tailorId })
      });
      return res.ok;
    } catch (err) {
      console.warn("[Wishlist API] Wishlist sync failed:", err);
    }
  }

  return true;
}

/**
 * Create a new Tailor Profile on the backend (Profile Generation / Onboarding).
 * Sends POST /api/tailors
 */
export async function createTailorProfileApi(
  profileData: Partial<TailorItem>
): Promise<{ success: boolean; tailor?: TailorItem; error?: string }> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/api/tailors`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData)
      });
      if (res.ok) {
        const data = await res.json();
        return { success: true, tailor: data.tailor ?? data };
      }
      const errData = await res.json().catch(() => ({}));
      return { success: false, error: errData.message || "Failed to create profile" };
    } catch (err: any) {
      console.warn("[Tailor Profile API] Create profile failed:", err);
      return { success: false, error: err?.message || "Backend network error" };
    }
  }

  // Fallback local mock profile generation
  const newId = profileData.name
    ? profileData.name.toLowerCase().replace(/\s+/g, "-")
    : `tailor-${Date.now()}`;
  const base = getTailorById("rekha-tailors")!;
  const mockTailor: TailorItem = {
    ...base,
    ...profileData,
    id: newId,
    name: profileData.name || "Custom Tailor"
  };
  initialTailors.push(mockTailor);
  return { success: true, tailor: mockTailor };
}

/**
 * Update an existing Tailor Profile on the backend.
 * Sends PUT /api/tailors/:id
 */
export async function updateTailorProfileApi(
  id: string,
  profileData: Partial<TailorItem>
): Promise<{ success: boolean; tailor?: TailorItem; error?: string }> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/api/tailors/${encodeURIComponent(id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData)
      });
      if (res.ok) {
        const data = await res.json();
        return { success: true, tailor: data.tailor ?? data };
      }
    } catch (err) {
      console.warn("[Tailor Profile API] Update profile failed:", err);
    }
  }

  return { success: true };
}

/**
 * Submit a review for a tailor on the backend.
 * Sends POST /api/tailors/:id/reviews
 */
export async function submitTailorReviewApi(
  tailorId: string,
  reviewData: { rating: number; comment: string; author?: string }
): Promise<boolean> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

  if (apiUrl) {
    try {
      const res = await fetch(
        `${apiUrl}/api/tailors/${encodeURIComponent(tailorId)}/reviews`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reviewData)
        }
      );
      return res.ok;
    } catch (err) {
      console.warn("[Tailor Review API] Review submit failed:", err);
    }
  }

  return true;
}

export function getTailorById(id: string): TailorItem | undefined {
  const base = initialTailors.find((t) => t.id === id) || initialTailors[0];
  if (!base) return undefined;

  return {
    ...base,
    about:
      base.about ||
      `We bring 12+ years of expertise in creating elegant and customized outfits. From traditional wear to contemporary styles, we ensure perfect fit and premium craftsmanship for all special occasions.`,
    experience: base.experience || (base.id === "stitch-craft" ? "8+ Years" : base.id === "aarav-bespoke" ? "10+ Years" : "12+ Years"),
    happyCustomers: base.happyCustomers || (base.id === "stitch-craft" ? "1.2K+" : base.id === "aarav-bespoke" ? "1.8K+" : "2K+"),
    onTimeDelivery: base.onTimeDelivery || (base.id === "stitch-craft" ? "95%" : base.id === "aarav-bespoke" ? "96%" : "98%"),
    similarOutfitPrice: base.similarOutfitPrice || (base.id === "stitch-craft" ? "Rs. 2,200 (Example)" : base.id === "aarav-bespoke" ? "Rs. 2,800 (Example)" : "Rs. 2,000 (Example)"),
    reviewsSummary: base.reviewsSummary || (base.id === "stitch-craft" ? "Good quality and timely" : base.id === "aarav-bespoke" ? "Premium quality fabric" : "Excellent stitching and fit"),
    gallery: base.gallery || [
      base.image,
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80"
    ],
    packages: base.packages || [
      {
        id: "pkg-1",
        name: "Basic Stitching",
        price: "Rs. 1,000",
        priceValue: 1000,
        turnaround: "3-4 days",
        popular: false,
        features: ["Standard Fitting", "1 Revision Included", "Basic Trims"]
      },
      {
        id: "pkg-2",
        name: "Premium Stitching",
        price: "Rs. 2,000",
        priceValue: 2000,
        turnaround: "5-7 days",
        popular: true,
        features: ["Custom Pattern", "2 Revisions Included", "Premium Lining & Trims"]
      },
      {
        id: "pkg-3",
        name: "Custom Design",
        price: "Rs. 3,500",
        priceValue: 3500,
        turnaround: "7-10 days",
        popular: false,
        features: ["Bespoke Styling", "Unlimited Consultations", "Embroidery & Finishing"]
      }
    ],
    availability: base.availability || [
      { day: "Mon", hours: "9:00 AM - 7:00 PM" },
      { day: "Tue", hours: "9:00 AM - 7:00 PM" },
      { day: "Wed", hours: "9:00 AM - 7:00 PM" },
      { day: "Thu", hours: "9:00 AM - 7:00 PM" },
      { day: "Fri", hours: "9:00 AM - 7:00 PM" },
      { day: "Sat", hours: "9:00 AM - 6:00 PM" },
      { day: "Sun", hours: "Closed", closed: true }
    ],
    ratingBreakdown: base.ratingBreakdown || {
      5: 84,
      4: 12,
      3: 3,
      2: 1,
      1: 0
    },
    reviews: base.reviews || [
      {
        id: "rev-1",
        author: "Ayesha Khan",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
        date: "2 weeks ago",
        rating: 5,
        comment: "Absolutely loved the stitching and fit! The team is very professional, courteous, and attentive to every detail."
      },
      {
        id: "rev-2",
        author: "Pooja Mehta",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        date: "1 month ago",
        rating: 5,
        comment: "My go-to tailor for all festive outfits. Outstanding quality, perfect fitting, and delivered right on time!"
      },
      {
        id: "rev-3",
        author: "Neha Verma",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
        date: "2 months ago",
        rating: 5,
        comment: "Great experience! They delivered before time and the fit was perfect without needing any extra alterations."
      }
    ]
  };
}
