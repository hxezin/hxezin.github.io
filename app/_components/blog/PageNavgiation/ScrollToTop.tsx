import React, { useState, useEffect } from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai';

const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <>
      {showTopBtn && (
        <div className='mt-2 page-navigation-button' onClick={goToTop}>
          <span>Scroll to top</span>
          <AiOutlineArrowUp />
        </div>
      )}
    </>
  );
};
export default ScrollToTop;
