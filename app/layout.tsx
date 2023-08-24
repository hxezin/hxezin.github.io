import Header from '@/_components/layout/Header';
import './globals.css';
import type { Metadata } from 'next';
import Footer from '@/_components/layout/Footer';

export const metadata: Metadata = {
  title: '이혜진 블로그',
  openGraph: {
    title: '이혜진 블로그',
    description: '프론트엔드 이혜진 개발 블로그',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body suppressHydrationWarning={true}>
        <div className='wrapper h-auto min-h-full pb-28 max-w-3xl mx-auto px-4'>
          <Header />
          <main className='py-16'>{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
