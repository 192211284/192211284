
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

interface RequestFormProps {
  onRequest: (numberType: string) => Promise<void>;
  loading: boolean;
}

const RequestForm = ({ onRequest, loading }: RequestFormProps) => {
  const [selectedType, setSelectedType] = useState<string>('e');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRequest(selectedType);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request Numbers</CardTitle>
        <CardDescription>Select a number type to calculate the average</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <RadioGroup 
            value={selectedType} 
            onValueChange={setSelectedType}
            className="grid grid-cols-2 gap-4 md:grid-cols-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="p" id="p" />
              <Label htmlFor="p" className="cursor-pointer">Prime</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="f" id="f" />
              <Label htmlFor="f" className="cursor-pointer">Fibonacci</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="e" id="e" />
              <Label htmlFor="e" className="cursor-pointer">Even</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="r" id="r" />
              <Label htmlFor="r" className="cursor-pointer">Random</Label>
            </div>
          </RadioGroup>
          
          <Button 
            type="submit" 
            className="w-full md:w-auto" 
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Calculate Average'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RequestForm;
