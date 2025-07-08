
import React, { useState, useEffect, useRef } from 'react';
import { Camera, Mic, MicOff, Play, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import CameraFeed from '@/components/CameraFeed';
import GestureOutput from '@/components/GestureOutput';
import ModelInfo from '@/components/ModelInfo';
import GestureHistory from '@/components/GestureHistory';

const Index = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [currentGesture, setCurrentGesture] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [gestureHistory, setGestureHistory] = useState<string[]>([]);
  const [modelAccuracy, setModelAccuracy] = useState(94.2);
  const [isConnected, setIsConnected] = useState(false);

  // Simulate gesture recognition
  const gestures = ['A', 'B', 'C', 'Hello', 'Thank You', 'Yes', 'No', 'Please', 'Sorry'];
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCameraActive) {
      setIsConnected(true);
      interval = setInterval(() => {
        const randomGesture = gestures[Math.floor(Math.random() * gestures.length)];
        if (Math.random() > 0.7) { // 30% chance of detecting a gesture
          setCurrentGesture(randomGesture);
          setGestureHistory(prev => [randomGesture, ...prev.slice(0, 4)]);
          
          // Auto-speak if enabled
          if (speechEnabled && randomGesture) {
            speakText(randomGesture);
          }
        }
      }, 2000);
    } else {
      setIsConnected(false);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCameraActive, speechEnabled]);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  };

  const toggleCamera = () => {
    setIsCameraActive(!isCameraActive);
    if (!isCameraActive) {
      setCurrentGesture('');
    }
  };

  const clearOutput = () => {
    setCurrentGesture('');
    setGestureHistory([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-4">
            Hands2Words
          </h1>
          <p className="text-xl text-cyan-300 mb-2">Bridging Silence with AI</p>
          <p className="text-gray-400">Real-time sign language to speech translator powered by AI</p>
          
          {/* Status Indicator */}
          <div className="flex justify-center items-center gap-2 mt-4">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
            <span className="text-sm text-gray-300">
              {isConnected ? 'Camera Connected' : 'Camera Disconnected'}
            </span>
          </div>
        </div>

        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel: Camera Feed */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-800/50 border-cyan-500/30 backdrop-blur-sm">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-cyan-300 mb-4 flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Live Camera Feed
                </h3>
                
                <CameraFeed isActive={isCameraActive} />
                
                <div className="flex gap-3 mt-4">
                  <Button
                    onClick={toggleCamera}
                    className={`flex-1 ${
                      isCameraActive 
                        ? 'bg-red-600 hover:bg-red-700' 
                        : 'bg-cyan-600 hover:bg-cyan-700'
                    } transition-all duration-300`}
                  >
                    {isCameraActive ? (
                      <>
                        <Square className="w-4 h-4 mr-2" />
                        Stop Camera
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Start Camera
                      </>
                    )}
                  </Button>
                  
                  <Button
                    onClick={clearOutput}
                    variant="outline"
                    className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10"
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Panel: Output & Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gesture Recognition Output */}
            <GestureOutput 
              currentGesture={currentGesture}
              isSpeaking={isSpeaking}
            />

            {/* TTS Controls */}
            <Card className="bg-gray-800/50 border-emerald-500/30 backdrop-blur-sm">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-emerald-300 mb-4 flex items-center gap-2">
                  {speechEnabled ? (
                    <Mic className="w-5 h-5" />
                  ) : (
                    <MicOff className="w-5 h-5" />
                  )}
                  Text-to-Speech
                </h3>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-300">Speak Output</span>
                  <Switch
                    checked={speechEnabled}
                    onCheckedChange={setSpeechEnabled}
                    className="data-[state=checked]:bg-emerald-500"
                  />
                </div>
                
                <div className="text-sm text-gray-400">
                  {isSpeaking ? (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                      Speaking: "{currentGesture}"
                    </div>
                  ) : speechEnabled ? (
                    '✔️ TTS Ready'
                  ) : (
                    '❌ TTS Disabled'
                  )}
                </div>
              </div>
            </Card>

            {/* Gesture History */}
            <GestureHistory history={gestureHistory} />
          </div>
        </div>

        {/* Bottom Panel: Model Info */}
        <div className="mt-8">
          <ModelInfo accuracy={modelAccuracy} />
        </div>

        {/* Footer */}
        <div className="mt-12 text-center border-t border-gray-700 pt-8">
          <p className="text-gray-400 mb-4">
            Developed by <span className="text-cyan-300 font-semibold">Rudhr Chauhan</span> & <span className="text-cyan-300 font-semibold">Allampally Abhinav</span>
          </p>
          <p className="text-sm text-gray-500">CHRIST University | Bridging Communication Barriers with AI</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
