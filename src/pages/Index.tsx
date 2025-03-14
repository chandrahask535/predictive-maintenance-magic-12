
import React, { useState } from 'react';
import Header from '@/components/Header';
import EquipmentCard from '@/components/EquipmentCard';
import SensorDataChart from '@/components/SensorDataChart';
import ModelComparison from '@/components/ModelComparison';
import MaintenanceSchedule from '@/components/MaintenanceSchedule';
import PredictionTimeline from '@/components/PredictionTimeline';
import { mockEquipment, mockMaintenanceTasks } from '@/utils/mockData';
import { Equipment } from '@/utils/mockData';

const Index = () => {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment>(mockEquipment[0]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-900/30 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <Header />
        
        <div className="mb-8 animate-fade-in animate-delay-100">
          <h2 className="text-3xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">Equipment Overview</h2>
          <p className="text-muted-foreground mt-1">Monitor and predict maintenance needs for manufacturing equipment</p>
        </div>
        
        {/* Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {mockEquipment.slice(0, 4).map((equipment, index) => (
            <div key={equipment.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <EquipmentCard 
                equipment={equipment} 
                onClick={setSelectedEquipment} 
              />
            </div>
          ))}
        </div>
        
        {/* Selected Equipment Details */}
        <div className="mb-4 animate-fade-in animate-delay-300">
          <h3 className="text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">{selectedEquipment.name} Analysis</h3>
          <p className="text-muted-foreground text-sm">Detailed analytics and predictions</p>
        </div>
        
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
        
        {/* Additional Equipment Grid */}
        <div className="mb-4 animate-fade-in animate-delay-400">
          <h3 className="text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">Other Equipment</h3>
          <p className="text-muted-foreground text-sm">Monitor additional equipment status</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {mockEquipment.slice(4, 8).map((equipment, index) => (
            <div key={equipment.id} className="animate-fade-in" style={{ animationDelay: `${400 + index * 100}ms` }}>
              <EquipmentCard 
                equipment={equipment} 
                onClick={setSelectedEquipment} 
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-6 px-4 backdrop-blur-sm border-t border-white/10">
        <div className="container mx-auto max-w-7xl text-center">
          <p className="text-sm text-muted-foreground">
            Predictive Maintenance Dashboard | Extion Infotech | NASA Turbofan Engine Degradation Simulation Data
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
