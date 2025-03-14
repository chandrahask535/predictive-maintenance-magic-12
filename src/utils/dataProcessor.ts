
import { SensorReading, Equipment } from './mockData';

// Function to extract a specific sensor's data for charting
export function extractSensorData(sensorData: SensorReading[], sensorKey: keyof SensorReading) {
  return sensorData.map(reading => ({
    cycle: reading.cycle,
    value: reading[sensorKey] as number,
    timestamp: reading.timestamp,
  }));
}

// Function to smooth sensor data using moving average
export function smoothSensorData(data: { cycle: number; value: number; timestamp: number }[], windowSize = 5) {
  return data.map((point, index, array) => {
    // For the first few points, we can't look back enough
    if (index < windowSize - 1) {
      const validDataPoints = array.slice(0, index + 1);
      const sum = validDataPoints.reduce((acc, curr) => acc + curr.value, 0);
      return {
        ...point,
        value: sum / validDataPoints.length,
      };
    }
    
    // Calculate moving average
    const sum = array
      .slice(index - windowSize + 1, index + 1)
      .reduce((acc, curr) => acc + curr.value, 0);
    
    return {
      ...point,
      value: sum / windowSize,
    };
  });
}

// Function to detect anomalies using simple threshold
export function detectAnomalies(
  data: { cycle: number; value: number; timestamp: number }[],
  threshold = 2.5
) {
  // Calculate mean and standard deviation
  const values = data.map(point => point.value);
  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
  const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
  const stdDev = Math.sqrt(variance);
  
  // Mark points that deviate significantly from the mean
  return data.map(point => {
    const zScore = Math.abs((point.value - mean) / stdDev);
    return {
      ...point,
      isAnomaly: zScore > threshold,
    };
  });
}

// Calculate the health index for equipment based on sensor readings
export function calculateHealthIndex(equipment: Equipment): number {
  // Get the most recent 30 readings
  const recentReadings = equipment.sensorData.slice(-30);
  
  if (recentReadings.length === 0) return 100; // Default to perfect health if no data
  
  // Factors that contribute to health index:
  // 1. Remaining useful life (RUL)
  // 2. Temperature (sensor1) - higher is worse
  // 3. Vibration (sensor3) - higher is worse
  // 4. Oil pressure (sensor7) - lower is worse
  
  // Normalize RUL to 0-1 range (0 = bad, 1 = good)
  const lastRUL = recentReadings[recentReadings.length - 1].rUL;
  const maxRUL = 150; // Assume max RUL is 150 cycles
  const rulFactor = Math.min(lastRUL / maxRUL, 1); // Clamp to 1
  
  // Normalize temperature (higher is worse)
  const avgTemp = recentReadings.reduce((sum, r) => sum + r.sensor1, 0) / recentReadings.length;
  const minTemp = 430; // Normal minimum
  const maxTemp = 490; // Critical maximum
  const tempFactor = 1 - Math.min(Math.max((avgTemp - minTemp) / (maxTemp - minTemp), 0), 1);
  
  // Normalize vibration (higher is worse)
  const avgVibration = recentReadings.reduce((sum, r) => sum + r.sensor3, 0) / recentReadings.length;
  const minVibration = 1550; // Normal minimum
  const maxVibration = 1850; // Critical maximum
  const vibrationFactor = 1 - Math.min(Math.max((avgVibration - minVibration) / (maxVibration - minVibration), 0), 1);
  
  // Normalize oil pressure (lower is worse)
  const avgOilPressure = recentReadings.reduce((sum, r) => sum + r.sensor7, 0) / recentReadings.length;
  const minOilPressure = 2200; // Critical minimum
  const maxOilPressure = 2450; // Normal maximum
  const oilPressureFactor = Math.min(Math.max((avgOilPressure - minOilPressure) / (maxOilPressure - minOilPressure), 0), 1);
  
  // Weight the factors
  const weights = {
    rul: 0.4,
    temp: 0.2,
    vibration: 0.2,
    oilPressure: 0.2,
  };
  
  // Calculate weighted health index (0-100)
  const healthIndex = 
    rulFactor * weights.rul * 100 +
    tempFactor * weights.temp * 100 +
    vibrationFactor * weights.vibration * 100 +
    oilPressureFactor * weights.oilPressure * 100;
  
  return Math.round(healthIndex);
}

// Get the best model prediction for a piece of equipment
export function getBestPrediction(equipment: Equipment): { model: string; days: number } {
  const { randomForest, xgBoost, lstm } = equipment.predictions;
  
  // Get the model with the lowest days until failure (most conservative)
  if (randomForest <= xgBoost && randomForest <= lstm) {
    return { model: 'Random Forest', days: randomForest };
  }
  
  if (xgBoost <= randomForest && xgBoost <= lstm) {
    return { model: 'XGBoost', days: xgBoost };
  }
  
  return { model: 'LSTM', days: lstm };
}

// Format days until failure into a human-readable string
export function formatDaysUntilFailure(days: number): string {
  if (days < 1) return 'Immediate attention required';
  if (days < 7) return `${Math.ceil(days)} days`;
  if (days < 30) return `${Math.ceil(days / 7)} weeks`;
  return `${Math.ceil(days / 30)} months`;
}

// Calculate the maintenance priority for a piece of equipment
export function calculateMaintenancePriority(equipment: Equipment): 'low' | 'medium' | 'high' | 'critical' {
  const healthIndex = calculateHealthIndex(equipment);
  
  if (healthIndex < 40) return 'critical';
  if (healthIndex < 60) return 'high';
  if (healthIndex < 80) return 'medium';
  return 'low';
}
