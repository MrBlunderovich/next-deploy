import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

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
    <html lang="en">
      <body className={`${primaryFont.className} antialiased`}>{children}</body>
    </html>
  );
}
