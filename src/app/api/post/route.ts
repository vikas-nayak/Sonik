import { db } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { client } from "@gradio/client";

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

    const audioBlob = new Blob([await audioFile.arrayBuffer()], {
      type: audioFile.type,
    });

    const app = await client("https://tonyassi-voice-clone.hf.space/");

    // OPTIONAL: view available endpoints
    // const endpoints = await app.view();
    // console.log("Endpoints:", endpoints);

    const result = await app.predict("/predict", [inputText, audioBlob]);
    console.log("Gradio raw result:", result);

    // Robust prediction URL extraction
    let predictionUrl: string | null = null;

    if (Array.isArray(result)) {
      predictionUrl = typeof result[0] === "string" ? result[0] : null;
    } else if ("data" in result) {
      const data = result.data;
      if (Array.isArray(data)) {
        if (typeof data[0] === "string") {
          predictionUrl = data[0];
        } else if (typeof data[0] === "object" && "url" in data[0]) {
          predictionUrl = data[0].url;
        }
      }
    }

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
      {
        error: error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
