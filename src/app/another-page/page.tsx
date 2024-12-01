import { auth } from "@/nextauth";
import AuthButton from "@/components/ui/auth/AuthButton.server";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AnotherPage() {
  const session = await auth();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="mb-4 mt-4 text-5xl">Another Page</h1>
      <Link href="/">Go home</Link>
      <AuthButton />
      <pre className="mt-8">{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
