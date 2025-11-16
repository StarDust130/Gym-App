"use client";

import { useEffect, useState } from "react";
import { differenceInDays, format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar as CalendarIcon, Flame } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type Exercise = {
  id: string;
  name: string;
  baseReps: string;
  baseSets: string;
  note: string | null;
};

type WorkoutDay = {
  dayName: string;
  exercises: Exercise[];
};

type WorkoutPlan = Record<string, WorkoutDay | string>;

type UserProfile = {
  name: string;
  joinDate: string;
};

const workoutPlan: WorkoutPlan = {
  Monday: {
    dayName: "Lower Body",
    exercises: [
      {
        id: "mon-1",
        name: "Own body Squats / Squats DB",
        baseReps: "20-15",
        baseSets: "2-3",
        note: "Use own body weight for 1st week, then Dumbbells.",
      },
      {
        id: "mon-2",
        name: "Own body static Lunges / Lunges static db",
        baseReps: "20-15",
        baseSets: "2-3",
        note: "W1: Own body. W2+: Dumbbells.",
      },
      {
        id: "mon-3",
        name: "Leg press / Leg extension",
        baseReps: "20-15",
        baseSets: "2-3",
        note: "Start in Week 2.",
      },
      {
        id: "mon-4",
        name: "Standing calf",
        baseReps: "20-15",
        baseSets: "2-3",
        note: "Start in Week 1.",
      },
      {
        id: "mon-5",
        name: "Seated calf",
        baseReps: "20-15",
        baseSets: "2-3",
        note: "Start in Week 2.",
      },
      {
        id: "mon-6",
        name: "Leg curl",
        baseReps: "20-15",
        baseSets: "2-3",
        note: null,
      },
      {
        id: "mon-7",
        name: "Lower body stretch",
        baseReps: "N/A",
        baseSets: "1",
        note: "Hold each stretch for 30s.",
      },
    ],
  },
  Tuesday: {
    dayName: "Upper Body",
    exercises: [
      {
        id: "tue-1",
        name: "Lats pull down",
        baseReps: "20-15",
        baseSets: "2-3",
        note: "Start in Week 1.",
      },
      {
        id: "tue-2",
        name: "Supported Low row / Seated row M/C",
        baseReps: "20-15",
        baseSets: "2-3",
        note: "Use M/C in Week 2.",
      },
      {
        id: "tue-3",
        name: "Shrugs DB",
        baseReps: "20-15",
        baseSets: "2-3",
        note: null,
      },
      {
        id: "tue-4",
        name: "Flat DB Press",
        baseReps: "20-15",
        baseSets: "2-3",
        note: null,
      },
      {
        id: "tue-5",
        name: "Incline DB Press",
        baseReps: "20-15",
        baseSets: "2-3",
        note: "Start in Week 1.",
      },
      {
        id: "tue-6",
        name: "Incline M/C Press (optional)",
        baseReps: "20-15",
        baseSets: "2-3",
        note: "Start in Week 2.",
      },
      {
        id: "tue-7",
        name: "Overhead press DB",
        baseReps: "20-15",
        baseSets: "2-3",
        note: null,
      },
      {
        id: "tue-8",
        name: "External rotation DB",
        baseReps: "20-15",
        baseSets: "2-3",
        note: null,
      },
      {
        id: "tue-9",
        name: "Superman / Back extension",
        baseReps: "20-15",
        baseSets: "2-3",
        note: "Start Back extension after 15 days.",
      },
      {
        id: "tue-10",
        name: "Supination DB curl",
        baseReps: "20-15",
        baseSets: "2-3",
        note: "Start in Week 1.",
      },
      {
        id: "tue-11",
        name: "Biceps curl",
        baseReps: "20-15",
        baseSets: "2-3",
        note: "Start in Week 2.",
      },
      {
        id: "tue-12",
        name: "Triceps push down cable",
        baseReps: "20-15",
        baseSets: "2-3",
        note: null,
      },
      {
        id: "tue-13",
        name: "Forearm Gorilla Gripper",
        baseReps: "20-15",
        baseSets: "2-3",
        note: null,
      },
      {
        id: "tue-14",
        name: "Upper body stretch",
        baseReps: "N/A",
        baseSets: "1",
        note: "Hold each stretch for 30s.",
      },
    ],
  },
  Wednesday: {
    dayName: "Cardio & Abs",
    exercises: [
      {
        id: "wed-1",
        name: "Sit up (on floor)",
        baseReps: "20-15",
        baseSets: "2-3",
        note: null,
      },
      {
        id: "wed-2",
        name: "Side crunch",
        baseReps: "20-15",
        baseSets: "2-3",
        note: null,
      },
      {
        id: "wed-3",
        name: "Leg raise",
        baseReps: "20-15",
        baseSets: "2-3",
        note: null,
      },
      {
        id: "wed-4",
        name: "Russian twists (legs on floor) / Side bend DB",
        baseReps: "20-15",
        baseSets: "2-3",
        note: null,
      },
      {
        id: "wed-5",
        name: "Plank",
        baseReps: "30-60s",
        baseSets: "2-3",
        note: null,
      },
      {
        id: "wed-6",
        name: "Stretching",
        baseReps: "N/A",
        baseSets: "1",
        note: null,
      },
    ],
  },
  Thursday: "Monday",
  Friday: "Tuesday",
  Saturday: "Wednesday",
  Sunday: {
    dayName: "Rest Day",
    exercises: [],
  },
};

