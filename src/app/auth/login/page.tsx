"use client";

import { useSearchParams } from "next/navigation";
import { signInAction } from "./action";
import Link from "next/link";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // formSignIn(formData);
    signInAction("credentials", formData);
  }

  return (
    <main className="flex grow flex-col items-center justify-center gap-4">
      <h1 className="text-3xl">Login</h1>
      <form
        className="flex flex-col gap-4 rounded border border-red-500 p-4"
        onSubmit={handleSubmit}
        // action={formSignIn}
      >
        <input
          className="rounded px-2 py-1 text-black"
          type="text"
          name="username"
          id="username"
          placeholder="username"
          defaultValue={"jsmith"}
        />
        <input
          className="rounded px-2 py-1 text-black"
          type="text"
          name="password"
          id="password"
          placeholder="Password"
          defaultValue={"pass"}
        />
        <input
          hidden
          type="text"
          name="redirectTo"
          readOnly
          value={callbackUrl || "/"}
        />
        <button
          className="rounded bg-cyan-600 px-4 py-2 font-bold text-black hover:bg-red-500"
          type="submit"
        >
          Sign In
        </button>
      </form>
      <Link className="underline" href="/another-page">
        another page
      </Link>
    </main>
  );
}
