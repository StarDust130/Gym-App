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
      "https://fitnessprogramer.com/wp-content/uploads/2023/09/Dumbbell-Squat.gif"
    ],
    video: [
      "https://www.youtube.com/embed/-5LhNSMBrEs",
      "https://youtube.com/embed/lRYBbchqxtI"
    ],
    impact: [
      "Builds thigh and glute strength.",
      "Improves balance and core stability.",
      "Boosts overall lower-body power."
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/06/bodyweight-squat.gif"
  },

  {
    id: "lb-2",
    name: "Own body static Lunges / Lunges static DB",
    reps: "20-15",
    sets: "2-3",
    note: "W1: Own body. W2+: Dumbbells.",
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
      "Improves balance and leg control.",
      "Helps build single-leg stability."
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2023/07/bodyweight-forward-lunge.gif"
  },

  {
    id: "lb-3",
    name: "Leg press / Leg extension",
    reps: "20-15",
    sets: "2-3",
    note: "Start in Week 2.",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2015/11/Leg-Press.gif",
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/LEG-EXTENSION.gif"
    ],
    video: [
      "https://youtube.com/embed/pCLf-OeSMtQ",
      "https://youtube.com/embed/iQ92TuvBqRo"
    ],
    impact: [
      "Focuses hard on quadriceps.",
      "Builds safe strength using machine control.",
      "Helps beginners feel leg activation better."
    ],
    impactImage:
      "https://fitnessprogramer.com/wp-content/uploads/2015/11/Leg-Press.gif"
  },

  {
    id: "lb-4",
    name: "Leg curl",
    reps: "20-15",
    sets: "2-3",
    note: null,
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/08/Seated-Leg-Curl.gif"
    ],
    video: ["https://youtube.com/embed/_lgE0gPvbik"],
    impact: [
      "Strengthens the back of your legs (hamstrings).",
      "Helps knee stability.",
      "Balances muscle strength with quads."
    ],
    impactImage:
      "https://fitnessprogramer.com/wp-content/uploads/2021/08/Seated-Leg-Curl.gif"
  },

  {
    id: "lb-5",
    name: "Standing calf",
    reps: "20-15",
    sets: "2-3",
    note: "Start in Week 1.",
    image: [
      "https://liftmanual.com/wp-content/uploads/2023/04/bodyweight-standing-calf-raise.jpg",
      "https://liftmanual.com/wp-content/uploads/2023/04/dumbbell-standing-calf-raise.jpg"
    ],
    video: ["https://youtube.com/embed/wdOkFomQNp8"],
    impact: [
      "Builds calf muscles for leg power.",
      "Improves ankle strength and balance.",
      "Helps in running and jumping performance."
    ],
    impactImage:
      "https://liftmanual.com/wp-content/uploads/2023/04/bodyweight-standing-calf-raise.jpg"
  },

  {
    id: "lb-6",
    name: "Seated calf",
    reps: "20-15",
    sets: "2-3",
    note: "Start in Week 2.",
    image: [
      "https://burnfit.io/wp-content/uploads/2023/11/SEAT_CALF_RAISE.gif"
    ],
    video: ["https://youtube.com/embed/S2yhz3klwdU"],
    impact: [
      "Targets deeper calf muscles (soleus).",
      "Improves stability for walking & squatting.",
      "Helps build thicker, stronger calves."
    ],
    impactImage:
      "https://burnfit.io/wp-content/uploads/2023/11/SEAT_CALF_RAISE.gif"
  },

  {
    id: "lb-7",
    name: "Lower body stretch",
    reps: "N/A",
    sets: "1",
    note: "Hold each stretch for 30s.",
    image: [
      "https://liftmanual.com/wp-content/uploads/2023/04/standing-quadriceps-stretch.jpg",
      "https://www.vissco.com/wp-content/uploads/animation/sub/supine-piriformis-stretch.gif"
    ],
    video: [],
    impact: [
      "Loosens tight leg muscles.",
      "Reduces soreness after workout.",
      "Improves flexibility and posture."
    ],
    impactImage:
      "https://liftmanual.com/wp-content/uploads/2023/04/standing-quadriceps-stretch.jpg"
  }
],
  "Upper Body": [
  {
    id: "ub-1",
    name: "Lats pull down",
    reps: "10-12",
    sets: "2",
    note: "Pull to upper chest. Keep elbows down.",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Lat-Pulldown.gif"
    ],
    video: ["https://youtube.com/embed/bNmvKpJSWKM"],
    impact: [
      "Makes your back stronger.",
      "Helps improve posture.",
      "Helps you pull better."
    ],
    impactImage:
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Lat-Pulldown.gif"
  },

  {
    id: "ub-2",
    name: "Supported Low row / Seated row M/C",
    reps: "10-12",
    sets: "2",
    note: "Focus on squeezing shoulder blades.",
    image: [
      "https://c.tenor.com/2NYcfHsikFcAAAAd/tenor.gif",
      "https://i.pinimg.com/originals/a0/1e/6e/a01e6e9ac81f3e913ec42ec5802c13a3.gif"
    ],
    video: [
      "https://youtube.com/embed/FTwvmczf7bE",
      "https://youtube.com/embed/qD1WZ5pSuvk"
    ],
    impact: [
      "Builds middle back.",
      "Helps pull with more power.",
      "Improves posture."
    ],
    impactImage:
      "https://c.tenor.com/2NYcfHsikFcAAAAd/tenor.gif"
  },

  {
    id: "ub-3",
    name: "Overhead press DB",
    reps: "8-10",
    sets: "2",
    note: "Beginner shoulder-safe range.",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2023/09/Standing-Dumbbell-Overhead-Press.gif"
    ],
    video: ["https://youtube.com/embed/eNMl9UoO7YA"],
    impact: [
      "Makes shoulders strong.",
      "Helps lift things overhead.",
      "Improves upper-body stability."
    ],
    impactImage:
      "https://fitnessprogramer.com/wp-content/uploads/2023/09/Standing-Dumbbell-Overhead-Press.gif"
  },

  {
    id: "ub-4",
    name: "Flat DB Press",
    reps: "10-12",
    sets: "2",
    note: "Control weight on the way down.",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Press.gif"
    ],
    video: ["https://youtube.com/embed/WbCEvFA0NJs"],
    impact: [
      "Builds chest muscles.",
      "Strengthens shoulders.",
      "Helps pushing strength."
    ],
    impactImage:
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Press.gif"
  },

  {
    id: "ub-5",
    name: "Incline DB Press",
    reps: "10",
    sets: "2",
    note: "Keep elbows 45°; avoid flaring.",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Dumbbell-Press.gif"
    ],
    video: ["https://youtube.com/embed/8fXfwG4ftaQ"],
    impact: [
      "Builds upper chest.",
      "Helps shoulder strength.",
      "Makes chest look fuller."
    ],
    impactImage:
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Dumbbell-Press.gif"
  },

  {
    id: "ub-6",
    name: "Incline M/C Press (optional)",
    reps: "10",
    sets: "1-2",
    note: "Do only if energy left.",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Chest-Press-Machine.gif"
    ],
    video: ["https://youtube.com/embed/hkU6fSHcslw"],
    impact: [
      "Easy machine chest exercise.",
      "Targets upper chest safely.",
      "Good extra volume."
    ],
    impactImage:
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Chest-Press-Machine.gif"
  },

  {
    id: "ub-7",
    name: "Shrugs DB",
    reps: "12-15",
    sets: "2",
    note: "Lift shoulders straight up, not in circles.",
    image: [
      "https://cdn.shopify.com/s/files/1/0547/0486/5477/files/dumbbell-shrug_480x480.gif?v=1701426774"
    ],
    video: ["https://youtube.com/embed/rFsSeClGnNA"],
    impact: [
      "Builds traps.",
      "Supports neck and shoulders.",
      "Improves posture."
    ],
    impactImage:
      "https://cdn.shopify.com/s/files/1/0547/0486/5477/files/dumbbell-shrug_480x480.gif?v=1701426774"
  },

  {
    id: "ub-8",
    name: "External rotation DB",
    reps: "12-15",
    sets: "2",
    note: "Very slow, very light weight. Protects shoulders.",
    image: [
      "https://liftmanual.com/wp-content/uploads/2023/04/dumbbell-seated-external-rotation.jpg"
    ],
    video: ["https://youtube.com/embed/Nhq49UJefwI"],
    impact: [
      "Protects shoulder joints.",
      "Strengthens small muscles.",
      "Helps prevent injuries."
    ],
    impactImage:
      "https://liftmanual.com/wp-content/uploads/2023/04/dumbbell-seated-external-rotation.jpg"
  },

  {
    id: "ub-9",
    name: "Superman / Back extension",
    reps: "12-15",
    sets: "2",
    note: "Lift chest gently; don’t over-arch.",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Superman-exercise.gif",
      "https://www.inspireusafoundation.org/file/2022/04/weighted-hyperextension.gif"
    ],
    video: [
      "https://youtube.com/embed/VD6ma6oe4ZA",
      "https://youtube.com/embed/Wpreb69h2fE"
    ],
    impact: [
      "Strengthens lower back.",
      "Helps posture.",
      "Reduces back pain risk."
    ],
    impactImage:
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Superman-exercise.gif"
  },

  {
    id: "ub-10",
    name: "Supination DB curl",
    reps: "10-12",
    sets: "2",
    note: "Rotate wrist at the top for full bicep peak.",
    image: [
      "https://newlife.com.cy/wp-content/uploads/2019/11/23211301-Dumbbell-Standing-Inner-Biceps-Curl-version-2_Upper-Arms_360.gif"
    ],
    video: ["https://youtube.com/embed/_aoad2yuP5w"],
    impact: [
      "Builds biceps peak.",
      "Improves grip.",
      "Makes arms look bigger."
    ],
    impactImage:
      "https://newlife.com.cy/wp-content/uploads/2019/11/23211301-Dumbbell-Standing-Inner-Biceps-Curl-version-2_Upper-Arms_360.gif"
  },

  {
    id: "ub-11",
    name: "Biceps curl",
    reps: "10-12",
    sets: "2",
    note: "Don’t swing. Keep elbows locked to sides.",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Curl.gif"
    ],
    video: ["https://youtube.com/embed/MKWBV29S6c0"],
    impact: [
      "Builds front arm muscle.",
      "Improves pulling power.",
      "Helps all back workouts."
    ],
    impactImage:
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Curl.gif"
  },

  {
    id: "ub-12",
    name: "Triceps push down cable",
    reps: "10-12",
    sets: "2",
    note: "Keep elbows fixed; push only with triceps.",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Pushdown.gif"
    ],
    video: ["https://youtube.com/embed/1FjkhpZsaxc"],
    impact: [
      "Builds triceps.",
      "Improves push strength.",
      "Shapes the arms."
    ],
    impactImage:
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Pushdown.gif"
  },

  {
    id: "ub-13",
    name: "Forearm Gorilla Gripper",
    reps: "12-15",
    sets: "2",
    note: "Squeeze slowly; don’t rush the reps.",
    image: [
      "https://5.imimg.com/data5/SELLER/Default/2021/10/GI/IC/WX/13678780/gorilla-gripper-1000x1000.jpg"
    ],
    video: ["https://youtube.com/embed/J62QOrYtbfo"],
    impact: [
      "Builds strong forearms.",
      "Improves grip strength.",
      "Helps hold heavy weights."
    ],
    impactImage:
      "https://5.imimg.com/data5/SELLER/Default/2021/10/GI/IC/WX/13678780/gorilla-gripper-1000x1000.jpg"
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
      "https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/325/325373/neck-flexion-stretch-and-exercise-gif.gif?w=1845"
    ],
    video: [],
    impact: [
      "Relaxes muscles.",
      "Reduces soreness.",
      "Improves flexibility."
    ],
    impactImage:
      "https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/325/325373/shoulder-roll-stretch-and-exercise-gif.gif?w=1845"
  }
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
        impact: [
          "Works front abs",
          "Helps build core strength",
          "You feel the burn in upper abs",
        ],
        impactImage:
          "https://lifefitindia.com/wp-content/uploads/2025/07/decline-sit-up-muscle-worked.webp",
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
        impact: [
          "Targets lower abs",
          "Helps build core control",
          "You feel it below the belly button",
        ],
        impactImage:
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Lying-Leg-Raise.gif",
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
        impact: [
          "Works side abs (obliques)",
          "Helps shape waist",
          "You feel it on left or right side",
        ],
        impactImage:
          "https://cdn.shopify.com/s/files/1/1497/9682/files/2_e375444e-a875-4ce6-bef3-2a582d884bce.jpg?v=1653323820",
      },

      {
        id: "ca-4",
        name: "Russian twists (legs on floor) / Side bend DB",
        reps: "12-16",
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
        impact: [
          "Works side abs",
          "Improves twist strength",
          "You feel tightness in your core",
        ],
        impactImage:
          "https://www.kettlebellkings.com/cdn/shop/articles/russian-twist_cf5b5524-a334-4364-9cb9-54b5a04962d9.gif?v=1739267488&width=1000",
      },

      {
        id: "ca-5",
        name: "Plank",
        reps: "20–40s",
        sets: "2",
        note: "Keep body straight; don’t drop hips.",
        image: ["https://www.inspireusafoundation.org/file/2022/01/plank.gif"],
        video: ["https://youtube.com/embed/xe2MXatLTUw"],
        impact: [
          "Works whole core",
          "Helps improve stability",
          "You feel tightness in stomach & back",
        ],
        impactImage:
          "https://im.indiatimes.in/content/2017/Jun/muscles_hillwritingandediting_com_1497717343_725x725.jpg?w=725&h=483&cc=1&webp=1&q=75",
      },

      {
        id: "ca-6",
        name: "Stretching",
        reps: "30–40s",
        sets: "1",
        note: "Light cooldown to relax abs & lower back.",
        image: [
          "https://vibes2.funnyjunk.com/gifs/Exercise+routine_61d32c_7179399.gif",
          "https://media.tenor.com/YcE7CHM_HCsAAAAm/bubu-exercise-bubu-stretching.webp",
        ],
        video: [],
      },

      {
        id: "ca-7",
        name: "Light Cardio (Cycling / Treadmill)",
        reps: "10 min",
        sets: "1",
        note: "Keep pace easy; just warm and steady.",
        image: [
          "https://anime2.funnyjunk.com/gifs/Exercise+routine_c244c6_7179399.gif",
          "https://cdn.dribbble.com/userupload/42373824/file/original-aaddc4ceb0bc77336cf30c67459a331d.gif",
          "https://ugokawaii.com/wp-content/uploads/2024/01/bicycle.gif",
        ],
        video: [""],
        impact: [
          "Boosts heart health",
          "Burns extra calories",
          "You feel light sweat, steady breathing",
        ],
      },
    ],

    "Rest Day": [],
  },
};
