import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PhoneOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Meteors } from "@/components/ui/meteors";
import { toast } from "sonner";
import { motion } from "framer-motion";
import DualAudioWaveform from "@/components/DualAudioWaveform";
import { interviewApi } from "@/api/api-handler";

const Conversation = () => {
  const navigate = useNavigate();
  const [showEndCall, setShowEndCall] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    const endCallTimer = setTimeout(() => {
      setShowEndCall(true);
    }, 2000);

    const connectionTimer = setTimeout(() => {
      setIsConnected(true);
    }, 3000);

    return () => {
      clearTimeout(endCallTimer);
      clearTimeout(connectionTimer);
    };
  }, []);

  useEffect(() => {
    if (isConnected) {
      initializeAudioContext();
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [isConnected]);

  useEffect(() => {
    const initializeInterview = async () => {
      try {
        setIsLoading(true);
        const { audioURL } = await interviewApi.startInterview();
        setCurrentAudioUrl(audioURL);
      } catch (error) {
        toast.error("Failed to start interview");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isConnected) {
      initializeInterview();
    }
  }, [isConnected]);

  useEffect(() => {
    if (currentAudioUrl) {
      console.log("New audio URL received:", currentAudioUrl);

      if (!audioElementRef.current) {
        console.log("Creating new Audio element");
        audioElementRef.current = new Audio();
      }

      // Add event listeners for audio playback
      audioElementRef.current.onplay = () => setIsAudioPlaying(true);
      audioElementRef.current.onpause = () => setIsAudioPlaying(false);
      audioElementRef.current.onended = () => setIsAudioPlaying(false);

      console.log("Setting audio source and attempting playback");
      audioElementRef.current.src = currentAudioUrl;
      audioElementRef.current
        .play()
        .then(() => {
          console.log("Audio playback started successfully");
        })
        .catch((error) => {
          console.error("Error playing audio:", error);
          toast.error("Failed to play audio");
        });
    }
  }, [currentAudioUrl]);

  const initializeAudioContext = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
        console.log("Audio chunk received:", event.data.size, "bytes");
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const url = window.URL.createObjectURL(audioBlob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `recording-${Date.now()}.wav`;
        link.click();
        window.URL.revokeObjectURL(url);
        audioChunksRef.current = [];
      };
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast.error("Could not access microphone");
    }
  };

  const handleAudioSubmission = async (audioBlob: Blob) => {
    try {
      setIsLoading(true);
      const audioFile = new File([audioBlob], "recording.wav", {
        type: "audio/wav",
      });
      const response = await interviewApi.getNextQuestion(audioFile);

      if (response.isComplete) {
        handleEndCall();
        return;
      }

      setCurrentAudioUrl(response.audioURL);
    } catch (error) {
      toast.error("Failed to process response");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRecording = () => {
    if (!mediaRecorderRef.current) return;

    if (isRecording) {
      console.log("Stopping recording...");
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        handleAudioSubmission(audioBlob);
        audioChunksRef.current = [];
      };
    } else {
      console.log("Starting new recording...");
      audioChunksRef.current = [];
      mediaRecorderRef.current.start();
    }
    setIsRecording(!isRecording);
  };

  const handleEndCall = () => {
    // Stop audio playback if it's playing
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      audioElementRef.current.currentTime = 0;
    }

    // Stop recording if it's active
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }

    navigate("/swipe", { state: { fromPage: "conversation" } });
    toast("Call has ended", {
      description: "You can now continue swiping",
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-primary overflow-hidden">
      <div className="flex-1 flex items-center justify-center p-4 relative">
        <div className="absolute inset-0">
          <Meteors number={20} />
        </div>

        <div className="text-center space-y-8 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-semibold text-primary-foreground"
          >
            {!isConnected ? (
              "Connecting..."
            ) : isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span>Processing...</span>
              </div>
            ) : (
              "Connected"
            )}
          </motion.h2>

          {isConnected && (
            <DualAudioWaveform
              isRecording={isRecording}
              onToggleRecording={toggleRecording}
              isLoading={isLoading}
              audioUrl={currentAudioUrl}
              isAudioPlaying={isAudioPlaying}
            />
          )}

          {showEndCall && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "w-14 h-14 rounded-full animate-fade-in",
                  "bg-destructive hover:bg-destructive/80"
                )}
                onClick={handleEndCall}
              >
                <PhoneOff className="h-6 w-6 text-white" />
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Conversation;
