import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, categories } = await request.json();

    // We'll alternate between keys or just use one.
    const apiKey = process.env.GROQ_API_KEY || process.env.GROQ_API_KEY_2;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing GROQ API Key" },
        { status: 500 },
      );
    }

    const prompt = `You are an expert fitness coach with a great sense of humor and cool attitude.
I am trying to add a custom exercise named "${name}" to my workout tracker.
Existing categories in my plan are: ${categories.join(", ")}.

IMPORTANT: If "${name}" is clearly NOT a valid physical gym, stretching, or mobility exercise (e.g. food, random gibberish like hdjddj, fake words like moru baba, non-fitness related activities, or bad words/profanity), you MUST return EXACTLY this JSON format but REPLACE the "error" value with a GENERATED funny, cool, and great error message about what they typed:
{
  "error": "<your funny generated error message roasting them or joking about why '${name}' is not an exercise. Keep it VERY SHORT (1 sentence maximum!), use Hindi and English slang (Hinglish like 'Arre bhai', 'Kya kar raha hai', 'Kuch bhi?!'), and add emojis!>"
}

Otherwise, if it IS a legitimate physical workspace exercise, provide the following in strictly valid JSON format, with NO markdown formatting, NO extra text. Keep notes very short, simple, direct, and use emojis!:
{
  "reps": "suggested reps (e.g. 8-12)",
  "sets": "suggested sets (e.g. 3 sets)",
  "category": "choose best fitting category",
  "note": "A very short, simple, direct motivating coach note WITH emojis! 🚀🔥",
  "tips": [
    "Tip 1 (short)",
    "Tip 2 (short)",
    "Tip 3 (short)"
  ],
  "impact": [
    "Primary Muscle",
    "Secondary Muscle"
  ]
}`;

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant", // upgraded model since older one is decommissioned
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("GROQ API ERROR:", errText);
      return NextResponse.json(
        { error: "API Failure: " + res.statusText },
        { status: 500 },
      );
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content || "{}";

    // Attempt to extract JSON if it was accidentally wrapped in markdown blocks
    const match = content.match(/\{[\s\S]*\}/);
    const cleanJson = match ? match[0] : "{}";

    return NextResponse.json(JSON.parse(cleanJson));
  } catch (error) {
    console.error("AI Gen Error", error);
    return NextResponse.json(
      { error: "Failed to generate details" },
      { status: 500 },
    );
  }
}
