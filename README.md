## Gym Workout MVP

Mobile-first gym companion that turns a static beginner PDF into an adaptive Next.js experience. The app greets the user, remembers their onboarding details, and automatically adjusts sets/reps based on how many weeks they have been grinding.

### Stack

- Next.js 16 (App Router) + React 19
- Tailwind CSS v4, shadcn/ui, lucide-react icons
- Framer Motion for transitions, date-fns for time math

### Features

- Multi-step onboarding with name + start date persisted in `localStorage`
- Dark, "Gen Z" inspired dashboard that prioritizes mobile layouts (`max-w-lg mx-auto`)
- Day-aware workout plan with plan aliases (Thu=Mon, etc.) baked into a `workoutPlan` const
- Exercise cards that animate in and automatically pick the correct set/rep range per week
- Rest-day messaging and subtle experience chips (Beginner → Beast Mode)

### Run It Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000` on a phone or narrow browser window for the intended experience. Update `app/page.tsx` to tweak copy, exercises, or animations.\*\*\* End Patch
