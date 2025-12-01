import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

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
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased mx-auto max-w-4xl md:border-l-2 md:border-r-2 border-border rounded-t-2xl rounded-b-2xl`}
      >
       <div className="flex min-h-screen flex-col">
          {/* Top nav for Workout / Diet */}
          <header className="flex items-center justify-center gap-3 border-b border-border/40 bg-background/80 px-4 py-3 backdrop-blur">
            <Link href="/" className="inline-flex">
              <button
                className="rounded-full border border-border/60 bg-background px-4 py-1 text-xs font-medium uppercase tracking-[0.22em] shadow-[2px_2px_0_var(--border)] hover:-translate-y-0.5 transition"
              >
                Workout
              </button>
            </Link>
            <Link href="/diet" className="inline-flex">
              <button
                className="rounded-full border border-border/60 bg-background px-4 py-1 text-xs font-medium uppercase tracking-[0.22em] shadow-[2px_2px_0_var(--border)] hover:-translate-y-0.5 transition"
              >
                Diet
              </button>
            </Link>
          </header>

          <div className="flex-1">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
