"use server";

import { Booking, Transport } from "@/utils/interfaces";
import { BookingComponent } from "./BookingsComponent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authenticatedRequest } from "@/api-service/auth.api";
import { cookies } from "next/headers";
import { getBookings } from "@/api-service/booking.api";
import { getTransports } from "@/api-service/transport.api";
import { TransportComponent } from "./TransportsComponent";

export async function AdminDashboardComponent(props: { accessToken: string }) {
  const bookings: Booking[] = await getBookings(props.accessToken);

  const transports: Transport[] = await getTransports(props.accessToken);

  return (
    <Tabs defaultValue="transports" className="">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="bookings">Bookings</TabsTrigger>
        <TabsTrigger value="transports">Transports</TabsTrigger>
      </TabsList>
      <TabsContent value="bookings">
        <BookingComponent bookings={bookings} />
      </TabsContent>
      <TabsContent value="transports">
        <TransportComponent transports={transports} />
      </TabsContent>
    </Tabs>
  );
}
