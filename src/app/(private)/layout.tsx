import AuthButton from "@/components/ui/auth/AuthButton.server";
import ThemeToggle from "@/components/ui/theme-toggle";
import Link from "next/link";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="csstricks-gradient relative flex items-center justify-between gap-4 px-4 py-2">
        <div className="mr-auto">
          <ThemeToggle />
        </div>
        <Link href="/profile">Profile</Link>
        <AuthButton />
      </header>
      <main className="flex grow flex-col">{children}</main>
    </>
  );
}
