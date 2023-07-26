import { useQuery } from '@tanstack/react-query';
import adminApi from '~/api/admin.api';

function useUserData() {
  const getUserData = useQuery({
    queryKey: ['getAllUserByAdmin'],
    queryFn: () => {
      return adminApi.getAllUser();
    },
    staleTime: 60 * 60 * 1000
  });
  return getUserData;
}

export default useUserData;
