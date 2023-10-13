import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { cookies } from "next/headers";
import { FormEvent } from "react";
import { authenticatedRequest, loginUser } from "@/api-service/auth.api";
import { z } from "zod";
import { redirect } from "next/navigation";
import { getBookings } from "@/api-service/booking.api";
import { Booking } from "@/utils/interfaces";
import { BookingComponent } from "@/components/BookingsComponent";

export default async function DashboardPage() {
  const access_token = cookies().get("access_token")?.value;

  if (!access_token) {
    redirect(`/`); // Navigate to new route
  }

  const user = await authenticatedRequest(access_token);

  if (!user) {
    redirect(`/`); // Navigate to new route
  }

  //   if (user.role !== "ADMIN") {
  //     redirect("/luggage");
  //   }

  const bookings: Booking[] = await getBookings(access_token);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24">
      <div className="text-2xl font-bold mb-8">
        <p>Welcome to the Dashboard</p>
        <p className="text-lg text-center">Here are Current Bookings</p>
      </div>

      <div className="w-[90%] ">
        <BookingComponent bookings={bookings} />
      </div>
      <LogOutForm />
    </main>
  );
}

async function LogOutForm() {
  async function logOut(formData: FormData) {
    "use server";

    cookies().delete("access_token");
  }
  return (
    <div>
      <form
        action={logOut}
        className="flex flex-col gap-4 p-4 shadow-md rounded-lg"
      >
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          LogOut
        </button>
      </form>
    </div>
  );
}
