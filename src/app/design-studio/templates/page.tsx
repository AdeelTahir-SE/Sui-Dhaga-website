import { Suspense } from "react";
import { StudioTemplatesPage } from "@/components/design-studio/studio-templates-page";

export const metadata = {
  title: "Templates | AI Design Studio | Sui Dhāga",
  description: "Explore curated designer outfit templates and customize with AI."
};

export default function Page() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#FAF8F5" }} />}>
      <StudioTemplatesPage />
    </Suspense>
  );
}
