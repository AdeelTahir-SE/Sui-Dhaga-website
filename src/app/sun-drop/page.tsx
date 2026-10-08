import type { Metadata } from "next";
import { ApkDownloadPage } from "@/components/download/apk-download-page";

export const metadata: Metadata = {
  title: "Sun Drop × Sui Dhāga | Exclusive Summer Capsule & Mobile App",
  description:
    "Explore the exclusive Sun Drop summer capsule collection and download the Sui Dhāga mobile APK for AI 3D fitting and early drop access.",
  openGraph: {
    title: "Sun Drop × Sui Dhāga Capsule",
    description: "Wear the golden hour. Bespoke AI tailoring meets Sun Drop summer couture.",
    images: ["/images/collab/sundrop-hero.jpg"],
  },
};

export default function SunDropCollabPage() {
  return <ApkDownloadPage />;
}
