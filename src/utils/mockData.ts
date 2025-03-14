
// This file simulates a subset of the NASA Turbofan Engine Degradation dataset
// In a real application, this would be replaced with actual API calls or data processing

export interface SensorReading {
  timestamp: number;
  cycle: number;
  op1: number; // Operating setting 1
  op2: number; // Operating setting 2
  op3: number; // Operating setting 3
  sensor1: number; // Temperature
  sensor2: number; // Pressure
  sensor3: number; // Vibration
  sensor4: number; // RPM
  sensor5: number; // Air flow
  sensor6: number; // Oil temperature
  sensor7: number; // Oil pressure
  sensor8: number; // Fan speed
  sensor9: number; // Bypass ratio
  sensor10: number; // Bleed enthalpy
  sensor11: number; // Fuel flow
  sensor12: number; // Core speed
  sensor13: number; // High-pressure exhaust temp
  sensor14: number; // Low-pressure exhaust temp
  rUL: number; // Remaining useful life
}

export interface Equipment {
  id: string;
  name: string;
  type: string;
  status: 'normal' | 'warning' | 'critical' | 'maintenance';
  installDate: string;
  lastMaintenance: string;
  predictions: {
    randomForest: number; // Days until failure
    xgBoost: number; // Days until failure
    lstm: number; // Days until failure
  };
  sensorData: SensorReading[];
  maintenanceHistory: {
    date: string;
    type: string;
    description: string;
    cost: number;
  }[];
}

export interface ModelPerformance {
  model: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  mae: number; // Mean Absolute Error
  rmse: number; // Root Mean Square Error
}

export interface MaintenanceTask {
  id: string;
  equipmentId: string;
  scheduledDate: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  estimatedDuration: number; // hours
  assignedTo: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
}

// Generate sensor data with decay pattern
function generateSensorData(cycles: number, failureCycle: number): SensorReading[] {
  const data: SensorReading[] = [];
  const now = Date.now();
  const msPerCycle = 86400000; // 1 day per cycle in ms

  for (let i = 0; i < cycles; i++) {
    // Create exponential degradation pattern
    const degradationFactor = Math.exp((i / failureCycle) * 3) - 1;
    const randomVariation = () => (Math.random() - 0.5) * 0.1;
    
    data.push({
      timestamp: now - (cycles - i) * msPerCycle,
      cycle: i + 1,
      op1: 100 - degradationFactor * 10 + randomVariation() * 10,
      op2: 0.84 + randomVariation() * 0.02,
      op3: 100 + randomVariation() * 5,
      sensor1: 445 + degradationFactor * 15 + randomVariation() * 10, // Temperature increases with wear
      sensor2: 642 - degradationFactor * 20 + randomVariation() * 15, // Pressure decreases with wear
      sensor3: 1583 + degradationFactor * 100 + randomVariation() * 50, // Vibration increases with wear
      sensor4: 1400 - degradationFactor * 30 + randomVariation() * 20, // RPM fluctuates
      sensor5: 14.62 - degradationFactor * 1 + randomVariation(), // Air flow decreases
      sensor6: 303 + degradationFactor * 20 + randomVariation() * 15, // Oil temp increases
      sensor7: 2388 - degradationFactor * 100 + randomVariation() * 50, // Oil pressure decreases
      sensor8: 8138 - degradationFactor * 30 + randomVariation() * 50, // Fan speed decreases
      sensor9: 9.042 + randomVariation() * 0.2, // Bypass ratio
      sensor10: 392.5 + degradationFactor * 10 + randomVariation() * 20, // Bleed enthalpy
      sensor11: 521.3 + degradationFactor * 15 + randomVariation() * 10, // Fuel flow increases
      sensor12: 2388 - degradationFactor * 30 + randomVariation() * 30, // Core speed decreases
      sensor13: 1435.9 + degradationFactor * 25 + randomVariation() * 15, // High-pressure exhaust temp increases
      sensor14: 545.2 + degradationFactor * 20 + randomVariation() * 10, // Low-pressure exhaust temp increases
      rUL: Math.max(0, failureCycle - i), // Remaining useful life
    });
  }

  return data;
}

