import React from 'react';

export default function Footer() {
  return (
    <footer className='bg-white pt-16'>
      <div className='container'>
        <div className='mr-4 mb-5 border-b-2'></div>
        <div className='flex'>
          <div className='lg:h-36 lg:w-36 mr-5 sm:w-20  sm:h-16'>
            <img
              className='w-full h-full '
              src='https://media.istockphoto.com/id/1004629556/vi/vec-to/logo-doanh-nghi%E1%BB%87p-%C4%91o%C3%A0n-k%E1%BA%BFt-l%C3%A0m-vi%E1%BB%87c-nh%C3%B3m.jpg?s=612x612&w=0&k=20&c=SufJESCnr3Wm3HF4z0BM26F_6IVIhHg3dw4pFnfwgBU='
              alt=''
            />
          </div>
          <div className='lg:col-span-4'>
            <div className='flex items-center'>
              <div className='flex  text-lg'>
                Nhóm thực hiện: <h1 className='px-2 font-bold '>Hành trình đồng hành</h1>
              </div>
            </div>
            <p>Trường cao đẳng FPT Polytechnic cơ sở 3 Hồ Chí Minh</p>
            <p>Điện thoại: (+84) 028 3911 8430 - 093 305 9191</p>
            <p>Email: info@webtretho.com</p>
            <p>© 2023 ConnectHope-HTDH. Tất cả các quyền được bảo lưu.</p>
          </div>
        </div>
        <p className='italic text-center'>
          Hi vọng rằng sự đoàn kết, sự kỉ luật cao và mục tiêu nhân văn của chúng tôi sẽ lan tỏa đến cộng đồng và góp
          phần tạo nên một thế giới tốt đẹp hơn cho tất cả mọi người.
        </p>
      </div>
    </footer>
  );
}
