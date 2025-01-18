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
  const [micVolume, setMicVolume] = useState<number>(0);
  
  const { toast } = useToast();
  
  const localWaveformRef = useRef<HTMLDivElement>(null);
  const remoteWaveformRef = useRef<HTMLDivElement>(null);
  const localWavesurfer = useRef<WaveSurfer | null>(null);
  const remoteWavesurfer = useRef<WaveSurfer | null>(null);
  const apiConnection = useRef<any>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const analyser = useRef<AnalyserNode | null>(null);
  const mediaStream = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (localWaveformRef.current && remoteWaveformRef.current) {
      // Initialize local waveform
      localWavesurfer.current = WaveSurfer.create({
        container: localWaveformRef.current,
        waveColor: '#fb4d3d', // accent color
        progressColor: '#fb4d3d', // accent color
        height: 200,
        cursorWidth: 0,
        barWidth: 3,
        barGap: 4,
        barRadius: 3,
        normalize: true,
        minPxPerSec: 50
      });

      // Initialize remote waveform
      remoteWavesurfer.current = WaveSurfer.create({
        container: remoteWaveformRef.current,
        waveColor: '#c5d1eb', // secondary color
        progressColor: '#c5d1eb', // secondary color
        height: 200,
        cursorWidth: 0,
        barWidth: 3,
        barGap: 4,
        barRadius: 3,
        normalize: true,
        minPxPerSec: 50
      });

      // Load demo audio data with error handling
      const loadAudio = async () => {
        try {
          await localWavesurfer.current?.load('/demo-audio.mp3');
          await remoteWavesurfer.current?.load('/demo-audio.mp3');
          console.log('Audio loaded successfully');
        } catch (error) {
          console.error('Error loading audio:', error);
          toast({
            title: "Error loading audio",
            description: "Please check if the audio file exists",
            variant: "destructive",
          });
        }
      };

      loadAudio();
    }

    return () => {
      localWavesurfer.current?.destroy();
      remoteWavesurfer.current?.destroy();
      if (mediaStream.current) {
        mediaStream.current.getTracks().forEach(track => track.stop());
      }
      if (audioContext.current) {
        audioContext.current.close();
      }
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
    setIsRecording(false);
    
    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach(track => track.stop());
    }
    
    toast({
      title: "Call ended",
      description: "Connection closed",
    });
  };

  const handleMicClick = async () => {
    try {
      if (!isRecording) {
        // Initialize audio context and analyzer
        audioContext.current = new AudioContext();
        analyser.current = audioContext.current.createAnalyser();
        analyser.current.fftSize = 256;
        
        // Get microphone stream
        mediaStream.current = await navigator.mediaDevices.getUserMedia({ audio: true });
        const source = audioContext.current.createMediaStreamSource(mediaStream.current);
        source.connect(analyser.current);
        
        // Start volume monitoring
        const dataArray = new Uint8Array(analyser.current.frequencyBinCount);
        const updateVolume = () => {
          if (analyser.current && isRecording) {
            analyser.current.getByteFrequencyData(dataArray);
            const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
            setMicVolume(Math.round(average));
            requestAnimationFrame(updateVolume);
          }
        };
        
        setIsRecording(true);
        updateVolume();
      } else {
        setIsRecording(false);
        if (mediaStream.current) {
          mediaStream.current.getTracks().forEach(track => track.stop());
        }
        setMicVolume(0);
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
          <div ref={remoteWaveformRef} className="w-full h-[200px]" />
        </div>
        
        {/* Local audio waveform (User) */}
        <div className="p-6 rounded-xl bg-zinc-800/50 backdrop-blur-sm w-full">
          <div ref={localWaveformRef} className="w-full h-[200px]" />
        </div>
        
        {/* Volume debug display */}
        <div className="text-center text-white/70 text-sm">
          Microphone Volume: {micVolume}
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