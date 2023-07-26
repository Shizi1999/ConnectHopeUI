import { SuccessResponse } from '~/types/utils.type';
import http from './http';
import { Post } from '~/types/post.type';

const postApi = {
  create(body: FormData) {
    console.log('Hello world');

    return http.post<SuccessResponse<{}>>('post/create', body, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  update(body: FormData) {
    return http.put<SuccessResponse<Post>>('post/update', body, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  delete(body: { _id: string }) {
    return http.delete<SuccessResponse<{}>>('post/delete', { data: body });
  },
  getById(id: string) {
    return http.get<SuccessResponse<Post>>('post/' + id);
  }
};
export default postApi;
