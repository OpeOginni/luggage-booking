import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { cookies } from "next/headers";
import { FormEvent } from "react";
import { authenticatedRequest, loginUser } from "@/api-service/auth.api";
import { z } from "zod";
import { redirect } from "next/navigation";

export default async function Home() {
  const access_token = cookies().get("access_token")?.value;

  if (access_token) {
    const user = await authenticatedRequest(access_token);

    if (user) {
      redirect(`/dashboard`); // Navigate to new route
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24">
      <div className="text-2xl font-bold mb-8">
        <p>Welcome to the Luggage Booking System</p>
      </div>
      <div className="flex items-center justify-center">
        <LoginForm />
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Note: Use the following credentials for testing <br></br>- Admin
          Email: admin@gmail.com, Password: 123456 <br></br>- User Email:
          Clare29@fakemail.com, Password: password
        </p>
      </div>
    </main>
  );
}

async function LoginForm() {
  "use server";

  async function handleLogin(formData: FormData) {
    "use server";
    const schema = z.object({
      email: z.string().email(),
      password: z.string(),
    });

    const parsed = schema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    const access_token = await loginUser(parsed.email, parsed.password);

    if (!access_token) {
      throw new Error("Invalid credentials");
    }

    cookies().set("access_token", access_token);

    // mutate data
    // revalidate cache
  }

  return (
    <form
      action={handleLogin}
      className="flex flex-col gap-4 p-4 shadow-md rounded-lg"
    >
      <div>
        <Label htmlFor="email" className="font-bold py-3">
          Email
        </Label>
        <Input name="email" id="email" type="email" />
      </div>
      <div>
        <Label htmlFor="password" className="font-bold py-3">
          Password
        </Label>
        <Input name="password" id="password" type="password" />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Sign In
      </button>
    </form>
  );
}
