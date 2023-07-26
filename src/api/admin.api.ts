import { SuccessResponse } from '~/types/utils.type';
import http from './http';
import { User } from '~/types/user.type';
import { Post } from '~/types/post.type';

const adminApi = {
  getAllPost() {
    return http.get<SuccessResponse<Post[]>>('admin/post');
  },
  getAllUser() {
    return http.get<SuccessResponse<User[]>>('admin/user');
  },
  updatePostCensored(body: { _id: string; censored: boolean }) {
    return http.patch<SuccessResponse<{}>>('admin/censored-post', body);
  },

  changeUserStatus(body: { _id: string; deleted: boolean }) {
    return http.patch<SuccessResponse<{}>>('admin/block-user', body);
  },
  getPostByUserId(_id: string) {
    return http.get<SuccessResponse<Post[]>>('admin/user-post', { params: { _id } });
  },
  deleteUser(body: { _id: string }) {
    return http.delete<SuccessResponse<{}>>('admin/delete-user', { data: body });
  },
  changeRole(body: { _id: string; role: 'admin' | 'user' }) {
    return http.patch<SuccessResponse<{}>>('admin/change-role', body);
  }
};
export default adminApi;
