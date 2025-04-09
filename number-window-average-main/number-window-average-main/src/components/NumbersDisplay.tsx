
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { NumberResponse } from '@/types/api';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface NumbersDisplayProps {
  response: NumberResponse | null;
  loading: boolean;
}

const NumbersDisplay = ({ response, loading }: NumbersDisplayProps) => {
  if (loading) {
    return <LoadingState />;
  }

  if (!response) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Data Yet</CardTitle>
          <CardDescription>
            Make a request to see the results
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Result</CardTitle>
          <CardDescription>Current average and window state</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-md flex items-center justify-between">
            <span className="text-blue-700 font-medium">Average:</span>
            <Badge variant="secondary" className="text-lg px-4 py-1 bg-white border border-blue-200">
              {response.avg.toFixed(2)}
            </Badge>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-slate-500 mb-2">Current Window State</h3>
            <div className="bg-white border border-slate-200 rounded-md p-3 overflow-x-auto">
              <div className="flex flex-wrap gap-2">
                {response.windowCurrState.length > 0 ? (
                  response.windowCurrState.map((num, i) => (
                    <Badge key={i} variant="outline" className="bg-blue-50">
                      {num}
                    </Badge>
                  ))
                ) : (
                  <span className="text-slate-500 italic">Empty</span>
                )}
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-slate-500 mb-2">Previous Window State</h3>
            <div className="bg-white border border-slate-200 rounded-md p-3 overflow-x-auto">
              <div className="flex flex-wrap gap-2">
                {response.windowPrevState.length > 0 ? (
                  response.windowPrevState.map((num, i) => (
                    <Badge key={i} variant="outline" className="bg-slate-100">
                      {num}
                    </Badge>
                  ))
                ) : (
                  <span className="text-slate-500 italic">Empty</span>
                )}
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-slate-500 mb-2">Received Numbers</h3>
            <div className="bg-white border border-slate-200 rounded-md p-3 overflow-x-auto">
              <div className="flex flex-wrap gap-2">
                {response.numbers.length > 0 ? (
                  response.numbers.map((num, i) => (
                    <Badge key={i} variant="outline" className="bg-green-50">
                      {num}
                    </Badge>
                  ))
                ) : (
                  <span className="text-slate-500 italic">None</span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const LoadingState = () => (
  <Card>
    <CardHeader>
      <CardTitle>Loading Results</CardTitle>
      <CardDescription>Please wait...</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-8 w-16" />
      </div>
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-20 w-full" />
    </CardContent>
  </Card>
);

export default NumbersDisplay;
