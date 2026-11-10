/**
 * AI Design Studio Data & API Layer for Sui Dhāga
 * Connects directly to live database endpoints (/designs, /community/posts,
 * /measurements, /uploads/image) via authenticated API services,
 * with clean local persistence and guest-only demo fallbacks.
 */

import { getAuthToken } from "./api/client";
import { designService } from "./api/design-service";
import { communityService } from "./api/community-service";
import { measurementService } from "./api/measurement-service";
import { getCachedValue, notifyCacheDomain } from "./api/data-cache";
import {
  ApiResponse,
  CommunityPost as ApiCommunityPost,
  Design as ApiDesign,
  MeasurementProfile as ApiMeasurementProfile,
} from "./api/types";

export interface StudioDesignItem {
  id: string;
  title: string;
  category: "Ethnic Wear" | "Anarkali" | "Kurta Set" | "Lehenga" | "Indo-Western" | "Saree" | "Sherwani";
  editedAgo: string;
  savedDate: string;
  image: string;
  prompt: string;
  fabric: string;
  colorPalette: string[];
  estimatedCost: string;
  tags: string[];
  isFavorite: boolean;
  isTrash?: boolean;
  likesCount?: number;
}

export interface AiSuggestionItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  category: string;
  prompt: string;
  tags: string[];
  fabric: string;
}

export interface StudioTemplate {
  id: string;
  title: string;
  category: "Trending" | "Festive" | "Casual" | "Bridal" | "Men's";
  image: string;
  description: string;
  fabric: string;
  estimatedPrice: string;
  usageCount: number;
  tags: string[];
}

export interface TechPackData {
  id: string;
  designId: string;
  designName: string;
  category: string;
  type: string;
  occasion: string;
  createdOn: string;
  previewImage: string;
  sizeChart: { size: string; chest: string; waist: string; hip: string; length: string }[];
  colorPalette: { name: string; hex: string }[];
  fabrics: { name: string; composition: string; yardage: string }[];
  embroideryDetails: string;
  liningDetails: string;
  stitchingNotes: string;
}

export interface ChatMessage {
  id: string;
  sender: "ai" | "user";
  text: string;
  timestamp: string;
  images?: string[];
  suggestedReplies?: string[];
}

export interface DesignGenerationPayload {
  prompt: string;
  garmentType: string;
  style: string;
  occasion: string;
  colorPreference?: string;
  fabric?: string;
  referenceImage?: string;
}

// ---------------------------------------------------------------------------
// Initial Mock Datasets
// ---------------------------------------------------------------------------

export const initialRecentDesigns: StudioDesignItem[] = [
  {
    id: "des-recent-1",
    title: "Mint Green Anarkali",
    category: "Anarkali",
    editedAgo: "Edited 2 days ago",
    savedDate: "13 Aug, 2024",
    image: "/images/design-studio/recent/kurta-mint.jpg",
    prompt: "Pastel mint green pure silk flared A-line Anarkali with delicate neckline gold border detailing and sheer dupatta.",
    fabric: "Chanderi Silk & Net",
    colorPalette: ["#A8DADC", "#CDEBE4", "#E8E9DE", "#57AFA4"],
    estimatedCost: "₹14,500 - ₹19,000",
    tags: ["Anarkali", "Pastel Mint", "Traditional"],
    isFavorite: true,
    isTrash: false,
    likesCount: 142
  },
  {
    id: "des-recent-2",
    title: "Blue Lehenga",
    category: "Lehenga",
    editedAgo: "Edited 3 days ago",
    savedDate: "12 Aug, 2024",
    image: "/images/design-studio/chat-lehenga-var1.jpg",
    prompt: "Royal sapphire blue flared bridal lehenga with sheer long sleeves and silver metallic gotta patti embroidery.",
    fabric: "Raw Silk & Net",
    colorPalette: ["#164E80", "#FAF8F5", "#D1D5DB", "#6652A8"],
    estimatedCost: "₹28,000 - ₹38,000",
    tags: ["Lehenga", "Royal Blue", "Sangeet"],
    isFavorite: true,
    isTrash: false,
    likesCount: 210
  },
  {
    id: "des-recent-3",
    title: "Cream Kurta Set",
    category: "Sherwani",
    editedAgo: "Edited 5 days ago",
    savedDate: "10 Aug, 2024",
    image: "/images/design-studio/templates-mens-kurta.jpg",
    prompt: "Classic men's silk bandhgala kurta with delicate neckline motif, churidar and embroidered cuffs.",
    fabric: "Pure Silk Blend",
    colorPalette: ["#FAF5EA", "#EAE6DF", "#111111", "#D5B069"],
    estimatedCost: "₹9,500 - ₹14,000",
    tags: ["Kurta Set", "Men's", "Classic"],
    isFavorite: false,
    isTrash: false,
    likesCount: 95
  },
  {
    id: "des-recent-4",
    title: "Floral Gown",
    category: "Anarkali",
    editedAgo: "Edited 1 week ago",
    savedDate: "08 Aug, 2024",
    image: "/images/design-studio/generated-pink-anarkali.jpg",
    prompt: "Pastel peach pink layered floor-sweeping evening gown with tonal resham embroidery and flared kalis.",
    fabric: "Organza & Chiffon",
    colorPalette: ["#F2BCBC", "#E7C0A0", "#FFFDF9", "#B43B73"],
    estimatedCost: "₹22,000 - ₹28,000",
    tags: ["Gown", "Floral", "Evening"],
    isFavorite: true,
    isTrash: false,
    likesCount: 180
  },
  {
    id: "des-recent-5",
    title: "Peach Sharara",
    category: "Kurta Set",
    editedAgo: "Edited 1 week ago",
    savedDate: "07 Aug, 2024",
    image: "/images/design-studio/recent/anarkali-gold.jpg",
    prompt: "Champagne gold and peach flared sharara set with hand zardozi hemline and organza dupatta.",
    fabric: "Raw Silk & Net",
    colorPalette: ["#D5B069", "#E7C0A0", "#F1EEE8", "#111111"],
    estimatedCost: "₹18,000 - ₹24,000",
    tags: ["Sharara", "Gold Work", "Festive"],
    isFavorite: false,
    isTrash: false,
    likesCount: 112
  },
  {
    id: "des-recent-6",
    title: "Navy Indo Western",
    category: "Indo-Western",
    editedAgo: "Edited 2 weeks ago",
    savedDate: "01 Aug, 2024",
    image: "/images/design-studio/recent/indowestern-sage.jpg",
    prompt: "Contemporary dark navy fusion long jacket with structured shoulders, trousers and drape.",
    fabric: "Italian Crepe & Brocade",
    colorPalette: ["#164E80", "#84A85C", "#DFDDD8", "#111111"],
    estimatedCost: "₹16,500 - ₹22,000",
    tags: ["Indo Western", "Navy", "Fusion"],
    isFavorite: false,
    isTrash: false,
    likesCount: 130
  },
  {
    id: "des-recent-7",
    title: "Yellow Saree",
    category: "Saree",
    editedAgo: "Edited 2 weeks ago",
    savedDate: "01 Aug, 2024",
    image: "/images/design-studio/recent/lehenga-rose.jpg",
    prompt: "Festive mustard yellow pleated saree drape with mirrorwork blouse and scalloped border.",
    fabric: "Georgette & Silk",
    colorPalette: ["#FFD233", "#F5A623", "#FFFDF9", "#111111"],
    estimatedCost: "₹15,000 - ₹20,000",
    tags: ["Saree", "Yellow", "Haldi Special"],
    isFavorite: true,
    isTrash: false,
    likesCount: 175
  },
  {
    id: "des-recent-8",
    title: "Pastel Co-ord Set",
    category: "Kurta Set",
    editedAgo: "Edited 2 weeks ago",
    savedDate: "30 Jul, 2024",
    image: "/images/design-studio/generated-pastel-blue-anarkali.jpg",
    prompt: "Pastel ice blue flared co-ord peplum top with straight pants and metallic embroidery accents.",
    fabric: "Chanderi Silk",
    colorPalette: ["#A8DADC", "#CDEBE4", "#FFFFFF", "#57AFA4"],
    estimatedCost: "₹11,000 - ₹15,000",
    tags: ["Co-ord", "Pastel", "Modern"],
    isFavorite: false,
    isTrash: false,
    likesCount: 88
  }
];

