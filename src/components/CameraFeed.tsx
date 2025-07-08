
import React from 'react';
import { Camera, Maximize2, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CameraFeedProps {
  isActive: boolean;
}

const CameraFeed: React.FC<CameraFeedProps> = ({ isActive }) => {
  const generateLandmarks = () => {
    return Array.from({ length: 21 }, (_, i) => ({
      x: 0.3 + Math.random() * 0.4,
      y: 0.2 + Math.random() * 0.6,
      confidence: 0.7 + Math.random() * 0.3
    }));
  };

  return (
    <div className="relative aspect-video bg-surface-elevated rounded-xl overflow-hidden border border-border/50 card-enhanced">
      {/* Header Controls */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
        <Badge 
          variant={isActive ? "default" : "secondary"}
          className={isActive ? "bg-success/20 text-success border-success/30" : "bg-surface/50"}
        >
          <div className={`w-2 h-2 rounded-full mr-2 ${isActive ? 'bg-success status-pulse' : 'bg-foreground-subtle'}`}></div>
          {isActive ? 'LIVE' : 'OFFLINE'}
        </Badge>
        
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-surface/50 hover:bg-surface">
            <Settings className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-surface/50 hover:bg-surface">
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {isActive ? (
        <div className="w-full h-full bg-gradient-to-br from-surface to-surface-elevated flex items-center justify-center relative particles">
          {/* Enhanced hand tracking overlay */}
          <div className="absolute inset-6 border-2 border-primary/40 rounded-lg glow-primary">
            <div className="absolute top-2 left-2 text-xs font-medium text-primary bg-surface/80 px-3 py-1 rounded-full backdrop-blur-sm border border-primary/30">
              Hand Recognition Active
            </div>
            
            {/* Confidence indicator */}
            <div className="absolute top-2 right-2 text-xs font-medium text-success bg-surface/80 px-3 py-1 rounded-full backdrop-blur-sm border border-success/30">
              97% Confidence
            </div>
          </div>
          
          {/* Advanced hand landmark simulation */}
          <div className="relative">
            {generateLandmarks().map((point, index) => (
              <div
                key={index}
                className="absolute w-3 h-3 bg-primary/80 rounded-full neural-pulse"
                style={{
                  left: `${point.x * 300}px`,
                  top: `${point.y * 200}px`,
                  transform: 'translate(-50%, -50%)',
                  animationDelay: `${index * 0.05}s`,
                  opacity: point.confidence
                }}
              />
            ))}
            
            {/* Connection grid */}
            <div className="absolute inset-0 opacity-30">
              <svg width="300" height="200" className="overflow-visible">
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.3"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
          </div>
          
          <div className="text-center text-primary">
            <Camera className="w-20 h-20 mx-auto mb-3 opacity-60 float" />
            <p className="text-base font-medium">Neural Vision Active</p>
            <p className="text-sm text-foreground-muted mt-1">AI-powered hand recognition</p>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-surface to-surface-elevated">
          <div className="text-center text-foreground-muted">
            <Camera className="w-20 h-20 mx-auto mb-3 opacity-40" />
            <p className="text-base font-medium">Camera Standby</p>
            <p className="text-sm text-foreground-subtle mt-1">Activate to begin recognition</p>
          </div>
        </div>
      )}
      
      {/* Bottom status bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-surface/80 backdrop-blur-sm border-t border-border/30 p-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-foreground-muted">Resolution: 1920x1080</span>
          <span className="text-foreground-muted">FPS: {isActive ? '60' : '0'}</span>
          <span className="text-foreground-muted">Latency: {isActive ? '12ms' : 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

export default CameraFeed;
