"use client";

import { useState, KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { MOCK_WORKOUT_PLAN, type WorkoutPlan } from "@/app/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type OnboardingProps = {
  onComplete: (payload: { name: string; plan: WorkoutPlan }) => void;
};

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");

  // ENTER key on name input
  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && name.trim()) {
      setStep(2);
    }
  };

  // ⭐ FINISH WITH BEGINNER PLAN
  const startIntermediatePlan = () => {
    localStorage.setItem("workoutPlan", JSON.stringify(MOCK_WORKOUT_PLAN));
    onComplete({ name: name.trim(), plan: MOCK_WORKOUT_PLAN });
  };

  return (
    <div className="min-h-screen px-4 py-10 flex items-center justify-center text-foreground">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="neubrut-card bg-white p-6 text-center"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Quick start
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight">
            Create your plan fast
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Follow these quick steps to begin.
          </p>
        </motion.div>

        {/* Card */}
        <Card className="neubrut-card bg-card">
          <CardContent className="p-6">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                // ------------------------ STEP 1 ------------------------
                <motion.div
                  key="step-one"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                      Step 1 of 2
                    </p>
                    <h2 className="text-2xl font-semibold">
                      What&apos;s your name?
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      This will appear on your dashboard.
                    </p>
                  </div>

                  <Input
                    autoFocus
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={handleEnter}
                    className="border-2 border-border"
                  />

                  <Button
                    className="w-full border-2 border-border bg-primary text-primary-foreground shadow-[4px_4px_0_var(--border)] hover:bg-primary/90"
                    disabled={!name.trim()}
                    onClick={() => setStep(2)}
                  >
                    Next
                  </Button>
                </motion.div>
              ) : (
                // ------------------------ STEP 2 ------------------------
                <motion.div
                  key="step-two"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                      Step 2 of 2
                    </p>
                    <h2 className="text-2xl font-semibold">
                      Start with Intermediate Plan
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Skip uploads — begin directly with the predefined Intermediate schedule.
                    </p>
                  </div>

                  {/* ⭐ Start with Intermediate Plan button */}
                  <Button
                    className="w-full border-2 border-border bg-primary text-primary-foreground shadow-[4px_4px_0_var(--border)] hover:bg-primary/90"
                    onClick={startIntermediatePlan}
                  >
                    Start Intermediate Plan
                  </Button>

                  <div className="flex gap-2 text-sm">
                    <Button
                      variant="ghost"
                      className="flex-1 border-2 border-border bg-white shadow-[4px_4px_0_var(--border)]"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
