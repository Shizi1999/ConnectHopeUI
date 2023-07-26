import { useContext } from 'react';
import { Avatar, Badge, Breadcrumb, Layout, Popover } from 'antd';
import { AppContext } from '~/context/app.context';
import { BellOutlined, MailOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';

import { Link, useLocation } from 'react-router-dom';
import path from '~/constant/path';
import { getColorByName } from '~/utils/utils';

const HeaderIcon = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div
      className={`cursor-pointer flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 hover:text-orange-600 transition-all ${className}`}
    >
      {children}
    </div>
  );
};

const userContents = ['Change password', 'Lock screen', 'Logout'];

function Header() {
  const { profile } = useContext(AppContext);
  const { pathname } = useLocation();
  return (
    <Layout.Header style={{ padding: 0, backgroundColor: '#f5f5f5', margin: '6px 0' }}>
      <div className='px-3 h-full flex'>
        <div className='bg-white px-6 flex-1 rounded-sm shadow-md flex items-cente justify-between'>
          <div className='flex items-center'>
            <Breadcrumb>
              <Breadcrumb.Item className='text-base'>
                <Link to={path.home}>Home</Link>
              </Breadcrumb.Item>
              {pathname &&
                pathname
                  .substring(1)
                  .split('/')
                  .map((item, index) => {
                    return (
                      <Breadcrumb.Item className='text-base' key={index}>
                        <span className='capitalize'>{item}</span>
                      </Breadcrumb.Item>
                    );
                  })}
            </Breadcrumb>
          </div>
          <div className='flex items-center'>
            <HeaderIcon className='me-2'>
              <Badge count={2} offset={[2, -4]}>
                <BellOutlined className='text-xl' />
              </Badge>
            </HeaderIcon>
            <HeaderIcon className='me-2'>
              <Badge count={10} offset={[2, -4]}>
                <MailOutlined className='text-xl' />
              </Badge>
            </HeaderIcon>
            <Popover
              placement='bottomRight'
              content={
                <div>
                  {userContents.map((item, index) => {
                    return (
                      <div key={index} className='py-2 px-2 text-base hover:bg-gray-100 cursor-pointer rounded-md'>
                        {item}
                      </div>
                    );
                  })}
                </div>
              }
            >
              <div className='flex items-center cursor-pointer px-2 py-1 border bg-gray-100 rounded-3xl'>
                {!profile?.avatar ? (
                  <Avatar src={profile?.avatar} />
                ) : (
                  <Avatar style={{ backgroundColor: getColorByName(profile?.fullname || (profile?.email as string)) }}>
                    {profile?.fullname?.charAt(0) || profile?.email?.charAt(0)}
                  </Avatar>
                )}
                <div className='ms-2 me-1 text-base font-semibold text-gray-600'>
                  {profile?.fullname || profile?.email}
                </div>
              </div>
            </Popover>
            <HeaderIcon className='ms-2'>
              <LogoutOutlined className='-rotate-90' />
            </HeaderIcon>
          </div>
        </div>
      </div>
    </Layout.Header>
  );
}

export default Header;
