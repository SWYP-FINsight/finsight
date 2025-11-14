'use client';

import LogoIcon from '@/assets/icons/finsight-logo.svg';
import LoggedIn from '@/features/auth/components/LoggedIn';
import { useAuthMe } from '@/features/auth/hooks';
import DefaultButton from '@/shared/ui/button/DefaultButton';
import Link from 'next/link';

export default function Header() {
  const { data: response, isLoading } = useAuthMe();
  console.log(response);

  const isLoggedIn = response?.data?.loggedIn === true;
  const username = response?.data?.username;

  return (
    <header className="flex w-full p-[1.6rem] justify-between items-center">
      <Link href="/">
        <LogoIcon />
      </Link>
      <div>
        {isLoading ? (
          <h3>로딩중</h3>
        ) : isLoggedIn ? (
          <LoggedIn username={username} />
        ) : (
          <DefaultButton text="로그인" color="brand500" textColor="gray-50" />
        )}
      </div>
    </header>
  );
}
