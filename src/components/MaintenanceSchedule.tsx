
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MaintenanceTask } from '@/utils/mockData';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';

interface MaintenanceScheduleProps {
  tasks: MaintenanceTask[];
}

const MaintenanceSchedule: React.FC<MaintenanceScheduleProps> = ({ tasks }) => {
  // Sort tasks by date and priority
  const sortedTasks = [...tasks].sort((a, b) => {
    // First sort by date
    const dateA = new Date(a.scheduledDate).getTime();
    const dateB = new Date(b.scheduledDate).getTime();
    
    if (dateA !== dateB) return dateA - dateB;
    
    // Then by priority
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
  
  // Group tasks by week
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const thisWeekTasks = sortedTasks.filter(task => {
    const taskDate = new Date(task.scheduledDate);
    const diffDays = Math.floor((taskDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays < 7;
  });
  
  const nextWeekTasks = sortedTasks.filter(task => {
    const taskDate = new Date(task.scheduledDate);
    const diffDays = Math.floor((taskDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays >= 7 && diffDays < 14;
  });
  
  const laterTasks = sortedTasks.filter(task => {
    const taskDate = new Date(task.scheduledDate);
    const diffDays = Math.floor((taskDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays >= 14;
  });
  
  // Helper to render priority badge
  const renderPriorityBadge = (priority: MaintenanceTask['priority']) => {
    switch (priority) {
      case 'critical':
        return <Badge variant="destructive" className="text-xs">Critical</Badge>;
      case 'high':
        return <Badge variant="outline" className="text-xs bg-orange-500/10 text-orange-500 border-orange-500/20">High</Badge>;
      case 'medium':
        return <Badge variant="outline" className="text-xs bg-amber-500/10 text-amber-500 border-amber-500/20">Medium</Badge>;
      case 'low':
        return <Badge variant="outline" className="text-xs bg-green-500/10 text-green-500 border-green-500/20">Low</Badge>;
      default:
        return null;
    }
  };
  
  // Helper to render task card
  const renderTask = (task: MaintenanceTask) => {
    const formattedDate = new Date(task.scheduledDate).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
    
    return (
      <div 
        key={task.id} 
        className="bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/20 dark:border-white/10 p-3 rounded-lg flex items-center justify-between gap-2 animate-fade-in shadow-sm hover:shadow-md transition-all duration-300"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {renderPriorityBadge(task.priority)}
            <h4 className="font-medium text-sm truncate">{task.equipmentId}</h4>
          </div>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{task.description}</p>
        </div>
        
        <div className="flex flex-col items-end min-w-fit">
          <div className="flex items-center gap-1">
            <Clock size={12} className="text-muted-foreground" />
            <span className="text-xs font-medium">{formattedDate}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{task.assignedTo}</p>
        </div>
      </div>
    );
  };
  
  return (
    <Card className="backdrop-blur-sm bg-white/10 dark:bg-black/30 border border-white/20 dark:border-white/10 h-full animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Maintenance Schedule</CardTitle>
          <div className="flex items-center gap-1">
            <AlertTriangle size={14} className="text-amber-500" />
            <span className="text-xs">{tasks.length} tasks scheduled</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="overflow-auto" style={{ maxHeight: 'calc(100vh - 250px)' }}>
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-6">
            <CheckCircle className="text-green-500 mb-2" size={24} />
            <p className="text-muted-foreground">No maintenance tasks scheduled</p>
          </div>
        ) : (
          <div className="space-y-6">
            {thisWeekTasks.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-2 text-primary">This Week</h3>
                <div className="space-y-2">
                  {thisWeekTasks.map(renderTask)}
                </div>
              </div>
            )}
            
            {nextWeekTasks.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-2 text-primary">Next Week</h3>
                <div className="space-y-2">
                  {nextWeekTasks.map(renderTask)}
                </div>
              </div>
            )}
            
            {laterTasks.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-2 text-primary">Later</h3>
                <div className="space-y-2">
                  {laterTasks.map(renderTask)}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MaintenanceSchedule;