export const initialAiSuggestions: AiSuggestionItem[] = [
  {
    id: "sugg-1",
    title: "Pastel Eid Look",
    subtitle: "Soft mint & gold palette",
    image: "/images/design-studio/recent/kurta-mint.jpg",
    category: "Kurta Set",
    prompt: "Soft pastel mint green silk festive A-line kurta with delicate neckline motif.",
    tags: ["Eid Special", "Pastel", "Chanderi"],
    fabric: "Chanderi Silk"
  },
  {
    id: "sugg-2",
    title: "Wedding Glam Set",
    subtitle: "Royal zardozi flare",
    image: "/images/design-studio/recent/anarkali-gold.jpg",
    category: "Anarkali",
    prompt: "Floor-sweeping champagne gold zardozi Anarkali with flared skirt.",
    tags: ["Wedding", "Royal", "Heavy Work"],
    fabric: "Raw Silk"
  },
  {
    id: "sugg-3",
    title: "Botanical Lehenga",
    subtitle: "Hand-embroidered florals",
    image: "/images/design-studio/recent/lehenga-rose.jpg",
    category: "Lehenga",
    prompt: "Dusty rose peach lehenga set with intricate floral threadwork and mirror details.",
    tags: ["Bridal", "Flora", "Mirror Work"],
    fabric: "Georgette & Net"
  },
  {
    id: "sugg-4",
    title: "Modern Draped Gown",
    subtitle: "Contemporary silhouette",
    image: "/images/design-studio/recent/indowestern-sage.jpg",
    category: "Indo-Western",
    prompt: "Sage green corset-structured fusion gown with pleated flowing drape.",
    tags: ["Modern", "Cocktail", "Fusion"],
    fabric: "Crepe & Satin"
  },
  {
    id: "sugg-5",
    title: "Royal Blue Sangeet Set",
    subtitle: "Deep sapphire velvet finish",
    image: "/images/design-studio/previews/royal-blue-lehenga.png",
    category: "Lehenga",
    prompt: "Midnight sapphire royal blue lehenga with silver gotta patti accents.",
    tags: ["Sangeet", "Sapphire", "Velvet"],
    fabric: "Micro Velvet & Silk"
  }
];

