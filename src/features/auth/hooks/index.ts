import { getAuthMe } from '@/features/auth/api';
import { AuthMeResponse } from '@/features/auth/types';
import { HttpError } from '@/lib/apiClient';
import { QUERY_STALE_TIME } from '@/shared/constants';
import { useQuery } from '@tanstack/react-query';

export const useAuthMe = () => {
  return useQuery<AuthMeResponse, HttpError>({
    queryKey: ['auth', 'me'],
    queryFn: getAuthMe,
    staleTime: QUERY_STALE_TIME,
  });
};
