import type { Metadata } from "next";
import { ApkDownloadPage } from "@/components/download/apk-download-page";

export const metadata: Metadata = {
  title: "Download Android App (APK) | Sui Dhāga × Sun Drop Collab",
  description:
    "Download the official Sui Dhāga Android APK. Access exclusive Sun Drop Summer Capsule apparel, 3D AI camera body measurements, and live tailor stitching updates.",
  keywords: [
    "Sui Dhaga APK download",
    "Sui Dhaga mobile app",
    "Sun Drop collab",
    "AI Tailor Android app",
    "custom stitching app",
    "Pakistan tailor APK",
  ],
  openGraph: {
    title: "Download Android APK | Sui Dhāga × Sun Drop Capsule",
    description:
      "Exclusive Summer Capsule & instant AI 3D tailoring on your phone. Download the official Android APK.",
    images: ["/images/collab/sundrop-hero.jpg"],
  },
};

export default function DownloadPage() {
  return <ApkDownloadPage />;
}
