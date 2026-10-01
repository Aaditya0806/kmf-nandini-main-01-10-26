'use client';
import React from 'react';
import Follow from '@/components/Follow.js';
import Footer from '@/components/Footer';
import { useMyContext } from '@/context/headerContext';
import useLocale from '@/hooks/useLocale';
import Link from 'next/link';
import { IoHomeOutline } from 'react-icons/io5';

function Scheme() {
  const { isScroll } = useMyContext();
  const locale = useLocale().locale;
  const schemes = [
    {
      title: `${locale === "en" ? "Government of India Schemes":"ಕೇಂದ್ರ ಸರಕಾರದ ಯೋಜನೆಗಳು"}`,
      link: `/${locale}/animal-husbandry/scheme/goi`,
      image:'https://ehealth.eletsonline.com/wp-content/uploads/2023/08/Government-of-India-logo.jpg'
    },
    {
      title:  `${locale === "en" ? "Government of Karnataka Schemes":"ರಾಜ್ಯ ಸರಕಾರದ ಯೋಜನೆಗಳು"}`,
      link: `/${locale}/animal-husbandry/scheme/gok`,
      image:'https://pngimagesfree.com/wp-content/uploads/Karnataka-Govt-Logo-PNG.png'
    },
    {
      title: `${locale === "en" ? "Other Schemes":"ಇತರೆ ಯೋಜನೆಗಳು"}` ,
      link: `/${locale}/animal-husbandry/scheme/other-scheme`,
      image:'https://mc.webpcache.epapr.in/mcms.php?size=large&in=https://mcmscache.epapr.in/post_images/website_326/post_20395626/full.jpg'
    }
  ];
  return (
    <div className={`w-full h-full absolute   z-[-1] ${isScroll ? ' md:top-48' : ''}  `}>
      <section className={`w-full h-full md:h-[700px] pt-28 relative  grid place-items-center `}>
        {/* <img loading="lazy" decoding="async" src={banner?banner[0]:HeroImg.src} className="w-full h-full absolute top-0 z-[-1]" />
         */}
        <video
          src="/video/precrument.mp4"
          muted
          autoPlay
          loop
          controls
          playsInline
          className={`w-full  h-full    object-cover absolute top-0   ${
            isScroll ? 'h-[400px]' : ''
          } `}
        />
      </section>
      <div className="flex w-full  flex-wrap   justify-center pt-5 space-x-2 items-center relative before:absolute before:-bottom-3 before:w-20   before:h-0.5 before:bg-primary-main">
                      <Link className="  text-sm font-bold  " href={`/` || ''}>
                      <IoHomeOutline size={20} />
            </Link>

            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold " href={`${locale==='kn'?'/kn/animal-husbandry/procurement':'/en/animal-husbandry/procurement'}`}>
            {locale==='kn'?' ಹಾಲು ಶೇಖರಣೆ':'Procurement'}
              
            </Link>

            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold  " href={`${locale==='kn'?'/kn/animal-husbandry/animal-health':'/en/animal-husbandry/animal-health'}`}>
            {locale==='kn'?'  ಪಶು ಆರೋಗ್ಯ':'Animal Health'}
            </Link>

            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold  " href={`${locale==='kn'?'/kn/animal-husbandry/animal-breeding':'/en/animal-husbandry/animal-breeding'}`}>
            {locale==='kn'?'ಪಶು ಸಂತಾನಾಭಿವೃದ್ಧಿ ಕಾರ್ಯಕ್ರಮ':'Animal Breeding Program'}
            </Link>

            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold  " href={`${locale==='kn'?'/kn/animal-husbandry/feed-and-fodder':'/en/animal-husbandry/feed-and-fodder'}`}>
            {locale==='kn'?'ಮೇವು ಚಟುವಟಿಕೆಗಳು':'Fodder Activities'}
            </Link>

            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold text-primary-main  "  href={`${locale==='kn'?'/kn/animal-husbandry/scheme':'/en/animal-husbandry/scheme'}`}>
            {locale==='kn'?'ಯೋಜನೆಗಳು/ ಅನುದಾನಗಳು':'Schemes/Grants'}
            </Link>

            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold  " href={`${locale==='kn'?'/kn/women-empowerment':'/en/women-empowerment'}`}>
            {locale==='kn'?'ಸ್ಟೆಪ್ ಯೋಜನೆ':'Step'}
            </Link>
            
      </div>
      <div className="flex w-full    justify-center pt-10 space-x-2 items-center relative before:absolute before:-bottom-3 before:w-20   before:h-0.5 before:bg-primary-main">
                

                <Link className="  text-sm font-bold " href={`${locale==='kn'?'/kn/portfolio#ACHIEVEMENTS':'/en/portfolio#ACHIEVEMENTS'}`}>
                {locale==='kn'?'ಪೋರ್ಟ್ಫೋಲಿಯೋಗೆ ಹಿಂದಿರುಗಲು':'Back to portfolio'}
                  
                </Link>
    
              
                
          </div>
      <section className=" relative w-full h-auto   max-w-7xl m-auto pt-10  ">
      <div className="mb-5 md:mb-20 mt-10   md:mt-20  relative w-full  flex justify-center items-center ">
            
              <h1 className=" text-primary-main relative z-10 font-heading text-2xl font-extrabold uppercase">
              {locale==='kn'?'':'    Schemes'}
              </h1>
            </div>
       

        <div className="w-full  grid sm:grid-cols-2 lg:grid-cols-3 p-5 gap-5 md:pt-10 pb-10 justify-around items-center     ">
          {schemes?.map((item, id) => {
            if(id%2==0){
                return (
                    <div key={id} className="relative w-full h-56 md:w-80 md:h-96   bg-[#f99457] group ">
                             <div className='absolute w-full h-full top-0 left-0 z-20'>
                     <img loading="lazy" decoding="async" className='w-full h-full opacity-0  object-fill transition duration-0 group-hover:opacity-30 group-hover:duration-1000 ' src={item?.image} alt="" />
                </div>

                      <div className="full w-full h-full flex flex-col justify-between p-6 md:p-20 ">
                        <div className="w-full h-full z-50">
                          <h1 className="text-white text-xl md:text-4xl "> {item?.title}</h1>
                        </div>
      
                        <div className="w-28 h-7 md:w-40 md:h-14 border-[1px] border-white z-50 group  ">
                          <Link href= {item?.link || ''}>
                           
                            <div className="w-full h-full flex justify-center items-center border-l-[3px] border-l-white hover:border-[3px]">
                              <p className="text-sm md:text-lg text-white">{locale === "en" ? "Know More": "ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ"}</p>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
            }
            else{
                return (
                    <div key={id} className="relative      w-full h-56  md:w-80 md:h-96  shadow-lg group  bg-[#06427C] ">
                          <div className='absolute w-full h-full top-0 left-0 z-20'>
                     <img loading="lazy" decoding="async" className='w-full h-full opacity-0 transition duration-0 group-hover:opacity-30 group-hover:duration-1000 ' src={item?.image} alt="" />
                </div>
                      <div className="full w-full h-full flex flex-col justify-between p-6 md:p-20 ">
                        <div className="w-full h-full z-50">
                          <h1 className="text-white text-xl md:text-4xl "> {item?.title}</h1>
                        </div>
      
                        <div className="w-28 h-7 md:w-40 md:h-14 border-[1px] group border-white z-50 ">
                          <Link href={item?.link || ''}>
                            {' '}
                            <div className="w-full h-full flex justify-center items-center border-l-[3px] border-l-white hover:border-[3px]">
                              <p className="text-sm md:text-lg text-white">{locale === "en" ? "Know More": "ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ"}</p>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
            }
            
          })}
        </div>
      </section>

       
<Footer />
    </div>
  );
}

export default Scheme;
