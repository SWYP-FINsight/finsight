'use client';

import LoginForm from '@/features/auth/components/LoginForm';
import RegisterForm from '@/features/auth/components/RegisterForm';
import DefaultButton from '@/shared/ui/button/DefaultButton';
import AlertModal from '@/shared/ui/modal/AlertModal';
import FormModal from '@/shared/ui/modal/FormModal';
import { useState } from 'react';

type ModalType = 'login' | 'register' | 'registerSuccess' | null;

export default function CollectionLoggedOut() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const openLoginModal = () => setActiveModal('login');
  const openRegisterModal = () => setActiveModal('register');
  const closeModal = () => setActiveModal(null);

  return (
    <>
      <div className="w-full justify-center items-center flex flex-col gap-[2rem] h-dvh">
        <div className="flex w-full flex-col justify-center items-center gap-[1.6rem]">
          <div className="flex flex-col gap-[0.8rem]">
            <h3 className="text-gray-900 text-center text-18 font-bold">로그인이 필요한 서비스입니다.</h3>
            <h4 className="text-gray-900 text-center text-14 font-regular">
              관심 컬렉션을 만들어 맞춤 뉴스를 확인할 수 있어요.
            </h4>
          </div>
          <DefaultButton text="로그인" color="brand500" textColor="gray-50" onClick={openLoginModal} />
        </div>
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
    </>
  );
}
