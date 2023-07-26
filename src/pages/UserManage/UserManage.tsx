import { Avatar, Dropdown, Modal, Table } from 'antd';
import Column from 'antd/es/table/Column';
import { UserOutlined, MoreOutlined } from '@ant-design/icons';
import { MenuInfo } from 'rc-menu/lib/interface';

import usePostData from '~/hooks/usePostData';
import useUserData from '~/hooks/useUserData';
import { User } from '~/types/user.type';
import dayjs from 'dayjs';
import { useState } from 'react';
import UserUpdateInfomationForm from '~/components/UserUpdateInfomationForm/UserUpdateInfomationForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import PostTable from '~/components/PostTable';
import adminApi from '~/api/admin.api';
import { handleError, showMessageRespone } from '~/utils/utils';
import LoadingModal from '~/components/Loading/LoadingModal';

function UserManage() {
  const getUser = useUserData();
  const getPost = usePostData();
  const queryClient = useQueryClient();
  const [openModal, setOpenModal] = useState(false);
  const [active, setActive] = useState('');
  const [user, setUser] = useState<User>();
  const handleClickDropdown = ({ key }: MenuInfo, row: User) => {
    if (key === '1' || key === '3') {
      setActive(key);
      setOpenModal(true);
      setUser(row);
    } else if (key === '4') {
      changeUserStatus.mutate({ _id: row._id as string, deleted: !row.deleted });
    } else if (key === '5') {
      changeRole.mutate({ _id: row._id as string, role: row.role === 'admin' ? 'user' : 'admin' });
    } else if (key === '6') {
      deleteUser.mutate(row._id as string);
    }
  };
  const changeUserStatus = useMutation({
    mutationFn: (body: { _id: string; deleted: boolean }) => {
      return adminApi.changeUserStatus(body);
    },
    onSuccess: (res) => {
      if (res.data.success) {
        showMessageRespone(res.data);
        queryClient.invalidateQueries(['getAllUserByAdmin']);
      }
    },
    onError: (error) => {
      handleError(error);
    }
  });
  const deleteUser = useMutation({
    mutationFn: (_id: string) => {
      return adminApi.deleteUser({ _id });
    },
    onSuccess: (res) => {
      if (res.data.success) {
        showMessageRespone(res.data);
        queryClient.invalidateQueries(['getAllUserByAdmin']);
      }
    },
    onError: (error) => {
      handleError(error);
    }
  });
  const changeRole = useMutation({
    mutationFn: (body: { _id: string; role: 'admin' | 'user' }) => {
      return adminApi.changeRole(body);
    },
    onSuccess: (res) => {
      if (res.data.success) {
        showMessageRespone(res.data);
        queryClient.invalidateQueries(['getAllUserByAdmin']);
      }
    },
    onError: (error) => {
      handleError(error);
    }
  });
  const handleUpdateUserSuccess = () => {
    setOpenModal(false);
    queryClient.invalidateQueries(['getAllUserByAdmin']);
  };
  return (
    <div className='bg-white px-4 py-4 rounded-md shadow-md'>
      {getUser.data && (
        <Table dataSource={getUser.data.data.data}>
          <Column
            title='Ảnh'
            dataIndex={'avatar'}
            render={(value: string) => (value ? <Avatar src={value} /> : <Avatar icon={<UserOutlined />} />)}
          />
          <Column
            sorter={(a: User, b: User) => {
              if (a.fullname && b.fullname) {
                return a.fullname.localeCompare(b.fullname);
              }
              return -1;
            }}
            title='Họ và tên'
            dataIndex={'fullname'}
          />
          <Column title='Số điện thoại' dataIndex={'phone'} />
          <Column title='Email' dataIndex={'email'} />
          <Column title='Địa chỉ' dataIndex={'address'} />
          <Column title='Vai trò' dataIndex={'role'} />
          <Column
            title='Ngày sinh'
            dataIndex={'birthday'}
            render={(value: string) => dayjs(value).format('YYYY-MM-DD')}
          />

          <Column
            title='Giới tính'
            dataIndex={'gender'}
            render={(value: 'male' | 'female' | 'other') => {
              switch (value) {
                case 'male':
                  return 'Nam';
                case 'female':
                  return 'Nữ';
                case 'other':
                  return 'Khác';
              }
            }}
          />

          <Column
            title='Trạng thái'
            dataIndex={'deleted'}
            filterMultiple={false}
            filters={[
              {
                text: 'Hoạt động',
                value: false
              },
              {
                text: 'Chặn',
                value: true
              }
            ]}
            onFilter={(value: any, record: User) => record.deleted === value}
            render={(value: boolean) =>
              !value ? (
                <div className='font-semibold uppercase text-green-500'>Hoạt động</div>
              ) : (
                <div className='font-semibold uppercase text-red-500'>Chặn</div>
              )
            }
          />
          <Column
            title=''
            width={20}
            render={(_, row: User) => {
              return (
                <Dropdown
                  arrow
                  trigger={['click']}
                  menu={{
                    items: [
                      {
                        label: 'Chỉnh sửa',
                        key: '1'
                      },
                      {
                        label: 'Bài đăng',
                        key: '2'
                      },
                      {
                        label: 'Tổ chức',
                        key: '3'
                      },
                      {
                        label: row.deleted ? 'Bỏ chặn người dùng' : 'Chặn người dùng',
                        key: '4'
                      },
                      {
                        label: row.role !== 'admin' ? 'Thêm quyền admin' : 'Xóa quyền admin',
                        key: '5'
                      },
                      {
                        label: 'Xóa',
                        key: '6'
                      }
                    ],
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
      )}
      <Modal style={{ top: 10 }} width={1200} open={openModal} footer={null} onCancel={() => setOpenModal(false)}>
        {active === '1' && user && <UserUpdateInfomationForm onSuccess={handleUpdateUserSuccess} user={user as User} />}

        {active === '3' && getPost.data && user && (
          <PostTable
            data={getPost.data?.data.data.filter((organization) => organization.author === user?._id)}
            isLoading={getPost.isLoading}
            users={[user as User]}
          />
        )}
      </Modal>
      {changeUserStatus.isLoading || changeRole.isLoading || (deleteUser.isLoading && <LoadingModal loading />)}
    </div>
  );
}

export default UserManage;
