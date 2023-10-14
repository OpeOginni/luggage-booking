import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Booking, Transport } from "@/utils/interfaces";
import { BookingStatusButtons } from "./BookingStatusChangeButtons";
import { CarTaxiFront, PlaneTakeoff } from "lucide-react";

export function TransportComponent(props: { transports: Transport[] }) {
  if (props.transports.length === 0) {
    return <p>No Transports available.</p>;
  }

  const labels = [
    "Departure",
    "Destination",
    "Transport Type",
    "Max Slots",
    "Transport Code",
    ,
  ];

  return (
    <Table>
      <TableCaption>Available Transports</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Transport Type</TableHead>
          <TableHead>Transport ID</TableHead>

          <TableHead>Departure</TableHead>
          <TableHead>Destination</TableHead>
          <TableHead>Max Slots</TableHead>
          <TableHead> Code</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.transports.map((transport) => (
          <TableRow key={transport.id}>
            <TableCell className="font-medium">
              {transport.transportType === "JETTY" ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <PlaneTakeoff />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{transport.transportType}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <CarTaxiFront />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{transport.transportType}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </TableCell>
            <TableCell>{transport.id}</TableCell>
            <TableCell>
              {new Date(transport.departure).toDateString()}
            </TableCell>
            <TableCell>{transport.destination}</TableCell>
            <TableCell>{transport.maxBookingSlots}</TableCell>
            <TableCell>{transport.transportCode}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
