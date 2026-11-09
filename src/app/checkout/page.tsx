import { Suspense } from "react";
import { CheckoutPage } from "@/components/common/checkout-page";

export default function Page() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#FAF8F5" }} />}>
      <CheckoutPage />
    </Suspense>
  );
}

