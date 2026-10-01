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

const CarouselImage = ({ images }) => {
 

  return (
    <div className="relative w-full">
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
        initialSlide={1}
        slidesPerView={3}
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
            <div
        className="w-full max-w-[600px] relative  h-[600px] bg-light-light4 rounded-md overflow-hidden   m-auto   "
        style={{ boxShadow: '0px 11px 49px 0px rgba(0, 0, 0, 0.15)' }}>
        <div className="  w-full h-full">
         
  <video poster="/video-poster/market.jpg" preload="none" loop controls className='relative w-[800px] m-auto object-fill  h-full hover:scale-[1.1] z-[10]' src="/video/market.mp4"></video>

          
        </div>
      </div>          
        </SwiperSlide>
            <SwiperSlide className="  " >
            <div
        className="w-full max-w-[600px] relative  h-[600px] bg-light-light4 rounded-md overflow-hidden   m-auto   "
        style={{ boxShadow: '0px 11px 49px 0px rgba(0, 0, 0, 0.15)' }}>
        <div className="  w-full h-full">
         
  <video poster="/video-poster/market.jpg" preload="none" loop controls className='relative w-[800px] m-auto object-fill  h-full hover:scale-[1.1] z-[10]' src="/video/market.mp4"></video>

          
        </div>
      </div>          
        </SwiperSlide>
            <SwiperSlide className="  " >
            <div
        className="w-full max-w-[600px] relative  h-[600px] bg-light-light4 rounded-md overflow-hidden   m-auto   "
        style={{ boxShadow: '0px 11px 49px 0px rgba(0, 0, 0, 0.15)' }}>
        <div className="  w-full h-full">
         
  <video poster="/video-poster/market.jpg" preload="none" loop controls className='relative w-[800px] m-auto object-fill  h-full hover:scale-[1.1] z-[10]' src="/video/market.mp4"></video>

          
        </div>
      </div>          
        </SwiperSlide>
            <SwiperSlide className="  " >
            <div
        className="w-full max-w-[600px] relative  h-[600px] bg-light-light4 rounded-md overflow-hidden   m-auto   "
        style={{ boxShadow: '0px 11px 49px 0px rgba(0, 0, 0, 0.15)' }}>
        <div className="  w-full h-full">
         
  <video poster="/video-poster/market.jpg" preload="none" loop controls className='relative w-[800px] m-auto object-fill  h-full hover:scale-[1.1] z-[10]' src="/video/market.mp4"></video>

          
        </div>
      </div>          
        </SwiperSlide>
            <SwiperSlide className="  " >
            <div
        className="w-full max-w-[600px] relative  h-[600px] bg-light-light4 rounded-md overflow-hidden   m-auto   "
        style={{ boxShadow: '0px 11px 49px 0px rgba(0, 0, 0, 0.15)' }}>
        <div className="  w-full h-full">
         
  <video poster="/video-poster/market.jpg" preload="none" loop controls className='relative w-[800px] m-auto object-fill  h-full hover:scale-[1.1] z-[10]' src="/video/market.mp4"></video>

          
        </div>
      </div>          
        </SwiperSlide>
         
      </Swiper>
    </div>
  );
};




export default CarouselImage;
