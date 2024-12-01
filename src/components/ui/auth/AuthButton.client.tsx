"use client";

import { cn } from "@/common/cn";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButtonClient() {
  const session = useSession();
  const user = session.data?.user;

  function handleClick() {
    if (user) {
      signOut();
    } else {
      signIn();
    }
  }

  return (
    <button
      className={cn(
        "g-2 flex items-center rounded border border-cyan-600 px-4 py-2",
        user && "border-red-700",
      )}
      onClick={handleClick}
    >
      {user ? `${user.name} : Logout` : "Login"}
    </button>
  );
}
