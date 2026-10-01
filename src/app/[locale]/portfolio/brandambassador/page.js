'use client';
import Footer from '@/components/Footer'
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player';

 
 
import { Carousel as Carousels } from 'react-responsive-carousel';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination, Autoplay } from 'swiper/modules';

import rajkumar1 from '@/images/portfolio/rajkumar-1.jpg'
import rajkumar2 from '@/images/portfolio/rajkumar-2.jpg'
import rajkumar3 from '@/images/portfolio/rajkumar-3.jpg'
import rajkumar4 from '@/images/portfolio/rajkumar-4.jpg'
import rajkumar5 from '@/images/portfolio/rajkumar-5.jpg'
import rajkumar6 from '@/images/portfolio/rajkumar-6.jpg'
import brand from '@/images/portfolio/ba.png'
import Link from 'next/link';
import useLocale from '@/hooks/useLocale';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import VideoComponent from './VideoComponent';
import Lightbox from './Lightbox';

import useApi from '@/hooks/useApi';





const BrandAmbassador = () => {
    const locale =useLocale().locale
    const [slideView, setSlideView] = useState(3);


    const [lightboxOpen, setLightboxOpen] = useState(false);
    const videoUrl = "/video/brand-video.mp4"; // Replace with your actual video URL
  
    const openLightbox = () => {
      setLightboxOpen(true);
    };
  
    const closeLightbox = () => {
      setLightboxOpen(false);
    };
  
    useEffect(() => {
      
  
      const handleSlideView = () => {
        const screen = window.innerWidth;
        if (screen < 1113) {
          setSlideView(2);
        }
        if (screen < 779) {
          setSlideView(1);
        }
      };
      handleSlideView();
  
      window.addEventListener('resize', handleSlideView);
      return () => window.removeEventListener('resize', handleSlideView);
    }, []);
    const [brandAmbassador,setBrandAmbassador]=useState([])

  const axios=useApi()

  useEffect(()=>{
(
  async()=>{
    const {data}=await axios.get('/api/brand-ambassadors?sort[0]=createdAt:asc')
    setBrandAmbassador(data.data)
  }
)()
  },[])


  const [currentIndex, setCurrentIndex] = useState(0);

  const tabs = [
    {
      tabName: "Dr. Puneeth Rajkumar",
      data: ""
    },
    {
      tabName: "Dr. Rajkumar",
      data: ""
    },
    {
      tabName: "Dr. Shivarajkumar",
      data: ""
    },
    {
      tabName: "Shri. Upendra Rao",
      data: ""
    },
    
  ];
  const handleTabs = (idx) => {
    setCurrentIndex(idx);
  };


  const bandImage=[
    {
      url:rajkumar1.src
    },
    {
      url:rajkumar2.src
    },
    {
      url:rajkumar3.src
    },
    {
      url:rajkumar4.src
    },
    {
      url:rajkumar5.src
    },
    {
      url:rajkumar6.src
    },
    
  ]




  return (<>
      <div className='w-full h-full'>
       
      <section id='AMBASSADOR' className='relative w-full h-auto '>
        <div className='absolute w-full h-full'>
         {/* <img loading="lazy" decoding="async" className='w-full h-full'  src={brand.src} alt="" /> */}
        </div>
      <Carousels
       className='w-full '
        autoPlay={true}
        interval={4000}
        showStatus={false}
        selectedItem={1}
        infiniteLoop
        showThumbs={false}
        showIndicators={true}
       >
        {/* {
          brandAmbassador?.map((item,id)=>{
            return( */}
              <div  className='relative w-full h-[500px] md:h-[750px] '>

              <div className='absolute w-full h-full top-0 left-0  bg-black opacity-50 z-[-1]'></div>
              <div className='absolute w-full h-full top-0 left-0   z-[-10]'>
                 <img loading="lazy" decoding="async" className='w-full h-full object-contain' src={brand.src} alt="" />
                 </div>
    
              <div className='w-full h-full flex flex-col justify-center items-center  '>
              {/* <h1 className=' text-white text-2xl md:text-6xl font-bold text-center'>{locale==='en'?' BRAND AMBASSADOR':' ಕಹಾಮ ರಾಯಭಾರಿಗಳು'}</h1> */}
                 <div className='w-full h-auto mt-6 md:mt-20'>
                  <div className='max-w-[700px] m-auto'>
    
                 
                     <h1 className='text-white text-xl md:text-5xl font-bold text-center uppercase'>Brand Ambassador</h1>
                     {/* {item?.attributes?.description?.map((des,id)=>{

              
                     return( */}
                      <p  className='text-lg text-center  mt-4 md:mt-10 text-white p-2'>
                       
    
    </p>

                    {/* //  )})} */}
                     
    </div>
                 </div>
            </div>
            </div>
            {/* )
          })
        } */}
       

        
        </Carousels>
        
      </section>

   

      <section className='relative w-full h-auto bg-[#2858ac] pt-10 pb-10 mb-5'>

        <div className='w-full h-full p-1 md:p-10'>
            <h1 className='max-w-6xl m-auto text-white text-3xl text-center'>
            <i> {locale === 'en' ? 'Karnataka Milk Federation appoints ambassadors from renowned Kannada artistes from time to time to increase the market reach of its products.' : 'ಕರ್ನಾಟಕ ಹಾಲು ಮಹಾಮಂಡಳವು ತನ್ನ ಉತ್ಪನ್ನಗಳ ಮಾರುಕಟ್ಟೆ ವ್ಯಾಪ್ತಿಯನ್ನು ಹೆಚ್ಚಿಸಲು ಹೆಸರಾಂತ ಕನ್ನಡದ ಕಲಾವಿದರನ್ನು ರಾಯಭಾರಿಗಳಾಗಿ ನೇಮಕ ಮಾಡಿದೆ.'} </i>
            
            </h1>
        </div>
    
          <div className='w-full  h-[735px] md:h-[500px]  m-auto flex flex-col  md:flex-row gap-6 justify-center items-center '>
         
            <div className='md:max-w-[50%] w-full h-96 '>
              
                <div className='relative w-full h-full  shadow-xl flex justify-center items-center'>
                   <div className='absolute w-full h-full'>
                       <div className='w-full h-full flex items-center justify-between'>
                            <div className='w-10 h-5 md:w-16 md:h-8 bg-red-600' ></div>
                            <div className='w-10 h-5 md:w-16 md:h-8 bg-red-600' ></div>
                       </div>
                   </div>
{/* 
                <VideoComponent onClick={openLightbox} />
             {lightboxOpen && <Lightbox videoUrl={videoUrl} onClose={closeLightbox} />} */}


              <video autoPlay loop muted controls className='w-full h-full' src="/video/brand-video.mp4"></video>
                </div>
            </div>
            <div className=' md:max-w-[50%] w-full h-96 md:pr-5'>
            <Swiper
             slidesPerView={slideView}
              freeMode={true}
           
              
              autoplay={{
                delay: 2500,
                disableOnInteraction: false
              }}
              modules={[FreeMode, Autoplay]}
              className="max-w-7xl m-auto">

                 {bandImage.map((item,id)=>{
                 
                  return(
                    <SwiperSlide key={id} className='' >
                    <div className='flex justify-center items-center   w-full h-96 p-2 '>
                    <PhotoProvider >
                        
                        <PhotoView src={item.url} height="400px"  >
                        <img loading="lazy" decoding="async" className=' cursor-pointer m-auto w-full h-full object-cover' src={item.url} alt="" />
                        </PhotoView>
                    
                  
                  </PhotoProvider>
              </div>
                      </SwiperSlide>
                  )
                 })}
                     
                      <SwiperSlide>
                     <Link href={`/${locale}/blog/gallery`}><div className='flex justify-center items-center   w-full h-96 p-2 '>
                        <div className='w-full h-full flex justify-center items-center bg-slate-200'>

                        <h1 className='text-3xl text-primary-main'>See More..</h1>
                        </div>
                </div></Link> 
                        </SwiperSlide>
                
            </Swiper>
            </div>

          </div>
      </section>




      {/* <section className="max-w-[1282px]  m-auto grid grid-cols-3 gap-5   p-2 ">
    <div
      className="w-full max-w-7xl h-full  col-span-2  m-auto p-5  rounded-tl-3xl  rounded-br-3xl  bg-white  shadow-sm"
      >
      <div className="w-full h-full flex flex-col space-x-5 justify-center items-center lg:flex-row lg:justify-start">

      
      <div className="w-full h-full flex flex-col justify-center items-center pt-10 mt-10 space-y-5 lg:items-start">
      <div className="  relative w-full  flex justify-center items-center ">
            
              <h1 className=" text-primary-main relative max-w-[400px] m-auto text-center z-10 font-heading text-2xl font-extrabold uppercase">
              Dr. Puneeth Rajkumar
              </h1>
            </div>

 
 
<div className=" w-full h-full ">

      
      
            <div className="">
            <video autoPlay loop muted controls className='w-full h-full' src="/video/brand-video.mp4"></video>

            {bandImage.map((item,id)=>{
                   
                  return(

                    <div className='flex justify-center items-center   w-full h-96 p-2 '>
                    <PhotoProvider >
                        
                        <PhotoView src={item.url} height="400px"  >
                        <img loading="lazy" decoding="async" className=' cursor-pointer m-auto w-full h-full object-cover' src={item.url} alt="" />
                        </PhotoView>
                    
                  
                  </PhotoProvider>
              </div>
                  )
                 })}
            

         
            </div>
  
          <p className="text-xl font-josefin  text-justify">
          
          </p>
    
</div>
</div>
      </div>
    </div>


    <div className="w-full h-fit flex flex-col  shadow-md bg-white p-2 mt-10   justify-start   items-start rounded-lg border-b-2 border-primary-main  ">
            <div className='w-full    shadow-md bg-white  '>
              <h1 className='p-5 text-2xl'>Brand Ambassador</h1>
            </div>
            
            {brandAmbassador?.map((item, id) => {
                return (
                  <p onClick={() => handleTabs(id)}  className={`${
                    currentIndex === id ? ' bg-primary-main text-white  ' : ''
                  } border m-1 p-1 text-lg rounded w-full  text-black`}>
                  {item?.attributes?.name}
                  </p>
                );
              })}
          </div>
  </section> */}

    </div>
<Footer/>
 </>
    
  )
}

export default BrandAmbassador
