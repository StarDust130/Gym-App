// data.ts

export type WorkoutExercise = {
  id: string;
  name: string;
  reps: string;
  sets: string;
  category: string;
  note: string | null;
  image?: string[];
  video?: string[];
  impact?: string[];
  impactImage?: string;
};

export type WorkoutPlan = {
  planName: string;
  schedule: Record<string, string>;
  workouts: Record<string, WorkoutExercise[]>;
};

export const MOCK_WORKOUT_PLAN: WorkoutPlan = {
  planName: "Fitness Passion Gym (Intermediate)",

  // ✅ PDF-CORRECT WEEK
  schedule: {
    Monday: "Back & Biceps",
    Tuesday: "Cardio & Crunches",
    Wednesday: "Chest & Triceps",
    Thursday: "Cardio & Full Body Stretching",
    Friday: "Legs & Shoulder",
    Saturday: "CrossFit & Cardio",
    Sunday: "Rest Day",
  },

  workouts: {
    // =========================
    // MONDAY — BACK & BICEPS
    // =========================
    "Back & Biceps": [
      {
        id: "bb-1",
        name: "Bent Over Row",
        reps: "15-12",
        sets: "3",
        category: "Back",
        note: "1st Week",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Row.gif",
        ],
        video: ["https://www.youtube.com/embed/roCP6wCXPqo"],
        impact: ["Mid-back thickness", "Lat engagement"],
      },
      {
        id: "bb-2",
        name: "Bench Supported Row",
        reps: "15-12",
        sets: "3",
        category: "Back",
        note: "1st Week",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Row.gif",
        ],
        video: ["https://www.youtube.com/embed/pYcpY20QaE8"],
        impact: ["Lower back safety", "Controlled rowing"],
      },
      {
        id: "bb-3",
        name: "BB Row Prone Grip",
        reps: "15-12",
        sets: "3",
        category: "Back",
        note: "2nd Week",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Row.gif",
        ],
        video: ["https://www.youtube.com/embed/vT2GjY_Umpw"],
        impact: ["Upper-back density"],
      },
      {
        id: "bb-4",
        name: "Lat Pulldown",
        reps: "15-12",
        sets: "3",
        category: "Back",
        note: null,
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Lat-Pulldown.gif",
        ],
        video: ["https://www.youtube.com/embed/CAwf7n6Luuc"],
        impact: ["Back width", "V taper"],
      },
      {
        id: "bb-5",
        name: "Straight Arm Pulldown",
        reps: "15-12",
        sets: "2",
        category: "Back",
        note: null,
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Straight-Arm-Pulldown.gif",
        ],
        video: ["https://www.youtube.com/embed/6Z15_WdXmVw"],
        impact: ["Lat isolation"],
      },
      {
        id: "bb-6",
        name: "Low Machine Row",
        reps: "15-12",
        sets: "3",
        category: "Back",
        note: "1st Week",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Cable-Row.gif",
        ],
        video: ["https://www.youtube.com/embed/GZbfZ033f74"],
        impact: ["Mid-back thickness"],
      },
      {
        id: "bb-7",
        name: "Seated Row Machine",
        reps: "15-12",
        sets: "3",
        category: "Back",
        note: "2nd Week",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Cable-Row.gif",
        ],
        video: ["https://www.youtube.com/embed/GZbfZ033f74"],
        impact: ["Controlled contraction"],
      },
      {
        id: "bb-8",
        name: "Shrugs DB",
        reps: "15-12",
        sets: "3",
        category: "Back",
        note: "1st Week",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Shrug.gif",
        ],
        video: ["https://www.youtube.com/embed/cJRVVxmytaM"],
        impact: ["Upper traps"],
      },
      {
        id: "bb-9",
        name: "Shrugs Infinity",
        reps: "15-12",
        sets: "3",
        category: "Back",
        note: "2nd Week",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Shrug.gif",
        ],
        video: ["https://www.youtube.com/embed/cJRVVxmytaM"],
        impact: ["Trap endurance"],
      },

      {
        id: "bb-10",
        name: "Supination Curl DB",
        reps: "15-12",
        sets: "3",
        category: "Biceps",
        note: null,
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Curl.gif",
        ],
        video: ["https://www.youtube.com/embed/ykJmrZ5v0Oo"],
        impact: ["Biceps peak"],
      },
      {
        id: "bb-11",
        name: "Reverse Curl (Cable)",
        reps: "15-12",
        sets: "2",
        category: "Biceps",
        note: "1st Week",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Cable-Reverse-Curl.gif",
        ],
        video: ["https://www.youtube.com/embed/2M5FhKk7YJg"],
        impact: ["Brachialis", "Forearms"],
      },
      {
        id: "bb-12",
        name: "Hammer Curl",
        reps: "15-12",
        sets: "2",
        category: "Biceps",
        note: "2nd Week",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Hammer-Curl.gif",
        ],
        video: ["https://www.youtube.com/embed/zC3nLlEvin4"],
        impact: ["Arm thickness"],
      },
      {
        id: "bb-13",
        name: "Concentration / Preacher Curl",
        reps: "15-12",
        sets: "2",
        category: "Biceps",
        note: null,
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Concentration-Curl.gif",
        ],
        video: ["https://www.youtube.com/embed/Jvj2wV0vOYU"],
        impact: ["Isolation", "Peak contraction"],
      },
      {
        id: "bb-14",
        name: "Barbell / Cable Curl",
        reps: "15-12",
        sets: "2",
        category: "Biceps",
        note: null,
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Curl.gif",
        ],
        video: ["https://www.youtube.com/embed/kwG2ipFRgfo"],
        impact: ["Overall biceps mass"],
      },
      {
        id: "bb-15",
        name: "Gorilla Gripper",
        reps: "15-12",
        sets: "3",
        category: "Biceps",
        note: "Forearms",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Hand-Grip-Exercise.gif",
        ],
        video: ["https://www.youtube.com/embed/_4pW8gK9zYw"],
        impact: ["Grip strength"],
      },
      {
        id: "bb-16",
        name: "DB Forearm Curl",
        reps: "15-12",
        sets: "2",
        category: "Biceps",
        note: "Forearms",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Wrist-Curl.gif",
        ],
        video: ["https://www.youtube.com/embed/qyT5hR9Y8dQ"],
        impact: ["Forearm isolation"],
      },
    ],
  },
};

// =========================
// VERSIONING (REQUIRED EXPORT)
// =========================

export const WORKOUT_PLAN_VERSION = hashWorkoutPlan(MOCK_WORKOUT_PLAN);

function hashWorkoutPlan(plan: WorkoutPlan): string {
  return hashString(JSON.stringify(plan));
}

function hashString(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0; // Convert to 32-bit integer
  }
  return hash.toString(16);
}
