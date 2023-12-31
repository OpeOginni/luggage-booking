import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Booking } from "@/utils/interfaces";
import {
  ApproveBookingButton,
  BookingStatusButtons,
  RejectBookingButton,
} from "./BookingStatusChangeButtons";

export function BookingComponent(props: { bookings: Booking[] }) {
  if (props.bookings.length === 0) {
    return <p>No bookings available.</p>;
  }

  const labels = [
    "Departure",
    "Destination",
    "Transport Type",
    "Size",
    "Dangerous Items",

    "Recipient Name",
    "Time Booked",
    "Status",

    "Verification Code",
  ];

  return (
    <Table>
      <TableCaption>Bookings</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Transport Code</TableHead>
          <TableHead>Departure</TableHead>
          <TableHead>Luggage Size</TableHead>
          <TableHead>Dangerous Item</TableHead>
          <TableHead>Time Booked</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Recipient Name</TableHead>
          <TableHead>Verification Code</TableHead>
          <TableHead>Approve</TableHead>
          <TableHead>Reject</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.bookings.map((booking) => (
          <TableRow key={booking.id}>
            <TableCell>{booking.transport.transportCode}</TableCell>
            <TableCell>
              {new Date(booking.transport.departure).toDateString()}
            </TableCell>
            <TableCell>{booking.luggage.size}</TableCell>
            <TableCell>
              {booking.luggage.dangerousItems ? (
                <p className=" text-xs text-red-500">Dangerous Items</p>
              ) : (
                <p className="text-xs  text-green-500">Safe</p>
              )}
            </TableCell>
            <TableCell>{new Date(booking.createdAt).toDateString()}</TableCell>
            <TableCell
              className={
                booking.status === "PENDING"
                  ? "text-yellow-500"
                  : booking.status === "ACCEPTED"
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {booking.status}
            </TableCell>
            <TableCell>{booking.luggage.recieverName}</TableCell>
            <TableCell className="flex text-center justify-center">
              {booking.bookingVerificationCode ? (
                <p>{booking.bookingVerificationCode}</p>
              ) : (
                <p>- - -</p>
              )}
            </TableCell>

            <TableCell>
              {booking.status === "PENDING" ? (
                <ApproveBookingButton bookingId={booking.id} />
              ) : (
                <p>ALREADY {booking.status}</p>
              )}
            </TableCell>
            <TableCell>
              {booking.status === "PENDING" ? (
                <RejectBookingButton bookingId={booking.id} />
              ) : (
                <p>ALREADY {booking.status}</p>
              )}
            </TableCell>
          </TableRow>
        ))}

        {/* <Accordion key={booking.id} type="single" collapsible>
<AccordionItem value="item-1">
  <AccordionTrigger>
              </AccordionTrigger>
              <AccordionContent>
                <div className="w-1/4 flex gap-2">
                  <BookingStatusButtons bookingId={booking.id} />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion> */}
      </TableBody>
    </Table>
  );
}
