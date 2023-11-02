'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
];

function HeaderNavigation() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className='flex gap-5 md:gap-8'>
        {navLinks.map((link) => {
          let isActive = false;

          if (pathname === link.href || pathname.startsWith(`${link.href}/`)) {
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
  );
}

export default HeaderNavigation;
