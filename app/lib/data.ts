export type WorkoutExercise = {
  id: string;
  name: string;
  reps: string;
  sets: string;
  note: string | null;
  image?: string[];
  video?: string[];
  impact?: string[];
  impactImage?: string;
};

export type WorkoutSchedule = {
  [weekday: string]: string;
};

export type WorkoutPlan = {
  planName: string;
  schedule: WorkoutSchedule;
  workouts: Record<string, WorkoutExercise[]>;
};

export const MOCK_WORKOUT_PLAN: WorkoutPlan = {
  planName: "Fitness Passion Gym (Beginner – Muscle Gain Version)",

  schedule: {
    Monday: "Lower Body",
    Tuesday: "Upper Body",
    Wednesday: "Cardio & Abs",
    Thursday: "Lower Body",
    Friday: "Upper Body",
    Saturday: "Cardio & Abs",
    Sunday: "Rest Day",
  },

  workouts: {
    // ----------------------------------------------------------
    // LOWER BODY
    // ----------------------------------------------------------
    "Lower Body": [
      {
        id: "lb-1",
        name: "Own body Squats / Dumbbell Squats",
        reps: "8–12",
        sets: "3–4",
        note: "Choose weight where last 2 reps are hard. Slow and controlled.",
      },

      {
        id: "lb-2",
        name: "Static Lunges / DB Lunges",
        reps: "8–12 each leg",
        sets: "3",
        note: "Use dumbbells when bodyweight becomes easy.",
      },

      {
        id: "lb-3",
        name: "Leg Press / Leg Extension",
        reps: "10–12",
        sets: "3–4",
        note: "Start moderate weight. Increase weekly.",
      },

      {
        id: "lb-4",
        name: "Leg Curl",
        reps: "10–12",
        sets: "3",
        note: "Hold the contraction for 1 second.",
      },

      {
        id: "lb-5",
        name: "Standing Calf Raise",
        reps: "12–15",
        sets: "3",
        note: "Slow reps. Full stretch at bottom.",
      },

      {
        id: "lb-6",
        name: "Seated Calf Raise",
        reps: "12–15",
        sets: "3",
        note: "Pause at top to activate soleus muscle.",
      },

      {
        id: "lb-7",
        name: "Lower Body Stretch",
        reps: "N/A",
        sets: "1",
        note: "Hold each stretch 30 seconds.",
      },
    ],

    // ----------------------------------------------------------
    // UPPER BODY
    // ----------------------------------------------------------
    "Upper Body": [
      {
        id: "ub-1",
        name: "Lat Pulldown",
        reps: "8–12",
        sets: "3",
        note: "Pull bar to upper chest. Controlled movement.",
      },

      {
        id: "ub-2",
        name: "Seated Row / Low Row",
        reps: "8–12",
        sets: "3",
        note: "Squeeze shoulder blades hard at the back.",
      },

      {
        id: "ub-3",
        name: "Overhead Press (DB)",
        reps: "8–10",
        sets: "3",
        note: "Use 7.5kg if form is good. Last 2 reps should be tough.",
      },

      {
        id: "ub-4",
        name: "Flat Dumbbell Press",
        reps: "8–12",
        sets: "3–4",
        note: "Main chest builder. Increase weight gradually.",
      },

      {
        id: "ub-5",
        name: "Incline Dumbbell Press",
        reps: "8–12",
        sets: "3",
        note: "Targets upper chest. Keep elbows at 45°.",
      },

      {
        id: "ub-6",
        name: "Incline Chest Press Machine (optional)",
        reps: "10",
        sets: "1–2",
        note: "Only if energy left. Do NOT replace dumbbells.",
      },

      {
        id: "ub-7",
        name: "Dumbbell Shrugs",
        reps: "12–15",
        sets: "3",
        note: "Lift straight up. No circles.",
      },

      {
        id: "ub-8",
        name: "External Rotation (DB)",
        reps: "12–15",
        sets: "2",
        note: "Very light weight. Shoulder safety exercise.",
      },

      {
        id: "ub-9",
        name: "Superman / Back Extension",
        reps: "10–12",
        sets: "2",
        note: "Strengthens lower back. Don’t over-arch.",
      },

      {
        id: "ub-10",
        name: "Supination DB Curl",
        reps: "10–12",
        sets: "3",
        note: "Rotate wrist for full bicep activation.",
      },

      {
        id: "ub-11",
        name: "Dumbbell Bicep Curl",
        reps: "8–12",
        sets: "3",
        note: "No swinging. Elbows locked.",
      },

      {
        id: "ub-12",
        name: "Triceps Pushdown (Cable)",
        reps: "10–12",
        sets: "3",
        note: "Elbows fixed. Push only with triceps.",
      },

      {
        id: "ub-13",
        name: "Forearm Gorilla Gripper",
        reps: "12–15",
        sets: "2",
        note: "Squeeze slow for maximum grip strength.",
      },

      {
        id: "ub-14",
        name: "Upper Body Stretch",
        reps: "30–40 seconds",
        sets: "1",
        note: "Cool-down. Relax muscles.",
      },
    ],

    // ----------------------------------------------------------
    // CARDIO + ABS
    // ----------------------------------------------------------
    "Cardio & Abs": [
      {
        id: "ca-1",
        name: "Sit Up",
        reps: "12–15",
        sets: "3",
        note: "Curl slowly. Do not pull your neck.",
      },

      {
        id: "ca-2",
        name: "Leg Raise",
        reps: "10–12",
        sets: "3",
        note: "Lower back stays flat on floor.",
      },

      {
        id: "ca-3",
        name: "Side Crunch",
        reps: "12–15 each side",
        sets: "2–3",
        note: "Twist slowly. Feel obliques.",
      },

      {
        id: "ca-4",
        name: "Russian Twists / Side Bend (DB)",
        reps: "12–16",
        sets: "2–3",
        note: "Rotate from core, not shoulders.",
      },

      {
        id: "ca-5",
        name: "Plank",
        reps: "30–45 seconds",
        sets: "2–3",
        note: "Keep body straight. Don’t drop hips.",
      },

      {
        id: "ca-6",
        name: "Stretching",
        reps: "30–40 seconds",
        sets: "1",
        note: "Cooldown stretch for core & lower back.",
      },

      {
        id: "ca-7",
        name: "Light Cardio (Cycling / Treadmill)",
        reps: "8–12 minutes",
        sets: "1",
        note: "Easy pace. Just warm-up, not fat-burning.",
      },
    ],

    "Rest Day": [],
  },
};