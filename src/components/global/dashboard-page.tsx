"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";
import Sidebar from "@/components/global/sidebar"; // import Sidebar component
import Topbar from "./topbar";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("hello");
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!file || !text) {
      alert("Please select a file and enter some text first");
      return;
    }

    const formData = new FormData();
    formData.append("audioFile", file);
    formData.append("inputText", text);

    setLoading(true);

    try {
      const response = await fetch("/api/test", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      if (result.audioUrl) {
        setAudioUrl(result.audioUrl.url); // Access the URL property of the object
      } else {
        console.error("Failed to retrieve the audio URL");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen grid grid-cols-[218px_1fr]">
      {/* Sidebar */}
      <Sidebar /> 

      {/* Main content */}
      <div className="flex flex-col w-full">
        {/* Topbar */}
        <Topbar />

        {/* Form and Upload */}
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
