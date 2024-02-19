import { AdminDashboardComponent } from "@/components/AdminDashboard";
import LogOutForm from "@/components/LogoutForm";
import { cookies } from "next/headers";
import { Suspense } from "react";
export default async function AdminPage() {
  const access_token = cookies().get("access_token")?.value;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24">
      <div className="text-2xl font-bold mb-8">
        <p>Welcome to the ADMIN Dashboard</p>
      </div>

      <div className="w-[90%] flex items-center justify-center">
        <Suspense fallback={<div>Loading...</div>}>
          <AdminDashboardComponent accessToken={access_token!} />
        </Suspense>
      </div>
      <LogOutForm />
    </main>
  );
}
