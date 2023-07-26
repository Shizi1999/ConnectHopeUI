import PostList from '~/components/PostList/PostList';
import homeApi from '~/api/home.api';
import { Post } from '~/types/post.type';

export default function Blog() {
  const fetchBlogData = async () => {
    const response = await homeApi.getAllPost();
    return response.data.data as Post[];
  };

  return (
    <div className='bg-gray-100'>
      <PostList
        title='Nền tảng "Kết nối hy vọng" - Lan tỏa yêu thương, chia sẻ niềm vui! Tạo cơ hội tham gia tình nguyện từ thiện cho các tổ chức và tâm huyết tình nguyện viên đam mê sẻ chia. Tìm kiếm và đăng tải thông tin về những mảnh đời cần giúp đỡ, để cùng nhau xây dựng một thế giới ấm áp và đầy ý nghĩa. Hãy cùng nhau lan tỏa niềm tin và hy vọng, để tình người luôn là nguồn gốc của sức mạnh!'
        fetchDataFn={fetchBlogData}
      />
    </div>
  );
}
