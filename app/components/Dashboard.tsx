import { ChangeEvent, useEffect, useState, useMemo } from "react";
import { differenceInDays, format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import {
  Loader2,
  X,
  Sparkles,
  Image as ImageIcon,
  Video,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";

import type { WorkoutPlan } from "@/app/lib/data";
import { DashboardHeader } from "@/app/components/DashboardHeader";
import { StatsGrid } from "@/app/components/StatsGrid";
import { WorkoutList } from "@/app/components/WorkoutList";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import Image from "next/image";

interface DashboardProps {
  name: string;
  joinDate: string;
  workoutPlan: WorkoutPlan;
  completedExercises: string[];
  skippedExercises: string[];
  toggleComplete: (exerciseId: string) => void;
  toggleSkip: (exerciseId: string) => void;
  onUpdateSettings: (payload: {
    name?: string;
    plan?: WorkoutPlan;
    preserveProgress?: boolean;
  }) => void;
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
  skippedExercises,
  toggleComplete,
  toggleSkip,
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
        ((completedExercises.filter((id) =>
          exercisesToday.some((ex) => ex.id === id),
        ).length +
          skippedExercises.filter((id) =>
            exercisesToday.some((ex) => ex.id === id),
          ).length) /
          exercisesToday.length) *
          100,
      )
    : 0;
  const streakDays = Math.max(
    1,
    differenceInDays(new Date(), new Date(joinDate)) + 1,
  );
  const workoutsThisWeek = Object.values(workoutPlan.schedule).filter(
    (value) => value !== "Rest Day",
  ).length;

  const nextRestDay =
    Object.entries(workoutPlan.schedule).find(
      ([, value]) => value === "Rest Day",
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
    () => ({ ...defaultPlanUploadState }),
  );
  const [dayDrawerOpen, setDayDrawerOpen] = useState(false);
  const [activeDay, setActiveDay] = useState<string | null>(null);

  // Add Exercise State
  const [isAddExerciseOpen, setAddExerciseOpen] = useState(false);
  const [editingExerciseId, setEditingExerciseId] = useState<string | null>(
    null,
  );
  const [newExName, setNewExName] = useState("");
  const [newExCategory, setNewExCategory] = useState("Auto (AI Powered)");
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [newExImage, setNewExImage] = useState("");
  const [newExVideo, setNewExVideo] = useState("");

  // Load existing categories for the dropdown
  const allCategories = useMemo(() => {
    const cats = new Set<string>();
    Object.values(workoutPlan.workouts).forEach((day) => {
      day.forEach((ex) => cats.add(ex.category));
    });
    return Array.from(cats).sort();
  }, [workoutPlan]);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [addExerciseError, setAddExerciseError] = useState<string | null>(null);
  const [aiDetails, setAiDetails] = useState<{
    category?: string;
    note?: string;
    tips?: string[];
    impact?: string[];
  } | null>(null);

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

  // Preload today's images/gifs for instant rendering
  useEffect(() => {
    if (typeof window !== "undefined" && exercisesToday.length > 0) {
      exercisesToday.forEach((ex) => {
        ex.image?.forEach((url) => {
          const img = new window.Image();
          img.src = url;
        });
      });
    }
  }, [exercisesToday]);

  const drawerFocus = activeDay
    ? (workoutPlan.schedule[activeDay] ?? "Rest Day")
    : null;
  const drawerExercises = drawerFocus
    ? (workoutPlan.workouts[drawerFocus] ?? [])
    : [];

  const openDayDrawer = (day: string) => {
    setActiveDay(day);
    setDayDrawerOpen(true);
  };

  const closeDayDrawer = () => {
    setDayDrawerOpen(false);
  };

  const openEditExercise = (exercise: WorkoutExercise) => {
    setEditingExerciseId(exercise.id);
    setNewExName(exercise.name);
    setNewExCategory(exercise.category);
    setNewExImage(exercise.image?.[0] || "");
    setNewExVideo(exercise.video?.[0] || "");
    setAddExerciseError(null);
    setAddExerciseOpen(true);
  };

  const handleRemoveExercise = (exerciseId: string) => {
    const currentWorkouts = workoutPlan.workouts[focus] || [];
    const updatedWorkouts = currentWorkouts.filter(
      (ex) => ex.id !== exerciseId,
    );

    const updatedPlan = {
      ...workoutPlan,
      planName:
        workoutPlan.planName === "Custom Protocol"
          ? "Custom Protocol (Modified)"
          : workoutPlan.planName,
      workouts: {
        ...workoutPlan.workouts,
        [focus]: updatedWorkouts,
      },
    };

    if (completedExercises.includes(exerciseId)) {
      toggleComplete(exerciseId);
    }

    onUpdateSettings({ plan: updatedPlan, preserveProgress: true });
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

  const generateAIExerciseDetails = async (exerciseName: string) => {
    // gather existing categories
    const categories = new Set<string>();
    Object.values(workoutPlan.workouts).forEach((day) => {
      day.forEach((ex) => categories.add(ex.category));
    });

    try {
      const res = await fetch("/api/generate-exercise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: exerciseName,
          categories: Array.from(categories),
        }),
      });
      const data = await res.json();
      return data;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const convertToEmbed = (url: string) => {
    if (!url) return undefined;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }
    return url;
  };

  const handleAddExercise = async () => {
    const trimmedName = newExName.trim();
    if (!trimmedName) return;

    const currentWorkouts = workoutPlan.workouts[focus] || [];
    const isDuplicate = currentWorkouts.some(
      (ex) =>
        ex.id !== editingExerciseId &&
        ex.name.toLowerCase() === trimmedName.toLowerCase(),
    );

    if (isDuplicate) {
      setAddExerciseError(`"${trimmedName}" is already in this workout!`);
      return;
    }

    setAddExerciseError(null);
    setIsGeneratingAI(true);

    const existingEx = editingExerciseId
      ? currentWorkouts.find((ex) => ex.id === editingExerciseId)
      : null;

    let details = aiDetails;
    const nameChanged =
      !existingEx ||
      existingEx.name.trim().toLowerCase() !== trimmedName.toLowerCase();
    if (!details && nameChanged) {
      details = await generateAIExerciseDetails(trimmedName);
    }

    if (details === null) {
      setIsGeneratingAI(false);
      setAddExerciseError(
        "🤖 AI is taking a nap or unavailable right now. Try adding your exercise manually by selecting 'Custom' category.",
      );
      return;
    }

    if (details?.error) {
      setIsGeneratingAI(false);
      setAddExerciseError(
        details.error !== "not_an_exercise"
          ? details.error
          : `Hmm, "${trimmedName}" doesn't sound like a real gym exercise.`,
      );
      return;
    }

    // Fallbacks if AI fails or was skipped
    const finalCategory =
      newExCategory !== "Auto (AI Powered)" && newExCategory.trim() !== ""
        ? newExCategory.trim()
        : details?.category || "Custom";
    const finalNote = details?.note || "Custom exercise added by you.";
    const finalTips = details?.tips || [];
    const finalImpact = details?.impact || [];

    const finalVideo = convertToEmbed(newExVideo);

    const newEx: WorkoutExercise = existingEx
      ? {
          ...existingEx,
          name: trimmedName,
          reps: details?.reps || existingEx.reps || "8-12",
          sets: details?.sets || existingEx.sets || "3 sets",
          category: details?.category || existingEx.category || "Custom",
          note:
            details?.note || existingEx.note || "Custom exercise added by you.",
          tips: details?.tips || existingEx.tips || [],
          impact: details?.impact || existingEx.impact || [],
          image: newExImage ? [newExImage] : undefined,
          video: finalVideo ? [finalVideo] : undefined,
        }
      : {
          id: `custom-${Date.now()}`,
          name: trimmedName,
          reps: details?.reps || "8-12",
          sets: details?.sets || "3 sets",
          category: finalCategory,
          note: finalNote,
          tips: finalTips,
          impact: finalImpact,
          image: newExImage ? [newExImage] : undefined,
          video: finalVideo ? [finalVideo] : undefined,
        };

    const updatedPlan = {
      ...workoutPlan,
      planName:
        workoutPlan.planName === "Custom Protocol"
          ? "Custom Protocol (Modified)"
          : workoutPlan.planName,
      workouts: {
        ...workoutPlan.workouts,
        [focus]: editingExerciseId
          ? currentWorkouts.map((ex) =>
              ex.id === editingExerciseId ? newEx : ex,
            )
          : [...currentWorkouts, newEx],
      },
    };

    onUpdateSettings({ plan: updatedPlan, preserveProgress: true });

    // Reset state & close
    setNewExName("");
    setNewExCategory("Auto (AI Powered)");
    setNewExImage("");
    setNewExVideo("");
    setAiDetails(null);
    setIsGeneratingAI(false);
    setAddExerciseError(null);
    setAddExerciseOpen(false);
    setEditingExerciseId(null);
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
          onOpenAddExercise={() => {
            setEditingExerciseId(null);
            setNewExName("");
            setNewExCategory("Auto (AI Powered)");
            setNewExImage("");
            setNewExVideo("");
            setAddExerciseError(null);
            setAddExerciseOpen(true);
          }}
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
                  exercisesToday.some((ex) => ex.id === id),
                ).length +
                skippedExercises.filter((id) =>
                  exercisesToday.some((ex) => ex.id === id),
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
                  skippedIds={skippedExercises}
                  dayLabel={todayLabel}
                  onToggle={toggleComplete}
                  onSkipToggle={toggleSkip}
                  onRemove={handleRemoveExercise}
                  onEdit={openEditExercise}
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
          className="space-y-3 rounded-3xl border border-border/60 bg-white px-4 py-6 shadow-lg shadow-black/5 backdrop-blur"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
            {format(new Date(), "MMM d, yyyy")}
          </p>

          <h3 className="text-2xl font-semibold text-foreground">
            {todayLabel}&apos;s checklist ✅
          </h3>
          <Image
            src="frog.gif"
            alt="Today's checklist"
            width={100}
            height={100}
            className="mx-auto block rounded-lg object-contain"
          />

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

      <AnimatePresence>
        {isAddExerciseOpen && (
          <motion.div
            key="add-exercise-drawer"
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setAddExerciseOpen(false);
                setEditingExerciseId(null);
              }}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="relative z-10 w-full sm:max-w-md max-h-[90vh] rounded-[32px] sm:rounded-3xl border-[3px] border-border bg-white px-6 py-8 shadow-[0_20px_60px_rgba(0,0,0,0.15)] flex flex-col"
            >
              <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-border sm:hidden" />

              <div className="flex items-start justify-between gap-4 mb-6 relative z-10">
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 mb-2">
                    <Sparkles className="size-3 text-primary" />
                    <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-primary font-bold">
                      AI Powered
                    </p>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
                    {editingExerciseId ? "Edit Move" : "New Move"}
                  </h3>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full border-2 border-border/60 hover:bg-neutral-100 transition-transform active:scale-95"
                  onClick={() => {
                    setAddExerciseOpen(false);
                    setEditingExerciseId(null);
                  }}
                >
                  <X className="size-5 stroke-[3]" />
                </Button>
              </div>

              <div className="space-y-5 overflow-y-auto pr-2 pb-4 scrollbar-hide relative z-10">
                <AnimatePresence>
                  {addExerciseError && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, rotate: -2, y: -10 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, rotate: 2, y: -10 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                        mass: 2,
                      }}
                      className="overflow-hidden mb-4"
                    >
                      <div className="text-white text-base font-black bg-[#FF5555] border-[3px] border-black p-4 rounded-xl shadow-[4px_4px_0px_0px_#000] flex items-center gap-3">
                        <motion.div
                          animate={{ rotate: [-10, 10, -10] }}
                          transition={{ repeat: Infinity, duration: 0.5 }}
                        >
                          <AlertTriangle className="size-6 shrink-0 text-black fill-[#FFEDA6] stroke-black" />
                        </motion.div>
                        <p className="leading-tight">{addExerciseError}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase tracking-wider text-muted-foreground block">
                    Exercise Name*
                  </label>
                  <Input
                    value={newExName}
                    onChange={(e) => setNewExName(e.target.value)}
                    placeholder="e.g. Bulgarian Split Squat"
                    className="border-[3px] border-border bg-white shadow-[3px_3px_0px_0px_var(--border)] focus:translate-y-0.5 focus:shadow-[1px_1px_0px_0px_var(--border)] h-12 text-lg font-bold placeholder:font-medium placeholder:text-muted-foreground transition-all"
                    autoFocus
                  />
                </div>

                <div className="space-y-1.5 pt-2">
                  <label className="text-xs font-black uppercase tracking-wider text-muted-foreground block">
                    Category (Optional)
                  </label>
                  <div className="relative">
                    <select
                      value={
                        allCategories.includes(newExCategory) ||
                        newExCategory === "Auto (AI Powered)"
                          ? newExCategory
                          : "Custom"
                      }
                      onChange={(e) => {
                        const val = e.target.value;
                        setNewExCategory(val === "Custom" ? "" : val);
                      }}
                      className="w-full appearance-none rounded-xl border-[3px] border-border bg-white shadow-[3px_3px_0px_0px_var(--border)] focus:translate-y-0.5 focus:shadow-[1px_1px_0px_0px_var(--border)] h-12 px-3 text-sm font-bold transition-all outline-none cursor-pointer"
                    >
                      <option value="Auto (AI Powered)">
                        ✨ Auto (AI Powered)
                      </option>
                      {allCategories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                      <option value="Custom">Other / Custom...</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <ChevronRight className="size-5 stroke-[3] text-black rotate-90" />
                    </div>
                  </div>
                  {!allCategories.includes(newExCategory) &&
                    newExCategory !== "Auto (AI Powered)" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="pt-2"
                      >
                        <Input
                          value={newExCategory}
                          onChange={(e) => setNewExCategory(e.target.value)}
                          placeholder="Type new category name..."
                          className="border-[3px] border-border bg-white shadow-[3px_3px_0px_0px_var(--border)] h-11 text-sm font-bold transition-all mt-1"
                        />
                      </motion.div>
                    )}
                  <Input
                    value={newExImage}
                    onChange={(e) => setNewExImage(e.target.value)}
                    placeholder="Paste image/gif URL..."
                    className="border-[3px] border-border bg-secondary/5 focus:bg-white h-11 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <Video className="size-3.5" /> Optional Video
                  </label>
                  <Input
                    value={newExVideo}
                    onChange={(e) => setNewExVideo(e.target.value)}
                    placeholder="Paste YouTube link..."
                    className="border-[3px] border-border bg-secondary/5 focus:bg-white h-11 transition-colors"
                  />
                </div>

                <div className="pt-6 relative">
                  <Button
                    className="group w-full border-[3px] border-primary bg-primary text-primary-foreground hover:bg-primary hover:brightness-110 shadow-[4px_4px_0_var(--border)] transition-all active:translate-y-[4px] active:shadow-none h-14 text-base font-black uppercase tracking-wide overflow-hidden"
                    onClick={handleAddExercise}
                    disabled={!newExName || isGeneratingAI}
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                    {isGeneratingAI ? (
                      <span className="flex items-center justify-center gap-2 relative z-10 w-full animate-pulse">
                        <Loader2 className="size-5 animate-spin" />
                        Analyzing & Linking...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2 relative z-10 w-full">
                        {editingExerciseId
                          ? "Save Changes"
                          : "Add to Today's Plan"}
                        <ChevronRight className="size-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </Button>
                  <p className="text-[10px] font-bold text-center mt-3 text-muted-foreground uppercase tracking-widest">
                    AI Auto-fills form notes & target muscles
                  </p>
                </div>
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
