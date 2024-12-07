"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../button";

export default function LogInButtonClient() {
  const session = useSession();
  const user = session.data?.user;

  function handleClick() {
    if (user) {
      signOut({ redirectTo: "/auth/login" });
    } else {
      signIn();
    }
  }

  return (
    <Button onClick={handleClick} variant={"link"}>
      Log In
    </Button>
  );
}
