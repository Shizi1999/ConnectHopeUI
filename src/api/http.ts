import axios, { AxiosError, type AxiosInstance } from 'axios';
import { message as antMessage } from 'antd';
import { clearLS, getAccessTokenFromLS, setAccessTokenToLS, setProfileToLS } from '~/utils/auth';
import config from '~/constant/config';
import { isAxiosUnauthorizedError } from '~/utils/utils';
import { ErrorResponse } from 'src/types/utils.type';
import { URL_LOGIN, URL_LOGOUT } from './auth.api';

export class Http {
  instance: AxiosInstance;
  private accessToken: string;
  constructor() {
    this.accessToken = getAccessTokenFromLS();
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    this.instance.interceptors.request.use(
      (config) => {
        const locale = localStorage.getItem('locale') || 'en';
        config.headers['Accept-Language'] = locale;
        if (this.accessToken && config.headers) {
          config.headers.Authorization = 'Bearer ' + this.accessToken;
          return config;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;
        if (url === URL_LOGIN) {
          const data = response.data.data;
          if (response.data.success) {
            this.accessToken = data.access_token;
            setAccessTokenToLS(data.access_token);
            setProfileToLS(data.user);
          }
        } else if (url === URL_LOGOUT) {
          this.accessToken = '';
          clearLS();
        }
        return response;
      },
      (error: AxiosError) => {
        if (isAxiosUnauthorizedError<ErrorResponse<{}>>(error)) {
          clearLS();
          this.accessToken = '';
          antMessage.error('Hết phiên làm việc. Vui lòng đăng nhập lại');
          // window.location.reload();
        }
        return Promise.reject(error);
      }
    );
  }
}
const http = new Http().instance;
export default http;
