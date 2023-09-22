'use client';
import { CATEGORY } from '@/_helpers/category';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Category() {
  const pathname = usePathname();

  return (
    <ul className='flex gap-3'>
      {CATEGORY.map((category) => {
        let isAll = category === 'All';
        let isActive = false;

        const encodedCategory = encodeURIComponent(category);
        if (
          pathname === `/blog/category/${encodedCategory}` ||
          (isAll && pathname === '/blog')
        ) {
          isActive = true;
        }

        return (
          <li key={category}>
            <Link
              href={isAll ? `/blog` : `/blog/category/${category}`}
              className={`px-2 py-0.5 rounded hover:bg-neutral-100 ${
                isActive ? 'text-neutral-900 font-semibold' : 'text-neutral-400'
              }`}
            >
              {category}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default Category;
