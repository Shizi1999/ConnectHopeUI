import { User } from '~/types/user.type';
import http from './http';
import { SuccessResponse } from '~/types/utils.type';
import { AuthResponse } from '~/types/auth.type';
import { getAccessTokenFromLS } from '~/utils/auth';
import axios from 'axios';

export const URL_LOGIN = 'auth/login';
export const URL_REGISTER = 'auth/register';
export const URL_LOGOUT = 'auth/logout';

const authApi = {
  login(body: User) {
    return http.post<SuccessResponse<AuthResponse>>(URL_LOGIN, body);
  },
  register(body: User) {
    return http.post<SuccessResponse<{}>>(URL_REGISTER, body);
  },
  forgetPassword(body: { email: string }) {
    return http.post<SuccessResponse<{}>>('auth/forget-password', body);
  },
  resetPassword(body: { password: string }) {
    return axios.post<SuccessResponse<{}>>(`${import.meta.env.VITE_REACT_API_URL}/auth/change-password`, body, {
      headers: {
        Authorization: 'Bearer ' + getAccessTokenFromLS()
      }
    });
  }
};

export default authApi;
