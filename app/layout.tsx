import MainNavigation from '@/_components/layout/MainNavigation';
import './globals.css';
import type { Metadata } from 'next';

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
        <MainNavigation />
        <main className='max-w-3xl mx-auto px-4 py-16'>{children}</main>
      </body>
    </html>
  );
}
