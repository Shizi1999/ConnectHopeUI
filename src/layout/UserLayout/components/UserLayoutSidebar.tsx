import { UserOutlined, LogoutOutlined, SnippetsOutlined } from '@ant-design/icons';

import path from '~/constant/path';
import useAppContext from '~/hooks/useAppContext';
import ActiveRoute from '~/components/ActiveRoute';
import { Avatar } from 'antd';
import { getColorByName } from '~/utils/utils';

function UserLayoutSidebar() {
  const { profile } = useAppContext();
  const items = [
    {
      title: 'Thông tin cá nhân',
      icon: <UserOutlined />,
      to: path.me
    },
    {
      title: 'Quản lý bài viết',
      icon: <SnippetsOutlined />,
      to: path.meManagePost
    }
  ];

  return (
    <div className='bg-primary rounded-md py-2 px-2'>
      <div className='flex items-center pb-4 flex-col'>
        <div className='mt-2 text-base font-semibold text-primary'>
          <div style={{ padding: 1 }} className='rounded-full flex justify-center'>
            {!profile?.avatar ? (
              <Avatar
                size={96}
                style={{ backgroundColor: getColorByName(profile?.fullname || (profile?.email as string)) }}
              >
                {profile?.fullname?.charAt(0) || profile?.email?.charAt(0)}
              </Avatar>
            ) : (
              <Avatar size={96} src={profile?.avatar} />
            )}
          </div>
          {profile?.fullname ? profile.fullname : profile?.email}
        </div>
      </div>
      <div className='nav-link'>
        {items.map(({ title, icon, to }, index) => {
          return (
            <ActiveRoute key={index} to={to}>
              <div className='flex py-3 px-2 border-t items-center rounded-sm text-base transition-all hover:bg-gray-100 text-gray-700'>
                <span>{icon}</span>
                <span className='block ms-4'>{title}</span>
              </div>
            </ActiveRoute>
          );
        })}
        <div className='flex cursor-pointer text-primary py-3 px-2 border-t items-center rounded-sm text-base transition-all hover:bg-gray-100 text-gray-700'>
          <span>
            <LogoutOutlined />
          </span>
          <span className='block ms-4'>Đăng xuất</span>
        </div>
      </div>
    </div>
  );
}

export default UserLayoutSidebar;
