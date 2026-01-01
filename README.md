## Gen Z Gym Companion

A mobile-first Next.js experience that turns any beginner PDF into a vibrant, animated workout tracker. The current MVP simulates the "AI" backend with a mock JSON response but preserves the full upload flow so we can swap in a real service later.

### Stack

- Next.js 16 (App Router) + React 19
- Tailwind CSS v4 + shadcn/ui components + lucide-react icons
- Framer Motion for page/component animations
- date-fns for streaks, timestamps, and friendly dates

### Architecture


- `app/page.tsx` only decides between onboarding and dashboard states via `useWorkoutStore`.
- `app/lib/data.ts` hosts the mock AI JSON; swap with a real API response without touching UI code.
- `app/lib/hooks.ts` owns localStorage hydration, streak resets, and the `toggleComplete` checklist logic.
- `app/components/*` break the UI into focused pieces (`Onboarding`, `Dashboard`, `StatsGrid`, `WorkoutList`, `ExerciseCard`).

### Features

- Two-step onboarding (name + PDF upload) with a simulated AI parsing delay.
- Neon-inspired dashboard header, stat grid, and accordion-based workout list with animated checkboxes.
- Daily progress + streak tracking, with completions auto-clearing when the calendar date changes.
- Rest-day detection that swaps the workout list for a playful recovery card.

### Run It Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000` on a phone or narrow browser window for the intended experience. To reset the experience, clear `localStorage` (key: `gym-app-store`) or use the helper inside `useWorkoutStore`.\*\*\* End Patch
