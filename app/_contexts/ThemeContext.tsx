'use client';
import { createContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: 'light',
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  const toggleTheme = () => {
    if (localStorage.theme === 'dark') {
      setTheme('light');
      localStorage.theme = 'light';
    } else {
      setTheme('dark');
      localStorage.theme = 'dark';
    }
    document.documentElement.classList.toggle('dark');
  };

  return { theme, toggleTheme };
}
