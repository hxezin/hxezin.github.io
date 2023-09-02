'use client';

import ScrollToTop from './ScrollToTop';
import Toc from './Toc';
import { LiaCommentDotsSolid } from 'react-icons/lia';

function PageNavigation() {
  return (
    <nav className='hidden md:block sticky top-0 self-start w-52'>
      <Toc />
      <div className='mt-3 border-t border-neutral-200 pt-5'></div>
      <div
        className='flex items-center gap-1 text-sm text-neutral-400 cursor-pointer'
        onClick={() =>
          document
            .querySelector('.giscus')
            ?.scrollIntoView({ behavior: 'smooth' })
        }
      >
        <span>Add a comment</span>
        <LiaCommentDotsSolid />
      </div>
      <ScrollToTop />
    </nav>
  );
}

export default PageNavigation;
