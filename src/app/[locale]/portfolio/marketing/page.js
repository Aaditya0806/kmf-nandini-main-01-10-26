"use client"
import React, { useEffect, useState } from 'react'
import titleBG from '@/images/portfolio/title-bg.png';
import Follow from '@/components/Follow.js';
import Footer from '@/components/Footer';
import flag from '@/images/portfolio/flag.jpg';
 
import Link from 'next/link';
import useLocale from '@/hooks/useLocale';
import useApi from '@/hooks/useApi';
 
import MarketModel from './marketModel';
import { SwiperSlide,Swiper, useSwiper } from 'swiper/react';
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCoverflow,
  Autoplay,
  FreeMode
} from 'swiper/modules';
 
import CarouselImage from './Slidevideos';

const Marketing = () => {
  const locale = useLocale().locale;
  const axios = useApi();
  const [previewCount, setPreviewCount] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState(null);

 
  const handleVideoClick = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };


  const [knowMarket,setKnowMarket]=useState([])


  const [isModalOpen, setIsModalOpen] = useState(false);

  // ... (existing code)

   const handleMarket=(item)=>{
    
    setKnowMarket(item)
    setIsModalOpen(true);
   }
 

  const [market, setMarket] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/api/gheesupplies');
    
      setMarket(data.data)
 
    
    })();
  }, []);


  const slideVideos =[
    {
      url:"/video/market.mp4"
    },
    {
      url:"/video/market1.mp4"
    },
    {
      url:"/video/marketing1.mp4"
    },
    {
      url:"/video/marketing3.mp4"
    },
    
  ]
  const NextSlider = () => {
    const swiper = useSwiper();

    useEffect(() => {
      if (swiper.activeIndex === 0) {
        setTimeout(() => {
          swiper.slideTo(1, 1000);
        }, 3000);
      }
    }, [swiper]);

    return <></>;
  };


  return (
    <div className='w-full h-full'>




      <section className='w-full h-full'>
      <div className="flex w-full    justify-center pt-5 space-x-2 items-center relative before:absolute before:-bottom-3 before:w-20   before:h-0.5 before:bg-primary-main">
            <Link className="  text-sm font-bold  " href={`/${locale}/portfolio/#ACHIEVEMENTS` || ''}>
            {locale==='en'?'KMF ACHIEVEMENTS':'ಕಹಾಮ ಸಾಧನೆಗಳು'}
            </Link>

           
            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold text-primary-main" href={''}>
            {locale === 'en' ?   'MARKETING' : 'ಕಹಾಮ ಮಾರುಕಟ್ಟೆ'}
            </Link>
          </div>
      <div className=' relative w-full h-full flex flex-col items-center justify-center mt-20'>

            <h1 className='text-primary-main text-2xl md:text-4xl  ' >  {locale === 'en' ?   'MARKETING' : 'ಕಹಾಮ ಮಾರುಕಟ್ಟೆ'} </h1>
            <div className='bg-primary-main w-[150px] h-[4px] mt-2'></div>

            <img loading="lazy" decoding="async" className='absolute md:top-[-55px] top-[-35px] left-[38%] md:left-[47%] w-32 md:w-40 ' src={titleBG.src} alt="" />
        </div>
      </section>
       <section className={`w-full  relative company-bg mt-20`}>

               <div className='absolute w-full h-full '>
                     <div className='w-full h-full  z-[-1] flex justify-between items-center'>
                           <div className='bg-red-600 w-12 md:w-48 h-7 '>

                           </div>
                           <div className='bg-red-600 w-12 md:w-48 h-7 '>

                           </div>
                     </div>
                </div>
                {/* <video autoPlay muted loop controls className='relative w-[800px] m-auto h-full z-[10]' src="/video/market.mp4"></video> */}
{/*              
                <div className="w-full h-full relative z-10    ">
                <Swiper
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={false}
              coverflowEffect={{
                rotate: 30,
                stretch: 0,
                depth: 200,
                modifier: 1,
                slideShadows: false
              }}
             
              modules={[Navigation, Pagination, Scrollbar, A11y, EffectCoverflow]}
              spaceBetween={10}
              slidesPerView={3}
              navigation={true}
              controller={true}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              slide
              loop={true}
              className={` max-w-7xl `}>
                   {slideVideos.map((item,id)=>{
                    return(
                       <SwiperSlide className="swiper-sldier-card lg:p-10" key={id} >
                  <div
                      className="w-full max-w-96 relative  h-96 bg-light-light4 rounded-md overflow-hidden   m-auto   "
                      style={{ boxShadow: '0px 11px 49px 0px rgba(0, 0, 0, 0.15)' }}>
                      <div className="  w-full h-full">
                        
                  <video preload="none"  muted loop controls
                   className='relative w-[800px] m-auto object-fill  h-full hover:scale-[1.1]  z-[10]' 
                   src={item.url}
                   onClick={() => handleVideoClick(item.url)}
                   >

                   </video>

                      </div>
                    </div>
                  </SwiperSlide>
                    )
                   })}
                 
                 
             
            </Swiper>
          </div> */}




          {/* <div className="w-full relative z-10">
            <Swiper
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              ref={(r) => r.s}
              coverflowEffect={{
                rotate: 30,
                stretch: 0,
                depth: 200,
                modifier: 1,
                slideShadows: false
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false
              }}
              modules={[Navigation, Pagination, Scrollbar, A11y, EffectCoverflow]}
              spaceBetween={40}
              slidesPerView={3}
              navigation={true}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              loop={true}
              className="max-w-7xl">
              {slideVideos.map((item,id) => {
                               return (
                  <SwiperSlide className="swiper-sldier-card lg:p-10" key={id}>
                    <div
                      className="w-full max-w-96 relative  h-96 bg-light-light4 rounded-md overflow-hidden   m-auto   "
                      style={{ boxShadow: '0px 11px 49px 0px rgba(0, 0, 0, 0.15)' }}>
                      <div className="  w-full h-full">
                        
                  <video preload="none"  muted loop controls
                   className='relative w-[800px] m-auto object-fill  h-full hover:scale-[1.1]  z-[10]' 
                   src={item.url}
                   onClick={() => handleVideoClick(item.url)}
                   >

                   </video>

                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div> */}






          <div className="w-full relative z-10">
            <Swiper
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              ref={(r) => r.s}
              coverflowEffect={{
                rotate: 30,
                stretch: 0,
                depth: 200,
                modifier: 1,
                slideShadows: false
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false
              }}
              modules={[Navigation, Pagination, Scrollbar, A11y, EffectCoverflow]}
              spaceBetween={40}
              slidesPerView={3}
              navigation={true}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              loop={true}
              className="max-w-7xl">
              {slideVideos.map((item, id) => {
               

                return (
                  <SwiperSlide className="swiper-sldier-card lg:p-10" key={id}>
                    <div
                      className="w-full md:max-w-96 relative h-64 md:h-96 bg-light-light4 rounded-md overflow-hidden   m-auto   "
                      style={{ boxShadow: '0px 11px 49px 0px rgba(0, 0, 0, 0.15)' }}>
                      <div className="  w-full h-full">
                        
                  <video preload="none"  muted loop controls
                   className='relative w-[800px] m-auto object-fill  h-full hover:scale-[1.1]  z-[10]' 
                   src={item.url}
                   onClick={() => handleVideoClick(item.url)}
                   >

                   </video>

                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
              <NextSlider />
            </Swiper>
          </div>



      </section>

      <MarketModel
                    closeModal={isModalOpen}
                    market={knowMarket}
                     close={setIsModalOpen}
          
               />


      <div className='w-full h-[400px] md:h-[600px]'>
        
        <div className=' hidden lg:block relative w-full max-h-[500px] h-full '>
            <img loading="lazy" decoding="async" className='w-full h-full' src={flag.src} alt="" />
            <div className='absolute top-[60px] lg:top-0 xl:top-[20px] w-full h-full '>
                <div className='w-full h-full flex justify-center items-center'>
                <div className='relative z-[10] max-w-xl lg:max-w-lg xl:max-w-xl w-full m-auto'>
                   <h1 className='text-primary-main text-2xl md:text-4xl text-center mb-10 font-bold' >  
                         {locale === 'en' ?   'Marketing' : 'ಕಹಾಮ ಮಾರುಕಟ್ಟೆ'}
                   </h1>

               
              {market.map((item,idx)=>{
              
                return(
                  <div key={idx} onClick={()=>handleMarket(item)} className='mt-2'>
                     <h1  className='uppercase cursor-pointer text-sm md:text-lg lg:text-sm xl:text-xl text-center hover:text-white transition-all duration-200 hover:scale-[1.5]'>
                      {item?.attributes?.title}
                    </h1>
                   
                   </div>
                )
              })}
            
                   </div>
                </div>
            </div>
        </div>  

        <div className='w-full h-auto flex flex-wrap justify-center pt-10'>
           
             <div className='block lg:hidden max-w-xl w-full m-3 md:m-10 rounded-3xl  shadow-2xl h-auto bg-slate-50 p-6 md:p-16'>
                   <div className='m-auto'>
                   <h1 className='text-primary-main text-center text-2xl md:text-3xl font-bold ' >   {locale === 'en' ?   'MARKETING' : 'ಕಹಾಮ ಮಾರುಕಟ್ಟೆ'} </h1>
             {/* <div className=' mt-10'>
              <p className=''>
              An ambitious scheme of the Karnataka State Government, the “Ksheerdhare” scheme has been implemented for the following objective                
              </p>
             </div> */}
               {market.map((item,idx)=>{
              
              return(
                <div key={idx} onClick={()=>handleMarket(item)} className='mt-5'>
                   <h1  className='uppercase cursor-pointer text-sm md:text-lg lg:text-sm xl:text-xl text-center hover:text-white transition-all duration-200 hover:scale-[1.5]'>
                    {item?.attributes?.title}
                  </h1>
                 
                 </div>
              )
            })}
                   </div>
             </div>



{/*           

        {market.map((item,idx)=>{
          return(
          
            <div key={idx} className='max-w-7xl w-full m-3 md:m-10 rounded-3xl  shadow-2xl h-auto bg-slate-50 p-6 md:p-16'>
            <div className='m-auto'>
           
     
      <div className="p-5">
                        {item?.attributes?.content && (
                          <BlocksRenderer
                            content={item?.attributes?.content}
                            blocks={{
                              paragraph: ({ children }) => <p className="text-md text-lg">{children}</p>,
                              heading: ({ children, level }) => {
                                switch (level) {
                                  case 1:
                                    return (
                                      <h1 className="text-2xl text-primary-main mt-5">{children}</h1>
                                    );
                                  case 2:
                                    return <h2 className="text-lg">{children}</h2>;
                                  case 3:
                                    return <h3>{children}</h3>;
                                  case 4:
                                    return <h4>{children}</h4>;
                                  case 5:
                                    return <h5>{children}</h5>;
                                  case 6:
                                    return <h6>{children}</h6>;
                                  default:
                                    return <h1>{children}</h1>;
                                }
                              },
                              list: ({ children }) => {
                                return children
                              },
                              code: ({ children }) => (
                                <h1 className="text-2xl bg-primary-main text-white p-2 shadow-lg">
                                  {children}
                                </h1>
                              )
                            }}
                          />
                        )}
                      </div>
            </div>
</div>
          )
        })} */}
 
         

          
            
        </div>
           
      </div>


      {selectedVideo && (
        <div className="modal">
          <div className="modal-content">
            <span className="close z-40 " onClick={closeModal}>&times;</span>
            <video controls src={selectedVideo} autoPlay className="modal-video w-full max-w-7xl h-[500px] object-fill">
               
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}




<Footer/>
</div>
  
  )
}

export default Marketing