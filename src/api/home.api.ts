import { SuccessResponse } from '~/types/utils.type';
import http from './http';
import { Post } from '~/types/post.type';
import { User } from '~/types/user.type';
const homeApi = {
  getAllPost() {
    return http.get<SuccessResponse<Post[]>>('public/posts');
  },
  getPostById(id: string) {
    return http.get<SuccessResponse<Post>>('public/post', { params: { id } });
  },
  search(searchValue: string) {
    return http.get<SuccessResponse<Post[]>>('public/search', { params: { searchValue } });
  },
  getAuthor(_id: string) {
    return http.get<SuccessResponse<User>>('public/author', { params: { _id } });
  },
  updateView(_id: string) {
    return http.get<SuccessResponse<{}>>('public/post-view', { params: { _id } });
  }
};
export default homeApi;
