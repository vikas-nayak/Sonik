import { db } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { client } from "@gradio/client";

// Define interfaces for the prediction result
interface PredictionData {
  url: string;
  // Add other properties if they exist in the prediction data
}

interface GradioResponse {
  data: PredictionData[];
}

export async function POST(req: NextRequest) {
  try {
    const { userId }: { userId: string | null } = getAuth(req);
    if (!userId) {
      throw new Error('User not authenticated');
    }

    const formData = await req.formData();
    const audioFile = formData.get('audioFile') as File;
    const inputText = formData.get('inputText') as string;

    if (!audioFile || !inputText) {
      throw new Error('Missing audio file or input text');
    }

    const app = await client("tonyassi/voice-clone");
    const result = await app.predict("/predict", [inputText, audioFile]) as GradioResponse;
    const predictionData = result.data[0];
    const predictionUrl = predictionData.url;
    
    if (!predictionUrl) {
      throw new Error('No prediction URL returned from Gradio');
    }

    // AudioFile save karo
    const audioFileEntry = await db.audioFile.create({
      data: {
        userId,
        fileUrl: audioFile.name,
        inputText
      }
    });

    // Prediction save karo
    await db.prediction.create({
      data: {
        audioFileId: audioFileEntry.id,
        predictionUrl: predictionUrl,
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