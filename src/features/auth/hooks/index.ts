import { getAuthMe, loginUser } from '@/features/auth/api';
import { AuthMeResponse, LoginRequest } from '@/features/auth/types';
import { ApiResponse } from '@/features/common/types';
import { HttpError } from '@/lib/apiClient';
import { QUERY_STALE_TIME } from '@/shared/constants';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useAuthMe = () => {
  return useQuery<AuthMeResponse, HttpError>({
    queryKey: ['auth', 'me'],
    queryFn: getAuthMe,
    staleTime: QUERY_STALE_TIME,
  });
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse, HttpError, LoginRequest>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log(data.message);
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
    },
    onError: (err) => {
      console.error('로그인 실패');
    },
  });
};
