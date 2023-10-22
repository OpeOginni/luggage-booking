"use client";

import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";

export function SubmitButton(props: { buttonText: string; className: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      className={cn(props.className)}
      type="submit"
      aria-disabled={pending}
    >
      {pending ? "..." : props.buttonText}
    </button>
  );
}
