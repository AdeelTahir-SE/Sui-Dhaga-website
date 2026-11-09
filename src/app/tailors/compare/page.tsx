import { Suspense } from "react";
import { TailorsComparePage } from "@/components/tailors/tailors-compare-page";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FAF8F5" }}>
          <div style={{ textAlign: "center", color: "#6B7280" }}>Loading compare tool...</div>
        </div>
      }
    >
      <TailorsComparePage />
    </Suspense>
  );
}
