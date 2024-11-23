import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AnotherPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1>Another Page +json</h1>
      <Link href="/">Go home</Link>
    </div>
  );
}
