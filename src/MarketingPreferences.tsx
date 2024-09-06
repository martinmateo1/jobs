import React from 'react';
import { Switch } from "./components/ui/Switch";
import { Label } from "./components/ui/Label";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
  } from "./components/ui/Form"

const MarketingPreferences: React.FC<{
  selectedPreferences: string[];
  onChange: (preferences: string[]) => void;
}> = ({ selectedPreferences, onChange }) => {
  const options = ['logo', 'email database', 'company landing'];

  const handlePreferenceChange = (preference: string, checked: boolean) => {
    const updatedPreferences = checked
      ? [...selectedPreferences, preference]
      : selectedPreferences.filter((p) => p !== preference);

    onChange(updatedPreferences);
  };

  return (
    <div className="space-y-2">
      
      <div className="space-y-1">
        {options.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <Switch
              id={option}
              checked={selectedPreferences.includes(option)}
              onCheckedChange={(checked) => handlePreferenceChange(option, checked)}
            />
            <Label htmlFor={option}>{option}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketingPreferences;
