"use client";

import { motion } from "framer-motion";
import { Coffee, Sparkles } from "lucide-react";

import type { WorkoutExercise } from "@/app/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { ExerciseCard } from "@/app/components/ExerciseCard";

type WorkoutListProps = {
  exercises: WorkoutExercise[];
  completedIds: string[];
  dayLabel: string;
  onToggle: (exerciseId: string) => void;
};

export function WorkoutList({
  exercises,
  completedIds,
  dayLabel,
  onToggle,
}: WorkoutListProps) {
  if (exercises.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Card className="neubrut-card bg-card text-center">
          <CardContent className="flex flex-col items-center gap-3 py-8">
            <Coffee className="size-10 text-primary" />
            <p className="text-xl font-semibold text-foreground">
              Recovery window unlocked
            </p>
            <p className="text-sm text-muted-foreground">
              {dayLabel} is for gentle walks, long exhales, and fueling. Still
              counts, still matters.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div layout className="space-y-4">
      {exercises.map((exercise, index) => (
        <ExerciseCard
          key={exercise.id}
          exercise={exercise}
          completed={completedIds.includes(exercise.id)}
          onToggle={() => onToggle(exercise.id)}
          delay={index}
        />
      ))}
      
    </motion.div>
  );
}
