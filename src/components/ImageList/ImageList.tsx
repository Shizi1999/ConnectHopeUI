/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Image } from 'antd';
import { useEffect, useState } from 'react';

import SlickCarousel from '~/components/SlickCarousel/SlickCarousel';
type ProductImageProps = {
  image?: string;
  images?: string[];
};
function ImageList({ image = '', images = [] }: ProductImageProps) {
  let listImages: string[] = [];
  if (image) {
    listImages = [image, ...images];
  }
  const [imgs, setImgs] = useState<string[]>(listImages);
  const [visible, setVisible] = useState(false);
  const [activeImg, setActiveImg] = useState<string>(image);
  useEffect(() => {
    if (image) {
      setActiveImg(image);
    }
  }, [image]);
  const handleActiveImg = (src: string) => {
    const newImgs = imgs.filter((img) => img !== src);
    setImgs([src, ...newImgs]);
    setActiveImg(src);
  };
  const responsive = [
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        inifinity: imgs.length > 2
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        inifinity: imgs.length > 4
      }
    }
  ];

  return (
    <>
      {listImages.length > 0 && (
        <>
          <Image
            preview={{ visible: false }}
            width={'100%'}
            height={'360px'}
            alt='image'
            src={activeImg}
            onClick={() => setVisible(true)}
          />
          <div style={{ display: 'none' }}>
            <Image.PreviewGroup
              preview={{
                visible,
                onVisibleChange: (vis) => {
                  console.log(vis);
                  setVisible(vis);
                }
              }}
            >
              {imgs.map((src, index) => {
                return <Image key={index} src={src} alt='image' />;
              })}
            </Image.PreviewGroup>
          </div>
          <div className='rounded-md '>
            <SlickCarousel setting={{ infinite: false, responsive, slidesToShow: 4 }} alignLeft>
              {listImages.map((src, index) => {
                return (
                  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                  <div
                    onClick={() => {
                      handleActiveImg(src);
                    }}
                    key={index}
                    className={'p-1 flex items-center justify-center '}
                  >
                    <div
                      className={`rounded-md overflow-hidden ${
                        src === activeImg && 'border border-red-500 dark:border-gray-600'
                      }`}
                    >
                      <img alt='img' src={src} className='cursor-pointer mix-blend-darken w-full h-36' />
                    </div>
                  </div>
                );
              })}
            </SlickCarousel>
          </div>
        </>
      )}
    </>
  );
}

export default ImageList;
