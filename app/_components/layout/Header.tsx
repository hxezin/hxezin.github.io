'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BsFillSunFill, BsFillMoonStarsFill } from 'react-icons/bs';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
];

function Header() {
  const pathname = usePathname();

  const toggleTheme = () => {
    localStorage.theme = localStorage.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className='w-full h-16 flex justify-between items-center'>
      <nav>
        <ul className='flex gap-5 md:gap-10 text-base'>
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
                  className={`hover:border-b-4 hover:border-primary transition-color duration-100 pb-1 ${
                    isActive && 'border-b-4 border-primary font-bold'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <button onClick={toggleTheme} className='text-amber-400'>
        <BsFillSunFill className='hidden dark:block' />
        <BsFillMoonStarsFill className='dark:hidden' />
      </button>
    </header>
  );
}

export default Header;
