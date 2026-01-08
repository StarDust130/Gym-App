"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Check,
  Play,
  Image as ImageIcon,
  Zap,
  Activity,
  Dumbbell,
  ChevronLeft, // Added
  ChevronRight, // Added
} from "lucide-react";
import { WorkoutExercise } from "../lib/data";
import { cn } from "@/lib/utils";
import { MediaLoader } from "./MediaLoader";

type TabType = "Images" | "Videos" | "Impact";

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
  const [isMediaLoading, setIsMediaLoading] = useState(true);

  // --- ADDED: Carousel State ---
  const [mediaIndex, setMediaIndex] = useState(0);

  // --- ADDED: Carousel Logic ---
  const currentMediaList = useMemo(() => {
    if (tab === "Images") return exercise.image || [];
    if (tab === "Videos") return exercise.video || [];
    return [];
  }, [tab, exercise]);

  const hasMultiple = currentMediaList.length > 1;
  const isFirstItem = mediaIndex === 0;
  const isLastItem = mediaIndex === currentMediaList.length - 1;

  const nextMedia = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLastItem || !hasMultiple) return;
    setIsMediaLoading(true);
    setMediaIndex((prev) => prev + 1);
  };

  const prevMedia = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFirstItem || !hasMultiple) return;
    setIsMediaLoading(true);
    setMediaIndex((prev) => prev - 1);
  };

  const handleTabChange = (t: TabType) => {
    setTab(t);
    setMediaIndex(0); // Reset index when tab changes
    if (t !== "Impact") setIsMediaLoading(true);
  };

  // Shorts (9:16) for Video, Standard (4:3) for Images/Impact
  const mediaAspectRatio = tab === "Videos" ? "aspect-[9/16]" : "aspect-[4/3]";

  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "relative w-full overflow-hidden rounded-3xl border-[3px] border-black bg-white transition-all duration-300",
        // The "Fun" Hard Shadow
        isOpen
          ? "shadow-[8px_8px_0px_0px_#000]"
          : "shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] hover:-translate-y-0.5",
        isCompleted && "opacity-60 saturate-0 shadow-none hover:translate-y-0"
      )}
    >
      {/* HEADER */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-10 flex cursor-pointer items-center gap-4 p-4 select-none bg-white"
      >
        {/* BOUNCY CHECKBOX */}
        <motion.button
          whileTap={{ scale: 0.8, rotate: -10 }}
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-[3px] border-black transition-colors shadow-[2px_2px_0px_0px_#000]",
            isCompleted ? "bg-[#FF5555]" : "bg-white hover:bg-neutral-50"
          )}
        >
          <AnimatePresence>
            {isCompleted && (
              <motion.div
                initial={{ scale: 0, rotate: 45 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0 }}
              >
                <Check className="h-6 w-6 text-white stroke-[4]" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* INFO */}
        <div className="flex flex-1 flex-col justify-center min-w-0">
          <h3
            className={cn(
              "font-black text-base uppercase tracking-tight text-black truncate",
              isCompleted && "line-through text-neutral-400"
            )}
          >
            {exercise.name}
          </h3>

          {/* --- ADDED: Crushed It Text --- */}
          {isCompleted ? (
            <span className="mt-1 text-[10px] font-black uppercase text-[#FF5555] tracking-widest animate-pulse">
              🔥 You Crushed It!
            </span>
          ) : (
            <div className="flex gap-2 mt-1">
              <Badge text={`${exercise.sets} SETS`} color="bg-neutral-100" />
              <Badge text={`${exercise.reps} REPS`} color="bg-[#FFE27A]" />
            </div>
          )}
        </div>

        {/* ARROW TOGGLE */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="rounded-full border-2 border-black p-1 bg-white shrink-0"
        >
          <ChevronDown className="h-5 w-5 stroke-[3]" />
        </motion.div>
      </div>

      {/* EXPANDABLE BODY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden bg-neutral-50"
          >
            <div className="p-4 pt-0 space-y-4 border-t-[3px] border-black">
              {/* 1. STICKY NOTE (TIPS & NOTES) */}
              {(exercise.note ||
                (exercise.tips && exercise.tips.length > 0)) && (
                <div className="relative mt-4 rotate-1 rounded-sm border-2 border-black bg-[#FFEDA6] p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)]">
                  {/* Decorative Pin */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#FF5555] border-2 border-black z-10" />

                  {exercise.note && (
                    <div className="mb-2 flex gap-2 font-bold text-xs text-amber-900 border-b-2 border-black/10 pb-2">
                      <Zap className="w-4 h-4 fill-amber-500 text-amber-900 shrink-0" />
                      <span className="uppercase tracking-wide leading-tight">
                        {exercise.note}
                      </span>
                    </div>
                  )}

                  {exercise.tips && (
                    <div className="space-y-1">
                      {exercise.tips.slice(0, 3).map((tip, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-xs font-bold text-black/80"
                        >
                          <span className="mt-1.5 block h-1.5 w-1.5 rounded-full bg-black shrink-0" />
                          <span className="leading-snug">{tip}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* 2. MEDIA WINDOW (TV STYLE) */}
              <div className="space-y-2">
                {/* CONTROLS */}
                <div className="flex rounded-xl border-2 border-black bg-white p-1 shadow-[2px_2px_0px_0px_#000]">
                  <TabButton
                    isActive={tab === "Images"}
                    onClick={() => handleTabChange("Images")}
                    icon={ImageIcon}
                    label="Guide"
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

                {/* SCREEN */}
                <motion.div
                  layout
                  className={cn(
                    "group/media relative w-full overflow-hidden rounded-xl border-[3px] border-black bg-black",
                    mediaAspectRatio
                  )}
                >
                  {/* --- ADDED: Carousel Controls --- */}
                  {tab !== "Impact" && !isMediaLoading && hasMultiple && (
                    <>
                      {/* Left Arrow */}
                      {!isFirstItem && (
                        <button
                          onClick={prevMedia}
                          className="absolute left-2 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white border-2 border-black p-1.5 shadow-[2px_2px_0px_0px_#000] active:scale-90 transition-transform hover:scale-110"
                        >
                          <ChevronLeft className="h-4 w-4 stroke-[3]" />
                        </button>
                      )}

                      {/* Right Arrow */}
                      {!isLastItem && (
                        <button
                          onClick={nextMedia}
                          className="absolute right-2 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white border-2 border-black p-1.5 shadow-[2px_2px_0px_0px_#000] active:scale-90 transition-transform hover:scale-110"
                        >
                          <ChevronRight className="h-4 w-4 stroke-[3]" />
                        </button>
                      )}

                      {/* Dots */}
                      <div className="absolute bottom-3 left-0 right-0 z-30 flex justify-center gap-1.5">
                        {currentMediaList.map((_, idx) => (
                          <div
                            key={idx}
                            className={cn(
                              "h-1.5 rounded-full transition-all border border-black shadow-sm",
                              idx === mediaIndex
                                ? "w-4 bg-[#B8FF9F]"
                                : "w-1.5 bg-white"
                            )}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {isMediaLoading && tab !== "Impact" && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-neutral-900 text-white">
                      <MediaLoader />
                      <span className="mt-2 text-[10px] font-black uppercase tracking-widest animate-pulse text-[#B8FF9F]">
                        Loading Asset...
                      </span>
                    </div>
                  )}

                  {/* MEDIA CONTENT */}
                  <AnimatePresence mode="wait">
                    {tab === "Images" && currentMediaList.length > 0 && (
                      <motion.img
                        key={currentMediaList[mediaIndex]}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        src={currentMediaList[mediaIndex]}
                        className="h-full w-full object-contain bg-white"
                        onLoad={() => setIsMediaLoading(false)}
                        alt="Guide"
                      />
                    )}

                    {tab === "Videos" && currentMediaList.length > 0 && (
                      <motion.iframe
                        key={currentMediaList[mediaIndex]}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        src={currentMediaList[mediaIndex]}
                        className="h-full w-full"
                        allow="autoplay; encrypted-media"
                        onLoad={() => setIsMediaLoading(false)}
                      />
                    )}
                  </AnimatePresence>

                  {tab === "Impact" && (
                    <div className="h-full w-full bg-[#1a1a1a] p-4 overflow-y-auto custom-scrollbar">
                      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/20">
                        <Activity className="w-4 h-4 text-[#B8FF9F]" />
                        <h4 className="text-xs font-black uppercase text-white tracking-widest">
                          Muscle Impact
                        </h4>
                      </div>

                      <div className="space-y-2">
                        {exercise.impact?.map((imp, i) => (
                          <motion.div
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.05 }}
                            key={i}
                            className="flex items-center gap-3 rounded-md bg-white/5 p-2 border border-white/10"
                          >
                            <div className="h-2 w-2 rounded-full bg-[#B8FF9F] shadow-[0_0_8px_#B8FF9F]" />
                            <span className="text-xs font-bold text-neutral-200 uppercase tracking-wide">
                              {imp}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* FOOTER DECORATION */}
              <div className="flex justify-center opacity-10 pb-2">
                <Dumbbell className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- CHUNKY SUBCOMPONENTS ---

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
