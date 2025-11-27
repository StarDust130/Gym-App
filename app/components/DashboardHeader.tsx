import type { ReactNode } from "react";
import { CalendarDays, Flame, Settings2 } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

type DashboardHeaderProps = {
  name: string;
  greeting: string;
  streakDays: number;
  todayLabel: string;
  dateDisplay: string;
  focus: string;
  planName: string;
  onOpenSettings: () => void;
};

export function DashboardHeader({
  name,
  greeting,
  streakDays,
  todayLabel,
  dateDisplay,
  focus,
  planName,
  onOpenSettings,
}: DashboardHeaderProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-[28px] border border-border/40 bg-linear-to-br from-white via-background/70 to-secondary/20 px-4 py-5 text-foreground shadow-[0_10px_40px_rgba(15,15,15,0.08)] sm:px-6 sm:py-6"
    >
      <div className="pointer-events-none absolute inset-0 opacity-70 mix-blend-soft-light bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.4),transparent_60%)]" />
      <div className="relative flex flex-col gap-5">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex min-h-7 items-center gap-1.5 rounded-full border border-border/40 bg-white/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.28em] shadow-sm backdrop-blur">
              {greeting}
            </span>
            <Button
              onClick={onOpenSettings}
              size="icon-sm"
              variant="ghost"
              className="border border-border/60 bg-white/80 text-foreground shadow-[2px_2px_0_var(--border)] hover:-translate-y-0.5"
              aria-label="Edit profile"
            >
              <Settings2 className="size-4" />
            </Button>
          </div>
          <div className="space-y-1 text-balance sm:space-y-2">
            <h2 className="text-xl font-semibold leading-tight sm:text-2xl">
              <span className="bg-linear-to-r from-rose-600 via-rose-400 to-red-500 bg-clip-text text-2xl font-black text-transparent sm:text-[28px]">
                {name}
              </span>
              ,{" "}
                <span className="text-base sm:text-lg">
                {(() => {
                  const lowered = name.trim().toLowerCase();
                  if (
                  lowered === "archiviste" ||  lowered === "shreyesh" ||
                  lowered.includes("arc")
                  ) {
                  return "you are gaylord 😏";
                  }
                  return "Ready to crush it today?";
                })()}
                </span>
            </h2>
            <p className="text-xs text-muted-foreground/80 sm:text-sm">
              {todayLabel} ·{" "}
              <span className="font-semibold text-foreground">
                {new Date(dateDisplay).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-[0.65rem] font-semibold uppercase tracking-widest text-foreground/80">
            <span className="inline-flex items-center rounded-full border border-border/50 bg-foreground text-background px-3 py-1 shadow-sm">
               {planName}
            </span>
          
          </div>
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
      </div>
    </motion.section>
  );
}

type HeaderStatProps = {
  icon: ReactNode;
  label: string;
  value: string;
};

function HeaderStat({ icon, label, value }: HeaderStatProps) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-border/70 bg-white/80 px-3 py-2 text-left shadow-[2px_2px_0_var(--border)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_var(--border)] backdrop-blur sm:gap-3 sm:px-4 sm:py-4">
      <div className="flex size-8 items-center justify-center rounded-full border border-border/60 bg-secondary/50 text-border sm:size-11">
        {icon}
      </div>
      <div className="leading-tight">
        <p className="text-[0.55rem] uppercase tracking-[0.15em] text-muted-foreground sm:text-[0.65rem] sm:tracking-[0.3em]">
          {label}
        </p>
        <p className="text-sm font-semibold text-foreground sm:text-lg">
          {value}
        </p>
      </div>
    </div>
  );
}
