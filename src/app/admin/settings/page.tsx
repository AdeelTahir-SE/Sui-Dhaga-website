import { AdminSettingsPage } from "@/components/admin/admin-settings-page";

export const metadata = {
  title: "Platform Settings & Rules | Sui Dhāga Admin",
  description: "Configure commission tiers, escrow hold windows, and platform policies."
};

export default function Page() {
  return <AdminSettingsPage />;
}
