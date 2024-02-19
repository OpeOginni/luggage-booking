import axios from "axios";
import { User } from "./interfaces";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
  baseURL: baseUrl,
});

export const fetchUser = (accessToken: string) =>
  api
    .get("/users/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => res.data as User);
