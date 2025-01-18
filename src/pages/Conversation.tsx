import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WaveSurfer from "wavesurfer.js";
import axios from "axios";
import { MicrophoneButton } from "@/components/MicrophoneButton";
import { Button } from "@/components/ui/button";
import { ChatBubble } from "@/components/ChatBubble";
import { useToast } from "@/hooks/use-toast";
import { Phone, PhoneOff } from "lucide-react";

const Conversation = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hi! I'm Jason, your personal wingman. Ready to find your perfect match?", isUser: false },
  ]);
  
  const navigate = useNavigate();
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
        waveColor: '#9b87f5',
        progressColor: '#1A1F2C',
        height: 50,
        cursorWidth: 0,
        barWidth: 2,
        barGap: 3,
        barRadius: 3,
      });

      // Initialize remote waveform
      remoteWavesurfer.current = WaveSurfer.create({
        container: remoteWaveformRef.current,
        waveColor: '#D6BCFA',
        progressColor: '#403E43',
        height: 50,
        cursorWidth: 0,
        barWidth: 2,
        barGap: 3,
        barRadius: 3,
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
          setMessages((prev) => [
            ...prev,
            { text: "I'm looking for someone who shares my interests in tech and hiking.", isUser: true },
            { text: "Great! I'll help you find someone perfect. Let's move on to some potential matches!", isUser: false },
          ]);
          toast({
            title: "Conversation complete!",
            description: "Let's check out your matches.",
          });
          setTimeout(() => navigate("/swipe"), 2000);
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
      <div className="w-full max-w-md flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((msg, index) => (
          <ChatBubble
            key={index}
            message={msg.text}
            isUser={msg.isUser}
            className="animate-fade-in"
          />
        ))}
      </div>
      
      <div className="w-full max-w-2xl space-y-8 mb-8">
        {/* Local audio waveform */}
        <div className="p-4 rounded-lg bg-zinc-800/50 backdrop-blur-sm">
          <div ref={localWaveformRef} className="w-full" />
        </div>
        
        {/* Remote audio waveform */}
        <div className="p-4 rounded-lg bg-zinc-800/50 backdrop-blur-sm">
          <div ref={remoteWaveformRef} className="w-full" />
        </div>
      </div>

      <div className="w-full max-w-md flex justify-center gap-4 pb-4">
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