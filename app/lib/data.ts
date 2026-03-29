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
  planName: "Thor Plan 😎",

  schedule: {
    Monday: "Push A (Heavy)",
    Tuesday: "Pull A",
    Wednesday: "Legs A (Quad Focus + Core)",
    Thursday: "Push B (Hypertrophy)",
    Friday: "Pull B (Width + Arms + Forearms)",
    Saturday: "Legs B (Posterior Chain)",
    Sunday: "Rest Day",
  },

  workouts: {
    // ===========================================
    // MONDAY: PUSH A (Heavy Pressing)
    // ===========================================
    "Push A (Heavy)": [
      {
        id: "pa-1",
        name: "Flat Dumbbell Press",
        reps: "8-12",
        sets: "4 sets",
        category: "Chest",
        note: "🦍 EXERCISE 1. MAXIMUM STRETCH. Drop the ego. Control the negative for 3 seconds to maximize hypertrophy and fix imbalances.",
        tips: [
          "Lower the dumbbells past your torso for a deep chest stretch",
          "Tuck elbows to a 45-degree angle to protect shoulder joints",
          "Drive feet firmly into the floor with a slight lower back arch",
          "Push up and converge at the top, but do not clash the dumbbells together",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Press.gif",
        ],
        video: ["https://youtube.com/embed/WbCEvFA0NJs?si=ru27-GXp6aehAK3U"],
        impact: [
          "Maximal Pectoral Hypertrophy",
          "Symmetrical Chest Development",
        ],
      },
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
        id: "pa-3",
        name: "Barbell/ Dumbbell Overhead Press",
        reps: "6-8",
        sets: "3 sets",
        category: "Shoulder",
        note: "🔥 EXERCISE 3. VERTICAL PUSH. Do not lean back. Squeeze your core.",
        tips: [
          "Keep wrists straight",
          "Push head through at the top",
          "Do not use leg drive (Strict press)",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Overhead-Press.gif",
          "https://fitnessprogramer.com/wp-content/uploads/2023/09/Standing-Dumbbell-Overhead-Press.gif",
        ],
        video: [
          "https://www.youtube.com/embed/QAQ64hK4Xxs",
          "https://youtube.com/embed/k6tzKisR3NY",
        ],
        impact: ["Front Delts", "Shoulder Width"],
      },
      {
        id: "sh-3",
        name: "Dumbbell Lateral Raise",
        reps: "12-15",
        sets: "3 sets",
        category: "Shoulder",
        note: "🏋️ EXERCISE 4. WIDTH. This makes you look wide. Control the negative.",
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
        id: "pa-5",
        name: "Overhead Dumbbell Extension",
        reps: "12",
        sets: "3 sets",
        category: "Triceps",
        note: "🔥 EXERCISE 5. ISOLATION. Lock your elbows to your ribs. Do not use your shoulders.",
        tips: [
          "Keep chest up",
          "Push straight down and lock out",
          "Slow release back up",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Triceps-Extension.gif",
        ],
        video: ["https://youtube.com/embed/b_r_LW4HEcM?si=8jpzkFzsjn1BE1LS"],
        impact: ["Tricep Horseshoe", "Arm Thickness"],
      },
    ],

    // ===========================================
    // TUESDAY: PULL A (Heavy Rows)
    // ===========================================
    "Pull A": [
      {
        id: "bk-1",
        name: "Bent-Over Barbell Row",
        reps: "5-8",
        sets: "4 sets",
        category: "Back",
        note: "🔥 EXERCISE 1. HEAVY WEIGHT. Build the thickness.",
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
        reps: "10-12",
        sets: "3 sets",
        category: "Back",
        note: "🎯 EXERCISE 3. ISOLATION. Targets mid-back without lower back strain.",
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
        id: "bi-1",
        name: "Barbell Curl (Standing)",
        reps: "6-8",
        sets: "3 sets",
        category: "Biceps",
        note: "💪 EXERCISE 4. MASS. Heavy loading. Fundamental.",
        tips: ["Elbows tucked by ribs", "No swinging", "Squeeze hard at top"],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Curl.gif",
        ],
        video: ["https://youtube.com/embed/54x2WF1_Suc?si=Krs73Ki6rbcjMNkV"],
        impact: ["Overall Bicep Size", "Thickness"],
      },
      {
        id: "sh-5",
        name: "Face Pull (Rope)",
        reps: "12-15",
        sets: "3 sets",
        category: "Shoulder",
        note: "💪 EXERCISE 5. POSTURE. Fixes rounded shoulders. Crucial for rear delts.",
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
    // WEDNESDAY: LEGS A (Quad Focus + Core)
    // ===========================================
    "Legs A (Quad Focus + Core)": [
      {
        id: "leg-1",
        name: "Barbell Squat",
        reps: "5-8",
        sets: "4 Sets",
        category: "Legs",
        note: "🔥 EXERCISE 1. THE KING. Releases testosterone. Do not skip.",
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
        reps: "10",
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
        id: "leg-5",
        name: "Leg Extension",
        reps: "12-15",
        sets: "3 Sets",
        category: "Legs",
        note: "💪 EXERCISE 3. QUAD DETAIL. The teardrop muscle. Burn it out.",
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
        reps: "15",
        sets: "4 Sets",
        category: "Legs",
        note: "🦵 EXERCISE 4. CALVES. Do not bounce. Full stretch.",
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
      {
        id: "abs-3",
        name: "Hanging Leg Raise",
        reps: "12",
        sets: "3 sets",
        category: "Abs",
        note: "🔥 EXERCISE 5. LOWER ABS. Hang strict. No swinging.",
        tips: [
          "🚫 Do not use momentum",
          "🦵 Legs straight (or knees up if failing)",
          "⬇️ Control the drop slowly",
        ],
        image: [
          "https://ccuuubmtdurkmbeufybi.supabase.co/storage/v1/object/public/animations/0826.gif",
        ],
        video: ["https://youtube.com/embed/XQc0WHO90Lk?si=xf8AsOrWQ6x_ueJm"],
        impact: ["Lower Abs", "V-Cut"],
      },
      {
        id: "abs-6",
        name: "Plank (Strict Hold)",
        reps: "60 Secs",
        sets: "2 sets",
        category: "Abs",
        note: "🛡️ EXERCISE 6. CORE LOCK. Squeeze everything.",
        tips: [
          "🍑 Glutes tight (Squeeze them)",
          "⚓ Belly button pulled to spine",
          "📉 No sagging hips!",
        ],
        image: ["https://www.inspireusafoundation.org/file/2022/01/plank.gif"],
        video: ["https://youtube.com/embed/ftSgOmyQyEg?si=u6PPn6keN49-9mV8"],
        impact: ["Deep Core", "Posture"],
      },
    ],

    // ===========================================
    // THURSDAY: PUSH B (Hypertrophy)
    // ===========================================
    "Push B (Hypertrophy)": [
      {
        id: "pb-1",
        name: "Incline Machine Press",
        reps: "10-12",
        sets: "3 sets",
        category: "Chest",
        note: "⚙️ EXERCISE 1. UPPER CHEST TISSUE. Machine stability lets you push to total failure safely without a spotter.",
        tips: [
          "Keep elbows slightly tucked",
          "Press through the heel of your palms",
          "Control the 3-second descent",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Chest-Press-Machine.gif",
        ],
        video: ["https://youtube.com/embed/i3e4CG5tnfs"],
        impact: ["Upper Pecs", "Absolute Failure Targeting"],
      },
      {
        id: "ch-fly",
        name: "Machine Pec Deck Fly",
        reps: "12-15",
        sets: "3 sets",
        category: "Chest",
        note: "🦋 EXERCISE 2. INNER CHEST ISOLATION. You pressed heavy on Monday. Today you stretch and squeeze the fibers across your body.",
        tips: [
          "✅ Keep a slight bend in your elbows",
          "✅ Squeeze the handles together and hold for 1 second",
          "✅ Control the negative until you feel a deep stretch",
          "❌ Do not use momentum from your torso",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Pec-Deck-Fly.gif",
        ],
        video: ["https://youtube.com/embed/eGjt4jcEA_Q"],
        impact: ["Inner Chest Detail", "Chest Width"],
      },
      {
        id: "sh-mach-lat",
        name: "Machine Lateral Raise",
        reps: "12-15",
        sets: "3 sets",
        category: "Shoulder",
        note: "⚙️ EXERCISE 3. CONSTANT TENSION. Superior to dumbbells because the machine keeps maximum mechanical tension on the side delt at all times.",
        tips: [
          "Adjust the seat so the pivot point aligns with your shoulder joint.",
          "Drive the weight up with your elbows, not your hands.",
          "Slow, controlled negative. Do not let the weight stack slam.",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/09/Lever-Lateral-Raise.gif",
        ],
        video: ["https://youtube.com/embed/ZzEhoH0K2A0"],
        impact: ["Side Delts", "3D Shoulders"],
      },
      {
        id: "pb-5",
        name: "Weighted Tricep Dips",
        reps: "8-12",
        sets: "3 sets",
        category: "Triceps",
        note: "🧱 EXERCISE 4. MASS BUILDER. The S-Tier compound movement for overall arm thickness. Pushes the pre-exhausted triceps to absolute failure.",
        tips: [
          "Keep your torso upright (vertical) to shift 90% of the load onto the triceps.",
          "Lower yourself until your elbows are at a 90-degree angle; do not go deeper.",
          "Keep elbows tucked close to your ribs—do not let them flare out.",
          "Add a plate to a dip belt once bodyweight is too easy.",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/04/CHAIR-DIPS.gif",
        ],
        video: ["https://youtube.com/embed/2z8JmcrW-As"],
        impact: ["Tricep Medial Head", "Lower Chest Integration"],
      },
      {
        id: "pb-cardio-top",
        name: "High-Intensity Spin Sprints 🚲🔥",
        reps: "15 Mins",
        sets: "10 Intervals",
        category: "Fat Loss / Core",
        target: "150-200 Calories",
        note: "🏆 EXERCISE 5. FAT BURN. Standing sprints force core stabilization, flushing the system while burning fat fast.",
        image: ["https://i.giphy.com/TWH3IIPuGyxsOpOZin.webp"],
        tips: [
          "30s All-out sprint (Stand up if possible).",
          "60s Slow recovery (Sit down).",
          "Tighten your abs throughout the sprint phase.",
          "Increase resistance until it feels like pedaling through mud.",
        ],
        impact: ["Visceral Fat Loss 💣", "Core Tightening 🦾"],
      },
    ],

    // ===========================================
    // FRIDAY: PULL B (Width + Arms + Forearms)
    // ===========================================
    "Pull B (Width + Arms + Forearms)": [
      {
        id: "plb-1",
        name: "Pull Ups (or Assisted)",
        reps: "To Failure",
        sets: "4 sets",
        category: "Back",
        note: "🦅 EXERCISE 1. THE V-TAPER KING. Use an assisted band/machine if you cannot do 8 strict reps yet.",
        tips: [
          "Start from a dead hang",
          "Drive elbows down",
          "Chest touches the bar",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Pull-up.gif",
        ],
        video: ["https://www.youtube.com/embed/eGo4IYtl4hNd"],
        impact: ["Lat Width", "Upper Back"],
      },
      {
        id: "bk-tbar",
        name: "Chest-Supported Machine Row",
        reps: "10-12",
        sets: "3 sets",
        category: "Back",
        note: "🎯 EXERCISE 2. UPPER BACK DENSITY. Paralyzes the lower back so 100% of the force goes into the rhomboids. Saves your spine for tomorrow's RDLs.",
        tips: [
          "Jam your chest hard into the pad.",
          "Pull your elbows back and squeeze your shoulder blades together.",
          "Do not lift your chest off the pad to cheat the weight up.",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Lever-T-bar-Row.gif",
        ],
        video: ["https://youtube.com/embed/G8l_8chR5BE"],
        impact: ["Mid-Back Thickness", "Lower Back Safety"],
      },
      {
        id: "plb-3",
        name: "Straight Arm Lat Pulldown",
        reps: "12",
        sets: "3 sets",
        category: "Back",
        note: "🔪 EXERCISE 3. ISOLATION. Pure lat activation without using your biceps.",
        tips: [
          "Keep arms straight with a slight bend in elbows",
          "Push the bar down to your thighs",
          "Hinge slightly forward at the hips",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Straight-Arm-Lat-Pulldown.gif",
        ],
        video: ["https://www.youtube.com/embed/GjxNfL-I7Sg"],
        impact: ["Lat Sweep", "Back Width"],
      },
      {
        id: "bi-2",
        name: "Machine Preacher Curl",
        reps: "10-12",
        sets: "3 sets",
        category: "Biceps",
        note: "⚙️ EXERCISE 4. S-TIER ISOLATION. Paralyzes the shoulder joint. Forces 100% mechanical tension directly into the short head.",
        tips: [
          "Jam your armpits tightly over the top of the pad. Zero gap allowed.",
          "Keep your triceps glued to the pad. If your elbows lift, you are shifting tension.",
          "Strict 3-second negative (lowering) phase. Do not drop the weight.",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/04/Lever-Preacher-Curl.gif",
        ],
        video: ["https://youtube.com/embed/P13VQDU1q9c?si=87UGfs0V_H9wmy7b"],
        impact: [
          "Bicep Short Head (Width & Fullness)",
          "Zero Momentum Isolation",
        ],
      },
      {
        id: "bi-3",
        name: "Seated Hammer Curl",
        reps: "12",
        sets: "3 sets",
        category: "Biceps",
        note: "🔨 EXERCISE 5. WIDTH. Targets the brachialis to push your bicep up.",
        tips: [
          "Sit upright on a bench with back support.",
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
      {
        id: "plb-6",
        name: "Wrist Curl",
        reps: "15",
        sets: "3 sets",
        category: "Forearm",
        note: "🔥 EXERCISE 6. FOREARM FLEXORS. Constant tension to build thick, vascular forearms.",
        tips: [
          "Rest forearms on a bench",
          "Let the weight unroll to your fingertips",
          "Curl wrists up forcefully",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Wrist-Curl.gif",
        ],
        video: ["https://youtube.com/embed/C2IYWXb64M4?si=mN0qkPYwGXI_m-D6"],
        impact: ["Inner Forearm Pop", "Vascularity"],
      },
    ],

    // ===========================================
    // SATURDAY: LEGS B (Posterior Chain)
    // ===========================================
    "Legs B (Posterior Chain)": [
      {
        id: "lb-1",
        name: "Barbell Romanian Deadlift (RDL)",
        reps: "8",
        sets: "4 sets",
        category: "Legs",
        note: "🍑 EXERCISE 1. HEAVY HINGE. The ultimate hamstring and glute builder to raise your BMR.",
        tips: [
          "Push your hips back as far as possible",
          "Keep the bar sliding down your legs",
          "Do not round your lower back",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Romanian-Deadlift.gif",
        ],
        video: [
          "https://youtube.com/embed/uTA4GWNwUEo",
          "https://www.youtube.com/embed/JCXUYuzwNrM",
        ],
        impact: ["Hamstring Mass", "Glute Power"],
      },
      {
        id: "leg-9",
        name: "Seated Leg Curl",
        reps: "12",
        sets: "3 Sets",
        category: "Legs",
        note: "🦵 EXERCISE 2. HAMSTRING ISOLATION. Lock yourself in and burn them out.",
        tips: [
          "🐌 Slow on the way down",
          "❌ Don't lift hips off seat",
          "Squeeze hard at bottom",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/08/Seated-Leg-Curl.gif",
        ],
        video: ["https://youtube.com/embed/_lgE0gPvbik?si=WNsOc1jeRc9R42QC"],
        impact: ["Hamstring Detail", "Knee Health"],
      },
      {
        id: "lb-3",
        name: "Machine Hip Thrust",
        reps: "10-12",
        sets: "3 sets",
        category: "Legs",
        note: "🍑 EXERCISE 3. S-TIER GLUTE ISOLATION. Eliminates barbell setup time and stabilization tax. Pure mechanical tension.",
        tips: [
          "Fasten the seatbelt tightly across your pelvic bone, not your stomach.",
          "Tuck your chin to your chest to keep your spine neutral.",
          "Drive hard through your heels, not your toes.",
          "Violent 2-second squeeze at the top of the movement.",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2022/02/Hip-Thrust-Machine.gif",
        ],
        video: ["https://youtube.com/embed/m8g9VogoxMo?si=SGgX7GCmSkHh9w3s"], // Update with actual machine video
        impact: [
          "Deep Glute Growth 🍑",
          "Zero Lower Back Strain 🦾",
          "Time Efficiency ⏱️",
        ],
      },
      {
        id: "lb-4",
        name: "Seated Calf Raise",
        reps: "15",
        sets: "3 sets",
        category: "Legs",
        note: "🦵 EXERCISE 4. SOLEUS MUSCLE. Targets the deeper calf muscle.",
        tips: [
          "Full stretch at the bottom",
          "Explode up",
          "Pause and squeeze at the top",
        ],
        image: [
          "https://fitliferegime.com/wp-content/uploads/2023/08/Seated-Machine-Calf-Raise.gif",
        ],
        video: ["https://www.youtube.com/embed/JbyjNymZOt0"],
        impact: ["Lower Calf Width", "Soleus Growth"],
      },
      {
        id: "lb-cardio-sat",
        name: "Incline Fat-Burn Walk 🏔️",
        reps: "15-20 Mins",
        sets: "1 set",
        category: "Light Cardio",
        target: "150-200 Calories 🔥",
        note: "🧘 PRE-SAUNA PROTOCOL: Raises core temperature and flushes leg toxins without joint impact. Perfect post-leg day.",
        tips: [
          "Set Incline to 10% - 12%.",
          "Set Speed to 3.0 - 3.5 km/h (Brisk walk).",
          "DO NOT hold the handrails; let your core stabilize your body.",
          "Breathe deeply through your nose to prep for the sauna heat.",
        ],
        image: ["https://media.tenor.com/eXlIRe28PVgAAAAm/bubu-dudu-bubu.webp"],
        impact: [
          "Visceral Fat Loss 📉",
          "Active Recovery 🔄",
          "Core Endurance 🦾",
        ],
      },
    ],

    // ===========================================
    // SUNDAY: REST DAY
    // ===========================================
    "Rest Day": [],
  },
};

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
  "Forearm",
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
