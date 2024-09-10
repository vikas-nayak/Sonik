import { db } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { client } from "@gradio/client";


export async function POST(req:any) {
  
  try {
    const { userId }: { userId: string | null } = getAuth(req);
    if (!userId) {
      throw new Error('User not authenticated');
    }

    const formData = await req.formData();
    const audioFile = formData.get('audioFile');
    const inputText = formData.get('inputText');

    if (!audioFile || !inputText) {
      throw new Error('Missing audio file or input text');
    }

    const app = await client("tonyassi/voice-clone");
    const result:any = await app.predict("/predict", [inputText, audioFile]);
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
    return NextResponse.json({ error: error || "Unknown error occurred" }, { status: 500 });
  }
}
