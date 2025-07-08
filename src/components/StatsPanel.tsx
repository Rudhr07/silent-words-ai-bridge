import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Zap, Target, Clock } from 'lucide-react';

interface StatsPanelProps {
  accuracy: number;
  gesturesDetected: number;
  sessionTime: string;
  confidence: number;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ 
  accuracy, 
  gesturesDetected, 
  sessionTime, 
  confidence 
}) => {
  const stats = [
    {
      icon: Target,
      label: 'Model Accuracy',
      value: `${accuracy}%`,
      progress: accuracy,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: Zap,
      label: 'Confidence',
      value: `${confidence}%`,
      progress: confidence,
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      icon: TrendingUp,
      label: 'Gestures Today',
      value: gesturesDetected.toString(),
      progress: Math.min((gesturesDetected / 100) * 100, 100),
      color: 'text-neural-purple',
      bgColor: 'bg-neural-purple/10'
    },
    {
      icon: Clock,
      label: 'Session Time',
      value: sessionTime,
      progress: 75,
      color: 'text-neural-orange',
      bgColor: 'bg-neural-orange/10'
    }
  ];

  return (
    <Card className="glass border-border/50">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gradient-primary mb-6">
          Performance Analytics
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className={`p-4 rounded-xl ${stat.bgColor} border border-border/30 hover:border-primary/30 transition-all duration-300 counter-animation`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-3">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <Badge variant="secondary" className="text-xs bg-surface/50">
                  {stat.label === 'Confidence' ? 'LIVE' : 'STATS'}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-foreground counter-animation">
                    {stat.value}
                  </span>
                </div>
                
                <div className="space-y-1">
                  <div className="text-xs text-foreground-subtle">
                    {stat.label}
                  </div>
                  <Progress 
                    value={stat.progress} 
                    className="h-1.5 bg-surface-elevated"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-surface-elevated/50 rounded-lg border border-border/30">
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground-muted">System Status</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full status-pulse"></div>
              <span className="text-success font-medium">Optimal</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StatsPanel;