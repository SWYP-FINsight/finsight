import './globals.css';
import QueryProvider from '@/providers/QueryProvider';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

const pretendard = localFont({
  src: '../assets/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'FINsight',
  icons: {
    icon: '/favicon.png',
  },
  description: '초심자들을 위한 나만의 맞춤형 투자 콘텐츠 Collector.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} min-h-screen flex flex-col relative`}>
        <div className="bg-gray-100">
          <QueryProvider>{children}</QueryProvider>
        </div>
      </body>
    </html>
  );
}