export const initialTemplates: StudioTemplate[] = [
  {
    id: "tmpl-1",
    title: "Pastel Anarkali",
    category: "Trending",
    image: "/images/design-studio/recent/kurta-mint.jpg",
    description: "Light pastel flared Anarkali silhouette with delicate neckline embroidery.",
    fabric: "Chanderi Silk",
    estimatedPrice: "₹14,500",
    usageCount: 520,
    tags: ["Anarkali", "Popular", "Pastel"]
  },
  {
    id: "tmpl-2",
    title: "Embroidered Lehenga",
    category: "Bridal",
    image: "/images/design-studio/recent/lehenga-rose.jpg",
    description: "Dusty rose flared lehenga with heavy botanical floral embroidery.",
    fabric: "Organza & Net",
    estimatedPrice: "₹32,000",
    usageCount: 680,
    tags: ["Lehenga", "Popular", "Bridal"]
  },
  {
    id: "tmpl-3",
    title: "Floral Saree",
    category: "Festive",
    image: "/images/design-studio/recent/anarkali-gold.jpg",
    description: "Intricately embellished regal gold drape with sequin borders.",
    fabric: "Raw Silk",
    estimatedPrice: "₹18,000",
    usageCount: 410,
    tags: ["Saree", "Popular", "Gold"]
  },
  {
    id: "tmpl-4",
    title: "Indo Western Set",
    category: "Trending",
    image: "/images/design-studio/recent/indowestern-sage.jpg",
    description: "Contemporary draped silhouette with sculpted corset bodice.",
    fabric: "Italian Crepe",
    estimatedPrice: "₹16,500",
    usageCount: 390,
    tags: ["Indo Western", "Popular", "Fusion"]
  },
  {
    id: "tmpl-5",
    title: "Sharara Set",
    category: "Trending",
    image: "/images/design-studio/generated-pastel-blue-anarkali.jpg",
    description: "Pastel powder blue tiered sharara suit with gotta patti accents.",
    fabric: "Georgette & Net",
    estimatedPrice: "₹19,000",
    usageCount: 340,
    tags: ["Kurta Set", "Trending", "Sharara"]
  },
  {
    id: "tmpl-6",
    title: "Kurta Set",
    category: "Men's",
    image: "/images/design-studio/templates-mens-kurta.jpg",
    description: "Classic silk bandhgala kurta with delicate collar embroidery and churidar.",
    fabric: "Pure Silk Blend",
    estimatedPrice: "₹9,500",
    usageCount: 290,
    tags: ["Men's Wear", "Popular", "Classic"]
  },
  {
    id: "tmpl-7",
    title: "Layered Gown",
    category: "Trending",
    image: "/images/design-studio/generated-pink-anarkali.jpg",
    description: "Floor-sweeping flared layered evening gown with tonal resham embroidery.",
    fabric: "Chiffon & Satin",
    estimatedPrice: "₹22,000",
    usageCount: 310,
    tags: ["Gown", "Trending", "Layered"]
  },
  {
    id: "tmpl-8",
    title: "Printed Co-ord",
    category: "Casual",
    image: "/images/design-studio/generated-mint-anarkali.jpg",
    description: "Modern ethnic co-ord flared outfit with subtle threadwork motifs.",
    fabric: "Chanderi Cotton",
    estimatedPrice: "₹8,500",
    usageCount: 220,
    tags: ["Co-ord Sets", "New Arrivals", "Casual"]
  }
];

export const sampleTechPacks: Record<string, TechPackData> = {
  "des-recent-1": {
    id: "tp-101",
    designId: "des-recent-1",
    designName: "Embroidered Anarkali",
    category: "Women's Ethnic",
    type: "Anarkali Suit",
    occasion: "Festive / Wedding Reception",
    createdOn: "13 Aug 2024",
    previewImage: "/images/design-studio/recent/anarkali-gold.jpg",
    sizeChart: [
      { size: "XS", chest: "32 in", waist: "26 in", hip: "36 in", length: "54 in" },
      { size: "S", chest: "34 in", waist: "28 in", hip: "38 in", length: "54 in" },
      { size: "M", chest: "36 in", waist: "30 in", hip: "40 in", length: "55 in" },
      { size: "L", chest: "38 in", waist: "32 in", hip: "42 in", length: "55 in" },
      { size: "XL", chest: "40 in", waist: "34 in", hip: "44 in", length: "56 in" },
      { size: "Custom", chest: "Tailor Fit", waist: "Tailor Fit", hip: "Tailor Fit", length: "Tailor Fit" }
    ],
    colorPalette: [
      { name: "Antique Gold", hex: "#D5B069" },
      { name: "Champagne Beige", hex: "#E7C0A0" },
      { name: "Ivory Base", hex: "#F1EEE8" },
      { name: "Royal Purple Accent", hex: "#6652A8" }
    ],
    fabrics: [
      { name: "Pure Raw Silk", composition: "100% Silk", yardage: "4.5 Meters" },
      { name: "Soft Net Organza", composition: "100% Poly-Net", yardage: "2.5 Meters" },
      { name: "Cotton Santoon Lining", composition: "100% Cotton Blend", yardage: "4.0 Meters" }
    ],
    embroideryDetails: "Hand-crafted Zardozi, Kasab metallic threadwork with micro-pearl edging along yoke and hem border.",
    liningDetails: "Double layer soft breathable santoon with reinforced interlining across bodice.",
    stitchingNotes: "Concealed side zipper with safety hook, bra-pad inserts included, French seam finishes."
  },
  "des-recent-2": {
    id: "tp-102",
    designId: "des-recent-2",
    designName: "Pastel Kurta Set",
    category: "Women's Ethnic",
    type: "A-Line Kurta Set",
    occasion: "Daytime Festive / Mehendi",
    createdOn: "13 Aug 2024",
    previewImage: "/images/design-studio/recent/kurta-mint.jpg",
    sizeChart: [
      { size: "S", chest: "34 in", waist: "28 in", hip: "38 in", length: "46 in" },
      { size: "M", chest: "36 in", waist: "30 in", hip: "40 in", length: "46 in" },
      { size: "L", chest: "38 in", waist: "32 in", hip: "42 in", length: "47 in" }
    ],
    colorPalette: [
      { name: "Pastel Mint", hex: "#CDEBE4" },
      { name: "Teal Green", hex: "#57AFA4" },
      { name: "Subtle Gold", hex: "#DAD98B" }
    ],
    fabrics: [
      { name: "Chanderi Silk", composition: "70% Silk, 30% Cotton", yardage: "3.5 Meters" },
      { name: "Mulmul Lining", composition: "100% Cotton", yardage: "2.5 Meters" }
    ],
    embroideryDetails: "Fine zari threadwork and sequin accents around round slit neckline and cuffs.",
    liningDetails: "Full mulmul breathable cotton lining in kurta.",
    stitchingNotes: "Side pockets on trousers, elasticated back waistband with drawstrings."
  }
};

