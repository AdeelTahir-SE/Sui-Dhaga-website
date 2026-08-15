import { Suspense } from "react";
import { StudioMyDesignsPage } from "@/components/design-studio/studio-my-designs-page";

export const metadata = {
  title: "My Designs | AI Design Studio | Sui Dhāga",
  description: "View and manage your saved bespoke AI outfit designs."
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <StudioMyDesignsPage />
    </Suspense>
  );
}
