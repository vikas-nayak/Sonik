"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";
import { useAuth } from "@clerk/nextjs";

export default function UploadPage() {
  const { isLoaded, isSignedIn } = useAuth();

  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("hello");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!file || !text) {
      alert("Please select a file and enter some text first");
      return;
    }

    if (!isSignedIn) {
      alert("Please sign in to upload audio.");
      return;
    }

    const formData = new FormData();
    formData.append("audioFile", file);
    formData.append("inputText", text);

    setLoading(true);

    try {
      const response = await fetch("/api/post", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.predictionUrl && typeof result.predictionUrl === 'string') {
        console.log("Retrieved Prediction URL:", result.predictionUrl);
        setAudioUrl(result.predictionUrl);
      } else {
        console.error("Failed to retrieve the prediction URL. Response:", result);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center flex-grow p-4">
      <Card className="w-full max-w-md shadow-lg bg-fuchsia-300 border-4 border-blue-600">
        <CardHeader>
          <CardTitle className="text-center text-xl md:text-2xl font-bold text-blue-600 break-words">
            Upload Audio File and Enter Text
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="file" className="text-base md:text-lg font-bold text-blue-600">Audio File</Label>
              <Input
                type="file"
                id="file"
                accept="audio/*"
                onChange={handleFileChange}
                required
                className="mt-2 border-2 border-blue-600 bg-yellow-200 text-blue-600 text-sm md:text-base"
              />
            </div>
            <div>
              <Label htmlFor="text" className="text-base md:text-lg font-bold text-blue-600">Text Input</Label>
              <Input
                type="text"
                id="text"
                placeholder="Enter text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
                className="mt-2 border-2 border-blue-600 bg-yellow-200 text-blue-600 text-sm md:text-base"
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 text-yellow-200 text-base md:text-lg font-bold hover:bg-blue-700">
              {loading ? 'Processing...' : 'Upload'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            {loading ? (
              <Skeleton className="h-8 w-full md:w-[400px] mx-auto bg-yellow-200" />
            ) : (
              audioUrl && (
                <div className="bg-yellow-200 p-2 md:p-4 border-2 border-blue-600">
                  <p className="truncate max-w-full text-blue-600 font-bold text-sm md:text-base" title={audioUrl}>
                    Audio URL:{" "}
                    <a
                      href={audioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-fuchsia-600 underline break-all"
                    >
                      {audioUrl}
                    </a>
                  </p>
                </div>
              )
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}