
import React from 'react';
import { Equipment } from '@/utils/mockData';
import { calculateHealthIndex, formatDaysUntilFailure, getBestPrediction } from '@/utils/dataProcessor';
import { CheckCircle, AlertTriangle, Activity, Clock, ChevronRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface EquipmentCardProps {
  equipment: Equipment;
  onClick: (equipment: Equipment) => void;
  isSelected?: boolean;
}

const EquipmentCard: React.FC<EquipmentCardProps> = ({ equipment, onClick, isSelected = false }) => {
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
    if (healthIndex >= 80) return 'bg-gradient-to-r from-green-500 to-green-600';
    if (healthIndex >= 60) return 'bg-gradient-to-r from-amber-500 to-amber-600';
    if (healthIndex >= 40) return 'bg-gradient-to-r from-orange-500 to-orange-600';
    return 'bg-gradient-to-r from-red-500 to-red-600';
  };
  
  return (
    <Card 
      className={`
        transition-all duration-300 cursor-pointer overflow-hidden h-full flex flex-col
        bg-slate-900/40 backdrop-blur-md border-white/10 hover:border-blue-500/30
        ${isSelected ? 'shadow-md shadow-blue-500/20' : 'shadow-md shadow-black/10'} animate-pulse-border
      `}
      onClick={() => onClick(equipment)}
    >
      <CardHeader className="pb-2 relative">
        <div className="absolute -top-12 -right-12 size-24 bg-gradient-to-br from-blue-500/5 to-indigo-500/10 rounded-full blur-xl"></div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <CardTitle className="text-base font-medium">{equipment.name}</CardTitle>
          </div>
          <div className={`text-sm font-semibold ${getHealthColor()} bg-slate-800/50 px-2 py-0.5 rounded-full`}>
            {healthIndex}%
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow justify-between">
        <div className="space-y-4">
          <div className="relative h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <div 
              className={`absolute top-0 left-0 h-full ${getProgressColor()} rounded-full`} 
              style={{ width: `${healthIndex}%` }}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-xs mt-2">
            <div className="space-y-1 bg-slate-800/30 rounded-lg p-2 border border-white/5">
              <p className="text-blue-300/70">Type</p>
              <p className="font-medium truncate text-white">{equipment.type}</p>
            </div>
            <div className="space-y-1 bg-slate-800/30 rounded-lg p-2 border border-white/5">
              <p className="text-blue-300/70">Last Maintained</p>
              <p className="font-medium text-white">{new Date(equipment.lastMaintenance).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-blue-300/70">
            <Clock size={14} />
            <span>{model}</span>
          </div>
          <div className="flex items-center">
            <span className={`
              font-medium px-2 py-0.5 rounded-full text-xs
              ${days < 30 ? 'bg-red-500/10 text-red-400' : 
                days < 90 ? 'bg-amber-500/10 text-amber-400' : 
                'bg-green-500/10 text-green-400'}
            `}>
              {formatDaysUntilFailure(days)}
            </span>
            <ChevronRight size={14} className="ml-1 text-white/50" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EquipmentCard;
