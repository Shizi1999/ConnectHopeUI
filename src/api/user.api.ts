import { SuccessResponse } from '~/types/utils.type';
import http from './http';
import { User } from '~/types/user.type';
import { Post } from '~/types/post.type';

const userApi = {
  getPost() {
    return http.get<SuccessResponse<Post[]>>('user/post');
  },

  updateUser(body: FormData) {
    return http.put<SuccessResponse<User>>('user/update', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};

export default userApi;
