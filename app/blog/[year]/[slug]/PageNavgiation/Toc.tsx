import { useEffect, useState } from 'react';

const observerOption = {
  threshold: 0,
  rootMargin: '-20% 0px -80% 0px',
};

function Toc() {
  const [currentId, setCurrentId] = useState('');
  const [headingEls, setHeadingEls] = useState<Element[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const { id } = entry.target;
          setCurrentId(id);
        }
      });
    }, observerOption);

    const headings = Array.from(document.querySelectorAll('h2, h3'));
    setHeadingEls(headings);

    headings.forEach((heading) => {
      observer.observe(heading);
    });

    const hash = window.location.hash;

    if (hash) {
      const decodedHash = decodeURIComponent(hash.substring(1));
      const targetSection = document.getElementById(decodedHash);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop,
          behavior: 'smooth',
        });

        setTimeout(() => {
          setCurrentId(decodedHash);
        }, 500);
      }
    }
  }, []);

  const handleLinkClick = (id: string) => {
    setCurrentId(id);
  };

  return (
    <>
      <div className='text-neutral-950 mb-1 mt-10 text-sm font-medium'>
        On this page
      </div>
      <ul className='space-y-2.5 overflow-y-auto py-2 text-sm max-h-[70vh]'>
        {headingEls.map((heading, idx) => (
          <li key={idx} data-depth={heading.nodeName === 'H2' ? '1' : '2'}>
            <a
              href={`#${heading.id}`}
              className={`block leading-[1.6] hover:text-neutral-950 ${
                heading.nodeName !== 'H2' && 'pl-3'
              } ${
                currentId === heading.id
                  ? 'text-indigo-400'
                  : 'text-neutral-400'
              }`}
              onClick={() => handleLinkClick(heading.id)}
            >
              {heading.textContent}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Toc;
