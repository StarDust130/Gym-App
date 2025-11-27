import { motion, AnimatePresence } from "framer-motion";
import { CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useMemo, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  RotateCcw,
  Timer as TimerIcon,
  Zap,
  CheckCircle2,
  PartyPopper,
} from "lucide-react";
import Confetti from "react-confetti";

// -------------------------
const WORKOUT_DURATION = 45 * 60; // 45 minutes
// -------------------------

const emojis = ["🐥", "💪", "🔥", "⚡", "🎯", "🚀", "⭐", "🏋️", "🎉", "✨"];
const WORKOUT_DURATION = 45 * 60; // 45 minutes
const TIMER_STORAGE_KEY = "workout-timer-state";

// Window size hook
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export function StatsGrid(props: StatsGridProps) {
  // --- TIMER STATE ---
  const [isActive, setIsActive] = useState(false);
  const [startTimestamp, setStartTimestamp] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(WORKOUT_DURATION);
  const [remainingAtLastStart, setRemainingAtLastStart] = useState(
    WORKOUT_DURATION
  );

  const [endTime, setEndTime] = useState<string | null>(null);
  const [completionDuration, setCompletionDuration] = useState<string | null>(
    null
  );
  const [showConfetti, setShowConfetti] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { width, height } = useWindowSize();

  const dailyEmoji = useMemo(() => {
    const today = new Date().toDateString();
    const seed = today.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
    return emojis[seed % emojis.length];
  }, []);

  const isFinished = progressPercent >= 100;

  useEffect(() => {
    setMounted(true);
  }, []);

  // --- LOAD TIMER FROM STORAGE ---
  useEffect(() => {
    try {
      const saved = localStorage.getItem(TIMER_STORAGE_KEY);
      if (!saved) return;

      const parsed = JSON.parse(saved) as {
        isActive: boolean;
        startTimestamp: number | null;
        remainingAtLastStart: number;
      };

      const savedRemaining =
        typeof parsed.remainingAtLastStart === "number"
          ? parsed.remainingAtLastStart
          : WORKOUT_DURATION;

      setRemainingAtLastStart(savedRemaining);

      if (parsed.isActive && parsed.startTimestamp) {
        const now = Date.now();
        const elapsed = Math.floor((now - parsed.startTimestamp) / 1000);
        const remaining = savedRemaining - elapsed;
        setTimeLeft(remaining);
        setIsActive(true);
        setStartTimestamp(parsed.startTimestamp);
      } else {
        setTimeLeft(savedRemaining);
        setIsActive(false);
        setStartTimestamp(null);
      }
    } catch {
      // if something is wrong, fall back to defaults
      setIsActive(false);
      setStartTimestamp(null);
      setTimeLeft(WORKOUT_DURATION);
      setRemainingAtLastStart(WORKOUT_DURATION);
    }
  }, []);

  // -------------------------
  // 2️⃣ REAL TIME TIMER LOOP
  // -------------------------
  useEffect(() => {
    if (!isActive || !startTimestamp) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - startTimestamp) / 1000);
      const remaining = remainingAtLastStart - elapsed;
      setTimeLeft(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, startTimestamp, remainingAtLastStart]);

  // --- HANDLE FINISH (BASED ON PROGRESS) ---
  useEffect(() => {
    if (!isFinished) return;

    setIsActive(false);
    localStorage.removeItem("timerStart");
    localStorage.removeItem("timerActive");

      // total elapsed based on countdown
      const totalElapsed = WORKOUT_DURATION - timeLeft;
      const m = Math.floor(totalElapsed / 60);
      const s = totalElapsed % 60;
      const durationString = `${m} min ${s > 0 ? `${s}s` : ""}`;

      setCompletionDuration(`${m} min ${s > 0 ? `${s}s` : ""}`);
      setEndTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);

      // update storage to paused at current remaining
      localStorage.setItem(
        TIMER_STORAGE_KEY,
        JSON.stringify({
          isActive: false,
          startTimestamp: null,
          remainingAtLastStart: timeLeft,
        })
      );
    }
  }, [isFinished, isActive, timeLeft]);

  const persistTimerState = (
    nextIsActive: boolean,
    nextStartTimestamp: number | null,
    nextRemainingAtLastStart: number
  ) => {
    localStorage.setItem(
      TIMER_STORAGE_KEY,
      JSON.stringify({
        isActive: nextIsActive,
        startTimestamp: nextStartTimestamp,
        remainingAtLastStart: nextRemainingAtLastStart,
      })
    );
  };

  // -------------------------
  // 4️⃣ Timer toggle (start / pause)
  // -------------------------
  const toggleTimer = () => {
    if (isFinished) return;

    // START / RESUME
    if (!isActive) {
      const now = Date.now();
      // snapshot current remaining as baseline for this run
      const baselineRemaining = timeLeft;

      setStartTimestamp(now);
      setIsActive(true);
      setRemainingAtLastStart(baselineRemaining);

      persistTimerState(true, now, baselineRemaining);
      return;
    }

    // PAUSE
    if (isActive) {
      let remainingNow = timeLeft;

      if (startTimestamp) {
        const now = Date.now();
        const elapsed = Math.floor((now - startTimestamp) / 1000);
        remainingNow = remainingAtLastStart - elapsed;
      }

      setTimeLeft(remainingNow);
      setRemainingAtLastStart(remainingNow);
      setIsActive(false);
      setStartTimestamp(null);

      persistTimerState(false, null, remainingNow);
    }
  };

  // -------------------------
  // 5️⃣ Reset timer
  // -------------------------
  const resetTimer = (e: React.MouseEvent) => {
    e.stopPropagation();

    setIsActive(false);
    setStartTimestamp(null);

    setTimeLeft(WORKOUT_DURATION);
    setRemainingAtLastStart(WORKOUT_DURATION);
    setEndTime(null);
    setCompletionDuration(null);
    setShowConfetti(false);

    localStorage.removeItem(TIMER_STORAGE_KEY);
  };

  // -------------------------
  const formatTime = (seconds: number) => {
    const overtime = seconds < 0;
    const t = Math.abs(seconds);
    const m = Math.floor(t / 60);
    const s = t % 60;

    return {
      text: `${overtime ? "+" : ""}${m.toString().padStart(2, "0")}:${s
        .toString()
        .padStart(2, "0")}`,
      overtime,
    };
  };

  const { text: timeText, overtime } = formatTime(timeLeft);

  const statusColor = isFinished
    ? "text-emerald-600"
    : overtime
    ? "text-red-600"
    : "text-primary";

  // -------------------------
  // UI
  // -------------------------
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-sm font-sans relative"
    >
      {mounted &&
        showConfetti &&
        createPortal(
          <div className="fixed inset-0 z-[9999] pointer-events-none">
            <Confetti width={width} height={height} recycle={false} />
          </div>,
          document.body
        )}

      <motion.div className="neubrut-card relative overflow-hidden rounded-xl border bg-white shadow-lg ring-1 ring-black/5 backdrop-blur-sm">
        <CardContent className="space-y-6 px-5 py-6 relative z-10">
          {/* TIMER */}
          <div
            onClick={toggleTimer}
            className="relative flex flex-col items-center justify-center cursor-pointer select-none active:scale-95 transition-transform duration-200 min-h-[100px]"
          >
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              {isFinished ? (
                <PartyPopper className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <TimerIcon className="w-3.5 h-3.5" />
              )}
              <span className="text-[10px] uppercase tracking-[0.3em] font-semibold">
                {isFinished
                  ? "Session Complete"
                  : overtime
                  ? "Overtime"
                  : "Session Timer"}
              </span>
            </div>

            <div className="relative flex items-center gap-3">
              <motion.div
                key="timer-display"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`text-5xl font-bold tracking-tighter tabular-nums leading-none ${statusColor}`}
              >
                {timeText}
              </motion.div>

              <AnimatePresence>
                {!isFinished &&
                  timeLeft !== WORKOUT_DURATION &&
                  startTimestamp && (
                    <motion.button
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      onClick={resetTimer}
                      className="absolute -right-12 p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </motion.button>
                  )}
              </AnimatePresence>
            </div>

            <div className="h-5 mt-2 flex items-center justify-center w-full">
              <AnimatePresence mode="wait">
                {isFinished ? (
                  <motion.div
                    key="finished"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center text-emerald-600"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Completed in {completionDuration}
                    </div>

                    <span className="text-[10px] font-medium opacity-80 mt-0.5">
                      {startTimestamp
                        ? new Date(startTimestamp).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )
                        : null}{" "}
                      - {endTime}
                    </span>
                  </motion.div>
                ) : isActive ? (
                  <motion.div
                    key="active"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className={`flex items-center gap-1.5 text-xs font-medium ${
                      overtime
                        ? "text-red-500 font-bold animate-pulse"
                        : "text-emerald-600"
                    }`}
                  >
                    {overtime && <Zap className="w-3 h-3 fill-current" />}
                    {startTimestamp
                      ? `Started at ${new Date(
                          startTimestamp
                        ).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}`
                      : "Running..."}
                  </motion.div>
                ) : (
                  <motion.p
                    key="paused"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="text-xs font-medium text-muted-foreground"
                  >
                    Tap to Start
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="h-px w-full bg-border/60" />

          {/* BOTTOM STATS */}
          <div className="space-y-5">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
                  Workout Completed
                </p>
                <p className="text-3xl font-semibold text-primary">
                  {Math.round(progressPercent)}%
                </p>
              </div>

              <motion.div
                key={`${todayExercisesDone}-${todayExercisesTotal}`}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 20,
                }}
                className="inline-flex items-center gap-2 rounded-md border border-primary/40 bg-primary/5 px-2.5 py-1.5 text-xs font-semibold text-foreground shadow-[3px_3px_0_rgba(0,0,0,0.15)]"
              >
                <span className="text-lg leading-none">{dailyEmoji}</span>
                <span className="tracking-wide">
                  {todayExercisesDone}
                  <span className="mx-0.5 text-muted-foreground">/</span>
                  {todayExercisesTotal}
                </span>
              </motion.div>
            </div>

            <Progress
              value={progressPercent}
              className="h-1.5 border border-border bg-transparent [&>div]:bg-linear-to-r [&>div]:from-primary [&>div]:to-primary/60"
            />
          </div>
        </CardContent>
      </motion.div>
    </motion.div>
  );
}
//hello
