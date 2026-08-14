/**
 * Customer Saved Designs Data & API Layer for Sui Dhāga
 * Connects to process.env.NEXT_PUBLIC_API_URL if configured,
 * with reliable local storage synchronization and mock fallback data.
 */

export interface SavedDesignItem {
  id: string;
  title: string;
  category: "Outfits" | "Blouses" | "Lehengas" | "Kurti" | "Sarees";
  savedDate: string;
  image: string;
  prompt?: string;
  fabric?: string;
  estimatedCost?: string;
  tags?: string[];
  isFavorite: boolean;
}

export const initialSavedDesignsData: SavedDesignItem[] = [
  {
    id: "des-1",
    title: "Pastel Anarkali",
    category: "Outfits",
    savedDate: "18 May, 2024",
    image: "/images/booking/ref-gold-anarkali.jpg",
    prompt: "Regal floor-length pastel gold Anarkali with intricate metallic threadwork embroidery and sheer organza dupatta.",
    fabric: "Raw Silk & Net",
    estimatedCost: "₹18,000 - ₹22,000",
    tags: ["Festive", "Gold Work", "Flared"],
    isFavorite: true
  },
  {
    id: "des-2",
    title: "Embroidered Blouse",
    category: "Blouses",
    savedDate: "16 May, 2024",
    image: "/images/saved-designs/embroidered-blouse.jpg",
    prompt: "Handcrafted bridal raw silk blouse with heavy paisley zardozi embroidery and pearl edging on neckline and sleeves.",
    fabric: "Pure Raw Silk",
    estimatedCost: "₹6,500 - ₹8,500",
    tags: ["Bridal", "Zardozi", "Pearls"],
    isFavorite: false
  },
  {
    id: "des-3",
    title: "Floral Lehenga",
    category: "Lehengas",
    savedDate: "14 May, 2024",
    image: "/images/booking/ref-peach-gown.jpg",
    prompt: "Dusty rose peach flared lehenga set with foil mirror work and embroidered sweetheart crop blouse.",
    fabric: "Georgette & Net",
    estimatedCost: "₹24,000 - ₹30,000",
    tags: ["Wedding", "Mirror Work", "Pastel"],
    isFavorite: false
  },
  {
    id: "des-4",
    title: "Silk Kurti",
    category: "Kurti",
    savedDate: "12 May, 2024",
    image: "/images/booking/ref-pink-kurti.jpg",
    prompt: "Mustard gold straight-cut silk kurti with lace panel inserts and cigarette trousers.",
    fabric: "Tussar Silk",
    estimatedCost: "₹4,500 - ₹6,000",
    tags: ["Casual Chic", "Straight Cut"],
    isFavorite: false
  },
  {
    id: "des-5",
    title: "Sharara Set",
    category: "Outfits",
    savedDate: "10 May, 2024",
    image: "/images/booking/ref-gold-anarkali.jpg",
    prompt: "Festive three-piece tiered sharara suit with gotta patti hemline and matching embroidered potli bag.",
    fabric: "Chiffon & Crepe",
    estimatedCost: "₹14,000 - ₹17,500",
    tags: ["Tiered", "Gotta Patti"],
    isFavorite: false
  },
  {
    id: "des-6",
    title: "Drape Saree",
    category: "Outfits",
    savedDate: "8 May, 2024",
    image: "/images/saved-designs/drape-saree.jpg",
    prompt: "Pre-stitched champagne beige drape saree with delicate sequin borders and modern structured pallu.",
    fabric: "Italian Organza & Chiffon",
    estimatedCost: "₹12,000 - ₹16,000",
    tags: ["Contemporary", "Pre-stitched"],
    isFavorite: false
  },
  {
    id: "des-7",
    title: "Velvet Sweetheart Blouse",
    category: "Blouses",
    savedDate: "05 May, 2024",
    image: "/images/saved-designs/embroidered-blouse.jpg",
    prompt: "Deep emerald velvet sweetheart blouse with antique gold dabka embroidery.",
    fabric: "Micro Velvet",
    estimatedCost: "₹7,000 - ₹9,000",
    tags: ["Winter Wedding", "Velvet"],
    isFavorite: false
  },
  {
    id: "des-8",
    title: "Can-Can Flared Lehenga",
    category: "Lehengas",
    savedDate: "02 May, 2024",
    image: "/images/booking/ref-peach-gown.jpg",
    prompt: "Heavy flair 16-kali banarasi silk lehenga with double can-can skirt lining.",
    fabric: "Banarasi Silk",
    estimatedCost: "₹28,000 - ₹35,000",
    tags: ["Banarasi", "Bridal Flair"],
    isFavorite: false
  }
];

/**
 * Fetch all saved designs with optional category filtering
 */
export async function fetchCustomerSavedDesignsApi(
  category: string = "All"
): Promise<SavedDesignItem[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

  if (apiUrl) {
    try {
      const res = await fetch(
        `${apiUrl}/api/customer/saved-designs?category=${encodeURIComponent(category)}`,
        {
          headers: { "Content-Type": "application/json" },
          cache: "no-store"
        }
      );
      if (res.ok) {
        const data = await res.json();
        return data.designs || data.data || [];
      }
    } catch (err) {
      console.warn("[Saved Designs API] Backend unavailable, using local store:", err);
    }
  }

  // Local storage sync
  let list = [...initialSavedDesignsData];
  try {
    if (typeof window !== "undefined") {
      const storedJson = localStorage.getItem("sui_dhaga_saved_designs");
      if (storedJson) {
        list = JSON.parse(storedJson);
      }
    }
  } catch (e) {
    console.warn("Error reading local saved designs:", e);
  }

  if (category === "All") return list;
  return list.filter((item) => item.category.toLowerCase() === category.toLowerCase());
}

/**
 * Remove a design from saved list
 */
export async function removeSavedDesignApi(designId: string): Promise<boolean> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

  if (apiUrl) {
    try {
      await fetch(`${apiUrl}/api/customer/saved-designs/${encodeURIComponent(designId)}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
    } catch (err) {
      console.warn("[Saved Designs API] Delete failed on backend, updating locally:", err);
    }
  }

  try {
    if (typeof window !== "undefined") {
      const storedJson = localStorage.getItem("sui_dhaga_saved_designs");
      let list: SavedDesignItem[] = storedJson ? JSON.parse(storedJson) : [...initialSavedDesignsData];
      list = list.filter((d) => d.id !== designId);
      localStorage.setItem("sui_dhaga_saved_designs", JSON.stringify(list));
    }
  } catch (e) {
    // ignore
  }

  return true;
}

/**
 * Toggle favorite status
 */
export async function toggleFavoriteDesignApi(designId: string): Promise<boolean> {
  try {
    if (typeof window !== "undefined") {
      const storedJson = localStorage.getItem("sui_dhaga_saved_designs");
      let list: SavedDesignItem[] = storedJson ? JSON.parse(storedJson) : [...initialSavedDesignsData];
      const target = list.find((d) => d.id === designId);
      if (target) {
        target.isFavorite = !target.isFavorite;
        localStorage.setItem("sui_dhaga_saved_designs", JSON.stringify(list));
        return target.isFavorite;
      }
    }
  } catch (e) {
    // ignore
  }
  return false;
}
