import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Check, Lightbulb } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { WorkoutExercise } from "@/app/lib/data";
import { ytCommand } from "@/lib/utils";

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
  const videoRefs = useRef<(HTMLIFrameElement | null)[]>([]);
  const videoScrollRef = useRef<HTMLDivElement>(null);

  const handleVideoScroll = () => {
    if (!videoScrollRef.current) return;
    const cards = [...videoScrollRef.current.children] as HTMLDivElement[];

    let active = 0;
    let min = Infinity;

    cards.forEach((c, i) => {
      const d = Math.abs(
        c.getBoundingClientRect().left -
          videoScrollRef.current!.getBoundingClientRect().left
      );
      if (d < min) {
        min = d;
        active = i;
      }
    });

    videoRefs.current.forEach((v) => v && ytCommand(v, "pause"));
    videoRefs.current[active] && ytCommand(videoRefs.current[active]!, "play");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.03 }}
    >
      <Accordion type="single" collapsible>
        <AccordionItem
          value={exercise.id}
          className={`rounded-3xl border-2 bg-white shadow-[4px_4px_0_var(--border)] ${
            completed ? "opacity-60" : ""
          }`}
        >
          {/* ================= HEADER ================= */}
          <AccordionTrigger className="px-5 py-4 text-left hover:no-underline">
            <div className="flex w-full gap-3">
              <div onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={completed}
                  onCheckedChange={onToggle}
                  className="mt-1 size-6 rounded-full border-[3px]"
                />
              </div>

              {/* NAME + PILL (LOCKED STRUCTURE) */}
              <div className="flex-1">
                <p className="text-base font-semibold leading-tight">
                  {exercise.name}
                </p>

                {/* ✅ YELLOW PILL — EXACT OLD POSITION */}
                <div className="mt-2 inline-block rounded-full border-2 border-border bg-secondary px-4 py-1 text-xs font-semibold uppercase tracking-wide">
                  {exercise.sets} sets · {exercise.reps} reps
                </div>
              </div>
            </div>
          </AccordionTrigger>

          {/* ================= CONTENT ================= */}
          <AccordionContent className="px-5 pt-4 pb-6 space-y-5">
            {/* NOTE */}
            {exercise.note && (
              <div className="flex items-start gap-2 text-sm">
                <Lightbulb className="mt-0.5 h-4 w-4 text-primary" />
                <p>{exercise.note}</p>
              </div>
            )}

            {/* TABS */}
            <Tabs defaultValue="images">
              <TabsList className="grid grid-cols-3 rounded-xl border p-1">
                <TabsTrigger value="images">Images</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
                <TabsTrigger value="impact">Impact</TabsTrigger>
              </TabsList>

              {/* IMAGES */}
              <TabsContent value="images">
                <div className="rounded-xl border bg-white p-4">
                  {exercise.image?.length ? (
                    <div className="flex gap-4 overflow-x-auto">
                      {exercise.image.map((img, i) => (
                        <div key={i} className="shrink-0">
                          <Image
                            src={img}
                            alt={exercise.name}
                            width={260}
                            height={260}
                            className="rounded-xl object-contain"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No images available
                    </p>
                  )}
                </div>
              </TabsContent>

              {/* VIDEOS */}
              <TabsContent value="videos">
                <div
                  ref={videoScrollRef}
                  onScroll={handleVideoScroll}
                  className="flex gap-4 overflow-x-auto rounded-xl border bg-white p-4"
                >
                  {exercise.video?.filter(Boolean).map((v, i) => (
                    <iframe
                      key={i}
                      ref={(el) => (videoRefs.current[i] = el)}
                      src={`${v}?enablejsapi=1&mute=1`}
                      className="aspect-9/16 w-56 rounded-xl border"
                      allowFullScreen
                    />
                  ))}
                </div>
              </TabsContent>

              {/* IMPACT */}
              <TabsContent value="impact">
                <div className="rounded-xl border bg-white p-4 space-y-4">
                  <ul className="space-y-2 rounded-lg bg-muted/40 p-3">
                    {exercise.impact?.map((p, i) => (
                      <li key={i} className="flex gap-2 text-sm">
                        <Check className="mt-0.5 h-4 w-4 text-primary" />
                        {p}
                      </li>
                    ))}
                  </ul>

                  {exercise.impactImage && (
                    <Image
                      src={exercise.impactImage}
                      alt="impact"
                      width={320}
                      height={320}
                      className="mx-auto rounded-xl object-contain"
                    />
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
}
