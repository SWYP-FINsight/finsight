'use client';

import KakaoLogo from '@/assets/icons/kakao-logo.svg';
import { useLoginMutation } from '@/features/auth/hooks';
import { HttpError } from '@/lib/apiClient';
import { CLIENT_KAKAO } from '@/shared/constants';
import Button from '@/shared/ui/button/Button';
import LabelInput from '@/shared/ui/input/LabelInput';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';

interface LoginFormInputs {
  username: string;
  password: string;
}

interface Props {
  onLoginSuccess?: () => void;
  onSwitchToRegister?: () => void;
}

export default function LoginForm({ onLoginSuccess, onSwitchToRegister }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<LoginFormInputs>();

  const loginMutation = useLoginMutation({
    onSuccess: () => {
      reset();
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    },

    onError: (error: HttpError) => {
      setError('root.serverError', {
        type: 'custom',
        message: error.message,
      });
    },
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[1rem]">
      <div>
        <LabelInput
          placeholder="아이디"
          {...register('username', { required: '아이디는 필수입니다.' })}
          isFailed={!!errors.username}
          messageText={errors.username?.message}
        />
      </div>
      <div>
        <LabelInput
          placeholder="비밀번호"
          type="password"
          {...register('password', { required: '비밀번호는 필수입니다.' })}
          isFailed={!!errors.password}
          messageText={errors.password?.message}
        />
      </div>
      {errors.root?.serverError && (
        <p className="text-center text-[1rem] text-red-500">{errors.root.serverError.message}</p>
      )}

      <div className="flex flex-col gap-[1.2rem] mt-[0.8rem]">
        <Button type="submit" className="bg-brand500" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? '로그인 중...' : '로그인'}
        </Button>
        <Button type="button" className="text-[#000] bg-[#FEE500]">
          <Link href={CLIENT_KAKAO} className="flex justify-center items-center gap-[1rem]">
            <KakaoLogo width={18} height={18} />
            카카오 로그인
          </Link>
        </Button>
        <Button type="button" className="bg-gray-100 text-gray900" onClick={onSwitchToRegister}>
          회원가입
        </Button>
      </div>
    </form>
  );
}
