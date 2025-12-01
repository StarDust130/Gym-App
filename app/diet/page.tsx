"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  Check,
  ChevronDown,
  ChevronUp,
  Droplets,
  Flame,
  Frown,
  Info,
  Loader2,
  Minus,
  Plus,
  Target,
  Trash2,
  Trophy,
  Utensils,
  Zap,
} from "lucide-react";

import { useWorkoutStore } from "@/app/lib/hooks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// --- CONSTANTS & CONFIG ---

const STORAGE_KEY = "gym-buddy-diet-user-v3";

const GOAL_OPTIONS = [
  {
    value: "weight_loss",
    label: "Weight Loss",
    blurb: "Deficit",
    theme: "bg-emerald-500",
    border: "border-emerald-600",
  },
  {
    value: "weight_gain",
    label: "Weight Gain",
    blurb: "Surplus",
    theme: "bg-blue-500",
    border: "border-blue-600",
  },
  {
    value: "muscle_gain",
    label: "Muscle Gain",
    blurb: "Build",
    theme: "bg-violet-500",
    border: "border-violet-600",
  },
  {
    value: "muscle_loss",
    label: "Muscle Cut",
    blurb: "Shred",
    theme: "bg-rose-500",
    border: "border-rose-600",
  },
] as const;

type ProfileGoal = (typeof GOAL_OPTIONS)[number]["value"];
type MealType = "breakfast" | "lunch" | "dinner" | "snack";

type Nutrients = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

type DietProfile = {
  goal: ProfileGoal;
  weightKg: number;
  heightCm: number;
  heightText: string;
  proteinTarget: number;
  waterTarget: number;
};

type MealEntry = {
  id: string;
  mealType: MealType;
  description: string;
  createdAt: string;
  notes?: string;
  nutrients: Nutrients;
  confidence?: "low" | "medium" | "high";
};

type AiHint = {
  tone: "info" | "success" | "warning" | "error";
  message: string;
  title?: string;
};

const MEAL_TYPES: { value: MealType; label: string }[] = [
  { value: "breakfast", label: "Breakfast" },
  { value: "lunch", label: "Lunch" },
  { value: "dinner", label: "Dinner" },
  { value: "snack", label: "Snack" },
];

const MEAL_FORM_DEFAULT = {
  mealType: "breakfast" as MealType,
  description: "",
};

const QUICK_ADDS = [
  { emoji: "☕", label: "Black Coffee" },
  { emoji: "🍌", label: "Banana" },
  { emoji: "🥤", label: "Protein Shake" },
  { emoji: "🥚", label: "2 Boiled Eggs" },
];

const HINT_TONE_CONFIG = {
  info: {
    Icon: Info,
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-800",
  },
  success: {
    Icon: Check,
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-800",
  },
  warning: {
    Icon: Info,
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-800",
  },
  error: {
    Icon: Frown,
    bg: "bg-rose-50",
    border: "border-rose-200",
    text: "text-rose-800",
  },
};

const GOAL_COPY: Record<
  ProfileGoal,
  {
    greeting: string;
    badge: string;
    title: string;
    message: (dateLabel: string, protein: number) => string;
    tips: string[];
  }
> = {
  weight_loss: {
    greeting: "Stay light",
    badge: "Cutting Phase",
    title: "Weight Loss",
    message: (dateLabel, protein) =>
      `Prioritize fiber today. Hit ${protein}g protein to stay full.`,
    tips: ["Drink water before meals", "Volume eating is key"],
  },
  weight_gain: {
    greeting: "Eat big",
    badge: "Bulking Phase",
    title: "Weight Gain",
    message: (dateLabel, protein) =>
      `Add healthy fats and keep ${protein}g protein consistent.`,
    tips: ["Liquid calories help", "Don't skip breakfast"],
  },
  muscle_gain: {
    greeting: "Build mode",
    badge: "Hypertrophy",
    title: "Muscle Gain",
    message: (dateLabel, protein) =>
      `Fuel the machine. Aim for ${protein}g protein today.`,
    tips: ["Carbs pre-workout", "Protein post-workout"],
  },
  muscle_loss: {
    greeting: "Get lean",
    badge: "Recomp",
    title: "Muscle Cut",
    message: (dateLabel, protein) =>
      `Keep protein high (${protein}g) to retain mass while cutting.`,
    tips: ["Sleep is crucial", "Keep lifting heavy"],
  },
};

