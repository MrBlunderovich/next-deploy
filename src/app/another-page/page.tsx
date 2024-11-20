import readTempJson from "@/actions/readTempJson";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AnotherPage() {
  const jsonData = await readTempJson();

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <h1>Another Page</h1>
      <Link href="/">Go home</Link>
      <p>{jsonData}</p>
    </div>
  );
}
