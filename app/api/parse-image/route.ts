import { NextResponse } from "next/server";
import Groq from "groq-sdk";

// Generate predictable IDs
function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function POST(req: Request) {
  try {
    const { image } = await req.json();
    if (!image) {
      return NextResponse.json({
        ok: false,
        message: "No image provided.",
      });
    }

    const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

    // --- AI CALL ---
    const completion = await client.chat.completions.create({
      model: "meta-llama/llama-4-maverick-17b-128e-instruct",
      temperature: 0,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `
Identify if this image is a WORKOUT SCHEDULE or not.

If YES → return EXACT JSON format:

{
  "planName": "string",
  "schedule": {
    "Monday": "Lower Body",
    "Tuesday": "Upper Body",
    "Wednesday": "Cardio & Abs",
    "Thursday": "Lower Body",
    "Friday": "Upper Body",
    "Saturday": "Cardio & Abs",
    "Sunday": "Rest Day"
  },
  "workouts": {
    "Lower Body": [
      {"name":"...", "reps":"...", "sets":"...", "note":"..."},
      ...
    ]
  }
}

If you cannot identify a weekly plan → return ONLY:
{"error":"NOT_PLAN"}
            `,
            },
            {
              type: "image_url",
              image_url: { url: image },
            },
          ],
        },
      ],
    });

    const raw = JSON.parse(completion.choices[0].message.content);

    // ❌ If AI says not a workout plan
    if (raw.error === "NOT_PLAN") {
      return NextResponse.json({
        ok: false,
        message:
          "This doesn't look like a weekly workout schedule. Try uploading a clear screenshot.",
      });
    }

    // ---------------------------------------------
    // SAFETY NORMALIZATION LAYER
    // ---------------------------------------------

    const WEEK_DAYS = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    const planName = raw.planName || "My Workout Plan";

    const schedule = raw.schedule || {};
    WEEK_DAYS.forEach((d) => {
      if (!schedule[d]) schedule[d] = "Rest Day";
    });

    const workouts = raw.workouts || {};

    // Ensure all schedule blocks exist
    Object.values(schedule).forEach((block) => {
      if (!workouts[block]) workouts[block] = [];
    });

    // Convert string exercises → full object
    for (const block in workouts) {
      workouts[block] = workouts[block].map((item: any, idx: number) => {
        if (typeof item === "string") {
          return {
            id: `${slugify(block)}-${idx + 1}`,
            name: item,
            reps: "10–15", // fallback
            sets: "2–3", // fallback
            note: null,
          };
        }
        return {
          id: item.id ?? `${slugify(block)}-${idx + 1}`,
          name: item.name ?? "Exercise",
          reps: item.reps ?? "10–15",
          sets: item.sets ?? "2–3",
          note: item.note ?? null,
        };
      });
    }

    // ---------------------------------------------
    // FINAL CLEAN PLAN
    // ---------------------------------------------
    const finalPlan = {
      planName,
      schedule,
      workouts,
    };

    return NextResponse.json({
      ok: true,
      data: finalPlan,
    });
  } catch (e) {
    return NextResponse.json(
      {
        ok: false,
        message: "Parsing failed. Upload a clear screenshot.",
      },
      { status: 500 }
    );
  }
}
