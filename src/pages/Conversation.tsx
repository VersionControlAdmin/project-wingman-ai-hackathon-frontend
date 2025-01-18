import { useState, useRef, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import axios from "axios";
import { MicrophoneButton } from "@/components/MicrophoneButton";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Phone, PhoneOff } from "lucide-react";

const Conversation = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  
  const { toast } = useToast();
  
  const localWaveformRef = useRef<HTMLDivElement>(null);
  const remoteWaveformRef = useRef<HTMLDivElement>(null);
  const localWavesurfer = useRef<WaveSurfer | null>(null);
  const remoteWavesurfer = useRef<WaveSurfer | null>(null);
  const apiConnection = useRef<any>(null);

  useEffect(() => {
    if (localWaveformRef.current && remoteWaveformRef.current) {
      // Initialize local waveform
      localWavesurfer.current = WaveSurfer.create({
        container: localWaveformRef.current,
        waveColor: '#fb4d3d', // accent color
        progressColor: '#191923', // primary color
        height: 200, // Increased height
        cursorWidth: 0,
        barWidth: 3,
        barGap: 4,
        barRadius: 3
      });

      // Initialize remote waveform
      remoteWavesurfer.current = WaveSurfer.create({
        container: remoteWaveformRef.current,
        waveColor: '#c5d1eb', // secondary color
        progressColor: '#191923', // primary color
        height: 200, // Increased height
        cursorWidth: 0,
        barWidth: 3,
        barGap: 4,
        barRadius: 3
      });

      // Load demo audio data
      localWavesurfer.current.load('/demo-audio.mp3');
      remoteWavesurfer.current.load('/demo-audio.mp3');
    }

    return () => {
      localWavesurfer.current?.destroy();
      remoteWavesurfer.current?.destroy();
    };
  }, []);

  const startCall = async () => {
    try {
      // In a real implementation, this would connect to your API
      // apiConnection.current = await axios.create({
      //   baseURL: 'your-api-url',
      //   timeout: 5000,
      // });
      
      setIsCallActive(true);
      toast({
        title: "Call started",
        description: "You're now connected",
      });

      // Demo: Start audio visualization
      localWavesurfer.current?.play();
      remoteWavesurfer.current?.play();
    } catch (error) {
      toast({
        title: "Failed to start call",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const endCall = () => {
    // Clean up API connection
    if (apiConnection.current) {
      // apiConnection.current.close();
      apiConnection.current = null;
    }

    // Stop audio visualization
    localWavesurfer.current?.stop();
    remoteWavesurfer.current?.stop();
    
    setIsCallActive(false);
    toast({
      title: "Call ended",
      description: "Connection closed",
    });
  };

  const handleMicClick = async () => {
    try {
      if (!isRecording) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setIsRecording(true);
        // Mock recording for demo
        setTimeout(() => {
          setIsRecording(false);
        }, 3000);
      } else {
        setIsRecording(false);
      }
    } catch (error) {
      toast({
        title: "Microphone access denied",
        description: "Please allow microphone access to continue.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 bg-zinc-900">
      <div className="w-full max-w-4xl flex-1 flex flex-col justify-center gap-16 px-4">
        {/* Remote audio waveform (AI) */}
        <div className="p-6 rounded-xl bg-zinc-800/50 backdrop-blur-sm w-full">
          <div ref={remoteWaveformRef} className="w-full" />
        </div>
        
        {/* Local audio waveform (User) */}
        <div className="p-6 rounded-xl bg-zinc-800/50 backdrop-blur-sm w-full">
          <div ref={localWaveformRef} className="w-full" />
        </div>
      </div>

      <div className="w-full max-w-md flex justify-center gap-4 pb-4 pt-8">
        <MicrophoneButton
          isRecording={isRecording}
          onClick={handleMicClick}
          className="animate-fade-in"
        />
        
        {!isCallActive ? (
          <Button
            onClick={startCall}
            className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 transition-all duration-300"
          >
            <Phone className="h-8 w-8 text-white" />
          </Button>
        ) : (
          <Button
            onClick={endCall}
            className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 transition-all duration-300"
          >
            <PhoneOff className="h-8 w-8 text-white" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Conversation;