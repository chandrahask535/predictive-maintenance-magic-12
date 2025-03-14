
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import EquipmentCard from '@/components/EquipmentCard';
import SensorDataChart from '@/components/SensorDataChart';
import ModelComparison from '@/components/ModelComparison';
import MaintenanceSchedule from '@/components/MaintenanceSchedule';
import PredictionTimeline from '@/components/PredictionTimeline';
import { mockEquipment, mockMaintenanceTasks } from '@/utils/mockData';
import { Equipment } from '@/utils/mockData';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, ChevronRight, Activity, Database, Clock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment>(mockEquipment[0]);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      {showIntro && (
        <div className="fixed inset-0 z-50 bg-slate-900 flex items-center justify-center animate-fade-out" style={{animationDelay: '1s', animationDuration: '1s'}}>
          <div className="flex flex-col items-center">
            <div className="size-20 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center shadow-lg shadow-blue-500/20 mb-4 animate-pulse">
              <Activity size={40} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-100">
              Extion Infotech
            </h1>
            <p className="text-blue-300/70 mt-2">Predictive Maintenance Platform</p>
          </div>
        </div>
      )}
      
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <Header />
        
        <div className="mb-8 animate-fade-in animate-delay-100">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-3">
            <div>
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-indigo-200">
                Equipment Dashboard
              </h2>
              <p className="text-blue-300/70 text-sm flex items-center gap-1 mt-1">
                <Database size={14} />
                <span>NASA Turbofan Engine Degradation Dataset</span>
                <Badge variant="outline" className="ml-2 bg-blue-950/50 text-blue-300 border-blue-800/50 text-xs">
                  Python ML Pipeline
                </Badge>
              </p>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-blue-300/70">
              <Clock size={14} />
              <span>Last updated: {new Date().toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        {/* Equipment Grid with improved styling */}
        <div className="data-grid mb-8">
          {mockEquipment.slice(0, 4).map((equipment, index) => (
            <div 
              key={equipment.id} 
              className={`animate-fade-in ${selectedEquipment.id === equipment.id ? 'ring-2 ring-blue-500/50 shadow-lg shadow-blue-500/10' : ''}`} 
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <EquipmentCard 
                equipment={equipment} 
                onClick={setSelectedEquipment}
                isSelected={selectedEquipment.id === equipment.id}
              />
            </div>
          ))}
        </div>
        
        {/* Selected Equipment Details with improved styling */}
        <div className="mb-6 animate-fade-in animate-delay-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-indigo-200 flex items-center gap-2">
              <span>{selectedEquipment.name} Analysis</span>
              <Badge 
                className={`
                  ${selectedEquipment.status === 'normal' ? 'success-alert' : 
                    selectedEquipment.status === 'warning' ? 'warning-alert' : 'critical-alert'}
                `}
              >
                {selectedEquipment.status.charAt(0).toUpperCase() + selectedEquipment.status.slice(1)}
              </Badge>
            </h3>
            <p className="text-blue-400/70 text-sm flex items-center gap-1">
              <ArrowUpRight size={14} />
              <span>Analyzing sensor data and failure patterns</span>
            </p>
          </div>
        </div>
        
        {/* Tabs for different views */}
        <Tabs defaultValue="dashboard" className="mb-8">
          <TabsList className="bg-slate-800/50 border border-white/10 p-1">
            <TabsTrigger value="dashboard" className="data-tab">Dashboard</TabsTrigger>
            <TabsTrigger value="detailed" className="data-tab">Detailed Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="pt-6">
            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Left Column - Sensor Data */}
              <div className="col-span-1 lg:col-span-2 space-y-6">
                <SensorDataChart equipment={selectedEquipment} />
                <ModelComparison equipment={selectedEquipment} />
              </div>
              
              {/* Right Column - Timeline & Schedule */}
              <div className="col-span-1 space-y-6">
                <PredictionTimeline equipment={selectedEquipment} />
                <MaintenanceSchedule tasks={mockMaintenanceTasks.filter(task => 
                  task.equipmentId === selectedEquipment.id || 
                  mockMaintenanceTasks.length < 3 // If too few tasks for this equipment, show all
                )} />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="detailed" className="pt-6">
            <div className="glass-panel p-8 rounded-xl flex flex-col items-center justify-center min-h-[400px]">
              <h4 className="text-xl font-semibold mb-4">Detailed Analysis Coming Soon</h4>
              <p className="text-muted-foreground max-w-md text-center mb-4">
                Our data science team is working on more detailed visualizations and insights for this equipment.
              </p>
              <Badge variant="outline" className="bg-blue-950/50 text-blue-300 border-blue-800/50">
                Python + R Analytics Module
              </Badge>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Additional Equipment Grid with improved styling */}
        <div className="mb-6 animate-fade-in animate-delay-400">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-indigo-200">
              Additional Equipment
            </h3>
            <span className="text-sm text-blue-300/70 cursor-pointer hover:text-blue-200 transition-colors flex items-center">
              View all equipment <ChevronRight size={16} />
            </span>
          </div>
        </div>
        
        <div className="data-grid mb-10">
          {mockEquipment.slice(4, 8).map((equipment, index) => (
            <div 
              key={equipment.id} 
              className="animate-fade-in" 
              style={{ animationDelay: `${400 + index * 100}ms` }}
            >
              <EquipmentCard 
                equipment={equipment} 
                onClick={setSelectedEquipment}
                isSelected={selectedEquipment.id === equipment.id}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer with improved styling */}
      <footer className="py-8 px-4 backdrop-blur-sm border-t border-white/10 bg-gradient-to-b from-transparent to-slate-950/70">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="size-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center">
                  <Activity size={18} className="text-white" />
                </div>
                <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-100">
                  Extion Infotech
                </span>
              </div>
              <p className="text-sm text-blue-300/70">
                Advanced predictive maintenance platform powered by Python, R, and SQL technology
              </p>
            </div>
            
            <div className="text-right text-sm text-blue-300/70">
              <p>NASA Turbofan Engine Degradation Simulation Dataset</p>
              <p className="text-xs mt-1">© {new Date().getFullYear()} Extion Infotech. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
