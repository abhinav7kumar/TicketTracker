
'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useTheme } from '@/hooks/use-theme';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [fontSize, setFontSize] = useState('medium');

  useEffect(() => {
    const storedFontSize = localStorage.getItem('fontSize');
    if (storedFontSize) {
      setFontSize(storedFontSize);
      document.documentElement.style.fontSize = getFontSizeValue(storedFontSize);
    }
  }, []);

  const getFontSizeValue = (size: string) => {
    if (size === 'small') return '14px';
    if (size === 'large') return '18px';
    return '16px'; // medium
  }

  const handleFontSizeChange = (value: string) => {
    setFontSize(value);
    localStorage.setItem('fontSize', value);
    document.documentElement.style.fontSize = getFontSizeValue(value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your application settings.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize the look and feel of the application.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div>
            <Label>Theme</Label>
            <p className="text-sm text-muted-foreground">
              Select the theme for the application.
            </p>
            <RadioGroup
              value={theme}
              onValueChange={setTheme}
              className="grid max-w-md grid-cols-1 sm:grid-cols-2 gap-8 pt-4"
            >
              <Label className="cursor-pointer">
                <RadioGroupItem value="light" id="light" className="sr-only" />
                <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground has-[input:checked]:border-primary">
                  <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                    <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                      <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                      <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                    </div>
                    <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                      <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                      <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                    </div>
                    <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                      <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                      <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                    </div>
                  </div>
                </div>
                <span className="block w-full p-2 text-center font-normal">
                  Light
                </span>
              </Label>
              <Label className="cursor-pointer">
                <RadioGroupItem value="dark" id="dark" className="sr-only" />
                <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground has-[input:checked]:border-primary">
                  <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                    <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                      <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                      <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                    </div>
                    <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                      <div className="h-4 w-4 rounded-full bg-slate-400" />
                      <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                    </div>
                    <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                      <div className="h-4 w-4 rounded-full bg-slate-400" />
                      <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                    </div>
                  </div>
                </div>
                <span className="block w-full p-2 text-center font-normal">
                  Dark
                </span>
              </Label>
            </RadioGroup>
          </div>

           <div>
            <Label>Font Size</Label>
             <p className="text-sm text-muted-foreground">
              Adjust the font size for better readability.
            </p>
            <RadioGroup
              value={fontSize}
              onValueChange={handleFontSizeChange}
              className="flex items-center gap-4 pt-4"
            >
              <Label className="flex items-center gap-2 cursor-pointer rounded-md p-2 border border-transparent has-[input:checked]:border-primary has-[input:checked]:bg-muted">
                <RadioGroupItem value="small" id="small" />
                <span className="text-sm">Small</span>
              </Label>
              <Label className="flex items-center gap-2 cursor-pointer rounded-md p-2 border border-transparent has-[input:checked]:border-primary has-[input:checked]:bg-muted">
                <RadioGroupItem value="medium" id="medium" />
                <span className="text-base">Medium</span>
              </Label>
               <Label className="flex items-center gap-2 cursor-pointer rounded-md p-2 border border-transparent has-[input:checked]:border-primary has-[input:checked]:bg-muted">
                <RadioGroupItem value="large" id="large" />
                <span className="text-lg">Large</span>
              </Label>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
