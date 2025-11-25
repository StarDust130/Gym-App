import { ChangeEvent, useEffect, useState } from "react";
import { differenceInDays, format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import {  Loader2, X } from "lucide-react";

import type { WorkoutPlan } from "@/app/lib/data";
import { DashboardHeader } from "@/app/components/DashboardHeader";
import { StatsGrid } from "@/app/components/StatsGrid";
import { WorkoutList } from "@/app/components/WorkoutList";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface DashboardProps {
  name: string;
  joinDate: string;
  workoutPlan: WorkoutPlan;
  completedExercises: string[];
  toggleComplete: (exerciseId: string) => void;
  onUpdateSettings: (payload: { name?: string; plan?: WorkoutPlan }) => void;
}

type PlanUploadState = {
  status: "idle" | "uploading" | "success" | "error";
  title: string;
  helper: string;
};

const defaultPlanUploadState: PlanUploadState = {
  status: "idle",
  title: "Drop or tap to upload",
  helper: "Share a clear photo of your schedule",
};

export function Dashboard({
  name,
  joinDate,
  workoutPlan,
  completedExercises,
  toggleComplete,
  onUpdateSettings,
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

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [savingName, setSavingName] = useState(false);
  const [nameFeedback, setNameFeedback] = useState("");
  const [planUploadState, setPlanUploadState] = useState<PlanUploadState>(
    () => ({ ...defaultPlanUploadState })
  );
  const [dayDrawerOpen, setDayDrawerOpen] = useState(false);
  const [activeDay, setActiveDay] = useState<string | null>(null);

  useEffect(() => {
    setEditedName(name);
  }, [name]);

  useEffect(() => {
    setNameFeedback("");
  }, [editedName]);

  useEffect(() => {
    if (!settingsOpen) {
      setPlanUploadState({ ...defaultPlanUploadState });
      setEditedName(name);
    }
  }, [settingsOpen, name]);

  const drawerFocus = activeDay
    ? workoutPlan.schedule[activeDay] ?? "Rest Day"
    : null;
  const drawerExercises = drawerFocus
    ? workoutPlan.workouts[drawerFocus] ?? []
    : [];

  const openDayDrawer = (day: string) => {
    setActiveDay(day);
    setDayDrawerOpen(true);
  };

  const closeDayDrawer = () => {
    setDayDrawerOpen(false);
  };

  const handleSaveName = () => {
    const trimmed = editedName.trim();
    if (!trimmed || trimmed === name.trim()) return;
    setSavingName(true);
    onUpdateSettings({ name: trimmed });
    setSavingName(false);
    setNameFeedback("Name updated");
    setTimeout(() => setNameFeedback(""), 2400);
  };

  const handlePlanUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const inputElement = event.target;
    if (!file) return;

    if (file.type === "application/pdf") {
      setPlanUploadState({
        status: "error",
        title: "PDF not supported",
        helper: "Take a screenshot or photo of the plan",
      });
      inputElement.value = "";
      return;
    }

    setPlanUploadState({
      status: "uploading",
      title: "Processing your plan...",
      helper: file.name,
    });

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64 = reader.result as string;
        const res = await fetch("/api/parse-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64 }),
        });

        const json = await res.json();

        if (!json.ok) {
          setPlanUploadState({
            status: "error",
            title: "Didn’t detect workouts",
            helper: "Upload a clearer photo",
          });
          return;
        }

        onUpdateSettings({ plan: json.data });
        setPlanUploadState({
          status: "success",
          title: "Plan refreshed",
          helper: "We updated your schedule",
        });
      } catch {
        setPlanUploadState({
          status: "error",
          title: "Upload failed",
          helper: "Please try again",
        });
      } finally {
        inputElement.value = "";
      }
    };

    reader.readAsDataURL(file);
  };

  const isNameDirty = editedName.trim() && editedName.trim() !== name.trim();

  return (
    <div
      className="min-h-screen bg-transparent text-foreground"
      suppressHydrationWarning
    >
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
          onOpenSettings={() => setSettingsOpen(true)}
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
              workoutsThisWeek={workoutsThisWeek}
              nextRestDay={nextRestDay}
              todayExercisesDone={
                completedExercises.filter((id) =>
                  exercisesToday.some((ex) => ex.id === id)
                ).length
              }
              todayExercisesTotal={exercisesToday.length}
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
                        onClick={() => openDayDrawer(day)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            openDayDrawer(day);
                          }
                        }}
                        role="button"
                        tabIndex={0}
                        className={`flex items-center justify-between rounded-2xl border px-4 py-3 shadow-md transition ${
                          isToday
                            ? "border-primary bg-linear-to-r from-primary/20 to-primary/10 shadow-primary/20 ring-2 ring-primary/30"
                            : "border-border bg-white"
                        }`}
                      >
                        <div>
                          <p
                            className={`text-sm font-semibold ${
                              isToday ? "text-primary" : ""
                            }`}
                          >
                            {day}
                          </p>
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

      <AnimatePresence>
        {settingsOpen && (
          <motion.div
            key="settings-panel"
            className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSettingsOpen(false)}
            />

            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              className="relative z-10 w-full max-w-lg rounded-t-3xl border border-border/60 bg-white px-5 py-6 shadow-[0_30px_70px_rgba(0,0,0,0.25)] sm:rounded-3xl sm:px-8 sm:py-8"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
                    Settings
                  </p>
                  <h3 className="text-2xl font-semibold text-foreground">
                    Keep your plan fresh
                  </h3>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full border border-border/60"
                  onClick={() => setSettingsOpen(false)}
                  aria-label="Close settings"
                >
                  <X className="size-4" />
                </Button>
              </div>

              <div className="mt-6 space-y-5">
                <div className="space-y-4 rounded-3xl border border-border/70 bg-secondary/20 p-4 shadow-[4px_4px_0_var(--border)] sm:p-6">
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Display name
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Tell us what to call you across the dashboard.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Input
                      value={editedName}
                      onChange={(event) => setEditedName(event.target.value)}
                      placeholder="Enter a new name"
                      className="border-2 border-border bg-white"
                    />
                    <Button
                      className="sm:w-28"
                      disabled={!isNameDirty || savingName}
                      onClick={handleSaveName}
                    >
                      {savingName ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        "Save"
                      )}
                    </Button>
                  </div>
                  {nameFeedback && (
                    <p className="text-xs font-semibold text-emerald-600">
                      {nameFeedback}
                    </p>
                  )}
                </div>

                <Image
                  // src="https://pa1.aminoapps.com/5715/52f102e550dbcbdba83dbb8ba571082e3629ae89_hq.gif"
                  src="/anime-dance-gif-1.gif"
                  alt="Anime girl dancing energetically"
                  width={500}
                  height={300}
                  className="rounded-2xl border border-border/70 shadow-[4px_4px_0_var(--border)]"
                />
              </div>

              <div className="mt-6 flex items-center justify-end">
                <Button
                  variant="ghost"
                  className="border border-border bg-white shadow-[4px_4px_0_var(--border)]"
                  onClick={() => setSettingsOpen(false)}
                >
                  Done
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {dayDrawerOpen && activeDay && (
          <motion.div
            key="week-drawer"
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDayDrawer}
            />
            <motion.div
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              onDragEnd={(event, info) => {
                if (info.offset.y > 120) {
                  closeDayDrawer();
                }
              }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="absolute inset-x-0 bottom-0 max-h-[90vh] rounded-t-3xl border-2 border-border bg-white p-6 shadow-[0_25px_60px_rgba(0,0,0,0.25)]"
            >
              <div className="mx-auto mb-4 h-1.5 w-16 rounded-full bg-muted" />
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
                  Full plan for this day. 💪
                </p>
                <h3 className="text-xl font-semibold text-foreground">
                  {activeDay} – {drawerFocus}
                </h3>
              </div>
              <div className="mt-5 max-h-[70vh] space-y-3 overflow-y-auto pr-1">
                {drawerExercises.length === 0 ? (
                  <div className="rounded-2xl border-2 border-dashed border-border bg-secondary/30 px-4 py-6 text-center text-sm font-semibold text-muted-foreground">
                    Rest day energy. Light walks, deep breaths.
                  </div>
                ) : (
                  drawerExercises.map((exercise) => (
                    <div
                      key={exercise.id}
                      className="rounded-2xl border-2 border-border bg-white px-4 py-3 shadow-[3px_3px_0_var(--border)]"
                    >
                      <p className="text-sm font-semibold text-foreground">
                        {exercise.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {exercise.sets} sets · {exercise.reps} reps
                      </p>
                    </div>
                  ))
                )}
              </div>
              <div className="mt-4 flex justify-center">
                <Button
                  variant="ghost"
                  onClick={closeDayDrawer}
                  className="rounded-full border border-border px-6"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function buildGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning 🔥";
  if (hour < 18) return "Good afternoon 🔥";
  return "Good evening 🔥";
}
