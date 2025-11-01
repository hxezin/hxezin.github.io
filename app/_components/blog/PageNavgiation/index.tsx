'use client';

import ScrollToTop from './ScrollToTop';
import Toc from './Toc';
import { LiaCommentDotsSolid } from 'react-icons/lia';

function PageNavigation() {
  return (
    <nav>
      <Toc />
      <div className='mt-3 border-t border-neutral-200 pt-5'></div>
      <div
        className='page-navigation-button'
        onClick={() => document.querySelector('.giscus')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span>Add a comment</span>
        <LiaCommentDotsSolid />
      </div>
      <ScrollToTop />
    </nav>
  );
}

export default PageNavigation;
