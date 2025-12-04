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
    name: "Own body Squats / Squats DB",
    reps: "8–12",
    sets: "3–4",
    note: "Use heavier dumbbells now. Last 2 reps must feel hard.",
    image: [
      "https://www.inspireusafoundation.org/file/2021/06/bodyweight-squat.gif",
      "https://www.wikihow.com/images/thumb/b/b1/Do-Free-Squats-Step-11-Version-2.jpg/aid3265293-v4-728px-Do-Free-Squats-Step-11-Version-2.jpg.webp",
      "https://www.inspireusafoundation.org/file/2021/10/dumbbell-sumo-squat.gif",
      "https://fitnessprogramer.com/wp-content/uploads/2023/09/Dumbbell-Squat.gif"
    ],
    video: [
      "https://www.youtube.com/embed/-5LhNSMBrEs",
      "https://youtube.com/embed/lRYBbchqxtI"
    ],
    impact: [
      "Builds thigh and glute strength.",
      "Improves balance and core stability.",
      "Boosts lower-body power."
    ],
    impactImage: "https://www.inspireusafoundation.org/file/2021/06/bodyweight-squat.gif"
  },

  {
    id: "lb-2",
    name: "Own body static Lunges / Lunges static DB",
    reps: "8–12 (🍗)",
    sets: "3",
    note: "Use dumbbells now. Step back, keep chest up.",
    image: [
      "https://www.inspireusafoundation.org/file/2023/07/bodyweight-forward-lunge.gif",
      "https://c.tenor.com/wTulE6li6AEAAAAd/tenor.gif"
    ],
    video: [
      "https://youtube.com/embed/38xlLGfguz4",
      "https://youtube.com/embed/HIM0GrawvAU"
    ],
    impact: [
      "Strengthens quads, glutes, and hamstrings.",
      "Builds single-leg stability.",
      "Helps fix left-right imbalance."
    ],
    impactImage: "https://www.inspireusafoundation.org/file/2023/07/bodyweight-forward-lunge.gif"
  },

  {
    id: "lb-3",
    name: "Leg press / Leg extension",
    reps: "10–12",
    sets: "3–4",
    note: "Increase weight weekly. Use weight where 10 reps are tough.",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2015/11/Leg-Press.gif",
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/LEG-EXTENSION.gif"
    ],
    video: [
      "https://youtube.com/embed/pCLf-OeSMtQ",
      "https://youtube.com/embed/iQ92TuvBqRo"
    ],
    impact: [
      "Builds quadriceps quickly.",
      "Adds size to thighs.",
      "Improves knee stability."
    ],
    impactImage: "https://fitnessprogramer.com/wp-content/uploads/2015/11/Leg-Press.gif"
  },

  {
    id: "lb-4",
    name: "Leg curl",
    reps: "10–12",
    sets: "3",
    note: "Hold for 1 second at the top to activate hamstrings.",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/08/Seated-Leg-Curl.gif"
    ],
    video: ["https://youtube.com/embed/_lgE0gPvbik"],
    impact: [
      "Strengthens hamstrings.",
      "Balances quad-dominant legs.",
      "Protects the knee joint."
    ],
    impactImage: "https://fitnessprogramer.com/wp-content/uploads/2021/08/Seated-Leg-Curl.gif"
  },

  {
    id: "lb-5",
    name: "Standing calf",
    reps: "12–15",
    sets: "3",
    note: "Slow reps. Full stretch. Add dumbbells.",
    image: [
      "https://liftmanual.com/wp-content/uploads/2023/04/bodyweight-standing-calf-raise.jpg",
      "https://liftmanual.com/wp-content/uploads/2023/04/dumbbell-standing-calf-raise.jpg"
    ],
    video: ["https://youtube.com/embed/wdOkFomQNp8"],
    impact: [
      "Adds size to calves.",
      "Improves ankle strength.",
      "Helps in running and balance."
    ],
    impactImage: "https://liftmanual.com/wp-content/uploads/2023/04/bodyweight-standing-calf-raise.jpg"
  },

  {
    id: "lb-6",
    name: "Seated calf",
    reps: "12–15",
    sets: "3",
    note: "Targets deep calf muscles. Pause at top.",
    image: [
      "https://burnfit.io/wp-content/uploads/2023/11/SEAT_CALF_RAISE.gif"
    ],
    video: ["https://youtube.com/embed/S2yhz3klwdU"],
    impact: [
      "Builds thick lower calves.",
      "Improves explosive leg power.",
      "Completes full calf development."
    ],
    impactImage: "https://burnfit.io/wp-content/uploads/2023/11/SEAT_CALF_RAISE.gif"
  },

  {
    id: "lb-7",
    name: "Lower body stretch",
    reps: "N/A",
    sets: "1",
    note: "Hold each stretch for 30 seconds.",
    image: [
      "https://liftmanual.com/wp-content/uploads/2023/04/standing-quadriceps-stretch.jpg",
      "https://www.vissco.com/wp-content/uploads/animation/sub/supine-piriformis-stretch.gif"
    ],
    video: [],
    impact: [
      "Reduces soreness.",
      "Improves flexibility.",
      "Helps recovery and mobility."
    ],
    impactImage: "https://liftmanual.com/wp-content/uploads/2023/04/standing-quadriceps-stretch.jpg"
  }
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