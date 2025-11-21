export type WorkoutExercise = {
  id: string;
  name: string;
  reps: string;
  sets: string;
  note: string | null;
  image?: string[];
  video?: string[];
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
  planName: "Fitness Passion Gym (Beginner)",
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
    "Lower Body": [
      {
        id: "lb-1",
        name: "Own body Squats / Squats DB",
        reps: "20-15",
        sets: "2-3",
        note: "Use own body weight for 1st week, then Dumbbells.",
        image: [
          "https://www.inspireusafoundation.org/file/2021/06/bodyweight-squat.gif",
          "https://www.wikihow.com/images/thumb/b/b1/Do-Free-Squats-Step-11-Version-2.jpg/aid3265293-v4-728px-Do-Free-Squats-Step-11-Version-2.jpg.webp",
          "https://www.inspireusafoundation.org/file/2021/10/dumbbell-sumo-squat.gif",
          "https://fitnessprogramer.com/wp-content/uploads/2023/09/Dumbbell-Squat.gif",
        ],
        video: [
          "https://www.youtube.com/embed/-5LhNSMBrEs",
          "https://youtube.com/embed/lRYBbchqxtI",
        ],
      },
      {
        id: "lb-2",
        name: "Own body static Lunges / Lunges static db",
        reps: "20-15",
        sets: "2-3",
        note: "W1: Own body. W2+: Dumbbells.",
        image: [
          "https://www.inspireusafoundation.org/file/2023/07/bodyweight-forward-lunge.gif",
          "https://c.tenor.com/wTulE6li6AEAAAAd/tenor.gif",
        ],
        video: [
          "https://youtube.com/embed/38xlLGfguz4",
          "https://youtube.com/embed/HIM0GrawvAU",
        ],
      },
      {
        id: "lb-3",
        name: "Leg press / Leg extension",
        reps: "20-15",
        sets: "2-3",
        note: "Start in Week 2.",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2015/11/Leg-Press.gif",
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/LEG-EXTENSION.gif",
        ],
        video: [
          "https://youtube.com/embed/pCLf-OeSMtQ",
          "https://youtube.com/embed/iQ92TuvBqRo",
        ],
      },
      {
        id: "lb-4",
        name: "Leg curl",
        reps: "20-15",
        sets: "2-3",
        note: null,
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/08/Seated-Leg-Curl.gif",
        ],
        video: ["https://youtube.com/embed/_lgE0gPvbik"],
      },
      {
        id: "lb-5",
        name: "Standing calf",
        reps: "20-15",
        sets: "2-3",
        note: "Start in Week 1.",
        image: [
          "https://liftmanual.com/wp-content/uploads/2023/04/bodyweight-standing-calf-raise.jpg",
          "https://liftmanual.com/wp-content/uploads/2023/04/dumbbell-standing-calf-raise.jpg",
        ],
        video: ["https://youtube.com/embed/wdOkFomQNp8"],
      },
      {
        id: "lb-6",
        name: "Seated calf",
        reps: "20-15",
        sets: "2-3",
        note: "Start in Week 2.",
        image: [
          "https://burnfit.io/wp-content/uploads/2023/11/SEAT_CALF_RAISE.gif",
        ],
        video: ["https://youtube.com/embed/S2yhz3klwdU"],
      },
      {
        id: "lb-7",
        name: "Lower body stretch",
        reps: "N/A",
        sets: "1",
        note: "Hold each stretch for 30s.",
        image: [
          "https://liftmanual.com/wp-content/uploads/2023/04/standing-quadriceps-stretch.jpg",
          "https://www.vissco.com/wp-content/uploads/animation/sub/supine-piriformis-stretch.gif",
        ],
        video: [],
      },
    ],
    "Upper Body": [
      {
        id: "ub-1",
        name: "Lats pull down",
        reps: "10-12",
        sets: "2",
        note: "Pull to upper chest. Keep elbows down.",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Lat-Pulldown.gif",
        ],
        video: ["https://youtube.com/embed/bNmvKpJSWKM"],
      },
      {
        id: "ub-2",
        name: "Supported Low row / Seated row M/C",
        reps: "10-12",
        sets: "2",
        note: "Focus on squeezing shoulder blades.",
        image: [
          "https://c.tenor.com/2NYcfHsikFcAAAAd/tenor.gif",
          "https://i.pinimg.com/originals/a0/1e/6e/a01e6e9ac81f3e913ec42ec5802c13a3.gif",
        ],
        video: [
          "https://youtube.com/embed/FTwvmczf7bE",
          "https://youtube.com/embed/qD1WZ5pSuvk",
        ],
      },
      {
        id: "ub-3",
        name: "Overhead press DB",
        reps: "8-10",
        sets: "2",
        note: "Beginner shoulder-safe range.",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2023/09/Standing-Dumbbell-Overhead-Press.gif",
        ],
        video: ["https://youtube.com/embed/eNMl9UoO7YA"],
      },
      {
        id: "ub-4",
        name: "Flat DB Press",
        reps: "10-12",
        sets: "2",
        note: "Control weight on the way down.",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Press.gif",
        ],
        video: ["https://youtube.com/embed/WbCEvFA0NJs"],
      },
      {
        id: "ub-5",
        name: "Incline DB Press",
        reps: "10",
        sets: "2",
        note: "Keep elbows 45°; avoid flaring.",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Dumbbell-Press.gif",
        ],
        video: ["https://youtube.com/embed/8fXfwG4ftaQ"],
      },
      {
        id: "ub-6",
        name: "Incline M/C Press (optional)",
        reps: "10",
        sets: "1-2",
        note: "Do only if energy left.",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Chest-Press-Machine.gif",
        ],
        video: ["https://youtube.com/embed/hkU6fSHcslw"],
      },
      {
        id: "ub-7",
        name: "Shrugs DB",
        reps: "12-15",
        sets: "2",
        note: "Lift shoulders straight up, not in circles.",
        image: [
          "https://cdn.shopify.com/s/files/1/0547/0486/5477/files/dumbbell-shrug_480x480.gif?v=1701426774",
        ],
        video: ["https://youtube.com/embed/rFsSeClGnNA"],
      },
      {
        id: "ub-8",
        name: "External rotation DB",
        reps: "12-15",
        sets: "2",
        note: "Very slow, very light weight. Protects shoulders.",
        image: [
          "https://liftmanual.com/wp-content/uploads/2023/04/dumbbell-seated-external-rotation.jpg",
        ],
        video: ["https://youtube.com/embed/Nhq49UJefwI"],
      },
      {
        id: "ub-9",
        name: "Superman / Back extension",
        reps: "12-15",
        sets: "2",
        note: "Lift chest gently; don’t over-arch.",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Superman-exercise.gif",
          "https://www.inspireusafoundation.org/file/2022/04/weighted-hyperextension.gif",
        ],
        video: [
          "https://youtube.com/embed/VD6ma6oe4ZA",
          "https://youtube.com/embed/Wpreb69h2fE",
        ],
      },
      {
        id: "ub-10",
        name: "Supination DB curl",
        reps: "10-12",
        sets: "2",
        note: "Rotate wrist at the top for full bicep peak.",
        image: [
          "https://newlife.com.cy/wp-content/uploads/2019/11/23211301-Dumbbell-Standing-Inner-Biceps-Curl-version-2_Upper-Arms_360.gif",
        ],
        video: ["https://youtube.com/embed/_aoad2yuP5w"],
      },
      {
        id: "ub-11",
        name: "Biceps curl",
        reps: "10-12",
        sets: "2",
        note: "Don’t swing. Keep elbows locked to sides.",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Curl.gif",
        ],
        video: ["https://youtube.com/embed/MKWBV29S6c0"],
      },
      {
        id: "ub-12",
        name: "Triceps push down cable",
        reps: "10-12",
        sets: "2",
        note: "Keep elbows fixed; push only with triceps.",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Pushdown.gif",
        ],
        video: ["https://youtube.com/embed/1FjkhpZsaxc"],
      },
      {
        id: "ub-13",
        name: "Forearm Gorilla Gripper",
        reps: "12-15",
        sets: "2",
        note: "Squeeze slowly; don’t rush the reps.",
        image: [
          "https://5.imimg.com/data5/SELLER/Default/2021/10/GI/IC/WX/13678780/gorilla-gripper-1000x1000.jpg",
        ],
        video: ["https://youtube.com/embed/J62QOrYtbfo"],
      },
      {
        id: "ub-14",
        name: "Upper body stretch",
        reps: "30-40s",
        sets: "1",
        note: "Slow cool-down. Hold each stretch gently.",
        image: [
          "https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/325/325373/shoulder-roll-stretch-and-exercise-gif.gif?w=1845",
          "https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/325/325373/overhead-arm-reach-stretch-gif.gif?w=1845",
          "https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/325/325373/wall-stretch-exercise-gif.gif?w=1845",
          "https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/325/325373/neck-flexion-stretch-and-exercise-gif.gif?w=1845",
        ],
        video: [],
      },
    ],

    "Cardio & Abs": [
      {
        id: "ca-1",
        name: "Sit up (on floor)",
        reps: "10-12",
        sets: "2",
        note: "Curl up slowly; avoid pulling neck.",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Sit-ups.gif",
        ],
        video: ["https://youtube.com/embed/qXpYgvQ6_m4"],
      },

      {
        id: "ca-2",
        name: "Leg raise",
        reps: "8-12",
        sets: "2",
        note: "Keep lower back pressed to floor.",
        image: [
          "https://www.inspireusafoundation.org/file/2022/12/captains-chair-leg-raise.gif",
        ],
        video: ["https://youtube.com/embed/FijNSgahpz0"],
      },

      {
        id: "ca-3",
        name: "Side crunch",
        reps: "10-12 each side",
        sets: "2",
        note: "Lift shoulder toward hip, not elbow toward knee.",
        image: [
          "https://homeworkouts.org/wp-content/uploads/anim-oblique-crunches.gif",
        ],
        video: ["https://youtube.com/embed/f06w3nrXeEQ"],
      },

      {
        id: "ca-4",
        name: "Russian twists (legs on floor) / Side bend DB",
        reps: "12-16 total",
        sets: "2",
        note: "Keep spine neutral; twist from core.",
        image: [
          "https://www.kettlebellkings.com/cdn/shop/articles/russian-twist_cf5b5524-a334-4364-9cb9-54b5a04962d9.gif?v=1739267488&width=1000",
          "https://fitnessprogramer.com/wp-content/uploads/2021/05/Dumbbell-Side-Bend.gif",
        ],
        video: [
          "https://youtube.com/embed/iFQV6q4xRXM",
          "https://youtube.com/embed/44DazvtgpGE",
        ],
      },

      {
        id: "ca-5",
        name: "Plank",
        reps: "20–40s",
        sets: "2",
        note: "Keep body straight; don’t drop hips.",
        image: ["https://www.inspireusafoundation.org/file/2022/01/plank.gif"],
        video: ["https://youtube.com/embed/xe2MXatLTUw"],
      },

      {
        id: "ca-6",
        name: "Stretching",
        reps: "30–40s",
        sets: "1",
        note: "Light cooldown to relax abs & lower back.",
        image: [
          "https://media.tenor.com/YcE7CHM_HCsAAAAm/bubu-exercise-bubu-stretching.webp",
        ],
        video: [],
      },

      // ⭐ NEW: Cardio finisher added at end
      {
        id: "ca-7",
        name: "Light Cardio (Cycling / Treadmill)",
        reps: "10 minutes",
        sets: "1",
        note: "Keep pace easy; just warm and steady.",
        image: [
          "https://cdn.dribbble.com/userupload/42373824/file/original-aaddc4ceb0bc77336cf30c67459a331d.gif",
          "https://ugokawaii.com/wp-content/uploads/2024/01/bicycle.gif",
        ],
        video: [""],
      },
    ],

    "Rest Day": [],
  },
};
