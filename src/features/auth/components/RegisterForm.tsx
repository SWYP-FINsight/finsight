'use client';

import { useCheckUsernameMutation, useRegisterMutation } from '@/features/auth/hooks';
import { HttpError } from '@/lib/http';
import { cn } from '@/lib/utils';
import MvpButton from '@/shared/ui/button/MvpButton';
import LabelInput from '@/shared/ui/input/LabelInput';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface RegisterFormInputs {
  username: string;
  password: string;
  confirmPassword: string;
}

interface Props {
  onRegisterSuccess?: () => void;
}

export default function RegisterForm({ onRegisterSuccess }: Props) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [messageText, setMessageText] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    watch,
    formState: { errors, isValid },
  } = useForm<RegisterFormInputs>({
    mode: 'onChange',
  });

  const isUsernameFailed = !!errors.username;
  const usernameValue = watch('username');
  const passwordValue = watch('password');

  const registerMutation = useRegisterMutation({
    onSuccess: (data) => {
      onRegisterSuccess?.();
    },
    onError: (error: HttpError) => {
      setError('root.serverError', { message: error.message });
    },
  });

  const checkUsernameMutation = useCheckUsernameMutation({
    onSuccess: (data) => {
      const { available } = data.data;
      if (available) {
        clearErrors('username');
        setIsSuccess(true);
        setMessageText(data.message);
      } else {
        setIsSuccess(false);
        setMessageText(data.message);
        setError('username', { type: 'custom', message: data.message });
      }
    },

    onError: (error: HttpError) => {
      setIsSuccess(false);
      setMessageText(error.message); // API가 보낸 실패 메시지
      setError('username', { type: 'custom', message: error.message });
    },
  });

  const handleCheckUsername = () => {
    const username = getValues('username');
    setIsSuccess(false);
    setMessageText(null);
    clearErrors('username');

    if (!username) {
      setError('username', { message: '아이디를 입력해주세요.' });
      setMessageText('아이디를 입력해주세요.'); // 에러 메시지를 messageText에도 반영
      return;
    }
    checkUsernameMutation.mutate({ username });
  };

  const onUsernameChange = () => {
    if (isSuccess) setIsSuccess(false);
    if (messageText) setMessageText(null);
    if (errors.username?.type === 'custom') {
      clearErrors('username');
    }
  };

  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
    registerMutation.mutate({
      username: data.username,
      password: data.password,
    });
  };

  const isCheckButtonDisabled = !usernameValue || isUsernameFailed || checkUsernameMutation.isPending;
  const isSignUpDisabled = !isValid || !isSuccess || registerMutation.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[2rem]">
      <div className="gap-[1.2rem]">
        <div className="flex flex-col gap-[0.6rem]">
          <h3 className="text-[1.4rem] font-medium text-gray-900">아이디</h3>
          <div className="flex items-center gap-[0.8rem]">
            <input
              placeholder="아이디"
              className={cn(
                'border border-gray-300 rounded-[0.8rem] w-[19.2rem] h-[4.2rem] p-[1.2rem] items-center bg-gray-50',
                'text-[1.4rem] font-regular focus:outline-none focus:placeholder:text-transparent placeholder-gray-300',
                isSuccess && 'border-brand500',
                errors.username && 'border-red-500',
              )}
              {...register('username', {
                required: '아이디는 필수입니다.',
                minLength: {
                  value: 4,
                  message: '아이디는 4자 이상 20자 이하입니다.',
                },
                maxLength: {
                  value: 20,
                  message: '아이디는 4자 이상 20자 이하입니다.',
                },
                onChange: onUsernameChange,
              })}
            />
            <MvpButton
              type="button"
              className={cn(
                'w-[6.8rem] h-[3.8rem] bg-gray-300 text-gray-500 font-medium',
                isCheckButtonDisabled ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-brand500 text-gray-50',
              )}
              onClick={handleCheckUsername}
              disabled={isCheckButtonDisabled}
            >
              {checkUsernameMutation.isPending ? '확인 중' : '중복확인'}
            </MvpButton>
          </div>

          {errors.username && (
            <h4 className={cn('text-[1rem] font-regular text-red-500')}>{errors.username.message}</h4>
          )}

          {isSuccess && messageText && !errors.username && (
            <h4 className={cn('text-[1rem] font-regular text-brand500')}>{messageText}</h4>
          )}
        </div>

        <LabelInput
          labelTitle="비밀번호"
          type="password"
          placeholder="비밀번호"
          inputSize="lg"
          isFailed={!!errors.password}
          messageText={errors.password?.message}
          {...register('password', {
            required: '비밀번호는 필수입니다.',
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/,
              message: '비밀번호는 8자 이상, 영문, 숫자, 특수 문자를 포함해야합니다.',
            },
          })}
        />

        <LabelInput
          labelTitle="비밀번호 확인"
          type="password"
          placeholder="비밀번호 확인"
          inputSize="lg"
          isFailed={!!errors.confirmPassword}
          messageText={errors.confirmPassword?.message}
          {...register('confirmPassword', {
            required: '비밀번호 확인은 필수입니다.',
            validate: (value) => value === passwordValue || '비밀번호가 일치하지 않습니다.',
          })}
        />
      </div>

      <div>
        <MvpButton
          type="submit"
          className={cn(
            'w-full',
            isSignUpDisabled ? 'bg-gray-300 text-gray-500 font-medium cursor-not-allowed' : 'bg-brand500 text-gray-50',
          )}
          disabled={registerMutation.isPending}
        >
          {registerMutation.isPending ? '처리 중...' : '회원가입 하기'}
        </MvpButton>
      </div>

      {errors.root?.serverError && (
        <p className="text-center text-[1rem] text-red-500">{errors.root.serverError.message}</p>
      )}
    </form>
  );
}
