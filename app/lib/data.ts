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
  tips?: string[];
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
  planName: "Fitness Passion Gym (Intermediate)",
schedule: {
  Monday: "Back & Biceps",
  Tuesday: "Cardio & Crunches",
  Wednesday: "Chest & Triceps",
  Thursday: "Cardio & Crunches",
  Friday: "Legs & Shoulders",
  Saturday: "Cardio & Crunches",
  Sunday: "Rest Day",
},

  workouts: {
    "Back & Biceps": [
  {
    id: "bb-1",
    name: "Bent over row / Bench supported row",
    reps: "15-12",
    sets: "3",
    note: "Week 1: Bench supported. Week 2: Bent over.",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Bent-Over-Barbell-Row.gif",
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Row.gif"
    ],
    video: [
      "https://www.youtube.com/embed/vT2GjY_Umpw",
      "https://www.youtube.com/embed/roCP6wCXPqo"
    ],
    impact: [
      "Builds mid-back thickness",
      "Improves pulling strength",
      "Enhances posture and spinal stability"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/06/bent-over-row-muscles-worked.png"
  },

  {
    id: "bb-2",
    name: "Barbell row (prone grip)",
    reps: "15-12",
    sets: "3",
    note: "Week 2 exercise",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Row.gif"
    ],
    video: ["https://www.youtube.com/embed/9efgcAjQe7E"],
    impact: [
      "Targets lats and middle back",
      "Improves overall back density",
      "Strengthens core under load"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/06/barbell-row-muscles-worked.png"
  },

  {
    id: "bb-3",
    name: "Lat pull down",
    reps: "15-12",
    sets: "3",
    note: "Pull to upper chest",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Lat-Pulldown.gif"
    ],
    video: ["https://www.youtube.com/embed/CAwf7n6Luuc"],
    impact: [
      "Builds lat width",
      "Improves V-taper",
      "Enhances pulling mechanics"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/06/lat-pulldown-muscles-worked.png"
  },

  {
    id: "bb-4",
    name: "Straight arm pull down",
    reps: "15-12",
    sets: "2",
    note: "Keep arms slightly bent",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Straight-Arm-Pulldown.gif"
    ],
    video: ["https://www.youtube.com/embed/6Z15_WdXmVw"],
    impact: [
      "Isolates lats without biceps involvement",
      "Improves mind-muscle connection",
      "Helps lat activation before heavy rows"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/06/straight-arm-pulldown-muscles.png"
  },

  {
    id: "bb-5",
    name: "Low row machine / Seated row machine",
    reps: "15-12",
    sets: "3",
    note: "Alternate weekly",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Cable-Row.gif"
    ],
    video: ["https://www.youtube.com/embed/GZbfZ033f74"],
    impact: [
      "Builds mid-back thickness",
      "Improves scapular control",
      "Supports posture correction"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/06/seated-row-muscles-worked.png"
  },

  {
    id: "bb-6",
    name: "Dumbbell shrugs / Infinity shrugs",
    reps: "15-12",
    sets: "3",
    note: "Alternate weekly",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Shrug.gif"
    ],
    video: ["https://www.youtube.com/embed/cJRVVxmytaM"],
    impact: [
      "Builds upper traps",
      "Supports neck and shoulder stability",
      "Improves upper-back appearance"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/06/shrug-muscles-worked.png"
  },

  {
    id: "bb-7",
    name: "Back extension / Good morning",
    reps: "15-12",
    sets: "3",
    note: "Max 15kg",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Hyperextension.gif"
    ],
    video: ["https://www.youtube.com/embed/ph3pddpKzzw"],
    impact: [
      "Strengthens lower back",
      "Reduces injury risk",
      "Improves hip hinge strength"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/06/back-extension-muscles.png"
  },

  {
    id: "bb-8",
    name: "Supination dumbbell curl",
    reps: "15-12",
    sets: "3",
    note: "Rotate wrist at top",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Curl.gif"
    ],
    video: ["https://www.youtube.com/embed/ykJmrZ5v0Oo"],
    impact: [
      "Builds biceps peak",
      "Improves arm aesthetics",
      "Enhances elbow strength"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/06/biceps-curl-muscles-worked.png"
  },

  {
    id: "bb-9",
    name: "Reverse cable curl / Hammer curl",
    reps: "15-12",
    sets: "2",
    note: "Alternate weekly",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Hammer-Curl.gif"
    ],
    video: ["https://www.youtube.com/embed/zC3nLlEvin4"],
    impact: [
      "Targets brachialis",
      "Builds arm thickness",
      "Improves grip strength"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/06/hammer-curl-muscles.png"
  },

  {
    id: "bb-10",
    name: "Concentration curl / Preacher curl",
    reps: "15-12",
    sets: "2",
    note: "Strict form only",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Concentration-Curl.gif"
    ],
    video: ["https://www.youtube.com/embed/Jvj2wV0vOYU"],
    impact: [
      "Improves biceps isolation",
      "Enhances peak contraction",
      "Reduces cheating"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/06/preacher-curl-muscles.png"
  },

  {
    id: "bb-11",
    name: "Barbell / Cable biceps curl",
    reps: "15-12",
    sets: "2",
    note: null,
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Curl.gif"
    ],
    video: ["https://www.youtube.com/embed/kwG2ipFRgfo"],
    impact: [
      "Builds overall biceps mass",
      "Increases pulling strength",
      "Improves arm symmetry"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/06/barbell-curl-muscles.png"
  },

  {
    id: "bb-12",
    name: "Forearms – Gorilla gripper",
    reps: "15-12",
    sets: "3",
    note: "Slow controlled squeeze",
    image: [
      "https://5.imimg.com/data5/SELLER/Default/2021/10/GI/IC/WX/13678780/gorilla-gripper-1000x1000.jpg"
    ],
    video: ["https://www.youtube.com/embed/J62QOrYtbfo"],
    impact: [
      "Builds crushing grip strength",
      "Enhances forearm density",
      "Improves performance in pulls"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/06/forearm-muscles-worked.png"
  },

  {
    id: "bb-13",
    name: "Dumbbell forearm curl",
    reps: "15-12",
    sets: "2",
    note: null,
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Wrist-Curl.gif"
    ],
    video: ["https://www.youtube.com/embed/qyT5hR9Y8dQ"],
    impact: [
      "Strengthens wrist flexors",
      "Prevents elbow pain",
      "Improves grip endurance"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/06/wrist-curl-muscles.png"
  }
],

    "Chest & Triceps": [
  {
    id: "ct-1",
    name: "Flat DB press",
    reps: "15-12",
    sets: "3",
    note: "Control the negative",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Press.gif"
    ],
    video: ["https://www.youtube.com/embed/WbCEvFA0NJs"],
    impact: [
      "Builds overall chest mass",
      "Improves pushing strength",
      "Engages shoulders and triceps"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/06/dumbbell-press-muscles-worked.png"
  },

  {
    id: "ct-2",
    name: "Incline DB press",
    reps: "15-12",
    sets: "3",
    note: "Bench at 30–45 degrees",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Dumbbell-Press.gif"
    ],
    video: ["https://www.youtube.com/embed/8fXfwG4ftaQ"],
    impact: [
      "Targets upper chest",
      "Improves chest fullness",
      "Reduces shoulder dominance"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/06/incline-press-muscles-worked.png"
  },

  {
    id: "ct-3",
    name: "Decline DB press",
    reps: "15-12",
    sets: "3",
    note: "Do not flare elbows",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Decline-Dumbbell-Press.gif"
    ],
    video: ["https://www.youtube.com/embed/LfyQBUKR8SE"],
    impact: [
      "Builds lower chest density",
      "Allows heavier loading",
      "Reduces shoulder stress"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/06/decline-press-muscles-worked.png"
  },

  {
    id: "ct-4",
    name: "Pec dec fly / Cable crossover",
    reps: "15-12",
    sets: "3",
    note: "Week alternate",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Pec-Deck-Fly.gif",
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Cable-Crossover.gif"
    ],
    video: [
      "https://www.youtube.com/embed/eozdVDA78K0",
      "https://www.youtube.com/embed/taI4XduLpTk"
    ],
    impact: [
      "Improves chest isolation",
      "Enhances inner chest contraction",
      "Increases time under tension"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/06/chest-fly-muscles-worked.png"
  },

  {
    id: "ct-5",
    name: "Push-ups (optional)",
    reps: "15-12",
    sets: "3",
    note: "Knee → Regular",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Push-Up.gif"
    ],
    video: ["https://www.youtube.com/embed/IODxDxX7oi4"],
    impact: [
      "Improves chest endurance",
      "Enhances core stability",
      "Good metabolic finisher"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/06/pushup-muscles-worked.png"
  },

  {
    id: "ct-6",
    name: "Bar dips assisted / Close grip bench press",
    reps: "15-12",
    sets: "3",
    note: "Week alternate",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Bench-Dips.gif",
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Close-Grip-Bench-Press.gif"
    ],
    video: [
      "https://www.youtube.com/embed/2z8JmcrW-As",
      "https://www.youtube.com/embed/0w9FzvYJ5cA"
    ],
    impact: [
      "Builds triceps mass",
      "Improves lockout strength",
      "Transfers to pressing movements"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/06/triceps-dip-muscles.png"
  },

  {
    id: "ct-7",
    name: "Triceps pushdown cable / rope",
    reps: "15-12",
    sets: "3",
    note: "Elbows fixed",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Pushdown.gif"
    ],
    video: ["https://www.youtube.com/embed/2-LAMcpzODU"],
    impact: [
      "Builds triceps definition",
      "Improves elbow stability",
      "Isolates lateral head"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/06/triceps-pushdown-muscles.png"
  },

  {
    id: "ct-8",
    name: "Overhead triceps extension / Skull crusher DB",
    reps: "15-12",
    sets: "3",
    note: "Stretch at bottom",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Overhead-Dumbbell-Triceps-Extension.gif",
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Skullcrusher.gif"
    ],
    video: [
      "https://www.youtube.com/embed/YbX7Wd8jQ-Q",
      "https://www.youtube.com/embed/d_KZxkY_0cM"
    ],
    impact: [
      "Targets long head of triceps",
      "Increases arm thickness",
      "Improves overhead stability"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/06/overhead-triceps-muscles.png"
  },

  {
    id: "ct-9",
    name: "Kickback DB / Triceps extension DB",
    reps: "15-12",
    sets: "3",
    note: "Strict form only",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Kickback.gif"
    ],
    video: ["https://www.youtube.com/embed/6SS6K3lAwZ8"],
    impact: [
      "Improves triceps peak contraction",
      "Enhances arm detail",
      "Low joint stress finisher"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/06/triceps-kickback-muscles.png"
  },

  {
    id: "ct-10",
    name: "Triceps press machine",
    reps: "15-12",
    sets: "3",
    note: "Slow and controlled",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Triceps-Press-Machine.gif"
    ],
    video: ["https://www.youtube.com/embed/hkU6fSHcslw"],
    impact: [
      "Safely overloads triceps",
      "Good for volume accumulation",
      "Minimal shoulder stress"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/06/triceps-press-muscles.png"
  }
],

    "Legs & Shoulders": [
  {
    id: "ls-1",
    name: "Barbell Squats",
    reps: "15-12",
    sets: "3",
    note: "Main compound lift. Keep neutral spine.",
    image: [
      "https://media.tenor.com/pdMmsiutWkcAAAAM/gym.gif"
    ],
    video: ["https://www.youtube.com/embed/ultWZbUMPL8"],
    impact: [
      "Builds overall leg mass",
      "Improves core and hip strength",
      "Boosts total-body power"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/03/full-squat-side-view.gif"
  },

  {
    id: "ls-2",
    name: "Forward lunges / Reverse lunges",
    reps: "15-12",
    sets: "2",
    note: "Week alternate",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lunge.gif","https://www.inspireusafoundation.org/file/2023/07/reverse-deficit-lunge.gif"
    ],
    video: ["https://www.youtube.com/embed/QOVaHwm-Q6U"],
    impact: [
      "Improves single-leg strength",
      "Enhances balance and coordination",
      "Targets glutes and quads"
    ],
    impactImage:
      "https://www.garagegymreviews.com/wp-content/uploads/2023/01/lunge-muscles.jpg"
  },

  {
    id: "ls-3",
    name: "Leg press / Leg extension",
    reps: "15-12",
    sets: "2",
    note: "Week alternate",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2015/11/Leg-Press.gif",
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/LEG-EXTENSION.gif"
    ],
    video: [
      "https://www.youtube.com/embed/pCLf-OeSMtQ",
      "https://www.youtube.com/embed/YyvSfVjQeL0"
    ],
    impact: [
      "Isolates quadriceps",
      "Allows safe overload",
      "Improves knee stability"
    ],
    impactImage:
      "https://cdn.shopify.com/s/files/1/0618/9462/3460/files/Leg-Press-min-800x800.png"
  },

  {
    id: "ls-4",
    name: "Hip thrust (optional)",
    reps: "15-12",
    sets: "3",
    note: "Pause at top",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Hip-Thrust.gif","https://media.tenor.com/YYb0P0Kdr84AAAAM/hip-thrust.gif"
    ],
    video: ["https://www.youtube.com/embed/LM8XHLYJoYs"],
    impact: [
      "Maximally activates glutes",
      "Improves hip power",
      "Supports squat and deadlift strength"
    ],
    impactImage:
      "https://www.meridian-fitness.co.uk/wp-content/uploads/2025/04/Hip-thrust-muscles-worked.webp"
  },

  {
    id: "ls-5",
    name: "Standing calf raise",
    reps: "15-12",
    sets: "3",
    note: "Full stretch at bottom",
    image: [
      "https://www.inspireusafoundation.org/file/2022/11/standing-calf-raise.gif"
    ],
    video: ["https://www.youtube.com/embed/-M4-G8p8fmc"],
    impact: [
      "Builds gastrocnemius muscle",
      "Improves ankle strength",
      "Enhances running and jumping ability"
    ],
    impactImage:
      "https://chunkfitness.com/sites/default/files/standing-calf-raises-machine.jpg"
  },

  {
    id: "ls-6",
    name: "Seated calf raise",
    reps: "15-12",
    sets: "4",
    note: "Slow tempo",
    image: [
      "https://www.inspireusafoundation.org/file/2022/11/seated-calf-raise.gif"
    ],
    video: ["https://www.youtube.com/embed/Yh6wS_C0Eaw"],
    impact: [
      "Targets soleus muscle",
      "Improves lower-leg endurance",
      "Supports squat stability"
    ],
    impactImage:
      "https://blog.myarsenalstrength.com/hs-fs/hubfs/IMG_1714.jpg"
  },

  {
    id: "ls-7",
    name: "Leg curl",
    reps: "15-12",
    sets: "2",
    note: "Controlled negatives",
    image: [
      "https://media.tenor.com/ZElx6PviDq0AAAAM/gym.gif"
    ],
    video: ["https://www.youtube.com/embed/_lgE0gPvbik"],
    impact: [
      "Strengthens hamstrings",
      "Protects knees",
      "Balances quad dominance"
    ],
    impactImage:
      "https://cdn.shopify.com/s/files/1/0564/2607/0148/files/leg_curls_msucles.png?v=1707809130"
  },

  {
    id: "ls-8",
    name: "Overhead press DB / BB",
    reps: "15-12",
    sets: "3",
    note: "Week alternate",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2023/09/Standing-Dumbbell-Overhead-Press.gif"
    ],
    video: ["https://www.youtube.com/embed/eNMl9UoO7YA"],
    impact: [
      "Builds shoulder mass",
      "Improves overhead strength",
      "Enhances core stability"
    ],
    impactImage:
      "https://kinxlearning.com/cdn/shop/files/seated_pess_db_1000x.jpg?v=1690581184"
  },

  {
    id: "ls-9",
    name: "Lateral raise DB / Machine",
    reps: "15-12",
    sets: "2",
    note: "No swinging",
    image: [
      "https://media.tenor.com/-OavRqpxSaEAAAAM/eleva%C3%A7%C3%A3o-lateral.gif","https://i.pinimg.com/originals/f1/61/4d/f1614d1e8e4bc45b75e682533dd7c940.gif","https://www.inspireusafoundation.org/file/2023/07/lateral-raise-machine.gif"
    ],
    video: ["https://www.youtube.com/embed/3VcKaXpzqRo"],
    impact: [
      "Builds shoulder width",
      "Improves upper-body aesthetics",
      "Targets medial delts"
    ],
    impactImage:
      "https://media.istockphoto.com/id/538051060/photo/3d-male-figure-doing-dumbbell-standing-lateral-raise.jpg?s=1024x1024&w=is&k=20&c=c8B_VMXVI4Qb_wswhyRUWf1-TsWQaBbkuH-hx8zlX0E="
  },

  {
    id: "ls-10",
    name: "Reverse fly / Face pull",
    reps: "15-12",
    sets: "2",
    note: "Control every rep",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Face-Pull.gif"
    ],
    video: ["https://www.youtube.com/embed/rep-qVOkqgk"],
    impact: [
      "Strengthens rear delts",
      "Improves shoulder health",
      "Corrects posture imbalance"
    ],
    impactImage:
      "https://burnfit.io/wp-content/uploads/2023/11/FACE_PULL.gif"
  },

  {
    id: "ls-11",
    name: "External rotation DB",
    reps: "15-12",
    sets: "2",
    note: "Light weight only",
    image: [
      "https://gymvisual.com/img/p/2/7/3/2/6/27326.gif"
    ],
    video: ["https://www.youtube.com/embed/Nhq49UJefwI"],
    impact: [
      "Protects rotator cuff",
      "Prevents shoulder injuries",
      "Improves joint stability"
    ],
    impactImage:
      "https://liveleantv.s3.amazonaws.com/wp-content/uploads/2023/05/18090614/muscle-diagram-shoulders.png"
  },

  {
    id: "ls-12",
    name: "Lower body & compound stretching",
    reps: "20s hold",
    sets: "2",
    note: "Do not skip",
    image: [
      "https://cdn-prod.medicalnewstoday.com/content/images/articles/326/326799/a-gif-of-the-knee-hug.gif","https://i.pinimg.com/originals/20/82/af/2082afc1a5fdc5cedb46526b6b5822ad.gif","https://fitnessprogramer.com/wp-content/uploads/2021/05/Standing-Hamstring-Stretch.gif","https://www.inspireusafoundation.org/file/2023/08/hip-swirls.gif","https://fitnessprogramer.com/wp-content/uploads/2021/02/Butterfly-Stretch.gif","https://cdn-prod.medicalnewstoday.com/content/images/articles/326/326799/a-gif-of-childs-pose.gif","https://cdn.shopify.com/s/files/1/0109/0663/2256/files/Woman_doing_downward_dog_yoga_pose_1_480x480.gif?v=1692590848","https://media.post.rvohealth.io/wp-content/uploads/sites/2/2021/02/Shoulder-roll.gif","https://images.squarespace-cdn.com/content/v1/5d31ed671abe780001b2964d/1620947533438-0RF8Y1OXN4KDEMIIKC36/Briohny+Smyth+doing+a+side-body+extension+stretch","https://media.post.rvohealth.io/wp-content/uploads/sites/3/2024/01/Childs-Pose.gif"
    ],
    video: ["https://www.youtube.com/embed/sTxC3J3gQEU"],
    impact: [
      "Improves flexibility",
      "Reduces post-workout soreness",
      "Enhances recovery"
    ],
    impactImage:
      "https://nadin4eblog.wordpress.com/wp-content/uploads/2016/03/stretching-12.png?w=640"
  }
],
"Cardio & Crunches": [
  {
    id: "cc-1",
    name: "Sit-ups (on board)",
    reps: "20-15",
    sets: "3",
    note: "Controlled movement, no jerking",
    tips: [
      "Lock feet securely and keep knees bent.",
      "Exhale as you come up, inhale on the way down.",
      "Do not pull neck — core should initiate movement."
    ],
    image: [
      "https://www.inspireusafoundation.org/decline-sit-up/"
    ],
    video: ["https://youtube.com/shorts/D_6tXVmq_nM?si=pAgBMJOqOalMLlKM"],
    impact: [
      "Targets upper abdominal muscles",
      "Improves core endurance",
      "Builds foundational ab strength"
    ],
    impactImage:
      "https://www.pinterest.com/pin/sit-up-anatomy--373235887845586885/"
  },

  {
    id: "cc-2",
    name: "Reverse crunch",
    reps: "20-15",
    sets: "2",
    note: "Lift hips, not legs only",
    tips: [
      "Press lower back into the floor.",
      "Lift hips upward, not just legs.",
      "Control the negative — don’t swing."
    ],
    image: [
      "https://www.liftingitalia.com/?a=75265667021500","https://burnfit.io/en/library/reverse-crunch/"
    ],
    video: ["https://www.pinterest.com/pin/abdominals-decline-reverse-crunch--2744449763698107/"],
    impact: [
      "Targets lower abdominal region",
      "Reduces lower belly fat appearance",
      "Improves pelvic control"
    ],
    impactImage:
      "https://youtube.com/shorts/XN7l5P8qXBA?si=KvxWNqfaC20qyVGG"
  },

  {
    id: "cc-3",
    name: "Leg raise",
    reps: "20-15",
    sets: "3",
    note: "Lower back pressed to floor",
    tips: [
      "Keep hands under hips for support if needed.",
      "Lower legs slowly — no dropping.",
      "Stop before lower back arches."
    ],
    image: [
      "https://liftmanual.com/leg-raise-hip-lift/"
    ],
    video: ["https://youtube.com/shorts/wt1zvu84oGo?si=dEN2OkvNO6MBSIuc",
      "https://youtube.com/shorts/Gw_3oAQyHXA?si=h5DjcI64oI10JkpX"
    ],
    impact: [
      "Builds lower abs",
      "Strengthens hip flexors",
      "Improves core stability"
    ],
    impactImage:
      "https://lifefitindia.com/hanging-leg-raise/?srsltid=AfmBOorR8UA4QXWxmprlhcRLCE0PZqiimiPs07Km-POB8KmMOI0Ewvhy"
  },

  {
    id: "cc-4",
    name: "Double leg cycling",
    reps: "20-15",
    sets: "2",
    note: "Slow and controlled",
    tips: [
      "Keep elbows wide and chest open.",
      "Twist from torso, not neck.",
      "Maintain constant tension on abs."
    ],
    image: [
      "https://kr.pinterest.com/pin/717550153168191153/","https://newlife.com.cy/en/bicycle-crunch/","https://tenor.com/search/cycling-crunch-gifs",
    ],
    video: ["https://www.youtube.com/embed/9FGilxCbdz8","https://youtube.com/shorts/uHHJOP68o6k?si=Vdq5vfxnUBekBKCq","https://youtube.com/shorts/H12jbLNNo8o?si=cCNjKLlky6fOgXR4"],
    impact: [
      "Engages entire core",
      "Improves coordination",
      "Increases calorie burn"
    ],
    impactImage:
      "https://www.strengthlog.com/stationary-bike/"
  },

  {
    id: "cc-5",
    name: "Russian twists (legs on floor)",
    reps: "20-15",
    sets: "2",
    note: "Twist from torso, not arms",
    tips: [
      "Sit on mat with knees bent, hold DB.",
      "Twist torso left, touch DB near hip.",
      "Repeat on right side with control."
    ],
    image: [
      "https://ar.pinterest.com/pin/184788390950338119/"
    ],
    video: ["https://www.youtube.com/embed/iFQV6q4xRXM","https://youtube.com/shorts/C3RauLi8FNw?si=kq99Ybx5wHBOjB6u"],
    impact: [
      "Targets oblique muscles",
      "Improves rotational strength",
      "Helps shape waistline"
    ],
    impactImage:
      "https://www.shutterstock.com/video/clip-3717811381-dumbbell-military-press-russian-twist-legs-floor"
  },

  {
    id: "cc-6",
    name: "Plank",
    reps: "20-15 sec",
    sets: "2",
    note: "Neutral spine, squeeze glutes",
    tips: [
      "Keep head, spine, and hips aligned.",
      "Brace core as if preparing for impact.",
      "Breathe steadily — don’t hold breath."
    ],
    image: [
      "https://www.inspireusafoundation.org/planks/"
    ],
    video: ["https://www.youtube.com/embed/xe2MXatLTUw"],
    impact: [
      "Strengthens entire core",
      "Improves posture",
      "Enhances spinal stability"
    ],
    impactImage:
      "https://www.liftingitalia.com/?a=68117130031500"
  },

  {
    id: "cc-7",
    name: "Side bend cable",
    reps: "20-15",
    sets: "3",
    note: "Slow eccentric",
    tips: [
      "Keep hips fixed — only torso moves.",
      "Lower weight slowly for max tension.",
      "Avoid leaning forward or backward."
    ],
    image: [
      "https://burnfit.io/en/library/cable-side-bend/"
    ],
    video: ["https://www.youtube.com/embed/44DazvtgpGE"],
    impact: [
      "Strengthens obliques",
      "Improves lateral core stability",
      "Supports spinal balance"
    ],
    impactImage:
      "https://fitliferegime.com/how-to-do-cable-side-bend-its-benefits/?srsltid=AfmBOoqQckCWke_f43Gw6trkFST1puCc0ftVphG0EUt5PaHWEHc7-Xk2"
  },

  {
    id: "cc-8",
    name: "Caterpillar walk",
    reps: "20-15",
    sets: "2",
    note: "Slow walkout and return",
    tips: [
      "Walk hands out slowly to plank.",
      "Keep core tight throughout movement.",
      "Reverse back with control."
    ],
    image: [
      "https://www.dgmindia.in/index.php?shop/interattrition/dioxane14613215466.html","https://www.shutterstock.com/image-vector/girl-doing-caterpillar-walk-exercise-fitness-1999709960"
    ],
    video: ["https://www.youtube.com/embed/w2vZ0k6JX1o"],
    impact: [
      "Improves core and shoulder mobility",
      "Enhances flexibility",
      "Acts as active recovery"
    ],
    impactImage:
      "https://www.shutterstock.com/image-vector/woman-doing-inchworm-walking-exercise-fitness-2054345171"
  }
],

    "Rest Day": [],
  },
};

export const WORKOUT_PLAN_VERSION = hashWorkoutPlan(MOCK_WORKOUT_PLAN);

function hashWorkoutPlan(plan: WorkoutPlan): string {
  return hashString(JSON.stringify(plan));
}

function hashString(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString(16);
}
