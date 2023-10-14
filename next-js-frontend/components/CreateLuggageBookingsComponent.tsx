import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { cookies } from "next/headers";
import { FormEvent } from "react";
import { authenticatedRequest, loginUser } from "@/api-service/auth.api";
import { z } from "zod";
import { redirect } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { createLuggage } from "@/api-service/luggage.api";

export default async function CreateBookingComponent() {
  return <CreateBookingForm />;
}

async function CreateBookingForm() {
  "use server";

  async function handleCreate(formData: FormData) {
    "use server";

    try {
      const access_token = cookies().get("access_token")?.value;

      if (!access_token) {
        redirect(`/`); // Navigate to new route
      }

      const schema = z.object({
        size: z.coerce
          .number({ required_error: "You must add a Size " })
          .gte(1, "Must be 1 and above"),
        transportId: z.coerce
          .number({ required_error: "You must add a Transport ID" })
          .gte(1, "Must be 1 and above"),
        recieverName: z.string({
          required_error: "Reciever Name is required.",
        }),
      });

      const parsed = schema.parse({
        size: formData.get("size"),
        transportId: formData.get("transportId"),
        recieverName: formData.get("recieverName"),
      });

      const response = await createLuggage(
        parsed.size,
        parsed.transportId,
        parsed.recieverName,
        access_token
      );

      console.log(response);

      if (response.success === true) {
        redirect("/dashboard");
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <form
      action={handleCreate}
      className="flex flex-col gap-4 p-4 shadow-md rounded-lg"
    >
      <div>
        <Label htmlFor="size" className="font-bold py-3">
          Luggage Size (KG)
        </Label>
        <Input name="size" id="size" type="number" />
      </div>
      <div>
        <Label htmlFor="transportId" className="font-bold py-3">
          Transport ID
        </Label>
        <Input name="transportId" id="transportId" type="number" />
      </div>
      <div>
        <Label htmlFor="recieverName" className="font-bold py-3">
          Luggage Reciver Name
        </Label>
        <Input name="recieverName" id="recieverName" type="text" />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Create Luggage Booking
      </button>
    </form>
  );
}
