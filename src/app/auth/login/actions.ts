"use server";

import "server-only";
import { signIn } from "@/nextauth";
import { hashValue } from "@/lib/utils";
import { db } from "@/drizzle/db";
import { InsertUser, UserTable } from "@/drizzle/schema";

export async function signInAction(...args: any) {
  await signIn(...args);
}

export async function createUser(
  formData: Omit<InsertUser, "salt"> & { invite: string },
) {
  const { invite, name, email, password } = formData;

  if (invite !== process.env.INVITE_CODE) {
    return Promise.reject(new Error("Invalid invite code"));
  }
  //TODO: validate with zod
  const salt = hashValue(name + email);

  try {
    const response = await db
      .insert(UserTable)
      .values({
        name,
        email,
        salt,
        password: hashValue(password + salt),
      })
      .returning({ id: UserTable.id, email: UserTable.email });

    const user = response[0];

    return user;
  } catch (error) {
    return Promise.reject(error);
  }
}
