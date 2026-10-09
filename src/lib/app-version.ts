/**
 * Sui Dhāga App Version Service
 * -----------------------------
 * Centralized service to fetch and manage latest Android APK metadata from the backend.
 */

export const FALLBACK_APK_VERSION = "v1.0.4";
export const FALLBACK_APK_URL =
  "https://github.com/AdeelTahir-SE/Sui-Dhaga-mobile/releases/download/v1.0.4/sui-dhaga-v1.0.4-android.apk";

export interface AppVersionInfo {
  version: string;
  downloadUrl: string;
  releaseNotes: string | null;
  platform: string;
  forceUpdate?: boolean;
}

export function getBackendAppVersionUrl(): string {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "https://sui-dhaga-backend.vercel.app/api/v1";
  
  const cleanBase = baseUrl.replace(/\/+$/, "");
  return `${cleanBase}/app-version/latest?platform=android&clientVersion=1`;
}

export async function getLatestAppVersion(): Promise<AppVersionInfo> {
  const backendUrl = getBackendAppVersionUrl();

  try {
    const res = await fetch(backendUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      // Cache on server side for 60 seconds
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const json = await res.json();
      if (json?.success && json?.data) {
        const rawVersion = json.data.latestVersion || "1.0.4";
        const formattedVersion = rawVersion.startsWith("v") ? rawVersion : `v${rawVersion}`;
        const downloadUrl = json.data.downloadUrl || FALLBACK_APK_URL;
        const releaseNotes = json.data.releaseNotes || null;

        return {
          version: formattedVersion,
          downloadUrl,
          releaseNotes,
          platform: json.data.platform || "android",
          forceUpdate: !!json.data.forceUpdate,
        };
      }
    }
  } catch (error) {
    console.warn("getLatestAppVersion: Error fetching from backend, using fallback:", error);
  }

  return {
    version: FALLBACK_APK_VERSION,
    downloadUrl: FALLBACK_APK_URL,
    releaseNotes: null,
    platform: "android",
  };
}
