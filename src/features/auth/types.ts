import { ApiResponse } from '@/features/common/types';

export interface AuthMeResponse extends ApiResponse {
  data: {
    username: string;
    loggedIn: boolean;
  };
}
