"use server";

import { signIn } from "@/nextauth";

export async function signInAction(...args: any) {
  await signIn(...args);
}
