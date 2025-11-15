import { checkUsername, getAuthMe, loginUser, registerUser } from '@/features/auth/api';
import {
  AuthMeResponse,
  IUsernameParams,
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
  UsernameValidateResponse,
} from '@/features/auth/types';
import { ApiResponse } from '@/features/common/types';
import { HttpError } from '@/lib/apiClient';
import { QUERY_STALE_TIME } from '@/shared/constants';
import { UseMutationOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type LoginMutationOptions = UseMutationOptions<ApiResponse, HttpError, LoginRequest>;
type CheckUsernameMutationOptions = UseMutationOptions<UsernameValidateResponse, HttpError, IUsernameParams>;
type RegisterMutationOptions = UseMutationOptions<RegisterResponse, HttpError, RegisterRequest>;

export const useAuthMe = () => {
  return useQuery<AuthMeResponse, HttpError>({
    queryKey: ['auth', 'me'],
    queryFn: getAuthMe,
    staleTime: QUERY_STALE_TIME,
  });
};

export const useLoginMutation = (options?: Omit<LoginMutationOptions, 'mutationFn'>) => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, HttpError, LoginRequest>({
    mutationFn: loginUser,
    onSuccess: (data, variables, context, ...rest) => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
      options?.onSuccess?.(data, variables, context, ...rest);
    },
    onError: (error, ...rest) => {
      options?.onError?.(error, ...rest);
    },
  });
};

export const useCheckUsernameMutation = (options?: Omit<CheckUsernameMutationOptions, 'mutationFn'>) => {
  return useMutation<UsernameValidateResponse, HttpError, IUsernameParams>({
    mutationFn: (params) => checkUsername(params),
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
};

export const useRegisterMutation = (options?: Omit<RegisterMutationOptions, 'mutationFn'>) => {
  return useMutation<RegisterResponse, HttpError, RegisterRequest>({
    mutationFn: registerUser,
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
