'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import milkIMG from '@/images/our-product/milk.png';

export default function ProductScrollSection({ subcategory, locale }) {
  const sectionRefs = useRef({});
  const [active, setActive] = useState(null);
 const gradientBgs = [
  'bg-[radial-gradient(circle_at_center,#a36ed2,#50227d)]',
  'bg-[radial-gradient(circle_at_center,#6ea8d2,#224d7d)]',
  'bg-[radial-gradient(circle_at_center,#d29c6e,#7d3e22)]',
  'bg-[radial-gradient(circle_at_center,#6ed2b1,#227d63)]',
  'bg-[radial-gradient(circle_at_center,#d26e6e,#7d2222)]',
];

const getBg = (index) =>
  gradientBgs[index % gradientBgs.length];


useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0,
      }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [subcategory]);


  const scrollTo = (id) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative flex">
      {/* LEFT DOT NAV */}
      <ul className="fixed hidden md:block right-6 top-[61%] -translate-y-1/2 z-50 ">
        {subcategory?.map((item) => (
          <li
            key={item.id}
            onClick={() => scrollTo(`product-${item.id}`)}
            className={`cursor-pointer flex uppercase justify-end items-center text-[11px] gap-2 transition ${
              active === `product-${item.id}`
                ? 'text-white font-semibold'
                : 'text-gray-400'
            }`}
          >
            
            {item?.attributes?.title}
            <span
              className={`w-3 h-3 rounded-full ${
                active === `product-${item.id}`
                  ? 'bg-white'
                  : 'bg-gray-300'
              }`}
            />
            
          </li>
        ))}
      </ul>

      {/* SCROLL SECTIONS */}
      <div className="w-full">
        {subcategory?.map((item, index) => {
          if(index%2===0){
             return (
            <section
              key={item.id}
              id={`product-${item.id}`}
              ref={(el) => (sectionRefs.current[`product-${item.id}`] = el)}
              className={`min-h-screen flex items-center ${getBg(index)} px-6`}
            >
              <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                <img loading="lazy" decoding="async"
                //   src={item?.attributes?.image?.data?.[0]?.attributes?.url}
                src={item?.attributes?.image?.data?.[0]?.attributes?.url}
                  alt={item?.attributes?.title}
                  className="mx-auto max-h-[420px]  object-contain"
                />

                <div className=''>
                  <h2 className="absolute top-[-50px]  md:left-[47%] text-6xl md:text-8xl text-[#fff] opacity-[.4] font-bold mb-6">
                    {item?.attributes?.title}
                  </h2>

                  <Link
  href={`/${locale}/our-product/${item.id}`}
  className="
    relative inline-flex items-center gap-2
    rounded-[30px] border border-white
    px-6 py-3 font-medium mt-4
    text-white overflow-hidden
    bg-primary-main
    before:absolute before:inset-0
    before:bg-white
    before:translate-x-full
    before:transition-transform before:duration-700
    before:ease-in-out
    hover:before:translate-x-0
    
    hover:text-primary-main
    z-0
  "
>
  <span className="relative z-10">
   {locale === 'kn' ? 'ಇನ್ನಷ್ಟು ಅನ್ವೇಷಿಸಿ →' : 'Explore more →'}
  </span>
</Link>

                </div>
              </div>
            </section>
          );
          }else{
return (
            <section
              key={item.id}
              id={`product-${item.id}`}
              ref={(el) => (sectionRefs.current[`product-${item.id}`] = el)}
              className={`min-h-screen flex items-center ${getBg(index)} px-6`}
            >
              <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                

                <div className='flex justify-center'>
                  <h2 className="absolute top-[-50px] md:right-[47%] text-6xl md:text-8xl text-[#fff] opacity-[.4] font-bold mb-6">
                    {item?.attributes?.title}
                  </h2>

                  <Link
  href={`/${locale}/our-product/${item.id}`}
  className="
    relative inline-flex items-center gap-2
    rounded-[30px] border border-white
    px-6 py-3 font-medium mt-4
    text-white overflow-hidden
    bg-primary-main
    before:absolute before:inset-0
    before:bg-white
    before:translate-x-full
    before:transition-transform before:duration-700
    before:ease-in-out
    hover:before:translate-x-0
    
    hover:text-primary-main
    z-0
  "
>
  <span className="relative z-10">
 
    {locale === 'kn' ? 'ಇನ್ನಷ್ಟು ಅನ್ವೇಷಿಸಿ →' : 'Explore more →'}
  </span>
</Link>

                </div>
                <img loading="lazy" decoding="async"
                //   src={item?.attributes?.image?.data?.[0]?.attributes?.url}
                src={item?.attributes?.image?.data?.[0]?.attributes?.url}
                  alt={item?.attributes?.title}
                  className="mx-auto max-h-[420px] object-contain"
                />
              </div>
            </section>
          );
          }

          
        })}
      </div>
    </div>
  );
}
