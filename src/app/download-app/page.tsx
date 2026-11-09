import type { Metadata } from "next";
import { ApkDownloadPage } from "@/components/download/apk-download-page";
import { getLatestAppVersion } from "@/lib/app-version";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Download Sui Dhāga Android App (APK)",
  description: "Download the official Android APK for Sui Dhāga.",
};

export default async function DownloadAppPage() {
  const versionInfo = await getLatestAppVersion();

  return (
    <ApkDownloadPage
      initialVersion={versionInfo.version}
      initialDownloadUrl={versionInfo.downloadUrl}
      initialReleaseNotes={versionInfo.releaseNotes}
    />
  );
}