// --- COMPONENTS ---

export default function DietPage() {
  const { userProfile } = useWorkoutStore();
  const [userKey, setUserKey] = useState<string | null>(null);
  const [profile, setProfile] = useState<DietProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // View State
  const [view, setView] = useState<"onboarding" | "dashboard">("dashboard");

  // Data State
  const [meals, setMeals] = useState<MealEntry[]>([]);
  const [waterIntake, setWaterIntake] = useState(0);
  const [proteinGoal, setProteinGoal] = useState(150);
  const [selectedDate, setSelectedDate] = useState<Date>(() =>
    startOfDay(new Date())
  );

  // Composer State
  const [mealForm, setMealForm] = useState(MEAL_FORM_DEFAULT);
  const [analyzing, setAnalyzing] = useState(false);
  const [aiHint, setAiHint] = useState<AiHint | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Computed
  const dateKey = useMemo(() => getDateKey(selectedDate), [selectedDate]);
  const isToday = useMemo(
    () => dateKey === getDateKey(startOfDay(new Date())),
    [dateKey]
  );
  const prettyDate = useMemo(() => formatDate(dateKey), [dateKey]);

  const macros = useMemo(
    () =>
      meals.reduce(
        (acc, m) => ({
          calories: acc.calories + (m.nutrients.calories || 0),
          protein: acc.protein + (m.nutrients.protein || 0),
          carbs: acc.carbs + (m.nutrients.carbs || 0),
          fat: acc.fat + (m.nutrients.fat || 0),
        }),
        { calories: 0, protein: 0, carbs: 0, fat: 0 }
      ),
    [meals]
  );

  const calorieGoal = useMemo(
    () => (profile ? estimateCalorieTarget(profile) : 2000),
    [profile]
  );
  const targets = useMemo(
    () => ({
      protein: proteinGoal,
      carbs: Math.round((calorieGoal * 0.4) / 4),
      fat: Math.round((calorieGoal * 0.25) / 9),
    }),
    [calorieGoal, proteinGoal]
  );

  // --- INIT & FETCH ---

  useEffect(() => {
    if (typeof window === "undefined") return;
    const key = ensureUserKey();
    setUserKey(key);
  }, []);

  useEffect(() => {
    if (!userKey) return;

    const init = async () => {
      setLoading(true);
      setError(null);
      try {
        const pRes = await fetch(`/api/diet-entry/profile?userKey=${userKey}`);
        const pData = await pRes.json();

        if (pData.profile) {
          setProfile(pData.profile);
          setProteinGoal(pData.profile.proteinTarget || 150);

          const mRes = await fetch(
            `/api/diet-entry?dateKey=${dateKey}&userKey=${userKey}`
          );
          const mData = await mRes.json();
          setMeals(Array.isArray(mData.meals) ? mData.meals : []);

          // Initialize water intake (simulated for demo as it's not in schema yet)
          setWaterIntake(0);

          setView("dashboard");
        } else {
          setView("onboarding");
        }
      } catch (e) {
        console.error("Init error", e);
        setError("Could not load your data. Check connection.");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [userKey, dateKey]);

  // --- ACTIONS ---

  const saveProfile = async (data: any) => {
    if (!userKey) return;
    setLoading(true);
    try {
      const proteinTarget = calcProteinTarget(data.weightKg, data.goal);
      const newProfile = { ...data, proteinTarget, waterTarget: 8 };

      await fetch("/api/diet-entry/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userKey, profile: newProfile }),
      });

      setProfile(newProfile);
      setProteinGoal(proteinTarget);
      setView("dashboard");
    } catch (e) {
      setError("Failed to save profile.");
    } finally {
      setLoading(false);
    }
  };

  const submitMeal = async () => {
    if (!mealForm.description.trim()) return;
    setAnalyzing(true);
    setAiHint(null);

    try {
      const res = await fetch("/api/diet-entry/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: mealForm.description,
          mealType: mealForm.mealType,
          goal: profile?.goal,
        }),
      });

      const data = await res.json();

      if (!data.ok || data.confidence === "low") {
        setAiHint({
          tone: "error",
          title: "Try Again",
          message: data.feedback || "That doesn't look like food.",
        });
        setAnalyzing(false);
        return;
      }

      const newMeal: MealEntry = {
        id: editingId || safeGenerateId(),
        mealType: mealForm.mealType,
        description: mealForm.description,
        createdAt: editingId
          ? meals.find((m) => m.id === editingId)?.createdAt ||
            new Date().toISOString()
          : new Date().toISOString(),
        notes: data.feedback,
        confidence: data.confidence,
        nutrients: {
          calories: Math.round(data.nutrients.calories || 0),
          protein: Math.round(data.nutrients.protein || 0),
          carbs: Math.round(data.nutrients.carbs || 0),
          fat: Math.round(data.nutrients.fat || 0),
        },
      };

      const updatedMeals = editingId
        ? meals.map((m) => (m.id === editingId ? newMeal : m))
        : [newMeal, ...meals];

      setMeals(updatedMeals);
      setMealForm(MEAL_FORM_DEFAULT);
      setEditingId(null);

      await fetch("/api/diet-entry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userKey,
          dateKey,
          meals: updatedMeals,
          proteinGoal,
        }),
      });
    } catch (e) {
      setAiHint({
        tone: "error",
        title: "Network Error",
        message: "Couldn't reach the AI chef.",
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const deleteMeal = async (id: string) => {
    const updated = meals.filter((m) => m.id !== id);
    setMeals(updated);
    if (editingId === id) {
      setEditingId(null);
      setMealForm(MEAL_FORM_DEFAULT);
    }
    await fetch("/api/diet-entry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userKey, dateKey, meals: updated, proteinGoal }),
    });
  };

  const editMeal = (meal: MealEntry) => {
    setMealForm({ mealType: meal.mealType, description: meal.description });
    setEditingId(meal.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updateWater = (delta: number) => {
    setWaterIntake((prev) => Math.max(0, prev + delta));
  };

  // --- RENDER ---

  if (loading && !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <motion.div
          animate={{ scale: [0.95, 1, 0.95] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <Loader2 className="size-8 animate-spin text-gray-900" />
        </motion.div>
      </div>
    );
  }

  if (view === "onboarding") {
    return <Onboarding onSave={saveProfile} saving={loading} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24 font-sans text-gray-900 selection:bg-gray-200 selection:text-black">
      {/* 1. Clean Marquee Header - Removed yellow, now sleek black/white */}
      <div className="overflow-hidden bg-black py-2 text-white">
        <motion.div
          initial={{ x: "0%" }}
          animate={{ x: "-100%" }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className="flex w-max gap-8 whitespace-nowrap text-xs font-bold uppercase tracking-widest"
        >
          {[1, 2, 3, 4].map((i) => (
            <span key={i} className="flex items-center gap-4">
              <span>{GOAL_COPY[profile!.goal].badge} ACTIVE</span>
              <span className="opacity-30">•</span>
              <span>STAY CONSISTENT</span>
              <span className="opacity-30">•</span>
              <span>TRACK YOUR MACROS</span>
              <span className="opacity-30">•</span>
            </span>
          ))}
        </motion.div>
      </div>

      <div className="mx-auto max-w-lg px-4 py-6 sm:px-6 md:max-w-4xl">
        {/* 2. Main Header - Clean, large typography */}
        <header className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.h1
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-3xl font-black uppercase tracking-tight text-gray-900 sm:text-5xl"
            >
              Diet<span className="text-gray-400">OS</span>
            </motion.h1>
            <div className="text-sm font-medium text-gray-500">
              Hello, {userProfile?.name || "Athlete"}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold shadow-sm">
              <Flame className="size-3.5 fill-orange-500 text-orange-500" />
              <span>3 DAY STREAK</span>
            </div>
            <DateNavigator
              selectedDate={selectedDate}
              onSelect={setSelectedDate}
              isToday={isToday}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setView("onboarding")}
              className="size-9 rounded-full border border-gray-200 bg-white hover:bg-gray-100"
            >
              <Target className="size-4" />
            </Button>
          </div>
        </header>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm font-bold text-rose-800"
          >
            <Frown className="size-5" /> {error}
          </motion.div>
        )}

        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[1.4fr_1fr]">
          {/* LEFT COLUMN: Input & Feed */}
          <div className="flex flex-col gap-6">
            <MealComposer
              form={mealForm}
              setForm={setMealForm}
              onSubmit={submitMeal}
              loading={analyzing}
              aiHint={aiHint}
              isEditing={!!editingId}
              onCancelEdit={() => {
                setEditingId(null);
                setMealForm(MEAL_FORM_DEFAULT);
                setAiHint(null);
              }}
            />

            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h2 className="flex items-center gap-2 text-lg font-black uppercase tracking-tight">
                  <Utensils className="size-4" /> Daily Feed
                </h2>
                <Badge
                  variant="secondary"
                  className="font-mono text-xs font-bold"
                >
                  {meals.length}
                </Badge>
              </div>

              <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {meals.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 py-12 text-center"
                    >
                      <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-white shadow-sm">
                        <Utensils className="size-5 text-gray-400" />
                      </div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                        No meals logged
                      </p>
                      <p className="text-xs text-gray-500">
                        Add some fuel to the tank!
                      </p>
                    </motion.div>
                  ) : (
                    meals.map((meal, i) => (
                      <MealCard
                        key={meal.id}
                        meal={meal}
                        index={i}
                        onEdit={() => editMeal(meal)}
                        onDelete={() => deleteMeal(meal.id)}
                      />
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Stats */}
          <div className="flex flex-col gap-6">
            <StatsHUD
              macros={macros}
              targets={targets}
              calorieGoal={calorieGoal}
            />

            <HydrationStation
              current={waterIntake}
              target={8}
              onUpdate={updateWater}
            />

            <CoachPanel
              profile={profile!}
              prettyDate={prettyDate}
              protein={proteinGoal}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- SUBCOMPONENTS ---

function HydrationStation({ current, target, onUpdate }: any) {
  const progress = Math.min(100, (current / target) * 100);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      <div className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-wide text-gray-800">
            <Droplets className="size-4 text-cyan-500 fill-cyan-500" />
            Hydration
          </h3>
          <span className="font-mono text-sm font-bold text-gray-500">
            {current}/{target} cups
          </span>
        </div>

        <div className="relative mb-5 h-8 w-full overflow-hidden rounded-full bg-gray-100">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="relative h-full bg-cyan-400"
          />
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => onUpdate(-1)}
            className="h-10 flex-1 rounded-xl border-gray-200 font-bold hover:bg-gray-50"
          >
            <Minus className="size-4" />
          </Button>
          <Button
            onClick={() => onUpdate(1)}
            className="h-10 flex-1 rounded-xl border-cyan-200 bg-cyan-50 text-cyan-700 font-bold hover:bg-cyan-100 hover:text-cyan-900 border"
          >
            <Plus className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function Onboarding({
  onSave,
  saving,
}: {
  onSave: (d: any) => void;
  saving: boolean;
}) {
  const [formData, setFormData] = useState({
    goal: "muscle_gain" as ProfileGoal,
    weightKg: 70,
    heightCm: 175,
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-6 shadow-xl md:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900">
            Setup Profile
          </h2>
          <p className="text-sm font-medium text-gray-500">
            Configure your parameters.
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3">
            {GOAL_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setFormData((p) => ({ ...p, goal: opt.value }))}
                className={cn(
                  "flex flex-col gap-1 rounded-2xl border p-3 text-left transition-all",
                  formData.goal === opt.value
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-gray-200 bg-white text-gray-900 hover:border-gray-300"
                )}
              >
                <span className="text-xs font-black uppercase">
                  {opt.label}
                </span>
                <span
                  className={cn(
                    "text-[10px] font-medium",
                    formData.goal === opt.value
                      ? "text-gray-400"
                      : "text-gray-500"
                  )}
                >
                  {opt.blurb}
                </span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                Weight (KG)
              </label>
              <Input
                type="number"
                value={formData.weightKg}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    weightKg: Number(e.target.value),
                  }))
                }
                className="h-12 rounded-xl border-gray-200 text-lg font-bold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                Height (CM)
              </label>
              <Input
                type="number"
                value={formData.heightCm}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    heightCm: Number(e.target.value),
                  }))
                }
                className="h-12 rounded-xl border-gray-200 text-lg font-bold"
              />
            </div>
          </div>

          <Button
            onClick={() => onSave(formData)}
            disabled={saving}
            className="h-14 w-full rounded-2xl bg-gray-900 text-lg font-bold text-white hover:bg-black"
          >
            {saving ? <Loader2 className="animate-spin" /> : "Start Tracking"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function MealComposer({
  form,
  setForm,
  onSubmit,
  loading,
  aiHint,
  isEditing,
  onCancelEdit,
}: any) {
  const hintConfig =
    aiHint && HINT_TONE_CONFIG[aiHint.tone as keyof typeof HINT_TONE_CONFIG];
  const HintIcon = hintConfig?.Icon || Info;

  return (
    <div className="relative z-10 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg shadow-gray-200/50">
      <div className="border-b border-gray-100 bg-gray-50/50 px-5 py-3">
        <div className="flex items-center justify-between">
          <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            {isEditing ? "EDITING ENTRY" : "NEW ENTRY"}
          </div>
          {isEditing && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onCancelEdit}
              className="h-6 px-2 text-[10px] font-bold uppercase text-rose-500 hover:bg-rose-50 hover:text-rose-600"
            >
              Cancel Edit
            </Button>
          )}
        </div>
      </div>

      <div className="p-5">
        {/* Quick Add Bar - Mobile optimized scroll */}
        <div className="no-scrollbar mb-4 flex gap-2 overflow-x-auto pb-1">
          {QUICK_ADDS.map((qa) => (
            <button
              key={qa.label}
              onClick={() =>
                setForm((p: any) => ({
                  ...p,
                  description:
                    qa.label + (p.description ? ` + ${p.description}` : ""),
                }))
              }
              className="flex shrink-0 items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold shadow-sm transition-colors hover:border-gray-300 active:bg-gray-50"
            >
              <span>{qa.emoji}</span>
              <span>{qa.label}</span>
            </button>
          ))}
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {MEAL_TYPES.map((type) => (
            <button
              key={type.value}
              onClick={() =>
                setForm((p: any) => ({ ...p, mealType: type.value }))
              }
              className={cn(
                "rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase transition-all",
                form.mealType === type.value
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
              )}
            >
              {type.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <textarea
            value={form.description}
            onChange={(e) =>
              setForm((p: any) => ({ ...p, description: e.target.value }))
            }
            placeholder="e.g., 200g chicken breast, rice..."
            className="min-h-[100px] w-full resize-none rounded-2xl border-0 bg-gray-50 p-4 text-lg font-medium text-gray-900 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-200"
          />

          <div className="mt-4 flex justify-end">
            <Button
              onClick={onSubmit}
              disabled={loading || !form.description.trim()}
              className="h-11 w-full rounded-xl bg-gray-900 font-bold text-white shadow-md hover:bg-black disabled:opacity-50 sm:w-auto sm:px-8"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  Analyze Meal <Zap className="size-4" />
                </span>
              )}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {aiHint && hintConfig && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div
                className={cn(
                  "mt-4 flex items-start gap-3 rounded-xl border p-4 text-sm font-medium",
                  hintConfig.border,
                  hintConfig.bg,
                  hintConfig.text
                )}
              >
                <HintIcon className="mt-0.5 size-4 shrink-0" />
                <div>
                  {aiHint.title && (
                    <div className="mb-0.5 text-xs font-bold uppercase opacity-70">
                      {aiHint.title}
                    </div>
                  )}
                  {aiHint.message}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function MealCard({
  meal,
  onEdit,
  onDelete,
  index,
}: {
  meal: MealEntry;
  onEdit: () => void;
  onDelete: () => void;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);

  // Determine card color based on macros/type roughly
  // This adds the "color" the user asked for in cards, but keeps it subtle
  const isHighProtein = meal.nutrients.protein > 30;
  const isHighCarb = meal.nutrients.carbs > 50;

  let accentColor = "bg-gray-100 text-gray-600";
  if (isHighProtein) accentColor = "bg-rose-100 text-rose-700 border-rose-200";
  else if (isHighCarb)
    accentColor = "bg-amber-100 text-amber-700 border-amber-200";
  else accentColor = "bg-cyan-100 text-cyan-700 border-cyan-200";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div
        onClick={() => setExpanded(!expanded)}
        className="flex cursor-pointer items-center justify-between p-4"
      >
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "flex size-12 flex-col items-center justify-center rounded-xl border text-center leading-none",
              accentColor
            )}
          >
            <span className="text-[9px] font-black uppercase opacity-70">
              KCAL
            </span>
            <span className="text-sm font-black">
              {meal.nutrients.calories}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
                {meal.mealType}
              </span>
              <span className="size-0.5 rounded-full bg-gray-300" />
              <span className="text-[10px] font-bold uppercase text-gray-400">
                {new Date(meal.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <h3 className="line-clamp-1 text-base font-bold text-gray-900">
              {meal.description}
            </h3>
          </div>
        </div>
        <div className="pr-1 text-gray-400">
          {expanded ? (
            <ChevronUp className="size-5" />
          ) : (
            <ChevronDown className="size-5" />
          )}
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden border-t border-gray-100 bg-gray-50/50"
          >
            <div className="grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-100">
              <MacroStat
                label="Protein"
                val={meal.nutrients.protein}
                unit="g"
              />
              <MacroStat label="Carbs" val={meal.nutrients.carbs} unit="g" />
              <MacroStat label="Fat" val={meal.nutrients.fat} unit="g" />
            </div>
            <div className="flex items-center justify-between p-3">
              {meal.notes ? (
                <p className="line-clamp-1 max-w-[60%] text-xs font-medium italic text-gray-500">
                  "{meal.notes}"
                </p>
              ) : (
                <span />
              )}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit();
                  }}
                  className="h-8 rounded-lg text-gray-500 hover:bg-white hover:text-gray-900"
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                  }}
                  className="h-8 rounded-lg text-rose-400 hover:bg-rose-50 hover:text-rose-600"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function StatsHUD({ macros, targets, calorieGoal }: any) {
  const calPercent = Math.min(100, (macros.calories / calorieGoal) * 100);

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 bg-gray-50/50 p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-widest text-gray-400">
            Daily Summary
          </span>
          <div className="flex items-center gap-1.5 rounded-full bg-white px-2 py-0.5 shadow-sm">
            <div className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
            <span className="text-[10px] font-bold text-gray-600">Live</span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-6">
          <div className="mb-2 flex items-end justify-between">
            <div>
              <span className="text-4xl font-black text-gray-900">
                {macros.calories}
              </span>
              <span className="text-sm font-bold text-gray-400">
                {" "}
                / {calorieGoal}
              </span>
            </div>
            <div className="text-[10px] font-bold uppercase text-gray-400">
              Calories
            </div>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${calPercent}%` }}
              className="h-full bg-gray-900"
            />
          </div>
        </div>

        <div className="space-y-4">
          <MacroBar
            label="Protein"
            val={macros.protein}
            max={targets.protein}
            color="bg-rose-500"
          />
          <MacroBar
            label="Carbs"
            val={macros.carbs}
            max={targets.carbs}
            color="bg-amber-400"
          />
          <MacroBar
            label="Fat"
            val={macros.fat}
            max={targets.fat}
            color="bg-cyan-500"
          />
        </div>
      </div>
    </div>
  );
}

function MacroBar({ label, val, max, color }: any) {
  const pct = Math.min(100, (val / max) * 100);
  return (
    <div>
      <div className="mb-1.5 flex justify-between text-[11px] font-bold uppercase tracking-wide">
        <span className="text-gray-900">{label}</span>
        <span className="text-gray-400">
          {val} / {max}g
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          className={cn("h-full rounded-full", color)}
        />
      </div>
    </div>
  );
}

function CoachPanel({ profile, prettyDate, protein }: any) {
  const copy = GOAL_COPY[profile.goal as ProfileGoal];
  return (
    <div className="rounded-3xl border border-violet-100 bg-violet-50/50 p-5">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex size-8 items-center justify-center rounded-full bg-white text-violet-600 shadow-sm">
          <Trophy className="size-4" />
        </div>
        <div>
          <div className="text-xs font-black uppercase text-violet-900">
            Coach Insight
          </div>
        </div>
      </div>
      <p className="mb-4 text-sm font-medium leading-relaxed text-violet-900">
        "{copy.message(prettyDate, protein)}"
      </p>
      <div className="flex flex-wrap gap-2">
        {copy.tips.map((tip: string) => (
          <span
            key={tip}
            className="rounded-lg border border-violet-100 bg-white px-2.5 py-1 text-[10px] font-bold text-violet-700"
          >
            {tip}
          </span>
        ))}
      </div>
    </div>
  );
}

function DateNavigator({ selectedDate, onSelect, isToday }: any) {
  return (
    <div className="flex items-center">
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex h-9 items-center gap-2 rounded-full border border-gray-200 bg-white px-3 text-xs font-bold text-gray-700 shadow-sm hover:bg-gray-50">
            <CalendarDays className="size-3.5" />
            <span className="uppercase">
              {isToday
                ? "Today"
                : selectedDate.toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto rounded-xl border-gray-200 p-0 shadow-lg">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(d) => d && onSelect(d)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

const MacroStat = ({ label, val, unit }: any) => (
  <div className="py-2 text-center">
    <div className="mb-0.5 text-[9px] font-black uppercase text-gray-400">
      {label}
    </div>
    <div className="text-sm font-black text-gray-900">
      {val}
      {unit}
    </div>
  </div>
);

// --- UTILS ---

function startOfDay(d: Date) {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  return copy;
}
function getDateKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(d.getDate()).padStart(2, "0")}`;
}
function formatDate(key: string) {
  const [y, m, d] = key.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}
function ensureUserKey() {
  if (typeof window === "undefined") return null;
  let key = window.localStorage.getItem(STORAGE_KEY);
  if (!key) {
    key = safeGenerateId();
    window.localStorage.setItem(STORAGE_KEY, key);
  }
  return key;
}
function safeGenerateId() {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }
  return (
    "id-" + Date.now().toString(36) + Math.random().toString(36).substring(2)
  );
}
function calcProteinTarget(w: number, g: string) {
  const factors: any = {
    weight_loss: 1.6,
    weight_gain: 1.8,
    muscle_gain: 2.0,
    muscle_loss: 1.8,
  };
  return Math.round(w * (factors[g] || 1.6));
}
function estimateCalorieTarget(p: DietProfile) {
  const base = p.weightKg * 30; // Rough BMR estimate
  const mods: any = {
    weight_loss: -400,
    weight_gain: 400,
    muscle_gain: 250,
    muscle_loss: -200,
  };
  return Math.max(1200, Math.round(base + (mods[p.goal] || 0)));
}
