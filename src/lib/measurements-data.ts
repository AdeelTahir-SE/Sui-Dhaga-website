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

import { measurementService } from "./api/measurement-service";
import { MeasurementProfile as ApiMeasurementProfile } from "./api/types";

function mapApiToMeasurementProfile(apiProf: ApiMeasurementProfile): MeasurementProfile {
  return {
    id: apiProf.id,
    name: apiProf.profile_name || apiProf.profileName || "My Profile",
    lastUpdated: apiProf.updated_at
      ? new Date(apiProf.updated_at).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })
      : "Just now",
    unit: apiProf.unit === "cm" ? "Centimeters (cm)" : "Inches",
    standardSize: "Custom",
    values: {
      bust: apiProf.chest || 36,
      waist: apiProf.waist || 30,
      hip: apiProf.hips || 39,
      shoulder: apiProf.shoulder || 15,
      armLength: apiProf.sleeve_length || apiProf.sleeveLength || 22,
      sleeveLength: apiProf.sleeve_length || apiProf.sleeveLength || 18,
      topLength: apiProf.height || 54,
      neck: apiProf.neck || 14.5,
      inseam: apiProf.inseam || 38,
      waistToAnkle: 40
    },
    notes: apiProf.notes || ""
  };
}

function mapProfileToApiPayload(prof: MeasurementProfile) {
  return {
    title: prof.name,
    profile_name: prof.name,
    gender: "women" as const,
    unit: prof.unit === "Centimeters (cm)" ? ("cm" as const) : ("in" as const),
    chest: prof.values.bust,
    waist: prof.values.waist,
    hips: prof.values.hip,
    shoulder: prof.values.shoulder,
    sleeve_length: prof.values.sleeveLength,
    inseam: prof.values.inseam,
    neck: prof.values.neck,
    height: prof.values.topLength,
    notes: prof.notes
  };
}

/**
 * Fetch all measurement profiles
 */
export async function fetchMeasurementProfilesApi(): Promise<MeasurementProfile[]> {
  try {
    const res = await measurementService.getMeasurements();
    if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
      return res.data.map(mapApiToMeasurementProfile);
    }
  } catch (err) {
    console.warn("[Measurements API] Backend unavailable, using local store:", err);
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
  try {
    const payload = mapProfileToApiPayload(profile);
    let res;
    if (profile.id && !profile.id.startsWith("prof-")) {
      res = await measurementService.updateMeasurement(profile.id, payload);
    } else {
      res = await measurementService.createMeasurement(payload);
    }
    if (res?.data) {
      const mapped = mapApiToMeasurementProfile(res.data);
      // Sync to local
      try {
        if (typeof window !== "undefined") {
          const storedJson = localStorage.getItem("sui_dhaga_measurements");
          let list = storedJson ? JSON.parse(storedJson) : [...initialMeasurementProfiles];
          const idx = list.findIndex((p: any) => p.id === profile.id || p.id === mapped.id);
          if (idx >= 0) list[idx] = mapped;
          else list.push(mapped);
          localStorage.setItem("sui_dhaga_measurements", JSON.stringify(list));
        }
      } catch (e) {}
      return { success: true, profile: mapped };
    }
  } catch (err) {
    console.warn("[Measurements API] Save failed on backend, updating locally:", err);
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

/**
 * Delete a measurement profile
 */
export async function deleteMeasurementProfileApi(profileId: string): Promise<{ success: boolean }> {
  try {
    if (!profileId.startsWith("prof-")) {
      await measurementService.deleteMeasurement(profileId);
    }
  } catch (err) {
    console.warn("[Measurements API] Delete failed on backend, deleting locally:", err);
  }

  try {
    if (typeof window !== "undefined") {
      const storedJson = localStorage.getItem("sui_dhaga_measurements");
      if (storedJson) {
        let list = JSON.parse(storedJson);
        list = list.filter((p: any) => p.id !== profileId);
        localStorage.setItem("sui_dhaga_measurements", JSON.stringify(list));
      }
    }
  } catch (e) {
    // ignore
  }

  return { success: true };
}
