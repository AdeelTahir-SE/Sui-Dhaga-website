import { BookingAppointmentPage } from "@/components/booking/booking-appointment-page";

export default async function Page({
  params
}: {
  params: Promise<{ tailorId: string }>;
}) {
  const { tailorId } = await params;
  return <BookingAppointmentPage tailorId={tailorId} />;
}
