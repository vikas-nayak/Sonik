import { db } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { client } from "@gradio/client";

interface PredictionData {
  url: string;
}

interface GradioResponse {
  data: PredictionData[];
}

export async function POST(req: NextRequest) {
  try {
    const { userId }: { userId: string | null } = getAuth(req);
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const formData = await req.formData();
    const audioFile = formData.get("audioFile") as File;
    const inputText = formData.get("inputText") as string;

    if (!audioFile || !inputText) {
      throw new Error("Missing audio file or input text");
    }

    const audioBlob = new Blob([await audioFile.arrayBuffer()], { type: audioFile.type });

    const app = await client("https://tonyassi-voice-clone.hf.space/");
    const result = await app.predict("/predict", [inputText, audioBlob]) as GradioResponse;

    const predictionData = result.data?.[0];
    const predictionUrl = predictionData?.url;

    if (!predictionUrl) {
      throw new Error("No prediction URL returned from Gradio");
    }

    const audioFileEntry = await db.audioFile.create({
      data: {
        userId,
        fileUrl: audioFile.name,
        inputText,
      },
    });

    await db.prediction.create({
      data: {
        audioFileId: audioFileEntry.id,
        predictionUrl,
      },
    });

    return NextResponse.json({ predictionUrl });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error occurred" },
      { status: 500 }
    );
  }
}
