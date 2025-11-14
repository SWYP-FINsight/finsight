import { AuthMeResponse } from '@/features/auth/types';
import { http } from '@/lib/http';

export const getAuthMe = async () => {
  return http.getData<AuthMeResponse>(`/auth/me`);
};
