'use client';
import React, { useEffect, useState } from 'react';

 
import GrowthProcess from './GrowthProcess';
import About from './About';
 
import OngoingAndFuture from './OngoingAndFuture';
import { useParams } from 'next/navigation';
 
import Footer from '@/components/Footer';
import useApi from '@/hooks/useApi';
 
import { useMyContext } from '@/context/headerContext';
 

function CompanyProfile() {
  const [currentIndex, setCurrentIndex] = useState(0);
   
  const locale = useParams().locale;
  const axios = useApi();
 
  const { isScroll, setIsScroll } = useMyContext();
   

  const tabs = [
    {
      tabName: locale === 'en' ? 'About us' : 'ಕಹಾಮ ಬಗ್ಗೆ',
      data: <About   name={'About us'} />
    },
    // {
    //   tabName: locale === 'en' ? 'The Growth Process' : 'ಬೆಳವಣಿಗೆಯ ಪ್ರಕ್ರಿಯೆ',
    //   data: <GrowthProcess   name={'The Growth Process'} />
    // },

    {
      tabName: locale === 'en' ? 'Ongoing and Future Projects' : 'ಭವಿಷ್ಯದ ಯೋಜನೆಗಳು',
      data: <OngoingAndFuture   name={'Ongoing and Future Projects'} />
    }
  ];
  const handleTabs = (idx) => {
    setCurrentIndex(idx);
  };

  useEffect(() => {
    (async () => {
      const { data: banner } = await axios.get('/api/banners');
      const images = banner?.data?.map((img) => img?.attributes?.banner?.data?.attributes?.url);
      setAllBanners(images);
    })();
  }, []);

  return (
    <div className={`w-full h-full  relative     ${isScroll ? '' : ''}  `}>
      <video
        src="/video/company-profile.mov"
        controls
        muted
        autoPlay
        loop
        playsInline
        className={`w-full md:h-[600px] z-[-10] object-fill ${isScroll ? 'md:h-[400px]' : ''}  `}
      />

      {/* <CarouselImage images={allbanners || []} /> */}

      <section className="w-full h-auto p-10   relative flex justify-center items-center flex-col  space-y-6  ">
        <div className="w-full flex flex-col justify-center items-center space-y-5">
          <div className="mb-20 w-full relative flex justify-center items-center">
        

            <h1 className="w-full uppercase relative max-w-[300px] m-auto text-center  text-primary-main text-3xl   z-[10] ">
              {locale === 'en' ? 'Company Profile' : 'ಕಹಾಮ ಪರಿಚಯ'}
            </h1>
          </div>

{/* 
          <li
                    key={idx}
                    onClick={() => handleTabs(idx)}
                    className={`${
                      currentIndex === idx ? 'text-secondary-main relative  ' : ''
                    } font-extrabold text-xs font-subheading md:text-xl transition-all duration-100  uppercase cursor-pointer hover:scale-[1.1]`}>
                    {tab.tabName}
                  </li> */}

          <div className="relative w-full   flex justify-center items-center    before:absolute before:w-full before:h-0.5 before:bg-neutral-dark4 before:-bottom-3  ">
            <ul className="flex justify-center items-center  space-x-7 ">
              {tabs?.map((tab, idx) => {
                
                return (
                  <div key={idx} className='flex justify-center items-center space-x-3'>
                    {idx!==0 &&  <p className="text-primary-main">&gt;</p> }

<p onClick={() => handleTabs(idx)}
                    className={`${
                      currentIndex === idx ? 'text-secondary-main relative  ' : ''
                    } font-extrabold text-xs font-subheading md:text-sm transition-all duration-100  uppercase cursor-pointer hover:scale-[1.1]`} >
{tab.tabName}
            </p>
                  </div>


                
                );
              })}
            </ul>
          </div>

          {/* <div className="w-[650px]   h-fit  relative   flex justify-center items-center pt-20">
            <img loading="lazy" decoding="async"
              src="/images/heading/subheading.png"
              className="absolute z-[-1] w-fit    object-contain"
            />

            <h1
              className="     text-primary-main text-[22px] flex justify-center items-center  font-heading relative 
          before:absolute before:w-40 before:m-auto before:h-1 before:bg-secondary-darker before:top-10 ">
              {tabs[currentIndex].tabName}
            </h1>
          </div> */}
        </div>
      </section>

      <div className=" w-full max-w-[1200px] m-auto  gap-5  flex justify-start items-start ">
        {tabs?.map((tab, id) => {
          if (currentIndex === id) {
            return tab.data;
          }
        })}

        {/* <div className=" w-80   mt-10 gap-6 h-fit flex flex-col  shadow-md bg-white  p-2  justify-start   items-start rounded-lg border-b-2 border-primary-main  ">
            <div className='w-full    shadow-md bg-white  '>
              <h1 className='p-5 bg-primary-main text-white'>{locale==='kn'?'ಕಹಾಮ ಬಗ್ಗೆ':'About Us'}</h1>
            </div>
            
            {tabs?.map((item, id) => {
                 
                return (
                   
                  <p  key={id} className="bg-white border cursor-pointer m-1 p-1 text-md rounded w-full hover:bg-primary-main hover:text-white " onClick={() => handleTabs(id)}>
                    {id+1} - {item?.tabName}
                  </p>
                
                );
              })}
          </div> */}
      </div>


       
<Footer />
    </div>
  );
}

export default CompanyProfile;
