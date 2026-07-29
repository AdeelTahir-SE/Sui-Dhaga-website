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
  image: string;
  topRated: boolean;
  verified: boolean;
  mapPin: {
    x: number; // percentage X position on map
    y: number; // percentage Y position on map
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
    startingPrice: "Starting from ₹1,000",
    priceValue: 1000,
    turnaroundTime: "3-5 days",
    specialties: ["Women's Wear", "Sarees", "Lehengas"],
    services: ["Sarees", "Lehengas", "Custom Suits", "Blouse Stitching"],
    city: "Delhi, India",
    locality: "Siri Fort",
    image: "/images/home/tailor-rekha.png",
    topRated: true,
    verified: true,
    mapPin: { x: 32, y: 44, label: "Siri Fort" }
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
    startingPrice: "Starting from ₹1,500",
    priceValue: 1500,
    turnaroundTime: "4-6 days",
    specialties: ["Men's Wear", "Kids Wear", "Shirts"],
    services: ["Shirts", "Suits", "Trousers", "Kurtas"],
    city: "Delhi, India",
    locality: "Greater Kailash",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    topRated: true,
    verified: true,
    mapPin: { x: 72, y: 32, label: "Greater Kailash" }
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
    startingPrice: "Starting from ₹2,000",
    priceValue: 2000,
    turnaroundTime: "5-7 days",
    specialties: ["Ethnic Wear", "Indo Western", "Sherwani"],
    services: ["Sherwani", "Indo Western", "Achkan", "Kurtas"],
    city: "Delhi, India",
    locality: "Saket",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    topRated: false,
    verified: true,
    mapPin: { x: 48, y: 62, label: "Saket" }
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
    startingPrice: "Starting from ₹3,000",
    priceValue: 3000,
    turnaroundTime: "7-10 days",
    specialties: ["Bridal Wear", "Lehengas", "Gowns"],
    services: ["Lehengas", "Gowns", "Anarkalis", "Dupattas"],
    city: "Delhi, India",
    locality: "Hauz Khas",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80",
    topRated: false,
    verified: true,
    mapPin: { x: 26, y: 78, label: "Hauz Khas" }
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
    startingPrice: "Starting from ₹2,500",
    priceValue: 2500,
    turnaroundTime: "4-6 days",
    specialties: ["Bridal Wear", "Anarkalis", "Sarees"],
    services: ["Anarkalis", "Sarees", "Bridal Sets"],
    city: "Delhi, India",
    locality: "Greater Kailash",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80",
    topRated: true,
    verified: true,
    mapPin: { x: 82, y: 22, label: "Greater Kailash" }
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
    startingPrice: "Starting from ₹1,800",
    priceValue: 1800,
    turnaroundTime: "3-5 days",
    specialties: ["Men's Wear", "Sherwani", "Suits"],
    services: ["Suits", "Sherwani", "Jackets"],
    city: "Delhi, India",
    locality: "Siri Fort",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    topRated: false,
    verified: true,
    mapPin: { x: 38, y: 28, label: "Siri Fort" }
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
    startingPrice: "Starting from ₹1,200",
    priceValue: 1200,
    turnaroundTime: "4-7 days",
    specialties: ["Women's Wear", "Kurta Sets", "Shararas"],
    services: ["Kurta Sets", "Shararas", "Dupattas"],
    city: "Delhi, India",
    locality: "Saket",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
    topRated: true,
    verified: true,
    mapPin: { x: 68, y: 72, label: "Saket" }
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
    startingPrice: "Starting from ₹3,500",
    priceValue: 3500,
    turnaroundTime: "6-8 days",
    specialties: ["Ethnic Wear", "Indo-Western", "Tuxedos"],
    services: ["Tuxedos", "Indo-Western", "Bandhgala"],
    city: "Delhi, India",
    locality: "Vasant Kunj",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80",
    topRated: false,
    verified: true,
    mapPin: { x: 18, y: 52, label: "Vasant Kunj" }
  }
];

// Backend-ready data fetching service functions
export function getTailors(filters: FilterOptions = {}, page = 1, pageSize = 4): {
  tailors: TailorItem[];
  totalCount: number;
  hasMore: boolean;
} {
  let result = [...initialTailors];

  // Search filter
  if (filters.searchQuery && filters.searchQuery.trim() !== '') {
    const q = filters.searchQuery.toLowerCase().trim();
    result = result.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.owner.toLowerCase().includes(q) ||
        t.locality.toLowerCase().includes(q) ||
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
    hasMore
  };
}

export function getTailorById(id: string): TailorItem | undefined {
  return initialTailors.find((t) => t.id === id);
}
