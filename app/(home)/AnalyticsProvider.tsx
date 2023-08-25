import Script from 'next/script';
import * as gtag from '@/_libs/gtag';
import { isDev } from '@/_libs/core';

interface Props {
  children: React.ReactNode;
}

function AnalyticsProvider({ children }: Props) {
  if (!isDev)
    return (
      <>
        {children}
        <Script
          id='google-analytics-js-cdn'
          src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
          strategy='afterInteractive'
        ></Script>
        <Script
          id='google-analytics'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
              transport_url: '${gtag.REPORT_DOMAIN}',
              first_party_collection: true
            });
        `,
          }}
        ></Script>
      </>
    );

  return children;
}

export default AnalyticsProvider;
