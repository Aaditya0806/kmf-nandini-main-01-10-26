"use client"
import React from 'react'
import titleBG from '@/images/portfolio/title-bg.png';
import Follow from '@/components/Follow.js';
import Footer from '@/components/Footer';
import comingSoonImg from '@/images/notfound/comingsoon.png'
import ComingSoon from '../../comingsoon/page';
import useLocale from '@/hooks/useLocale';
import Link from 'next/link';



const Defence = () => {
  const locale = useLocale().locale;
  return (
     <>
    <div className='w-full h-auto'>
        {/* <div className=' relative w-full h-full flex justify-center mt-20'>

            <h1 className='text-primary-main text-2xl md:text-4xl  ' > DEFENCE </h1>
            <img loading="lazy" decoding="async" className='absolute top-[-50px] left-[46%] w-40 ' src={titleBG.src} alt="" />
        </div> */}
         {/* <div className="flex w-full    justify-center pt-5 space-x-2 items-center relative before:absolute before:-bottom-3 before:w-20   before:h-0.5 before:bg-primary-main">
            <Link className="  text-sm font-bold  " href={`/${locale}/portfolio/` || ''}>
            KMF ACHIEVEMENTS
            </Link>

           
            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold text-primary-main" href={''}>
            DEFENCE
            </Link>
          </div> */}

        <div className='w-full h-full'>
          <ComingSoon/>
        </div>
       
        
    </div>
    <Footer/>
    </>
  
  )
}

export default Defence
