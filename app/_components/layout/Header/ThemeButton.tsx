'use client';

import { useEffect } from 'react';
import { BiSolidSun, BiSolidMoon } from 'react-icons/bi';

function ThemeButton() {
  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      localStorage.theme = 'dark';
      document.documentElement.classList.add('dark');
    } else {
      localStorage.theme = 'light';
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const currentTheme = localStorage.theme;
    const otherTheme = currentTheme === 'dark' ? 'light' : 'dark';

    localStorage.theme = otherTheme;
    document.documentElement.classList.toggle('dark');
    document.body.dataset.theme = otherTheme;
    window.dispatchEvent(new StorageEvent('storage', { key: otherTheme }));
  };

  return (
    <button
      onClick={toggleTheme}
      className='text-2xl p-1 rounded hover:bg-secondary hover:text-amber-300 transition-color duration-300'
    >
      <BiSolidSun className='hidden dark:block' />
      <BiSolidMoon className='dark:hidden' />
    </button>
  );
}

export default ThemeButton;
