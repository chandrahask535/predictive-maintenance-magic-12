
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Equipment } from '@/utils/mockData';
import { formatDaysUntilFailure } from '@/utils/dataProcessor';
import { CheckCircle, AlertTriangle, Clock } from 'lucide-react';

interface PredictionTimelineProps {
  equipment: Equipment;
}

const PredictionTimeline: React.FC<PredictionTimelineProps> = ({ equipment }) => {
  const { randomForest, xgBoost, lstm } = equipment.predictions;
  
  // Sort models by predicted days
  const models = [
    { name: 'Random Forest', days: randomForest },
    { name: 'XGBoost', days: xgBoost },
    { name: 'LSTM', days: lstm },
  ].sort((a, b) => a.days - b.days);

  // Helper to determine status based on days
  const getStatus = (days: number) => {
    if (days < 7) return 'critical';
    if (days < 30) return 'warning';
    return 'normal';
  };

  // Helper to render status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal':
        return <CheckCircle className="text-green-500" size={16} />;
      case 'warning':
        return <AlertTriangle className="text-amber-500" size={16} />;
      case 'critical':
        return <AlertTriangle className="text-red-500" size={16} />;
      default:
        return null;
    }
  };

  // Generate timeline items with the most critical first
  const timelineItems = models.map(model => ({
    model: model.name,
    days: model.days,
    status: getStatus(model.days),
    formattedTime: formatDaysUntilFailure(model.days),
  }));

  return (
    <Card className="glass-card h-full animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Failure Prediction Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-muted" />
          
          {/* Timeline items */}
          <div className="space-y-6 ml-12 relative">
            {timelineItems.map((item, index) => (
              <div 
                key={item.model} 
                className="relative animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Timeline dot */}
                <div className="absolute -left-[3.25rem] mt-1.5 flex items-center justify-center">
                  <div className={`
                    size-7 rounded-full flex items-center justify-center
                    ${item.status === 'critical' ? 'bg-red-500/10' : 
                      item.status === 'warning' ? 'bg-amber-500/10' : 'bg-green-500/10'}
                  `}>
                    {getStatusIcon(item.status)}
                  </div>
                </div>
                
                {/* Content */}
                <div className="glass-panel p-3 rounded-lg">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-sm">{item.model}</h3>
                    <div className="flex items-center gap-1">
                      <Clock size={12} className="text-muted-foreground" />
                      <span 
                        className={`text-xs font-medium
                          ${item.status === 'critical' ? 'text-red-500' : 
                            item.status === 'warning' ? 'text-amber-500' : 'text-green-500'}
                        `}
                      >
                        {item.formattedTime}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.status === 'critical' 
                      ? 'Immediate attention required' 
                      : item.status === 'warning'
                      ? 'Plan maintenance soon'
                      : 'Equipment operating normally'}
                  </p>
                  
                  {/* Progress indicator */}
                  <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full
                        ${item.status === 'critical' ? 'bg-red-500' : 
                          item.status === 'warning' ? 'bg-amber-500' : 'bg-green-500'}
                      `}
                      style={{ 
                        width: `${Math.min(100, Math.max(5, (item.days / 180) * 100))}%` 
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionTimeline;
