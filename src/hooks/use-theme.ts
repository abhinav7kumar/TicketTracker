
'use client';

import { useState, useEffect } from 'react';

const THEME_KEY = 'theme';

export function useTheme() {
  const [theme, setThemeState] = useState<string>('system');

  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_KEY);
    if (storedTheme) {
      setThemeState(storedTheme);
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    const isDark =
      theme === 'dark' ||
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    root.classList.toggle('dark', isDark);
  }, [theme]);

  const setTheme = (newTheme: string) => {
    localStorage.setItem(THEME_KEY, newTheme);
    setThemeState(newTheme);
  };

  return { theme, setTheme };
}
