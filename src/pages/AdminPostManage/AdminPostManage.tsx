import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import usePostData from '~/hooks/usePostData';
import PostTable from '~/components/PostTable';
import useUserData from '~/hooks/useUserData';
import { Link, createSearchParams, useNavigate } from 'react-router-dom';
import path from '~/constant/path';
import { Post } from '~/types/post.type';

function PostManage() {
  const { data, isLoading, refetch } = usePostData();
  const getAllUser = useUserData();
  const navigate = useNavigate();
  const handleSucces = () => {
    refetch();
  };
  const handleEdit = (post: Post) => {
    navigate({
      pathname: path.createPost.replaceAll('new', '') + post._id,
      search: 'layout=admin'
    });
  };
  return (
    <div className='bg-white px-4 py-4 rounded-md shadow-md'>
      <div className='mb-4'>
        <Link
          to={{
            pathname: path.createPost,
            search: createSearchParams({ layout: 'admin' }).toString()
          }}
        >
          <Button icon={<PlusOutlined />} type='primary'>
            Thêm mới
          </Button>
        </Link>
      </div>
      <div className=''>
        {data && getAllUser.data && (
          <PostTable
            onSuccess={handleSucces}
            onEdit={handleEdit}
            users={getAllUser.data.data.data}
            data={data.data.data}
            isLoading={isLoading || getAllUser.isLoading}
          />
        )}
      </div>
    </div>
  );
}

export default PostManage;
