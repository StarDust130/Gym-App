"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Zap,
  Check,
  Play,
  Image as ImageIcon,
  Info,
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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [tab, setTab] = useState<TabType>("Images");
  const [isMediaLoading, setIsMediaLoading] = useState<boolean>(false);

  const handleTabChange = (newTab: TabType) => {
    setTab(newTab);
    if (newTab === "Images" || newTab === "Videos") {
      setIsMediaLoading(true);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "bg-white border-[3px] border-black rounded-[28px] overflow-hidden transition-all",
        isOpen
          ? "shadow-[8px_8px_0px_0px_#000]"
          : "shadow-[4px_4px_0px_0px_#000] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#000]"
      )}
    >
      {/* ================= HEADER ================= */}
      <div
        onClick={() => setIsOpen((v) => !v)}
        className="p-5 flex gap-4 cursor-pointer select-none"
      >
        {/* Checkbox */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className={cn(
            "h-9 w-9 rounded-full border-[3px] border-black flex items-center justify-center shrink-0",
            isCompleted ? "bg-[#B8FF9F]" : "bg-white hover:bg-neutral-50"
          )}
        >
          <AnimatePresence>
            {isCompleted && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Check className="w-5 h-5 stroke-[3]" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Title */}
        <div className="flex-1 min-w-0">
          <h3
            className={cn(
              "font-black text-lg uppercase truncate",
              isCompleted && "line-through text-neutral-400"
            )}
          >
            {exercise.name}
          </h3>

          <div className="flex gap-2 mt-1">
            <span className="badge-yellow">{exercise.sets} Sets</span>
            <span className="badge-white">{exercise.reps} Reps</span>
          </div>
        </div>

        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown className="w-6 h-6 stroke-[3]" />
        </motion.div>
      </div>

      {/* ================= BODY ================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t-[3px] border-black bg-neutral-50"
          >
            <div className="p-5 space-y-4">
              {/* -------- TIPS -------- */}
              {exercise.tips && exercise.tips.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border-2 border-black bg-[#E8F9FF] p-4"
                >
                  <h4 className="font-black text-sm uppercase flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 stroke-black fill-[#7DD3FC]" />
                    Pro Tips
                  </h4>
                  <div className="space-y-2">
                    {exercise.tips.map((tip, i) => (
                      <div
                        key={i}
                        className="text-xs font-bold bg-white p-2 rounded-md border"
                      >
                        {tip}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* -------- NOTE -------- */}
              {exercise.note && (
                <div className="rounded-xl border-2 border-[#FFD27D] bg-[#FFF8E1] p-3 flex gap-2">
                  <Zap className="w-4 h-4 stroke-black fill-[#FFD27D]" />
                  <p className="text-xs font-bold">{exercise.note}</p>
                </div>
              )}

              {/* -------- TABS -------- */}
              <div className="flex border-2 border-black rounded-xl overflow-hidden">
                {(
                  [
                    { id: "Images", icon: ImageIcon },
                    { id: "Videos", icon: Play },
                    { id: "Impact", icon: Info },
                  ] as const
                ).map(({ id, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => handleTabChange(id)}
                    className={cn(
                      "flex-1 py-2 text-[10px] font-black uppercase flex items-center justify-center gap-1",
                      tab === id
                        ? "bg-black text-white"
                        : "bg-white hover:bg-neutral-100"
                    )}
                  >
                    <Icon className="w-3 h-3" />
                    {id}
                  </button>
                ))}
              </div>

              {/* -------- MEDIA -------- */}
              <div className="relative aspect-video border-2 border-black rounded-xl overflow-hidden bg-white">
                <AnimatePresence>
                  {isMediaLoading && tab !== "Impact" && (
                    <motion.div
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-20"
                    >
                      <MediaLoader />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* IMAGE */}
                {tab === "Images" && exercise.image && (
                  <img
                    src={exercise.image[0]}
                    alt={exercise.name}
                    className={cn(
                      "w-full h-full object-contain transition-opacity",
                      isMediaLoading ? "opacity-0" : "opacity-100"
                    )}
                    onLoad={() => setIsMediaLoading(false)}
                    onError={() => setIsMediaLoading(false)}
                  />
                )}

                {/* VIDEO */}
                {tab === "Videos" && exercise.video && (
                  <iframe
                    src={exercise.video[0]}
                    className={cn(
                      "w-full h-full transition-opacity",
                      isMediaLoading ? "opacity-0" : "opacity-100"
                    )}
                    allow="autoplay; encrypted-media"
                    onLoad={() => setIsMediaLoading(false)}
                  />
                )}

                {/* IMPACT */}
                {tab === "Impact" && (
                  <div className="p-4 space-y-2">
                    {exercise.impact?.map((imp, i) => (
                      <div
                        key={i}
                        className="text-xs font-bold bg-neutral-100 p-2 rounded-md border"
                      >
                        {imp}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
