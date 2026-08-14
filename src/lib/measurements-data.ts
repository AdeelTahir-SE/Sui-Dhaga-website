/**
 * Customer Measurements Data & API Layer for Sui Dhāga
 * Connects to process.env.NEXT_PUBLIC_API_URL if configured,
 * with reliable local storage synchronization and mock fallback data.
 */

export interface MeasurementValues {
  bust: number;
  waist: number;
  hip: number;
  shoulder: number;
  armLength: number;
  sleeveLength: number;
  topLength: number;
  neck?: number;
  inseam?: number;
  waistToAnkle?: number;
}

export interface MeasurementProfile {
  id: string;
  name: string; // e.g. "My Measurements"
  lastUpdated: string; // e.g. "15 May, 2024"
  unit: "Inches" | "Centimeters (cm)";
  standardSize: string; // e.g. "M (Medium)"
  values: MeasurementValues;
  notes?: string;
}

export const initialMeasurementProfiles: MeasurementProfile[] = [
  {
    id: "prof-self",
    name: "My Measurements",
    lastUpdated: "15 May, 2024",
    unit: "Inches",
    standardSize: "M (Medium)",
    values: {
      bust: 36,
      waist: 30,
      hip: 39,
      shoulder: 15,
      armLength: 22,
      sleeveLength: 18,
      topLength: 54,
      neck: 14.5,
      inseam: 38,
      waistToAnkle: 40
    },
    notes: "Comfortable regular fit for festive anarkalis and daily wear kurtas."
  },
  {
    id: "prof-mom",
    name: "Mom's Fit",
    lastUpdated: "02 May, 2024",
    unit: "Inches",
    standardSize: "L (Large)",
    values: {
      bust: 40,
      waist: 35,
      hip: 43,
      shoulder: 16,
      armLength: 22.5,
      sleeveLength: 19,
      topLength: 48,
      neck: 15.5,
      inseam: 36,
      waistToAnkle: 38
    },
    notes: "Loose modest fit with extra ease on bust and armhole."
  },
  {
    id: "prof-sister",
    name: "Sister's Lehenga",
    lastUpdated: "20 Apr, 2024",
    unit: "Inches",
    standardSize: "S (Small)",
    values: {
      bust: 32,
      waist: 26,
      hip: 35,
      shoulder: 14,
      armLength: 21,
      sleeveLength: 16,
      topLength: 52,
      neck: 13.5,
      inseam: 39,
      waistToAnkle: 41
    },
    notes: "Slim tailored fit for crop top blouses and flared lehengas."
  }
];

export const STANDARD_SIZE_GUIDE_CHART = [
  { size: "XS (Extra Small)", bust: "32 in (81 cm)", waist: "26 in (66 cm)", hip: "35 in (89 cm)", shoulder: "13.5 in", us: "0-2", uk: "4-6" },
  { size: "S (Small)", bust: "34 in (86 cm)", waist: "28 in (71 cm)", hip: "37 in (94 cm)", shoulder: "14.0 in", us: "4-6", uk: "8-10" },
  { size: "M (Medium)", bust: "36 in (91 cm)", waist: "30 in (76 cm)", hip: "39 in (99 cm)", shoulder: "15.0 in", us: "8-10", uk: "12-14" },
  { size: "L (Large)", bust: "39 in (99 cm)", waist: "33 in (84 cm)", hip: "42 in (107 cm)", shoulder: "16.0 in", us: "12-14", uk: "16-18" },
  { size: "XL (Extra Large)", bust: "42 in (107 cm)", waist: "36 in (91 cm)", hip: "45 in (114 cm)", shoulder: "16.5 in", us: "16", uk: "20" },
  { size: "XXL (2X Large)", bust: "45 in (114 cm)", waist: "39 in (99 cm)", hip: "48 in (122 cm)", shoulder: "17.0 in", us: "18", uk: "22" }
];

export const MEASURING_INSTRUCTIONS_STEPS = [
  {
    step: "1. Bust / Chest",
    desc: "Wrap the measuring tape comfortably around the fullest part of your bust, keeping the tape level across your back."
  },
  {
    step: "2. Natural Waist",
    desc: "Measure around your natural waistline, which is the narrowest point of your torso, usually about an inch above your belly button."
  },
  {
    step: "3. Hips",
    desc: "Stand with your feet together and measure around the widest part of your hips and bottom."
  },
  {
    step: "4. Shoulder Width",
    desc: "Measure across the back from the tip of one shoulder bone straight to the tip of the other shoulder bone."
  },
  {
    step: "5. Arm & Sleeve Length",
    desc: "With your arm slightly bent, measure from the edge of your shoulder down to your wrist bone."
  },
  {
    step: "6. Top / Kameez Length",
    desc: "Measure from the highest point of your shoulder next to your neck down to your desired hemline (knee, calf, or floor)."
  }
];

/**
 * Fetch all measurement profiles
 */
export async function fetchMeasurementProfilesApi(): Promise<MeasurementProfile[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/api/customer/measurements`, {
        headers: { "Content-Type": "application/json" },
        cache: "no-store"
      });
      if (res.ok) {
        const data = await res.json();
        return data.profiles || data.data || [];
      }
    } catch (err) {
      console.warn("[Measurements API] Backend unavailable, using local store:", err);
    }
  }

  // Local storage sync
  let profilesList = [...initialMeasurementProfiles];
  try {
    if (typeof window !== "undefined") {
      const storedJson = localStorage.getItem("sui_dhaga_measurements");
      if (storedJson) {
        const storedList = JSON.parse(storedJson);
        profilesList = storedList;
      }
    }
  } catch (e) {
    console.warn("Error reading local measurements:", e);
  }

  return profilesList;
}

/**
 * Save or update a measurement profile
 */
export async function saveMeasurementProfileApi(
  profile: MeasurementProfile
): Promise<{ success: boolean; profile?: MeasurementProfile }> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/api/customer/measurements`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile)
      });
      if (res.ok) {
        const data = await res.json();
        return { success: true, profile: data.profile || data };
      }
    } catch (err) {
      console.warn("[Measurements API] Save failed on backend, updating locally:", err);
    }
  }

  // Update in localStorage
  try {
    if (typeof window !== "undefined") {
      const storedJson = localStorage.getItem("sui_dhaga_measurements");
      let list = storedJson ? JSON.parse(storedJson) : [...initialMeasurementProfiles];
      const existingIdx = list.findIndex((p: any) => p.id === profile.id);
      if (existingIdx >= 0) {
        list[existingIdx] = profile;
      } else {
        list.push(profile);
      }
      localStorage.setItem("sui_dhaga_measurements", JSON.stringify(list));
    }
  } catch (e) {
    // ignore
  }

  return { success: true, profile };
}
