"use client";

import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ExerciseCard } from "./ExerciseCard";
import { Check, ChevronDown, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { WorkoutExercise } from "../lib/data";

// --- Types ---
type WorkoutListProps = {
  exercises: WorkoutExercise[];
  completedIds: string[];
  isLoading?: boolean;
  onToggle: (exerciseId: string) => void;
};

// --- STRETCHING DATA ---
const STRETCHING_EXERCISE: WorkoutExercise = {
  id: "daily_stretch_routine",
  name: "Full Body Stretching",
  category: "Recovery",
  sets: "1",
  reps: "1",
  note: "5-10 Minutes",
  image: ["https://media.tenor.com/O5OplkJRnPEAAAAM/benjammins-stretch.gif"],
  video: [],
  impact: ["Spine", "Hips", "Hamstrings", "Shoulders", "Neck"],
  tips: [
    "Hold poses for 30s",
    "Deep nasal breathing",
    "Relax into discomfort",
    "Focus on alignment to avoid strain",
    "Breathe out on the stretch to deepen it",
    "Incorporate dynamic movements before static holds",
  ],
};

// --- Helper: Skeleton ---
const LoadingSkeleton = () => (
  <div className="space-y-6 w-full max-w-3xl mx-auto px-2 mt-8">
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className="relative h-28 w-full bg-white border-[3px] border-black/5 rounded-[30px] overflow-hidden shadow-sm"
      >
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-black/5 to-transparent" />
      </div>
    ))}
  </div>
);

// --- Helper: Rest Day ---
const RestDayCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="w-full max-w-xl mx-auto mt-12 px-4"
  >
    <div className="relative border-[3px] border-black bg-[#FFFDF7] rounded-[40px] p-10 text-center shadow-[8px_8px_0px_0px_#000]">
      <div className="w-20 h-20 bg-[#FFD27D] border-[3px] border-black rounded-full flex items-center justify-center mx-auto mb-6 shadow-[4px_4px_0px_0px_#000]">
        <span className="text-4xl">💤</span>
      </div>
      <h3 className="text-3xl font-black uppercase tracking-tighter text-black mb-2">
        Rest Day
      </h3>
      <p className="font-bold text-neutral-500 max-w-xs mx-auto">
        Time to recover. See you tomorrow!
      </p>
    </div>
  </motion.div>
);

const CompletionCard = () => {
  const isSaturday = new Date().getDay() === 6;
  const messageSuffix = isSaturday ? "See you on Monday!" : "See you tomorrow!";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-lg mx-auto mt-16 flex flex-col items-center text-center px-4 pb-20"
    >
      <img
        src="https://media.tenor.com/yo0TAG-MpD0AAAAm/lonely-lonely-lonely.webp"
        alt="Victory Dance"
        className="w-auto h-64 sm:h-80 object-contain drop-shadow-xl"
      />
      <div className="mt-8 space-y-3">
        <h2 className="text-4xl font-black uppercase tracking-tighter italic text-black">
          You Crushed It!
        </h2>
        <p className="text-xl font-bold text-neutral-500 uppercase tracking-widest">
          {messageSuffix}
        </p>
      </div>
    </motion.div>
  );
};