// Generate mock equipment data
export const generateEquipment = (count: number): Equipment[] => {
  const equipmentTypes = ['Turbofan Engine', 'Hydraulic Pump', 'Compressor', 'Heat Exchanger'];
  const statusDistribution = ['normal', 'normal', 'normal', 'warning', 'critical', 'maintenance'];
  const personnel = ['John Smith', 'Maria Rodriguez', 'Alex Chen', 'Sarah Johnson'];
  
  return Array.from({ length: count }, (_, i) => {
    const id = `EQ-${1000 + i}`;
    const type = equipmentTypes[Math.floor(Math.random() * equipmentTypes.length)];
    const status = statusDistribution[Math.floor(Math.random() * statusDistribution.length)] as Equipment['status'];
    
    // Generate randomized but plausible prediction days until failure
    const baseFailureDays = status === 'normal' ? 120 + Math.random() * 60 : 
                            status === 'warning' ? 30 + Math.random() * 30 : 
                            status === 'critical' ? 1 + Math.random() * 5 : 30 + Math.random() * 90;
    
    // Different models give slightly different predictions
    const randomForest = baseFailureDays;
    const xgBoost = baseFailureDays * (0.9 + Math.random() * 0.2);
    const lstm = baseFailureDays * (0.85 + Math.random() * 0.3);
    
    // Generate dates
    const now = new Date();
    const installDate = new Date();
    installDate.setFullYear(now.getFullYear() - 2 - Math.floor(Math.random() * 3));
    
    const lastMaintenance = new Date();
    lastMaintenance.setMonth(now.getMonth() - Math.floor(Math.random() * 6));
    
    // Generate maintenance history
    const maintenanceCount = 2 + Math.floor(Math.random() * 4);
    const maintenanceHistory = [];
    
    for (let j = 0; j < maintenanceCount; j++) {
      const date = new Date();
      date.setMonth(now.getMonth() - j * 2 - Math.floor(Math.random() * 2));
      
      maintenanceHistory.push({
        date: date.toISOString().split('T')[0],
        type: Math.random() > 0.7 ? 'Preventive' : 'Corrective',
        description: Math.random() > 0.7 ? 'Routine maintenance and inspection' : 'Component replacement',
        cost: Math.floor(2000 + Math.random() * 8000),
      });
    }
    
    // Sort maintenance history by date (newest first)
    maintenanceHistory.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    // Generate sensor data
    const cycleCount = 200;
    const failureCycle = 250; // The equipment fails after this many cycles
    const sensorData = generateSensorData(cycleCount, failureCycle);
    
    return {
      id,
      name: `${type} ${id}`,
      type,
      status,
      installDate: installDate.toISOString().split('T')[0],
      lastMaintenance: lastMaintenance.toISOString().split('T')[0],
      predictions: {
        randomForest,
        xgBoost,
        lstm,
      },
      sensorData,
      maintenanceHistory,
    };
  });
};

// Generate model performance metrics
export const modelPerformanceData: ModelPerformance[] = [
  {
    model: 'Random Forest',
    accuracy: 0.87,
    precision: 0.83,
    recall: 0.86,
    f1Score: 0.84,
    mae: 12.6,
    rmse: 18.3,
  },
  {
    model: 'XGBoost',
    accuracy: 0.91,
    precision: 0.89,
    recall: 0.92,
    f1Score: 0.90,
    mae: 9.8,
    rmse: 14.2,
  },
  {
    model: 'LSTM',
    accuracy: 0.86,
    precision: 0.88,
    recall: 0.81,
    f1Score: 0.84,
    mae: 10.5,
    rmse: 15.7,
  },
];

// Generate maintenance tasks
export const generateMaintenanceTasks = (equipment: Equipment[]): MaintenanceTask[] => {
  const tasks: MaintenanceTask[] = [];
  
  equipment.forEach(eq => {
    if (eq.status === 'warning' || eq.status === 'critical') {
      const now = new Date();
      const scheduledDate = new Date();
      
      // Schedule based on status
      if (eq.status === 'critical') {
        scheduledDate.setDate(now.getDate() + 1);
      } else {
        scheduledDate.setDate(now.getDate() + 7 + Math.floor(Math.random() * 7));
      }
      
      tasks.push({
        id: `TASK-${Math.floor(1000 + Math.random() * 9000)}`,
        equipmentId: eq.id,
        scheduledDate: scheduledDate.toISOString().split('T')[0],
        priority: eq.status === 'critical' ? 'critical' : 'high',
        description: eq.status === 'critical' ? 'Emergency maintenance required' : 'Preventive maintenance recommended',
        estimatedDuration: 4 + Math.floor(Math.random() * 4),
        assignedTo: ['John Smith', 'Maria Rodriguez', 'Alex Chen', 'Sarah Johnson'][Math.floor(Math.random() * 4)],
        status: 'scheduled',
      });
    }
    
    // Add some scheduled maintenance for normal equipment too
    if (eq.status === 'normal' && Math.random() > 0.7) {
      const now = new Date();
      const scheduledDate = new Date();
      scheduledDate.setDate(now.getDate() + 14 + Math.floor(Math.random() * 30));
      
      tasks.push({
        id: `TASK-${Math.floor(1000 + Math.random() * 9000)}`,
        equipmentId: eq.id,
        scheduledDate: scheduledDate.toISOString().split('T')[0],
        priority: 'low',
        description: 'Routine inspection and maintenance',
        estimatedDuration: 2 + Math.floor(Math.random() * 3),
        assignedTo: ['John Smith', 'Maria Rodriguez', 'Alex Chen', 'Sarah Johnson'][Math.floor(Math.random() * 4)],
        status: 'scheduled',
      });
    }
  });
  
  // Sort tasks by date
  return tasks.sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime());
};

// Initialize mock data
export const mockEquipment = generateEquipment(10);
export const mockMaintenanceTasks = generateMaintenanceTasks(mockEquipment);
