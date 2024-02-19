import { authenticatedRequest } from "@/api-service/auth.api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function Layout({
  user,
  admin,
}: {
  user: ReactNode;
  admin: ReactNode;
}) {
  const access_token = cookies().get("access_token")?.value;
  if (!access_token) {
    redirect(`/`); // Navigate to new route
  }

  const fetchedUser = await authenticatedRequest(access_token);

  if (!fetchedUser) {
    redirect(`/`); // Navigate to new route
  }

  return <div>{fetchedUser.role === "ADMIN" ? admin : user}</div>;
}

// https://twitter.com/asidorenko_/status/1755517536081236070?t=BYBJJpZ1JwupqthJj-im5A&s=19
