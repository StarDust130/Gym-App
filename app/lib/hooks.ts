"use client";

import { useEffect, useMemo, useState } from "react";

import { MOCK_WORKOUT_PLAN, type WorkoutPlan } from "@/app/lib/data";

const STORE_KEY = "gym-app-store";
const DEFAULT_PLAN_SERIALIZED = JSON.stringify(MOCK_WORKOUT_PLAN);
const DEFAULT_PLAN_FINGERPRINT = hashString(DEFAULT_PLAN_SERIALIZED);

type UserProfile = {
  name: string;
  joinDate: string;
};

type WorkoutStoreState = {
  userProfile: UserProfile | null;
  workoutPlan: WorkoutPlan | null;
  workoutPlanFingerprint: string | null;
  completedExercises: string[];
  lastResetDate: string | null;
};

const initialState: WorkoutStoreState = {
  userProfile: null,
  workoutPlan: null,
  workoutPlanFingerprint: null,
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
      const parsed = JSON.parse(data) as WorkoutStoreState;

      const storedFingerprint = parsed.workoutPlanFingerprint ?? null;
      const planWasDefault = parsed.workoutPlan
        ? storedFingerprint
          ? true
          : parsed.workoutPlan.planName === MOCK_WORKOUT_PLAN.planName
        : false;

      if (planWasDefault && parsed.workoutPlan) {
        const fingerprintChanged =
          storedFingerprint !== DEFAULT_PLAN_FINGERPRINT;
        parsed.workoutPlan = MOCK_WORKOUT_PLAN;
        parsed.workoutPlanFingerprint = DEFAULT_PLAN_FINGERPRINT;
        if (fingerprintChanged) {
          parsed.completedExercises = [];
        }
      }

      if (parsed.lastResetDate === todayKey) return parsed;
      return { ...parsed, completedExercises: [], lastResetDate: todayKey };
    } catch (error) {
      console.error("Failed to parse workout store", error);
      return { ...initialState, lastResetDate: todayKey };
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORE_KEY, JSON.stringify(state));
  }, [state]);

  const completeOnboarding = (name: string, plan: WorkoutPlan) => {
    const planFingerprint = computePlanFingerprint(plan);
    setState({
      userProfile: { name, joinDate: new Date().toISOString() },
      workoutPlan: plan,
      workoutPlanFingerprint: planFingerprint,
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

      const nextPlan = payload.plan ?? prev.workoutPlan;
      const planFingerprint = payload.plan
        ? computePlanFingerprint(payload.plan)
        : prev.workoutPlanFingerprint;

      return {
        ...prev,
        userProfile: nextProfile,
        workoutPlan: nextPlan,
        workoutPlanFingerprint: planFingerprint,
        completedExercises: payload.plan ? [] : prev.completedExercises,
        lastResetDate: payload.plan ? todayKey : prev.lastResetDate,
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

function computePlanFingerprint(plan: WorkoutPlan | null): string | null {
  if (!plan) return null;
  const serialized = JSON.stringify(plan);
  if (serialized !== DEFAULT_PLAN_SERIALIZED) return null;
  return DEFAULT_PLAN_FINGERPRINT;
}

function hashString(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString(16);
}
