import { getAuthMe, loginUser } from '@/features/auth/api';
import { AuthMeResponse, LoginRequest } from '@/features/auth/types';
import { ApiResponse } from '@/features/common/types';
import { HttpError } from '@/lib/apiClient';
import { QUERY_STALE_TIME } from '@/shared/constants';
import { UseMutationOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type LoginMutationOptions = UseMutationOptions<ApiResponse, HttpError, LoginRequest>;

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
