'use client';
import React,{useState} from 'react';
import Follow from '@/components/Follow.js';
import Footer from '@/components/Footer';
import { useMyContext } from '@/context/headerContext';
import useLocale from '@/hooks/useLocale';
import CattleFeed from './CattleFeed';
import CattleInsurance from './CattleInsurance';
import Link from 'next/link';
function CattleInsuranceComponent() {
  const { isScroll } = useMyContext();
  const locale = useLocale().locale;  
  const [currentIndex, setCurrentIndex] = useState(0);
    
  const tabs = [
    {
      tabName: locale==='en'?'Cattle Insurance':'Cattle Insurance',
      data:<CattleInsurance/>
      
    },
    {
      tabName: locale==='en'?'Cattle Feed':'Cattle Feed',
      data:<CattleFeed/>
      
    },
 
  
  ];
  
  const handleTabs = (idx) => {
    
   
    setCurrentIndex(idx);
  };
   
  return (
    <div className={`w-full h-full absolute   z-[-1] ${isScroll ? ' md:top-48' : ''}  `}>
      <section className={`w-full h-[700px] pt-28 relative  grid place-items-center `}>
        {/* <img loading="lazy" decoding="async" src={banner?banner[0]:HeroImg.src} className="w-full h-full absolute top-0 z-[-1]" />
         */}
        <video
          src="/video/precrument.mp4"
          muted
          autoPlay
          loop
          controls
          playsInline
          className={`w-full  h-full    object-cover absolute top-0 z-[-1] ${
            isScroll ? 'h-[400px]' : ''
          } `}
        />
      </section>
      <div className="flex w-full    justify-center pt-5 space-x-2 items-center relative before:absolute before:-bottom-3 before:w-20   before:h-0.5 before:bg-primary-main">
                      <Link className="  text-sm font-bold  " href={`/` || ''}>
              Home
            </Link>

            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold    " href={` `}>
              Animal Husbandery
            </Link>

            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold text-primary-main  " href={` `}>
              Cattle Insurance
            </Link>
            
      </div>

      <section className="w-full h-auto p-10   relative flex justify-center items-center flex-col  space-y-6  ">
        <div className="w-full flex flex-col justify-center items-center space-y-5">
       

          <div className="relative w-full mb-20   flex justify-center items-center    before:absolute before:w-full before:h-0.5 before:bg-neutral-dark4 before:-bottom-3  ">
            <ul className="flex justify-center items-center  space-x-7">
              {tabs?.map((tab, idx) => {
                return (
                  <li
                    key={idx}
                    onClick={() => handleTabs(idx)}
                    className={`${currentIndex===idx?'text-secondary-main relative  ':''} font-extrabold text-xs font-subheading md:text-xl transition-all duration-100  uppercase cursor-pointer hover:scale-[1.1]`}>
                    {tab.tabName}
                  </li>
                );
              })}
            </ul>
            
       

          </div>
          <div className="mb-20     relative w-full  flex justify-center items-center ">
              <img loading="lazy" decoding="async"
                src="/images/heading/heading-primary.svg"
                className="absolute   w-[530px] top-[-60px]    object-contain"
              />
              <h1 className=" text-primary-main relative z-10 font-heading text-2xl font-extrabold uppercase">
              {tabs[currentIndex].tabName}
              </h1>
            </div>
        </div>
      </section>
       
      {tabs?.map((tab, id) => {
        if (currentIndex === id) {
          return tab.data;
        }
      })} 
    
       
<Footer />
    </div>
  );
}

export default CattleInsuranceComponent;
