"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

function getTodayKey() {
  // simple YYYY-MM-DD key; you can adjust for timezone if you want
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function DietPage() {
  const [proteinGoal, setProteinGoal] = useState<number>(120);
  const [proteinConsumed, setProteinConsumed] = useState<number>(0);
  const [proteinToAdd, setProteinToAdd] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const dateKey = useMemo(() => getTodayKey(), []);

  const proteinProgress =
    proteinGoal > 0 ? Math.min(100, (proteinConsumed / proteinGoal) * 100) : 0;

  const proteinRemaining =
    proteinGoal > 0 ? Math.max(0, proteinGoal - proteinConsumed) : 0;

  // 🔹 Fetch from Mongo on mount (for this date)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/protein?dateKey=${dateKey}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to load protein data");
        }

        setProteinGoal(data.proteinGoal ?? 120);
        setProteinConsumed(data.proteinConsumed ?? 0);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dateKey]);

  // 🔹 Helper to save to Mongo
  const saveProtein = async (opts?: { goal?: number; consumed?: number }) => {
    try {
      setSaving(true);
      setError(null);

      const res = await fetch("/api/protein", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dateKey,
          proteinGoal: opts?.goal ?? proteinGoal,
          proteinConsumed: opts?.consumed ?? proteinConsumed,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save protein data");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleChangeGoal = async (value: string) => {
    const num = Number(value) || 0;
    setProteinGoal(num);
    // save but don’t block UI
    saveProtein({ goal: num });
  };

  const handleAddProtein = async () => {
    const value = parseFloat(proteinToAdd);
    if (Number.isNaN(value) || value <= 0) return;

    const nextConsumed = proteinConsumed + value;
    setProteinConsumed(nextConsumed);
    setProteinToAdd("");
    await saveProtein({ consumed: nextConsumed });
  };

  const handleReset = async () => {
    setProteinConsumed(0);
    setProteinToAdd("");
    await saveProtein({ consumed: 0 });
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl space-y-6 rounded-3xl border border-border/60 bg-card p-6 shadow-lg shadow-black/5">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Diet · {dateKey}
          </p>
          <h1 className="text-2xl font-semibold text-foreground">
            Protein tracker 🍗
          </h1>
          <p className="text-sm text-muted-foreground">
            Log how much protein you eat today and see how close you are to your
            goal. Data is saved in MongoDB per day.
          </p>
        </div>

        {loading ? (
          <p className="text-sm text-muted-foreground">Loading your protein data…</p>
        ) : (
          <>
            {error && (
              <p className="text-xs text-red-500">
                {error}
              </p>
            )}

            <div className="space-y-4">
              {/* Goal + Add protein row */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1 space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    Daily goal (g)
                  </p>
                  <Input
                    type="number"
                    min={0}
                    value={proteinGoal}
                    onChange={(event) => handleChangeGoal(event.target.value)}
                  />
                </div>

                <div className="flex-1 space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    Add protein (g)
                  </p>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      min={0}
                      value={proteinToAdd}
                      onChange={(event) => setProteinToAdd(event.target.value)}
                    />
                    <Button
                      type="button"
                      className="shrink-0"
                      onClick={handleAddProtein}
                      disabled={saving}
                    >
                      {saving ? "Saving..." : "Add"}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Progress + summary */}
              <div className="space-y-2">
                <Progress value={proteinProgress} />
                <p className="text-xs text-muted-foreground">
                  Consumed{" "}
                  <span className="font-semibold text-foreground">
                    {Math.round(proteinConsumed)}g
                  </span>{" "}
                  / {Math.round(proteinGoal)}g ·{" "}
                  {proteinRemaining > 0 ? (
                    <>
                      {Math.round(proteinRemaining)}g left for today
                    </>
                  ) : (
                    <>Goal reached for today 🎉</>
                  )}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  disabled={saving}
                >
                  Reset for today
                </Button>
                {saving && (
                  <p className="text-[11px] text-muted-foreground">
                    Saving to MongoDB…
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
