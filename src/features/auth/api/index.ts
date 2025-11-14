import { AuthMeResponse, LoginRequest } from '@/features/auth/types';
import { ApiResponse } from '@/features/common/types';
import { http } from '@/lib/http';

export const getAuthMe = async () => {
  return http.getData<AuthMeResponse>(`/auth/user/me`);
};

export const loginUser = async (request: LoginRequest) => {
  return http.postData<ApiResponse>(`/auth/user/login`, request);
};