const MotionCard = motion(Card);

export default function HomePage() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const profileData =
      typeof window !== "undefined"
        ? localStorage.getItem("gymUserProfile")
        : null;

    const frame = requestAnimationFrame(() => {
      if (cancelled) return;
      if (profileData) {
        setUserProfile(JSON.parse(profileData));
      }
      setIsLoading(false);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!userProfile) {
    return (
      <OnboardingFlow
        onComplete={(profile) => {
          localStorage.setItem("gymUserProfile", JSON.stringify(profile));
          setUserProfile(profile);
        }}
      />
    );
  }

  return <MainDashboard userProfile={userProfile} />;
}

function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <motion.span
          role="status"
          aria-label="Loading"
          className="size-12 rounded-full border-2 border-primary/30 border-t-primary"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, ease: "linear", duration: 1 }}
        />
        <p className="text-sm text-muted-foreground">Loading your plan…</p>
      </div>
    </div>
  );
}

function OnboardingFlow({
  onComplete,
}: {
  onComplete: (profile: UserProfile) => void;
}) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);

  const handleFinish = () => {
    if (!name.trim() || !startDate) return;
    onComplete({ name: name.trim(), joinDate: startDate.toISOString() });
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-background/80 px-4 py-10 text-foreground">
      <div className="mx-auto max-w-md">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-primary">
            Gym Rookie Mode
          </p>
          <h1 className="text-3xl font-semibold mt-2">
            Let&apos;s personalize your grind
          </h1>
        </motion.div>

        <Card className="bg-card/80 border-border/40 shadow-2xl backdrop-blur-xl">
          <CardContent className="p-6">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step-one"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-semibold">
                    Welcome! What&apos;s your name?
                  </h2>
                  <Input
                    autoFocus
                    placeholder="Type your name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <Button
                    className="w-full"
                    disabled={!name.trim()}
                    onClick={() => setStep(2)}
                  >
                    Next
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="step-two"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div>
                    <h2 className="text-2xl font-semibold">
                      When did you start this gym plan?
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      This helps us tailor your sets and reps.
                    </p>
                  </div>
                  <DatePickerField date={startDate} onSelect={setStartDate} />
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      className="flex-1"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>
                    <Button
                      className="flex-1"
                      disabled={!startDate}
                      onClick={handleFinish}
                    >
                      Finish Setup
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

function DatePickerField({
  date,
  onSelect,
}: {
  date?: Date;
  onSelect: (date: Date | undefined) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-between text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          {date ? format(date, "PPP") : "Select your start date"}
          <CalendarIcon className="size-4 opacity-70" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onSelect}
          initialFocus
          disabled={{ after: new Date() }}
        />
      </PopoverContent>
    </Popover>
  );
}

