"use client";

import { useSearchParams } from "next/navigation";
import { signInAction } from "./actions";
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
    <div className="flex grow flex-col items-center justify-center gap-4">
      <h1 className="text-3xl">Login</h1>
      <form
        className="flex flex-col gap-4 rounded border border-red-500 p-4"
        onSubmit={handleSubmit}
        // action={formSignIn}
      >
        <input
          className="rounded px-2 py-1 text-black dark:text-white"
          type="text"
          name="email"
          id="email"
          placeholder="email"
        />
        <input
          className="rounded px-2 py-1 text-black dark:text-white"
          type="text"
          name="password"
          id="password"
          placeholder="Password"
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
      <p className="flex items-center gap-2">
        Don&lsquo;t have an account?
        <Link href="/auth/register">Register</Link>
      </p>
    </div>
  );
}