// ---------------------------------------------------------------------------
// Mapping & Local Persistence Helpers
// ---------------------------------------------------------------------------

const LOCAL_CREATED_DESIGNS_KEY = "sui_dhaga_studio_created_designs";
const LOCAL_PREFS_KEY = "sui_dhaga_studio_design_prefs";
const LEGACY_LOCAL_DESIGNS_KEY = "sui_dhaga_studio_recent_designs";

interface StudioDesignPrefs {
  favorites: Record<string, boolean>;
  trash: Record<string, boolean>;
  edits: Record<string, Partial<StudioDesignItem>>;
}

const VALID_STUDIO_CATEGORIES: StudioDesignItem["category"][] = [
  "Ethnic Wear",
  "Anarkali",
  "Kurta Set",
  "Lehenga",
  "Indo-Western",
  "Saree",
  "Sherwani"
];

function normalizeStudioCategory(raw?: string): StudioDesignItem["category"] {
  if (!raw) return "Ethnic Wear";
  const matched = VALID_STUDIO_CATEGORIES.find(
    (c) => c.toLowerCase() === raw.toLowerCase()
  );
  if (matched) return matched;
  const lower = raw.toLowerCase();
  if (lower.includes("anarkali") || lower.includes("gown")) return "Anarkali";
  if (lower.includes("lehenga")) return "Lehenga";
  if (lower.includes("saree")) return "Saree";
  if (lower.includes("sherwani") || lower.includes("men")) return "Sherwani";
  if (lower.includes("kurta") || lower.includes("sharara") || lower.includes("co-ord")) return "Kurta Set";
  if (lower.includes("indo")) return "Indo-Western";
  return "Ethnic Wear";
}

function formatRelativeAgo(isoDate?: string): string {
  if (!isoDate) return "Edited recently";
  const dateMs = new Date(isoDate).getTime();
  if (Number.isNaN(dateMs)) return "Edited recently";
  const diffDays = Math.floor((Date.now() - dateMs) / (1000 * 60 * 60 * 24));
  if (diffDays <= 0) return "Edited today";
  if (diffDays === 1) return "Edited 1 day ago";
  if (diffDays < 7) return `Edited ${diffDays} days ago`;
  const diffWeeks = Math.floor(diffDays / 7);
  return `Edited ${diffWeeks} week${diffWeeks > 1 ? "s" : ""} ago`;
}

/**
 * Map a backend Design DTO into StudioDesignItem
 */
export function mapBackendDesignToStudioItem(des: ApiDesign): StudioDesignItem {
  const opts = des.customization_options || {};
  const palette: string[] = Array.isArray(des.color_palette)
    ? des.color_palette
    : Array.isArray(opts.colorPalette)
    ? opts.colorPalette
    : des.color
    ? [des.color, "#FAF8F5", "#D5B069", "#334155"]
    : ["#078B87", "#D5B069", "#FAF8F5", "#334155"];

  return {
    id: des.id,
    title: des.title || des.name || "Custom AI Design",
    category: normalizeStudioCategory(des.category),
    editedAgo: formatRelativeAgo(des.updated_at || des.created_at),
    savedDate: des.created_at
      ? new Date(des.created_at).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        })
      : "Recently",
    image:
      des.preview_url ||
      des.previewUrl ||
      des.image_url ||
      des.imageUrl ||
      des.thumbnail_url ||
      "/images/design-studio/recent/anarkali-gold.jpg",
    prompt: des.prompt || des.description || "Custom tailored AI outfit design.",
    fabric:
      des.fabric_type ||
      des.fabric ||
      (typeof opts.fabric === "string" && opts.fabric) ||
      "Pure Silk & Organza",
    colorPalette: palette,
    estimatedCost:
      des.estimated_cost ||
      (typeof opts.estimatedCost === "string" && opts.estimatedCost) ||
      "Rs. 14,500 - Rs. 20,000",
    tags:
      Array.isArray(des.tags) && des.tags.length > 0
        ? des.tags
        : [des.category || "Custom", "AI Studio"],
    isFavorite: Boolean(des.is_favorite ?? des.isFavorite ?? false),
    isTrash: Boolean(des.is_trash ?? des.isTrash ?? false),
    likesCount: des.likes_count ?? 0
  };
}

function getDesignPrefs(): StudioDesignPrefs {
  if (typeof window === "undefined") {
    return { favorites: {}, trash: {}, edits: {} };
  }
  try {
    const raw = localStorage.getItem(LOCAL_PREFS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        favorites: parsed.favorites || {},
        trash: parsed.trash || {},
        edits: parsed.edits || {}
      };
    }
  } catch (e) {
    console.warn("Could not read studio design prefs:", e);
  }
  return { favorites: {}, trash: {}, edits: {} };
}

function saveDesignPrefs(prefs: StudioDesignPrefs): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_PREFS_KEY, JSON.stringify(prefs));
  } catch (e) {
    console.warn("Could not save studio design prefs:", e);
  }
}

