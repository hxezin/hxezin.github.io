import { useEffect, useState } from 'react';

const observerOption = {
  threshold: 0,
  rootMargin: '0px 0px -80% 0px',
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

    return () => {
      headings.forEach((heading) => {
        observer.unobserve(heading);
      });
    };
  }, []);

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
