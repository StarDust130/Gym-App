"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import type { WorkoutExercise } from "@/app/lib/data";

type ExerciseCardProps = {
  exercise: WorkoutExercise;
  completed: boolean;
  onToggle: () => void;
  delay: number;
};

export function ExerciseCard({
  exercise,
  completed,
  onToggle,
  delay,
}: ExerciseCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tip, setTip] = useState<string | null>(null);
  const [loadingTip, setLoadingTip] = useState(false);
  const [tipError, setTipError] = useState<string | null>(null);

  const storageKey = useMemo(
    () => `exerciseTips:${exercise.name}`,
    [exercise.name]
  );

  const loadTip = useCallback(async () => {
    if (tip || loadingTip) return;

    if (typeof window !== "undefined") {
      const cached = window.localStorage.getItem(storageKey);
      if (cached) {
        setTip(cached);
        setTipError(null);
        return;
      }
    }

    try {
      setLoadingTip(true);
      setTipError(null);
      const res = await fetch(
        `/api/exercise-tip?name=${encodeURIComponent(exercise.name)}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch tip");
      }

      const data = (await res.json()) as { ok: boolean; tip?: string };
      if (!data.ok || !data.tip) {
        setTip(""); // Empty string indicates "fetched but empty"
        return;
      }

      setTip(data.tip);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(storageKey, data.tip);
      }
    } catch {
      setTipError("Tip unavailable");
    } finally {
      setLoadingTip(false);
    }
  }, [exercise.name, loadingTip, storageKey, tip]);

  useEffect(() => {
    if (isOpen) {
      void loadTip();
    }
  }, [isOpen, loadTip]);

  const tipLines = useMemo(() => {
    if (!tip) return [];
    return tip
      .split("\n")
      .map((line) => line.trim().replace(/^[-•]\s*/, ""))
      .filter(Boolean);
  }, [tip]);

  // Only show tips box if accordion is open and tips or error are present
  const shouldShowTips = isOpen && (tipLines.length > 0 || !!tipError);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: delay * 0.03 }}
      whileHover={{ scale: 1.005 }}
      className="rounded-3xl"
    >
      <Accordion
        type="single"
        collapsible
        onValueChange={(value) => setIsOpen(value === exercise.id)}
      >
        <AccordionItem
          value={exercise.id}
          className={`overflow-hidden rounded-3xl border-2 border-border bg-white shadow-[4px_4px_0_var(--border)] transition-opacity duration-300 ${
            completed ? "opacity-60" : "opacity-100"
          }`}
        >
          <AccordionTrigger className="flex flex-col gap-3 px-5 py-4 text-left sm:flex-row sm:items-center hover:no-underline">
            <div className="flex w-full items-start gap-3">
              <div onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={completed}
                  onCheckedChange={onToggle}
                  className="mt-1 size-6 rounded-full border-[3px] border-border bg-white data-[state=checked]:bg-primary data-[state=checked]:text-white"
                />
              </div>
              <div className="flex-1 text-left">
                <p className="text-base font-semibold leading-tight">
                  {exercise.name}
                </p>
              </div>
            </div>
            <span className="shrink-0 rounded-full border-2 border-border bg-secondary px-4 py-1 text-xs font-semibold uppercase tracking-wide text-border">
              {exercise.sets} sets · {exercise.reps} reps
            </span>
          </AccordionTrigger>

          <AccordionContent className="border-t-2 border-dashed border-border/50 bg-muted/40 px-5 py-5">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <StatBlock label="Sets" value={exercise.sets.toString()} />
              <StatBlock label="Reps" value={exercise.reps.toString()} />
            </div>

            {shouldShowTips && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="mt-5 rounded-2xl border-2 border-border/70 bg-white/80 p-4 shadow-[3px_3px_0_var(--border)]"
              >
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                    Quick tips
                  </p>
                </div>

                {tipError ? (
                  <p className="text-sm font-medium text-destructive">
                    {tipError}
                  </p>
                ) : (
                  <ul className="space-y-2 text-sm font-semibold text-foreground">
                    {tipLines.map((line, index) => (
                      <li
                        key={`${exercise.id}-tip-${index}`}
                        className="flex items-start gap-2 rounded-2xl border border-border/60 bg-secondary/30 px-3 py-2"
                      >
                        <span className="mt-1.5 inline-block size-1.5 shrink-0 rounded-full bg-foreground" />
                        <span className="leading-snug">{line}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
}

function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border-2 border-border bg-white px-4 py-3 text-center">
      <p className="text-2xl font-bold text-primary">{value}</p>
      <p className="text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </p>
    </div>
  );
}
