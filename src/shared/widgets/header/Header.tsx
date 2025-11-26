'use client';

import LogoIcon from '@/assets/icons/finsight-logo.svg';
import LoggedIn from '@/features/auth/components/LoggedIn';
import LoginForm from '@/features/auth/components/LoginForm';
import RegisterForm from '@/features/auth/components/RegisterForm';
import { useAuthMe } from '@/features/auth/hooks';
import DefaultButton from '@/shared/ui/button/DefaultButton';
import AlertModal from '@/shared/ui/modal/AlertModal';
import FormModal from '@/shared/ui/modal/FormModal';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type ModalType = 'login' | 'register' | 'registerSuccess' | null;

export default function Header() {
  const { data: response, isLoading } = useAuthMe();
  const isLoggedIn = response?.data?.loggedIn === true;
  const username = response?.data?.username;

  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const openLoginModal = () => setActiveModal('login');
  const openRegisterModal = () => setActiveModal('register');
  const closeModal = () => setActiveModal(null);

  const router = useRouter();

  return (
    <header className="flex w-full p-[1.6rem] justify-between items-center">
      <button className="cursor-pointer" type="button" onClick={() => router.push('/')}>
        <LogoIcon />
      </button>
      <div>
        {isLoading ? (
          <h3>로딩중</h3>
        ) : isLoggedIn ? (
          <LoggedIn username={username} />
        ) : (
          <DefaultButton text="로그인" color="brand500" textColor="gray-50" onClick={openLoginModal} />
        )}
      </div>
      <FormModal isOpen={activeModal === 'login'} onClose={closeModal} title="로그인">
        <LoginForm onLoginSuccess={closeModal} onSwitchToRegister={openRegisterModal} />
      </FormModal>
      <FormModal isOpen={activeModal === 'register'} onClose={closeModal} title="회원가입" onBack={openLoginModal}>
        <RegisterForm onRegisterSuccess={() => setActiveModal('registerSuccess')} />
      </FormModal>
      <AlertModal isOpen={activeModal === 'registerSuccess'} onClose={closeModal} modalType="success">
        회원가입이 완료되었습니다.
      </AlertModal>
    </header>
  );
}
