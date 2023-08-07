import { Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CountUp from 'react-countup';

import usePostData from '~/hooks/usePostData';
import PostTable from '~/components/PostTable';
import useUserData from '~/hooks/useUserData';
import { Link, createSearchParams, useNavigate } from 'react-router-dom';
import path from '~/constant/path';
import { Post } from '~/types/post.type';
import { useMemo, useState } from 'react';

function PostManage() {
  const { data, isLoading, refetch } = usePostData();
  const [openModal, setOpenModal] = useState(false);
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

  const totalViews = useMemo(() => {
    if (data?.data?.data) {
      return data.data.data.reduce((acc, curr) => {
        return acc + (curr?.views || 0);
      }, 0);
    } else {
      return 0;
    }
  }, [data?.data]);

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
        <Button onClick={() => setOpenModal(true)} disabled={getAllUser.isLoading || isLoading} className='ms-2'>
          Thống kê
        </Button>
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
      {
        <Modal open={openModal} title='Thống kê' footer={null} onCancel={() => setOpenModal(false)}>
          <div className='border-s-4 mb-2 border-blue-500 rounded-sm bg-blue-50 px-4 py-3'>
            <div className='text-lg text-blue-600'>Tổng số bài viết</div>
            <CountUp
              className='text-xl font-semibold text-blue-500'
              redraw={openModal}
              start={0}
              end={data?.data?.data?.length || 0}
            />
          </div>
          <div className='border-s-4 mb-2 border-green-500 rounded-sm bg-green-50 px-4 py-3'>
            <div className='text-lg text-green-600'>Tổng số người dùng</div>
            <CountUp
              className='text-xl font-semibold text-green-500'
              redraw={openModal}
              start={0}
              end={getAllUser?.data?.data?.data?.length || 0}
            />
          </div>
          <div className='border-s-4 mb-2 border-violet-500 rounded-sm bg-violet-50 px-4 py-3'>
            <div className='text-lg text-violet-600'>Tổng số lượt xem</div>
            <CountUp className='text-xl font-semibold text-violet-500' redraw={openModal} start={0} end={totalViews} />
          </div>
        </Modal>
      }
    </div>
  );
}

export default PostManage;
