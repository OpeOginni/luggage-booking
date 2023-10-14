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
import { AdminDashboardComponent } from "@/components/AdminDashboard";
import { UserDashboard } from "@/components/UserDashboard";

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

  if (user.role === "USER") {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen p-24">
        <div className="text-2xl font-bold mb-8">
          <p>Welcome to the USER Dashboard</p>
        </div>

        <div className="w-[90%] flex items-center justify-center">
          <UserDashboard accessToken={access_token} />
        </div>
        <LogOutForm />
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24">
      <div className="text-2xl font-bold mb-8">
        <p>Welcome to the ADMIN Dashboard</p>
      </div>

      <div className="w-[90%] flex items-center justify-center">
        <AdminDashboardComponent accessToken={access_token} />
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
