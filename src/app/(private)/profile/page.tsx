import { userRole } from "@/drizzle/schema";
import { auth } from "@/nextauth";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const session = await auth();
  //@ts-expect-error
  const isAdmin = session?.user?.role === userRole.ADMIN;
  console.log(session, "session");

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="mb-4 mt-4 text-5xl">Profile</h1>
      <Link href="/">Go home</Link>
      <Link href="/tasks">Tasks</Link>
      {isAdmin && <Link href="/admin">Admin dashboard</Link>}
      <pre className="mt-8">{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
