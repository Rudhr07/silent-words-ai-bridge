
import React from 'react';
import { Card } from '@/components/ui/card';

interface GestureOutputProps {
  currentGesture: string;
  isSpeaking: boolean;
}

const GestureOutput: React.FC<GestureOutputProps> = ({ currentGesture, isSpeaking }) => {
  return (
    <Card className="bg-gray-800/50 border-cyan-500/30 backdrop-blur-sm">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-cyan-300 mb-4">
          Detected Gesture
        </h3>
        
        <div className="text-center py-8">
          {currentGesture ? (
            <div className="space-y-4">
              <div className="text-6xl font-bold text-white bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent animate-pulse">
                {currentGesture}
              </div>
              
              {isSpeaking && (
                <div className="flex items-center justify-center gap-2 text-emerald-400">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce animation-delay-100"></div>
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce animation-delay-200"></div>
                  <span className="ml-2 text-sm">Speaking...</span>
                </div>
              )}
            </div>
          ) : (
            <div className="text-gray-500">
              <div className="text-4xl mb-4">👋</div>
              <p>Waiting for gesture...</p>
              <p className="text-sm text-gray-600 mt-2">Start the camera and show your hand</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default GestureOutput;
