'use client';
import { useEffect, useRef } from 'react';

export default function Comments() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scriptElem = document.createElement('script');

    scriptElem.async = true;
    scriptElem.setAttribute('src', 'https://giscus.app/client.js');
    scriptElem.setAttribute('data-repo', 'hxezin/hxezin.github.io');
    scriptElem.setAttribute('data-repo-id', 'R_kgDOKIGoOQ');
    scriptElem.setAttribute('data-category', 'Comments');
    scriptElem.setAttribute('data-category-id', 'DIC_kwDOKIGoOc4CY643');
    scriptElem.setAttribute('data-mapping', 'pathname');
    scriptElem.setAttribute('data-strict', '0');
    scriptElem.setAttribute('data-reactions-enabled', '1');
    scriptElem.setAttribute('data-emit-metadata', '0');
    scriptElem.setAttribute('data-input-position', 'top');
    scriptElem.setAttribute('data-lang', 'ko');
    scriptElem.setAttribute('data-loading', 'lazy');
    scriptElem.setAttribute('crossorigin', 'anonymous');

    if (typeof window !== 'undefined') {
      const theme = localStorage.getItem('theme') || 'light';
      scriptElem.setAttribute('data-theme', `${theme}_tritanopia`);
    }

    ref.current?.appendChild(scriptElem);
  }, []);

  const changeGiscusTheme = (theme: string) => {
    const iframe = document.querySelector<HTMLIFrameElement>(
      'iframe.giscus-frame'
    );
    iframe?.contentWindow?.postMessage(
      {
        giscus: {
          setConfig: {
            theme: `${theme}_tritanopia`,
          },
        },
      },
      'https://giscus.app'
    );
  };

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key) {
        changeGiscusTheme(event.key);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return <section ref={ref} />;
}
