import { Col, Row } from 'antd';
import UserLayoutSidebar from './components/UserLayoutSidebar';

function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-gray-100 py-8'>
      <div className='container-fluid'>
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={24} md={8} lg={6}>
            <div className='hidden md:block bg-white rounded-md shadow-sm'>
              <UserLayoutSidebar />
            </div>
          </Col>
          <Col xs={24} sm={24} md={16} lg={18}>
            {children}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default UserLayout;
