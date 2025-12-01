import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

const DB_NAME = process.env.MONGODB_DB || "gymapp";
const COLLECTION = "dietEntries";

const DEFAULT_ENTRY = {
  meals: [],
  proteinGoal: 120,
  hydrationLiters: 2,
};

function buildDefaultEntry(userKey: string, dateKey: string) {
  return {
    userKey,
    dateKey,
    ...DEFAULT_ENTRY,
  };
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const dateKey = searchParams.get("dateKey");
    const userKey = searchParams.get("userKey");

    if (!dateKey || !userKey) {
      return NextResponse.json(
        { error: "dateKey and userKey are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION);

    const doc = await collection.findOne({ userKey, dateKey });

    if (!doc) {
      return NextResponse.json(buildDefaultEntry(userKey, dateKey));
    }

    return NextResponse.json({
      userKey,
      dateKey,
      meals: doc.meals ?? [],
      proteinGoal: doc.proteinGoal ?? DEFAULT_ENTRY.proteinGoal,
      hydrationLiters: doc.hydrationLiters ?? DEFAULT_ENTRY.hydrationLiters,
      updatedAt: doc.updatedAt ?? new Date().toISOString(),
    });
  } catch (error) {
    console.error("GET /api/diet-entry error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { dateKey, userKey, meals, proteinGoal, hydrationLiters } = body;

    if (!dateKey || !userKey) {
      return NextResponse.json(
        { error: "dateKey and userKey are required" },
        { status: 400 }
      );
    }

    const safeMeals = Array.isArray(meals) ? meals : [];

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION);

    await collection.updateOne(
      { userKey, dateKey },
      {
        $set: {
          userKey,
          dateKey,
          meals: safeMeals,
          proteinGoal:
            typeof proteinGoal === "number"
              ? proteinGoal
              : DEFAULT_ENTRY.proteinGoal,
          hydrationLiters:
            typeof hydrationLiters === "number"
              ? hydrationLiters
              : DEFAULT_ENTRY.hydrationLiters,
          updatedAt: new Date().toISOString(),
        },
      },
      { upsert: true }
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("POST /api/diet-entry error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
