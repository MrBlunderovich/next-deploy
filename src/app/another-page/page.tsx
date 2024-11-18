import Link from "next/link";

export default function AnotherPage() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <h1>Another Page</h1>
      <Link href="/">Go home</Link>
    </div>
  );
}
