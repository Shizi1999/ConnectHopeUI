import { Col, Empty, Row } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import homeApi from '~/api/home.api';
import { Post } from '~/types/post.type';
import dayjs from 'dayjs';
import { generatePostUrl, getIdFromName } from '~/utils/utils';
import PostSkeleton from './components/PostSkeleton';

const total = 8;
export default function Post() {
  let { id } = useParams();
  if (id) {
    id = getIdFromName(id);
  }
  const [randomPost, setRandomPost] = useState<Post[]>([]);
  const [post, setPost] = useState<Post>();
  const { isLoading } = useQuery({
    queryKey: ['fetchPost', id],
    queryFn: () => {
      return homeApi.getPostById(id as string);
    },
    onSuccess: (res) => {
      setPost(res?.data.data);
    }
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [id]);

  const fetchAllPost = useQuery({
    queryKey: ['fetchAllPost'],
    queryFn: () => {
      return homeApi.getAllPost();
    }
  });

  const getRandomPosts = (posts: Post[], n: number): Post[] => {
    const randomPosts: Post[] = [];
    const copyPosts: Post[] = [...posts];
    while (randomPosts.length < n && copyPosts.length > 0) {
      const randomIndex = Math.floor(Math.random() * copyPosts.length);
      const randomPost = copyPosts[randomIndex];
      randomPosts.push(randomPost);
      copyPosts.splice(randomIndex, 1);
    }
    return randomPosts;
  };

  useEffect(() => {
    if (fetchAllPost.data) {
      const posts = getRandomPosts(fetchAllPost.data.data.data, 4);
      setRandomPost(posts);
    }
  }, [fetchAllPost.data]);

  const postImage = useMemo(() => {
    if (post) {
      return 'avatar' in post ? post.avatar : 'thumbnail' in post ? post.thumbnail : undefined;
    }
    return undefined;
  }, [post]);

  if (!id) {
    return (
      <div className='container my-10 py-24 border  px-5 bg-neutral-100  rounded-md shadow-md'>
        <Empty />
      </div>
    );
  }

  return (
    <div className='container-fluid mb-10 leading-7'>
      {isLoading ? (
        <PostSkeleton />
      ) : (
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={24} md={24} lg={16} xl={16}>
            {post && (
              <>
                <div className='font-medium  py-4 px-5 mt-10 '>
                  <div className='font-normal' dangerouslySetInnerHTML={{ __html: post.description || '' }}></div>
                  <div className=''>
                    <div className='py-4'>
                      <div className='mb-4 flex'>
                        <span className='w-24 me-2 inline-block font-semibold'>Người đăng:</span>
                        <span className='flex-1'>{post.title}</span>
                      </div>
                      {post.shortDescription && <div className='mb-4 flex'>{post.shortDescription}</div>}
                    </div>
                  </div>
                </div>
              </>
            )}
          </Col>
          <Col xs={24} sm={24} md={24} lg={8} xl={8}>
            {post && (
              <div className='my-10 w-full '>
                <h4 className='font-bold text-lg mb-4'>Bài viết liên quan</h4>
                <div>
                  {randomPost.map((post) => (
                    <Link className='my-2 ' key={post._id} to={generatePostUrl(post)} state={{ post }}>
                      <div className='text-gray-800  px-1 py-2 rounded-md'>
                        <Row gutter={[8, 8]} className='items-center'>
                          <Col span={6}>
                            <div className='flex items-center justify-center'>
                              <img className='block' src={post.thumbnail || ''} />
                            </div>
                          </Col>
                          <Col span={18}>
                            <div className='flex flex-col justify-between'>
                              <span className='font-bold  my-1'>{post.title}</span>
                              <div className='line-clamp-2'>&ldquo;{post.shortDescription}&rdquo;</div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </Col>
        </Row>
      )}
    </div>
  );
}
