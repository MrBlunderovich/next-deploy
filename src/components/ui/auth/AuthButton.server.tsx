import { SessionProvider } from "next-auth/react";
import { auth, BASE_PATH } from "../../../nextauth";
import AuthButtonClient from "./AuthButton.client";
import LogInButtonClient from "./LogInButton.client";

export default async function AuthButton({ brief }: { brief?: boolean }) {
  const session = await auth();
  if (session && session.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
    };
  }

  return (
    <SessionProvider session={session} basePath={BASE_PATH}>
      {brief ? <LogInButtonClient /> : <AuthButtonClient />}
    </SessionProvider>
  );
}