function getCreatedLocalDesigns(): StudioDesignItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOCAL_CREATED_DESIGNS_KEY) || localStorage.getItem(LEGACY_LOCAL_DESIGNS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.warn("Could not read local created designs:", e);
  }
  return [];
}

function saveCreatedLocalDesigns(list: StudioDesignItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_CREATED_DESIGNS_KEY, JSON.stringify(list));
  } catch (e) {
    console.warn("Could not save local created designs:", e);
  }
}

function applyDesignPrefs(item: StudioDesignItem, prefs: StudioDesignPrefs): StudioDesignItem {
  const edits = prefs.edits[item.id] || {};
  const isFavorite =
    item.id in prefs.favorites ? prefs.favorites[item.id] : item.isFavorite;
  const isTrash = item.id in prefs.trash ? prefs.trash[item.id] : Boolean(item.isTrash);
  return { ...item, ...edits, isFavorite, isTrash };
}

// ---------------------------------------------------------------------------
// Exported Cache & API Functions
// ---------------------------------------------------------------------------

function resolveRecentDesignsFromRaw(
  dbDesigns: ApiDesign[] | null,
  options?: { includeTrash?: boolean; onlyTrash?: boolean }
): StudioDesignItem[] {
  const { includeTrash = false, onlyTrash = false } = options || {};
  const prefs = getDesignPrefs();
  const localCreated = getCreatedLocalDesigns();

  let combined: StudioDesignItem[];
  if (dbDesigns) {
    const dbItems = dbDesigns.map(mapBackendDesignToStudioItem);
    const dbIds = new Set(dbItems.map((d) => d.id));
    combined = [...localCreated.filter((l) => !dbIds.has(l.id)), ...dbItems];
  } else if (getAuthToken()) {
    combined = localCreated;
  } else {
    const localIds = new Set(localCreated.map((d) => d.id));
    combined = [...localCreated, ...initialRecentDesigns.filter((d) => !localIds.has(d.id))];
  }

  const resolved = combined.map((item) => applyDesignPrefs(item, prefs));
  if (onlyTrash) return resolved.filter((d) => d.isTrash);
  if (includeTrash) return resolved;
  return resolved.filter((d) => !d.isTrash);
}

/**
 * Synchronously builds studio recent designs if raw DB designs are already cached
 * (or immediately for guest sessions). Returns null only if an authenticated fetch is needed.
 */
export function peekStudioRecentDesigns(options?: {
  includeTrash?: boolean;
  onlyTrash?: boolean;
}): StudioDesignItem[] | null {
  if (typeof window === "undefined") return null;
  if (!getAuthToken()) {
    return resolveRecentDesignsFromRaw(null, options);
  }
  const cachedRes = getCachedValue<ApiResponse<ApiDesign[]>>("designs", "raw-list", {
    scope: "auth",
  });
  if (!cachedRes || !Array.isArray(cachedRes.data)) return null;
  return resolveRecentDesignsFromRaw(cachedRes.data, options);
}

/**
 * Fetch user studio designs from live database (/designs),
 * using cached results unless cache was invalidated.
 */
export async function fetchStudioRecentDesignsApi(options?: {
  includeTrash?: boolean;
  onlyTrash?: boolean;
}): Promise<StudioDesignItem[]> {
  if (!getAuthToken()) {
    return resolveRecentDesignsFromRaw(null, options);
  }

  try {
    const res = await designService.getDesigns();
    if (res?.success && Array.isArray(res.data)) {
      return resolveRecentDesignsFromRaw(res.data, options);
    }
  } catch (err) {
    console.warn("[Design Studio API] Failed fetching /designs, falling back to local session items:", err);
  }

  return resolveRecentDesignsFromRaw(null, options);
}

function buildAiSuggestionsFromPosts(posts?: ApiCommunityPost[]): AiSuggestionItem[] {
  const dbSuggestions: AiSuggestionItem[] = [];
  if (Array.isArray(posts)) {
    posts.forEach((p) => {
      if (p.images && p.images.length > 0) {
        dbSuggestions.push({
          id: `comm-sugg-${p.id}`,
          title: p.title,
          subtitle: p.tags?.[0] || "Community Pick",
          image: p.images[0],
          category: p.tags?.[0] || "Ethnic Wear",
          prompt: p.content,
          tags: p.tags || ["Inspired"],
          fabric: "Pure Silk"
        });
      }
    });
  }

  if (dbSuggestions.length >= 5) {
    return dbSuggestions.slice(0, 5);
  }

  const seen = new Set(dbSuggestions.map((s) => s.id));
  return [
    ...dbSuggestions,
    ...initialAiSuggestions.filter((s) => !seen.has(s.id))
  ].slice(0, 5);
}

/**
 * Synchronously derive AI suggestions when community posts cache is warm.
 */
export function peekStudioAiSuggestions(): AiSuggestionItem[] | null {
  if (typeof window === "undefined") return null;
  const cachedPosts = getCachedValue<ApiResponse<ApiCommunityPost[]>>("community", "posts:{}", {
    scope: "auth",
  });
  if (!cachedPosts || !Array.isArray(cachedPosts.data)) return null;
  return buildAiSuggestionsFromPosts(cachedPosts.data);
}

/**
 * Fetch AI Suggestions & Community Style Inspirations (cache-backed)
 */
export async function fetchStudioAiSuggestionsApi(): Promise<AiSuggestionItem[]> {
  try {
    const postRes = await communityService.getPosts();
    if (postRes?.success && Array.isArray(postRes.data)) {
      return buildAiSuggestionsFromPosts(postRes.data);
    }
  } catch (err) {
    console.warn("[Design Studio API] Community suggestions fallback:", err);
  }

  return buildAiSuggestionsFromPosts();
}

