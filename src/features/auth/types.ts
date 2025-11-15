import { ApiResponse } from '@/features/common/types';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
}

export interface IUsernameParams {
  username?: string;
}

export interface AuthMeResponse extends ApiResponse {
  data: {
    username: string;
    loggedIn: boolean;
  };
}

export interface UsernameValidateResponse extends ApiResponse {
  data: {
    available: boolean;
  };
}

export interface RegisterResponse extends ApiResponse {
  data: {
    userId: number;
  };
}
