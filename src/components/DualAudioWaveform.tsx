"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import { motion } from "framer-motion";

interface DualAudioWaveformProps {
  isRecording: boolean;
  onToggleRecording: () => void;
  isLoading: boolean;
  audioUrl: string | null;
  isAudioPlaying: boolean;
}

const AudioWaveform: React.FC<{ isActive: boolean; color: string }> = ({
  isActive,
  color,
}) => {
  const [heights, setHeights] = useState<number[]>(Array(30).fill(10));

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setHeights(heights.map(() => Math.random() * 50 + 10));
      }, 100);
      return () => clearInterval(interval);
    } else {
      setHeights(Array(30).fill(10));
    }
  }, [isActive]);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {heights.map((height, index) => (
        <motion.div
          key={index}
          className={`w-2 mx-px rounded-full`}
          style={{
            backgroundColor: color,
            opacity: isActive ? 0.7 : 0.3,
          }}
          animate={{ height: `${height}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
      ))}
    </div>
  );
};

const DualAudioWaveform: React.FC<DualAudioWaveformProps> = ({
  isRecording,
  onToggleRecording,
  isLoading,
  audioUrl,
  isAudioPlaying,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {/* User Input Waveform */}
      <div className="relative inline-block">
        <Button
          variant="outline"
          size="icon"
          className={`w-96 h-32 rounded-xl transition-all duration-300 overflow-hidden ${
            isRecording
              ? "bg-blue-100 hover:bg-blue-200"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
          onClick={onToggleRecording}
        >
          <AudioWaveform isActive={isRecording} color="#3B82F6" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Mic
              className={`w-8 h-8 ${
                isRecording ? "text-blue-500" : "text-gray-500"
              }`}
            />
          </div>
        </Button>
      </div>

      {/* AI Response Waveform */}
      <div className="relative inline-block">
        <div className="w-96 h-32 rounded-xl overflow-hidden bg-gray-100">
          <AudioWaveform isActive={isAudioPlaying} color="#10B981" />
        </div>
      </div>
    </div>
  );
};

export default DualAudioWaveform;
