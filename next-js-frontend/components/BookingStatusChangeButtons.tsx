"use client";

import { useState } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useCookies } from "next-client-cookies";

export function BookingStatusButtons(props: { bookingId: number }) {
  const cookies = useCookies();

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const api = axios.create({
    baseURL: baseUrl,
  });

  const { toast } = useToast();

  const [rejectButtonLoading, setRejectButtonLoading] =
    useState<boolean>(false);
  const [acceptButtonLoading, setAcceptButtonLoading] =
    useState<boolean>(false);

  async function handleApprove() {
    setAcceptButtonLoading(true);
    try {
      const response = await api.patch(
        `/bookings/approve-booking/${props.bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.get("access_token")}`,
            withCredentials: true, // Add this line
          },
        }
      );

      if (response.status === 200) {
        setAcceptButtonLoading(false);
        return toast({
          title: "Booking Approved",
          description: "Booking has been approved successfully",
        });
      } else {
        throw new Error();
      }
    } catch (error) {
      setAcceptButtonLoading(false);

      return toast({
        title: "There was an error",
        variant: "destructive",
      });
    }
  }

  async function handleReject() {
    setRejectButtonLoading(true);
    try {
      const response = await api.get(
        `/bookings/reject-booking/${props.bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.get("access_token")}`,
            withCredentials: true, // Add this line
          },
        }
      );

      if (response.status === 200) {
        setRejectButtonLoading(false);
        return toast({
          title: "Booking Rejected",
          description: "Booking has been approved successfully",
        });
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
      setRejectButtonLoading(false);

      return toast({
        title: "There was an error",
        variant: "destructive",
      });
    }
  }
  return (
    <>
      <button
        onClick={async () => {
          await handleApprove();
        }}
        className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded"
      >
        Approve
      </button>
      <button
        onClick={async () => {
          await handleReject();
        }}
        className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
      >
        Reject
      </button>
    </>
  );
}
