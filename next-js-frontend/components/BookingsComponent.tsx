import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Booking } from "@/utils/interfaces";
import { BookingStatusButtons } from "./BookingStatusChangeButtons";

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
    <div>
      <ul role="list" className="divide-y divide-gray-100">
        <li className="grid grid-cols-9 py-5 text font-bold text-center">
          {labels.map((label, index) => (
            <div key={index}>{label}</div>
          ))}
        </li>
        {props.bookings.map((booking) => (
          <>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <li
                    key={booking.id}
                    className="grid grid-cols-9 py-5 text-center items-center"
                  >
                    <div className="flex items-center">
                      <p>
                        {new Date(booking.transport.departure).toDateString()}
                      </p>
                    </div>

                    <div className="flex items-center">
                      <p>{booking.transport.destination}</p>
                    </div>

                    <div className="">
                      <p>{booking.transport.transportType}</p>
                    </div>

                    <div className="">
                      <p>{booking.luggage.size} KG</p>
                    </div>

                    <div className="">
                      {booking.luggage.dangerousItems ? (
                        <p className="mt-1 text-xs leading-5 text-red-500">
                          Dangerous Items
                        </p>
                      ) : (
                        <p className="mt-1 text-xs leading-5 text-green-500">
                          Safe
                        </p>
                      )}
                    </div>

                    <div className="">
                      <p>{booking.luggage.recieverName}</p>
                    </div>

                    <div className="">
                      <p>{new Date(booking.createdAt).toDateString()}</p>
                    </div>
                    <div className="">
                      <p
                        className={
                          booking.status === "PENDING"
                            ? "text-yellow-500"
                            : booking.status === "ACCEPTED"
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {booking.status}
                      </p>
                    </div>

                    <div className="">
                      {booking.bookingVerificationCode ? (
                        <p>{booking.bookingVerificationCode}</p>
                      ) : (
                        <p>null</p>
                      )}
                    </div>
                  </li>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="w-1/4 flex gap-2">
                    <BookingStatusButtons bookingId={booking.id} />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </>
        ))}
      </ul>
    </div>
  );
}
