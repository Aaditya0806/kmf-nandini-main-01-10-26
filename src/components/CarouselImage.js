'use client';
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Carousel as Carousels } from 'react-responsive-carousel';
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  
  Autoplay,
  EffectCoverflow
} from 'swiper/modules';
import { Swiper , SwiperSlide,  useSwiper } from 'swiper/react';
import { Fade } from 'react-reveal';
 

const NextSlider = () => {
  
  const swiper = useSwiper()
 
  useEffect(() => {


    if (swiper.activeIndex === 0) {
      
      setTimeout(() => {
          swiper.slideTo(1,1000)  
      }, 3000) 
    }
  }, [swiper])

  return <></>
}

const CarouselImage = ({ images,mobileImg }) => {
    console.log("object",mobileImg)

  return (
    <>
      <div className="hidden md:block relative w-full">
        <Swiper
          grabCursor={true}
          centeredSlides={true}
          effect={'fade'}
          ref={r => r.s}
          coverflowEffect={{
            rotate: 45,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: false
            
          }}
          slidesPerView={1}
          modules={[Navigation, Pagination,Fade, Autoplay, Scrollbar, A11y, EffectCoverflow]}
          observeParents={true}
          observer={true}
          controller={true}
          scrollbar={{ draggable: true }}
          slide
          autoplay={{
            delay: 3000,
            disableOnInteraction: false
          }}
          loop={true}
          className={`w-full h-[600px] pb-0`}>

        
            
          { images?.map((img, id) => {
            
            return (
              <SwiperSlide className="  " key={id}>
                <img loading="lazy" decoding="async" src={img} className="w-full h-[600px]  object-fill " />
              </SwiperSlide>
            );
          })
        }
          
    
          
      <NextSlider />
        </Swiper>

        
      </div>
      <div className="md:hidden relative w-full">
        <Swiper
          grabCursor={true}
          centeredSlides={true}
          effect={'fade'}
          ref={r => r.s}
          coverflowEffect={{
            rotate: 45,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: false
            
          }}
          slidesPerView={1}
          modules={[Navigation, Pagination,Fade, Autoplay, Scrollbar, A11y, EffectCoverflow]}
          observeParents={true}
          observer={true}
          controller={true}
          scrollbar={{ draggable: true }}
          slide
          autoplay={{
            delay: 3000,
            disableOnInteraction: false
          }}
          loop={true}
          className={`w-full h-[600px] pb-0`}>

        
          
              <SwiperSlide className="  " >
                <img loading="lazy" decoding="async" src={mobileImg} className="w-full h-[600px]  object-fill " />
              </SwiperSlide>
          
          
    
          
      <NextSlider />
        </Swiper>

        
      </div>
    </> 
  );
};
CarouselImage.propTypes = {
  images: PropTypes.array
};

export const CarouselNotification = ({ images, title, description, link }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(1);
  const carouselRef = useRef(null);

  const handleSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full">
      <Carousels
        autoPlay={isPlaying}
        interval={4000}
        showStatus={false}
        infiniteLoop
        showThumbs={false}
        showIndicators={true}
        selectedItem={currentSlide}
        onChange={handleSlide}>
        {images.map((img, idx) => {
          return (
            <div key={idx}>
              <img loading="lazy" decoding="async" src={img} alt="" className="w-full h-80 object-cover" />

              <div className="absolute top-1/3 w-full left-0 flex flex-col justify-center space-y-7 items-center pl-10 pr-10 sm:flex-row   sm:items-end sm:justify-between ">
                <div className="flex justify-start items-start flex-col lg:pl-20">
                  <h1 className="text-neutral-light4 text-[40px]">{title}</h1>
                  <p className="text-[24px] text-neutral-light4">{description}</p>
                </div>

                <div className="lg:pr-20">
                  <button className=" w-[180px] h-[36px] text-center rounded-md border border-neutral-light4 text-neutral-light4  ">
                    View All
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </Carousels>
    </div>
  );
};

export default CarouselImage;