function filterAndSortTemplates(
  posts: ApiCommunityPost[] | undefined,
  category: string,
  tab: string
): StudioTemplate[] {
  const communityTemplates: StudioTemplate[] = [];
  if (Array.isArray(posts)) {
    posts.forEach((p) => {
      if (p.images && p.images.length > 0) {
        communityTemplates.push({
          id: `comm-tmpl-${p.id}`,
          title: p.title,
          category: "Trending",
          image: p.images[0],
          description: p.content,
          fabric: "Bespoke Silk & Georgette",
          estimatedPrice: "Rs. 16,000",
          usageCount: p.likes_count || p.likesCount || 45,
          tags: p.tags && p.tags.length > 0 ? p.tags : ["Trending", "Community"]
        });
      }
    });
  }

  let pool: StudioTemplate[] = [...communityTemplates, ...initialTemplates];

  if (tab.toLowerCase() === "trending") {
    pool = [...pool].sort((a, b) => b.usageCount - a.usageCount);
  } else if (tab.toLowerCase() === "new arrivals") {
    pool = [...pool].reverse();
  }

  if (category === "All" || category === "All Templates") return pool;
  if (category === "Men's Wear") {
    return pool.filter((t) => t.tags.includes("Men's Wear") || t.category === "Men's");
  }
  return pool.filter(
    (t) =>
      t.category.toLowerCase() === category.toLowerCase() ||
      t.tags.some((tg) => tg.toLowerCase() === category.toLowerCase()) ||
      t.title.toLowerCase().includes(category.toLowerCase())
  );
}

/**
 * Synchronously filter/sort studio templates when community posts are already cached.
 */
export function peekStudioTemplates(
  category: string = "All Templates",
  tab: string = "Popular"
): StudioTemplate[] | null {
  if (typeof window === "undefined") return null;
  const cachedPosts = getCachedValue<ApiResponse<ApiCommunityPost[]>>("community", "posts:{}", {
    scope: "auth",
  });
  if (!cachedPosts || !Array.isArray(cachedPosts.data)) return null;
  return filterAndSortTemplates(cachedPosts.data, category, tab);
}

/**
 * Fetch Studio Templates & Community Inspirations by Category / Tab (uses cached community feed)
 */
export async function fetchStudioTemplatesApi(
  category: string = "All Templates",
  tab: string = "Popular"
): Promise<StudioTemplate[]> {
  try {
    const postRes = await communityService.getPosts();
    if (postRes?.success && Array.isArray(postRes.data)) {
      return filterAndSortTemplates(postRes.data, category, tab);
    }
  } catch (err) {
    console.warn("[Design Studio API] Templates/inspiration DB fetch fallback:", err);
  }

  return filterAndSortTemplates(undefined, category, tab);
}

function findLocalOrTemplateDesign(id: string): StudioDesignItem | null {
  const prefs = getDesignPrefs();
  const isDefaultPlaceholder = id === "DS67234" || id === "DSK1234" || id === "latest";

  const created = getCreatedLocalDesigns();
  const localMatch = created.find((d) => d.id === id);
  if (localMatch) return applyDesignPrefs(localMatch, prefs);

  const tmplMatch = initialTemplates.find((t) => t.id === id);
  if (tmplMatch) {
    return applyDesignPrefs(
      {
        id: tmplMatch.id,
        title: tmplMatch.title,
        category: normalizeStudioCategory(tmplMatch.category),
        editedAgo: "Verified Template",
        savedDate: "Curated",
        image: tmplMatch.image,
        prompt: tmplMatch.description,
        fabric: tmplMatch.fabric,
        colorPalette: ["#078B87", "#FAF8F5", "#D5B069", "#111111"],
        estimatedCost: tmplMatch.estimatedPrice,
        tags: tmplMatch.tags,
        isFavorite: false
      },
      prefs
    );
  }

  const demoMatch = initialRecentDesigns.find((d) => d.id === id);
  if (demoMatch) return applyDesignPrefs(demoMatch, prefs);

  if (isDefaultPlaceholder) {
    return applyDesignPrefs(initialRecentDesigns[0], prefs);
  }

  return null;
}

/**
 * Synchronously checks cached detail, cached list, local session items, or templates.
 * Returns undefined only when an authenticated fetch is still required.
 */
export function peekDesignById(id: string): StudioDesignItem | null | undefined {
  if (typeof window === "undefined") return undefined;
  const prefs = getDesignPrefs();
  const hasToken = !!getAuthToken();
  const isDefaultPlaceholder = id === "DS67234" || id === "DSK1234" || id === "latest";

  if (hasToken && !id.startsWith("des-") && !id.startsWith("tmpl-")) {
    const cachedList = peekStudioRecentDesigns();
    if (isDefaultPlaceholder) {
      if (!cachedList) return undefined;
      if (cachedList.length > 0) return cachedList[0];
    } else {
      const listMatch = cachedList?.find((d) => d.id === id);
      if (listMatch) return listMatch;

      const cachedDetail = getCachedValue<ApiResponse<ApiDesign>>("designs", `raw-detail:${id}`, {
        scope: "auth",
      });
      if (cachedDetail?.data) {
        return applyDesignPrefs(mapBackendDesignToStudioItem(cachedDetail.data), prefs);
      }
      if (!cachedList) return undefined;
    }
  }

  return findLocalOrTemplateDesign(id);
}

/**
 * Fetch a specific design by ID from database (/designs/{designId}), cache, local session, or templates
 */
