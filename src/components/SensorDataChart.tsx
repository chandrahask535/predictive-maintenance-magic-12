
import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Equipment, SensorReading } from '@/utils/mockData';
import { extractSensorData, smoothSensorData, detectAnomalies } from '@/utils/dataProcessor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { AlertTriangle } from 'lucide-react';

interface SensorDataChartProps {
  equipment: Equipment;
}

type SensorOption = {
  key: keyof SensorReading;
  label: string;
  unit: string;
};

const SensorDataChart: React.FC<SensorDataChartProps> = ({ equipment }) => {
  const [selectedSensor, setSelectedSensor] = useState<keyof SensorReading>('sensor1');
  const [showSmoothed, setShowSmoothed] = useState(true);
  const [showAnomalies, setShowAnomalies] = useState(true);

  const sensorOptions: SensorOption[] = [
    { key: 'sensor1', label: 'Temperature', unit: '°C' },
    { key: 'sensor2', label: 'Pressure', unit: 'PSI' },
    { key: 'sensor3', label: 'Vibration', unit: 'Hz' },
    { key: 'sensor4', label: 'RPM', unit: 'RPM' },
    { key: 'sensor5', label: 'Air Flow', unit: 'kg/s' },
    { key: 'sensor6', label: 'Oil Temperature', unit: '°C' },
    { key: 'sensor7', label: 'Oil Pressure', unit: 'PSI' },
    { key: 'sensor8', label: 'Fan Speed', unit: 'RPM' },
    { key: 'sensor9', label: 'Bypass Ratio', unit: '' },
    { key: 'sensor10', label: 'Bleed Enthalpy', unit: 'kJ/kg' },
    { key: 'sensor11', label: 'Fuel Flow', unit: 'kg/h' },
    { key: 'sensor12', label: 'Core Speed', unit: 'RPM' },
    { key: 'sensor13', label: 'HP Exhaust Temp', unit: '°C' },
    { key: 'sensor14', label: 'LP Exhaust Temp', unit: '°C' },
  ];

  const currentSensorOption = sensorOptions.find(option => option.key === selectedSensor)!;

  // Process the data
  const chartData = useMemo(() => {
    const rawData = extractSensorData(equipment.sensorData, selectedSensor);
    const smoothedData = showSmoothed ? smoothSensorData(rawData) : rawData;
    return showAnomalies ? detectAnomalies(smoothedData) : smoothedData.map(point => ({ ...point, isAnomaly: false }));
  }, [equipment.sensorData, selectedSensor, showSmoothed, showAnomalies]);

  // Find anomalies for the dot display
  const anomalies = useMemo(() => {
    return chartData.filter(point => point.isAnomaly);
  }, [chartData]);

  return (
    <Card className="glass-card h-full animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="text-lg">Sensor Data Analysis</CardTitle>
          <div className="flex items-center gap-2">
            <Select value={selectedSensor as string} onValueChange={(value) => setSelectedSensor(value as keyof SensorReading)}>
              <SelectTrigger className="glass-input w-[180px]">
                <SelectValue placeholder="Select sensor" />
              </SelectTrigger>
              <SelectContent>
                {sensorOptions.map((option) => (
                  <SelectItem key={option.key as string} value={option.key as string}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="cycle" 
                label={{ value: 'Cycle', position: 'insideBottomRight', offset: -5 }} 
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                label={{ 
                  value: `${currentSensorOption.label} (${currentSensorOption.unit})`, 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle' }
                }} 
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                formatter={(value) => [`${value} ${currentSensorOption.unit}`, currentSensorOption.label]}
                labelFormatter={(cycle) => `Cycle: ${cycle}`}
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="value" 
                name={currentSensorOption.label}
                stroke="rgba(59, 130, 246, 0.8)" 
                strokeWidth={2}
                dot={false} 
                activeDot={{ r: 6, stroke: 'rgba(59, 130, 246, 1)', strokeWidth: 1 }}
              />
              {anomalies.map((point, index) => (
                <ReferenceDot
                  key={`anomaly-${index}`}
                  x={point.cycle}
                  y={point.value}
                  r={4}
                  fill="rgba(239, 68, 68, 0.8)"
                  stroke="rgba(239, 68, 68, 1)"
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-wrap justify-between items-center mt-4 gap-4">
          <div className="flex items-center space-x-2">
            <Switch id="smoothed" checked={showSmoothed} onCheckedChange={setShowSmoothed} />
            <Label htmlFor="smoothed">Smoothed Data</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch id="anomalies" checked={showAnomalies} onCheckedChange={setShowAnomalies} />
            <Label htmlFor="anomalies">Detect Anomalies</Label>
          </div>
          
          {anomalies.length > 0 && showAnomalies && (
            <div className="flex items-center text-xs text-red-500 gap-1">
              <AlertTriangle size={14} />
              <span>{anomalies.length} anomalies detected</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SensorDataChart;
