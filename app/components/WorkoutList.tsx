"use client";

import { useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

import { ExerciseCard } from "./ExerciseCard";
import { Check, Trophy } from "lucide-react";
import { cn } from "@/lib/utils"; // Adjust path
import { WorkoutExercise } from "../lib/data";

// --- Types ---
type WorkoutListProps = {
  exercises: WorkoutExercise[];
  completedIds: string[];
  dayLabel: string;
  isLoading?: boolean;
  onToggle: (exerciseId: string) => void;
};

// --- Helper: Cool Shimmer Skeleton Loader ---
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

// --- Helper: Rest Day Card ---
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

// --- Main Component ---
export function WorkoutList({
  exercises,
  completedIds,
  isLoading = false,
  onToggle,
}: WorkoutListProps) {
  // 1. Group & Sort Logic
  const groupedData = useMemo(() => {
    if (!exercises.length) return null;

    const groups: Record<string, WorkoutExercise[]> = {};
    exercises.forEach((ex) => {
      const cat = ex.category || "General";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(ex);
    });

    const CATEGORY_ORDER = [
      "Legs",
      "Shoulder",
      "Chest",
      "Triceps",
      "Back",
      "Biceps",
      "Abs",
      "Cardio",
    ];

    const sortedCategories = Object.keys(groups).sort(
      (a, b) => CATEGORY_ORDER.indexOf(a) - CATEGORY_ORDER.indexOf(b)
    );

    return sortedCategories.map((cat) => {
      const sortedExercises = groups[cat].sort((a, b) => {
        const aDone = completedIds.includes(a.id);
        const bDone = completedIds.includes(b.id);
        return Number(aDone) - Number(bDone);
      });
      return { category: cat, items: sortedExercises };
    });
  }, [exercises, completedIds]);

  // 2. Loading State
  if (isLoading) return <LoadingSkeleton />;

  // 3. Empty State
  if (!groupedData || groupedData.length === 0) {
    return <RestDayCard />;
  }

  // 4. Render
  return (
    <LayoutGroup>
      <motion.div
        className="w-full max-w-3xl mx-auto pb-32 space-y-12 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {groupedData.map((group) => {
          const completedCount = group.items.filter((i) =>
            completedIds.includes(i.id)
          ).length;
          const totalCount = group.items.length;
          const isCategoryDone =
            completedCount === totalCount && totalCount > 0;

          return (
            <div key={group.category} className="relative">
              {/* STICKY HEADER - Fixed position and z-index */}
              <div className="  mb-6 px-2 pointer-events-none">
                <motion.div
                  layout
                  className={cn(
                    "inline-flex items-center gap-3 px-5 py-2 rounded-full border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors duration-300 pointer-events-auto",
                    isCategoryDone ? "bg-[#B8FF9F]" : "bg-black"
                  )}
                >
                  <span
                    className={cn(
                      "text-xs font-black uppercase tracking-widest",
                      isCategoryDone ? "text-black" : "text-white"
                    )}
                  >
                    {group.category}
                  </span>

                  <span
                    className={cn(
                      "text-[10px] font-bold px-2 py-0.5 rounded-full",
                      isCategoryDone
                        ? "bg-black text-[#B8FF9F]"
                        : "bg-white text-black"
                    )}
                  >
                    {completedCount}/{totalCount}
                  </span>

                  <AnimatePresence>
                    {isCategoryDone && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Check className="w-4 h-4 text-black stroke-[4]" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* CARD LIST */}
              <motion.div layout className="space-y-5 px-1 relative z-20">
                <AnimatePresence>
                  {group.items.map((exercise) => (
                    <ExerciseCard
                      key={exercise.id}
                      exercise={exercise}
                      isCompleted={completedIds.includes(exercise.id)}
                      onToggle={() => onToggle(exercise.id)}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          );
        })}

        {/* FINAL CELEBRATION CARD */}
        <AnimatePresence>
          {exercises.every((e) => completedIds.includes(e.id)) &&
            exercises.length > 0 && (
              <motion.div
                initial={{ y: 50, opacity: 0, scale: 0.9 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  transition: { type: "spring", bounce: 0.5 },
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="mx-4"
              >
                <div className="bg-[#FFD27D] border-[3px] border-black rounded-[40px] p-10 shadow-[8px_8px_0px_0px_#000] flex flex-col items-center justify-center text-center relative overflow-hidden">
                  {/* Decorative background elements */}
                 
                  <motion.div
                    animate={{
                      rotate: [0, -10, 10, -10, 0],
                      scale: [1, 1.1, 1.1, 1],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut",
                    }}
                    className="mb-6 relative z-10"
                  >
                    <Trophy className="w-20 h-20 text-black stroke-[1.5] fill-white" />
                  </motion.div>
                  <h2 className="text-4xl font-black uppercase italic tracking-tighter text-black relative z-10">
                    Workout Crushed!
                  </h2>
                  <p className="font-bold text-lg text-black/80 mt-2 relative z-10">
                    You're an animal. See you tomorrow.
                  </p>
                </div>
              </motion.div>
            )}
        </AnimatePresence>
      </motion.div>
    </LayoutGroup>
  );
}
