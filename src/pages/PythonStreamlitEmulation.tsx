
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Info, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const PythonStreamlitEmulation: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-8 px-4">
      <Button 
        variant="outline" 
        onClick={() => navigate('/')} 
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to React App
      </Button>

      <Alert className="mb-6 bg-amber-500/10 border-amber-500/20">
        <AlertCircle className="h-4 w-4 text-amber-500" />
        <AlertTitle className="text-amber-500">Streamlit Application Error</AlertTitle>
        <AlertDescription>
          The Streamlit application has an error that needs to be fixed in the Python code.
        </AlertDescription>
      </Alert>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Python Streamlit Code Error</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-950 text-white p-4 rounded-md overflow-x-auto">
            <pre className="text-sm">
              <code>
{`NameError: name 'data' is not defined

The error is occurring because you're trying to use the 'data' variable before it's defined.
You need to load the data before training models with it. Here's the fix:`}
              </code>
            </pre>
            
            <div className="mt-4 border-t border-slate-700 pt-4">
              <h3 className="text-green-500 mb-2">✅ Fixed Code:</h3>
              <pre className="text-sm text-green-300">
                <code>
{`# Load data first
data = load_data()

# Then train models with the loaded data
model_results, X_test, y_test = train_models(data)`}
                </code>
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Fix Your Streamlit Application</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">To fix the error in your Streamlit application, follow these steps:</p>
          
          <ol className="list-decimal pl-6 space-y-2">
            <li>Open your <code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">predict.mainten.py</code> file</li>
            <li>
              Find these lines (around line 191):
              <pre className="bg-slate-200 dark:bg-slate-800 p-2 my-2 rounded text-xs">
                <code>
{`# Train models
model_results, X_test, y_test = train_models(data)`}
                </code>
              </pre>
            </li>
            <li>
              Insert the data loading line before training the models:
              <pre className="bg-slate-200 dark:bg-slate-800 p-2 my-2 rounded text-xs">
                <code>
{`# Load the data
data = load_data()

# Train models
model_results, X_test, y_test = train_models(data)`}
                </code>
              </pre>
            </li>
            <li>Save the file and run it again with <code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">streamlit run predict.mainten.py</code></li>
          </ol>

          <Alert className="mt-6 bg-blue-500/10 border-blue-500/20">
            <Info className="h-4 w-4 text-blue-500" />
            <AlertTitle className="text-blue-500">Why This Error Occurs</AlertTitle>
            <AlertDescription>
              In Python, variables must be defined before they are used. The error occurred because your code was trying to use the 'data' variable in the call to train_models() before it was created by calling load_data().
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Tabs defaultValue="dashboard" className="mt-6">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard Preview</TabsTrigger>
          <TabsTrigger value="models">Model Comparison</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance Schedule</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <Card>
            <CardHeader>
              <CardTitle>Predictive Maintenance Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Fix the Python error to see your Streamlit dashboard here
                </p>
                <Button className="mt-4" disabled>Preview Unavailable</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="models">
          <Card>
            <CardHeader>
              <CardTitle>Model Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Fix the Python error to see your model comparison here
                </p>
                <Button className="mt-4" disabled>Preview Unavailable</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="maintenance">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Fix the Python error to see your maintenance schedule here
                </p>
                <Button className="mt-4" disabled>Preview Unavailable</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PythonStreamlitEmulation;