// --- Main Component ---
export function WorkoutList({
  exercises,
  completedIds,
  isLoading = false,
  onToggle,
}: WorkoutListProps) {
  // Collapsible State
  const [collapsedCategories, setCollapsedCategories] = useState<string[]>([]);

  const toggleSection = (category: string) => {
    setCollapsedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // 1. INJECT STRETCHING
  const finalExercises = useMemo(() => {
    if (!exercises.length) return [];
    const today = new Date().getDay();
    if (today !== 0) {
      return [...exercises, STRETCHING_EXERCISE];
    }
    return exercises;
  }, [exercises]);

  // 2. GROUPING & SORTING
  const groupedData = useMemo(() => {
    if (!finalExercises.length) return null;
    const groups: { category: string; items: WorkoutExercise[] }[] = [];
    const categoryMap = new Map<string, WorkoutExercise[]>();

    // Step A: Group items
    for (const ex of finalExercises) {
      const cat = ex.category || "General";
      if (!categoryMap.has(cat)) {
        categoryMap.set(cat, []);
        groups.push({ category: cat, items: categoryMap.get(cat)! });
      }
      categoryMap.get(cat)!.push(ex);
    }

    // Step B: SORT ITEMS WITHIN GROUPS
    groups.forEach((group) => {
      group.items.sort((a, b) => {
        const aDone = completedIds.includes(a.id);
        const bDone = completedIds.includes(b.id);
        if (aDone === bDone) return 0; // Keep original order if status is same
        return aDone ? 1 : -1; // Move completed (true) to bottom
      });
    });

    return groups;
  }, [finalExercises, completedIds]);

  // 3. AUTO-COLLAPSE LOGIC
  useEffect(() => {
    if (!groupedData) return;

    const categoriesToCollapse: string[] = [];
    let shouldUpdate = false;

    groupedData.forEach((group) => {
      const isComplete = group.items.every((item) =>
        completedIds.includes(item.id)
      );

      if (isComplete && !collapsedCategories.includes(group.category)) {
        categoriesToCollapse.push(group.category);
        shouldUpdate = true;
      }
    });

    if (shouldUpdate) {
      setCollapsedCategories((prev) => [...prev, ...categoriesToCollapse]);
    }
  }, [completedIds, groupedData]);

  // 4. CHECK GLOBAL COMPLETION
  const isGlobalDone = useMemo(() => {
    if (!finalExercises.length) return false;
    return finalExercises.every((ex) => completedIds.includes(ex.id));
  }, [finalExercises, completedIds]);

  if (isLoading) return <LoadingSkeleton />;
  if (!groupedData || groupedData.length === 0) return <RestDayCard />;

  return (
    <LayoutGroup>
      <motion.div
        className="w-full max-w-3xl mx-auto pb-32 space-y-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {groupedData.map((group) => {
          const completedCount = group.items.filter((i) =>
            completedIds.includes(i.id)
          ).length;
          const totalCount = group.items.length;
          const isAllDone = completedCount === totalCount && totalCount > 0;
          const progressPercent = (completedCount / totalCount) * 100;
          const isCollapsed = collapsedCategories.includes(group.category);

          return (
            <motion.div layout key={group.category} className="relative">
              {/* --- HEADER (CLICK TO TOGGLE) --- */}
              <div
                onClick={() => toggleSection(group.category)}
                className="mb-6 px-1 sticky top-4 z-20 cursor-pointer active:scale-[0.98] transition-transform"
              >
                <motion.div
                  layout
                  className={cn(
                    "relative overflow-hidden rounded-xl border-[3px] border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors duration-500",
                    isAllDone ? "bg-emerald-400" : "bg-white"
                  )}
                >
                  {/* Progress Bar */}
                  {!isAllDone && (
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-[#FFE27A] z-0"
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{
                        type: "spring",
                        stiffness: 50,
                        damping: 15,
                      }}
                    />
                  )}

                  <div className="relative z-10 flex items-center justify-between p-3.5">
                    {/* Left: Name */}
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-lg border-[3px] border-black font-black uppercase shadow-[2px_2px_0px_0px_#000] transition-all duration-300",
                          isAllDone
                            ? "bg-[#FFE27A] scale-110 rotate-3"
                            : "bg-black text-white"
                        )}
                      >
                        {isAllDone ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 10,
                            }}
                          >
                            <Trophy className="w-5 h-5 text-black fill-white/40 stroke-[2.5]" />
                          </motion.div>
                        ) : (
                          <span className="leading-none pb-0.5">
                            {group.category.charAt(0)}
                          </span>
                        )}
                      </div>

                      <h3
                        className={cn(
                          "text-lg font-black uppercase tracking-tighter transition-colors duration-300",
                          isAllDone
                            ? "text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                            : "text-black"
                        )}
                      >
                        {group.category}
                      </h3>
                    </div>

                    {/* Right: Counter + Arrow */}
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "rounded-md border-2 border-black px-2 py-1 text-xs font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]",
                          isAllDone
                            ? "bg-white text-emerald-600"
                            : "bg-black text-white"
                        )}
                      >
                        {isAllDone ? "Done" : `${completedCount}/${totalCount}`}
                      </div>
                      <motion.div
                        animate={{ rotate: isCollapsed ? -90 : 0 }}
                        className={cn(
                          "rounded-full p-1 border-2 border-black bg-white",
                          isAllDone && "opacity-80"
                        )}
                      >
                        <ChevronDown className="w-4 h-4 text-black stroke-[3]" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* EXERCISES (COLLAPSIBLE) */}
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-5 px-1 pb-4">
                      {group.items.map((exercise) => (
                        <ExerciseCard
                          key={exercise.id}
                          exercise={exercise}
                          isCompleted={completedIds.includes(exercise.id)}
                          onToggle={() => onToggle(exercise.id)}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}

        {/* --- COMPLETION CARD --- */}
        <AnimatePresence>{isGlobalDone && <CompletionCard />}</AnimatePresence>
      </motion.div>
    </LayoutGroup>
  );
}
