'use client';

import React, { useEffect, useState } from 'react';

import Follow from '@/components/Follow.js';
import Footer from '@/components/Footer';

import BlogCard from './BlogCard';

import { useParams } from 'next/navigation';

import Link from 'next/link';

function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const locale = useParams().locale;

  const tabs = [
    {
      tabs: locale === 'kn' ? 'ಸುದ್ಧಿ ಮತ್ತು ಘಟನೆಗಳು' : 'News and Events',
      data: <BlogCard />
    }
  ];

  const handleClickItem = (idx) => {
    setCurrentIndex(idx);
  };

  return (
    <div className="w-full  absolute md:top-52 z-[-1]     ">
      <section className={`w-full h-[200px] md:h-[450px] lg:h-[750px] pt-28 relative grid place-items-center  `}>
        <div className="w-full h-full lg:flex justify-between hidden -z-10  items-center">
          <div className="w-40 h-8 bg-red-600"></div>
          <div className="w-40 h-8 bg-red-600"></div>
        </div>
        <img loading="lazy" decoding="async"
          src={'/images/gallery.png'}
          className="w-full max-w-7xl h-full object-contain absolute top-0 z-[-1]"
        />
      </section>
      <section className="max-w-7xl h-fit m-auto pt-10   ">
        <div className="w-full space-y-5 p-4 ">
          <div className="    relative w-full  flex justify-center items-center ">
            <h1 className=" text-primary-main relative z-10 font-heading text-4xl font-extrabold uppercase">
              {locale === 'en'
                ? `Gallery`
                : `
ಗ್ಯಾಲರಿ`}
            </h1>
          </div>

          <div className="w-full flex justify-center items-center pt-10 relative before:absolute before:-bottom-3 before:w-full before:h-0.5 before:bg-neutral-dark4">
            <ul className="flex gap-5">
              {tabs?.map((item, idx) => {
                return (
                  <li
                    key={idx}
                    className={`${
                      currentIndex === idx
                        ? 'text-primary-main cursor-pointer text-[11px] md:text-xl font-bold relative before:absolute before:-bottom-3 before:w-full before:h-0.5 before:bg-primary-main'
                        : 'text-[11] md:text-sm'
                    } uppercase`}
                    onClick={() => handleClickItem(idx)}>
                    {item?.tabs}
                  </li>
                );
              })}
              <Link href={`/${locale}/blog/press-release`}>
                <li
                  className={` 
                      
                     text-[11px] md:text-sm   relative before:absolute  
                         
                  uppercase`}>
                  {locale === 'kn' ? 'ಮಾದ್ಯಮ ಪ್ರಕಟಣೆ' : 'Press Release'}
                </li>
              </Link>

              <Link href={`/${locale}/blog/tv-commercial`}>
                <li
                  className={` 
                      
                     text-[11px] md:text-sm   relative before:absolute  
                         
                  uppercase`}>
                  {locale === 'kn' ? 'ಟಿ.ವಿ. ಜಾಹೀರಾತುಗಳು' : 'Tv commercial'}
                </li>
              </Link>
            </ul>
          </div>
        </div>

        <div className="w-full mt-10">
          {tabs?.map((tab, id) => {
            if (currentIndex === id) {
              return tab.data;
            }
          })}
        </div>
      </section>

       
<Footer />
    </div>
  );
}

export default Gallery;
