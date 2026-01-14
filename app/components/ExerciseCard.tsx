"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import confetti from "canvas-confetti";
import {
  ChevronDown,
  Check,
  Play,
  Image as ImageIcon,
  Zap,
  Activity,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  Save,
  TrendingUp,
  Edit2,
  Goal,
  VideoOff,
  ImageOff,
} from "lucide-react";
import { WorkoutExercise } from "../lib/data";
import { cn } from "@/lib/utils";
import { MediaLoader } from "./MediaLoader";

// --- TYPES ---
type TabType = "Images" | "Videos" | "Impact";

type ExerciseLog = {
  weight: number;
  reps: number;
  date: string;
};

// --- CHAOS CONFETTI ---
const triggerRandomConfetti = () => {
  const allColors = ["#FF5555", "#B8FF9F", "#FFE27A", "#000000"];
  const shuffledColors = allColors.sort(() => 0.5 - Math.random()).slice(0, 4);

  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: shuffledColors,
    disableForReducedMotion: true,
  });
};

// --- SMART LOGIC ---
const getSmartFeedback = (reps: number) => {
  if (reps < 5) return "Focus on form. Build up to 6 reps.";
  if (reps < 12)
    return `Push harder! Aim for ${reps + 1}-${reps + 2} reps next.`;
  return "You crushed it! 🚀 Time to increase weight.";
};

