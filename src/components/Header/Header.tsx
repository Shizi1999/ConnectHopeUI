import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '~/context/app.context';
import { Avatar, Button, Drawer, Empty, Input, Popover } from 'antd';
import { useMutation } from '@tanstack/react-query';
import path from '~/constant/path';
import { clearLS } from '~/utils/auth';
import images from '~/assets/images';
import { generatePostUrl, getColorByName, handleError } from '~/utils/utils';
import { Post } from '~/types/post.type';
import homeApi from '~/api/home.api';

export default function Header() {
  const { isAuthenticated, setIsAuthenticated, setProfile, profile } = useContext(AppContext);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [searchResult, setSearchResult] = useState<Post[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const { Search } = Input;
  const logoutMutation = useMutation({
    mutationFn: async (data) => {
      await clearLS();
      setIsAuthenticated(false);
      setProfile(null);
      navigate(path.home);
    }
  });

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error('Lỗi xảy ra trong quá trình đăng xuất:', error);
    }
  };

  const searchMutation = useMutation({
    mutationFn: () => {
      return homeApi.search(searchValue);
    },
    onSuccess: (res) => {
      if (res.data.success) {
        setSearchResult(res.data.data);
        setShowSearchResult(true);
      }
    },
    onError: (error) => {
      handleError(error);
    }
  });

  const handleSearch = (value: string) => {
    setSearchValue(value);
    searchMutation.mutate();
  };

  const content = (
    <div className='cursor-pointer w-[220px] '>
      <div className='flex items-center py-3 pl-4 text-sm'>{profile?.fullname || profile?.email}</div>
      <div className='mr-4 border-b-2 border-gray-300 mb-1'></div>
      {profile?.role === 'admin' && (
        <Link to={path.adminUser} className='block w-full px-4 py-2 text-left hover:bg-slate-100 rounded-md'>
          <span className='text-black font-medium'>Admin</span>
        </Link>
      )}
      <Link to={path.me} className='block w-full px-4 py-2 text-left hover:bg-slate-100 rounded-md'>
        <span className='text-black font-medium'>Tài Khoản của tôi</span>
      </Link>
      <Link to={path.meManagePost} className='block w-full px-4 py-2 text-left hover:bg-slate-100 rounded-md'>
        <span className='text-black font-medium'>Quản lý bài viết</span>
      </Link>
      <button onClick={handleLogout} className='block w-full px-4 py-2 text-left hover:bg-slate-100 rounded-md'>
        Đăng xuất
      </button>
    </div>
  );

  const contentSearch = (
    <div className='bg-white w-[780px] xs sm:w-[320px] md:[420px] border-none rounded-none '>
      {searchResult.length > 0 ? (
        searchResult.map((item) => (
          <Link
            onClick={() => setShowSearchResult(false)}
            key={item._id}
            to={generatePostUrl(item)}
            state={{ post: item }}
          >
            <div className='text-gray-800'>{item.title}</div>
          </Link>
        ))
      ) : (
        <Empty />
      )}
    </div>
  );
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className='bg-orange-500 py-3 text-white shadow-md '>
      <div className='container'>
        <div className='flex items-center sm:relative'>
          <div className='items-center text-center overflow-hidden'>
            <div className='w-16 h-16 rounded-full '>
              <Link to={path.home}>
                {' '}
                <img className='w-full h-full ' src={images.logonotext} alt='' />
              </Link>
            </div>
          </div>
          <div className='flex-1 item-center '>
            <Popover
              className='sm:hidden'
              open={showSearchResult}
              onOpenChange={(open) => {
                if (showSearchResult) {
                  setShowSearchResult(false);
                }
              }}
              trigger={'click'}
              content={contentSearch}
              arrow={false}
              placement='bottomLeft'
            >
              <Search
                loading={searchMutation.isLoading}
                onSearch={handleSearch}
                placeholder='Nhập tên cá nhân hoặc tổ chức'
                size='large'
                style={{ width: 'full' }}
                enterButton
              />
            </Popover>
          </div>
          <div className='md:hidden sm:flex sm:mx-2 '>
            <Button type='primary' onClick={showDrawer}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
              </svg>
            </Button>
            <Drawer title='Menu' placement='right' onClose={onClose} open={open} width={'300px'}>
              <div className='flex flex-col w-[100%] mx-2 '>
                <Link to='/' onClick={() => setOpen(false)} className='text-lg me-6 leading-8 mt-2  '>
                  <div className='text-black hover:bg-gray-100'>Trang chủ</div>
                </Link>
                <Link to={path.blog} onClick={() => setOpen(false)} className=' text-black text-lg me-6 leading-8 mt-2'>
                  <div className='text-black hover:bg-gray-100'>Bài viết</div>
                </Link>
                <Link to={path.contact} onClick={() => setOpen(false)} className=' text-lg me-6 leading-8 mt-2'>
                  <div className='text-black hover:bg-gray-100'>Liên hệ</div>
                </Link>
              </div>
              {!isAuthenticated ? (
                <div className='text-lg flex-col mx-2  '>
                  <Link to={path.register} className=' hover:text-white/70 mt-5  leading-8'>
                    <div className='text-blue-600 hover:bg-gray-100'>Đăng ký</div>
                  </Link>
                  <div className=' border-r-[1px] border-r-white/40 '></div>
                  <Link to={path.login} className=' hover:text-white/70 mt-5 leading-8'>
                    <div className='text-blue-600 hover:bg-gray-100'>Đăng nhập</div>
                  </Link>
                </div>
              ) : (
                <div className='flex items-center mx-2    '>
                  <Popover content={content} placement='bottomLeft'>
                    <div
                      style={{ padding: 1 }}
                      className='rounded-full border bg-gray-200 cursor-pointer hover:bg-gray-300'
                    >
                      {!profile?.avatar ? (
                        <Avatar
                          style={{ backgroundColor: getColorByName(profile?.fullname || (profile?.email as string)) }}
                        >
                          {profile?.fullname?.charAt(0) || profile?.email?.charAt(0)}
                        </Avatar>
                      ) : (
                        <Avatar src={profile?.avatar} />
                      )}
                    </div>
                  </Popover>
                </div>
              )}
            </Drawer>
          </div>
          {!isAuthenticated ? (
            <div className='items-center ms-4 hidden md:flex  '>
              <Link to={path.register} className='mx-3 text-base  hover:text-white/70 '>
                Đăng ký
              </Link>
              <div className='h-4 border-r-[1px] border-r-white/40 '></div>
              <Link to={path.login} className='mx-3 text-base  hover:text-white/70 '>
                Đăng nhập
              </Link>
            </div>
          ) : (
            <div className='flex items-center justify-end ms-4 sm:hidden md:flex   '>
              <Popover content={content} placement='bottomLeft'>
                <div
                  style={{ padding: 1 }}
                  className='rounded-full border bg-gray-200 cursor-pointer hover:bg-gray-300'
                >
                  {!profile?.avatar ? (
                    <Avatar
                      style={{ backgroundColor: getColorByName(profile?.fullname || (profile?.email as string)) }}
                    >
                      {profile?.fullname?.charAt(0) || profile?.email?.charAt(0)}
                    </Avatar>
                  ) : (
                    <Avatar src={profile?.avatar} />
                  )}
                </div>
              </Popover>
            </div>
          )}
        </div>

        <div className='hidden md:block   '>
          <Link to='/' className='hover:text-orange-200 text-lg me-6'>
            Trang chủ
          </Link>
          <Link to={path.blog} className='hover:text-orange-200 text-lg me-6'>
            Bài viết
          </Link>
          <Link to={path.contact} className='hover:text-orange-200 text-lg me-6'>
            Liên hệ
          </Link>
        </div>
      </div>
    </div>
  );
}
