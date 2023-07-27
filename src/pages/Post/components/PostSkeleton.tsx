import { Col, Row, Skeleton } from 'antd';

function PostSkeleton() {
  return (
    <div>
      <div className='flex items-center justify-center mb-6'>
        <Skeleton.Image style={{ height: 400, width: 1240 }} active />
      </div>
      <Row gutter={[8, 8]}>
        <Col xs={24} sm={24} md={24} lg={16} xl={16}>
          <Skeleton active paragraph={{ rows: 12 }} />
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <Skeleton active paragraph={{ rows: 6 }} />
        </Col>
      </Row>
    </div>
  );
}

export default PostSkeleton;
