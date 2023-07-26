import { useQuery } from '@tanstack/react-query';
import adminApi from '~/api/admin.api';

function usePostData() {
  const getPostData = useQuery({
    queryKey: ['getAllPostByAdmin'],
    queryFn: () => {
      return adminApi.getAllPost();
    },
    staleTime: 60 * 60 * 1000
  });
  return getPostData;
}

export default usePostData;
