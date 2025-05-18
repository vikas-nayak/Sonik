import { db } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { client } from "@gradio/client";
import { put } from "@vercel/blob";

// Type for Gradio response
interface GradioAudioResponse {
  data: {
    path: string;
    url: string | null;
    size?: number | null;
    orig_name?: string;
    mime_type?: string | null;
  }[];
}

export async function POST(req: NextRequest) {
  try {
    // 1. Auth
    const { userId }: { userId: string | null } = getAuth(req);
    if (!userId) throw new Error("User not authenticated");

    // 2. Form data
    const formData = await req.formData();
    const audioFile = formData.get("audioFile") as File;
    const inputText = formData.get("inputText") as string;

    if (!audioFile || !inputText) throw new Error("Missing audio file or input text");

    // 3. Convert to Blob
    const audioBlob = new Blob([await audioFile.arrayBuffer()], { type: audioFile.type });

    // 4. Gradio prediction
    const app = await client("https://tonyassi-voice-clone.hf.space/");
    const result = await app.predict("/predict", [inputText, audioBlob]) as GradioAudioResponse;

    console.log("Gradio result:", result);

    const predictionPath = result?.data?.[0]?.path;
    if (!predictionPath) throw new Error("No prediction path returned from Gradio");

    // 5. Fetch generated audio from Gradio server
    const gradioBaseUrl = "https://tonyassi-voice-clone.hf.space";
    const audioResponse = await fetch(gradioBaseUrl + predictionPath);
    if (!audioResponse.ok) throw new Error("Failed to fetch generated audio from Gradio");

    const generatedBuffer = await audioResponse.arrayBuffer();
    const generatedBlob = new Blob([generatedBuffer], { type: "audio/wav" });

    // 6. Upload to Vercel Blob
    const fileName = `clone-${Date.now()}.wav`;
    const { url: uploadedUrl } = await put(fileName, generatedBlob, {
      access: "public",
    });

    // 7. Save original file info
    const audioFileEntry = await db.audioFile.create({
      data: {
        userId,
        fileUrl: audioFile.name,
        inputText,
      },
    });

    // 8. Save prediction info
    await db.prediction.create({
      data: {
        audioFileId: audioFileEntry.id,
        predictionUrl: uploadedUrl,
      },
    });

    // 9. Return uploaded URL
    return NextResponse.json({ predictionUrl: uploadedUrl });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
