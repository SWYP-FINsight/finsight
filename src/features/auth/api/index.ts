import {
  AuthMeResponse,
  IUsernameParams,
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
  UsernameValidateResponse,
} from '@/features/auth/types';
import { ApiResponse } from '@/features/common/types';
import { http } from '@/lib/http';

export const getAuthMe = async () => {
  return http.getData<AuthMeResponse>(`/auth/me`);
};

export const loginUser = async (request: LoginRequest) => {
  return http.postData<ApiResponse>(`/auth/login`, request);
};

export const checkUsername = async (params: IUsernameParams) => {
  const queryParams = new URLSearchParams(params as Record<string, string>).toString();

  const baseUrl = `/auth/check-username`;
  const finalUrl = queryParams ? `${baseUrl}?${queryParams}` : baseUrl;

  return http.getData<UsernameValidateResponse>(finalUrl);
};

export const registerUser = async (request: RegisterRequest) => {
  return http.postData<RegisterResponse>(`/auth/signup`, request);
};

export const logout = async () => {
  return http.postData<ApiResponse>(`/auth/logout`, {});
};
