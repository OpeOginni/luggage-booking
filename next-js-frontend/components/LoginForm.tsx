"use client";
import { useToast } from "@/components/ui/use-toast";
import { handleLogin } from "@/server-functions/auth.functions";
import { Label } from "@/components/ui/label";

import { useFormState as useFormState, useFormStatus } from "react-dom";
import { Input } from "./ui/input";
import { SubmitButton } from "./SubmitButton";

const initialState = {
  message: null,
};

function SignInButton() {
  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      type="submit"
    >
      {"Sign IN"}
    </button>
  );
}

export function LoginForm() {
  const { toast } = useToast();

  async function clientAction(formData: FormData) {
    const result = await handleLogin(formData);

    if (result?.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "You are now logged in",
      });
    }
  }
  return (
    <form
      action={clientAction}
      className="flex flex-col gap-4 p-4 shadow-md rounded-lg"
    >
      <div>
        <Label htmlFor="email" className="font-bold py-3">
          Email
        </Label>
        <Input name="email" id="email" type="email" required />
      </div>
      <div>
        <Label htmlFor="password" className="font-bold py-3">
          Password
        </Label>
        <Input name="password" id="password" type="password" required />
      </div>
      <SignInButton />
    </form>
  );
}
