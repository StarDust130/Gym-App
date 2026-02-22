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
  planName: "Fitness Passion Gym (Intermediate - Skinny Fat Fix)",

  // ✅ CORRECTED SCHEDULE: High Intensity to burn Trunk Fat
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
    // MONDAY: BACK & BICEPS (Pull Day)
    // ===========================================
    "Back , Biceps & Forearms": [
      /* ================= BACK (4 DISTINCT MOVES) ================= */
      {
        id: "bk-1",
        name: "Bent-Over Barbell Row",
        reps: "6-8",
        sets: "4 sets",
        category: "Back",
        note: "🔥 EXERCISE 1. HEAVY WEIGHT .",
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
        name: "Lat Pulldown (Mid Grip)",
        reps: "8-10",
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

      /* ================= BICEPS (3 DISTINCT ANGLES) ================= */
      {
        id: "bi-1",
        name: "Barbell Curl (Standing)",
        reps: "6-8",
        sets: "4 sets",
        category: "Biceps",
        note: "💪 EXERCISE 5. MASS  Heavy loading. Fundamental.",
        tips: ["Elbows tucked by ribs", "No swinging", "Squeeze hard at top"],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Curl.gif",
        ],
        video: ["https://youtube.com/embed/54x2WF1_Suc?si=Krs73Ki6rbcjMNkV"],
        impact: ["Overall Bicep Size", "Thickness"],
      },
      {
        id: "bi-2",
        name: "Cable Bayesian Curl",
        reps: "8-12",
        sets: "3 sets",
        category: "Biceps",
        note: "🏔️ EXERCISE 6. PEAK (Long Head). The incline stretches the outer bicep. Critical for the 'Peak'.",
        tips: [
          "Bench at 45-60 degrees",
          "Let arms hang fully behind you",
          "Keep elbows back",
        ],
        image: [
          "https://barbend.com/wp-content/uploads/2023/09/bayesian-cable-curl-barbend-movement-gif-masters.gif",
        ],
        video: ["https://youtube.com/embed/Q3rF30Wqp6s?si=qP39-Cg_PGha1oB-"],
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
      {
        id: "fa-3",
        name: "Farmer's Walk (Heavy Dumbbells)",
        reps: "30-60 Seconds",
        sets: "3 sets",
        category: "Forearm",
        note: "🚶 EXERCISE 10. GRIP STRENGTH. Walk with heavy dumbbells to build crushing grip and forearm density.",
        tips: [
          "Choose heavy dumbbells you can hold for 30-60 seconds",
          "Keep shoulders back and chest up",
          "Walk with controlled steps, maintaining grip on the weights",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2022/02/Farmers-walk_Cardio.gif",
        ],
        video: ["https://youtube.com/embed/1uOs1hP3u4A?si=16CYmd3nLgk57LPu"],
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
    // WEDNESDAY: CHEST & TRICEPS (Push Day)
    // ===========================================
    "Chest & Triceps": [
      /* ================= CHEST (3 MOVES - BUILD THE ARMOR) ================= */
      {
        id: "ch-2",
        name: "Incline Dumbbell Press",
        reps: "8-10",
        sets: "3 sets",
        category: "Chest",
        note: "🦍 BEAST MODE. The most important lift for wide shoulders. Go Heavy.",
        tips: [
          "✅ Set bench to 30° (Standard Incline)",
          "✅ Lower slowly (3 sec count) ⬇️",
          "✅ Explode up fast (1 sec count) 🚀",
          "❌ Don't bounce the weights",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Dumbbell-Press.gif",
        ],
        video: ["https://youtube.com/embed/8fXfwG4ftaQ?si=A0zwKBil2ghFddlw"],
        impact: ["Upper Chest Shelf", "3D Shoulders"],
      },

      {
        id: "ch-1",
        name: "Flat Dumbbell Press",
        reps: "8-10",
        sets: "3 sets",
        category: "Chest",
        note: "🦍 GO HEAVY. Empty the tank here. Build pure mass.",
        tips: [
          "✅ Plant feet hard on the floor 🦶",
          "✅ Tuck elbows slightly (Arrow shape 🏹)",
          "✅ Press weights together at the top",
          "❌ Do not let dumbbells touch your chest",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Press.gif",
        ],
        video: ["https://youtube.com/embed/WbCEvFA0NJs?si=Dfojxgl3MGzpgFk2"],
        impact: ["Thick Chest", "Raw Power"],
      },

      {
        id: "ch-new",
        name: "Pec Deck Fly (Machine)",
        reps: "12-15",
        sets: "3 sets",
        category: "Chest",
        note: "🛡️ STRICT FORM. Don't be an ego lifter. Squeeze hard.",
        tips: [
          "✅ Elbows high (Parallel to floor)",
          "✅ Squeeze handles like crushing a melon 🍉",
          "✅ Hold the squeeze for 1 second",
          "❌ Don't use your shoulders to push",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Pec-Deck-Fly.gif",
        ],
        video: ["https://youtube.com/embed/a9vQ_hwIksU?si=kNxflN9SAfw6EdCC"],
        impact: ["Inner Chest Line", "Sharp Definition"],
      },

      /* ================= TRICEPS (3 MOVES - BUILD THE HORSESHOE) ================= */
      {
        id: "tr-1",
        name: "Assisted Dip Machine",
        reps: "10-12",
        sets: "3 sets",
        category: "Triceps",
        note: "👑 THE KING. The best move for big arms. Go as heavy as you can.",
        tips: [
          "✅ Keep chest up & torso straight 🧍",
          "✅ Lower only to 90 degrees (L-shape)",
          "✅ Lock your elbows at the top 🔒",
          "❌ Don't lean forward (That hits chest)",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2022/11/Asisted-Triceps-Dips.gif",
        ],
        video: ["https://youtube.com/embed/LH9iZNaO7oU?si=t-NMoDG_7o-emsMD"],
        impact: ["Massive Triceps", "Arm Thickness"],
      },

      {
        id: "tr-new-1",
        name: "Seated Overhead DB Extension",
        reps: "10-12",
        sets: "3 sets",
        category: "Triceps",
        note: "📏 STRETCH IT. This makes your arm look huge from the side.",
        tips: [
          "✅ Hold ONE heavy dumbbell with both hands 🤲",
          "✅ Keep elbows pointing up (Don't flare out)",
          "✅ Feel the deep stretch behind your head",
          "❌ Don't arch your back",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/06/Seated-Dumbbell-Triceps-Extension.gif",
        ],
        video: ["https://youtube.com/embed/b_r_LW4HEcM?si=Wfkv8SIphpyTCuHH"],
        impact: ["Long Head Growth", "Sleeve Buster"],
      },

      {
        id: "tr-new-2",
        name: "Tricep Machine Press",
        reps: "12-15",
        sets: "3 sets",
        category: "Triceps",
        note: "🔥 BURN OUT. Finish the workout. Reps until you can't move.",
        tips: [
          "✅ Keep constant tension (Don't stop)",
          "✅ Push down hard & fast ⚡",
          "✅ Squeeze the back of your arm",
          "❌ Don't shrug your shoulders",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/04/Lever-Overhand-Triceps-Dip.gif",
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Bench-Dips.gif",
        ],
        video: ["https://youtube.com/embed/QYktfOJRyfU?si=m2j1DK6La4ItPT3s"],
        impact: ["Horseshoe Detail", "Vein Popper"],
      },
    ],

    // ===========================================
    // THURSDAY: CARDIO & STRETCHING (Empty the Tank)
    // ===========================================
    "Cardio Day": [
      /* ================= PHASE 1: THE IGNITER (20 MINS) ================= */
      {
        id: "cardio-1",
        name: "Phase 1: HIIT (Spin Bike or Elliptical)",
        reps: "20 Mins",
        sets: "1 set",
        category: "Cardio",
        target: "🎯 BURN GOAL: 200 Calories (High Intensity)",
        note: "🚀 IGNITE. Use the Bike or Elliptical here to sprint safely.",
        tips: [
          "🔥 0-5 Mins: Warm Up (Moderate)",
          "⚡ 5-20 Mins: 30 Sec SPRINT (Max Resistance) / 30 Sec REST",
          "🥵 Empty the tank here. Deplete your sugar stores.",
          "💧 Drink water immediately after.",
        ],
        image: [
          "https://media.tenor.com/lEy7Yw63vQUAAAAM/beast-mode-cardio.gif",
        ],
        impact: ["Metabolic Spike", "Glycogen Depletion"],
      },

      /* ================= PHASE 2: THE FURNACE (40 MINS) ================= */
      {
        id: "cardio-2",
        name: "Phase 2: Stair Climber (or Incline Treadmill)",
        reps: "40 Mins",
        sets: "1 set",
        category: "Cardio",
        target: "🎯 BURN GOAL: 350+ Calories (Total Day: 550+)",
        note: "💀 THE GRIND. The Stair Climber is King for fat loss. Do it.",
        tips: [
          "🧗‍♂️ OPTION A (Best): Stair Climber. Moderate pace. Do not lean on rails too much.",
          "⛰️ OPTION B (Easier): Incline Treadmill. Max Incline (12-15%), Speed 3-4. No running.",
          "❤️ Zone 2: You should be sweating heavy but able to breathe.",
          "🧠 Mental Game: This is where the belly fat burns. Don't quit.",
        ],
        image: [
          "https://media.tenor.com/eXlIRe28PVgAAAAm/bubu-dudu-bubu.webp",
          "https://media.tenor.com/HXbs_-Rwqj4AAAAm/train-trainer.webp",
        ],
        impact: ["Visceral Fat Melt", "Glute/Calf Muscle"],
      },
    ],

    // ===========================================
    // FRIDAY: LEGS & SHOULDER (Volume Day)
    // ===========================================
    "Legs & Shoulder": [
      /* ================= LEGS (5 MOVES - MASS) ================= */
      {
        id: "leg-1",
        name: "Barbell Squat",
        reps: "8-10",
        sets: "3 Sets",
        category: "Legs",
        note: "🔥 EXERCISE 1. THE KING. Releases the most testosterone. Do not skip.",
        tips: [
          "😤 Take deep breath into belly",
          "👉 Push knees out",
          "🚀 Drive up through mid-foot",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/BARBELL-SQUAT.gif",
        ],
        video: ["https://youtube.com/embed/iKCJCydYYrE?si=TJB4U56YNpkLPxyz"],
        impact: ["Total Body Growth", "Leg Mass"],
      },

      {
        id: "leg-4",
        name: "Leg Press",
        reps: "10-12",
        sets: "3 Sets",
        category: "Legs",
        note: "🏋️ EXERCISE 2. VOLUME. Your legs are skinny. Load this heavy.",
        tips: [
          "❌ Don't lock knees at top",
          "🐌 Lower weight slowly (3 sec)",
          "🦶 Feet shoulder width",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2015/11/Leg-Press.gif",
        ],
        video: ["https://youtube.com/embed/EotSw18oR9w?si=sWRVUvAy84KwsBfk"],
        impact: ["Quad Thickness", "Thigh Size"],
      },

      {
        id: "leg-9",
        name: "Seated Leg Curl",
        reps: "12-15",
        sets: "3 Sets",
        category: "Legs",
        note: "🦵 EXERCISE 3. HAMSTRINGS. Essential for balance.",
        tips: [
          "🐌 Slow on the way down",
          "❌ Don't lift hips off seat",
          "Squeeze hard at bottom",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/08/Seated-Leg-Curl.gif",
        ],
        video: ["https://youtube.com/embed/_lgE0gPvbik?si=WNsOc1jeRc9R42QC"],
        impact: ["Hamstring Isolation", "Knee Health"],
      },

      {
        id: "leg-5",
        name: "Leg Extension",
        reps: "12-15",
        sets: "3 Sets",
        category: "Legs",
        note: "💪 EXERCISE 4. QUAD DETAIL. The teardrop muscle.",
        tips: ["⏸️ Pause 1 sec at top", "🐌 Control the drop", "Burn it out"],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/LEG-EXTENSION.gif",
        ],
        video: ["https://youtube.com/embed/iQ92TuvBqRo?si=rVR7-38AaxnNutf2"],
        impact: ["Quad Definition", "Aesthetics"],
      },

      {
        id: "leg-7",
        name: "Standing Calf Raise",
        reps: "15-20",
        sets: "3 Sets",
        category: "Legs",
        note: "🦵 EXERCISE 5. CALVES. Do not bounce. Full stretch.",
        tips: [
          "⏸️ Pause at top for 2 seconds",
          "📏 Full stretch at bottom",
          "High reps for growth",
        ],
        image: [
          "https://burnfit.io/wp-content/uploads/2023/11/STD_CALF_RAISE.gif",
        ],
        video: ["https://youtube.com/embed/baEXLy09Ncc?si=UnOyS8ClYxZFdyCg"],
        impact: ["Calf Size", "Ankle Stability"],
      },

      /* ================= SHOULDER (3 MOVES - V-TAPER) ================= */

      {
        id: "sh-1",
        name: "Dumbbell Overhead Press",
        reps: "8-10",
        sets: "3 Sets",
        category: "Shoulder",
        note: "🏋️ EXERCISE 6. MASS. Best for shoulder growth.",
        tips: [
          "🤝 Neutral grip or palms forward",
          "❌ No back arching",
          "Drive up to ears",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2023/09/Standing-Dumbbell-Overhead-Press.gif",
        ],
        video: ["https://youtube.com/embed/k6tzKisR3NY?si=-tEppXweec01YWDR"],
        impact: ["Front Delts", "Overhead Strength"],
      },

      {
        id: "sh-3",
        name: "Dumbbell Lateral Raise",
        reps: "12-15",
        sets: "3 Sets",
        category: "Shoulder",
        note: "🏋️ EXERCISE 7. WIDTH. This makes you look wide.",
        tips: [
          "⬆️ Lift to shoulder height",
          "🦵 Slight elbow bend",
          "Lead with elbows, not hands",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lateral-Raise.gif",
        ],
        video: ["https://youtube.com/embed/Kl3LEzQ5Zqs?si=NivM87vJOi1scVss"],
        impact: ["Side Delts", "V-Taper Look"],
      },

      {
        id: "sh-5",
        name: "Face Pull (Rope)",
        reps: "15-20",
        sets: "3 Sets",
        category: "Shoulder",
        note: "💪 EXERCISE 8. POSTURE. Fixes rounded shoulders.",
        tips: [
          "👈 Pull rope to forehead",
          "⏸️ Squeeze rear delts",
          "Keep elbows high",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Face-Pull.gif",
        ],
        video: ["https://youtube.com/embed/IeOqdw9WI90?si=ut3MrakJbINIpt8k"],
        impact: ["Rear Delts", "Shoulder Health"],
      },
    ],

    // ===========================================
    // SATURDAY: CROSSFIT & CARDIO (Metabolic Conditioning)
    // ===========================================
    "CrossFit & Cardio": [
      /* ================= PART 1: THE CIRCUIT (20 MINS) ================= */
      /* 4 Rounds. No Rest between moves. 90s Rest after the 4th move. */

      {
        id: "cf-new",
        name: "Renegade Rows (Pushup Position)",
        reps: "12 Reps (Total)",
        sets: "4 Rounds",
        category: "CrossFit",
        target: "🎯 GOAL: Hips stay flat (Don't twist)",
        note: "🧱 REPLACES SLAMS. The ultimate core builder. Hold a plank, pull DB to hip.",
        tips: [
          "Feet wide for balance",
          "Squeeze abs hard (pretend getting punched)",
          "Row weight to hip without twisting body",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/01/dumbbell-renegade-row-1.gif",
          "https://fitnessprogramer.com/wp-content/uploads/2022/07/Push-Up-to-Renegade-Row.gif",
        ],
        video: [
          "https://youtube.com/embed/qmZJhocQVlM?si=g3UUigzlEeOAl8Fn",
          "https://youtube.com/embed/4E-tCquxn_4?si=gEKOU-M-GTamhERM",
        ],
        impact: ["Deep Core Stability", "V-Taper Back"],
      },

      {
        id: "cf-2",
        name: "Battle Ropes",
        reps: "30 Seconds",
        sets: "4 Rounds",
        category: "CrossFit",
        target: "🎯 GOAL: Make waves all the way to anchor",
        note: "🌊 SHOULDER BURN. Use the heavy ropes. Go 100% intensity.",
        tips: [
          "Sit in a half-squat",
          "Alternating waves fast",
          "Keep chest up",
        ],
        image: ["https://burnfit.io/wp-content/uploads/2023/11/BAT_ROPE.gif"],
        video: ["https://youtube.com/embed/ZEAqK0lXnb0?si=d1LcyM5ntzCrp_0z"],
        impact: ["Shoulder Stamina", "Heart Rate Spike"],
      },

      {
        id: "cf-3",
        name: "Burpees",
        reps: "12 Reps",
        sets: "4 Rounds",
        category: "CrossFit",
        target: "🎯 GOAL: Chest to floor every time",
        note: "💀 FAT MELTER. This burns the belly fat.",
        tips: ["Drop fast", "Explode up", "Clap behind head"],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/10/Jack-Burpees.gif",
          "https://i.giphy.com/lEYcevSwZ55Go.webp",
        ],
        video: ["https://youtube.com/embed/uK-jIQxnHec?si=uwatSeQx7akgG76n"],
        impact: ["Total Body Conditioning", "Calorie Burn"],
      },

      {
        id: "cf-4",
        name: "Kettlebell Swing (or DB Swing)",
        reps: "15 Reps",
        sets: "4 Rounds",
        category: "CrossFit",
        target: "🎯 GOAL: Snap the hips",
        note: "🍑 POSTERIOR CHAIN. Hits the weak legs and lower back.",
        tips: [
          "Hinge at hips (butt back)",
          "Squeeze glutes to launch weight",
          "Do not use arms to lift",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/09/Kettlebell-Swings.gif",
        ],
        video: ["https://youtube.com/embed/n1df4ASFeZU?si=eHDrgqhRFPWVVuhl"],
        impact: ["Hamstrings", "Glute Power"],
      },

      /* ================= PART 2: THE FLUSH (30 MINS) ================= */
      {
        id: "cardio-finisher",
        name: "Steady State Cardio (Incline Walk)",
        reps: "30 Mins",
        sets: "1",
        category: "Cardio",
        target: "🎯 BURN GOAL: 300 Calories",
        note: "🧊 COOL DOWN. Walk it off. Burn the mobilized fat.",
        tips: ["Treadmill Incline 10-12", "Speed 3.5 - 4.0", "Deep breaths"],
        image: [
          "https://media.tenor.com/eXlIRe28PVgAAAAm/bubu-dudu-bubu.webp",
          "https://media.tenor.com/HXbs_-Rwqj4AAAAm/train-trainer.webp",
        ],
        impact: ["Visceral Fat Loss", "Recovery"],
      },
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
