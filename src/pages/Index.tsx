
import React, { useState, useEffect, useRef } from 'react';
import { Camera, Mic, MicOff, Play, Square, Brain, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import CameraFeed from '@/components/CameraFeed';
import GestureOutput from '@/components/GestureOutput';
import ModelInfo from '@/components/ModelInfo';
import GestureHistory from '@/components/GestureHistory';
import StatsPanel from '@/components/StatsPanel';
import AdvancedControls from '@/components/AdvancedControls';
import RealtimeVisualization from '@/components/RealtimeVisualization';

const Index = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [currentGesture, setCurrentGesture] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [gestureHistory, setGestureHistory] = useState<string[]>([]);
  const [modelAccuracy, setModelAccuracy] = useState(94.2);
  const [isConnected, setIsConnected] = useState(false);
  
  // New enhanced state
  const [sensitivity, setSensitivity] = useState(75);
  const [volume, setVolume] = useState(80);
  const [debugMode, setDebugMode] = useState(false);
  const [autoCalibrate, setAutoCalibrate] = useState(true);
  const [gesturesDetected, setGesturesDetected] = useState(42);
  const [sessionTime, setSessionTime] = useState('12:34');
  const [confidence, setConfidence] = useState(89);
  const [landmarks, setLandmarks] = useState<Array<{ x: number; y: number; confidence: number }>>([]);

  // Simulate gesture recognition
  const gestures = ['A', 'B', 'C', 'Hello', 'Thank You', 'Yes', 'No', 'Please', 'Sorry'];
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    let landmarkInterval: NodeJS.Timeout;
    
    if (isCameraActive) {
      setIsConnected(true);
      
      // Generate landmarks for visualization
      landmarkInterval = setInterval(() => {
        const newLandmarks = Array.from({ length: 21 }, (_, i) => ({
          x: 0.3 + Math.random() * 0.4,
          y: 0.2 + Math.random() * 0.6,
          confidence: 0.7 + Math.random() * 0.3
        }));
        setLandmarks(newLandmarks);
      }, 100);
      
      interval = setInterval(() => {
        const randomGesture = gestures[Math.floor(Math.random() * gestures.length)];
        const shouldDetect = Math.random() > (1 - sensitivity / 100); // Use sensitivity setting
        
        if (shouldDetect) {
          setCurrentGesture(randomGesture);
          setGestureHistory(prev => [randomGesture, ...prev.slice(0, 4)]);
          setGesturesDetected(prev => prev + 1);
          setConfidence(Math.round(70 + Math.random() * 30));
          
          // Auto-speak if enabled
          if (speechEnabled && randomGesture) {
            speakText(randomGesture);
          }
        }
      }, 2000);
    } else {
      setIsConnected(false);
      setLandmarks([]);
    }
    
    return () => {
      if (interval) clearInterval(interval);
      if (landmarkInterval) clearInterval(landmarkInterval);
    };
  }, [isCameraActive, speechEnabled, sensitivity]);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window && volume > 0) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.volume = volume / 100;
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
    setGesturesDetected(0);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Enhanced Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="relative">
            <h1 className="text-6xl font-bold text-gradient-primary mb-4 float">
              Hands2Words
            </h1>
            <div className="absolute -top-2 -right-2">
              <Brain className="w-8 h-8 text-neural-purple neural-pulse" />
            </div>
          </div>
          <p className="text-2xl text-gradient-neural mb-3 font-medium">Bridging Silence with AI</p>
          <p className="text-foreground-muted text-lg max-w-2xl mx-auto">
            Advanced neural network powered sign language recognition with real-time speech synthesis
          </p>
          
          {/* Enhanced Status Indicator */}
          <div className="flex justify-center items-center gap-6 mt-8">
            <div className="flex items-center gap-3 px-4 py-2 bg-surface/50 rounded-full border border-border/30">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-success status-pulse' : 'bg-error'}`}></div>
              <span className="text-sm font-medium">
                {isConnected ? 'Neural Network Active' : 'System Standby'}
              </span>
            </div>
            
            <div className="flex items-center gap-3 px-4 py-2 bg-surface/50 rounded-full border border-border/30">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">
                AI Confidence: {confidence}%
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced Main Interface */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Left Panel: Camera & Controls */}
          <div className="xl:col-span-4 space-y-6">
            <Card className="glass border-border/50">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gradient-primary mb-6 flex items-center gap-3">
                  <Camera className="w-6 h-6" />
                  Neural Vision System
                </h3>
                
                <CameraFeed isActive={isCameraActive} />
                
                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={toggleCamera}
                    className={`flex-1 ${
                      isCameraActive 
                        ? 'bg-error hover:bg-error/80 border-error/30' 
                        : 'bg-primary hover:bg-primary/80 border-primary/30 btn-glow'
                    } transition-all duration-300 border`}
                  >
                    {isCameraActive ? (
                      <>
                        <Square className="w-5 h-5 mr-2" />
                        Deactivate
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 mr-2" />
                        Activate Neural Vision
                      </>
                    )}
                  </Button>
                  
                  <Button
                    onClick={clearOutput}
                    variant="outline"
                    className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50"
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </Card>
            
            {/* Advanced Controls */}
            <AdvancedControls
              sensitivity={sensitivity}
              onSensitivityChange={setSensitivity}
              volume={volume}
              onVolumeChange={setVolume}
              debugMode={debugMode}
              onDebugModeChange={setDebugMode}
              autoCalibrate={autoCalibrate}
              onAutoCalibrate={setAutoCalibrate}
            />
          </div>

          {/* Center Panel: Main Output */}
          <div className="xl:col-span-5 space-y-6">
            {/* Enhanced Gesture Recognition Output */}
            <GestureOutput 
              currentGesture={currentGesture}
              isSpeaking={isSpeaking}
            />

            {/* Real-time Visualization */}
            <RealtimeVisualization
              isProcessing={isCameraActive}
              handDetected={landmarks.length > 0}
              landmarks={landmarks}
            />

            {/* Enhanced TTS Controls */}
            <Card className="glass border-border/50">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gradient-neural mb-6 flex items-center gap-3">
                  {speechEnabled ? (
                    <Mic className="w-6 h-6" />
                  ) : (
                    <MicOff className="w-6 h-6" />
                  )}
                  Neural Speech Synthesis
                </h3>
                
                <div className="flex items-center justify-between mb-6 p-4 bg-surface-elevated/50 rounded-lg border border-border/30">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">Voice Output</span>
                    <Badge variant={speechEnabled ? "default" : "secondary"} className={speechEnabled ? "bg-primary/20 text-primary border-primary/30" : ""}>
                      {speechEnabled ? 'Active' : 'Disabled'}
                    </Badge>
                  </div>
                  <Switch
                    checked={speechEnabled}
                    onCheckedChange={setSpeechEnabled}
                  />
                </div>
                
                <div className="p-4 bg-surface-elevated/50 rounded-lg border border-border/30">
                  {isSpeaking ? (
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-success rounded-full neural-pulse"></div>
                        <div className="w-2 h-2 bg-success rounded-full neural-pulse animation-delay-100"></div>
                        <div className="w-2 h-2 bg-success rounded-full neural-pulse animation-delay-200"></div>
                      </div>
                      <span className="text-success font-medium">
                        Synthesizing: "{currentGesture}"
                      </span>
                    </div>
                  ) : speechEnabled ? (
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-primary font-medium">Voice Engine Ready</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-foreground-subtle rounded-full"></div>
                      <span className="text-foreground-subtle">Voice Engine Disabled</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Right Panel: Analytics & History */}
          <div className="xl:col-span-3 space-y-6">
            {/* Performance Stats */}
            <StatsPanel
              accuracy={modelAccuracy}
              gesturesDetected={gesturesDetected}
              sessionTime={sessionTime}
              confidence={confidence}
            />

            {/* Gesture History */}
            <GestureHistory history={gestureHistory} />
          </div>
        </div>

        {/* Bottom Panel: Model Info */}
        <div className="mt-8">
          <ModelInfo accuracy={modelAccuracy} />
        </div>

        {/* Enhanced Footer */}
        <div className="mt-16 text-center border-t border-border/30 pt-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Brain className="w-8 h-8 text-neural-purple" />
              <span className="text-2xl font-bold text-gradient-primary">Hands2Words</span>
            </div>
            
            <p className="text-foreground-muted mb-6 text-lg">
              Developed by <span className="text-gradient-primary font-semibold">Rudhr Chauhan</span> & <span className="text-gradient-neural font-semibold">Allampally Abhinav</span>
            </p>
            
            <div className="flex items-center justify-center gap-8 text-sm text-foreground-subtle">
              <span>CHRIST University</span>
              <span>•</span>
              <span>Neural AI Research</span>
              <span>•</span>
              <span>Accessibility Innovation</span>
            </div>
            
            <div className="mt-8 p-4 bg-surface/30 rounded-lg border border-border/20">
              <p className="text-foreground-subtle text-sm">
                Empowering communication through advanced artificial intelligence and neural network technologies
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
