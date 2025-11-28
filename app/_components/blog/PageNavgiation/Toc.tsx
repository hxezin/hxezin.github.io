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
      <div className='mb-1 mt-10 text-sm font-medium text-primary'>On this page</div>
      <ul className='max-h-[70vh] space-y-2.5 overflow-y-auto py-2 text-sm'>
        {headingEls.map((heading, idx) => (
          <li key={idx} data-depth={heading.nodeName === 'H2' ? '1' : '2'}>
            <a
              href={`#${heading.id}`}
              className={`block leading-[1.6] hover:text-primary ${
                heading.nodeName !== 'H2' && 'pl-3'
              } ${currentId === heading.id ? 'text-accent' : 'text-secondary'}`}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(heading.id);
                if (element) {
                  const headerOffset = 80; // 헤더 높이 64px + 여유 16px
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.scrollY - headerOffset;

                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth',
                  });
                }
              }}
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
