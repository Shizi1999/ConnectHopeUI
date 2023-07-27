/* eslint-disable jsx-a11y/alt-text */
import { Avatar, Col, Empty, Image, Row } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import homeApi from '~/api/home.api';
import { Post } from '~/types/post.type';
import { generatePostUrl, getColorByName, getIdFromName } from '~/utils/utils';
import PostSkeleton from './components/PostSkeleton';
import { User } from '~/types/user.type';
import dayjs from 'dayjs';

const total = 8;
export default function Post() {
  let { id } = useParams();
  if (id) {
    id = getIdFromName(id);
  }
  const [randomPost, setRandomPost] = useState<Post[]>([]);
  const [post, setPost] = useState<Post>();
  const [author, setAuthor] = useState<User>();
  const { isLoading } = useQuery({
    queryKey: ['fetchPost', id],
    queryFn: () => {
      return homeApi.getPostById(id as string);
    },
    onSuccess: (res) => {
      setPost(res?.data.data);
    }
  });

  const fetchAuthor = useMutation({
    mutationFn: (id: string) => {
      return homeApi.getAuthor(id);
    },
    onSuccess: (res) => {
      if (res.data.success) {
        setAuthor(res.data.data);
      }
    }
  });

  useEffect(() => {
    if (post) {
      fetchAuthor.mutate(post.author);
    } else {
      setAuthor(undefined);
    }
  }, [post]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    if (id && !id.includes('id')) {
      homeApi.updateView(id);
    }
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

  if (!id) {
    return (
      <div className='container my-10 py-24 border  px-5 bg-neutral-100  rounded-md shadow-md'>
        <Empty />
      </div>
    );
  }

  return (
    <div className='container-fluid py-8 leading-7'>
      {isLoading ? (
        <PostSkeleton />
      ) : (
        <div>
          <Row gutter={[8, 8]}>
            <Col xs={24} sm={24} md={24} lg={16} xl={16}>
              {post && (
                <>
                  <div className=''>
                    <div className='font-bold text-gray-700 text-3xl mb-4'>{post.title}</div>
                    <div className='my-2 rounded-md overflow-hidden '>
                      <img className='w-full aspect-video' src={post.thumbnail} />
                    </div>
                    {!author && (
                      <div className='flex items-center my-4 flex-wrap italic text-gray-500'>
                        <div>Ngày đăng: {dayjs(post.updatedAt).format('DD-MM-YYYY')}</div>
                        <span className='mx-2'>|</span>
                        <div>Lượt xem: {post.views}</div>
                      </div>
                    )}
                    {post.shortDescription && (
                      <div className='rounded-md bg-red-50 px-4 py-4 my-2 border-l-4 border-pink-600'>
                        {author && (
                          <div className='flex items-center my-4'>
                            <div className='me-2'>
                              {author?.avatar ? (
                                <Avatar size={56} src={author?.avatar} />
                              ) : (
                                <Avatar
                                  size={56}
                                  style={{
                                    backgroundColor: getColorByName(author?.fullname || (author?.email as string))
                                  }}
                                >
                                  {author?.fullname?.charAt(0) || author?.email?.charAt(0)}
                                </Avatar>
                              )}
                            </div>
                            <div className='flex flex-col justify-between'>
                              <div>{author?.fullname ? author.fullname : 'Ẩn danh'}</div>
                              <div className='flex items-center flex-wrap italic text-gray-500'>
                                <div>Ngày đăng: {dayjs(post.updatedAt).format('DD-MM-YYYY')}</div>
                                <span className='mx-2'>|</span>
                                <div>Lượt xem: {post.views}</div>
                              </div>
                            </div>
                          </div>
                        )}
                        {post.shortDescription}
                      </div>
                    )}
                    <div
                      className='font-normal post-des'
                      dangerouslySetInnerHTML={{ __html: post.description || '' }}
                    ></div>
                  </div>
                </>
              )}
            </Col>
            <Col xs={24} sm={24} md={24} lg={8} xl={8}>
              {post && (
                <div className='w-full mt-2'>
                  <h4 className='font-bold text-lg mb-4'>Bài viết liên quan</h4>
                  <div>
                    <Row gutter={[8, 8]}>
                      {Array.isArray(randomPost) &&
                        randomPost
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
                                      <div className='rounded-md overflow-hidden mt-2.5'>
                                        <img src={post.thumbnail} className='aspect-video' />
                                      </div>
                                    </Col>
                                    <Col span={16}>
                                      <div className='flex flex-col h-full justify-between '>
                                        <div className='line-clamp-[3]'>{post.shortDescription}</div>
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
                </div>
              )}
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}
