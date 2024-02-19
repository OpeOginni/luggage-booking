import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function ApproveBookingButton(props: { bookingId: number }) {
  async function approve() {
    "use server";

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const api = axios.create({
      baseURL: baseUrl,
    });

    try {
      const response = await api.get(
        `/bookings/approve-booking/${props.bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${cookies().get("access_token")?.value}`,
            withCredentials: true, // Add this line
          },
        }
      );

      if (response.status === 200) {
        revalidatePath("/admin/dashboard");
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form>
      <button
        formAction={approve}
        className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded"
      >
        Approve
      </button>
    </form>
  );
}

export async function RejectBookingButton(props: { bookingId: number }) {
  async function reject() {
    "use server";

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const api = axios.create({
      baseURL: baseUrl,
    });

    try {
      const response = await api.get(
        `/bookings/reject-booking/${props.bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${cookies().get("access_token")?.value}`,
            withCredentials: true, // Add this line
          },
        }
      );

      if (response.status === 200) {
        revalidatePath("/admin/dashboard");
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form>
      <button
        formAction={reject}
        className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
      >
        Reject
      </button>
    </form>
  );
}
