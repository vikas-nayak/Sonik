import { db } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { client } from "@gradio/client";
import { put } from "@vercel/blob";

export async function POST(req: NextRequest) {
  try {
    const { userId }: { userId: string | null } = getAuth(req);
    if (!userId) throw new Error("User not authenticated");

    const formData = await req.formData();
    const audioFile = formData.get("audioFile") as File;
    const inputText = formData.get("inputText") as string;

    if (!audioFile || !inputText) throw new Error("Missing audio file or input text");

    const audioBlob = new Blob([await audioFile.arrayBuffer()], { type: audioFile.type });

    const app = await client("https://tonyassi-voice-clone.hf.space/");
    const result = await app.predict("/predict", [inputText, audioBlob]);
    console.log("Gradio result:", result);

    const predictionPath = result?.data?.[0]?.path;
    if (!predictionPath) throw new Error("No prediction path returned from Gradio");

    const gradioBaseUrl = "https://tonyassi-voice-clone.hf.space";
    const audioResponse = await fetch(gradioBaseUrl + predictionPath);
    if (!audioResponse.ok) throw new Error("Failed to fetch generated audio from Gradio");

    const generatedBuffer = await audioResponse.arrayBuffer();
    const generatedBlob = new Blob([generatedBuffer], { type: "audio/wav" });

    // Upload to Vercel Blob
    const fileName = `clone-${Date.now()}.wav`;
    const { url: uploadedUrl } = await put(fileName, generatedBlob, {
      access: "public", // or "private" if needed
    });

    // Save in DB
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
        predictionUrl: uploadedUrl,
      },
    });

    return NextResponse.json({ predictionUrl: uploadedUrl });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
