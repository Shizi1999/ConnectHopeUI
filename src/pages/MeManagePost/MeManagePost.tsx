import { useQuery } from '@tanstack/react-query';
import userApi from '~/api/user.api';
import PostTable from '~/components/PostTable';
import useAppContext from '~/hooks/useAppContext';
import path from '~/constant/path';
import { PlusOutlined } from '@ant-design/icons';
import { Link, createSearchParams } from 'react-router-dom';
import { Button } from 'antd';

function MeManagePostl() {
  const { profile } = useAppContext();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['userGetOrganization'],
    queryFn: () => {
      return userApi.getPost();
    }
  });
  const handleSucces = () => {
    refetch();
  };

  return (
    <div className='bg-white px-4 py-4 rounded-md shadow-md'>
      <div className='mb-4'>
        <Link
          to={{
            pathname: path.createPost,
            search: createSearchParams({ layout: 'user' }).toString()
          }}
        >
          <Button icon={<PlusOutlined />} type='primary'>
            Thêm mới
          </Button>
        </Link>
      </div>
      {data?.data.data && profile && (
        <PostTable onSuccess={handleSucces} users={[profile]} data={data.data.data} isLoading={isLoading} />
      )}
    </div>
  );
}

export default MeManagePostl;
