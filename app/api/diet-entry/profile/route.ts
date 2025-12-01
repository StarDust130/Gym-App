import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

const DB_NAME = process.env.MONGODB_DB || "gymapp";
const COLLECTION = "dietProfiles";

const DEFAULT_PROFILE_RESPONSE = { profile: null };

type ProfilePayload = {
  goal: string;
  weightKg: number;
  heightCm: number;
  heightText: string;
  proteinTarget: number;
};

const clampNumber = (value: unknown, fallback: number) => {
  const num = Number(value);
  return Number.isFinite(num) && num > 0 ? num : fallback;
};

function sanitizeProfile(profile: ProfilePayload) {
  return {
    goal: profile.goal,
    weightKg: clampNumber(profile.weightKg, 70),
    heightCm: clampNumber(profile.heightCm, 170),
    heightText:
      profile.heightText || `${clampNumber(profile.heightCm, 170)} cm`,
    proteinTarget: clampNumber(profile.proteinTarget, 120),
  };
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userKey = searchParams.get("userKey");

    if (!userKey) {
      return NextResponse.json(
        { error: "userKey is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION);

    const doc = await collection.findOne({ userKey });

    if (!doc) {
      return NextResponse.json(DEFAULT_PROFILE_RESPONSE);
    }

    return NextResponse.json({ profile: doc.profile ?? null });
  } catch (error) {
    console.error("GET /api/diet-entry/profile error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userKey, profile } = body as {
      userKey?: string;
      profile?: ProfilePayload;
    };

    if (!userKey || !profile) {
      return NextResponse.json(
        { error: "userKey and profile are required" },
        { status: 400 }
      );
    }

    const safeProfile = sanitizeProfile(profile);

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION);

    await collection.updateOne(
      { userKey },
      {
        $set: {
          userKey,
          profile: safeProfile,
          updatedAt: new Date().toISOString(),
        },
      },
      { upsert: true }
    );

    return NextResponse.json({ profile: safeProfile });
  } catch (error) {
    console.error("POST /api/diet-entry/profile error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
