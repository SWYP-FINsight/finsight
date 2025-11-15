import { AuthMeResponse, IUsernameParams, LoginRequest, UsernameValidateResponse } from '@/features/auth/types';
import { ApiResponse } from '@/features/common/types';
import { http } from '@/lib/http';

export const getAuthMe = async () => {
  return http.getData<AuthMeResponse>(`/auth/user/me`);
};

export const loginUser = async (request: LoginRequest) => {
  return http.postData<ApiResponse>(`/auth/user/login`, request);
};

export const checkUsername = async (params: IUsernameParams) => {
  const queryParams = new URLSearchParams(params.username).toString();

  const baseUrl = `/auth/check-username`;
  const finalUrl = queryParams ? `${baseUrl}?${queryParams}` : baseUrl;

  return http.getData<UsernameValidateResponse>(finalUrl);
};
