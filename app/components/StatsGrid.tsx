import { motion, AnimatePresence } from "framer-motion";
import { CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useMemo, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, PartyPopper, Zap } from "lucide-react";
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
  const [showConfetti, setShowConfetti] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { width, height } = useWindowSize();

  const dailyEmoji = useMemo(() => {
    const today = new Date().toDateString();
    const seed = today.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
    return emojis[seed % emojis.length];
  }, []);

  const isFinished = props.progressPercent >= 100;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isFinished && mounted) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [isFinished, mounted]);

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
          <div className="fixed inset-0 z-[9999] pointer-events-none">
            <Confetti
              width={width}
              height={height}
              recycle={true}
              numberOfPieces={400}
              gravity={0.2}
            />
          </div>,
          document.body,
        )}

      <motion.div
        animate={{
          borderColor: isFinished ? "#10b981" : "#e5e7eb",
          boxShadow: isFinished
            ? "0 10px 15px -3px rgba(16, 185, 129, 0.2)"
            : "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        }}
        transition={{ duration: 0.5 }}
        className="neubrut-card relative overflow-hidden rounded-xl border bg-white shadow-lg ring-1 ring-black/5 backdrop-blur-sm"
      >
        <CardContent className="space-y-6 px-5 py-6 flex flex-col justify-center min-h-[140px]">
          {isFinished && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-4 right-4 flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
            >
              <PartyPopper className="w-3.5 h-3.5" />
              Complete
            </motion.div>
          )}

          {/* --- PROGRESS SECTION --- */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-muted-foreground flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-primary" />
                Workout Progress
              </span>
              {!isFinished && (
                <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1 rounded-full">
                  <span
                    className="text-xl leading-none"
                    role="img"
                    aria-label="emoji"
                  >
                    {dailyEmoji}
                  </span>
                  <span className="text-sm font-bold text-foreground">
                    {props.todayExercisesDone} / {props.todayExercisesTotal}
                  </span>
                </div>
              )}
            </div>

            <div className="relative pt-1">
              <Progress
                value={props.progressPercent}
                className="h-2.5 sm:h-3 rounded-full bg-secondary/30 w-full overflow-hidden"
              />
              <div className="flex justify-between items-center mt-2.5">
                <span className="text-3xl sm:text-4xl font-black tracking-tighter text-foreground">
                  {Math.round(props.progressPercent)}%
                </span>
                <AnimatePresence>
                  {isFinished && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-emerald-600 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-sm font-bold">Done!</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </CardContent>
      </motion.div>
    </motion.div>
  );
}
