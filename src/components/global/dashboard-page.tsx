"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";
import Sidebar from "@/components/global/sidebar";
import Topbar from "./topbar";
import { useAuth } from "@clerk/nextjs"; // Clerk hooks

export default function UploadPage() {
  const { isLoaded, isSignedIn } = useAuth(); // Check if user is signed in

  const [file, setFile] = useState(null);
  const [text, setText] = useState("hello");
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
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

      // Check if result contains predictionUrl
      if (result.predictionUrl && typeof result.predictionUrl === 'string') {
        console.log("Retrieved Prediction URL:", result.predictionUrl); // Debugging
        setAudioUrl(result.predictionUrl); // Assuming `predictionUrl` is a string with the URL
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

  // Debugging: Ensure audioUrl has a valid value
  useEffect(() => {
    console.log("Audio URL State:", audioUrl);
  }, [audioUrl]);

  return (
    <div className="h-screen grid grid-cols-[218px_1fr]">
      <Sidebar />

      <div className="flex flex-col w-full">
        <Topbar />

        <div className="flex justify-center items-center flex-grow">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader>
              <CardTitle className="text-center text-xl font-semibold">
                Upload Audio File and Enter Text
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="file">Audio File</Label>
                  <Input
                    type="file"
                    id="file"
                    accept="audio/*"
                    onChange={handleFileChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="text">Text Input</Label>
                  <Input
                    type="text"
                    id="text"
                    placeholder="Enter text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Upload
                </Button>
              </form>

              <div className="mt-6 text-center">
                {loading ? (
                  <Skeleton className="h-8 w-[400px] mx-auto" />
                ) : (
                  audioUrl && (
                    <div>
                      <p className="truncate max-w-full" title={audioUrl}>
                        Audio URL:{" "}
                        <a
                          href={audioUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
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
      </div>
    </div>
  );
}
