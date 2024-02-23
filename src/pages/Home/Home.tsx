/* eslint-disable jsx-a11y/alt-text */
import { Col, Row, Skeleton } from 'antd';
import images from '~/assets/images';
import SlickCarousel from '~/components/SlickCarousel/SlickCarousel';
import list from '~/constant/list';

function Home() {
  return (
    <div className='bg-gray-100 py-10'>
      <div>
        <div className='container'>
          <div className='grid grid-cols-1 md:grid-cols-3  h-auto w-full text-white'>
            <div className='bg-[#1169b0] flex flex-col p-4 rounded-sm shadow-md'>
              <div className='text-2xl leading-10 mt-3'>Chung tay giúp đỡ</div>
              <span className='font-bold my-3 text-xl'>Trẻ em mồ côi &amp; người vô gia cư</span>
              <span className='mt-3 text-base'>Thành phố Hồ Chí Minh</span>
            </div>
            <div className='bg-[#f27227] flex flex-col p-4 rounded-sm shadow-md'>
              <div className='text-2xl leading-10 mt-3'>Chung tay chia sẻ</div>
              <span className='mt-4 text-base leading-10'>
                Chia sẻ những hoàn cảnh khó khăn để nhiều người được biết, được giúp
              </span>
            </div>
            <div className='bg-[#16b14b] flex flex-col p-4 rounded-sm shadow-md'>
              <div className='text-2xl leading-10 mt-3'>Góp phần</div>
              <span className='mt-4 text-base leading-10'>Góp phần giúp cuộc sống xã hội thêm tươi đẹp hơn</span>
            </div>
          </div>
        </div>
        <div className='container bg-gray-100 my-4 '>
          <div className='rounded-md shadow-sm'>
            <div className='grid grid-cols-1 md:grid-cols-12 gap-5 bg-white py-5 px-5'>
              <div className='md:col-span-6 flex flex-col justify-center items-center'>
                <img src={images.logo} alt='' className='md:w-full mx-auto' />
                <img src={images.qr} alt='' className='w-25 h-25' />
              </div>
              <div className='md:col-span-6'>
                <div className='font-bold text-2xl mb-5 md:text-4xl md:leading-10'>
                  Hành trình đồng hành - Connect Hope
                </div>
                <div className='leading-8 mt-2 md:mt-5 text-lg md:text-xl'>
                  Tụi mình là sinh viên kì 6 của trường Cao đẳng FPT. Hiện tại tụi mình đang học môn Phát triển cá nhân
                  2 lớp DM17314. Tụi mình mang đến môn này 1 dự án đầy tình yêu thương. Dự án của chúng mình mang tên:
                </div>
                <div className='mt-4 text-gray-400 font-bold text-xl md:text-2xl'>Connect Hope “Kết nối hi vọng“</div>
                <p className='mt-4 text-base leading-6 md:text-lg'>
                  Dự án chúng tôi tập trung chia sẻ yêu thương với những người gặp khó khăn, đặc biệt là trẻ em nghèo,
                  người vô gia cư, và những người khuyết tật không thể lao động. Trở thành cầu nối giữa người cần giúp
                  đỡ và những người có thể giúp là mục tiêu của dự án của chúng tôi. Chúng tôi muốn lan tỏa câu chuyện
                  của họ, nâng đỡ và cứu giúp hoàn cảnh khó khăn này. Hy vọng rằng thông tin lan toả sẽ lan tỏa tình yêu
                  và lòng nhân ái mạnh mẽ hơn, giúp những người gặp khó khăn có thêm cơ hội và hy vọng trong cuộc sống.
                  Hãy cùng nhau lan tỏa điều tốt đẹp, xây dựng một cộng đồng đầy ấm áp và sẻ chia.
                </p>
              </div>
            </div>
          </div>

          <Row className='mt-5 mb-5 bg-white'>
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <div className='flex items-start'>
                <img src={images.icon} alt='' className='w-36 h-36' />
                <div className='p-4'>
                  <div className='text-xl mt-4'>Tình cảm của bạn</div>
                  <p className='leading-7 text-base text-neutral-400'>
                    Thể hiện tình cảm của bạn bằng những hành động nhỏ nhoi như chia sẻ những bài hoàn cảnh khó khăn đến
                    với mọi người, cung cấp thông tin những người có hoàn cảnh khó khăn với chúng mình
                  </p>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <div className='flex items-start'>
                <div className='w-36 h-36 items-center flex justify-center'>
                  <img src={images.icontien} className='w-[82px] h-[82px] -translate-y-3' />
                </div>
                <div className='p-4 flex-1'>
                  <div className='text-xl mt-4'>Sự ủng hộ của bạn</div>
                  <p className='leading-7 text-base text-neutral-400'>
                    Hãy trở thành nhà tài trợ và tạo ra ảnh hưởng bền vững trong cuộc sống của những hoàn cảnh khó khăn.
                    Việc tài trợ của bạn có thể thay đổi một phần tương lai cho họ. Bằng cách hợp tác với chúng mình.
                    Hãy cùng chúng mình xây dựng một tương lai tươi sáng thông qua sự tài trợ hào phóng của bạn.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
          <div className='mt-5 mb-5 px-5'>
            <div className='text-3xl uppercase font-mono text-center'>Mục tiêu của chúng tôi</div>
            <p className='text-center leading-10 text-base text-gray-500'>
              Trang web này đã được tạo ra với mục tiêu cao cả là giúp đỡ nhiều hoàn cảnh khó khăn. Chúng tôi cam kết
              cống hiến thời gian, nỗ lực và tài nguyên của mình để hỗ trợ những người gặp khó khăn trong cuộc sống. Qua
              trang web này, chúng tôi mong muốn tạo ra những hoạt động và sự kiện nhằm gây quỹ, quyên góp và phát triển
              các chương trình hỗ trợ cộng đồng. Điều quan trọng nhất, mục tiêu cuối cùng của chúng tôi là mang lại hy
              vọng và tạo ra những thay đổi tích cực cho những người cần sự giúp đỡ. Chúng tôi hy vọng rằng qua trang
              web này, chúng ta có thể kết nối với nhau, lan tỏa tinh thần yêu thương và sẻ chia, và cùng nhau tạo nên
              những ảnh hưởng đáng kể đối với cộng đồng và cuộc sống của những người gặp khó khăn. Hãy cùng nhau hướng
              về tương lai đầy hi vọng và hành động vì một cộng đồng đoàn kết, mạnh mẽ và tích cực ❤️.
            </p>
          </div>
        </div>
        <div className='bg-white py-5 px-5 my-4  container'>
          <SlickCarousel
            setting={{
              slidesToShow: 4,
              slidesToScroll: 1,
              responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1
                  }
                }
              ]
            }}
          >
            {list.map((imageUrl, index) => (
              <div key={index}>
                <img
                  src={imageUrl}
                  alt={`Slide ${index + 1}`}
                  // style={{ width: '245px', height: '260px' }}
                  className='xshome  w-[245px] h-[260px]'
                />
              </div>
            ))}
          </SlickCarousel>
        </div>
      </div>
    </div>
  );
}

export default Home;
