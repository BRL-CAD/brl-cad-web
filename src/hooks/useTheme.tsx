import { THEME_STORAGE_KEY } from '@constants';
import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

type ThemeReturn = [
  theme: Theme,
  toggleTheme: () => void
];

export const useTheme = (): ThemeReturn => {
  const [theme, setTheme] = useState<Theme>('light');

  // The script in _document sets data-theme on <html> before the first paint
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // Storage can be blocked, the theme then lasts until the next page load
    }
    setTheme(nextTheme);
  };

  return [theme, toggleTheme];
};
