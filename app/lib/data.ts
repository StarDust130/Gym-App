// data.ts

export type WorkoutExercise = {
  id: string;
  name: string;
  reps: string;
  sets: string;
  category: string;
  note: string | null;
  tips?: string[];
  image?: string[];
  video?: string[];
  impact?: string[];
  target?: string;
  impactImage?: string;
};

export type WorkoutPlan = {
  planName: string;
  schedule: Record<string, string>;
  workouts: Record<string, WorkoutExercise[]>;
};

export const MOCK_WORKOUT_PLAN: WorkoutPlan = {
  planName: "Fitness Passion Gym (Intermediate)",

  // ✅ CORRECTED SCHEDULE: Monday is Back & Biceps
  schedule: {
    Monday: "Back , Biceps & Forearms",
    Tuesday: "Cardio & Crunches",
    Wednesday: "Chest & Triceps",
    Thursday: "Cardio Day",
    Friday: "Legs & Shoulder",
    Saturday: "CrossFit & Cardio",
    Sunday: "Rest Day",
  },

  workouts: {
    // ===========================================
    // MONDAY: BACK & BICEPS
    // ===========================================
    "Back , Biceps & Forearms": [
      /* ================= BACK (4 DISTINCT MOVES) ================= */
      {
        id: "bk-1",
        name: "Bent-Over Barbell Row",
        reps: "8-10",
        sets: "3 sets",
        category: "Back",
        note: "🔥 EXERCISE 1. THICKNESS. The heavy builder. Do this first while fresh.",
        tips: [
          "Torso 45° angle",
          "Pull bar to hip crease",
          "Squeeze shoulder blades together",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Bent-Over-Row.gif",
        ],
        video: ["https://www.youtube.com/embed/vT2GjY_Umpw"],
        impact: ["Upper Back Density", "Overall Mass"],
      },
      {
        id: "bk-2",
        name: "Lat Pulldown (Wide Grip)",
        reps: "10-12",
        sets: "3 sets",
        category: "Back",
        note: "📐 EXERCISE 2. WIDTH. Vertical pull. Distinct from the row.",
        tips: [
          "Chest up, slight arch",
          "Drive elbows down to hips",
          "Full stretch at top",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Lat-Pulldown.gif",
        ],
        video: ["https://www.youtube.com/embed/CAwf7n6Luuc"],
        impact: ["V-Taper", "Lat Width"],
      },
      {
        id: "bk-3",
        name: "Seated Cable Row",
        reps: "12-15",
        sets: "3 sets",
        category: "Back",
        note: "🎯 EXERCISE 3. ISOLATION. Targets mid-back and lats without lower back strain.",
        tips: [
          "Torso upright",
          "Pull low toward belly button",
          "Squeeze for 1 second",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Cable-Row.gif",
        ],
        video: ["https://www.youtube.com/embed/UCXxvVItLoM"],
        impact: ["Mid-Back Detail", "Lat Control"],
      },
      {
        id: "bk-4",
        name: "Back Extension",
        reps: "12-15",
        sets: "3 sets",
        category: "Back",
        note: "🛡️ EXERCISE 4. LOWER BACK. Essential for the 'Christmas Tree' look.",
        tips: [
          "Hinge at hips only",
          "Neutral spine",
          "Squeeze glutes and lower back at top",
        ],
        image: [
          "https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/05/back-extension-frontloaded.gif?resize=600%2C600&ssl=1",
        ],
        video: ["https://youtube.com/embed/Wpreb69h2fE?si=ttyCZnQv7Xy9Y5cb"],
        impact: ["Spine Erectors", "Lower Back Strength"],
      },

      /* ================= BICEPS (3 DISTINCT ANGLES) ================= */
      {
        id: "bi-1",
        name: "Barbell Curl (Standing)",
        reps: "8-10",
        sets: "3 sets",
        category: "Biceps",
        note: "💪 EXERCISE 5. MASS (Short Head). Heavy loading. Fundamental.",
        tips: ["Elbows tucked by ribs", "No swinging", "Squeeze hard at top"],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Curl.gif",
        ],
        video: ["https://youtube.com/embed/54x2WF1_Suc?si=Krs73Ki6rbcjMNkV"],
        impact: ["Overall Bicep Size", "Thickness"],
      },
      {
        id: "bi-2",
        name: "Incline Dumbbell Curl",
        reps: "10-12",
        sets: "3 sets",
        category: "Biceps",
        note: "🏔️ EXERCISE 6. PEAK (Long Head). The incline stretches the outer bicep. Critical for the 'Peak'.",
        tips: [
          "Bench at 45-60 degrees",
          "Let arms hang fully behind you",
          "Keep elbows back",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2022/02/Flexor-Incline-Dumbbell-Curls.gif",
        ],
        video: ["https://youtube.com/embed/S2cYwsDhpI4?si=tiu7n69Hs1TToxw4"],
        impact: ["Bicep Peak", "Stretch"],
      },
      {
        id: "bi-3",
        name: "Hammer Curl",
        reps: "10-12",
        sets: "3 sets",
        category: "Biceps",
        note: "🔨 EXERCISE 7. WIDTH (Brachialis). Targets the muscle *under* the bicep to push it out.",
        tips: [
          "Neutral grip (thumbs up)",
          "Cross body or straight up",
          "Controlled tempo",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/04/Seated-Hammer-Curl.gif",
        ],
        video: ["https://youtube.com/embed/vm0zV_WQerE?si=gYGaao8dKT6-s3Vk"],
        impact: ["Arm Width", "Forearm Tie-in"],
      },

      /* ================= FOREARMS (2 DISTINCT SIDES) ================= */
      {
        id: "fa-1",
        name: "Machine Wrist Curl (Standing)",
        reps: "15-20",
        sets: "3 sets",
        category: "Forearm",
        note: "🔥 EXERCISE 8. FLEXORS. Use the machine in your image. Better isolation.",
        tips: [
          "Forearms flat on pad",
          "Unroll fingers at bottom",
          "Curl wrist completely up",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/06/Machine-Wrist-Curl.gif",
        ],
        video: [
          "https://www.youtube.com/embed/M8TpHw5aYgA?si=af_0A8zrxs6aQZBN",
        ],
        impact: ["Inner Forearm Pop", "Vascularity/Veins"],
      },
      {
        id: "fa-2",
        name: "Reverse Barbell Curl (Palms Down)",
        reps: "12-15",
        sets: "3 sets",
        category: "Forearm",
        note: "🖐️ EXERCISE 9. EXTENSORS. The top of the forearm. Completes the look.",
        tips: [
          "Overhand grip",
          "Elbows tucked",
          "Lift with the top of the hand",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Reverse-Curl.gif",
        ],
        video: ["https://www.youtube.com/embed/nRgxYDUeOzg"],
        impact: ["Outer Forearm", "Brachioradialis"],
      },
    ],
    // ===========================================
    // TUESDAY: CARDIO & CRUNCHES
    // ===========================================
    "Cardio & Crunches": [
      /* ================= CORE (4 MOVES - STRICT) ================= */
      {
        id: "abs-3",
        name: "Hanging Leg Raise",
        reps: "12-15",
        sets: "3 sets",
        category: "Abs",
        note: "🔥 LOWER ABS. Target the fat stored in your trunk. Hang strict. No swinging.",
        tips: [
          "🚫 Do not use momentum",
          "🦵 Legs straight (or knees up if failing)",
          "⬇️ Control the drop slowly",
        ],
        image: [
          "https://ccuuubmtdurkmbeufybi.supabase.co/storage/v1/object/public/animations/0826.gif",
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Lying-Leg-Raise.gif",
        ],
        video: ["https://youtube.com/embed/XQc0WHO90Lk?si=xf8AsOrWQ6x_ueJm"],
        impact: ["Lower Abs", "V-Cut"],
      },
      {
        id: "abs-new",
        name: "Kneeling Cable Crunch",
        reps: "12-15",
        sets: "3 sets",
        category: "Abs",
        note: "🧱 UPPER ABS. Use the Rope. Go Heavy. Build the blocks.",
        tips: [
          "🛐 Kneel down, keep hips locked",
          "⤵️ Crunch down to the floor",
          "💨 Exhale all air at the bottom",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Kneeling-Cable-Crunch.gif",
        ],
        video: ["https://youtube.com/embed/K2m0jj6RfYg?si=7ewaBKdG8CSJfpHP"],
        impact: ["Six Pack Thickness", "Upper Core"],
      },
      {
        id: "abs-7",
        name: "Cable Side Bend",
        reps: "15-20 (Per Side)",
        sets: "3 sets",
        category: "Abs",
        note: "⚔️ OBLIQUES. Carve the sides. Constant tension is key.",
        tips: [
          "🧍 Stand straight, chest up",
          "🏹 Let cable pull arm up high",
          "💥 Crunch hard to the side",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2022/05/Side-bend.gif",
        ],
        video: ["https://youtube.com/embed/_5rpm-8ux0A?si=s_lcFg4RMCqC5Xrk"],
        impact: ["Waist Width", "Side Definition"],
      },
      {
        id: "abs-6",
        name: "Plank (Strict Hold)",
        reps: "Hold 1-2 Mins",
        sets: "2 sets",
        category: "Abs",
        note: "🛡️ CORE LOCK. Squeeze everything. Shake the fat off.",
        tips: [
          "🍑 Glutes tight (Squeeze them)",
          "⚓ Belly button pulled to spine",
          "📉 No sagging hips!",
        ],
        image: ["https://www.inspireusafoundation.org/file/2022/01/plank.gif"],
        video: ["https://youtube.com/embed/ftSgOmyQyEg?si=u6PPn6keN49-9mV8"],
        impact: ["Deep Core", "Posture"],
      },

      /* ================= CARDIO (HIIT - ELLIPTICAL / CYCLE) ================= */
      {
        id: "lc-1",
        name: "Cardio (Fat Loss Time 😤)",
        reps: "15-20 Mins",
        sets: "1",
        category: "Cardio",
        target: "🎯 BURN GOAL: 300+ Calories ",
        note: "🔥 FAT INCINERATOR. You have 10kg of trunk fat. Burn it off.",
        tips: [
          "🚶 1 Min: Moderate Pace (Recovery)",
          "⚡ 30 Sec: MAX RESISTANCE SPRINT (100% Effort)",
          "🔄 Repeat 10 times without stopping",
        ],
        image: [
          "https://media.tenor.com/lEy7Yw63vQUAAAAM/beast-mode-cardio.gif",
        ],
        impact: ["Visceral Fat Loss", "Stamina"],
      },
    ],

    // ===========================================
    // WEDNESDAY: CHEST & TRICEPS
    // ===========================================
    "Chest & Triceps": [
      // =========================
      // CHEST (3 MOVES - MASS)
      // =========================
      {
        id: "ch-2",
        name: "Incline DB Press",
        reps: "8-10",
        sets: "3 sets",
        category: "Chest",
        target: "🎯 GOAL: Lift 2kg heavier than last time",
        note: "🔥 EXERCISE 1. UPPER CHEST. Do this first while fresh. This builds the 'shelf'.",
        tips: [
          "Bench at 30 degrees (not too steep)",
          "Control the weight down slowly",
          "Squeeze upper chest at top",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Dumbbell-Press.gif",
        ],
        video: ["https://youtube.com/embed/8fXfwG4ftaQ?si=A0zwKBil2ghFddlw"],
        impact: ["Upper Chest Thickness", "Broad Shoulder Look"],
      },

      {
        id: "ch-1",
        name: "Flat DB Press",
        reps: "8-10",
        sets: "3 sets",
        category: "Chest",
        target: "🎯 GOAL: Control the negative (3 seconds down)",
        note: "🧱 EXERCISE 2. MASS. The classic builder. Heavy.",
        tips: [
          "Tuck elbows slightly (don't flare)",
          "Feet planted firmly on floor",
          "Drive weight up explosively",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Press.gif",
        ],
        video: ["https://youtube.com/embed/WbCEvFA0NJs?si=Dfojxgl3MGzpgFk2"],
        impact: ["Overall Chest Size", "Pressing Power"],
      },

      {
        id: "ch-5",
        name: "Cable Crossover (High to Low)",
        reps: "12-15",
        sets: "3 sets",
        category: "Chest",
        target: "🎯 GOAL: Feel the stretch, not the weight",
        note: "🔪 EXERCISE 3. DEFINITION. Constant tension. Better than Pec Dec.",
        tips: [
          "Step forward, lean slightly",
          "Bring hands together at waist",
          "Squeeze inner chest hard",
        ],
        image: [
          "https://www.inspireusafoundation.org/file/2024/02/cable-standing-crossover.gif",
        ],
        video: ["https://youtube.com/embed/y4RJDSOBEl8?si=2egsqIPAxVxLFfZU"],
        impact: ["Inner Chest Line", "Chest Separation"],
      },

      // =========================
      // TRICEPS (3 MOVES - HORSE SHOE)
      // =========================
      {
        id: "tr-1",
        name: "Dips (Assisted or Weighted)",
        reps: "10-12",
        sets: "3 sets",
        category: "Triceps",
        target: "🎯 GOAL: Full range of motion",
        note: "👑 EXERCISE 4. THE KING. This is the squat of the upper body.",
        tips: [
          "Keep torso upright for triceps",
          "Lower until elbows are 90 degrees",
          "Lock out at the top",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2022/11/Asisted-Triceps-Dips.gif",
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Close-Grip-Bench-Press.gif",
        ],
        video: [
          "https://youtube.com/embed/LH9iZNaO7oU?si=t-NMoDG_7o-emsMD",
          "https://youtube.com/embed/6zWoAllRufg?si=96IU372uz0YczAye",
        ],
        impact: ["Massive Triceps", "Arm Thickness"],
      },

      {
        id: "tr-4",
        name: "Skull Crusher (DB or EZ Bar)",
        reps: "10-12",
        sets: "3 sets",
        category: "Triceps",
        target: "🎯 GOAL: Isolate the Long Head",
        note: "📏 EXERCISE 5. LONG HEAD. This makes the arm look big from the side.",
        tips: [
          "Keep elbows pointing up",
          "Lower weight to forehead/ears",
          "Do not swing shoulders",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/04/Cable-Rope-Overhead-Triceps-Extension.gif",
          "https://fitnessprogramer.com/wp-content/uploads/2021/06/Dumbbell-Skull-Crusher.gif",
        ],
        video: [
          "https://youtube.com/embed/b5le--KkyH0?si=Yvs4Hcf3f9-rR47q",
          "https://youtube.com/embed/iuYB_fLp26Q?si=5AD_YDcGVENz63Ue",
        ],
        impact: ["Tricep Belly", "Arm Size"],
      },

      {
        id: "tr-3",
        name: "Triceps Rope Pushdown",
        reps: "12-15",
        sets: "3 sets",
        category: "Triceps",
        target: "🎯 GOAL: Burn out",
        note: "🏁 EXERCISE 6. FINISHER. Isolate the lateral head.",
        tips: [
          "Elbows glued to your ribs",
          "Spread the rope apart at bottom",
          "Hold the squeeze for 1 second",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Pushdown.gif",
        ],
        video: ["https://youtube.com/embed/1FjkhpZsaxc?si=UeI7YtnLqsvk9JP4"],
        impact: ["Tricep Definition", "Horseshoe Look"],
      },
    ],

    // ===========================================
    // THURSDAY: CARDIO & STRETCHING
    // ===========================================
    "Cardio Day": [
      {
        id: "cardio-1",
        name: "Cardio (any)",
        reps: "30 mins",
        sets: "1 set",
        category: "Cardio",
        impact: ["Fat burning", "Heart health", "Endurance"],
        note: "🚀 Steady cardio burns fat fast! Keep it moderate to melt away those pounds quickly.",
        tips: [
          "🏃‍♂️ Keep a steady pace – no rushing!",
          "❤️ Stay in fat-burning zone: heart rate moderate, not too high.",
          "💧 Drink water often to stay hydrated.",
          "🌬️ Breathe deep and steady for better burn.",
          "🔑 Do this daily for quick fat loss results!",
        ],
        image: [
          "https://media.tenor.com/eXlIRe28PVgAAAAm/bubu-dudu-bubu.webp",
          "https://media.tenor.com/HXbs_-Rwqj4AAAAm/train-trainer.webp",
          "https://media.tenor.com/lEy7Yw63vQUAAAAM/beast-mode-cardio.gif",
        ],
      },
    ],

    // ===========================================
    // FRIDAY: LEGS & SHOULDER
    // ===========================================
    "Legs & Shoulder": [
      /* ================= LEGS ================= */

      {
        id: "leg-1",
        name: "Barbell Squat",
        reps: "10-12",
        sets: "3 Main Sets",
        category: "Legs",
        note: "🔥 #1 Hardest & most important! Do first when strongest. If heavy, start with Hack Squat and switch to Barbell over time. 💪",
        tips: [
          "😤 Take deep breath, tighten tummy",
          "👉 Push knees out going down",
          "🚀 Drive up through middle of foot, not toes",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/BARBELL-SQUAT.gif",
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Sled-Hack-Squat.gif",
        ],
        video: [
          "https://youtube.com/embed/iKCJCydYYrE?si=TJB4U56YNpkLPxyz",
          "https://youtube.com/embed/vaU2FSmUhNc?si=UR2nOpm8tbGDFGIm",
        ],
        impact: ["💪 Strong quads", "🍑 Big glutes", "🏋️ Total leg power"],
      },

      {
        id: "leg-4",
        name: "Leg Press",
        reps: "10-12",
        sets: "2 Sets",
        category: "Legs",
        note: "🏋️ #2 Heavy machine move. Do after squats for more work without balance worry. 🚀",
        tips: ["❌ Don't lock knees", "🐌 Lower slow and steady"],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2015/11/Leg-Press.gif",
        ],
        video: ["https://youtube.com/embed/EotSw18oR9w?si=sWRVUvAy84KwsBfk"],
        impact: ["💪 Bigger quads", "🏋️ More leg size"],
      },

      {
        id: "leg-2",
        name: "Forward Lunges",
        reps: "10-12",
        sets: "2 Sets",
        category: "Legs",
        note: "🏃 #3 One-leg strength. Do when legs are warm but not tired. ⚖️",
        tips: [
          "🚶 Take big step forward",
          "🦵 Back knee touches floor lightly",
          "📏 Chest up, tummy tight",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lunge.gif",
        ],
        video: ["https://youtube.com/embed/YSuIZ6CbOQs?si=KdY87VwHtJpSk82i"],
        impact: ["💪 Strong quads", "🍑 Firm glutes", "⚖️ Better balance"],
      },

      {
        id: "leg-3",
        name: "Reverse Lunges",
        reps: "10-12",
        sets: "2 Sets",
        category: "Legs",
        note: "🦵 #4 Knee-friendly lunge. Easier on knees than forward ones. 😊",
        tips: ["⬅️ Step back slow", "🦵 Front knee stays steady"],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2022/09/Dumbell-reverse-lunge.gif",
        ],
        video: ["https://youtube.com/embed/38xlLGfguz4?si=fiwSRVEVK5kbsKHG"],
        impact: ["🍑 Strong glutes", "🦵 Tight hamstrings"],
      },

      {
        id: "leg-5",
        name: "Leg Extension",
        reps: "10-12",
        sets: "2 Sets",
        category: "Legs",
        note: "💪 #5 Quad focus. Do after heavy leg work. 🎯",
        tips: ["⏸️ Pause 1 sec at top", "🐌 Slow down on way back"],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/LEG-EXTENSION.gif",
        ],
        video: ["https://youtube.com/embed/iQ92TuvBqRo?si=rVR7-38AaxnNutf2"],
        impact: ["💪 Quads only"],
      },

      {
        id: "leg-9",
        name: "Leg Curl",
        reps: "10-12",
        sets: "2 Sets",
        category: "Legs",
        note: "🦵 #6 Hamstrings. Balance quads, protect knees. ⚖️",
        tips: ["🐌 Slow on the way down", "❌ Don't lift hips"],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/08/Seated-Leg-Curl.gif",
        ],
        video: ["https://youtube.com/embed/_lgE0gPvbik?si=WNsOc1jeRc9R42QC"],
        impact: ["🦵 Strong hamstrings"],
      },

      {
        id: "leg-6",
        name: "Hip Thrust",
        reps: "10-12",
        sets: "3 Sets",
        category: "Legs",
        note: "🍑 #7 Optional glute focus. Add if energy left. 💥",
        tips: ["👤 Chin tucked in", "🔒 Full hip lockout"],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Hip-Thrust.gif",
        ],
        video: ["https://youtube.com/embed/96uDbymTaHM?si=NrG3yGfbFscWYmJC"],
        impact: ["🍑 Big glutes", "🔗 Strong back chain"],
      },

      {
        id: "leg-7",
        name: "Standing Calf Raise",
        reps: "10-12",
        sets: "3 Sets",
        category: "Legs",
        note: "🦵 #8 Calf muscles. Stretch and squeeze hard. 💪",
        tips: ["⏸️ Pause at top", "📏 Full stretch at bottom"],
        image: [
          "https://burnfit.io/wp-content/uploads/2023/11/STD_CALF_RAISE.gif",
          "https://training.fit/wp-content/uploads/2020/03/wadenheben-stehend-geraet.png",
        ],
        video: ["https://youtube.com/embed/baEXLy09Ncc?si=UnOyS8ClYxZFdyCg"],
        impact: ["🦵 Strong calf top"],
      },

      {
        id: "leg-8",
        name: "Seated Calf Raise",
        reps: "10-12",
        sets: "4 Sets",
        category: "Legs",
        note: "🦵 #9 Deep calf. Do after standing ones. 🎯",
        tips: ["📏 Short, controlled moves", "🔄 Keep tension on"],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/06/Lever-Seated-Calf-Raise.gif",
        ],
        video: ["https://youtube.com/embed/pHm6LFuGGbs?si=GsNTPSIgvDZmK4De"],
        impact: ["🦵 Strong lower calf"],
      },

      {
        id: "leg-10",
        name: "Toe Raise",
        reps: "20 sec hold",
        sets: "1",
        category: "Legs",
        note: "🦵 #10 Finisher. Shin & ankle strength. Prevent injuries. 🛡️",
        tips: ["🐌 Slow, controlled moves"],
        image: [
          "https://m.media-amazon.com/images/I/61r+fVBDPrL._SX679_.jpg",
          "https://intowellness.in/wp-content/uploads/2024/10/Tibia_Dorsal_Flexion_Machine.jpg",
        ],
        video: ["https://youtube.com/embed/0LSazUIfThI?si=JximLVaseWHczWPy"],
        impact: ["🦵 Strong shin front"],
      },
      /* ================= SHOULDER ================= */

      {
        id: "sh-1",
        name: "Dumbbell Overhead Press",
        reps: "10-12",
        sets: "3 Main Sets",
        category: "Shoulder",
        note: "🏋️ Week 1. Start shoulders with dumbbells. 💪",
        tips: ["🤝 Neutral grip", "❌ No back arch"],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2023/09/Standing-Dumbbell-Overhead-Press.gif",
        ],
        video: ["https://youtube.com/embed/k6tzKisR3NY?si=-tEppXweec01YWDR"],
        impact: ["💪 Strong front shoulders", "🏋️ Shoulder power"],
      },

      {
        id: "sh-2",
        name: "Barbell Overhead Press",
        reps: "10-12",
        sets: "3 Main Sets",
        category: "Shoulder",
        note: "🏋️ Week 2. Heavier than dumbbells. 🚀",
        tips: ["🍑 Tight glutes", "📏 Bar goes straight"],
        image: [
          "https://media.tenor.com/CV1FfGVNpdcAAAAM/desenvolvimento-militar.gif",
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Shoulder-Press.gif",
        ],
        video: ["https://youtube.com/embed/zoN5EH50Dro?si=nuOkAiQrBV4Altd0"],
        impact: ["💪 Big shoulders", "🏋️ Upper body strength"],
      },

      {
        id: "sh-3",
        name: "Dumbbell Lateral Raise",
        reps: "10-12",
        sets: "2 Sets",
        category: "Shoulder",
        note: "🏋️ Week 1. Strict form only. 🎯",
        tips: ["⬆️ Lift to shoulder height", "🦵 Small elbow bend"],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lateral-Raise.gif",
        ],
        video: ["https://youtube.com/embed/Kl3LEzQ5Zqs?si=NivM87vJOi1scVss"],
        impact: ["💪 Wide side shoulders"],
      },

      {
        id: "sh-4",
        name: "Machine Lateral Raise",
        reps: "10-12",
        sets: "2 Sets",
        category: "Shoulder",
        note: "🏋️ Week 2. Steady tension. 🔄",
        tips: ["🐌 Slow reps", "❌ No jerking"],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/09/Lever-Lateral-Raise.gif",
        ],
        video: ["https://youtube.com/embed/uEBut4ea6as?si=TSd8w65D_5fS_DTA"],
        impact: ["💪 Wide side shoulders"],
      },

      {
        id: "sh-5",
        name: "Reverse Pec Deck / Face Pull",
        reps: "10-12",
        sets: "2 Sets",
        category: "Shoulder",
        note: "💪 Back shoulders & posture. 📏",
        tips: ["👈 Pull elbows wide", "⏸️ Pause at squeeze"],
        image: [
          "https://burnfit.io/wp-content/uploads/2023/11/REV_PEC_DECK_MC.gif",
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Face-Pull.gif",
        ],
        video: [
          "https://youtube.com/embed/7tgx6QHB0-A?si=wHmrlabC4mzM-ciZ",
          "https://youtube.com/embed/IeOqdw9WI90?si=qaY_IerfJjQXkfmO",
        ],
        impact: ["💪 Strong back shoulders", "🦴 Better upper back"],
      },

      {
        id: "sh-6",
        name: "External Rotation Dumbbell",
        reps: "10-12",
        sets: "2 Sets",
        category: "Shoulder",
        note: "🛡️ Shoulder health. Use light weight. 😊",
        tips: ["🪶 Very light", "🐌 Slow and steady"],
        image: [
          "https://liftmanual.com/wp-content/uploads/2023/04/dumbbell-seated-external-rotation.jpg",
          "https://gymvisual.com/img/p/2/7/3/2/6/27326.gif",
        ],
        impact: ["🛡️ Stable shoulders"],
      },
    ],

    // ===========================================
    // SATURDAY: CROSSFIT & CARDIO
    // ===========================================
    "CrossFit & Cardio": [
      {
        id: "sat-1",
        name: "Cardio (any)",
        reps: "5 min",
        sets: "1",
        category: "Cardio",
        note: "Warmup",
      }, // [cite: 23]
      {
        id: "sat-2",
        name: "Mobility drills",
        reps: "Duration",
        sets: "1",
        category: "Mobility",
        note: null,
      }, // [cite: 23]
      {
        id: "sat-3",
        name: "Weight training / crunches",
        reps: "Duration",
        sets: "1",
        category: "Circuit",
        note: null,
      }, // [cite: 23]
      {
        id: "sat-4",
        name: "Cardio (any)",
        reps: "30 mins",
        sets: "1",
        category: "Cardio",
        note: "Low Intensity",
      }, // [cite: 23]
      {
        id: "sat-5",
        name: "Passive stretch",
        reps: "After workout",
        sets: "1",
        category: "Mobility",
        note: null,
      }, // [cite: 23]
    ],
  },
};

// =========================
// VERSIONING (REQUIRED EXPORT)
// =========================

export const CATEGORY_ORDER = [
  "Abs",
  "Light Cardio",
  "Cardio",
  "Stretching",
  "Mobility",
  "Chest",
  "Triceps",
  "Back",
  "Biceps",
  "Legs",
  "Shoulder",
];

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
