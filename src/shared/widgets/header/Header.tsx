'use client';

import LogoIcon from '@/assets/icons/finsight-logo.svg';
import LoggedIn from '@/features/auth/components/LoggedIn';
import LoginForm from '@/features/auth/components/LoginForm';
import { useAuthMe } from '@/features/auth/hooks';
import DefaultButton from '@/shared/ui/button/DefaultButton';
import FormModal from '@/shared/ui/modal/FormModal';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const { data: response, isLoading } = useAuthMe();
  const isLoggedIn = response?.data?.loggedIn === true;
  const username = response?.data?.username;

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

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
          <DefaultButton text="로그인" color="brand500" textColor="gray-50" onClick={openLoginModal} />
        )}
      </div>
      <FormModal isOpen={isLoginModalOpen} onClose={closeLoginModal} title="로그인">
        <LoginForm />
      </FormModal>
    </header>
  );
}
