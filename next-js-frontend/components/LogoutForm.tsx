import { cookies } from "next/headers";

export default async function LogOutForm() {
  async function logOut(formData: FormData) {
    "use server";

    cookies().delete("access_token");
  }
  return (
    <div>
      <form
        action={logOut}
        className="flex flex-col gap-4 p-4 shadow-md rounded-lg"
      >
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          LogOut
        </button>
      </form>
    </div>
  );
}
