import { Avatar, Dropdown, Table } from 'antd';
import Column from 'antd/es/table/Column';
import { UserOutlined, MoreOutlined } from '@ant-design/icons';

import { Post } from '~/types/post.type';
import { User } from '~/types/user.type';
import PostExpandRow from './PostExpandRow';
import { MenuInfo } from 'rc-menu/lib/interface';
import { useContext } from 'react';
import { AppContext } from '~/context/app.context';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import postApi from '~/api/post.api';
import { handleError, showMessageRespone } from '~/utils/utils';
import adminApi from '~/api/admin.api';
const getMenuItems = (isAdmin: boolean, censored: boolean) => {
  let items = [
    {
      label: 'Chỉnh sửa',
      key: '1'
    },
    {
      label: 'Xóa',
      key: '2'
    }
  ];
  if (isAdmin) {
    items.push({
      label: censored ? 'Hủy phê duyệt' : 'Phê duyệt',
      key: '3'
    });
  }
  return items;
};
function PostTable({
  data,
  isLoading = false,
  users,
  onSuccess = () => {},
  onEdit
}: {
  data: Post[];
  users: User[];
  isLoading?: boolean;
  onSuccess?: () => void;
  onEdit?: (post: Post) => void;
}) {
  const navigate = useNavigate();
  const { profile } = useContext(AppContext);

  const deleteMutation = useMutation({
    mutationFn: (_id: string) => {
      return postApi.delete({ _id });
    },
    onSuccess: (res) => {
      if (res.data.success) {
        onSuccess();
      }
      showMessageRespone(res.data);
    },
    onError: (error) => {
      handleError(error);
    }
  });
  const censoredMutation = useMutation({
    mutationFn: (body: { _id: string; censored: boolean }) => {
      return adminApi.updatePostCensored(body);
    },
    onSuccess: (res) => {
      if (res.data.success) {
        onSuccess();
      }
      showMessageRespone(res.data);
    },
    onError: (error) => {
      handleError(error);
    }
  });
  const handleClickDropdown = ({ key }: MenuInfo, row: Post) => {
    if (key === '1') {
      if (onEdit) {
        onEdit(row);
      } else {
        navigate('/create-update-post/' + row._id);
      }
    } else if (key === '2') {
      deleteMutation.mutate(row._id as string);
    } else if (key === '3') {
      censoredMutation.mutate({ _id: row._id as string, censored: !row.censored });
    }
  };
  return (
    <Table
      loading={isLoading || deleteMutation.isLoading || censoredMutation.isLoading}
      rowKey={'_id'}
      dataSource={[...data]}
      expandable={{
        expandedRowRender: (record: Post) => <PostExpandRow users={users} post={record} />
      }}
    >
      <Column
        title='Ảnh'
        dataIndex={'thumbnail'}
        render={(value: string) => (value ? <Avatar src={value} /> : <Avatar icon={<UserOutlined />} />)}
      />
      <Column sorter={(a: Post, b: Post) => a.title.localeCompare(b.title)} title='Tiêu đề' dataIndex={'title'} />
      <Column
        title='Phê duyệt'
        dataIndex={'censored'}
        filterMultiple={false}
        filters={[
          {
            text: 'Đã phê duyệt',
            value: true
          },
          {
            text: 'Chưa phê duyệt',
            value: false
          }
        ]}
        onFilter={(value: any, record: Post) => record.censored === value}
        render={(value: boolean) =>
          value ? (
            <div className='font-semibold uppercase text-green-500'>Đã phê duyệt</div>
          ) : (
            <div className='font-semibold uppercase text-red-500'>Chưa phê duyệt</div>
          )
        }
      />
      <Column
        title=''
        width={20}
        render={(_, row: Post) => {
          return (
            <Dropdown
              arrow
              trigger={['click']}
              menu={{
                items: getMenuItems(profile?.role === 'admin', row.censored),
                onClick: (e) => {
                  handleClickDropdown(e, row);
                }
              }}
            >
              <div className='flex justify-end px-2 py-2 text-xl cursor-pointer hover:text-orange-600'>
                <MoreOutlined />
              </div>
            </Dropdown>
          );
        }}
      />
    </Table>
  );
}

export default PostTable;
