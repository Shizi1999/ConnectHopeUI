import { useQuery } from '@tanstack/react-query';
import { Button, Card, Col, Row, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Post } from '~/types/post.type';
import { generatePostUrl } from '~/utils/utils';

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
    <div className='container py-6 lg:py-12 '>
      <div className='bg-white px-5 rounded-md shadow-md'>
        {title && (
          <div className='mb-10 md:mb-16'>
            <h2 className='pb-2 pt-5 text-center text-2xl font-bold text-gray-600 md:mb-6 lg:text-3xl'>
              Kết Nối Hy Vọng
            </h2>
            <p className='text-center px-2 font-mono text-gray-700'>&ldquo;{title}&rdquo;</p>
          </div>
        )}
        <Skeleton active={isLoading} loading={isLoading}>
          <Row gutter={[24, 25]}>
            {Array.isArray(posts) &&
              posts
                ?.filter((_, index) => index < rate * total)
                .map((post) => (
                  <Col xs={24} sm={12} md={12} lg={8} xl={8} key={post._id}>
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
                        <div
                          className='w-full h-44 sm:h-44 md:h-52 lg:h-64 bg-center bg-cover'
                          style={{ backgroundImage: `url(${post.thumbnail})` }}
                        ></div>
                        <span className='font-bold text-center my-1'>{post.title}</span>
                        <div className='line-clamp-[9] text-center'>&ldquo;{post.shortDescription}&rdquo;</div>
                      </Card>
                    </Link>
                  </Col>
                ))}
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
