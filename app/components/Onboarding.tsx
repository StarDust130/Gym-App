"use client";

import { useState, type ChangeEvent, KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, UploadCloud } from "lucide-react";

import { MOCK_WORKOUT_PLAN, type WorkoutPlan } from "@/app/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type OnboardingProps = {
  onComplete: (payload: { name: string; plan: WorkoutPlan }) => void;
};

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [fileName, setFileName] = useState(
    "Upload an image of your workout plan"
  );
  const [isUploading, setIsUploading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // ----------------------------- FILE HANDLER -----------------------------
  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsUploading(true);
    setIsComplete(false);

    // ❌ Reject PDFs
    if (file.type === "application/pdf") {
      setIsUploading(false);
      setFileName(
        "❌ PDF not supported — take screenshot and upload the IMAGE"
      );
      return;
    }

    // Convert image to base64
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64 = reader.result as string;

        const res = await fetch("/api/parse-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64 }),
        });

        const json = await res.json();

        if (!json.ok) {
          setIsUploading(false);
          setFileName("❌ This doesn’t look like a workout plan");
          return;
        }

        localStorage.setItem("workoutPlan", JSON.stringify(json.data));

        setIsUploading(false);
        setIsComplete(true);

        onComplete({ name: name.trim(), plan: json.data });
      } catch (err) {
        setIsUploading(false);
        setFileName("❌ Upload failed");
      }
    };

    reader.readAsDataURL(file);
  };

  // ENTER key on name input
  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && name.trim()) {
      setStep(2);
    }
  };

  return (
    <div className="min-h-screen px-4 py-10 flex items-center justify-center text-foreground">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="neubrut-card bg-white p-6 text-center"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Quick start
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight">
            Create your plan fast
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Enter your name and upload your workout plan image.
          </p>
        </motion.div>

        {/* Card */}
        <Card className="neubrut-card bg-card">
          <CardContent className="p-6">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                // ------------------------ STEP 1 ------------------------
                <motion.div
                  key="step-one"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                      Step 1 of 2
                    </p>
                    <h2 className="text-2xl font-semibold">
                      What&apos;s your name?
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      This will appear on your dashboard.
                    </p>
                  </div>

                  <Input
                    autoFocus
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={handleEnter}
                    className="border-2 border-border"
                  />

                  <Button
                    className="w-full border-2 border-border bg-primary text-primary-foreground shadow-[4px_4px_0_var(--border)] hover:bg-primary/90"
                    disabled={!name.trim()}
                    onClick={() => setStep(2)}
                  >
                    Next
                  </Button>
                </motion.div>
              ) : (
                // ------------------------ STEP 2 ------------------------
                <motion.div
                  key="step-two"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                      Step 2 of 2
                    </p>
                    <h2 className="text-2xl font-semibold">
                      Upload your workout image
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      PDFs not supported — take a screenshot & upload the photo.
                    </p>
                  </div>

                  <label className="flex cursor-pointer flex-col items-center gap-3 rounded-3xl border-2 border-dashed border-border bg-secondary/40 px-4 py-10 text-center transition hover:-translate-y-0.5">
                    {isUploading ? (
                      <Loader2 className="size-10 animate-spin text-primary" />
                    ) : isComplete ? (
                      <CheckCircle2 className="size-10 text-primary" />
                    ) : (
                      <UploadCloud className="size-10 text-primary" />
                    )}

                    <span className="text-base font-semibold text-primary">
                      {isUploading
                        ? "Processing..."
                        : isComplete
                        ? "Plan uploaded"
                        : "Drop or tap to upload"}
                    </span>

                    <span className="text-xs text-muted-foreground">
                      {fileName}
                    </span>

                    <Input
                      type="file"
                      accept="image/*,application/pdf"
                      className="sr-only"
                      disabled={isUploading}
                      onChange={handleFileUpload}
                    />
                  </label>

                  <div className="flex gap-2 text-sm">
                    <Button
                      variant="ghost"
                      className="flex-1 border-2 border-border bg-white shadow-[4px_4px_0_var(--border)]"
                      onClick={() => setStep(1)}
                      disabled={isUploading}
                    >
                      Back
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
