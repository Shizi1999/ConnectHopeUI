import { useMemo, useState } from 'react';
import { UserOutlined, SnippetsOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { MenuProps } from 'antd/es/menu';
import { useLocation, useNavigate } from 'react-router-dom';
import path from '~/constant/path';
const { Sider, Header } = Layout;

function SideBar({
  collapsed = false,
  onCollapse = () => {}
}: {
  collapsed?: boolean;
  onCollapse?: (value: boolean) => void;
}) {
  const location = useLocation().pathname;
  const [current, setCurrent] = useState(location);
  const navigate = useNavigate();

  const changeTab = (path: string) => {
    navigate(path);
  };

  function handleClickMenu(e: any) {
    setCurrent(e.key);
  }

  const menuItems: MenuProps['items'] = useMemo(() => {
    return [
      {
        key: path.adminUser,
        icon: <UserOutlined />,
        label: 'Tài khoản',
        onClick: () => {
          changeTab(path.adminUser);
        }
      },
      {
        key: path.adminPost,
        icon: <SnippetsOutlined />,
        label: 'Bài viết',
        onClick: () => {
          changeTab(path.adminPost);
        }
      }
    ];
  }, []);

  return (
    <Sider
      width={250}
      theme='light'
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0
      }}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => onCollapse(value)}
    >
      <Header style={{ padding: '0', background: 'rgb(245 245 245)' }}>
        <div className='flex items-center border-b border-gray-100' style={{ height: '100%', paddingRight: 1 }}>
          <div
            className={`w-full flex h-full text-lg overflow-hidden text-center items-center bg-white text-orange-600 ${
              collapsed ? ' justify-center' : ' justify-start ps-7'
            }`}
          >
            <div>{collapsed ? 'Admin' : 'Adminitrator'}</div>
          </div>
        </div>
      </Header>
      <Menu
        onClick={handleClickMenu}
        mode='inline'
        style={{ padding: '10px 0' }}
        theme='light'
        items={menuItems}
        selectedKeys={[current]}
      />
    </Sider>
  );
}

export default SideBar;
