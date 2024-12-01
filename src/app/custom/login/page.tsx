"use client";

import { redirect, useSearchParams } from "next/navigation";
import { FormEvent } from "react";
import { signInAction } from "./action";
import Link from "next/link";
import { auth } from "@/nextauth";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const username = form.username.value;
    const password = form.password.value;

    await signInAction("credentials", {
      username,
      password,
      redirect: false,
    });

    const session = await auth();
    if (!session) console.error("session is null");
    console.log(session, "session");

    redirect(callbackUrl || "/another-page");
  }

  return (
    <main className="flex grow flex-col items-center justify-center gap-4">
      <h1 className="text-3xl">Login</h1>
      <form
        className="flex flex-col gap-4 rounded border border-red-500 p-4"
        onSubmit={handleSubmit}
      >
        <input
          className="rounded px-2 py-1 text-black"
          type="text"
          name="username"
          id="username"
          placeholder="username"
        />
        <input
          className="rounded px-2 py-1 text-black"
          type="text"
          name="password"
          id="password"
          placeholder="Password"
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
