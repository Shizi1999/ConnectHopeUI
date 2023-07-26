import axios, { AxiosError } from 'axios';
import HttpStatusCode from '~/constant/httpStatusCode.enum';
import { ErrorResponse, SuccessResponse } from '~/types/utils.type';
import backendErrorCode from '~/constant/backendErrorCode';
import { message } from 'antd';
import slugify from 'slugify';
import { Post } from '~/types/post.type';

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error);
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity;
}

export function isAxiosUnauthorizedError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized;
}

export function isAxiosExpiredTokenError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return (
    isAxiosUnauthorizedError<ErrorResponse<{}>>(error) &&
    error.response?.data?.errorCode === backendErrorCode.TOKEN_EXPIRED
  );
}
export const showMessageRespone = (res: SuccessResponse<any>) => {
  if (res.success) {
    message.success(res.message);
  } else {
    message.error(res.message || 'error');
  }
};
export const handleError = (error: any) => {
  if (error?.response?.data?.message) {
    message.error(error?.response?.data?.message);
  }
};
export function getColorByName(name: String) {
  const firstCharacter = name.charAt(0) || '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let arr = characters.match(/.{1,2}/g);
  let colors = [
    '#ef4444',
    '#fb923c',
    '#db2777',
    '#84cc16',
    '#16a34a',
    '#10b981',
    '#14b8a6',
    '#06b6d4',
    '#0ea5e9',
    '#2563eb',
    '#4f46e5',
    '#8b5cf6',
    '#a855f7',
    '#d946ef'
  ];
  if (Array.isArray(arr)) {
    for (let i = 0; i < arr?.length; i++) {
      if (arr[i].includes(firstCharacter.toUpperCase())) {
        return colors[i];
      }
    }
  }
  return colors.at(-1);
}

export function generatePostUrl(post: Post) {
  return '/post/' + slugify(post.title).toLowerCase() + '-' + post._id;
}

export function getIdFromName(name: string) {
  return name.split('-')?.at(-1);
}
