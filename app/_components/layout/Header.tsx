'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
];

function Header() {
  const pathname = usePathname();

  return (
    <header className='w-full h-16 flex items-center'>
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
                  className={`hover:border-b-4 hover:border-indigo-500 transition-color duration-200 pb-1 ${
                    isActive
                      ? 'border-b-4 border-indigo-500 font-bold'
                      : 'text-neutral-900'
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

export default Header;
