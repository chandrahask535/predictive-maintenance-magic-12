
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Equipment } from '@/utils/mockData';
import { modelPerformanceData } from '@/utils/mockData';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ModelComparisonProps {
  equipment: Equipment;
}

const ModelComparison: React.FC<ModelComparisonProps> = ({ equipment }) => {
  // Transform the model performance data for the radar chart
  const radarData = [
    { metric: 'Accuracy', 'Random Forest': modelPerformanceData[0].accuracy, 'XGBoost': modelPerformanceData[1].accuracy, 'LSTM': modelPerformanceData[2].accuracy },
    { metric: 'Precision', 'Random Forest': modelPerformanceData[0].precision, 'XGBoost': modelPerformanceData[1].precision, 'LSTM': modelPerformanceData[2].precision },
    { metric: 'Recall', 'Random Forest': modelPerformanceData[0].recall, 'XGBoost': modelPerformanceData[1].recall, 'LSTM': modelPerformanceData[2].recall },
    { metric: 'F1 Score', 'Random Forest': modelPerformanceData[0].f1Score, 'XGBoost': modelPerformanceData[1].f1Score, 'LSTM': modelPerformanceData[2].f1Score },
  ];

  // Transform prediction data for bar chart
  const predictionData = [
    { name: 'Random Forest', value: equipment.predictions.randomForest },
    { name: 'XGBoost', value: equipment.predictions.xgBoost },
    { name: 'LSTM', value: equipment.predictions.lstm },
  ];

  // Error metrics for bar chart
  const errorData = [
    { name: 'Random Forest', MAE: modelPerformanceData[0].mae, RMSE: modelPerformanceData[0].rmse },
    { name: 'XGBoost', MAE: modelPerformanceData[1].mae, RMSE: modelPerformanceData[1].rmse },
    { name: 'LSTM', MAE: modelPerformanceData[2].mae, RMSE: modelPerformanceData[2].rmse },
  ];

  // Custom formatter for tooltip that handles both number and string types
  const customFormatter = (value: any) => {
    if (typeof value === 'number') {
      return value.toFixed(2);
    }
    return value;
  };

  return (
    <Card className="backdrop-blur-sm bg-white/10 dark:bg-black/30 border border-white/20 dark:border-white/10 h-full animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Model Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="predictions">
          <TabsList className="bg-secondary/50 backdrop-blur-sm">
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="error">Error Metrics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="predictions" className="mt-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={predictionData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: 'Days until failure', angle: -90, position: 'insideLeft' }} />
                  <Tooltip
                    formatter={(value) => [`${value} days`, 'Predicted time to failure']}
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="value" 
                    name="Days until failure" 
                    fill="rgba(59, 130, 246, 0.7)" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Comparison of different model predictions for remaining useful life
            </p>
          </TabsContent>
          
          <TabsContent value="performance" className="mt-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={90} width={730} height={250} data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.2)" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: 'rgba(255,255,255,0.8)', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 1]} />
                  <Radar 
                    name="Random Forest" 
                    dataKey="Random Forest" 
                    stroke="rgba(59, 130, 246, 0.8)" 
                    fill="rgba(59, 130, 246, 0.5)" 
                    fillOpacity={0.5} 
                  />
                  <Radar 
                    name="XGBoost" 
                    dataKey="XGBoost" 
                    stroke="rgba(16, 185, 129, 0.8)" 
                    fill="rgba(16, 185, 129, 0.5)" 
                    fillOpacity={0.5} 
                  />
                  <Radar 
                    name="LSTM" 
                    dataKey="LSTM" 
                    stroke="rgba(249, 115, 22, 0.8)" 
                    fill="rgba(249, 115, 22, 0.5)" 
                    fillOpacity={0.5} 
                  />
                  <Legend />
                  <Tooltip 
                    formatter={(value) => {
                      if (typeof value === 'number') {
                        return [value.toFixed(2), 'Score'];
                      }
                      return [value, 'Score'];
                    }}
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Model performance metrics comparison (higher is better)
            </p>
          </TabsContent>
          
          <TabsContent value="error" className="mt-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={errorData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: 'Days', angle: -90, position: 'insideLeft' }} />
                  <Tooltip 
                    formatter={(value) => [`${value} days`, 'Error']}
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="MAE" 
                    name="Mean Absolute Error" 
                    fill="rgba(239, 68, 68, 0.7)" 
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="RMSE" 
                    name="Root Mean Square Error" 
                    fill="rgba(249, 115, 22, 0.7)" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Error metrics comparison (lower is better)
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ModelComparison;
