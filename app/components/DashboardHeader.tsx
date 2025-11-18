"use client";

import type { ReactNode } from "react";
import { CalendarDays, Flame } from "lucide-react";
import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";

type DashboardHeaderProps = {
  name: string;
  greeting: string;
  streakDays: number;
  todayLabel: string;
  dateDisplay: string;
  focus: string;
  planName: string;
};

export function DashboardHeader({
  name,
  greeting,
  streakDays,
  todayLabel,
  dateDisplay,
  focus,
  planName,
}: DashboardHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="neubrut-card relative overflow-hidden border border-border/70 bg-gradient-to-br from-card via-background to-secondary/15 text-foreground shadow-[4px_4px_0_var(--border)] sm:shadow-[6px_6px_0_var(--border)]">
        <div className="pointer-events-none absolute inset-0 opacity-70 mix-blend-soft-light bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.4),_transparent_55%)]" />
        <CardContent className="relative flex flex-col gap-4 px-4 py-4 sm:gap-5 sm:px-6 sm:py-6">
          <div className="space-y-2 sm:space-y-3">
            <span className="inline-flex w-max items-center gap-1.5 rounded-full border border-border/40 bg-white/90 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] shadow-sm backdrop-blur sm:gap-2 sm:px-3 sm:py-1 sm:text-xs sm:tracking-[0.3em]">
              {greeting}
            </span>
            <div className="space-y-1 text-balance sm:space-y-2">
              <h2 className="text-lg font-semibold leading-tight sm:text-xl">
                <span className="bg-gradient-to-r from-rose-600 via-rose-400 to-red-500 bg-clip-text text-xl font-black text-transparent sm:text-2xl">
                  {name}
                </span>
                ,{" "}
                <span className="text-base sm:text-lg">
                  {name.trim().toLowerCase() === "shreyesh"
                    ? "you are gay 😏"
                    : "Ready to crush it today?"}
                </span>
              </h2>
              <p className="text-xs text-muted-foreground/80 sm:text-sm">
                {todayLabel} ·{" "}
                <span className="font-semibold text-foreground">
                  {dateDisplay}
                </span>
              </p>
            </div>
            <span className="inline-flex w-max items-center rounded-full border border-border/60 bg-foreground text-background px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider shadow-sm sm:px-3 sm:py-1 sm:text-xs sm:tracking-widest">
              Plan · {planName}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            <HeaderStat
              icon={<Flame className="size-3.5 sm:size-4" />}
              label="Streak"
              value={`${streakDays} days`}
            />
            <HeaderStat
              icon={<CalendarDays className="size-3.5 sm:size-4" />}
              label="Focus Day"
              value={focus}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

type HeaderStatProps = {
  icon: ReactNode;
  label: string;
  value: string;
};

function HeaderStat({ icon, label, value }: HeaderStatProps) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-border/70 bg-white/90 px-2.5 py-2.5 shadow-[2px_2px_0_var(--border)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_var(--border)] backdrop-blur sm:rounded-xl sm:px-4 sm:py-4 sm:gap-3 sm:shadow-[3px_3px_0_var(--border)] sm:hover:shadow-[4px_6px_0_var(--border)]">
      <div className="flex size-8 items-center justify-center rounded-full border border-border/60 bg-secondary/50 text-border sm:size-11">
        {icon}
      </div>
      <div className="leading-tight">
        <p className="text-[0.55rem] uppercase tracking-[0.15em] text-muted-foreground sm:text-[0.65rem] sm:tracking-[0.3em]">
          {label}
        </p>
        <p className="text-sm font-semibold text-foreground sm:text-lg">{value}</p>
      </div>
    </div>
  );
}
