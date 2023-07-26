import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Layout from 'antd/es/layout';
import { FloatButton } from 'antd';

import Header from './Header';
import SideBar from './SideBar';

const { Content } = Layout;

type AdminLayoutProp = {
  children?: React.ReactNode;
  renderChildren?: boolean;
};

function AdminLayout({ children, renderChildren = false }: AdminLayoutProp) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout hasSider style={{ minHeight: '100vh' }}>
      <SideBar collapsed={collapsed} onCollapse={(value: boolean) => setCollapsed(value)} />
      <Layout className='site-layout transition-all' style={{ marginLeft: collapsed ? 80 : 250 }}>
        <Header />
        <Content style={{ padding: '10px' }} className='site-layout'>
          {renderChildren ? children : <Outlet />}
        </Content>
      </Layout>
      <FloatButton.BackTop />
    </Layout>
  );
}

export default AdminLayout;
