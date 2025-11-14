'use client';

import { useLoginMutation } from '@/features/auth/hooks';
import MvpButton from '@/shared/ui/button/MvpButton';
import LabelInput from '@/shared/ui/input/LabelInput';
import { SubmitHandler, useForm } from 'react-hook-form';

interface LoginFormInputs {
  username: string;
  password: string;
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const loginMutation = useLoginMutation();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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

      <div className="flex gap-[0.8rem]">
        <MvpButton type="submit" className="bg-[#3ED4E0]" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? '로그인 중...' : '로그인'}
        </MvpButton>

        <MvpButton type="button" className="bg-brand500">
          회원가입
        </MvpButton>
      </div>
    </form>
  );
}
