"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";
import { useAuth } from "@clerk/nextjs";
import VoiceExamplesTable from "./examples";

export default function UploadPage() {
  const { isLoaded, isSignedIn } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("hello");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
      setSelectedFileName(event.target.files[0].name);
    }
  };

  const handleTextClick = (selectedText: string) => {
    setText(selectedText);
  };

  const handleAudioClick = async (audioFileName: string) => {
    try {
      setLoading(true);
      
      // Create a new input element
      const input = document.createElement('input');
      input.type = 'file';
      
      // Create a new File object with some content
      const response = await fetch(`/audio-examples/${audioFileName}`);
      const blob = await response.blob();
      
      // Create a DataTransfer object
      const dataTransfer = new DataTransfer();
      
      // Create a new file and add it to the DataTransfer object
      const file = new File([blob], audioFileName, { type: blob.type });
      dataTransfer.items.add(file);
      
      // Set the files property of the original file input
      if (fileInputRef.current) {
        fileInputRef.current.files = dataTransfer.files;
        // Trigger change event
        const changeEvent = new Event('change', { bubbles: true });
        fileInputRef.current.dispatchEvent(changeEvent);
      }
      
      setFile(file);
      setSelectedFileName(audioFileName);
      
    } catch (error) {
      console.error("Error setting audio file:", error);
      alert("Failed to load the audio file. Please try uploading manually.");
    } finally {
      setLoading(false);
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
      alert("Failed to upload. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Upload Form Card */}
      <Card className="bg-fuchsia-300 border-4 border-blue-600 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl md:text-2xl font-bold text-blue-600 break-words">
            Upload Audio File and Enter Text
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="file" className="text-base md:text-lg font-bold text-blue-600">Audio File</Label>
              <div className="mt-2 space-y-2">
                <Input
                  ref={fileInputRef}
                  type="file"
                  id="file"
                  accept="audio/*"
                  onChange={handleFileChange}
                  required
                  className="border-2 border-blue-600 bg-yellow-200 text-blue-600 text-sm md:text-base"
                />
                {selectedFileName && (
                  <div className="text-blue-600 text-sm">
                    Selected file: {selectedFileName}
                  </div>
                )}
              </div>
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
            <Button 
              type="submit" 
              className="w-full bg-blue-600 text-yellow-200 text-base md:text-lg font-bold hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Upload'}
            </Button>
          </form>

          <div className="mt-6">
            {loading ? (
              <Skeleton className="h-8 w-full bg-yellow-200" />
            ) : (
              audioUrl && (
                <div className="bg-yellow-200 p-2 md:p-4 border-2 border-blue-600">
                  <p className="text-blue-600 font-bold text-sm md:text-base">
                    Audio URL:{" "}
                    <a
                      href={audioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-fuchsia-600 underline truncate block max-w-full"
                      
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

      <div className="overflow-x-auto">
        <VoiceExamplesTable 
          onTextClick={handleTextClick}
          onAudioClick={handleAudioClick}
        />
      </div>
    </div>
  );
}