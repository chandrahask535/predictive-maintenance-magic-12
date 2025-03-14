
import React from 'react';
import { Equipment } from '@/utils/mockData';
import { calculateHealthIndex, formatDaysUntilFailure, getBestPrediction } from '@/utils/dataProcessor';
import { CheckCircle, AlertTriangle, Activity, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface EquipmentCardProps {
  equipment: Equipment;
  onClick: (equipment: Equipment) => void;
}

const EquipmentCard: React.FC<EquipmentCardProps> = ({ equipment, onClick }) => {
  const healthIndex = calculateHealthIndex(equipment);
  const { model, days } = getBestPrediction(equipment);
  
  // Status indicator
  const getStatusIcon = () => {
    switch (equipment.status) {
      case 'normal':
        return <CheckCircle className="text-green-500" size={16} />;
      case 'warning':
        return <AlertTriangle className="text-amber-500" size={16} />;
      case 'critical':
        return <AlertTriangle className="text-red-500" size={16} />;
      case 'maintenance':
        return <Activity className="text-blue-500" size={16} />;
      default:
        return null;
    }
  };
  
  // Health color
  const getHealthColor = () => {
    if (healthIndex >= 80) return 'text-green-500';
    if (healthIndex >= 60) return 'text-amber-500';
    if (healthIndex >= 40) return 'text-orange-500';
    return 'text-red-500';
  };
  
  // Progress color
  const getProgressColor = () => {
    if (healthIndex >= 80) return 'bg-green-500';
    if (healthIndex >= 60) return 'bg-amber-500';
    if (healthIndex >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };
  
  return (
    <Card 
      className="glass-card hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden h-full flex flex-col animate-scale-in" 
      onClick={() => onClick(equipment)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <CardTitle className="text-base font-medium">{equipment.name}</CardTitle>
          </div>
          <div className={`text-sm font-medium ${getHealthColor()}`}>
            {healthIndex}%
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow justify-between">
        <div className="space-y-4">
          <Progress value={healthIndex} className="h-1.5" indicatorClassName={getProgressColor()} />
          
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="space-y-1">
              <p className="text-muted-foreground">Type</p>
              <p className="font-medium truncate">{equipment.type}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Last Maintained</p>
              <p className="font-medium">{new Date(equipment.lastMaintenance).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
          <div className="flex items-center gap-1">
            <Clock size={14} className="text-muted-foreground" />
            <span>Prediction ({model})</span>
          </div>
          <span className="font-medium">
            {formatDaysUntilFailure(days)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default EquipmentCard;
