"use client"
import React, { useEffect, useState } from 'react'
import titleBG from '@/images/portfolio/title-bg.png';
import bhagaya1 from '@/images/portfolio/bhagaya-1.png';
import bhagaya2 from '@/images/portfolio/bhagaya-2.png';
import bhagaya3 from '@/images/portfolio/bhagaya-3.png';
import Follow from '@/components/Follow.js';
import Footer from '@/components/Footer';
import flag from '@/images/portfolio/flag.jpg';
import banner from '@/images/portfolio/Childrens-min.png';
import useLocale from '@/hooks/useLocale';
import Link from 'next/link';
import useApi from '@/hooks/useApi';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

import { SwiperSlide,Swiper } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination, Autoplay } from 'swiper/modules';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import VideoComponent from './VideoComponent';
import Lightbox from './Lightbox';





const KsheeraBhagaya = () => {


  const locale = useLocale().locale;
  const [bhagaya, setBhagaya] = useState([]);
const axios = useApi();
  useEffect(() => {
    (async () => {
      const { data: bhagaya } = await axios.get(`/api/ksheerabhagaya`);
       
 
     
      setBhagaya(bhagaya?.data);

    })();
  }, []);

  const [slideView, setSlideView] = useState(3);


  const [lightboxOpen, setLightboxOpen] = useState(false);
  const videoUrl = "/video/ksheerabhagaya.mov"; // Replace with your actual video URL

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
  return (
     <>
    <div className='w-full h-full'>
      <section className='w-full h-full'>
      <div className="flex w-full    justify-center pt-5 space-x-2 items-center relative before:absolute before:-bottom-3 before:w-20   before:h-0.5 before:bg-primary-main">
            <Link className="  text-sm font-bold  " href={`/${locale}/portfolio/#ACHIEVEMENTS` || ''}>
            {locale==='en'?'KMF ACHIEVEMENTS':'ಕಹಾಮ ಸಾಧನೆಗಳು'}
            </Link>

           
            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold text-primary-main" href={''}>
                {locale === 'en' ? 'KSHEERABHAGYA' : 'ಕ್ಷೀರ ಭಾಗ್ಯ'}
            </Link>
          </div>
      <div className=' relative w-full h-auto flex flex-col items-center justify-center mt-20'>

        <h1 className='text-primary-main   flex justify-center items-center text-2xl md:text-4xl  ' > {locale === 'en' ? 'KSHEERABHAGYA' : 'ಕ್ಷೀರ ಭಾಗ್ಯ'} </h1>
        <div className='bg-primary-main w-[200px] h-[4px] mt-2'></div>
        <img loading="lazy" decoding="async" className='absolute top-[-50px] left-[40%] md:left-[49%] w-40 ' src={titleBG.src} alt="" />
</div>
      </section>
         <section className={`w-full h-auto md:h-[90vh] relative  company-bg mt-10`}>

              
<img loading="lazy" decoding="async" src={banner.src} alt="" />

        </section>
        <section className='w-full h-full mt-10 md:mt-20 '>
         
          <div className='w-full h-auto'>
      
        
            <div className=' hidden lg:block relative w-full max-h-[500px] h-full z-[-1]'>
                <img loading="lazy" decoding="async" className='w-full h-full' src={flag.src} alt="" />
                <div className='absolute top-[60px] lg:top-0 xl:top-[60px] w-full h-full'>
                    <div className='w-full h-full flex justify-center items-center'>
                    <div className='max-w-xl lg:max-w-lg xl:max-w-3xl w-full m-auto'>
                       <h1 className='text-primary-main text-2xl md:text-4xl text-center font-bold ' > {locale === 'en' ? 'KSHEERABHAGYA' : 'ಕ್ಷೀರ ಭಾಗ್ಯ'} </h1>
                 <div className='mt-6'>
                  <ul className=' text-sm md:text-lg lg:text-sm xl:text-xl list-disc text-left'>
                  <li>
                  {locale === 'en' ? 'The Ksheera Bhagya Scheme was launched on 1st Aug 2013 by GOK in co-ordination with KMF to provide nutritious food with protein and fat which is essential for healthy growth and all-round development of School Children as well as Anganwadi in the State.' : 'ರಾಜ್ಯದ ಶಾಲಾ ಮಕ್ಕಳು ಹಾಗೂ ಅಂಗನವಾಡಿ ಮಕ್ಕಳುಗಳ ಆರೋಗ್ಯಕರ ಬೆಳವಣಿಗೆ ಮತ್ತು ಸರ್ವತೋಮುಖ ಅಭಿವೃದ್ಧಿಗೆ ಅಗತ್ಯವಾದ ಪ್ರೋಟೀನ್ ಮತ್ತು ಕೊಬ್ಬಿನೊಂದಿಗೆ ಪೌಷ್ಠಿಕಾಂಶದ ಆಹಾರವನ್ನು ಒದಗಿಸಲು ಕೆಎಂಎಫ್ ಸಹಯೋಗದೊಂದಿಗೆ ಕರ್ನಾಟಕ ಸರ್ಕಾರವು 1 ಆಗಸ್ಟ್ 2013 ರಂದು ಕ್ಷೀರ ಭಾಗ್ಯ ಯೋಜನೆಯನ್ನು ಪ್ರಾರಂಭಿಸಿತು.'}  
                  </li>
                  <li>
                  {locale === 'en' ? 'Ksheera Bhagya Scheme was a dream project conceived by KMF based on the suggestion of honorable CM of Karnataka to help the poor children of the State and also the Milk producers to dispose their surplus milk.' : 'ಕ್ಷೀರ ಭಾಗ್ಯ ಯೋಜನೆಯು ಹಾಲು ಉತ್ಪಾದಕರಿಗೆ ಅವರ ಹೆಚ್ಚುವರಿ ಹಾಲನ್ನು ವಿಲೇವಾರಿ ಮಾಡಲು ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಗೌರವಾನ್ವಿತ ಸಿಎಂ ಅವರ ಸಲಹೆಯ ಆಧಾರದ ಮೇಲೆ ಕೆಎಂಎಫ್ ರೂಪಿಸಿದ ವಿನೂತನ ಯೋಜನೆಯಾಗಿದೆ.'}  
                  
                  </li>
                  <li>
                  {locale === 'en' ? 'The Gist of Ksheera Bhagya Scheme is as follows:' : 'ಕ್ಷೀರ ಭಾಗ್ಯ ಯೋಜನೆಯ ಸಾರಾಂಶ ಹೀಗಿದೆ:'}  
                  
                  </li>
                
                  </ul>
                 </div>
                       </div>
                    </div>
                </div>
            </div>  

            <div className='w-full h-auto flex flex-wrap justify-center '>
               
                 <div className='block lg:hidden max-w-xl w-full m-3 md:m-10 rounded-3xl  shadow-2xl h-auto bg-slate-50 p-6 md:p-16'>
                       <div className='m-auto'>
                       <h1 className='text-primary-main text-2xl md:text-3xl font-bold ' >  {locale === 'en' ? 'KSHEERABHAGYA' : 'ಕ್ಷೀರ ಭಾಗ್ಯ'} </h1>
                 <div className=' mt-10'>
                  <ul className='list-disc text-left'>
                  <li>
                  {locale === 'en' ? 'The Ksheera Bhagya Scheme was launched on 1st Aug 2013 by GOK in co-ordination with KMF to provide nutritious food with protein and fat which is essential for healthy growth and all-round development of School Children as well as Anganwadi in the State.' : 'ರಾಜ್ಯ ದ ಶಾಲಾಮಕ್ಕ ಳುಹಾಗೂಅಂಗ್ನವಾಡಿ ಮಕ್ಕಳು Àಳ ಆರೀಗ್ಯ ಕ್ರ ಬೆಳ಴ಣಿಗೆ ಮತ್ತು ಸ಴ವತೀಮುಖ ಅಭಿವೃದ್ಧಿ ಗೆ ಅಗ್ತ್ಯ ವಾದಪ್ರ ೀಟೀನ್ ಮತ್ತು ಕೊಬ್ಬಿ ನಂದ್ಧಗೆಪೌಷ್ಠಿ ಕಂವದ ಆಹಾರ಴ನ್ನು ಒದಗಿಸಲು ಕೆಎಂಎಫ್ ಸಹಯೀಗ್ದಂದ್ಧಗೆ ಕರ್ನಾಟಕ ಸರ್ಕಾರವು 1 ಆಗ್ಸ್ಟ್ 2013 ರಂದು ಕ್ಷ ೀರಭಾಗ್ಯಯೀಜ್ನೆಯನ್ನು ಪ್ರರ ರಂಭಿಸಿತ್ತ.'}  
                  </li>
                  <li>
                  
                  {locale === 'en' ? 'Ksheera Bhagya Scheme was a dream project conceived by KMF based on the suggestion of honorable CM of Karnataka to help the poor children of the State and also the Milk producers to dispose their surplus milk.' : 'ಕ್ಷ ೀರಭಾಗ್ಯಯೀಜ್ನೆಯುಹಾಲು ಉತ್ಪಾ ದಕ್ರಿಗೆ ಅ಴ರ ಹೆಚ್ಚು ಴ರಿಹಾಲನ್ನು ವಿಲೇವಾರಿಮಾಡಲು ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಗೌರವಾನ್ವಿ ತ್ ಸಿಎಂ ಅ಴ರ ಸಲಹೆಯಆಧಾರದಮೇಲೆ ಕೆಎಂಎಫ್ರೂಪಿಸಿದ ವಿನೂತ್ನಯೀಜ್ನೆಯಾಗಿದೆ.'}  
                  </li>
                  {/* <li>
                  The Gist of Ksheera Bhagya Scheme is as follows:
                  </li> */}
                
                
                  </ul>
                 </div>
                       </div>
                 </div>
          

            </div>

           
          <div className="w-full flex-col max-w-7xl m-auto mb-10 rounded-md shadow-md  bg-slate-50   mt-6  overflow-auto  items-start justify-start p-4 md:p-10 ">


           
          {/* {bhagaya && bhagaya.attributes && bhagaya.attributes.content && (
                    <BlocksRenderer
                      content={ bhagaya.attributes.content}
                      blocks={{
                   
                        code: ({ children }) => {
                          const columns =
                            children?.[0]?.props?.text.split(',')[0].trim() === 'columns'
                              ? children?.[0]?.props?.text.split(',').slice(1)
                              : [];

                          return ( */}
                            <table className="table-fixed  border-spacing-y-2	 border-collapse border-black border      w-full ">
                              <thead className=" text-left bg-orange-400 text-primary-main">
                                {/* {columns?.map((item, id) => {
                              
                                  if(id===0){
                                    return( */}
                                      <th className="p-2 w-10  border-r border-black " >
                                      	#	
                                    </th>
                                    {/* )
                                 
                                  }
                                  return ( */}
                                    <th className="p-2   border-r border-black " >
                                      GIST
                                    </th>
                                     <th className="p-2   border-r border-black " >
                                      Schools
                                    </th>
                                     <th className="p-2   border-r border-black " >
                                      Anganwadi
                                    </th>
                                  {/* );
                                })} */}
                              </thead>
                              <tbody className="text-left  text-md ">
                                <tr className="w-full ">
                                  {/* {children?.[0]?.props?.text.split(',')[0].trim() !== 'columns' &&
                                    children?.[0]?.props?.text?.split(',')?.map((item, id) => {
                                      if(id===0){
                                        return( */}
                                          <td className="w-10 p-2  text-md font-content border-r border-black ">
                                          {' '}
                                         1
                                        </td>
                                        {/* )
                                     
                                      }
                                      return ( */}
                                        <td className=" p-1 md:p-2 text-[12px] md:text-[16px] text-md font-content border-r border-black ">
                                          {' '}
                                          SCHOOLS / ANGANWADI COVERED
                                        </td>
                                        <td className=" p-1 md:p-2 text-[12px] md:text-[16px] text-md font-content border-r border-black ">
                                          {' '}
                                          55683 nos
                                        </td>
                                        <td className=" p-1 md:p-2 text-[12px] md:text-[16px] text-md font-content border-r border-black ">
                                          {' '}
                                          64000 nos
                                        </td>
                                      {/* );
                                    })} */}
                                </tr>
                                 <tr className="w-full ">
                                          <td className="w-10 p-2  text-md font-content border-r border-black ">
                                          {' '}
                                         1
                                        </td>
                                    
                                        <td className=" p-1 md:p-2 text-[12px] md:text-[16px] text-md font-content border-r border-black ">
                                          {' '}
                                          SCHOOLS / ANGANWADI COVERED
                                        </td>
                                        <td className=" p-1 md:p-2 text-[12px] md:text-[16px] text-md font-content border-r border-black ">
                                          {' '}
                                          55683 nos
                                        </td>
                                        <td className=" p-1 md:p-2 text-[12px] md:text-[16px] text-md font-content border-r border-black ">
                                          {' '}
                                          64000 nos
                                        </td>
                                </tr>

                                <tr className="w-full ">
                                          <td className="w-10 p-2  text-md font-content border-r border-black ">
                                          {' '}
                                         2
                                        </td>
                                    
                                        <td className=" p-1 md:p-2 text-[12px] md:text-[16px] text-md font-content border-r border-black ">
                                          {' '}
                                          SCHOOLS / ANGANWADI COVERED
                                        </td>
                                        <td className=" p-1 md:p-2 text-[12px] md:text-[16px] text-md font-content border-r border-black ">
                                          {' '}
                                          64 lakhs
                                        </td>
                                        <td className=" p-1 md:p-2 text-[12px] md:text-[16px] text-md font-content border-r border-black ">
                                          {' '}
                                          40 lakhs
                                        </td>
                                </tr>

                                <tr className="w-full ">
                                          <td className="w-10 p-2  text-md font-content border-r border-black ">
                                          {' '}
                                         3
                                        </td>
                                    
                                        <td className=" p-1 md:p-2 text-[12px] md:text-[16px] text-md font-content border-r border-black ">
                                          {' '}
                                          BENEFICIARIES
                                        </td>
                                        <td className=" p-1 md:p-2 text-[12px] md:text-[16px] text-md font-content border-r border-black ">
                                          {' '}
                                          1st to 10th standard in government and government aided schools in all over Karnataka
                                        </td>
                                        <td className=" p-1 md:p-2 text-[12px] md:text-[16px] text-md font-content border-r border-black ">
                                          {' '}
                                          Children from 6 months to 6 years
                                        </td>
                                </tr>

                                <tr className="w-full ">
                                          <td className="w-10 p-2  text-md font-content border-r border-black ">
                                          {' '}
                                         4
                                        </td>
                                    
                                        <td className=" p-1 md:p-2 text-[12px] md:text-[16px] text-md font-content border-r border-black ">
                                          {' '}
                                          MILK POWDER REQUIRED
                                        </td>
                                        <td className=" p-1 md:p-2 text-[12px] md:text-[16px] text-md font-content border-r border-black ">
                                          {' '}
                                          WMP required per child is 18gms ie. equivalent to serving 150ml of Milk. (given five times a week)
                                        </td>
                                        <td className=" p-1 md:p-2 text-[12px] md:text-[16px] text-md font-content border-r border-black ">
                                          {' '}
                                          WMP required per child is 15gms ie. equivalent to serving 150ml of Milk. (given five times a week)
                                        </td>
                                </tr>

                                <tr className="w-full ">
                                          <td className="w-10 p-2  text-md font-content border-r border-black ">
                                          {' '}
                                         5
                                        </td>
                                    
                                        <td className=" p-1 md:p-2 text-[12px] md:text-[16px] text-md font-content border-r border-black ">
                                          {' '}
                                          MILK REQUIRED PER DAY
                                        </td>
                                        <td className=" p-1 md:p-2 text-[12px] md:text-[16px] text-md font-content border-r border-black ">
                                          {' '}
                                          5 LLPD
                                        </td>
                                        <td className=" p-1 md:p-2 text-[12px] md:text-[16px] text-md font-content border-r border-black ">
                                          {' '}
                                          3 LLPD
                                        </td>
                                </tr>

                                <tr className="w-full ">
                                          <td className="w-10 p-2  text-md font-content border-r border-black ">
                                          {' '}
                                         6
                                        </td>
                                    
                                        <td className=" p-1 md:p-2 text-[12px] md:text-[16px] text-md font-content border-r border-black ">
                                          {' '}
                                          COST/CHILD/ONE SERVE
                                        </td>
                                        <td className=" p-1 md:p-2 text-[12px] md:text-[16px] text-md font-content border-r border-black ">
                                          {' '}
                                          Rs.5.67 Approx.
                                        </td>
                                        <td className=" p-1 md:p-2 text-[12px] md:text-[16px] text-md font-content border-r border-black ">
                                          {' '}
                                          Rs.4.73 Approx.
                                        </td>
                                </tr>

                               
                              </tbody>
                            </table>
                          {/* );
                        },

                 
                      }} */}
                    {/* />
                  )} */}

    </div>
               
          </div>


        </section>
        
      <section className='relative w-full h-auto bg-[#2858ac]'>
      <div className='max-w-6xl  m-auto w-full justify-center items-center text-center  md:pt-20'>


                
                
                
                
                 </div>
          <div className='w-full  h-[1000px] md:h-[500px]  m-auto flex flex-col  md:flex-row gap-6 md:justify-center items-center '>
         
            <div className=' md:max-w-[50%] w-full h-96 '>
              
                <div className='relative w-full h-full  shadow-xl flex justify-center items-center'>
                   <div className='hidden md:block absolute w-full h-full'>
                       <div className='w-full h-full flex items-center justify-between'>
                            <div className='w-16 h-8 bg-red-600' ></div>
                            <div className='w-16 h-8 bg-red-600' ></div>
                       </div>
                   </div>
{/* 
                <VideoComponent onClick={openLightbox} />
             {lightboxOpen && <Lightbox videoUrl={videoUrl} onClose={closeLightbox} />} */}


              <video autoPlay loop muted controls className='w-full h-full' src="/video/ksheerabhagaya.mov"></video>
                </div>
            </div>
            <div className='md:max-w-[50%] w-full h-96 pr-5'>
            <Swiper
             slidesPerView={slideView}
              freeMode={true}
           
              
              autoplay={{
                delay: 250000,
                disableOnInteraction: false
              }}
              modules={[FreeMode, Autoplay]}
              className="max-w-7xl m-auto">
         
                 
                      <SwiperSlide className='' >
                      <div className='flex justify-center items-center   w-full  h-[500px] md:h-96  p-2 '>
                      <PhotoProvider>
                           <PhotoView src={bhagaya3.src} height="400px">
                              <img loading="lazy" decoding="async" className=' cursor-pointer m-auto w-full h-full  md:object-cover' src={bhagaya1.src} alt="" />
                          </PhotoView>
                    </PhotoProvider>
                </div>


                        </SwiperSlide>
                      <SwiperSlide>
                      <div className='flex justify-center items-center   w-full h-[500px] md:h-96 p-2 '>
                  <PhotoProvider>     
                      <PhotoView src={bhagaya3.src} height="400px">
                          <img loading="lazy" decoding="async" className=' cursor-pointer  m-auto w-full h-full md:object-cover' src={bhagaya2.src} alt="" />
                          </PhotoView>
                          </PhotoProvider>  
                </div>
                        </SwiperSlide>
                      <SwiperSlide>
                   
                 <div className='flex justify-center items-center  w-full h-[500px] md:h-96 p-2 '>
                 <PhotoProvider> 
                      <PhotoView src={bhagaya3.src} height="400px">
                          <img loading="lazy" decoding="async" className=' cursor-pointer m-auto w-full h-full md:object-cover' src={bhagaya3.src} alt="" />
                          </PhotoView>
                          </PhotoProvider>   
                          </div>
                        </SwiperSlide>

                
            </Swiper>
            </div>

          </div>
      </section>
       
        
    </div>
    <Footer/>
    </>
  
  )
}

export default KsheeraBhagaya