export const ExerciseCard = ({
  exercise,
  isCompleted,
  onToggle,
}: {
  exercise: WorkoutExercise;
  isCompleted: boolean;
  onToggle: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<TabType>("Images");

  // --- AUTO CLOSE WHEN COMPLETED ---
  useEffect(() => {
    if (isCompleted) {
      setIsOpen(false);
    }
  }, [isCompleted]);

  // --- LOGIC: STRICT LOGGING RULES ---
  const showLogging = useMemo(() => {
    const WEIGHT_CATEGORIES = [
      "Back",
      "Biceps",
      "Forearm",
      "Chest",
      "Triceps",
      "Legs",
      "Shoulder",
    ];

    const isWeightCategory = WEIGHT_CATEGORIES.includes(exercise.category);
    const nameLower = exercise.name.toLowerCase();
    const isBodyweightException =
      nameLower.includes("pushups") ||
      nameLower.includes("push up") ||
      nameLower.includes("bodyweight");

    return isWeightCategory && !isBodyweightException;
  }, [exercise.category, exercise.name]);

  const isRecovery =
    exercise.category === "Mobility" || exercise.category === "Stretching";

  // --- STATE ---
  const [lastLog, setLastLog] = useState<ExerciseLog | null>(null);
  const [showLogModal, setShowLogModal] = useState(false);

  // Media State
  const [isMediaLoading, setIsMediaLoading] = useState(false);
  const [mediaIndex, setMediaIndex] = useState(0);

  // --- LOAD DATA ---
  useEffect(() => {
    const saved = localStorage.getItem(`ex_log_${exercise.id}`);
    if (saved) setLastLog(JSON.parse(saved));
  }, [exercise.id]);

  // --- SAVE DATA ---
  const handleSaveLog = (weight: number, reps: number) => {
    const newLog = { weight, reps, date: new Date().toDateString() };
    setLastLog(newLog);
    localStorage.setItem(`ex_log_${exercise.id}`, JSON.stringify(newLog));
    setShowLogModal(false);
  };

  const isTodayLog = lastLog?.date === new Date().toDateString();

  // --- MEDIA CONTROLS ---
  const currentMediaList = useMemo(() => {
    const rawList =
      tab === "Images"
        ? exercise.image
        : tab === "Videos"
        ? exercise.video
        : [];
    return (rawList || []).filter((url) => url && url.trim() !== "");
  }, [tab, exercise]);

  const hasMultiple = currentMediaList.length > 1;

  useEffect(() => {
    if (tab !== "Impact" && currentMediaList.length > 0) {
      setIsMediaLoading(true);
    } else {
      setIsMediaLoading(false);
    }
  }, []);

  const goNext = () => {
    if (mediaIndex < currentMediaList.length - 1) {
      setIsMediaLoading(true);
      setMediaIndex((p) => p + 1);
    }
  };

  const goPrev = () => {
    if (mediaIndex > 0) {
      setIsMediaLoading(true);
      setMediaIndex((p) => p - 1);
    }
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 50;
    if (
      info.offset.x < -threshold &&
      mediaIndex < currentMediaList.length - 1
    ) {
      goNext();
    } else if (info.offset.x > threshold && mediaIndex > 0) {
      goPrev();
    }
  };

  const handleTabChange = (t: TabType) => {
    setTab(t);
    setMediaIndex(0);
    const nextList =
      t === "Images" ? exercise.image : t === "Videos" ? exercise.video : [];
    const hasContent =
      (nextList || []).filter((u) => u && u.trim() !== "").length > 0;

    if (t !== "Impact" && hasContent) {
      setIsMediaLoading(true);
    } else {
      setIsMediaLoading(false);
    }
  };

  const mediaAspectRatio = tab === "Videos" ? "aspect-[9/16]" : "aspect-[4/3]";

  // --- CLICK HANDLER (INSTANT) ---
  const handleCheckClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isCompleted) {
      triggerRandomConfetti();
    }
    onToggle();
  };

  return (
    <motion.div
      layout // This enables the smooth shuffle animation
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "relative w-full overflow-hidden rounded-3xl border-[3px] border-black bg-white transition-all duration-300",
        isOpen
          ? "shadow-[8px_8px_0px_0px_#000]"
          : "shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] hover:-translate-y-0.5",
        isCompleted &&
          "bg-neutral-100 border-neutral-400 opacity-60 grayscale-[0.8] shadow-none hover:translate-y-0 hover:shadow-none"
      )}
    >
      {/* HEADER */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-10 flex cursor-pointer items-center gap-4 p-4 select-none"
      >
        <motion.button
          whileTap={{ scale: 0.8, rotate: -10 }}
          onClick={handleCheckClick}
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-[3px] border-black transition-colors shadow-[2px_2px_0px_0px_#000]",
            isCompleted
              ? "bg-neutral-400 border-neutral-500 shadow-none"
              : "bg-white hover:bg-neutral-50"
          )}
        >
          <AnimatePresence>
            {isCompleted && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Check className="h-6 w-6 text-white stroke-[4]" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        <div className="flex flex-1 flex-col justify-center min-w-0">
          <h3
            className={cn(
              "font-black text-base uppercase tracking-tight text-black",
              isOpen ? "whitespace-normal" : "truncate",
              isCompleted && "line-through text-neutral-500"
            )}
          >
            {exercise.name}
          </h3>
          {isCompleted ? (
            <span className="mt-1 text-[10px] z-50 font-black uppercase text-neutral-500 tracking-widest">
              🏁 Completed
            </span>
          ) : (
            <div className="flex gap-2 mt-1">
              {isRecovery ? (
                <Badge
                  text={exercise.note || "RECOVERY"}
                  color="bg-[#B8FF9F]"
                />
              ) : (
                <>
                  <Badge
                    text={`${exercise.sets} SETS`}
                    color="bg-neutral-100"
                  />
                  <Badge text={`${exercise.reps} REPS`} color="bg-[#FFE27A]" />
                </>
              )}
            </div>
          )}
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className={cn(
            "rounded-full border-2 border-black p-1 bg-white shrink-0",
            isCompleted && "border-neutral-400 bg-transparent"
          )}
        >
          <ChevronDown className="h-5 w-5 stroke-[3]" />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden bg-neutral-50"
          >
            <div className="p-3 space-y-3 border-t-[3px] border-black relative">
              {showLogging && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowLogModal(true);
                  }}
                  className="mt-1 group relative cursor-pointer overflow-hidden rounded-xl border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-px hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  <div className="flex items-center gap-2.5 p-2.5">
                    <div
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-black shadow-[1px_1px_0px_0px_#000] transition-colors",
                        isTodayLog ? "bg-[#B8FF9F]" : "bg-neutral-200"
                      )}
                    >
                      {isTodayLog ? (
                        <Check className="w-5 h-5 text-black stroke-[3]" />
                      ) : (
                        <TrendingUp className="w-4 h-4 text-neutral-500 stroke-[3]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      {lastLog ? (
                        <>
                          <div className="flex items-baseline gap-0.5 leading-none">
                            <span className="text-xl font-black tracking-tighter text-black">
                              {lastLog.weight}
                            </span>
                            <span className="text-[9px] font-black uppercase text-neutral-400 mr-1">
                              kg
                            </span>
                            <span className="text-sm font-black text-neutral-300 mr-1">
                              /
                            </span>
                            <span className="text-xl font-black tracking-tighter text-black">
                              {lastLog.reps}
                            </span>
                            <span className="text-[9px] font-black uppercase text-neutral-400">
                              reps
                            </span>
                          </div>
                          <span className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest mt-0.5 truncate">
                            {isTodayLog ? "Logged Today" : "Last Session"}
                          </span>
                        </>
                      ) : (
                        <span className="text-[10px] font-black text-neutral-400 uppercase italic">
                          Tap to add log
                        </span>
                      )}
                    </div>
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-transparent hover:border-black hover:bg-neutral-100 transition-all">
                      {lastLog ? (
                        <Edit2 className="w-3.5 h-3.5" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                  {lastLog && (
                    <div className="flex items-center gap-2 border-t-2 border-black bg-[#8be9fa] px-3 py-1">
                      <div className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border border-black bg-white">
                        <Goal className="w-2 h-2 text-gray-900" />
                      </div>
                      <p className="truncate text-[9px] font-black uppercase tracking-wide text-black/90 pt-0.5">
                        {getSmartFeedback(lastLog.reps)}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {(exercise.note ||
                (exercise.tips && exercise.tips.length > 0)) && (
                <div className="relative rotate-1 rounded-sm border-2 border-black bg-[#FFEDA6] p-2.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]">
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#FF5555] border-2 border-black z-10" />
                  {exercise.note && (
                    <div className="mb-1.5 flex gap-1.5 font-bold text-[10px] text-amber-900 border-b-2 border-black/10 pb-1.5">
                      <Zap className="w-3 h-3 fill-amber-500" />
                      <span className="uppercase tracking-wide">
                        {exercise.note}
                      </span>
                    </div>
                  )}
                  {exercise.tips && (
                    <div className="space-y-1">
                      {exercise.tips.slice(0, 3).map((tip, i) => (
                        <div
                          key={i}
                          className="flex gap-1.5 text-[10px] font-bold text-black/80 leading-tight"
                        >
                          <span className="mt-1 h-1 w-1 rounded-full bg-black shrink-0" />
                          {tip}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-1.5">
                <div className="flex rounded-lg border-2 border-black bg-white p-0.5 shadow-[1px_1px_0px_0px_#000]">
                  <TabButton
                    isActive={tab === "Images"}
                    onClick={() => handleTabChange("Images")}
                    icon={ImageIcon}
                    label="Image"
                  />
                  <TabButton
                    isActive={tab === "Videos"}
                    onClick={() => handleTabChange("Videos")}
                    icon={Play}
                    label="Watch"
                  />
                  <TabButton
                    isActive={tab === "Impact"}
                    onClick={() => handleTabChange("Impact")}
                    icon={Activity}
                    label="Impact"
                  />
                </div>

                <motion.div
                  layout
                  className={cn(
                    "relative w-full overflow-hidden rounded-lg border-[3px] border-black bg-black",
                    mediaAspectRatio
                  )}
                >
                  {tab !== "Impact" ? (
                    <>
                      {!isMediaLoading && hasMultiple && (
                        <>
                          {mediaIndex > 0 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                goPrev();
                              }}
                              className="absolute left-2 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white border-2 border-black p-1 hover:scale-110 shadow-sm"
                            >
                              <ChevronLeft className="h-4 w-4" />
                            </button>
                          )}
                          {mediaIndex < currentMediaList.length - 1 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                goNext();
                              }}
                              className="absolute right-2 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white border-2 border-black p-1 hover:scale-110 shadow-sm"
                            >
                              <ChevronRight className="h-4 w-4" />
                            </button>
                          )}
                          <div className="absolute bottom-3 left-0 right-0 z-30 flex justify-center gap-1.5 pointer-events-none">
                            <div className="flex gap-1.5 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full border border-white/20 pointer-events-auto">
                              {currentMediaList.map((_, idx) => (
                                <button
                                  key={idx}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setIsMediaLoading(true);
                                    setMediaIndex(idx);
                                  }}
                                  className={cn(
                                    "h-2 w-2 rounded-full transition-all border border-black/50",
                                    idx === mediaIndex
                                      ? "bg-[#B8FF9F] w-4"
                                      : "bg-white/70 hover:bg-white"
                                  )}
                                />
                              ))}
                            </div>
                          </div>
                        </>
                      )}

                      {isMediaLoading && (
                        <div className="absolute inset-0 z-20 flex items-center justify-center bg-neutral-900">
                          <MediaLoader />
                        </div>
                      )}

                      <div className="relative h-full w-full">
                        <AnimatePresence mode="wait">
                          {tab === "Images" &&
                            (currentMediaList.length > 0 ? (
                              currentMediaList[mediaIndex] && (
                                <motion.img
                                  key={mediaIndex}
                                  src={currentMediaList[mediaIndex]}
                                  className="h-full w-full object-contain bg-white cursor-grab active:cursor-grabbing"
                                  onLoad={() => setIsMediaLoading(false)}
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -20 }}
                                  drag="x"
                                  dragConstraints={{ left: 0, right: 0 }}
                                  dragElastic={0.2}
                                  onDragEnd={handleDragEnd}
                                />
                              )
                            ) : (
                              <EmptyState icon={ImageOff} label="No Visuals" />
                            ))}

                          {tab === "Videos" &&
                            (currentMediaList.length > 0 ? (
                              currentMediaList[mediaIndex] && (
                                <motion.div
                                  key={mediaIndex}
                                  className="h-full w-full bg-black cursor-grab active:cursor-grabbing"
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -20 }}
                                  drag="x"
                                  dragConstraints={{ left: 0, right: 0 }}
                                  dragElastic={0.2}
                                  onDragEnd={handleDragEnd}
                                >
                                  <iframe
                                    src={currentMediaList[mediaIndex]}
                                    className="h-full w-full pointer-events-none"
                                    onLoad={() => setIsMediaLoading(false)}
                                  />
                                </motion.div>
                              )
                            ) : (
                              <EmptyState icon={VideoOff} label="No Footage" />
                            ))}
                        </AnimatePresence>
                      </div>
                    </>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="h-full w-full bg-white p-3 space-y-2 overflow-y-auto"
                    >
                      <h4 className="text-[10px] font-black uppercase text-emerald-600 mb-1 border-b-2 border-emerald-100 pb-1">
                        Target Muscles
                      </h4>
                      {exercise.impact && exercise.impact.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2">
                          {exercise.impact.map((imp, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-2 text-[10px] font-bold uppercase bg-neutral-50 p-2 rounded-lg border-2 border-neutral-100"
                            >
                              <div className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                              {imp}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[10px] font-bold text-neutral-400 uppercase">
                          No impact data available.
                        </p>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLogModal && (
          <LogModal
            lastLog={lastLog}
            onClose={() => setShowLogModal(false)}
            onSave={handleSaveLog}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const EmptyState = ({ icon: Icon, label }: any) => (
  <div className="h-full w-full flex flex-col items-center justify-center bg-[#F5F5F5] border-[3px] border-black border-dashed rounded-xl p-8">
    <div className="bg-white p-4 rounded-full border-[3px] border-black shadow-[4px_4px_0px_0px_#000] mb-4 -rotate-3">
      <Icon className="w-8 h-8 text-black" />
    </div>
    <h3 className="font-black text-2xl uppercase tracking-tighter text-black">
      {label}
    </h3>
    <p className="font-bold text-neutral-400 text-xs uppercase tracking-[0.2em] mt-1">
      Data Missing
    </p>
  </div>
);

const LogModal = ({ lastLog, onClose, onSave }: any) => {
  const [weight, setWeight] = useState(lastLog?.weight?.toString() || "");
  const [reps, setReps] = useState(lastLog?.reps?.toString() || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!weight || !reps) return;
    onSave(parseFloat(weight), parseFloat(reps));
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
      className="absolute inset-0 z-50 flex flex-col justify-center items-center bg-black/40 backdrop-blur-[2px] p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[280px] rounded-2xl border-[3px] border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.8)]"
      >
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-black uppercase tracking-tighter">
            Log Set
          </h4>
          <button onClick={onClose}>
            <X className="w-5 h-5 hover:scale-110" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-3">
            <div className="space-y-1 flex-1">
              <label className="text-[10px] font-black uppercase text-neutral-400">
                Weight (KG)
              </label>
              <input
                type="number"
                autoFocus
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full rounded-xl border-2 border-black p-2 text-center text-xl font-black shadow-[2px_2px_0px_0px_#000] outline-none focus:translate-y-[1px] focus:shadow-none"
              />
            </div>
            <div className="space-y-1 flex-1">
              <label className="text-[10px] font-black uppercase text-neutral-400">
                Reps
              </label>
              <input
                type="number"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                className="w-full rounded-xl border-2 border-black p-2 text-center text-xl font-black shadow-[2px_2px_0px_0px_#000] outline-none focus:translate-y-[1px] focus:shadow-none"
              />
            </div>
          </div>
          <div className="flex items-start gap-2.5 rounded-xl border-2 border-black bg-emerald-50 p-2.5">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 border border-black shadow-[1px_1px_0px_0px_#000]">
              <TrendingUp className="h-3 w-3 text-white stroke-[3]" />
            </div>
            <div className="space-y-0.5">
              <h5 className="text-[9px] font-black uppercase tracking-wide text-emerald-900">
                Growth Hack
              </h5>
              <p className="text-[10px] font-bold leading-tight text-emerald-800/90">
                If you can lift{" "}
                <span className="text-black underline decoration-red-400 decoration-2">
                  3 sets of 12 reps
                </span>{" "}
                easily, increase weight!
              </p>
            </div>
          </div>
          <button
            type="submit"
            className="w-full rounded-xl border-[3px] border-black bg-[#B8FF9F] py-3 text-sm font-black uppercase tracking-widest shadow-[3px_3px_0px_0px_#000] active:translate-y-[2px] active:shadow-none flex justify-center gap-2"
          >
            <Save className="w-4 h-4" /> Save
          </button>
        </form>
      </motion.div>
    </div>
  );
};

const Badge = ({ text, color }: { text: string; color: string }) => (
  <span
    className={cn(
      "rounded-md border-2 border-black px-1.5 py-0.5 text-[10px] font-black text-black shadow-[1px_1px_0px_0px_#000] whitespace-nowrap",
      color
    )}
  >
    {text}
  </span>
);

const TabButton = ({ isActive, onClick, icon: Icon, label }: any) => (
  <button
    onClick={onClick}
    className={cn(
      "flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-[10px] font-black uppercase transition-all",
      isActive
        ? "bg-black text-[#B8FF9F] shadow-sm"
        : "bg-transparent text-black hover:bg-neutral-100"
    )}
  >
    <Icon className={cn("w-3.5 h-3.5", isActive ? "fill-[#B8FF9F]" : "")} />
    {label}
  </button>
);
