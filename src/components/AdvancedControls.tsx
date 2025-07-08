import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Volume2, 
  VolumeX, 
  Lightbulb, 
  Gauge, 
  Brain,
  RotateCcw,
  Save
} from 'lucide-react';

interface AdvancedControlsProps {
  sensitivity: number;
  onSensitivityChange: (value: number) => void;
  volume: number;
  onVolumeChange: (value: number) => void;
  debugMode: boolean;
  onDebugModeChange: (enabled: boolean) => void;
  autoCalibrate: boolean;
  onAutoCalibrate: (enabled: boolean) => void;
}

const AdvancedControls: React.FC<AdvancedControlsProps> = ({
  sensitivity,
  onSensitivityChange,
  volume,
  onVolumeChange,
  debugMode,
  onDebugModeChange,
  autoCalibrate,
  onAutoCalibrate
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <Card className="glass border-border/50">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gradient-neural">
            Advanced Controls
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="hover:bg-surface-elevated"
          >
            <Settings className="w-4 h-4 mr-2" />
            {showAdvanced ? 'Hide' : 'Show'}
          </Button>
        </div>

        {/* Quick Controls */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {volume > 0 ? (
                <Volume2 className="w-5 h-5 text-primary" />
              ) : (
                <VolumeX className="w-5 h-5 text-foreground-muted" />
              )}
              <span className="text-sm font-medium">Audio Volume</span>
            </div>
            <Badge variant="secondary" className="bg-surface/50">
              {volume}%
            </Badge>
          </div>
          <Slider
            value={[volume]}
            onValueChange={(value) => onVolumeChange(value[0])}
            max={100}
            step={5}
            className="w-full"
          />
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Gauge className="w-5 h-5 text-neural-purple" />
              <span className="text-sm font-medium">Detection Sensitivity</span>
            </div>
            <Badge variant="secondary" className="bg-surface/50">
              {sensitivity}%
            </Badge>
          </div>
          <Slider
            value={[sensitivity]}
            onValueChange={(value) => onSensitivityChange(value[0])}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        {/* Advanced Settings */}
        {showAdvanced && (
          <div className="space-y-6 pt-6 border-t border-border/30">
            <div className="flex items-center justify-between p-4 bg-surface-elevated/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Brain className="w-5 h-5 text-neural-orange" />
                <div>
                  <div className="text-sm font-medium">Debug Mode</div>
                  <div className="text-xs text-foreground-subtle">
                    Show detection landmarks
                  </div>
                </div>
              </div>
              <Switch
                checked={debugMode}
                onCheckedChange={onDebugModeChange}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-surface-elevated/50 rounded-lg">
              <div className="flex items-center gap-3">
                <RotateCcw className="w-5 h-5 text-success" />
                <div>
                  <div className="text-sm font-medium">Auto Calibration</div>
                  <div className="text-xs text-foreground-subtle">
                    Adaptive learning enabled
                  </div>
                </div>
              </div>
              <Switch
                checked={autoCalibrate}
                onCheckedChange={onAutoCalibrate}
              />
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 border-primary/30 hover:border-primary/50"
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                Calibrate
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 border-success/30 hover:border-success/50"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Profile
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default AdvancedControls;