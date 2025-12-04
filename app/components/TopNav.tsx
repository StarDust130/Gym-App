"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Dumbbell, Salad } from "lucide-react";

import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Workout", icon: Dumbbell },
  { href: "/diet", label: "Diet", icon: Salad },
];

export function TopNav() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 16);
      if (currentY > 120 && currentY > lastY.current) {
        setHidden(true);
      } else if (currentY < lastY.current - 6) {
        setHidden(false);
      }
      lastY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={false}
      animate={{ y: hidden ? -110 : 0 }}
      className={cn(
        "sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl transition-shadow",
        scrolled ? "shadow-[0_20px_60px_rgba(15,23,42,0.12)]" : "shadow-none"
      )}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative size-10 overflow-hidden rounded-xl border border-border/60 shadow-[2px_2px_0_var(--border)] transition group-hover:scale-105">
            <Image
              src="/icon.png"
              alt="Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <span className="text-lg font-bold tracking-tight">Gym Buddy</span>
        </Link>
        <div className="flex items-center gap-1.5 rounded-2xl border border-border/60 bg-card/80 p-1.5 shadow-[4px_4px_0_var(--border)]">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] transition",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-[inset_2px_2px_6px_rgba(0,0,0,0.25)]"
                    : "text-muted-foreground hover:text-foreground"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="size-3.5" />
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </motion.header>
  );
}
