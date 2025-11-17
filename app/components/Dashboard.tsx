import { differenceInDays, format } from "date-fns";
import { motion } from "framer-motion";

import type { WorkoutPlan } from "@/app/lib/data";
import { DashboardHeader } from "@/app/components/DashboardHeader";
import { StatsGrid } from "@/app/components/StatsGrid";
import { WorkoutList } from "@/app/components/WorkoutList";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DashboardProps {
  name: string;
  joinDate: string;
  workoutPlan: WorkoutPlan;
  completedExercises: string[];
  toggleComplete: (exerciseId: string) => void;
}

export function Dashboard({
  name,
  joinDate,
  workoutPlan,
  completedExercises,
  toggleComplete,
}: DashboardProps) {
  const today = new Date();
  const todayLabel = today.toLocaleDateString("en-US", { weekday: "long" });
  const focus =
    workoutPlan.schedule[todayLabel] ?? Object.values(workoutPlan.schedule)[0];
  const exercisesToday = workoutPlan.workouts[focus] ?? [];
  const progressPercent = exercisesToday.length
    ? Math.min(
        100,
        (completedExercises.filter((id) =>
          exercisesToday.some((ex) => ex.id === id)
        ).length /
          exercisesToday.length) *
          100
      )
    : 0;
  const streakDays = Math.max(
    1,
    differenceInDays(new Date(), new Date(joinDate)) + 1
  );
  const workoutsThisWeek = Object.values(workoutPlan.schedule).filter(
    (value) => value !== "Rest Day"
  ).length;

  const nextRestDay =
    Object.entries(workoutPlan.schedule).find(
      ([, value]) => value === "Rest Day"
    )?.[0] ?? "Rest Day";
  const friendlyDate = format(today, "MMM d, yyyy");
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];


  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <motion.main
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 pb-24 pt-8 sm:px-6 lg:px-8"
      >
        <DashboardHeader
          name={name}
          greeting={buildGreeting()}
          streakDays={streakDays}
          todayLabel={todayLabel}
          dateDisplay={friendlyDate}
          focus={focus}
          planName={workoutPlan.planName}
        />

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="space-y-6"
        >
          {todayLabel !== "Sunday" && (
            <StatsGrid
              focus={focus}
              progressPercent={progressPercent}
              streakDays={streakDays}
              workoutsThisWeek={workoutsThisWeek}
              nextRestDay={nextRestDay}
            />
          )}

          <Tabs defaultValue="today" className="space-y-4">
            <TabsList className="flex w-full justify-start gap-2 rounded-full bg-secondary/30 p-1 sm:w-fit">
              <TabsTrigger
          value="today"
          className="flex-1 rounded-full px-4 py-1 text-sm sm:flex-none"
              >
          Today
              </TabsTrigger>
              <TabsTrigger
          value="week"
          className="flex-1 rounded-full px-4 py-1 text-sm sm:flex-none"
              >
          Week
              </TabsTrigger>
            </TabsList>

            <TabsContent value="today" className="mt-0">
              <motion.div
          key="today"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
              >
          <WorkoutList
            exercises={exercisesToday}
            completedIds={completedExercises}
            dayLabel={todayLabel}
            onToggle={toggleComplete}
          />
              </motion.div>
            </TabsContent>

            <TabsContent value="week" className="mt-0">
              <motion.div
              key="week"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-4 rounded-2xl bg-secondary/20 p-4"
              >
              <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
              Week glance
              </p>
              <h4 className="text-lg font-semibold text-foreground">
              Stay in rhythm
              </h4>
              </div>
              <div className="space-y-3">
              {weekDays.map((day) => {
              const block = workoutPlan.schedule[day] ?? "Rest Day";
              const isToday = day === todayLabel;
              return (
              <motion.div
              key={day}
              whileHover={{ y: -2 }}
              className={`flex items-center justify-between rounded-2xl border px-4 py-3 shadow-md ${
              isToday
          ? "border-primary bg-linear-to-r from-primary/20 to-primary/10 shadow-primary/20 ring-2 ring-primary/30"
          : "border-border bg-white"
              }`}
              >
              <div>
              <p className={`text-sm font-semibold ${isToday ? "text-primary" : ""}`}>{day}</p>
              <p className="text-xs text-muted-foreground">
              {isToday ? "Today 🔥" : ""}
              </p>
              </div>
              <span
              className={`rounded-full border border-border px-3 py-1 text-xs font-semibold ${
              block === "Rest Day" ? "bg-muted" : "bg-accent/40"
              }`}
              >
              {block}
              </span>
              </motion.div>
              );
              })}
              </div>
              <p className="rounded-2xl border border-border bg-white px-4 py-3 text-sm font-medium">
              Next deep rest:{" "}
              <span className="text-primary">{nextRestDay}</span>.
              </p>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="space-y-3 rounded-3xl border border-border/60 bg-white/60 px-4 py-6 shadow-lg shadow-black/5 backdrop-blur"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
            {format(new Date(), "MMM d, yyyy")}
          </p>
          <h3 className="text-2xl font-semibold text-foreground">
            {todayLabel}&apos;s checklist ✅
          </h3>
          <p className="text-sm text-muted-foreground">
            Tick items as you go. Everything lives here—no PDFs, no guessing.
          </p>
        </motion.section>
      </motion.main>
    </div>
  );
}

function buildGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning 🔥";
  if (hour < 18) return "Good afternoon 🔥";
  return "Good evening 🔥";
}

