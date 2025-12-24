"use client";

import { useEffect, useMemo, useState } from "react";

import {
  MOCK_WORKOUT_PLAN,
  WORKOUT_PLAN_VERSION,
  type WorkoutPlan,
} from "@/app/lib/data";

const STORE_KEY = "gym-app-store";
const DEFAULT_EXERCISE_IDS = new Set(
  Object.values(MOCK_WORKOUT_PLAN.workouts).flatMap((list) =>
    list.map((exercise) => exercise.id)
  )
);
const DEFAULT_PLAN_MATCH_THRESHOLD = Math.max(
  5,
  Math.floor(DEFAULT_EXERCISE_IDS.size * 0.5)
);

type UserProfile = {
  name: string;
  joinDate: string;
};

type PlanSource = "default" | "custom";

type WorkoutStoreState = {
  userProfile: UserProfile | null;
  workoutPlan: WorkoutPlan | null;
  planSource: PlanSource | null;
  planVersion: string | null;
  completedExercises: string[];
  lastResetDate: string | null;
};

type PersistedWorkoutStoreState = {
  userProfile: UserProfile | null;
  workoutPlan: WorkoutPlan | null;
  planSource: PlanSource | null;
  planVersion: string | null;
  completedExercises: string[];
  lastResetDate: string | null;
  // legacy field from previous versions
  workoutPlanFingerprint?: string | null;
};

const initialState: WorkoutStoreState = {
  userProfile: null,
  workoutPlan: null,
  planSource: null,
  planVersion: null,
  completedExercises: [],
  lastResetDate: null,
};

