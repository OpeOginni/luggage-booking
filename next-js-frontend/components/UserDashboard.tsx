import { Booking, Transport } from "@/utils/interfaces";
import { BookingComponent } from "./BookingsComponent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserBookings } from "@/api-service/booking.api";
import { getTransports } from "@/api-service/transport.api";
import { TransportComponent } from "./TransportsComponent";
import CreateBookingComponent from "./CreateLuggageBookingsComponent";
import { UserBookingsComponent } from "./UserBookingComponent";

export async function UserDashboard(props: { accessToken: string }) {
  const bookings: Booking[] = await getUserBookings(props.accessToken);

  const transports: Transport[] = await getTransports(props.accessToken);

  return (
    <Tabs defaultValue="my-bookings" className="">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="my-bookings">My Bookings</TabsTrigger>
        <TabsTrigger value="transports">Available Transports</TabsTrigger>
        <TabsTrigger value="create-booking">Create Booking</TabsTrigger>
      </TabsList>
      <TabsContent value="my-bookings">
        <UserBookingsComponent bookings={bookings} />
      </TabsContent>
      <TabsContent value="transports">
        <TransportComponent transports={transports} />
      </TabsContent>
      <TabsContent value="create-booking">
        <CreateBookingComponent />
      </TabsContent>
    </Tabs>
  );
}
