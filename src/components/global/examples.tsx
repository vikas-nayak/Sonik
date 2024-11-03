import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, StopCircle } from "lucide-react";

// Define prop types
interface VoiceExamplesTableProps {
  onTextClick: (text: string) => void;
  onAudioClick: (audio: string) => void;
}

const VoiceExamplesTable: React.FC<VoiceExamplesTableProps> = ({ onTextClick, onAudioClick }) => {
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  const examples = [
    {
      text: "It's me Robert Downey Junior, love you 3000. Type in whatever you'd like me to say.",
      audio: "robert-downey-jr.mp3",
    },
    {
      text: "Hey! I'm Morgan Freeman. Type in whatever you'd like me to say.",
      audio: "morgan-freeman.mp3",
    },
    {
      text: "Hey, it's me Taylor Swift. Type in whatever you'd like me to say.",
      audio: "taylor-swift.mp3",
    },
  ];

  const handlePlayClick = (audioFileName: string) => {
    // Stop any currently playing audio
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0; // Reset time to start
    }

    // Create and play new audio element
    const audio = new Audio(`/audio-examples/${audioFileName}`);
    audio.play();
    setAudioElement(audio);
    setPlayingAudio(audioFileName);

    // Reset the playing state once the audio ends
    audio.onended = () => setPlayingAudio(null);
  };

  // Cleanup when component unmounts or audio changes
  useEffect(() => {
    return () => {
      if (audioElement) {
        audioElement.pause();
      }
    };
  }, [audioElement]);

  return (
    <div className="mt-4 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-blue-600 p-2 justify-center flex">Examples to Try</h2>
      <div className="border-2 border-blue-600 rounded-lg overflow-hidden">
        <table className="w-full bg-yellow-200">
          <thead>
            <tr className="bg-blue-600">
              <th className="px-4 py-2 text-yellow-200 font-bold text-left">Text</th>
              <th className="px-4 py-2 text-yellow-200 font-bold text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {examples.map((example, index) => (
              <tr key={index} className="border-t border-blue-600">
                <td
                  className="px-4 py-2 cursor-pointer hover:bg-fuchsia-200 text-blue-600"
                  onClick={() => onTextClick(example.text)}
                >
                  {example.text}
                </td>
                <td className="px-4 py-2 text-blue-600 flex items-center space-x-2">
                  <Button
                    onClick={() => handlePlayClick(example.audio)}
                    className="bg-blue-600 text-yellow-200 px-2 py-1"
                  >
                    {playingAudio === example.audio ? <StopCircle /> : <Play />}
                  </Button>
                  <Button
                    onClick={() => onAudioClick(example.audio)}
                    className="bg-fuchsia-600 text-yellow-200 px-2 py-1"
                  >
                    Select
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VoiceExamplesTable;
