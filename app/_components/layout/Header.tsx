'use client';

import { ThemeContext } from '@/_contexts/ThemeContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import { BiSolidSun, BiSolidMoon } from 'react-icons/bi';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
];

function Header() {
  const pathname = usePathname();
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <header className='w-full h-16 flex justify-between items-center'>
      <nav>
        <ul className='flex gap-5 md:gap-8'>
          {navLinks.map((link) => {
            let isActive = false;

            if (
              pathname === link.href ||
              pathname.startsWith(`${link.href}/`)
            ) {
              isActive = true;
            }

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`font-bold hover:text-secondary hover:border-primary transition-color duration-100 pb-1 ${
                    isActive && 'text-accent'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <button
        onClick={toggleTheme}
        className='text-2xl p-1 rounded hover:bg-secondary hover:text-amber-300 transition-color duration-300'
      >
        <BiSolidSun className='hidden dark:block' />
        <BiSolidMoon className='dark:hidden' />
      </button>
    </header>
  );
}

export default Header;