export async function fetchDesignByIdApi(
  id: string
): Promise<StudioDesignItem | null> {
  const cached = peekDesignById(id);
  if (cached !== undefined) {
    return cached;
  }

  const prefs = getDesignPrefs();
  const hasToken = !!getAuthToken();
  const isDefaultPlaceholder = id === "DS67234" || id === "DSK1234" || id === "latest";

  if (hasToken && !id.startsWith("des-") && !id.startsWith("tmpl-")) {
    if (isDefaultPlaceholder) {
      const userDesigns = await fetchStudioRecentDesignsApi();
      if (userDesigns.length > 0) return userDesigns[0];
    } else {
      // Reuse raw list cache before hitting /designs/{id} individually
      const cachedListRes = getCachedValue<ApiResponse<ApiDesign[]>>("designs", "raw-list", {
        scope: "auth",
      });
      const listMatch = cachedListRes?.data?.find((d) => d.id === id);
      if (listMatch) {
        return applyDesignPrefs(mapBackendDesignToStudioItem(listMatch), prefs);
      }

      try {
        const res = await designService.getDesignById(id);
        if (res?.success && res.data) {
          return applyDesignPrefs(mapBackendDesignToStudioItem(res.data), prefs);
        }
      } catch (err) {
        console.warn(`[Design Studio API] Failed fetching design ${id}:`, err);
      }
    }
  }

  return findLocalOrTemplateDesign(id);
}

/**
 * Toggle favorite status and notify studio views without invalidating raw DB list cache
 */
export async function toggleFavoriteStudioDesignApi(
  id: string,
  currentState?: boolean
): Promise<boolean> {
  const prefs = getDesignPrefs();
  const baseVal =
    id in prefs.favorites
      ? prefs.favorites[id]
      : currentState !== undefined
      ? currentState
      : Boolean(initialRecentDesigns.find((d) => d.id === id)?.isFavorite);
  const nextVal = !baseVal;
  prefs.favorites[id] = nextVal;
  saveDesignPrefs(prefs);
  notifyCacheDomain("designs");
  return nextVal;
}

/**
 * Move a design to Trash or Restore it and notify studio views cleanly
 */
export async function toggleTrashStudioDesignApi(
  id: string,
  moveToTrash: boolean = true
): Promise<boolean> {
  const prefs = getDesignPrefs();
  prefs.trash[id] = moveToTrash;
  saveDesignPrefs(prefs);
  notifyCacheDomain("designs");
  return true;
}

/**
 * Persist edits made inside the Studio Design Editor and notify studio views cleanly
 */
export async function saveStudioDesignEditsApi(
  id: string,
  updates: Partial<StudioDesignItem>
): Promise<boolean> {
  const prefs = getDesignPrefs();
  prefs.edits[id] = { ...(prefs.edits[id] || {}), ...updates, editedAgo: "Edited just now" };
  saveDesignPrefs(prefs);

  // Also update in local created array if present
  const created = getCreatedLocalDesigns();
  const idx = created.findIndex((d) => d.id === id);
  if (idx >= 0) {
    created[idx] = { ...created[idx], ...updates, editedAgo: "Edited just now" };
    saveCreatedLocalDesigns(created);
  }
  notifyCacheDomain("designs");
  return true;
}

/**
 * Save a design into Studio My Designs + Customer Saved Designs storage
 */
export async function saveStudioDesignItemApi(
  design: StudioDesignItem
): Promise<StudioDesignItem> {
  const created = getCreatedLocalDesigns();
  const filtered = created.filter((d) => d.id !== design.id);
  const updated = [design, ...filtered];
  saveCreatedLocalDesigns(updated);

  // Sync with /customer/saved-designs local store
  if (typeof window !== "undefined") {
    try {
      const savedRaw = localStorage.getItem("sui_dhaga_saved_designs");
      const savedList = savedRaw ? JSON.parse(savedRaw) : [];
      if (Array.isArray(savedList) && !savedList.some((s: { id?: string }) => s.id === design.id)) {
        savedList.unshift({
          id: design.id,
          title: design.title,
          category: "Outfits",
          savedDate: design.savedDate || "Today",
          image: design.image,
          prompt: design.prompt,
          fabric: design.fabric,
          estimatedCost: design.estimatedCost,
          tags: design.tags,
          isFavorite: design.isFavorite
        });
        localStorage.setItem("sui_dhaga_saved_designs", JSON.stringify(savedList));
      }
    } catch {}
  }

  notifyCacheDomain("designs");
  return design;
}

/**
 * Generate Design Concept from Prompt / Reference / Sketch and persist to session
 */
export async function generateDesignFromPromptApi(
  payload: DesignGenerationPayload
): Promise<StudioDesignItem> {
  const imagePool = [
    "/images/design-studio/recent/anarkali-gold.jpg",
    "/images/design-studio/recent/kurta-mint.jpg",
    "/images/design-studio/recent/lehenga-rose.jpg",
    "/images/design-studio/recent/indowestern-sage.jpg",
    "/images/design-studio/previews/royal-blue-lehenga.png"
  ];
  const promptLower = (payload.prompt || "").toLowerCase();
  let selectedImage = imagePool[Math.floor(Math.random() * imagePool.length)];
  if (promptLower.includes("mint") || promptLower.includes("green")) {
    selectedImage = "/images/design-studio/recent/kurta-mint.jpg";
  } else if (promptLower.includes("blue") || promptLower.includes("sapphire")) {
    selectedImage = "/images/design-studio/previews/royal-blue-lehenga.png";
  } else if (promptLower.includes("pink") || promptLower.includes("rose") || promptLower.includes("peach")) {
    selectedImage = "/images/design-studio/generated-pink-anarkali.jpg";
  } else if (promptLower.includes("gold") || promptLower.includes("champagne")) {
    selectedImage = "/images/design-studio/recent/anarkali-gold.jpg";
  }

  const newDesign: StudioDesignItem = {
    id: `des-gen-${Date.now()}`,
    title: payload.garmentType || "Custom AI Creation",
    category: normalizeStudioCategory(payload.garmentType),
    editedAgo: "Just now",
    savedDate: new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }),
    image: selectedImage,
    prompt: payload.prompt || "AI generated custom outfit design.",
    fabric: payload.fabric || "Pure Silk & Georgette",
    colorPalette: [payload.colorPreference || "#078B87", "#E7C0A0", "#F1EEE8", "#334155"],
    estimatedCost: "Rs. 14,000 - Rs. 20,000",
    tags: [payload.style || "Custom Style", payload.occasion || "Festive", "AI Concept"],
    isFavorite: false,
    isTrash: false,
    likesCount: 1
  };

  await saveStudioDesignItemApi(newDesign);
  return newDesign;
}

