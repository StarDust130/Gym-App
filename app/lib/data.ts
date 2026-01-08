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
    Thursday: "Cardio & Full Body Stretching",
    Friday: "Legs & Shoulder",
    Saturday: "CrossFit & Cardio",
    Sunday: "Rest Day",
  },

  workouts: {
    // ===========================================
    // MONDAY: BACK & BICEPS
    // ===========================================
    "Back , Biceps & Forearms": [
      /* ================= BACK ================= */
      {
        id: "bk-1",
        name: "Bent-Over Barbell Row / Bench-Supported Row",
        reps: "10-12",
        sets: "3 sets",
        category: "Back",
        note: "#1 BACK START (MAX POWER). Do this first when strongest. Week 1: Bent-over row (heavy). Week 2: Bench-supported row (strict). ONLY ONE.",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Bent-Over-Row.gif",
          "https://www.strengthlog.com/wp-content/uploads/2024/11/chest-supported-dumbbell-row.gif",
        ],
        video: [
          "https://www.youtube.com/embed/vT2GjY_Umpw",
          "https://www.youtube.com/embed/czoQ_ncuqqI",
        ],
        impact: [
          "Makes back thicker",
          "Builds pulling strength",
          "Improves posture",
        ],
      },

      {
        id: "bk-2",
        name: "BB Row – (Prone) Grip ",
        reps: "10-12",
        sets: "3 sets",
        category: "Back",
        note: "#2 BACK. Heavy but strict. Chest-supported so lower back can rest. Pull elbows toward hips.",
        tips: ["a.k.a. Barbell Row Grip"],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/04/Reverse-Grip-Barbell-Row.gif",
        ],
        video: ["https://youtube.com/embed/7SzAgsAVzMo?si=EfIrocw9W0RaOd46"],
        impact: [
          "Builds lower lats",
          "Adds thickness to middle back",
          "Improves back detail",
        ],
      },

      {
        id: "bk-3",
        name: "Low Machine Row / Seated Machine Row",
        reps: "10-12",
        sets: "3 sets",
        category: "Back",
        note: "#3 BACK MID. Machine work to keep tension high without stressing spine.",
        tips: [
          "a.k.a. Seated Cable Row",
          "also ask what is Low Machine Row 😭",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Cable-Row.gif",
        ],
        video: ["https://www.youtube.com/embed/UCXxvVItLoM"],
        impact: [
          "Fills middle back",
          "Improves back thickness",
          "Helps rows get stronger",
        ],
      },

      {
        id: "bk-4",
        name: "Lat Pulldown",
        reps: "10-12",
        sets: "3 sets",
        category: "Back",
        note: "#4 BACK WIDTH. Vertical pull after rows. Stretch fully, pull elbows down.",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Lat-Pulldown.gif",
        ],
        video: ["https://www.youtube.com/embed/CAwf7n6Luuc"],
        impact: [
          "Makes back wider",
          "Improves V-shape",
          "Helps pull-up strength",
        ],
      },

      {
        id: "bk-5",
        name: "Straight-Arm Pulldown",
        reps: "10-12",
        sets: "2 sets",
        category: "Back",
        note: "#5 BACK ISOLATION. Feel lats working. Arms straight, slow control.",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/05/Cable-Straight-Arm-Pulldown.gif",
        ],
        video: ["https://youtube.com/embed/hAMcfubonDc?si=WWoc3ALQo2evyDXH"],
        impact: [
          "Improves lat connection",
          "Sharpens back shape",
          "Helps mind–muscle control",
        ],
      },

      {
        id: "bk-6",
        name: "Dumbbell Shrugs / Infinity Shrugs",
        reps: "10-12",
        sets: "3 sets",
        category: "Back",
        note: "#6 TRAPS. Near end. Hold top 1–2 sec. No rolling shoulders.",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/04/Dumbbell-Shrug.gif",
        ],
        video: ["https://youtube.com/embed/rFsSeClGnNA?si=hu_xVfvbodle-Rfy"],
        impact: [
          "Builds upper traps",
          "Makes neck look thicker",
          "Improves shoulder stability",
        ],
      },

      {
        id: "bk-7",
        name: "Back Extension / Good Morning (≤15kg)",
        reps: "10-12",
        sets: "3 sets",
        category: "Back",
        note: "#7 BACK FINISH. Light weight only. Strengthens lower back safely.",
        image: [
          "https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/05/back-extension-frontloaded.gif?resize=600%2C600&ssl=1",
        ],
        video: ["https://youtube.com/embed/Wpreb69h2fE?si=ttyCZnQv7Xy9Y5cb"],
        impact: [
          "Strengthens lower back",
          "Protects spine",
          "Improves posture and stability",
        ],
      },

      /* ================= BICEPS ================= */

      {
        id: "bi-1",
        name: "Supination Dumbbell Curl",
        reps: "10-12",
        sets: "3 sets",
        category: "Biceps",
        note: "#8 BICEPS START. Arms fresh. Rotate wrist fully for peak.",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2022/06/Seated-dumbbell-alternating-curl.gif",
        ],
        video: ["https://youtube.com/embed/MKWBV29S6c0?si=gdG5ELu4hftkT5li"],
        impact: [
          "Builds biceps peak",
          "Improves arm shape",
          "Adds front arm size",
        ],
      },

      {
        id: "bi-2",
        name: "Reverse Cable Curl / Hammer Curl",
        reps: "10-12",
        sets: "2 sets",
        category: "Biceps",
        note: "#9 BICEPS. Adds arm thickness. Keep elbows fixed.",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/04/Seated-Hammer-Curl.gif",
        ],
        video: ["https://youtube.com/embed/vm0zV_WQerE?si=gYGaao8dKT6-s3Vk"],
        impact: [
          "Makes arms thicker",
          "Improves forearm strength",
          "Helps arms look bigger",
        ],
      },

      {
        id: "bi-3",
        name: "Concentration Curl / Preacher Curl",
        reps: "10-12",
        sets: "2 sets",
        category: "Biceps",
        note: "#10 BICEPS ISOLATION. Strict reps only. No cheating.",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Concentration-Curl.gif",
          "https://www.inspireusafoundation.org/file/2022/03/ez-bar-preacher-curl.gif",
        ],
        video: [
          "https://youtube.com/embed/EjUnEEfTSEY?si=Y7arnZZDupSnpN4H",
          "https://youtube.com/embed/7ixqAPO6JvU?si=oooquM5yRSFqyLyN",
        ],
        impact: [
          "Improves biceps definition",
          "Sharpens arm look",
          "Better muscle control",
        ],
      },

      {
        id: "bi-4",
        name: "Barbell Curl / Cable Curl",
        reps: "10-12",
        sets: "2 sets",
        category: "Biceps",
        note: "#11 BICEPS MASS. Controlled weight. No swinging.",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Curl.gif",
          "https://www.inspireusafoundation.org/file/2022/12/cable-drag-curl.gif",
        ],
        video: [
          "https://youtube.com/embed/54x2WF1_Suc?si=Krs73Ki6rbcjMNkV",
          "https://youtube.com/embed/CrbTqNOlFgE?si=9P9Ho07OdqTBslMN",
        ],
        impact: [
          "Adds arm mass",
          "Improves curl strength",
          "Builds overall arm size",
        ],
      },

      /* ================= FOREARMS ================= */

      {
        id: "fa-1",
        name: "Gorilla Gripper",
        reps: "10-12",
        sets: "3 sets",
        category: "Forearm",
        image: [
          "https://5.imimg.com/data5/SELLER/Default/2021/9/PQ/YD/CM/12736245/gorilla-gripper-1000x1000.jpg",
        ],
        note: "#12 FOREARMS. Grip work. Squeeze hard every rep.",
        impact: [
          "Improves grip strength",
          "Strengthens fingers",
          "Helps all pulling exercises",
        ],
      },

      {
        id: "fa-2",
        name: "Dumbbell Wrist Curl",
        reps: "10-12",
        sets: "2 sets",
        category: "Forearm",
        note: "#13 FINAL EXERCISE. Slow reps. Full range.",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/06/Dumbbell-Wrist-Curl.gif",
        ],
        video: ["https://youtube.com/embed/M8TpHw5aYgA?si=af_0A8zrxs6aQZBN"],
        impact: [
          "Builds forearm size",
          "Strengthens wrists",
          "Makes arms look thicker",
        ],
      },
    ],
    // ===========================================
    // TUESDAY: CARDIO & CRUNCHES
    // ===========================================
    "Cardio & Crunches": [
      {
        id: "abs-1",
        name: "Sit Up (On Board)",
        reps: "20-15",
        sets: "3 sets",
        category: "Abs",
        note: "Slow and controlled movement",
        tips: [
          "Do not pull neck",
          "Exhale while coming up",
          "Keep core engaged",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Sit-ups.gif",
        ],
        video: ["https://youtube.com/embed/qXpYgvQ6_m4?si=KLX2_AzMHyfQwCHv"],
        impact: ["Upper abs", "Core endurance"],
      },
      {
        id: "abs-2",
        name: "Reverse Crunch",
        reps: "20-15",
        sets: "2 sets",
        category: "Abs",
        note: "Lift hips off the floor",
        tips: ["Do not swing legs", "Control the negative"],
        image: ["https://burnfit.io/wp-content/uploads/2023/11/REV_CRUNCH.gif"],
        video: ["https://youtube.com/embed/ZyE4r7wiI6w?si=Nd4VqezMhql13e7M"],
        impact: ["Lower abs", "Pelvic control"],
      },
      {
        id: "abs-3",
        name: "Leg Raise",
        reps: "20-15",
        sets: "3 sets",
        category: "Abs",
        note: "Lower back pressed to floor",
        tips: ["Do not arch lower back", "Lower legs slowly"],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Lying-Leg-Raise.gif",
          "https://ccuuubmtdurkmbeufybi.supabase.co/storage/v1/object/public/animations/0826.gif",
        ],
        video: ["https://youtube.com/embed/XQc0WHO90Lk?si=xf8AsOrWQ6x_ueJm"],
        impact: ["Lower abs", "Hip flexors"],
      },
      {
        id: "abs-4",
        name: "Double Leg Cycling",
        reps: "20-15",
        sets: "2 sets",
        category: "Abs",
        note: "Controlled cycling motion",
        tips: ["Keep abs tight", "Avoid fast kicking"],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Bicycle-Crunch.gif",
        ],
        video: ["https://www.youtube.com/embed/Iwyvozckjak"],
        impact: ["Lower abs", "Coordination"],
      },
      {
        id: "abs-5",
        name: "Russian Twists (Legs on Floor)",
        reps: "20-15",
        sets: "2 sets",
        category: "Abs",
        note: "Rotation from core",
        tips: ["Move shoulder to shoulder", "Do not rush reps"],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Russian-Twist.gif",
        ],
        video: ["https://www.youtube.com/embed/wkD8rjkodUI"],
        impact: ["Obliques", "Rotational strength"],
      },
      {
        id: "abs-6",
        name: "Planks",
        reps: "Hold",
        sets: "2 sets",
        category: "Abs",
        note: "Hold till failure",
        tips: ["Straight line from head to heel", "Squeeze glutes"],
        image: ["https://www.inspireusafoundation.org/file/2022/01/plank.gif"],
        video: ["https://youtube.com/embed/ftSgOmyQyEg?si=u6PPn6keN49-9mV8"],
        impact: ["Core stability", "Isometric strength"],
      },
      {
        id: "abs-7",
        name: "Side Bend with Cables",
        reps: "20-15",
        sets: "3 sets",
        category: "Abs",
        note: "One side at a time",
        tips: ["Stretch fully", "Slow controlled bend"],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2022/05/Side-bend.gif",
        ],
        video: ["https://youtube.com/embed/_5rpm-8ux0A?si=s_lcFg4RMCqC5Xrk"],
        impact: ["Obliques", "Core balance"],
      },
      {
        id: "abs-8",
        name: "Caterpillar",
        reps: "20-15",
        sets: "2 sets",
        category: "Abs",
        note: "Dynamic core movement",
        tips: ["aka:- Inchworm", "Keep legs straight", "Move smoothly"],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2022/01/Inchworm.gif",
        ],
        video: ["https://youtube.com/embed/nSujRtyKaEM?si=L0FpRqZL_F2UipWp"],
        impact: ["Full core", "Mobility"],
      },

      // ✅ LIGHT CARDIO (AFTER ABS)
      {
        id: "lc-1",
        name: "Light Cardio (Treadmill / Cycling)",
        reps: "5–10 mins",
        sets: "1",
        category: "Light Cardio",
        note: "Do after completing all abs exercises",
        tips: [
          "Low intensity only",
          "Maintain steady breathing",
          "No sprinting",
        ],
        image: [
          "https://media.tenor.com/eXlIRe28PVgAAAAm/bubu-dudu-bubu.webp",
          "https://media.tenor.com/HXbs_-Rwqj4AAAAm/train-trainer.webp",
          "https://media.tenor.com/lEy7Yw63vQUAAAAM/beast-mode-cardio.gif",
        ],

        impact: ["Fat burning", "Active recovery", "Improves blood flow"],
      },
    ],

    // ===========================================
    // WEDNESDAY: CHEST & TRICEPS
    // ===========================================
    "Chest & Triceps": [
      // =========================
      // CHEST
      // =========================
      {
        id: "ch-1",
        name: "Flat DB",
        reps: "10-12",
        sets: "3 sets",
        category: "Chest",
        note: "#1 CHEST START. Do first when strongest. Control descent.",
        tips: [
          "Lower dumbbells slowly (2–3 sec)",
          "Do not lock elbows",
          "Keep shoulder blades tight",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Press.gif",
        ],
        video: ["https://youtube.com/embed/WbCEvFA0NJs?si=Dfojxgl3MGzpgFk2"],
        impact: [
          "Builds chest mass",
          "Improves pressing strength",
          "Base chest exercise",
        ],
      },

      {
        id: "ch-2",
        name: "Incline DB",
        reps: "10-12",
        sets: "3 sets",
        category: "Chest",
        note: "#2 UPPER CHEST focus. Bench ~30° only.",
        tips: [
          "Do not go too steep",
          "Press up and slightly inward",
          "Feel stretch at bottom",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Dumbbell-Press.gif",
        ],
        video: ["https://youtube.com/embed/8fXfwG4ftaQ?si=A0zwKBil2ghFddlw"],
        impact: [
          "Upper chest thickness",
          "Better chest shape",
          "Improves shoulder stability",
        ],
      },

      {
        id: "ch-3",
        name: "Decline DB",
        reps: "10-12",
        sets: "3 sets",
        category: "Chest",
        note: "#3 LOWER CHEST. Optional if fatigue high.",
        tips: [
          "Do not bounce at bottom",
          "Keep wrists straight",
          "Control weight fully",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Decline-Dumbbell-Press.gif",
        ],
        video: ["https://youtube.com/embed/vVwnsVzw2G0?si=Sg9dVdbv3EWwTQac"],
        impact: [
          "Lower chest development",
          "Improves chest fullness",
          "Helps push strength",
        ],
      },

      {
        id: "ch-4",
        name: "Pec dec fly",
        reps: "10-12",
        sets: "3 sets",
        category: "Chest",
        note: "1st Week isolation. Stretch chest fully.",
        tips: [
          "Do not slam weights",
          "Pause 1 sec at squeeze",
          "Elbows slightly bent",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Pec-Deck-Fly.gif",
        ],
        video: ["https://youtube.com/embed/a9vQ_hwIksU?si=DpNsvvttIQMkvLt7"],
        impact: [
          "Chest separation",
          "Improves muscle control",
          "Better chest definition",
        ],
      },

      {
        id: "ch-5",
        name: "Cable crossover / Vertical pec fly",
        reps: "10-12",
        sets: "3 sets",
        category: "Chest",
        note: "2nd Week. Constant tension.",
        tips: [
          "Cross hands slightly at bottom",
          "Slow negative",
          "Do not use momentum",
        ],
        image: [
          "https://www.inspireusafoundation.org/file/2024/02/cable-standing-crossover.gif",
        ],
        video: ["https://youtube.com/embed/y4RJDSOBEl8?si=2egsqIPAxVxLFfZU"],
        impact: [
          "Chest lines & cuts",
          "Improves inner chest",
          "Finishing movement",
        ],
      },

      {
        id: "ch-6",
        name: "Pushups (Knee) / (Regular)",
        reps: "10-12",
        sets: "3 sets",

        category: "Chest",
        video: ["https://youtube.com/embed/4Bc1tPaYkOo?si=Vdk3grrXTvaK0cqn"],
        note: "Optional burnout. Beginners.",
        tips: ["Keep body straight", "Elbows ~45° angle", "Slow tempo"],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Push-Up.gif",
        ],
        impact: ["Chest endurance", "Improves control", "Good finisher"],
      },

      // =========================
      // TRICEPS
      // =========================
      {
        id: "tr-1",
        name: "Bar dips weight assisted / Close grip bench",
        reps: "10-12",
        sets: "3 sets",
        category: "Triceps",
        note: "#1 TRICEPS MASS. Heavy compound.",
        tips: ["Elbows close to body", "Full lockout", "Chest upright"],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2022/11/Asisted-Triceps-Dips.gif",
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Close-Grip-Bench-Press.gif",
        ],
        video: [
          "https://youtube.com/embed/LH9iZNaO7oU?si=t-NMoDG_7o-emsMD",
          "https://youtube.com/embed/6zWoAllRufg?si=96IU372uz0YczAye",
        ],
        impact: [
          "Builds triceps mass",
          "Improves pressing strength",
          "Compound power",
        ],
      },

      {
        id: "tr-2",
        name: "Bar dips resistance band assisted",
        reps: "10-12",
        sets: "3 sets",
        category: "Triceps",
        note: "2nd Week variation. (3rd Floor)",
        tips: ["Control negative", "No shoulder shrug", "Full depth"],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Triceps-Dips.gif",
        ],
        video: ["https://youtube.com/embed/pz3dH1K9UkI?si=r-TKEn6HqJSXf4Zf"],
        impact: ["Triceps strength", "Joint friendly", "Better depth"],
      },

      {
        id: "tr-3",
        name: "Triceps push down cable/rope",
        reps: "10-12",
        sets: "3 sets",
        category: "Triceps",
        note: "#2 TRICEPS ISOLATION.",
        tips: ["Elbows fixed", "Spread rope at bottom", "Pause 1 sec"],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Pushdown.gif",
        ],
        video: ["https://youtube.com/embed/1FjkhpZsaxc?si=UeI7YtnLqsvk9JP4"],
        impact: ["Triceps definition", "Better arm shape", "Peak contraction"],
      },

      {
        id: "tr-4",
        name: "Cable overhead triceps extension / Skull crusher DB",
        reps: "10-12",
        sets: "3 sets",
        category: "Triceps",
        note: "1st Week long head focus.",
        tips: ["Stretch fully overhead", "Elbows locked in", "Slow tempo"],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/04/Cable-Rope-Overhead-Triceps-Extension.gif",
          "https://fitnessprogramer.com/wp-content/uploads/2021/06/Dumbbell-Skull-Crusher.gif",
        ],
        video: [
          "https://youtube.com/embed/b5le--KkyH0?si=Yvs4Hcf3f9-rR47q",
          "https://youtube.com/embed/iuYB_fLp26Q?si=5AD_YDcGVENz63Ue",
        ],
        impact: ["Long head growth", "Bigger triceps look", "Arm thickness"],
      },

      {
        id: "tr-5",
        name: "Triceps extension DB / Kickback DB",
        reps: "10-12",
        sets: "3 sets",
        category: "Triceps",
        note: "2nd Week finisher.",
        tips: ["Straight arm at top", "No swinging", "Light weight only"],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/06/Seated-Dumbbell-Triceps-Extension.gif",
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Kickback.gif",
        ],
        video: [
          "https://youtube.com/embed/b_r_LW4HEcM?si=8qDyOj_fIkS_geLH",
          "https://youtube.com/embed/WhBxKbe1-NU?si=NpaX0rxAYl3yoo_I",
        ],
        impact: ["Triceps detail", "Muscle separation", "End workout pump"],
      },

      {
        id: "tr-6",
        name: "Triceps press M/C",
        reps: "10-12",
        sets: "3 sets",
        category: "Triceps",
        note: "Final burnout.",
        tips: ["Control machine path", "Squeeze at bottom", "No locking"],
        image: [
          "https://burnfit.io/wp-content/uploads/2023/11/SEAT_DIPS_MC.gif",
        ],
        video: ["https://youtube.com/embed/QYktfOJRyfU?si=Cc3VxjqA6ZTuvjaH"],
        impact: ["Triceps pump", "Joint-safe finisher", "Volume overload"],
      },
    ],

    // ===========================================
    // THURSDAY: CARDIO & STRETCHING
    // ===========================================
    "Cardio & Full Body Stretching": [
      {
        id: "cardio-1",
        name: "Cardio (any)",
        reps: "30 mins",
        sets: "1 set",
        category: "Cardio",
        note: "Low Intensity",
        image: [
          "https://media.tenor.com/eXlIRe28PVgAAAAm/bubu-dudu-bubu.webp",
          "https://media.tenor.com/HXbs_-Rwqj4AAAAm/train-trainer.webp",
          "https://media.tenor.com/lEy7Yw63vQUAAAAM/beast-mode-cardio.gif",
        ],
      },
      {
        id: "stretch-1",
        name: "Passive Stretch",
        reps: "After workout",
        sets: "1 set",
        category: "Mobility",
        image: [
          "https://media.tenor.com/xxSokJ0BzywAAAAm/pengu-pudgy.webp",
          "https://media.tenor.com/eihh-gRPONwAAAAm/cat-txuuuuu.webp",
          "https://media.tenor.com/KgHAxJ53lRYAAAAm/get-it-hump-day.webp",
          "https://media.tenor.com/RaXSN6iRKDIAAAAm/yoga-self-cuddle.webp",
        ],
        note: null,
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
        note: "#1 COMPOUND. Do first while fresh. Focus on depth and control. #DO (Hack Squat then move to Barbell Squat later).",
        tips: [
          "Brace core before descent",
          "Push knees out",
          "Drive up through mid-foot",
        ],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/BARBELL-SQUAT.gif",
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Sled-Hack-Squat.gif",
        ],
        video: [
          "https://youtube.com/embed/iKCJCydYYrE?si=TJB4U56YNpkLPxyz",
          "https://youtube.com/embed/vaU2FSmUhNc?si=UR2nOpm8tbGDFGIm",
        ],
        impact: ["Quads", "Glutes", "Overall leg strength"],
      },

      {
        id: "leg-2",
        name: "Forward Lunges",
        reps: "10-12",
        sets: "2 Sets",
        category: "Legs",
        note: "1st Week. Step forward, stay balanced.",
        tips: ["Long step", "Back knee soft touch", "Upright torso"],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lunge.gif",
        ],
        video: ["https://www.youtube.com/embed/QOVaHwm-Q6U"],
        impact: ["Quads", "Glutes", "Balance"],
      },

      {
        id: "leg-3",
        name: "Reverse Lunges",
        reps: "10-12",
        sets: "2 Sets",
        category: "Legs",
        note: "2nd Week. Easier on knees than forward lunges.",
        tips: ["Step back slowly", "Front knee stable"],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Reverse-Lunge.gif",
        ],
        video: ["https://www.youtube.com/embed/rvqLVxYqEvo"],
        impact: ["Glutes", "Hamstrings"],
      },

      {
        id: "leg-4",
        name: "Leg Press",
        reps: "10-12",
        sets: "2 Sets",
        category: "Legs",
        note: "1st Week. Controlled reps, full depth.",
        tips: ["Do not lock knees", "Feet shoulder-width"],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2015/11/Leg-Press.gif",
        ],
        video: ["https://youtube.com/embed/EotSw18oR9w?si=sWRVUvAy84KwsBfk"],
        impact: ["Quads", "Overall leg volume"],
      },

      {
        id: "leg-5",
        name: "Leg Extension",
        reps: "10-12",
        sets: "2 Sets",
        category: "Legs",
        note: "2nd Week. Isolation after compounds.",
        tips: ["Pause 1 sec at top", "Slow negatives"],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/LEG-EXTENSION.gif",
        ],
        video: ["https://youtube.com/embed/iQ92TuvBqRo?si=rVR7-38AaxnNutf2"],
        impact: ["Quads isolation"],
      },

      {
        id: "leg-6",
        name: "Hip Thrust",
        reps: "10-12",
        sets: "3 Sets",
        category: "Legs",
        note: "Optional. Add if recovery is good.",
        tips: ["Chin tucked", "Full hip lockout"],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Hip-Thrust.gif",
        ],
        video: ["https://youtube.com/embed/96uDbymTaHM?si=NrG3yGfbFscWYmJC"],
        impact: ["Glutes", "Posterior chain"],
      },

      {
        id: "leg-7",
        name: "Standing Calf Raise",
        reps: "10-12",
        sets: "3 Sets",
        category: "Legs",
        note: "Slow reps, full stretch.",
        tips: ["Pause at top", "Stretch at bottom"],
        image: [
          "https://burnfit.io/wp-content/uploads/2023/11/STD_CALF_RAISE.gif",
          "https://training.fit/wp-content/uploads/2020/03/wadenheben-stehend-geraet.png",
        ],
        video: ["https://youtube.com/embed/baEXLy09Ncc?si=UnOyS8ClYxZFdyCg"],
        impact: ["Gastrocnemius"],
      },

      {
        id: "leg-8",
        name: "Seated Calf Raise",
        reps: "10-12",
        sets: "4 Sets",
        category: "Legs",
        note: "Targets soleus muscle.",
        tips: ["Short ROM", "Constant tension"],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/08/Seated-Leg-Curl.gif",
        ],
        video: ["https://www.youtube.com/embed/JbyjNymZOt0"],
        impact: ["Soleus", "Lower calves"],
      },

      {
        id: "leg-9",
        name: "Leg Curl",
        reps: "10-12",
        sets: "2 Sets",
        category: "Legs",
        note: "Hamstring isolation.",
        tips: ["Slow eccentric", "Do not lift hips"],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Leg-Curl.gif",
        ],
        video: ["https://youtube.com/embed/_lgE0gPvbik?si=WNsOc1jeRc9R42QC"],
        impact: ["Hamstrings"],
      },

      {
        id: "leg-10",
        name: "Toe Raise",
        reps: "20 sec hold",
        sets: "1",
        category: "Legs",
        note: "Foot & ankle strength.",
        tips: ["Barefoot if possible"],
        image: [
          "https://intowellness.in/wp-content/uploads/2024/10/Tibia_Dorsal_Flexion_Machine.jpg",
        ],
        video: ["https://youtube.com/embed/0LSazUIfThI?si=JximLVaseWHczWPy"],
        impact: ["Tibialis anterior"],
      },

      /* ================= SHOULDER ================= */

      {
        id: "sh-1",
        name: "Dumbbell Overhead Press",
        reps: "10-12",
        sets: "3 Main Sets",
        category: "Shoulder",
        note: "1st Week. Start shoulders with DB.",
        tips: ["Neutral grip", "No lower back arch"],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2023/09/Standing-Dumbbell-Overhead-Press.gif",
        ],
        video: ["https://youtube.com/embed/k6tzKisR3NY?si=-tEppXweec01YWDR"],
        impact: ["Front delts", "Shoulder strength"],
      },

      {
        id: "sh-2",
        name: "Barbell Overhead Press",
        reps: "10-12",
        sets: "3 Main Sets",
        category: "Shoulder",
        note: "2nd Week. Heavier than DB.",
        tips: ["Glutes tight", "Bar path straight"],
        image: [
          "https://media.tenor.com/CV1FfGVNpdcAAAAM/desenvolvimento-militar.gif",
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Shoulder-Press.gif",
        ],
        video: ["https://youtube.com/embed/zoN5EH50Dro?si=nuOkAiQrBV4Altd0"],
        impact: ["Delts", "Upper body power"],
      },

      {
        id: "sh-3",
        name: "Dumbbell Lateral Raise",
        reps: "10-12",
        sets: "2 Sets",
        category: "Shoulder",
        note: "1st Week. Strict form.",
        tips: ["Lift to shoulder height", "Small bend in elbow"],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lateral-Raise.gif",
        ],
        video: ["https://youtube.com/embed/Kl3LEzQ5Zqs?si=NivM87vJOi1scVss"],
        impact: ["Side delts"],
      },

      {
        id: "sh-4",
        name: "Machine Lateral Raise",
        reps: "10-12",
        sets: "2 Sets",
        category: "Shoulder",
        note: "2nd Week. Constant tension.",
        tips: ["Slow reps", "No jerking"],
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/09/Lever-Lateral-Raise.gif",
        ],
        video: ["https://youtube.com/embed/uEBut4ea6as?si=TSd8w65D_5fS_DTA"],
        impact: ["Side delts"],
      },

      {
        id: "sh-5",
        name: "Reverse Pec Deck / Face Pull",
        reps: "10-12",
        sets: "2 Sets",
        category: "Shoulder",
        note: "Rear delts & posture.",
        tips: ["Pull elbows wide", "Pause at squeeze"],
        image: [
          "https://burnfit.io/wp-content/uploads/2023/11/REV_PEC_DECK_MC.gif",
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Face-Pull.gif",
        ],
        video: [
          "https://youtube.com/embed/7tgx6QHB0-A?si=wHmrlabC4mzM-ciZ",
          "https://youtube.com/embed/IeOqdw9WI90?si=qaY_IerfJjQXkfmO",
        ],
        impact: ["Rear delts", "Upper back"],
      },

      {
        id: "sh-6",
        name: "External Rotation Dumbbell",
        reps: "10-12",
        sets: "2 Sets",
        category: "Shoulder",
        note: "Rotator cuff health. Go light.",
        tips: ["Very light weight", "Slow control"],
        image: [
          "https://liftmanual.com/wp-content/uploads/2023/04/dumbbell-seated-external-rotation.jpg",
          "https://gymvisual.com/img/p/2/7/3/2/6/27326.gif",
        ],
        impact: ["Shoulder stability"],
      },

      /* ================= STRETCH ================= */

      {
        id: "mob-1",
        name: "Lower Body Stretch",
        reps: "20 sec hold",
        sets: "1",
        category: "Mobility",
        note: "Post workout only.",
      },
      {
        id: "mob-2",
        name: "Full Body Compound Stretch",
        reps: "21 sec hold",
        sets: "1",
        category: "Mobility",
        note: "End session cooldown.",
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