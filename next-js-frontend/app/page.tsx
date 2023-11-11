import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { cookies } from "next/headers";
import { FormEvent } from "react";
import { authenticatedRequest, loginUser } from "@/api-service/auth.api";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/LoginForm";
import { handleLogin } from "@/server-functions/auth.functions";
import { SubmitButton } from "@/components/SubmitButton";

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
