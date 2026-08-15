/**
 * AI Design Studio Data & API Layer for Sui Dhāga
 * Connects to process.env.NEXT_PUBLIC_API_URL or process.env.NEXT_PUBLIC_BACKEND_URL
 * with robust local storage synchronization and mock fallback data.
 */

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
// LocalStorage Persistence Helpers
// ---------------------------------------------------------------------------

const LOCAL_DESIGNS_KEY = "sui_dhaga_studio_recent_designs";

function getLocalDesigns(): StudioDesignItem[] {
  if (typeof window === "undefined") return initialRecentDesigns;
  try {
    const raw = localStorage.getItem(LOCAL_DESIGNS_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn("Could not read local studio designs:", e);
  }
  return initialRecentDesigns;
}

function saveLocalDesigns(list: StudioDesignItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_DESIGNS_KEY, JSON.stringify(list));
  } catch (e) {
    console.warn("Could not write local studio designs:", e);
  }
}

// ---------------------------------------------------------------------------
// Exported API Functions
// ---------------------------------------------------------------------------

/**
 * Fetch Recent Designs for AI Design Studio
 */
export async function fetchStudioRecentDesignsApi(): Promise<StudioDesignItem[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/api/design-studio/recent`, {
        headers: { "Content-Type": "application/json" },
        cache: "no-store"
      });
      if (res.ok) {
        const data = await res.json();
        return data.designs || data.data || [];
      }
    } catch (err) {
      console.warn("[Design Studio API] Backend not reachable, using local sync:", err);
    }
  }

  return getLocalDesigns().filter((d) => !d.isTrash);
}

/**
 * Fetch AI Suggestions
 */
export async function fetchStudioAiSuggestionsApi(): Promise<AiSuggestionItem[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/api/design-studio/suggestions`, {
        headers: { "Content-Type": "application/json" },
        cache: "no-store"
      });
      if (res.ok) {
        const data = await res.json();
        return data.suggestions || data.data || [];
      }
    } catch (err) {
      console.warn("[Design Studio API] Suggestions backend fallback:", err);
    }
  }

  return initialAiSuggestions;
}

/**
 * Fetch Templates by Category
 */
export async function fetchStudioTemplatesApi(
  category: string = "All"
): Promise<StudioTemplate[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

  if (apiUrl) {
    try {
      const res = await fetch(
        `${apiUrl}/api/design-studio/templates?category=${encodeURIComponent(category)}`,
        {
          headers: { "Content-Type": "application/json" },
          cache: "no-store"
        }
      );
      if (res.ok) {
        const data = await res.json();
        return data.templates || data.data || [];
      }
    } catch (err) {
      console.warn("[Design Studio API] Templates backend fallback:", err);
    }
  }

  if (category === "All") return initialTemplates;
  return initialTemplates.filter(
    (t) => t.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get a specific design by ID
 */
export async function fetchDesignByIdApi(
  id: string
): Promise<StudioDesignItem | null> {
  const list = getLocalDesigns();
  const found = list.find((d) => d.id === id);
  if (found) return found;

  const foundRecent = initialRecentDesigns.find((d) => d.id === id);
  return foundRecent || null;
}

/**
 * Toggle favorite on a design
 */
export async function toggleFavoriteStudioDesignApi(
  id: string
): Promise<boolean> {
  const list = getLocalDesigns();
  const target = list.find((d) => d.id === id);
  if (target) {
    target.isFavorite = !target.isFavorite;
    saveLocalDesigns(list);
    return target.isFavorite;
  }
  return false;
}

/**
 * Soft delete or restore a design to trash
 */
export async function toggleTrashStudioDesignApi(
  id: string,
  moveToTrash: boolean = true
): Promise<boolean> {
  const list = getLocalDesigns();
  const target = list.find((d) => d.id === id);
  if (target) {
    target.isTrash = moveToTrash;
    saveLocalDesigns(list);
    return true;
  }
  return false;
}

/**
 * Generate Design from Prompt
 */
export async function generateDesignFromPromptApi(
  payload: DesignGenerationPayload
): Promise<StudioDesignItem> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/api/design-studio/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        return data.design || data.data;
      }
    } catch (err) {
      console.warn("[Design Studio API] Generate endpoint fallback:", err);
    }
  }

  // Simulate AI generation locally
  const imagePool = [
    "/images/design-studio/recent/anarkali-gold.jpg",
    "/images/design-studio/recent/kurta-mint.jpg",
    "/images/design-studio/recent/lehenga-rose.jpg",
    "/images/design-studio/recent/indowestern-sage.jpg",
    "/images/design-studio/previews/royal-blue-lehenga.png"
  ];
  const selectedImage = imagePool[Math.floor(Math.random() * imagePool.length)];

  const newDesign: StudioDesignItem = {
    id: `des-gen-${Date.now()}`,
    title: payload.garmentType || "Custom AI Creation",
    category: (payload.garmentType as any) || "Ethnic Wear",
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
    estimatedCost: "₹14,000 - ₹20,000",
    tags: [payload.style || "Custom Style", payload.occasion || "Festive", "AI Concept"],
    isFavorite: false,
    isTrash: false,
    likesCount: 1
  };

  const list = getLocalDesigns();
  list.unshift(newDesign);
  saveLocalDesigns(list);

  return newDesign;
}

/**
 * Fetch Tech Pack Data for a design
 */
export async function fetchTechPackByDesignIdApi(
  designId: string
): Promise<TechPackData> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

  if (apiUrl) {
    try {
      const res = await fetch(
        `${apiUrl}/api/design-studio/tech-pack/${encodeURIComponent(designId)}`,
        {
          headers: { "Content-Type": "application/json" },
          cache: "no-store"
        }
      );
      if (res.ok) {
        const data = await res.json();
        return data.techPack || data.data;
      }
    } catch (err) {
      console.warn("[Design Studio API] Tech Pack backend fallback:", err);
    }
  }

  if (sampleTechPacks[designId]) {
    return sampleTechPacks[designId];
  }

  // Generic fallback tech pack
  return {
    id: `tp-gen-${designId}`,
    designId,
    designName: "Custom AI Outfit Tech Pack",
    category: "Bespoke Ethnic",
    type: "Custom Garment",
    occasion: "Special Occasion",
    createdOn: new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }),
    previewImage: "/images/design-studio/recent/anarkali-gold.jpg",
    sizeChart: [
      { size: "S", chest: "34 in", waist: "28 in", hip: "38 in", length: "50 in" },
      { size: "M", chest: "36 in", waist: "30 in", hip: "40 in", length: "51 in" },
      { size: "L", chest: "38 in", waist: "32 in", hip: "42 in", length: "52 in" },
      { size: "Custom", chest: "Tailor Fit", waist: "Tailor Fit", hip: "Tailor Fit", length: "Tailor Fit" }
    ],
    colorPalette: [
      { name: "Primary Tone", hex: "#078B87" },
      { name: "Accent Cream", hex: "#F1EEE8" },
      { name: "Gold Border", hex: "#D5B069" }
    ],
    fabrics: [
      { name: "Pure Silk", composition: "100% Natural Silk", yardage: "4.0 Meters" },
      { name: "Soft Lining", composition: "100% Cotton Santoon", yardage: "3.5 Meters" }
    ],
    embroideryDetails: "Custom border embroidery with metallic zari thread and sequin embellishments.",
    liningDetails: "Breathable natural santoon lining throughout bodice and skirt.",
    stitchingNotes: "Tailored precision cut with margin allowance of 2 inches on both side seams."
  };
}
