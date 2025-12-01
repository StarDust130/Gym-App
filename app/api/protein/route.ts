import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

const DB_NAME = process.env.MONGODB_DB || "gymapp";
const COLLECTION = "proteinEntries";

// GET /api/protein?dateKey=2025-12-01
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const dateKey = searchParams.get("dateKey");

    if (!dateKey) {
      return NextResponse.json({ error: "dateKey is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION);

    const doc = await collection.findOne({ dateKey });

    if (!doc) {
      // default if nothing stored yet
      return NextResponse.json({
        dateKey,
        proteinGoal: 120,
        proteinConsumed: 0,
      });
    }

    return NextResponse.json({
      dateKey: doc.dateKey,
      proteinGoal: doc.proteinGoal ?? 120,
      proteinConsumed: doc.proteinConsumed ?? 0,
    });
  } catch (error) {
    console.error("GET /api/protein error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST /api/protein  { dateKey, proteinGoal, proteinConsumed }
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { dateKey, proteinGoal, proteinConsumed } = body;

    if (!dateKey) {
      return NextResponse.json({ error: "dateKey is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION);

    await collection.updateOne(
      { dateKey },
      {
        $set: {
          dateKey,
          proteinGoal: Number(proteinGoal) || 0,
          proteinConsumed: Number(proteinConsumed) || 0,
          updatedAt: new Date(),
        },
      },
      { upsert: true },
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("POST /api/protein error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
