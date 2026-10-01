import React, { useState, useEffect } from 'react';
import { RxCross2 } from "react-icons/rx";
 

const Preloader = () => {
 
const [animationClass, setAnimationClass] = useState('');
const imgURL='/poster/home-banner-card.jpeg'
const [isBannerVisible, setIsBannerVisible] = useState(false);

// Check local storage on initial load

useEffect(() => {
  if (isBannerVisible) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  return () => {
    document.body.style.overflow = 'auto';
  };
}, [isBannerVisible]);


useEffect(() => {
  const isBannerDismissed = localStorage.getItem("bannerDismissed");
  if (!isBannerDismissed) {
    setIsBannerVisible(true);
  }
}, []);

// Handle banner dismissal
const closeBanner = () => {
  localStorage.setItem("bannerDismissed", "true");
  setIsBannerVisible(false);
};

if (!isBannerVisible) return null;


  return (
    <div className='fixed w-full h-[100vh] top-0 z-[100]' onClick={closeBanner}>
      <div className={`relative w-full h-full ${animationClass}`}>
        <div className='absolute w-full h-full bg-black opacity-80 z-40' ></div>
        <div className='absolute w-full h-full z-[100]'>
          <div className='flex w-full h-full'>
            <div className='relative flex flex-col justify-center w-full max-w-[1200px] m-auto  rounded-lg  p-3'>
              <div className='absolute border border-black shadow-lg rounded-full cursor-pointer top-[-10px] right-5' onClick={closeBanner}>
                <RxCross2 size={20} color='#fff' />
              </div>
            
              
              <div className='m-auto w-full h-full'>
                <img loading="lazy" decoding="async" src={imgURL} alt="poster-logo" className='w-[90%] h-[90%] m-auto' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
