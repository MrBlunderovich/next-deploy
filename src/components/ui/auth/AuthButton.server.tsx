import { SessionProvider } from "next-auth/react";
import { auth, BASE_PATH } from "../../../nextauth";
import AuthButtonClient from "./AuthButton.client";

export default async function AuthButton() {
  const session = await auth();
  if (session && session.user) {
    console.log(session.user, "+++++++++full user data");

    session.user = {
      name: session.user.name,
      email: session.user.email,
    };
  }

  return (
    <SessionProvider session={session} basePath={BASE_PATH}>
      <AuthButtonClient />
    </SessionProvider>
  );
}
