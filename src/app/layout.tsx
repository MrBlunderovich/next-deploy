import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import ThemeToggle from "@/components/ui/theme-toggle";
import { Toaster } from "@/components/ui/sonner";

const primaryFont = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dockerized",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          primaryFont.className,
          "flex min-h-screen flex-col antialiased",
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="csstricks-gradient relative flex items-center justify-end px-4 py-2">
            <ThemeToggle />
          </header>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
