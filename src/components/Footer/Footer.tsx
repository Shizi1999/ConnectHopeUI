import React from 'react';
import logonotext from '~/assets/images/logonotext.png';

export default function Footer() {
  return (
    <footer className='bg-white pt-16'>
      <div className='container'>
        <div className='mr-4 mb-5 border-b-2'></div>
        <div className='flex'>
          <div className='lg:h-36 lg:w-36 mr-5 sm:w-20  sm:h-16 xsft'>
            <img className='w-full h-full ' src={logonotext} alt='' />
          </div>
          <div className='lg:col-span-4'>
            <div className='flex items-center'>
              <div className='flex  text-lg'>
                <div className=' font-bold '>Hành trình đồng hành</div>
              </div>
            </div>
            <p>Trường cao đẳng FPT Polytechnic cơ sở 3 Hồ Chí Minh</p>
            <p>Điện thoại: (+84) 028 3911 8430 - 093 305 9191</p>
            <p>Ủng hộ: </p>
            <p>STK MB - Bank: 03003002610</p>
            <p>Người nhận: Đỗ Minh Mẫn</p>
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
