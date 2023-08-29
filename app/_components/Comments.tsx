'use client';

import { useEffect, useRef } from 'react';

export default function Comments() {
  const ref = useRef<HTMLDivElement>(null);
  const theme = 'light_tritanopia';

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;

    const scriptElem = document.createElement('script');
    scriptElem.src = 'https://giscus.app/client.js';
    scriptElem.async = true;
    scriptElem.crossOrigin = 'anonymous';

    scriptElem.setAttribute('data-repo', 'hxezin/hxezin.github.io');
    scriptElem.setAttribute('data-repo-id', 'R_kgDOKIGoOQ');
    scriptElem.setAttribute('data-category', 'Comments');
    scriptElem.setAttribute('data-category-id', 'DIC_kwDOKIGoOc4CY643');
    scriptElem.setAttribute('data-mapping', 'pathname');
    scriptElem.setAttribute('data-strict', '0');
    scriptElem.setAttribute('data-reactions-enabled', '1');
    scriptElem.setAttribute('data-emit-metadata', '0');
    scriptElem.setAttribute('data-input-position', 'top');
    scriptElem.setAttribute('data-theme', theme);
    scriptElem.setAttribute('data-lang', 'en');
    ref.current.appendChild(scriptElem);
  }, []);

  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>(
      'iframe.giscus-frame'
    );
    iframe?.contentWindow?.postMessage(
      { giscus: { setConfig: { theme } } },
      'https://giscus.app'
    );
  }, [theme]);

  return <section ref={ref} />;
}
