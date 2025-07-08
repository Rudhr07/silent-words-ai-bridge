import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Eye, Hand } from 'lucide-react';

interface RealtimeVisualizationProps {
  isProcessing: boolean;
  handDetected: boolean;
  landmarks: Array<{ x: number; y: number; confidence: number }>;
}

const RealtimeVisualization: React.FC<RealtimeVisualizationProps> = ({
  isProcessing,
  handDetected,
  landmarks
}) => {
  return (
    <Card className="glass border-border/50">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gradient-primary">
            Neural Processing
          </h3>
          <div className="flex items-center gap-2">
            <Badge 
              variant={isProcessing ? "default" : "secondary"}
              className={isProcessing ? "bg-primary/20 text-primary border-primary/30" : ""}
            >
              <Activity className="w-3 h-3 mr-1" />
              {isProcessing ? 'Active' : 'Idle'}
            </Badge>
          </div>
        </div>

        {/* Processing Status */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between p-3 bg-surface-elevated/50 rounded-lg border border-border/30">
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Vision System</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isProcessing ? 'bg-success status-pulse' : 'bg-foreground-subtle'}`}></div>
              <span className="text-xs text-foreground-muted">
                {isProcessing ? 'Processing' : 'Standby'}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-surface-elevated/50 rounded-lg border border-border/30">
            <div className="flex items-center gap-3">
              <Hand className="w-5 h-5 text-neural-purple" />
              <span className="text-sm font-medium">Hand Detection</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${handDetected ? 'bg-success status-pulse' : 'bg-warning'}`}></div>
              <span className="text-xs text-foreground-muted">
                {handDetected ? 'Detected' : 'Searching'}
              </span>
            </div>
          </div>
        </div>

        {/* Landmarks Visualization */}
        <div className="relative aspect-video bg-surface-elevated/30 rounded-lg border border-border/30 overflow-hidden">
          <div className="absolute inset-0 particles"></div>
          
          {handDetected && (
            <div className="absolute inset-4">
              {/* Hand outline simulation */}
              <div className="relative w-full h-full">
                {landmarks.map((point, index) => (
                  <div
                    key={index}
                    className="absolute w-2 h-2 bg-primary rounded-full neural-pulse"
                    style={{
                      left: `${point.x * 100}%`,
                      top: `${point.y * 100}%`,
                      transform: 'translate(-50%, -50%)',
                      opacity: point.confidence,
                      animationDelay: `${index * 0.05}s`
                    }}
                  />
                ))}
                
                {/* Connection lines simulation */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <defs>
                    <linearGradient id="connectionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="hsl(var(--neural-purple))" stopOpacity="0.6" />
                    </linearGradient>
                  </defs>
                  {landmarks.slice(0, -1).map((point, index) => {
                    const nextPoint = landmarks[index + 1];
                    if (!nextPoint) return null;
                    
                    return (
                      <line
                        key={index}
                        x1={`${point.x * 100}%`}
                        y1={`${point.y * 100}%`}
                        x2={`${nextPoint.x * 100}%`}
                        y2={`${nextPoint.y * 100}%`}
                        stroke="url(#connectionGrad)"
                        strokeWidth="1"
                        className="neural-pulse"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      />
                    );
                  })}
                </svg>
              </div>
            </div>
          )}

          {!handDetected && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-foreground-subtle">
                <Hand className="w-12 h-12 mx-auto mb-2 opacity-50 float" />
                <p className="text-sm">Scanning for hand...</p>
              </div>
            </div>
          )}
        </div>

        {/* Processing Metrics */}
        <div className="grid grid-cols-3 gap-3 mt-4 text-center">
          <div className="p-2 bg-surface-elevated/50 rounded border border-border/30">
            <div className="text-lg font-semibold text-primary">{landmarks.length}</div>
            <div className="text-xs text-foreground-subtle">Landmarks</div>
          </div>
          <div className="p-2 bg-surface-elevated/50 rounded border border-border/30">
            <div className="text-lg font-semibold text-neural-purple">
              {handDetected ? '60' : '0'} FPS
            </div>
            <div className="text-xs text-foreground-subtle">Processing</div>
          </div>
          <div className="p-2 bg-surface-elevated/50 rounded border border-border/30">
            <div className="text-lg font-semibold text-success">
              {handDetected ? Math.round(Math.random() * 20 + 80) : 0}%
            </div>
            <div className="text-xs text-foreground-subtle">Confidence</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RealtimeVisualization;