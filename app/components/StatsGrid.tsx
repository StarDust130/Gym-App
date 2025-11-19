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

interface StatsGridProps {
  focus: string;
  progressPercent: number;
  workoutsThisWeek: number;
  nextRestDay: string;
  todayExercisesDone: number;
  todayExercisesTotal: number;
}

const emojis = ["🐥", "💪", "🔥", "⚡", "🎯", "🚀", "⭐", "🏋️", "🎉", "✨"];
const WORKOUT_DURATION = 45 * 60; // 45 minutes

// --- Helper Hook: Get Window Size ---
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

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
  // --- Timer State ---
  const [timeLeft, setTimeLeft] = useState(WORKOUT_DURATION);
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState<string | null>(null);

  // NEW: Add state for End Time
  const [endTime, setEndTime] = useState<string | null>(null);

  const [completionDuration, setCompletionDuration] = useState<string | null>(
    null
  );
  const [showConfetti, setShowConfetti] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { width, height } = useWindowSize();

  const dailyEmoji = useMemo(() => {
    const today = new Date().toDateString();
    const seed = today
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return emojis[seed % emojis.length];
  }, []);

  const isFinished = props.progressPercent >= 100;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // If finished and timer is running, stop it and record duration
    if (isFinished && isActive) {
      setIsActive(false);

      // Calculate elapsed time
      const timeSpent = WORKOUT_DURATION - timeLeft;
      const m = Math.floor(timeSpent / 60);
      const s = timeSpent % 60;
      const durationString = `${m} min ${s > 0 ? `${s}s` : ""}`;

      setCompletionDuration(durationString);

      // NEW: Capture the End Time
      setEndTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );

      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [isFinished, isActive, timeLeft]);

  // --- Timer Interval Logic ---
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const toggleTimer = () => {
    if (isFinished) return;

    if (!isActive && !startTime) {
      setStartTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    }
    setIsActive(!isActive);
  };

  const resetTimer = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsActive(false);
    setTimeLeft(WORKOUT_DURATION);
    setStartTime(null);
    setEndTime(null); // NEW: Reset End Time
    setCompletionDuration(null);
    setShowConfetti(false);
  };

  const formatTime = (seconds: number) => {
    const isOvertime = seconds < 0;
    const absSeconds = Math.abs(seconds);
    const m = Math.floor(absSeconds / 60);
    const s = absSeconds % 60;
    return {
      text: `${isOvertime ? "+" : ""}${m.toString().padStart(2, "0")}:${s
        .toString()
        .padStart(2, "0")}`,
      isOvertime,
    };
  };

  const { text: timeText, isOvertime } = formatTime(timeLeft);

  const getStatusColor = () => {
    if (isFinished) return "text-emerald-600";
    if (isOvertime) return "text-red-600";
    return "text-primary";
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto max-w-sm font-sans relative"
    >
      {mounted &&
        showConfetti &&
        createPortal(
          <div className="fixed inset-0 z-9999 pointer-events-none">
            <Confetti
              width={width}
              height={height}
              recycle={true}
              numberOfPieces={400}
              gravity={0.2}
            />
          </div>,
          document.body
        )}

      <motion.div
        animate={
          isOvertime && isActive && !isFinished
            ? {
                borderColor: ["#e5e7eb", "#ef4444", "#e5e7eb"],
                boxShadow: [
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  "0 0 0 4px rgba(239, 68, 68, 0.1)",
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                ],
              }
            : {
                borderColor: isFinished ? "#10b981" : "#e5e7eb",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }
        }
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className={`
            neubrut-card relative overflow-hidden rounded-xl border bg-white shadow-lg ring-1 ring-black/5 backdrop-blur-sm
        `}
      >
        <CardContent className="space-y-6 px-5 py-6 relative z-10">
          {/* --- TIMER SECTION --- */}
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
                  : isOvertime
                  ? "Overtime"
                  : "Session Timer"}
              </span>
            </div>

            <div className="relative flex items-center gap-3">
              <motion.div
                key="timer-display"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`text-5xl font-bold tracking-tighter tabular-nums leading-none ${getStatusColor()}`}
              >
                {timeText}
              </motion.div>

              <AnimatePresence>
                {!isFinished && timeLeft !== WORKOUT_DURATION && (
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
                    // Changed layout to flex-col to stack the duration and the timestamps
                    className="flex flex-col items-center text-emerald-600"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Completed in {completionDuration}
                    </div>
                    {/* NEW: Display Start Time - End Time */}
                    <span className="text-[10px] font-medium opacity-80 mt-0.5">
                      {startTime} - {endTime}
                    </span>
                  </motion.div>
                ) : isActive ? (
                  <motion.div
                    key="active"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className={`flex items-center gap-1.5 text-xs font-medium ${
                      isOvertime
                        ? "text-red-500 font-bold animate-pulse"
                        : "text-emerald-600"
                    }`}
                  >
                    {isOvertime && <Zap className="w-3 h-3 fill-current" />}
                    {isOvertime
                      ? "Limit Exceeded!"
                      : startTime
                      ? `Started at ${startTime}`
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
                    {timeLeft === WORKOUT_DURATION ? "Tap to Start" : "Paused"}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="h-px w-full bg-border/60" />

          {/* --- BOTTOM INFO SECTION --- */}
          <div className="space-y-5">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
                  Workout Completed
                </p>
                <p className="text-3xl font-semibold text-primary">
                  {Math.round(props.progressPercent)}%
                </p>
              </div>
              <motion.div
                key={`${props.todayExercisesDone}-${props.todayExercisesTotal}`}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                className="inline-flex items-center gap-2 rounded-md border border-primary/40 bg-primary/5 px-2.5 py-1.5 text-xs font-semibold text-foreground shadow-[3px_3px_0_rgba(0,0,0,0.15)]"
              >
                <span className="text-lg leading-none">{dailyEmoji}</span>
                <span className="tracking-wide">
                  {props.todayExercisesDone}
                  <span className="mx-0.5 text-muted-foreground">/</span>
                  {props.todayExercisesTotal}
                </span>
              </motion.div>
            </div>

            <Progress
              value={props.progressPercent}
              className="h-1.5 border border-border bg-transparent [&>div]:bg-linear-to-r [&>div]:from-primary [&>div]:to-primary/60"
            />
          </div>
        </CardContent>
      </motion.div>
    </motion.div>
  );
}
