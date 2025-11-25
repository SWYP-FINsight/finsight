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
  description:
    '내가 관심있어 하는 정보, 나의 자산과 직접적인 관련이 있는 금융 정보들만 놓치지 않고 따끈따끈하게 소화하고 싶지 않으신가요? FINsight와 함께라면 간단한 키워드 설정만으로 나에게 꼭 필요한, 최신의 투자 관련 뉴스들을 하나의 플랫폼에서 모두 받아보세요!',
  openGraph: {
    title: 'FINsight',
    description:
      '내가 관심있어 하는 정보, 나의 자산과 직접적인 관련이 있는 금융 정보들만 놓치지 않고 따끈따끈하게 소화하고 싶지 않으신가요? FINsight와 함께라면 간단한 키워드 설정만으로 나에게 꼭 필요한, 최신의 투자 관련 뉴스들을 하나의 플랫폼에서 모두 받아보세요!',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FINsight',
      },
    ],
    url: 'https://finsight-publish.vercel.app/',
    type: 'website',
  },
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
