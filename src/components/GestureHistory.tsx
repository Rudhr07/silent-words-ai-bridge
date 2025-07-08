
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface GestureHistoryProps {
  history: string[];
}

const GestureHistory: React.FC<GestureHistoryProps> = ({ history }) => {
  return (
    <Card className="bg-gray-800/50 border-emerald-500/30 backdrop-blur-sm">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-emerald-300 mb-4">
          Recent Gestures
        </h3>
        
        {history.length > 0 ? (
          <div className="space-y-2">
            {history.map((gesture, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg transition-all duration-300 hover:bg-gray-700/70"
              >
                <span className="text-white font-medium">{gesture}</span>
                <Badge 
                  variant="secondary" 
                  className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                >
                  #{history.length - index}
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            <p>No gestures detected yet</p>
            <p className="text-sm text-gray-600 mt-1">History will appear here as you use the app</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default GestureHistory;
