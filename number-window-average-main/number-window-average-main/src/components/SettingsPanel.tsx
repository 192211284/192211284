
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface SettingsPanelProps {
  windowSize: number;
  setWindowSize: (size: number) => void;
}

const SettingsPanel = ({ windowSize, setWindowSize }: SettingsPanelProps) => {
  const [inputValue, setInputValue] = React.useState<string>(windowSize.toString());

  const handleSliderChange = (value: number[]) => {
    const newSize = value[0];
    setWindowSize(newSize);
    setInputValue(newSize.toString());
    toast.success(`Window size updated to ${newSize}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    const parsed = parseInt(inputValue);
    if (!isNaN(parsed) && parsed > 0 && parsed <= 100) {
      setWindowSize(parsed);
      toast.success(`Window size updated to ${parsed}`);
    } else {
      setInputValue(windowSize.toString());
      toast.error('Please enter a number between 1 and 100');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };

  const resetToDefault = () => {
    setWindowSize(10);
    setInputValue('10');
    toast.success('Window size reset to default (10)');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Configure the average calculator parameters</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Window Size</h3>
            <div className="w-24">
              <Input
                type="number"
                min={1}
                max={100}
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className="text-center"
              />
            </div>
          </div>
          <Slider
            defaultValue={[windowSize]}
            max={100}
            min={1}
            step={1}
            value={[parseInt(inputValue) || windowSize]}
            onValueChange={handleSliderChange}
            className="py-4"
          />
          <div className="text-sm text-slate-500">
            <p>Controls how many numbers are stored for calculating the average.</p>
            <p>When the window is full, the oldest number will be replaced.</p>
          </div>
        </div>
        <Button variant="outline" onClick={resetToDefault}>Reset to Default</Button>
      </CardContent>
    </Card>
  );
};

export default SettingsPanel;
