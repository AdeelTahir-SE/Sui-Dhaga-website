import { CustomerPaymentsPage } from "@/components/customer/customer-payments-page";

export const metadata = {
  title: "Payment Methods | Sui Dhāga",
  description: "Manage your cards, JazzCash/EasyPaisa mobile wallets, and escrow payments on Sui Dhāga."
};

export default function Page() {
  return <CustomerPaymentsPage />;
}

