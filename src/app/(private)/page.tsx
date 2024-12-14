import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex grow flex-col items-center justify-center gap-4">
      <h1 className="mb-4 mt-4 text-5xl">Homepage</h1>
      <Link className="underline" href="/tasks">
        Tasks
      </Link>
    </div>
  );
}
