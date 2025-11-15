import { ApiResponse } from '@/features/common/types';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthMeResponse extends ApiResponse {
  data: {
    username: string;
    loggedIn: boolean;
  };
}
