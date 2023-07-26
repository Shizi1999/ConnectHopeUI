/* eslint-disable jsx-a11y/iframe-has-title */

import { Carousel, Col, Row } from 'antd';
import images from '~/assets/images';
import contact from '~/constant/contact.img';

export default function Contact() {
  return (
    <div className='container bg-white py-4 my-4 rounded-md shadow-md'>
      <div className='rounded-md shadow-sm '>
        <div className='font-bold text-lg my-4 md:text-xl md:leading-10 text-center'>
          Chung tay - Đồng hành - Vươn xa
        </div>
        <div className='grid grid-cols-1 md:grid-cols-12 gap-5 bg-white py-8 px-5 items-center '>
          <div className='md:col-span-4'>
            <img src={images.logo} alt='' className='md:w-full mx-auto' />
          </div>
          <div className='md:col-span-8'>
            <div className='bg-slate-100 px-6 py-4 rounded-lg shadow-md'>
              <div className='leading-8 mt-2 md:mt-5 text-lg md:text-xl'>
                <div className='text-center'> Nhóm Hành Trình Đồng Hành chúng mình gồm có 7 thành viên:</div>
                <ul className='leading-6 mt-5 text-base'>
                  <li className='mt-2'>Đỗ Minh Mẫn - Nhóm trưởng và Đại diện kết nối của nhóm.</li>
                  <li className='mt-2'>
                    Phan Minh Phát - Thành viên và cũng đảm nhận trách nhiệm trong truyền thông và kiểm duyệt.
                  </li>
                  <li className='mt-2'>Đậu Ngọc Đức - Thành viên và phụ trách thiết kế và quản lý website.</li>
                  <li className='mt-2'>Nguyễn Minh Chánh - Thành viên và phụ trách thiết kế và quản lý website.</li>
                  <li className='mt-2'>Nguyễn Thị Thùy Nhung - Thành viên và phụ trách kiểm duyệt.</li>
                  <li className='mt-2'>Đặng Thanh Hải - Thành viên và đồng thời tham gia truyền thông.</li>
                  <li className='mt-2'>Trần Thế Đức - Thành viên và cũng tham gia truyền thông.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className='font-bold text-lg md:text-xl md:leading-10 text-center my-4'>🌟 Sứ mệnh và mục tiêu</div>
        <div className='bg-slate-100 px-6 py-4 rounded-lg shadow-md h-full '>
          <div className=''>
            <p className='text-lg leading-8   md:text-base'>
              Nhóm Hành Trình Đồng Hành tập trung thực hiện các hoạt động từ thiện đa dạng, nhằm hỗ trợ và giúp đỡ cộng
              đồng. Chúng tôi cam kết đem đến sự ấm áp và niềm vui cho những người khó khăn và cần giúp đỡ.Nhóm Từ Thiện
              chỉ tập trung thực hiện các hoạt động từ thiện đa dạng, nhằm hỗ trợ và giúp đỡ cộng đồng. Chúng tôi cam
              kết đem đến sự ấm áp và niềm vui cho những người khó khăn và cần giúp đỡ.
            </p>
          </div>
        </div>
        <div className=' overflow-hidden'>
          <Carousel>
            {contact.map((url, index) => {
              return (
                <div key={index}>
                  <div
                    style={{
                      margin: 0,
                      marginTop: 10,
                      height: '340px',
                      backgroundImage: `url(${url})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      backgroundSize: 'cover'
                    }}
                  ></div>
                </div>
              );
            })}
          </Carousel>
        </div>

        <div className='font-bold text-lg mb-5 md:text-xl md:leading-10 text-center'>🤝 Liên hệ và hỗ trợ</div>
        <div className='bg-slate-100 px-6 py-4 rounded-lg shadow-md h-full mb-2'>
          <div className='leading-8 mt-2 md:mt-5 text-lg md:text-xl'>
            <p className='text-base'>
              Chúng tôi luôn sẵn sàng tiếp nhận ý kiến đóng góp và sự ủng hộ từ cộng đồng. Để biết thêm thông tin chi
              tiết về các hoạt động từ thiện và cách tham gia, vui lòng liên hệ với chúng tôi qua:
            </p>
            <ul className='leading-6 mt-5 text-xl'>
              <li className='mt-2'>Địa chỉ:Công Viên Phần Mêm Quang Trung</li>
              <li className='mt-2'>Điện thoại: (+84)394252528.</li>
              <li className='mt-2'>Email: example.@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className='map-responsive my-4'>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4435924064755!2d106.62525347415695!3d10.853826357763106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752bee0b0ef9e5%3A0x5b4da59e47aa97a8!2zQ8O0bmcgVmnDqm4gUGjhuqduIE3hu4FtIFF1YW5nIFRydW5n!5e0!3m2!1svi!2s!4v1690175962967!5m2!1svi!2s'
            width={650}
            height={400}
            style={{ border: 0 }}
            allowFullScreen
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
          />
        </div>
      </div>
    </div>
  );
}
