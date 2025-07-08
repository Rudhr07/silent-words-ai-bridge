
import React from 'react';
import { Camera } from 'lucide-react';

interface CameraFeedProps {
  isActive: boolean;
}

const CameraFeed: React.FC<CameraFeedProps> = ({ isActive }) => {
  return (
    <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden border-2 border-cyan-500/30">
      {isActive ? (
        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
          {/* Simulated camera feed with hand tracking overlay */}
          <div className="absolute inset-4 border-2 border-cyan-400/50 rounded-lg animate-pulse">
            <div className="absolute top-2 left-2 text-xs text-cyan-300 bg-black/50 px-2 py-1 rounded">
              Hand Detected
            </div>
          </div>
          
          {/* Simulated hand landmark points */}
          <div className="relative">
            <div className="w-8 h-8 bg-cyan-400/80 rounded-full animate-ping absolute top-12 left-16"></div>
            <div className="w-6 h-6 bg-emerald-400/80 rounded-full animate-ping absolute top-20 left-24 animation-delay-200"></div>
            <div className="w-6 h-6 bg-cyan-400/80 rounded-full animate-ping absolute top-28 left-20 animation-delay-400"></div>
            <div className="w-5 h-5 bg-emerald-400/80 rounded-full animate-ping absolute top-16 left-32 animation-delay-600"></div>
          </div>
          
          <div className="text-center text-cyan-300">
            <Camera className="w-16 h-16 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Camera Active</p>
            <p className="text-xs text-gray-400 mt-1">Show your hand to start recognition</p>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-500">
          <div className="text-center">
            <Camera className="w-16 h-16 mx-auto mb-2" />
            <p className="text-sm">Camera Inactive</p>
            <p className="text-xs text-gray-600 mt-1">Click "Start Camera" to begin</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraFeed;
