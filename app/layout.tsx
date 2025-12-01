import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TopNav } from "./components/TopNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GYM Buddy",
  description: "Daily-friendly workout planner and tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased`}
      >
        <div className="mx-auto flex min-h-screen max-w-4xl flex-col md:border-l-2 md:border-r-2 md:border-border md:px-0">
          <TopNav />
          <main className="flex-1 px-4 pb-10 pt-6 sm:px-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
