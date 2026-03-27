"use client";

import { Dashboard } from "@/app/components/Dashboard";
import { Onboarding } from "@/app/components/Onboarding";
import { useWorkoutStore } from "@/app/lib/hooks";

export default function HomePage() {
  const {
    userProfile,
    workoutPlan,
    completedExercises,
    skippedExercises,
    toggleComplete,
    toggleSkip,
    completeOnboarding,
    updateUserSettings,
  } = useWorkoutStore();

  if (!userProfile || !workoutPlan) {
    return (
      <Onboarding
        onComplete={({ name, plan }) => {
          completeOnboarding(name, plan);
        }}
      />
    );
  }

  return (
    <Dashboard
      name={userProfile.name}
      joinDate={userProfile.joinDate}
      workoutPlan={workoutPlan}
      completedExercises={completedExercises}
      skippedExercises={skippedExercises}
      toggleComplete={toggleComplete}
      toggleSkip={toggleSkip}
      onUpdateSettings={updateUserSettings}
    />
  );
}
