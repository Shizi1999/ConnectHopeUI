import { SuccessResponse } from '~/types/utils.type';
import http from './http';
import { Post } from '~/types/post.type';
const homeApi = {
  getAllPost() {
    return http.get<SuccessResponse<Post[]>>('public/posts');
  },
  getPostById(id: string) {
    return http.get<SuccessResponse<Post>>('public/post', { params: { id } });
  },
  search(searchValue: string) {
    return http.get<SuccessResponse<Post[]>>('public/search', { params: { searchValue } });
  }
};
export default homeApi;
