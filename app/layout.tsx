import Header from '@/_components/layout/Header';
import './globals.css';
import type { Metadata } from 'next';
import Footer from '@/_components/layout/Footer';
import AnalyticsProvider from '@/_components/AnalyticsProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const setTheme = `
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark');
          document.body.dataset.theme = 'dark';
        } else {
          document.documentElement.classList.remove('dark');
          document.body.dataset.theme = 'light';
        }
      `;

  return (
    <html lang='ko' suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AnalyticsProvider>
          <div className='flex min-h-screen flex-col'>
            <Header />
            <div className='wrapper mx-auto w-full max-w-4xl flex-1 px-4'>
              <main className='py-16'>{children}</main>
            </div>
            <Footer />
          </div>
        </AnalyticsProvider>
        <script dangerouslySetInnerHTML={{ __html: setTheme }} />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL('https://hxezin.github.io'),
  title: {
    template: '%s',
    default: '개발자 이혜진',
  },
  description: '프론트엔드 개발자 이혜진 블로그',
  openGraph: {
    title: '개발자 이혜진',
    description: '프론트엔드 개발자 이혜진 블로그',
    url: 'https://hxezin.github.io/',
    siteName: '개발자 이혜진',
  },
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  verification: {
    google: 'ajW_DDkVzItzz_bS6O3BI3DNJDcAj3NnAlwbfgAS3j4',
  },
};
