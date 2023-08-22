'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
];

function MainNavigation() {
  const pathname = usePathname();

  return (
    <header className='w-full max-w-3xl h-16 flex items-center px-4 mx-auto'>
      <nav>
        <ul className='flex gap-10 text-base'>
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
                  className={`hover:border-b-4 hover:border-purple-600 transition-color duration-200 pb-1 ${
                    isActive
                      ? 'border-b-4 border-purple-700 font-bold'
                      : 'text-zinc-900'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
