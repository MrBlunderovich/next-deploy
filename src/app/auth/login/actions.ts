"use server";

import "server-only";
import { signIn } from "@/nextauth";
import { hashValue } from "@/lib/utils";
import { db } from "@/drizzle/db";
import { InsertUser, UserTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function signInAction(...args: Parameters<typeof signIn>) {
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

export async function checkUser(email: string, password: string) {
  try {
    const response = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.email, email))
      .limit(1);

    if (response.length === 0) {
      return Promise.reject(new Error("User not found"));
    }

    const user = response[0];

    if (user.password !== hashValue(password + user.salt)) {
      return Promise.reject(new Error("User not found"));
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      secret_data: "secret",
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}
