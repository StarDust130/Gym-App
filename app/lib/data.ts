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
        reps: "20-15",
        sets: "2-3",
        note: "Start in Week 1.",
        image: [
          "https://images.unsplash.com/photo-1598971639058-9b19603f83b9?w=800&auto=format&fit=crop&q=60",
          "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&auto=format&fit=crop&q=60",
        ],
        video: [],
      },
      {
        id: "ub-2",
        name: "Supported Low row / Seated row M/C",
        reps: "20-15",
        sets: "2-3",
        note: "Use M/C in Week 2.",
        image: [
          "https://images.unsplash.com/photo-1598971639058-9b19603f83b9?w=800&auto=format&fit=crop&q=60",
        ],
        video: [],
      },
      {
        id: "ub-3",
        name: "Shrugs DB",
        reps: "20-15",
        sets: "2-3",
        note: null,
        image: [
          "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&auto=format&fit=crop&q=60",
        ],
        video: [],
      },
      {
        id: "ub-4",
        name: "Flat DB Press",
        reps: "20-15",
        sets: "2-3",
        note: null,
        image: [
          "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&auto=format&fit=crop&q=60",
          "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&auto=format&fit=crop&q=60",
        ],
        video: [],
      },
      {
        id: "ub-5",
        name: "Incline DB Press",
        reps: "20-15",
        sets: "2-3",
        note: "Start in Week 1.",
        image: [
          "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&auto=format&fit=crop&q=60",
        ],
        video: [],
      },
      {
        id: "ub-6",
        name: "Incline M/C Press (optional)",
        reps: "20-15",
        sets: "2-3",
        note: "Start in Week 2.",
        image: [
          "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&auto=format&fit=crop&q=60",
        ],
        video: [],
      },
      {
        id: "ub-7",
        name: "Overhead press DB",
        reps: "20-15",
        sets: "2-3",
        note: null,
        image: [
          "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&auto=format&fit=crop&q=60",
        ],
        video: [],
      },
      {
        id: "ub-8",
        name: "External rotation DB",
        reps: "20-15",
        sets: "2-3",
        note: null,
        image: [
          "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&auto=format&fit=crop&q=60",
        ],
        video: [],
      },
      {
        id: "ub-9",
        name: "Superman / Back extension",
        reps: "20-15",
        sets: "2-3",
        note: "Start Back extension after 15 days.",
        image: [
          "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=800&auto=format&fit=crop&q=60",
        ],
        video: [],
      },
      {
        id: "ub-10",
        name: "Supination DB curl",
        reps: "20-15",
        sets: "2-3",
        note: "Start in Week 1.",
        image: [
          "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&auto=format&fit=crop&q=60",
        ],
        video: [],
      },
      {
        id: "ub-11",
        name: "Biceps curl",
        reps: "20-15",
        sets: "2-3",
        note: "Start in Week 2.",
        image: [
          "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&auto=format&fit=crop&q=60",
        ],
        video: [],
      },
      {
        id: "ub-12",
        name: "Triceps push down cable",
        reps: "20-15",
        sets: "2-3",
        note: null,
        image: [
          "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=60",
        ],
        video: [],
      },
      {
        id: "ub-13",
        name: "Forearm Gorilla Gripper",
        reps: "20-15",
        sets: "2-3",
        note: null,
        image: [
          "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&auto=format&fit=crop&q=60",
        ],
        video: [],
      },
      {
        id: "ub-14",
        name: "Upper body stretch",
        reps: "N/A",
        sets: "1",
        note: "Hold each stretch for 30s.",
        image: [
          "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=800&auto=format&fit=crop&q=60",
        ],
        video: [],
      },
    ],
    "Cardio & Abs": [
      {
        id: "ca-1",
        name: "Sit up (on floor)",
        reps: "20-15",
        sets: "2-3",
        note: null,
        image: [
          "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&auto=format&fit=crop&q=60",
        ],
        video: [],
      },
      {
        id: "ca-2",
        name: "Side crunch",
        reps: "20-15",
        sets: "2-3",
        note: null,
        image: [
          "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&auto=format&fit=crop&q=60",
        ],
        video: [],
      },
      {
        id: "ca-3",
        name: "Leg raise",
        reps: "20-15",
        sets: "2-3",
        note: null,
        image: [
          "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&auto=format&fit=crop&q=60",
        ],
        video: [],
      },
      {
        id: "ca-4",
        name: "Russian twists (legs on floor) / Side bend DB",
        reps: "20-15",
        sets: "2-3",
        note: null,
        image: [
          "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&auto=format&fit=crop&q=60",
        ],
        video: [],
      },
      {
        id: "ca-5",
        name: "Plank",
        reps: "30-60s",
        sets: "2-3",
        note: null,
        image: [
          "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&auto=format&fit=crop&q=60",
        ],
        video: [],
      },
      {
        id: "ca-6",
        name: "Stretching",
        reps: "N/A",
        sets: "1",
        note: null,
        image: [
          "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=800&auto=format&fit=crop&q=60",
        ],
        video: [],
      },
    ],
    "Rest Day": [],
  },
};
