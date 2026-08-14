import { OrderDetailPage } from "@/components/customer/order-detail-page";

export default async function Page({
  params
}: {
  params: Promise<{ orderId: string }>;
}) {
  const resolvedParams = await params;
  return <OrderDetailPage orderId={resolvedParams.orderId} />;
}
