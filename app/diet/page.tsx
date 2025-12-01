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
  InfoIcon,
  Loader2,
  Minus,
  Plus,
  Sparkles,
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
  {
    emoji: "☕",
    label: "Black Coffee",
    color: "bg-amber-100 border-amber-300 text-amber-900",
  },
  {
    emoji: "🍌",
    label: "Banana",
    color: "bg-yellow-100 border-yellow-300 text-yellow-900",
  },
  {
    emoji: "🥤",
    label: "Protein Shake",
    color: "bg-blue-100 border-blue-300 text-blue-900",
  },
  {
    emoji: "🥚",
    label: "2 Boiled Eggs",
    color: "bg-orange-100 border-orange-300 text-orange-900",
  },
];

const HINT_TONE_CONFIG = {
  info: {
    Icon: Info,
    bg: "bg-blue-100",
    border: "border-blue-500",
    text: "text-blue-900",
  },
  success: {
    Icon: Check,
    bg: "bg-emerald-100",
    border: "border-emerald-500",
    text: "text-emerald-900",
  },
  warning: {
    Icon: Info,
    bg: "bg-amber-100",
    border: "border-amber-500",
    text: "text-amber-900",
  },
  error: {
    Icon: Frown,
    bg: "bg-rose-100",
    border: "border-rose-500",
    text: "text-rose-900",
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
      <div className="flex min-h-screen items-center justify-center ">
        <motion.div
          animate={{ scale: [0.95, 1, 0.95] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <Loader2 className="size-8 animate-spin text-black" />
        </motion.div>
      </div>
    );
  }

  if (view === "onboarding") {
    return <Onboarding onSave={saveProfile} saving={loading} />;
  }

  return (
    <div className="min-h-screen  pb-24 font-sans text-gray-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* 1. NEW TOP SECTION (Replaces Old Header) */}
      <div className="mb-3 pt-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="flex flex-col gap-4">
            {/* Greeting & Date */}
            <div className="flex items-start justify-between">
              <div>
                <motion.h1
                  initial={{ y: 5, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-3xl font-black uppercase italic tracking-tighter text-black sm:text-5xl"
                >
                  Stay <span className="text-emerald-500">Healthy.</span>
                </motion.h1>
                <p className="font-bold text-gray-400 text-sm mt-1">
                  {userProfile?.name || "Ready to crush it?"}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setView("onboarding")}
                  className="size-10 rounded-xl border-2 border-black bg-white hover:bg-gray-100 hover:shadow-[2px_2px_0px_black]"
                >
                  <InfoIcon className="size-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-lg px-4 sm:px-6 md:max-w-4xl">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center gap-2 rounded-xl border-2 border-black bg-red-100 p-4 text-sm font-bold text-red-900 shadow-[4px_4px_0px_black]"
          >
            <Frown className="size-5" /> {error}
          </motion.div>
        )}

        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[1.4fr_1fr]">
          {/* LEFT COLUMN: Input & Feed */}
          <div className="flex flex-col gap-6">
            {/* Meal Composer */}
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

            {/* Feed Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black uppercase tracking-tight text-black">
                    Today&apos;s Feed
                  </h2>
                  <Badge className="border-2 border-black bg-indigo-500 font-mono text-xs font-bold text-white shadow-[2px_2px_0px_black]">
                    {meals.length} ENTRIES
                  </Badge>
                </div>
                <div>
                  <DateNavigator
                    selectedDate={selectedDate}
                    onSelect={setSelectedDate}
                    isToday={isToday}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {meals.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-white py-12 text-center"
                    >
                      <div className="mb-3 flex size-14 items-center justify-center rounded-full bg-gray-50 border-2 border-gray-100">
                        <Utensils className="size-6 text-gray-400" />
                      </div>
                      <p className="text-sm font-black uppercase tracking-wider text-gray-400">
                        Plate Empty
                      </p>
                      <p className="text-xs font-bold text-gray-400">
                        Log your first meal above
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

          {/* RIGHT COLUMN: Stats & Coach */}
          <div className="flex flex-col gap-6">
            {/* Stats HUD */}
            <StatsHUD
              macros={macros}
              targets={targets}
              calorieGoal={calorieGoal}
            />

            {/* Hydration */}
            <HydrationStation
              current={waterIntake}
              target={8}
              onUpdate={updateWater}
            />

            {/* Coach Panel - NEW COLORFUL DESIGN */}
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
    <div className="relative overflow-hidden rounded-2xl border-2 border-black bg-white shadow-[4px_4px_0px_black]">
      <div className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-wide text-gray-900">
            <Droplets className="size-5 fill-cyan-400 text-cyan-500" />
            Hydration
          </h3>
          <span className="rounded-md bg-cyan-100 px-2 py-1 font-mono text-xs font-bold text-cyan-800">
            {current}/{target}
          </span>
        </div>

        <div className="relative mb-5 h-8 w-full overflow-hidden rounded-xl border-2 border-black bg-gray-50">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="relative h-full bg-cyan-400"
          >
            <div
              className="absolute inset-0 bg-white/20"
              style={{
                backgroundImage:
                  "linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)",
                backgroundSize: "1rem 1rem",
              }}
            />
          </motion.div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={() => onUpdate(-1)}
            className="h-10 flex-1 rounded-xl border-2 border-black bg-white text-black shadow-[2px_2px_0px_black] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_black] active:translate-y-[2px] active:shadow-none"
          >
            <Minus className="size-5" />
          </Button>
          <Button
            onClick={() => onUpdate(1)}
            className="h-10 flex-1 rounded-xl border-2 border-black bg-cyan-400 text-black shadow-[2px_2px_0px_black] hover:bg-cyan-300 hover:translate-y-[1px] hover:shadow-[1px_1px_0px_black] active:translate-y-[2px] active:shadow-none"
          >
            <Plus className="size-5" />
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
  // 1. IMPROVED DEFAULTS (Empty strings so placeholders show)
  const [weight, setWeight] = useState("");
  const [heightVal, setHeightVal] = useState("");
  const [heightUnit, setHeightUnit] = useState<"cm" | "ft">("cm");
  const [goal, setGoal] = useState<ProfileGoal>("muscle_gain");

  const handleSubmit = () => {
    let h = Number(heightVal);
    const w = Number(weight);

    if (!w || !h) return;

    // 2. PARSE FEET.INCH IF NEEDED
    if (heightUnit === "ft") {
      // "5.8" -> 5 feet 8 inches
      const [ft, inch] = heightVal.split(".").map(Number);
      const inches = ft * 12 + (inch || 0);
      h = Math.round(inches * 2.54);
    }

    onSave({
      goal,
      weightKg: w,
      heightCm: h,
      heightText: heightUnit === "ft" ? `${heightVal} ft` : `${h} cm`,
    });
  };

  return (
    <div className="flex h-full items-center justify-center  p-4">
      <div className="w-full max-w-md rounded-3xl border-2 border-black bg-gray-100 p-6 shadow-[8px_8px_0px_black] md:p-8">
        <div className="mb-6">
          <h2 className="text-3xl font-black uppercase tracking-tight text-gray-900">
            Setup Profile
          </h2>
          <p className="text-sm font-bold text-gray-500">
            Configure your parameters.
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3">
            {GOAL_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setGoal(opt.value)}
                className={cn(
                  "flex flex-col gap-1 rounded-xl border-2 p-3 text-left transition-all",
                  goal === opt.value
                    ? "border-black bg-black text-white shadow-[2px_2px_0px_gray]"
                    : "border-gray-200 bg-white text-gray-900 hover:border-black"
                )}
              >
                <span className="text-xs font-black uppercase">
                  {opt.label}
                </span>
                <span
                  className={cn(
                    "text-[10px] font-bold",
                    goal === opt.value ? "text-gray-400" : "text-gray-500"
                  )}
                >
                  {opt.blurb}
                </span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-wider text-gray-500">
                Weight (KG)
              </label>
              <Input
                type="number"
                placeholder="e.g. 70"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="h-12 rounded-xl border-2 border-black text-lg font-bold shadow-[2px_2px_0px_rgba(0,0,0,0.1)] focus-visible:ring-0"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-500">
                  Height
                </label>
                <div className="flex gap-1">
                  <button
                    onClick={() => setHeightUnit("cm")}
                    className={cn(
                      "text-[10px] font-bold px-1.5 rounded",
                      heightUnit === "cm"
                        ? "bg-black text-white"
                        : "bg-gray-200"
                    )}
                  >
                    CM
                  </button>
                  <button
                    onClick={() => setHeightUnit("ft")}
                    className={cn(
                      "text-[10px] font-bold px-1.5 rounded",
                      heightUnit === "ft"
                        ? "bg-black text-white"
                        : "bg-gray-200"
                    )}
                  >
                    FT
                  </button>
                </div>
              </div>
              <Input
                type="number"
                placeholder={
                  heightUnit === "ft" ? "e.g. 5.8" : "e.g. 175"
                }
                value={heightVal}
                onChange={(e) => setHeightVal(e.target.value)}
                className="h-12 rounded-xl border-2 border-black text-lg font-bold shadow-[2px_2px_0px_rgba(0,0,0,0.1)] focus-visible:ring-0"
              />
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={saving}
            className="h-14 w-full rounded-xl border-2 border-black bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-600 text-lg font-black uppercase text-white shadow-[4px_4px_0px_black] transition-all hover:translate-y-[2px] hover:from-emerald-500 hover:via-cyan-600 hover:to-blue-700 hover:shadow-[2px_2px_0px_black] active:translate-y-1 active:shadow-none disabled:opacity-70"
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
    <div className="relative z-10 overflow-hidden rounded-3xl border-2 border-black bg-white shadow-[6px_6px_0px_black]">
      <div className="border-b-2 border-black bg-gray-50 px-5 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-2.5 rounded-full border border-black bg-red-400" />
            <div className="size-2.5 rounded-full border border-black bg-yellow-400" />
            <div className="size-2.5 rounded-full border border-black bg-green-400" />
            <span className="ml-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
              {isEditing ? "EDIT_MODE" : "NEW_ENTRY"}
            </span>
          </div>
          {isEditing && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onCancelEdit}
              className="h-6 px-2 text-[10px] font-bold uppercase text-rose-500 hover:bg-rose-50"
            >
              Cancel
            </Button>
          )}
        </div>
      </div>

      <div className="p-5">
        {/* Quick Add Bar */}
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
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-lg border-2 border-black px-3 py-2 text-xs font-bold shadow-[2px_2px_0px_black] transition-all hover:translate-y-[1px] hover:shadow-[1px_1px_0px_black] active:translate-y-[2px] active:shadow-none",
                qa.color
              )}
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
                "rounded-lg border-2 border-black px-4 py-1.5 text-[11px] font-black uppercase transition-all",
                form.mealType === type.value
                  ? "bg-black text-white shadow-[2px_2px_0px_gray]"
                  : "bg-white text-gray-600 hover:bg-gray-50 shadow-[2px_2px_0px_black] active:shadow-none active:translate-y-[2px]"
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
            placeholder="Describe your meal (e.g., 200g chicken, rice)..."
            className="min-h-[100px] w-full resize-none rounded-xl border-2 border-black bg-gray-50 p-4 text-lg font-bold text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-hidden focus:ring-0 focus:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1)]"
          />

          <div className="mt-4 flex justify-end">
            <Button
              onClick={onSubmit}
              disabled={loading || !form.description.trim()}
              className="h-12 w-full rounded-xl border-2 border-black bg-lime-400 font-black text-black shadow-[4px_4px_0px_black] hover:bg-lime-300 hover:translate-y-[2px] hover:shadow-[2px_2px_0px_black] active:translate-y-1 active:shadow-none disabled:opacity-50 sm:w-auto sm:px-8"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <span className="flex items-center gap-2 text-sm uppercase">
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
                  "mt-4 flex items-start gap-3 rounded-xl border-2 border-black p-4 text-sm font-bold shadow-[4px_4px_0px_black]",
                  hintConfig.bg,
                  hintConfig.text
                )}
              >
                <HintIcon className="mt-0.5 size-4 shrink-0" />
                <div>
                  {aiHint.title && (
                    <div className="mb-0.5 text-xs font-black uppercase opacity-70">
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
  const isHighProtein = meal.nutrients.protein > 30;
  const isHighCarb = meal.nutrients.carbs > 50;

  let accentColor = "bg-white";
  let badgeColor = "bg-gray-100 text-gray-800 border-gray-200";

  if (isHighProtein) {
    accentColor = "bg-rose-50";
    badgeColor = "bg-rose-100 text-rose-800 border-rose-200";
  } else if (isHighCarb) {
    accentColor = "bg-amber-50";
    badgeColor = "bg-amber-100 text-amber-800 border-amber-200";
  } else {
    accentColor = "bg-sky-50";
    badgeColor = "bg-sky-100 text-sky-800 border-sky-200";
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={cn(
        "overflow-hidden rounded-2xl border-2 border-black shadow-[4px_4px_0px_black] transition-transform active:translate-y-[2px] active:shadow-[2px_2px_0px_black]",
        accentColor
      )}
    >
      <div
        onClick={() => setExpanded(!expanded)}
        className="flex cursor-pointer items-center justify-between p-4"
      >
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "flex size-14 flex-col items-center justify-center rounded-xl border-2 text-center leading-none shadow-sm",
              badgeColor
                .replace("bg-", "bg-white ")
                .replace("text-", "text-black ")
            )}
          >
            <span className="text-[9px] font-black uppercase opacity-60">
              KCAL
            </span>
            <span className="text-lg font-black">
              {meal.nutrients.calories}
            </span>
          </div>
          <div className="flex-1">
            <div className="mb-1 flex items-center gap-2">
              <Badge
                variant="outline"
                className="border-2 border-black bg-white px-1.5 py-0 text-[9px] font-black uppercase text-black"
              >
                {meal.mealType}
              </Badge>
              {/* 3. CORRECT TIME FORMAT (5:30 PM) */}
              <span className="text-[10px] font-bold uppercase text-gray-500">
                {new Date(meal.createdAt).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>
            </div>
            <h3 className="line-clamp-2 text-lg font-black leading-snug text-black">
              {meal.description}
            </h3>
          </div>
        </div>
        <div className="pr-1 text-black">
          {expanded ? (
            <ChevronUp className="size-6" />
          ) : (
            <ChevronDown className="size-6" />
          )}
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden border-t-2 border-black bg-white"
          >
            <div className="grid grid-cols-3 divide-x-2 divide-black border-b-2 border-black">
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
                <p className="line-clamp-2 max-w-[60%] text-xs font-bold text-gray-500 bg-gray-100 p-1.5 rounded-md border border-gray-200">
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
                  className="h-8 rounded-lg border-2 border-black bg-white text-xs font-bold hover:bg-gray-100"
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                  }}
                  className="h-8 rounded-lg border-2 border-black bg-rose-400 text-black hover:bg-rose-500"
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
    <div className="overflow-hidden rounded-2xl border-2 border-black bg-white shadow-[4px_4px_0px_black]">
      <div className="border-b-2 border-black bg-black p-4 text-white">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-widest">
            Daily Stats
          </span>
          <div className="flex items-center gap-1.5 rounded-full bg-white px-2 py-0.5">
            <div className="size-1.5 animate-pulse rounded-full bg-red-500" />
            <span className="text-[10px] font-bold text-black">LIVE</span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-6">
          <div className="mb-2 flex items-end justify-between">
            <div>
              <span className="text-4xl font-black text-black">
                {macros.calories}
              </span>
              <span className="text-sm font-bold text-gray-500">
                {" "}
                / {calorieGoal}
              </span>
            </div>
            <div className="text-[10px] font-bold uppercase text-gray-400">
              Calories
            </div>
          </div>
          <div className="h-4 w-full overflow-hidden rounded-full border-2 border-black bg-gray-100">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${calPercent}%` }}
              className="h-full bg-gradient-to-r from-gray-800 to-black"
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
      <div className="mb-1.5 flex justify-between text-[11px] font-black uppercase tracking-wide">
        <span className="text-gray-900">{label}</span>
        <span className="text-gray-500">
          {val} / {max}g
        </span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full border-2 border-black bg-gray-50">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          className={cn("h-full border-r-2 border-black", color)}
        />
      </div>
    </div>
  );
}

function CoachPanel({ profile, prettyDate, protein }: any) {
  const copy = GOAL_COPY[profile.goal as ProfileGoal];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl border-2 border-black bg-white p-6 shadow-[6px_6px_0px_black]"
    >
      {/* Animated decorative shapes */}
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -right-8 -top-8 size-32 rounded-full bg-linear-to-br from-lime-300 to-emerald-400 opacity-20 blur-2xl"
      />
      <motion.div
        animate={{
          rotate: [360, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -bottom-6 -left-6 size-28 rounded-full bg-linear-to-br from-cyan-300 to-blue-400 opacity-20 blur-2xl"
      />

      <div className="relative z-10">
        {/* Header with icon */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-5 flex items-start gap-3"
        >
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex size-12 shrink-0 items-center justify-center rounded-2xl border-2 border-black bg-linear-to-br from-yellow-300 to-amber-400 shadow-[3px_3px_0px_black]"
          >
            <Sparkles className="size-6 text-black" />
          </motion.div>
          <div className="flex-1">
            <h3 className="text-sm font-black uppercase tracking-wider text-black">
              Coach Insight
            </h3>
            <div className="mt-1 flex items-center gap-2">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="size-2 rounded-full bg-lime-500 shadow-[0_0_8px_rgba(132,204,22,0.6)]"
              />
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                AI Powered
              </span>
            </div>
          </div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-4 rounded-2xl border-2 border-black bg-linear-to-br from-slate-50 to-gray-100 p-4 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1)]"
        >
          <p className="text-lg font-black leading-snug tracking-tight text-gray-900">
            "{copy.message(prettyDate, protein)}"
          </p>
        </motion.div>

        {/* Tips Grid */}
        <div className="flex flex-wrap gap-2">
          {copy.tips.map((tip: string, idx: number) => (
            <motion.span
              key={tip}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.4 + idx * 0.1,
                type: "spring",
                stiffness: 200,
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              className={cn(
                "rounded-xl border-2 border-black px-4 py-2 text-[11px] font-bold uppercase tracking-wide shadow-[3px_3px_0px_black] transition-transform cursor-default",
                idx % 3 === 0 &&
                  "bg-linear-to-br from-pink-300 to-rose-300 text-rose-900",
                idx % 3 === 1 &&
                  "bg-linear-to-br from-cyan-300 to-blue-300 text-blue-900",
                idx % 3 === 2 &&
                  "bg-linear-to-br from-amber-300 to-yellow-300 text-amber-900"
              )}
            >
              {tip}
            </motion.span>
          ))}
        </div>

        {/* Mobile-optimized action hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-5 flex items-center gap-2 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-3"
        >
          <Target className="size-4 text-gray-400" />
          <p className="text-xs font-bold text-gray-600">
            Track your meals to stay on target
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

function DateNavigator({ selectedDate, onSelect, isToday }: any) {
  return (
    <div className="flex items-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button  className="flex h-10 items-center gap-2 rounded-xl border-2 border-black bg-white px-3 text-xs font-bold text-black shadow-[2px_2px_0px_black] hover:bg-gray-50 active:translate-y-[2px] active:shadow-none">
            <CalendarDays className="size-4" />
            <span className="uppercase">
              {isToday
                ? "Today"
                : selectedDate.toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto rounded-xl border-2 border-black p-0 shadow-[4px_4px_0px_black]">
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
    <div className="mb-0.5 text-[9px] font-black uppercase text-gray-500">
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
