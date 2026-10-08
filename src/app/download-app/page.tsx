import type { Metadata } from "next";
import { ApkDownloadPage } from "@/components/download/apk-download-page";

export const metadata: Metadata = {
  title: "Download Sui Dhāga Android App (APK)",
  description: "Download the official Android APK for Sui Dhāga.",
};

export default function DownloadAppPage() {
  return <ApkDownloadPage />;
}
