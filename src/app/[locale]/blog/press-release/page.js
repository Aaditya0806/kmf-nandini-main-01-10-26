'use client';

import React, { useEffect, useState } from 'react';
import AboutHeroImg from '@/images/about/mission/about-hero.png';
import Link from 'next/link';
import useApi from '@/hooks/useApi';

import Follow from '@/components/Follow.js';
import Footer from '@/components/Footer';
 
import { PhotoProvider, PhotoView } from 'react-photo-view';
 import useLocale from '@/hooks/useLocale';
import { Zoom } from 'react-reveal';

function PressRelease() {
  

   
   
  const [pressRel,setPressRel]=useState([])
  const axios=useApi()
 
  const locale=useLocale().locale
  useEffect(() => {
      (async () => {
        const { data } = await axios.get('/api/galleries');
   
        setPressRel(data.data[0]);
       
   
      })();
    }, []);
  

   

  return (
    <div className="w-full h-full  absolute md:top-52 z-[-1]     ">
      <section className={`w-full h-[200px] md:h-[450px] lg:h-[750px] pt-28 relative grid place-items-center  `}>
      <div className="absolute w-full h-full hidden lg:block z-[-10] ">
            <div className="w-full h-full flex justify-between items-center">
              <div className="w-40 h-8 bg-red-600"></div>
              <div className="w-40 h-8 bg-red-600"></div>
            </div>
          </div>
        <img loading="lazy" decoding="async" src={'/images/press.jpg'} className="w-full max-w-7xl h-full object-contain absolute top-0 z-[-1]" />
      </section>


      <section className="w-full h-fit m-auto pt-10   ">
        <div className="w-full space-y-5 p-4 ">
          <div className="   relative w-full  flex justify-center items-center ">
            <h1 className=" text-primary-main relative z-10 font-heading text-4xl font-extrabold uppercase">
              {locale === 'en'
                ? `Gallery`
                : `
ಗ್ಯಾಲರಿ`}
            </h1>
          </div>

          <div className="w-full flex justify-center items-center pt-10 relative before:absolute before:-bottom-3 before:w-full before:max-w-[1200px] before:h-0.5 before:bg-neutral-dark4">
            <ul className="flex gap-5">
              <Link href={`/${locale}/blog/gallery`}>
                <li
                  className={` 
                   text-[11px] md:text-sm relative  
                       
                  uppercase`}>
                  NEWS AND EVENTS
                </li>
              </Link>

              <Link href={`/${locale}/blog/press-release`}>
                <li
                  className={` 
                  text-primary-main text-[11px] md:text-xl font-bold relative before:absolute before:-bottom-3 before:w-full before:h-0.5 before:bg-primary-main
                        
                   uppercase`}>
                  {locale==='kn'?'ಮಾದ್ಯಮ ಪ್ರಕಟಣೆ':'Press Release'}
                </li>
              </Link>


<Link href={`/${locale}/blog/tv-commercial`}>

              <li
                className={` 
                text-[11px] md:text-sm relative  
                    
               uppercase`}>
                {locale==='kn'?'ಟಿ.ವಿ. ಜಾಹೀರಾತುಗಳು':'Tv commercial'}s
              </li>
              </Link>

            </ul>
          </div>
        </div>
        <div className='w-full max-w-[1400px] p-4 m-auto  h-full  grid place-items-center grid-cols-3  lg:grid-cols-4 gap-8 mb-20 '>

{

    pressRel?.attributes?.pressRelease?.data?.map((item,id)=>{
        
        return(
            <div key={id} className=' w-28 h-36 md:w-full md:max-w-72 md:h-72 m-2 shadow-lg'>
              <Zoom>
                <PhotoProvider >

<PhotoView src={item?.attributes?.url} height="400px"  >
<img loading="lazy" decoding="async" src={item?.attributes?.url} className='    w-full h-40 md:max-w-72 md:h-72 '/>
</PhotoView>


</PhotoProvider>
</Zoom>
             
    </div>
        )
    })
}

  
</div>
      </section>

      

       
<Footer />
    </div>
  );
}

export default PressRelease;
