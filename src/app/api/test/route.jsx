import { client } from "@gradio/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const audioFile = formData.get('audioFile');
    const inputText = formData.get('inputText');  // Get user input text
    
    if (!audioFile || !inputText) {
      throw new Error('Missing audio file or input text');
    }

    // Initialize the Gradio client
    const app = await client("tonyassi/voice-clone");

    // Make the prediction request
    const result = await app.predict("/predict", [
      inputText, // user input text
      audioFile  // uploaded file
    ]);

    console.log("Gradio result: ", result);  // Debugging the result

    // Assuming result.data[0] contains the processed audio URL
    const audioUrl = result.data[0];  // Change this if the structure is different
    
    if (!audioUrl) {
      throw new Error('No audio URL returned from Gradio');
    }

    // Return the URL as JSON
    return NextResponse.json({ audioUrl });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message || "Unknown error occurred" }, { status: 500 });
  }
}