function MainDashboard({ userProfile }: { userProfile: UserProfile }) {
  const now = new Date();
  const todayKey = now.toLocaleDateString("en-US", { weekday: "long" });
  const joinDate = new Date(userProfile.joinDate);
  const weeksElapsed = Math.max(0, differenceInDays(now, joinDate) / 7);

  const todaysWorkout = workoutPlan[todayKey] ?? workoutPlan.Monday;
  const resolvedWorkout: WorkoutDay =
    typeof todaysWorkout === "string"
      ? (workoutPlan[todaysWorkout] as WorkoutDay)
      : (todaysWorkout as WorkoutDay);

  const greeting = (() => {
    const hour = now.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  })();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex max-w-lg flex-col gap-6 px-4 pb-16 pt-10">
        <Card className="border border-border/60 bg-card/80 backdrop-blur-xl">
          <CardContent className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">
                {greeting}, {userProfile.name}!
              </h2>
              <p className="text-sm text-muted-foreground">
                Ready to crush it?
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Week {Math.max(1, Math.floor(weeksElapsed) + 1)} • Started{" "}
                {format(joinDate, "MMM d, yyyy")}
              </p>
            </div>
            <Avatar className="size-16 bg-primary/10">
              <AvatarFallback className="flex size-full flex-col items-center justify-center gap-1 rounded-full bg-primary/10 text-primary">
                <Flame className="size-6" />
                <span className="text-[0.65rem] font-bold uppercase tracking-wide">
                  1 Day
                </span>
              </AvatarFallback>
            </Avatar>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-semibold">
                Today&apos;s Plan: {resolvedWorkout.dayName}
              </h3>
              <p className="text-sm text-muted-foreground">{todayKey}</p>
            </div>
            <span className="rounded-full border border-border/70 px-3 py-1 text-xs uppercase tracking-wide text-muted-foreground">
              {weeksElapsed < 1
                ? "Beginner"
                : weeksElapsed < 3
                ? "Level Up"
                : "Beast Mode"}
            </span>
          </div>

          {resolvedWorkout.exercises.length === 0 ? (
            <Card className="border-dashed border-primary/40 bg-card/60">
              <CardContent className="py-10 text-center">
                <p className="text-xl font-semibold">Rest & Recover</p>
                <p className="text-sm text-muted-foreground">
                  It&apos;s your Rest Day. Breathe, stretch, hydrate.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {resolvedWorkout.exercises.map((exercise, index) => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  weeksElapsed={weeksElapsed}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ExerciseCard({
  exercise,
  weeksElapsed,
  index,
}: {
  exercise: Exercise;
  weeksElapsed: number;
  index: number;
}) {
  const isBeginner = weeksElapsed < 1;

  const resolveRangeValue = (range: string) => {
    if (range === "N/A") return range;
    const parts = range.split("-").map((part) => part.trim());
    if (parts.length === 1) return parts[0];
    return isBeginner ? parts[0] : parts[1] || parts[0];
  };

  const sets = resolveRangeValue(exercise.baseSets);
  const reps = resolveRangeValue(exercise.baseReps);

  return (
    <MotionCard
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="border-border/40 bg-card/70"
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-foreground">
          {exercise.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between gap-4 pb-4">
        <StatBlock label="Sets" value={sets} />
        <StatBlock label="Reps" value={reps} />
      </CardContent>
      {exercise.note ? (
        <CardFooter>
          <p className="text-xs text-muted-foreground">{exercise.note}</p>
        </CardFooter>
      ) : null}
    </MotionCard>
  );
}

function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex-1 rounded-2xl border border-border/30 bg-background/40 px-4 py-3 text-center">
      <p className="text-3xl font-bold text-primary">{value}</p>
      <p className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
    </div>
  );
}