export function useWorkoutStore() {
  const todayKey = useMemo(() => new Date().toDateString(), []);
  const [state, setState] = useState<WorkoutStoreState>(() => {
    if (typeof window === "undefined") {
      return { ...initialState, lastResetDate: todayKey };
    }
    const data = window.localStorage.getItem(STORE_KEY);
    if (!data) return { ...initialState, lastResetDate: todayKey };
    try {
      const parsed = JSON.parse(data) as PersistedWorkoutStoreState;
      return migratePersistedState(parsed, todayKey);
    } catch (error) {
      console.error("Failed to parse workout store", error);
      return { ...initialState, lastResetDate: todayKey };
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const persistable: PersistedWorkoutStoreState = {
      userProfile: state.userProfile,
      workoutPlan: state.planSource === "custom" ? state.workoutPlan : null,
      planSource: state.planSource,
      planVersion: state.planVersion,
      completedExercises: state.completedExercises,
      lastResetDate: state.lastResetDate,
    };
    window.localStorage.setItem(STORE_KEY, JSON.stringify(persistable));
  }, [state]);

  const completeOnboarding = (name: string, plan: WorkoutPlan) => {
    const resolvedPlan = resolvePlanSelection(plan);
    setState({
      userProfile: { name, joinDate: new Date().toISOString() },
      workoutPlan: resolvedPlan.plan,
      planSource: resolvedPlan.planSource,
      planVersion: resolvedPlan.planVersion,
      completedExercises: [],
      lastResetDate: todayKey,
    });
  };

  const toggleComplete = (exerciseId: string) => {
    setState((prev) => {
      const exists = prev.completedExercises.includes(exerciseId);
      return {
        ...prev,
        completedExercises: exists
          ? prev.completedExercises.filter((id) => id !== exerciseId)
          : [...prev.completedExercises, exerciseId],
      };
    });
  };

  const resetAll = () => setState({ ...initialState, lastResetDate: todayKey });

  const updateUserSettings = (payload: {
    name?: string;
    plan?: WorkoutPlan;
  }) => {
    setState((prev) => {
      if (!prev.userProfile && !prev.workoutPlan) {
        return prev;
      }

      const nextProfile = payload.name
        ? {
            ...(prev.userProfile ?? {
              joinDate: new Date().toISOString(),
              name: payload.name,
            }),
            name: payload.name,
          }
        : prev.userProfile;

      let nextPlan =
        prev.planSource === "default" ? MOCK_WORKOUT_PLAN : prev.workoutPlan;
      let nextPlanSource = prev.planSource;
      let nextPlanVersion = prev.planVersion;
      let nextCompleted = prev.completedExercises;
      let nextResetDate = prev.lastResetDate;

      if (payload.plan) {
        const resolvedPlan = resolvePlanSelection(payload.plan);
        nextPlan = resolvedPlan.plan;
        nextPlanSource = resolvedPlan.planSource;
        nextPlanVersion = resolvedPlan.planVersion;
        nextCompleted = [];
        nextResetDate = todayKey;
      }

      return {
        ...prev,
        userProfile: nextProfile,
        workoutPlan: nextPlan,
        planSource: nextPlanSource,
        planVersion: nextPlanVersion,
        completedExercises: nextCompleted,
        lastResetDate: nextResetDate,
      };
    });
  };

  return {
    ...state,
    completeOnboarding,
    toggleComplete,
    resetAll,
    updateUserSettings,
  };
}

function migratePersistedState(
  raw: PersistedWorkoutStoreState,
  todayKey: string
): WorkoutStoreState {
  const safeCompleted = Array.isArray(raw.completedExercises)
    ? raw.completedExercises
    : [];

  const base: WorkoutStoreState = {
    userProfile: raw.userProfile ?? null,
    workoutPlan: raw.workoutPlan ?? null,
    planSource: raw.planSource ?? null,
    planVersion: raw.planVersion ?? raw.workoutPlanFingerprint ?? null,
    completedExercises: safeCompleted,
    lastResetDate: raw.lastResetDate ?? todayKey,
  };

  if (!base.userProfile) {
    base.workoutPlan = null;
    base.planSource = null;
    base.planVersion = null;
  } else if (shouldAttachDefaultPlan(base)) {
    const versionChanged = base.planVersion !== WORKOUT_PLAN_VERSION;
    base.workoutPlan = MOCK_WORKOUT_PLAN;
    base.planSource = "default";
    base.planVersion = WORKOUT_PLAN_VERSION;
    if (versionChanged) {
      base.completedExercises = [];
    }
  } else if (!base.workoutPlan) {
    base.workoutPlan = MOCK_WORKOUT_PLAN;
    base.planSource = "default";
    base.planVersion = WORKOUT_PLAN_VERSION;
  }
// 🔥 FORCE RESET OLD DEFAULT SAVED AS CUSTOM
if (
  base.planSource === "custom" &&
  base.workoutPlan?.planName === "Fitness Passion Gym (Beginner)"
) {
  base.workoutPlan = MOCK_WORKOUT_PLAN;
  base.planSource = "default";
  base.planVersion = WORKOUT_PLAN_VERSION;
  base.completedExercises = [];
}

  if (base.userProfile && !base.planSource && base.workoutPlan) {
    if (looksLikeDefaultPlan(base.workoutPlan)) {
      base.workoutPlan = MOCK_WORKOUT_PLAN;
      base.planSource = "default";
      base.planVersion = WORKOUT_PLAN_VERSION;
    } else {
      base.planSource = "custom";
      base.planVersion = null;
    }
  }

  if (base.lastResetDate !== todayKey) {
    base.completedExercises = [];
    base.lastResetDate = todayKey;
  }

  return base;
}

function shouldAttachDefaultPlan(state: WorkoutStoreState): boolean {
  if (!state.userProfile) return false;
  if (state.planSource === "custom") return false;
  if (!state.workoutPlan) return true;
  if (state.planSource === "default") return true;
  if (state.planVersion) return true;
  return looksLikeDefaultPlan(state.workoutPlan);
}

function looksLikeDefaultPlan(plan: WorkoutPlan | null): boolean {
  if (!plan) return false;

  // 🔥 ONLY trust planName match for default
  return plan.planName === MOCK_WORKOUT_PLAN.planName;
}


function resolvePlanSelection(plan: WorkoutPlan): {
  plan: WorkoutPlan;
  planSource: PlanSource;
  planVersion: string | null;
} {
  if (looksLikeDefaultPlan(plan)) {
    return {
      plan: MOCK_WORKOUT_PLAN,
      planSource: "default",
      planVersion: WORKOUT_PLAN_VERSION,
    };
  }

  return {
    plan,
    planSource: "custom",
    planVersion: null,
  };
}
