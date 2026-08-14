import { AppointmentDetailPage } from "@/components/customer/appointment-detail-page";

export default async function Page({
  params
}: {
  params: Promise<{ appointmentId: string }>;
}) {
  const resolvedParams = await params;
  return <AppointmentDetailPage appointmentId={resolvedParams.appointmentId} />;
}
