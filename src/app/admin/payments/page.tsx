import { AdminPaymentsPage } from "@/components/admin/admin-payments-page";

export const metadata = {
  title: "Payments & Payouts | Sui Dhāga Admin",
  description: "Manage transactions, escrow balances, and tailor bank settlements."
};

export default function Page() {
  return <AdminPaymentsPage />;
}
