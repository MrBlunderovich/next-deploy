"use client";

import { signIn } from "@/nextauth";
import { Button } from "../button";

export default function LogInButton() {
  return (
    <Button onClick={() => signIn()} variant={"link"}>
      Log In
    </Button>
  );
}
