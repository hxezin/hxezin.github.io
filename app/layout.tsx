import Header from '@/_components/layout/Header';
import './globals.css';
import type { Metadata } from 'next';
import Footer from '@/_components/layout/Footer';
import AnalyticsProvider from '@/_components/AnalyticsProvider';

export const metadata: Metadata = {
  title: '이혜진 블로그',
  openGraph: {
    title: '이혜진 블로그',
    description: '프론트엔드 이혜진 개발 블로그',
  },
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  verification: {
    google: 'ajW_DDkVzItzz_bS6O3BI3DNJDcAj3NnAlwbfgAS3j4',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <AnalyticsProvider>
        <body suppressHydrationWarning={true}>
          <div className='wrapper h-auto min-h-full pb-28 max-w-4xl mx-auto px-4'>
            <Header />
            <main className='py-16'>{children}</main>
          </div>
          <Footer />
        </body>
      </AnalyticsProvider>
    </html>
  );
}