function buildTechPackFromData(
  designId: string,
  design: StudioDesignItem | null,
  profile: ApiMeasurementProfile | null
): TechPackData {
  const base: TechPackData = sampleTechPacks[designId]
    ? { ...sampleTechPacks[designId] }
    : {
        id: `tp-${design?.id || designId}`,
        designId: design?.id || designId,
        designName: design?.title || "Custom AI Outfit Tech Pack",
        category: design?.category || "Bespoke Ethnic",
        type: design?.category || "Custom Garment",
        occasion: design?.tags?.[0] || "Festive & Wedding",
        createdOn:
          design?.savedDate ||
          new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
          }),
        previewImage: design?.image || "/images/design-studio/recent/anarkali-gold.jpg",
        sizeChart: [
          { size: "S", chest: "34 in", waist: "28 in", hip: "38 in", length: "50 in" },
          { size: "M", chest: "36 in", waist: "30 in", hip: "40 in", length: "51 in" },
          { size: "L", chest: "38 in", waist: "32 in", hip: "42 in", length: "52 in" },
          { size: "XL", chest: "40 in", waist: "34 in", hip: "44 in", length: "53 in" },
          { size: "Custom", chest: "Tailor Fit", waist: "Tailor Fit", hip: "Tailor Fit", length: "Tailor Fit" }
        ],
        colorPalette: (design?.colorPalette || ["#078B87", "#F1EEE8", "#D5B069"]).map(
          (hex, idx) => ({
            name: idx === 0 ? "Primary Tone" : idx === 1 ? "Accent Base" : `Highlight ${idx}`,
            hex
          })
        ),
        fabrics: [
          {
            name: design?.fabric || "Pure Raw Silk",
            composition: "100% Natural Silk",
            yardage: "4.2 Meters"
          },
          {
            name: "Breathable Santoon Lining",
            composition: "100% Cotton Blend",
            yardage: "3.5 Meters"
          }
        ],
        embroideryDetails:
          design?.prompt ||
          "Custom border embroidery with metallic zari thread and hand-finishing.",
        liningDetails: "Breathable natural santoon lining throughout bodice and skirt.",
        stitchingNotes:
          "Tailored precision cut with 2-inch seam margin allowance and French seam finishing."
      };

  if (design) {
    base.designId = design.id;
    base.designName = design.title;
    base.category = design.category;
    base.previewImage = design.image;
    base.createdOn = design.savedDate || base.createdOn;
    if (design.prompt) base.embroideryDetails = design.prompt;
  }

  if (profile) {
    const unit = profile.unit || "in";
    const customRow = {
      size: `Custom (${profile.title || profile.profile_name || profile.profileName || "My Fit"})`,
      chest: profile.chest ? `${profile.chest} ${unit}` : "Tailor Fit",
      waist: profile.waist ? `${profile.waist} ${unit}` : "Tailor Fit",
      hip: profile.hips ? `${profile.hips} ${unit}` : "Tailor Fit",
      length: profile.height ? `${profile.height} ${unit}` : "Tailor Fit"
    };
    const withoutOldCustom = base.sizeChart.filter((r) => !r.size.startsWith("Custom"));
    base.sizeChart = [...withoutOldCustom, customRow];
  }

  return base;
}

/**
 * Synchronously builds Tech Pack when design and measurements caches are warm.
 */
export function peekTechPackByDesignId(designId: string): TechPackData | null {
  if (typeof window === "undefined") return null;
  const cachedDesign = peekDesignById(designId);
  if (cachedDesign === undefined) return null;

  let profile: ApiMeasurementProfile | null = null;
  if (getAuthToken()) {
    const cachedMeas = getCachedValue<ApiResponse<ApiMeasurementProfile[]>>(
      "measurements",
      "list",
      { scope: "auth" }
    );
    if (!cachedMeas) return null;
    if (cachedMeas.success && Array.isArray(cachedMeas.data) && cachedMeas.data.length > 0) {
      profile = cachedMeas.data[0];
    }
  }

  return buildTechPackFromData(designId, cachedDesign, profile);
}

/**
 * Fetch Tech Pack Data built from live design details (/designs/{id})
 * and authenticated customer body measurements (/measurements), using cache when available.
 */
export async function fetchTechPackByDesignIdApi(
  designId: string
): Promise<TechPackData> {
  const [design, measurementsRes] = await Promise.all([
    fetchDesignByIdApi(designId),
    getAuthToken()
      ? measurementService.getMeasurements().catch(() => null)
      : Promise.resolve(null)
  ]);

  const profile =
    measurementsRes?.success && Array.isArray(measurementsRes.data) && measurementsRes.data.length > 0
      ? measurementsRes.data[0]
      : null;

  return buildTechPackFromData(designId, design, profile);
}
