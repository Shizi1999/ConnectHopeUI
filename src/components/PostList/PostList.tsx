import { useQuery } from '@tanstack/react-query';
import { Breadcrumb, Button, Card, Col, Row, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Post } from '~/types/post.type';
import { generatePostUrl } from '~/utils/utils';
import path from '~/constant/path';
import dayjs from 'dayjs';

interface PostListProps {
  rate?: number;
  fetchDataFn: () => Promise<Post[]>;
  title?: string;
}

// eslint-disable-next-line react/prop-types
const PostList: React.FC<PostListProps> = ({ rate = 16, fetchDataFn, title }) => {
  const [total, setTotal] = useState(1);
  const { data, isLoading } = useQuery<Post[]>({
    queryKey: ['fetchPost'],
    queryFn: fetchDataFn
  });

  const handleShowMore = () => {
    setTotal((prev) => prev + 1);
  };

  const posts = (data || []) as Post[];

  return (
    <div className='container-fluid py-6 lg:py-12 '>
      <Breadcrumb
        separator='|'
        items={[
          {
            title: <Link to={path.home}>Trang chủ</Link>
          },

          {
            title: <span>Bài viết</span>
          }
        ]}
      />
      <div>
        {title && (
          <div className='mb-10 md:mb-16'>
            <h2 className='pb-2 pt-5 text-center text-2xl font-bold text-gray-600 md:mb-6 lg:text-3xl'>
              Kết Nối Hy Vọng
            </h2>
            <p className='text-center px-2 font-mono text-gray-700'>&ldquo;{title}&rdquo;</p>
          </div>
        )}
        <Skeleton active={isLoading} loading={isLoading}>
          <Row gutter={[8, 8]}>
            <Col xs={24} sm={24} md={24} lg={16} xl={16}>
              <Row gutter={[16, 16]}>
                {Array.isArray(posts) &&
                  posts
                    ?.filter((_, index) => index < rate * total)
                    .map((post) => (
                      <Col xs={24} sm={12} md={12} lg={12} xl={12} key={post._id}>
                        <Link to={generatePostUrl(post)} state={{ post }}>
                          <Card
                            className='hover:shadow-md'
                            style={{ height: '100%' }}
                            bodyStyle={{
                              padding: 10,
                              display: 'flex',
                              flexDirection: 'column'
                            }}
                          >
                            <img src={post.thumbnail} className='aspect-video' />
                            <span className='font-bold text-center my-1'>{post.title}</span>
                            <div className='line-clamp-[6]'>{post.shortDescription}</div>
                          </Card>
                        </Link>
                      </Col>
                    ))}
              </Row>
            </Col>
            <Col xs={24} sm={24} md={24} lg={8} xl={8}>
              <h3 className='text-lg font-semibold text-orange-500'>Bài viết liên quan</h3>
              <div>
                <Row gutter={[8, 8]}>
                  {Array.isArray(posts) &&
                    posts
                      ?.filter((_, index) => index < 3)
                      .map((post) => (
                        <Col xs={24} sm={12} md={12} lg={24} xl={24} key={post._id}>
                          <Link to={generatePostUrl(post)} state={{ post }}>
                            <div className='px-1 py-2 rounded-md text-gray-500 border-b'>
                              <div className='font-bold text-gray-800 text-base my-1 line-clamp-1 mb-2'>
                                {post.title}
                              </div>
                              <Row gutter={[8, 8]} className='items-start'>
                                <Col span={8}>
                                  <div className='rounded-md overflow-hidden mt-1'>
                                    <img src={post.thumbnail} className='aspect-video' />
                                  </div>
                                </Col>
                                <Col span={16}>
                                  <div className='flex flex-col h-full justify-between '>
                                    <div className='line-clamp-[4]'>{post.shortDescription}</div>
                                  </div>
                                </Col>
                              </Row>
                              <div className='mt-2'>Ngày đăng: {dayjs(post.updatedAt).format('DD-MM-YYYY')}</div>
                            </div>
                          </Link>
                        </Col>
                      ))}
                </Row>
              </div>
            </Col>
          </Row>
        </Skeleton>
        <div className='mt-5 text-center py-2 px-2'>
          {data?.length && data?.length > rate * total && <Button onClick={handleShowMore}>Show more</Button>}
        </div>
      </div>
    </div>
  );
};

export default PostList;
