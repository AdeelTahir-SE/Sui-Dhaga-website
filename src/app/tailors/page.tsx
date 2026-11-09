import { Suspense } from "react";
import { TailorsMarketplacePage } from "@/components/tailors/tailors-marketplace-page";

export default function Page() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#FAF8F5" }} />}>
      <TailorsMarketplacePage />
    </Suspense>
  );
}
