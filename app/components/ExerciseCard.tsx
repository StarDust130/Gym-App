import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { WorkoutExercise } from "@/app/lib/data";
import Image from "next/image";
import { ytCommand } from "@/lib/utils";
import { Check, Lightbulb } from "lucide-react";

type ExerciseCardProps = {
  exercise: WorkoutExercise;
  completed: boolean;
  onToggle: () => void;
  delay: number;
};

export function ExerciseCard({
  exercise,
  completed,
  onToggle,
  delay,
}: ExerciseCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tip, setTip] = useState<string | null>(null);
  const [loadingTip, setLoadingTip] = useState(false);
  const [tipError, setTipError] = useState<string | null>(null);

  const storageKey = useMemo(
    () => `exerciseTips:${exercise.name}`,
    [exercise.name]
  );

  const loadTip = useCallback(async () => {
    if (tip || loadingTip) return;

    if (typeof window !== "undefined") {
      const cached = window.localStorage.getItem(storageKey);
      if (cached) {
        setTip(cached);
        setTipError(null);
        return;
      }
    }

    try {
      setLoadingTip(true);
      setTipError(null);
      const res = await fetch(
        `/api/exercise-tip?name=${encodeURIComponent(exercise.name)}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch tip");
      }

      const data = (await res.json()) as { ok: boolean; tip?: string };
      if (!data.ok || !data.tip) {
        setTip(""); // Empty string indicates "fetched but empty"
        return;
      }

      setTip(data.tip);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(storageKey, data.tip);
      }
    } catch {
      setTipError("Tip unavailable");
    } finally {
      setLoadingTip(false);
    }
  }, [exercise.name, loadingTip, storageKey, tip]);

  useEffect(() => {
    if (isOpen) {
      void loadTip();
    }
  }, [isOpen, loadTip]);

  const tipLines = useMemo(() => {
    if (!tip) return [];
    return tip
      .split("\n")
      .map((line) => line.trim().replace(/^[-•]\s*/, ""))
      .filter(Boolean);
  }, [tip]);

  // Only show tips box if accordion is open and tips or error are present
  const shouldShowTips = isOpen && (tipLines.length > 0 || !!tipError);

  const videoRefs = useRef<(HTMLIFrameElement | null)[]>([]);
  const videoScrollRef = useRef<HTMLDivElement>(null);

  const handleVideoScroll = () => {
    if (!videoScrollRef.current) return;

    const container = videoScrollRef.current;
    const cards = [...container.children] as HTMLDivElement[];

    let activeIndex = 0;
    let minDiff = Infinity;

    cards.forEach((card, idx) => {
      const diff = Math.abs(
        card.getBoundingClientRect().left -
          container.getBoundingClientRect().left
      );
      if (diff < minDiff) {
        minDiff = diff;
        activeIndex = idx;
      }
    });

    // Pause all videos
    videoRefs.current.forEach((iframe) => {
      if (iframe) ytCommand(iframe, "pause");
    });

    // Play the centered video
    const activeIframe = videoRefs.current[activeIndex];
    if (activeIframe) ytCommand(activeIframe, "play");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: delay * 0.03 }}
      whileHover={{ scale: 1.005 }}
      className="rounded-3xl"
    >
      <Accordion
        type="single"
        collapsible
        onValueChange={(value) => setIsOpen(value === exercise.id)}
      >
        <AccordionItem
          value={exercise.id}
          className={`overflow-hidden rounded-3xl border-2 border-border bg-white shadow-[4px_4px_0_var(--border)] transition-opacity duration-300 ${
            completed ? "opacity-60" : "opacity-100"
          }`}
        >
          <AccordionTrigger className="flex flex-col gap-3 px-5 py-4 text-left sm:flex-row sm:items-center hover:no-underline">
            <div className="flex w-full items-start gap-3">
              <div onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={completed}
                  onCheckedChange={onToggle}
                  className="mt-1 size-6 rounded-full border-[3px] border-border bg-white data-[state=checked]:bg-primary data-[state=checked]:text-white"
                />
              </div>
              <div className="flex-1 text-left">
                <p className="text-base font-semibold leading-tight">
                  {exercise.name}
                </p>
              </div>
            </div>
            <span className="shrink-0 rounded-full border-2 border-border bg-secondary px-4 py-1 text-xs font-semibold uppercase tracking-wide text-border">
              {exercise.sets} sets · {exercise.reps} reps
            </span>
          </AccordionTrigger>

          <AccordionContent className="border-t-2 border-dashed border-border/50 bg-muted/40 px-5 py-5">
            <div className="grid grid-cols-2 gap-3 text-sm mb-6">
              <StatBlock label="Sets" value={exercise.sets.toString()} />
              <StatBlock label="Reps" value={exercise.reps.toString()} />
            </div>

            {exercise.note && exercise.note.trim().length > 0 && (
              <div className="mt-3 mb-3 flex items-start gap-2">
                <div
                  className="
        flex h-5 w-5 items-center justify-center 
        rounded-md border border-border bg-white 
        shadow-[2px_2px_0_var(--border)]
      "
                >
                  <Lightbulb className="h-3.5 w-3.5 text-primary" />
                </div>

                <p className="text-[12px] font-medium text-foreground leading-snug">
                  {exercise.note}
                </p>
              </div>
            )}

            {/* Media Tabs */}
            <div className="mb-6 mt-2">
              <Tabs defaultValue="images" className="w-full">
                <TabsList className="w-full grid grid-cols-3 bg-white border-2 border-border p-1 h-auto rounded-xl shadow-[2px_2px_0_var(--border)]">
                  <TabsTrigger
                    value="images"
                    className="rounded-lg data-[state=active]:bg-secondary data-[state=active]:text-foreground py-2 font-bold uppercase tracking-wider text-xs"
                  >
                    Images
                  </TabsTrigger>
                  <TabsTrigger
                    value="videos"
                    className="rounded-lg data-[state=active]:bg-secondary data-[state=active]:text-foreground py-2 font-bold uppercase tracking-wider text-xs"
                  >
                    Videos
                  </TabsTrigger>
                  <TabsTrigger
                    value="impact"
                    className="rounded-lg data-[state=active]:bg-secondary data-[state=active]:text-foreground py-2 font-bold uppercase tracking-wider text-xs"
                  >
                    Impact
                  </TabsTrigger>
                </TabsList>

                {/* Images */}
                <TabsContent
                  value="images"
                  className="mt-4 focus-visible:outline-none"
                >
                  {exercise.image && exercise.image.length > 0 ? (
                    exercise.image.length === 1 ? (
                      /* ONE IMAGE → FULL WIDTH CARD */
                      <div className="w-full px-2">
                        <div
                          className="relative w-full h-64 overflow-hidden rounded-xl 
          border-2 border-border shadow-[3px_3px_0_var(--border)] bg-white"
                        >
                          <Image
                            src={exercise.image[0]}
                            alt={exercise.name}
                            className="h-full w-full object-cover"
                            loading="lazy"
                            width={500}
                            height={500}
                          />
                        </div>
                      </div>
                    ) : (
                      /* MULTIPLE IMAGES → HORIZONTAL CAROUSEL */
                      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                        {exercise.image.map((img, idx) => (
                          <div
                            key={idx}
                            className="snap-center shrink-0 w-56 sm:w-64 first:ml-2 last:mr-2"
                          >
                            <div
                              className="relative h-56 w-full overflow-hidden rounded-xl 
              border-2 border-border shadow-[3px_3px_0_var(--border)] bg-white"
                            >
                              <Image
                                src={img}
                                alt={`${exercise.name} ${idx + 1}`}
                                className="h-full w-full object-cover"
                                loading="lazy"
                                width={300}
                                height={300}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  ) : (
                    <div className="flex h-32 items-center justify-center rounded-xl border-2 border-dashed border-border/50 bg-white/50">
                      <p className="text-sm font-medium text-muted-foreground">
                        No images available.
                      </p>
                    </div>
                  )}
                </TabsContent>

                {/* Videos */}
                <TabsContent
                  value="videos"
                  className="mt-4 focus-visible:outline-none"
                >
                  {exercise.video &&
                  exercise.video.filter((v) => v && v.trim().length > 0)
                    .length > 0 ? (
                    <div
                      ref={videoScrollRef}
                      onScroll={handleVideoScroll}
                      className={`
        pb-4 scrollbar-hide
        ${
          exercise.video.filter((v) => v && v.trim().length > 0).length === 1
            ? "w-full"
            : "flex gap-4 overflow-x-auto snap-x snap-mandatory"
        }
      `}
                    >
                      {exercise.video
                        .filter((v) => v && v.trim().length > 0)
                        .map((vid, idx) => (
                          <div
                            key={idx}
                            className={`
              ${
                exercise.video.filter((v) => v && v.trim().length > 0)
                  .length === 1
                  ? "w-full"
                  : "snap-center shrink-0 w-56 sm:w-64 first:ml-2 last:mr-2"
              }
            `}
                          >
                            <iframe
                              ref={(el) => (videoRefs.current[idx] = el)}
                              src={`${vid}?mute=1&controls=1&enablejsapi=1`}
                              className="
                w-full aspect-9/16
                rounded-xl border-2 border-border 
                shadow-[3px_3px_0_var(--border)] bg-black
              "
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="flex h-32 items-center justify-center rounded-xl border-2 border-dashed border-border/50 bg-white/50">
                      <p className="text-sm font-medium text-muted-foreground">
                        No videos available.
                      </p>
                    </div>
                  )}
                </TabsContent>

                {/* Impact */}
                <TabsContent
                  value="impact"
                  className="mt-4 focus-visible:outline-none"
                >
                  {exercise.impact && exercise.impact.length > 0 ? (
                    <div className="space-y-4">
                      {/* Bullet impact list */}
                      <div
                        className="
        rounded-xl border-2 border-border bg-white 
        shadow-[3px_3px_0_var(--border)] px-4 py-3
        space-y-2
      "
                      >
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          Impact
                        </p>

                        <ul className="space-y-2">
                          {exercise.impact.map((point: string, i: number) => (
                            <li key={i} className="flex items-start gap-2">
                              <div
                                className="
                  h-4 w-4 flex items-center justify-center 
                  rounded-sm border border-border bg-secondary/40
                  shadow-[1px_1px_0_var(--border)]
                  shrink-0
                "
                              >
                                <Check className="h-3 w-3 text-primary" />
                              </div>

                              <p className="text-[13px] leading-snug text-foreground">
                                {point}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Impact image */}
                      {exercise.impactImage && (
                        <div className="px-1">
                          <div
                            className="
              relative w-full h-64 
              overflow-hidden rounded-xl 
              border-2 border-border bg-white
              shadow-[3px_3px_0_var(--border)]
            "
                          >
                            <Image
                              src={exercise.impactImage}
                              alt={`${exercise.name} impact`}
                              className="h-full w-full object-cover"
                              loading="lazy"
                              width={600}
                              height={600}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex h-32 items-center justify-center rounded-xl border-2 border-dashed border-border/50 bg-white/50">
                      <p className="text-sm font-medium text-muted-foreground">
                        No impact information available.
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>

            {shouldShowTips && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="rounded-2xl border-2 border-border/70 bg-white/80 p-4 shadow-[3px_3px_0_var(--border)]"
              >
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                    Quick tips
                  </p>
                </div>

                {tipError ? (
                  <p className="text-sm font-medium text-destructive">
                    {tipError}
                  </p>
                ) : (
                  <ul className="space-y-2 text-sm font-semibold text-foreground">
                    {tipLines.map((line, index) => (
                      <li
                        key={`${exercise.id}-tip-${index}`}
                        className="flex items-start gap-2 rounded-2xl border border-border/60 bg-secondary/30 px-3 py-2"
                      >
                        <span className="mt-1.5 inline-block size-1.5 shrink-0 rounded-full bg-foreground" />
                        <span className="leading-snug">{line}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
}

function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border-2 border-border bg-white px-4 py-3 text-center">
      <p className="text-2xl font-bold text-primary">{value}</p>
      <p className="text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </p>
    </div>
  );
}
