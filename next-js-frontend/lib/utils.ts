import { AxiosError } from "axios"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getErrorMessage = (error: unknown): string => {

  let message: string

  if (error instanceof AxiosError) {
    message = error.response?.data?.message
  } else if (error instanceof Error) {
    message = error.message
  } else if (typeof error === "string") {
    message = error
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message)
  } else {
    message = "Something went wrong"
  }

  return message
}
