import { Col, Row, Skeleton } from 'antd';

function PostSkeleton() {
  return (
    <Row>
      <Col>
        <div className='my-10 border py-4 px-5  rounded-md shadow-m bg-white'>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <div className='flex items-center justify-center'>
                <Skeleton.Image style={{ height: 400, width: 400 }} active />
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Skeleton active paragraph={{ rows: 12 }} />
            </Col>
          </Row>
        </div>
        <div className='font-medium bg-neutral-100 border py-4 px-5 mt-10 rounded-md shadow-md'>
          <div className='my-2'>Mô tả:</div>
          <Skeleton active paragraph={{ rows: 12 }} />
        </div>
      </Col>
      <Col>
        <div className='font-medium bg-neutral-100 border py-4 px-5 mt-10 rounded-md shadow-md mb-4'>
          <div className='my-2 text-center'>Bài viết liên quan</div>
          <Skeleton active paragraph={{ rows: 6 }} />
        </div>
      </Col>
    </Row>
  );
}

export default PostSkeleton;
