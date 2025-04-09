
import { useState, useEffect } from 'react';
import NumbersDisplay from '../components/NumbersDisplay';
import RequestForm from '../components/RequestForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { NumberResponse } from '@/types/api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Toaster } from '@/components/ui/sonner';
import SettingsPanel from '@/components/SettingsPanel';
import { NumbersAPI } from '@/utils/apiClient';
import { toast } from 'sonner';

const Index = () => {
  const [windowSize, setWindowSize] = useState<number>(10);
  const [response, setResponse] = useState<NumberResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleRequest = async (numberType: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await NumbersAPI.getNumbers(numberType);
      setResponse(data);
      toast.success(`Successfully calculated average for ${getNumberTypeName(numberType)} numbers`);
    } catch (err) {
      console.error('Error fetching numbers:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      toast.error('Failed to fetch numbers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get a readable name for the number type
  const getNumberTypeName = (type: string): string => {
    switch (type) {
      case 'p': return 'Prime';
      case 'f': return 'Fibonacci';
      case 'e': return 'Even';
      case 'r': return 'Random';
      default: return type;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-8">
      <div className="container mx-auto max-w-5xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">Average Calculator Microservice</h1>
          <p className="text-slate-600">
            Calculate window-based averages from various number sequences
          </p>
        </header>

        <Tabs defaultValue="dashboard" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-6">
            <RequestForm onRequest={handleRequest} loading={loading} />
            
            {error && (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="pt-6">
                  <p className="text-red-600">{error}</p>
                </CardContent>
              </Card>
            )}
            
            <NumbersDisplay response={response} loading={loading} />
          </TabsContent>
          
          <TabsContent value="settings">
            <SettingsPanel windowSize={windowSize} setWindowSize={setWindowSize} />
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>API Documentation</CardTitle>
            <CardDescription>How to use the Numbers API</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Endpoint</h3>
              <code className="block bg-slate-100 p-2 rounded mt-2">
                GET /api/numbers/:numberid
              </code>
            </div>
            <div>
              <h3 className="text-lg font-medium">Supported Number Types</h3>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><code className="bg-slate-100 px-1">p</code> - Prime numbers</li>
                <li><code className="bg-slate-100 px-1">f</code> - Fibonacci numbers</li>
                <li><code className="bg-slate-100 px-1">e</code> - Even numbers</li>
                <li><code className="bg-slate-100 px-1">r</code> - Random numbers</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium">Response Format</h3>
              <pre className="bg-slate-100 p-2 rounded mt-2 text-xs overflow-auto">
{`{
  "windowPrevState": [2, 4, 6, 8],
  "windowCurrState": [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
  "numbers": [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
  "avg": 11.00
}`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default Index;
