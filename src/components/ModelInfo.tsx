
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface ModelInfoProps {
  accuracy: number;
}

const ModelInfo: React.FC<ModelInfoProps> = ({ accuracy }) => {
  return (
    <Card className="bg-gray-800/50 border-purple-500/30 backdrop-blur-sm">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-purple-300 mb-6">
          AI Model Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Model Type */}
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">KNN</div>
            <p className="text-sm text-gray-400">Current Model</p>
            <Badge variant="outline" className="mt-2 border-purple-500/50 text-purple-300">
              Active
            </Badge>
          </div>
          
          {/* Accuracy */}
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-400 mb-2">{accuracy}%</div>
            <p className="text-sm text-gray-400 mb-2">Model Accuracy</p>
            <Progress value={accuracy} className="w-full h-2" />
          </div>
          
          {/* Features */}
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">42</div>
            <p className="text-sm text-gray-400">Hand Landmarks</p>
            <Badge variant="outline" className="mt-2 border-cyan-500/50 text-cyan-300">
              MediaPipe
            </Badge>
          </div>
        </div>
        
        {/* Additional Info */}
        <div className="mt-6 pt-6 border-t border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <p className="text-gray-400">Dataset Size</p>
              <p className="text-white font-semibold">2,500+</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400">Gestures</p>
              <p className="text-white font-semibold">26 A-Z</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400">Training Time</p>
              <p className="text-white font-semibold">~3min</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400">Response</p>
              <p className="text-white font-semibold">Real-time</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ModelInfo;
