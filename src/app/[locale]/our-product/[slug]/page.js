'use client';
import React, { useEffect, useState } from 'react';

import Footer from '@/components/Footer';
import useApi from '@/hooks/useApi';
import { useParams } from 'next/navigation';
import { useMyContext } from '@/context/headerContext';
import { Carousel } from 'react-responsive-carousel';
import Link from 'next/link';
import useLocale from '@/hooks/useLocale';
import ProductAccordion from '@/components/ProductAccordion';
import downarrowIco from '@/images/icons/downarrow.svg';
import gheeImg from '@/images/product/ghee.jpg';
import gheeImg2 from '@/images/product/ghee2.jpg';
import uparrowIco from '@/images/icons/uparrow.svg';
import { Fade } from 'react-reveal';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Pagination,
  Autoplay,
  FreeMode,EffectFade
} from 'swiper/modules';
import { useSwiper } from 'swiper/react';
import 'swiper/css/effect-fade';
const fetchProducts = async (axios) => {
  const { data } = await axios.get('/api/product-sub-items?sort[0]=createdAt:asc');
  return data;
};

const fetchSubCategories = async (axios) => {
  const { data } = await axios.get('/api/subcategories?sort[0]=createdAt:asc');
  return data;
};

const fetchCategories = async (axios) => {
  const { data } = await axios.get('/api/categories?sort[0]=order:asc');
  return data;
};

function Milk() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [openAccordion, SetOpenAccordion] = useState(null);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const axios = useApi();
  const param = useParams();

  // const [title, setTitle] = useState('');
  const [expandedDescriptionIndex, setExpandedDescriptionIndex] = useState(null);
  const { isScroll, setIsScroll } = useMyContext();
  const locale = useLocale().locale;

  const [showMore, setShowMore] = useState(false);
  const arrows = {
    down: downarrowIco.src,
    up: uparrowIco.src
  };

  const { data: allproducts } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts(axios),
    staleTime: 60 * 60 * 1000 // 1 hour
  });

  const { data: subcategories } = useQuery({
    queryKey: ['subcategories'],
    queryFn: () => fetchSubCategories(axios),
    staleTime: 60 * 60 * 1000 // 1 hour
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => fetchCategories(axios),
    staleTime: 60 * 60 * 1000 // 1 hour
  });

  const product = allproducts?.data?.filter(
    (item) => item?.attributes?.subcategory?.data?.id === parseInt(param?.slug)
   
  );

  const title = subcategories?.data?.filter((item) => item?.id === parseInt(param?.slug))[0];

  const handleSeeMoreClick = (index) => {
    setExpandedDescriptionIndex(index === expandedDescriptionIndex ? null : index);
  };
  const handleAccordionClick = (accordionId) => {
    SetOpenAccordion(openAccordion === accordionId ? null : accordionId);
    
  };
 
  return (
    <div className={`w-full h-full relative ${isScroll ? 'top-0' : ''}  `}>

       {/* { title?.attributes?.title ==='Ghee' ?  
      
      <div className={`w-full relative   ${isScroll ? 'h-[240px] md:h-[812px]' : 'h-[240px]  md:h-screen'}`}  >
                  <div
                          id="imageDiv"
                          className={`transition-all duration-700 scroll-smooth  ${isScroll ? 'h-[240px] md:h-[812px]' : 'h-[240px]  md:h-screen'}${
                            
                          
                             'absolute w-full h-full z-[-1]'
                          }`}>
                          <div className=" relative w-full h-full">
                            <section className={`w-full h-full relative`}>
                              <Swiper
                              effect="fade"
                                autoplay={{
                                  delay: 3000,
                                  disableOnInteraction: false
                                }}
                                direction={'horizontal'}
                                pagination={{
                                  clickable: true
                                }}
                                modules={[Pagination, Autoplay, FreeMode ,EffectFade]}
                                className="h-full">
                                <SwiperSlide>
                                                       <video
          muted
          playsInline
          autoPlay
          loop
          controls
          src={title?.attributes?.video?.data?.attributes?.url || '/video/our-product.mp4'}
          className={`w-full h-full  object-fill absolute top-0    `}
        />
                                                        </SwiperSlide>
                                                     <SwiperSlide>
                                                      <video
          muted
          playsInline
          autoPlay
          loop
          controls
          src={title?.attributes?.video?.data?.attributes?.url || '/video/our-product.mp4'}
          className={`w-full h-full  object-fill absolute top-0    `}
        />
                                                        </SwiperSlide>
                                             
                              </Swiper>
                            </section>
                          </div>
                        </div>
                
            
           
                  
                 </div>
      
      :   
      <section
        className={`w-full h-[300px]    relative  grid place-items-center ${
          isScroll ? 'md:h-[600px]' : 'h-[85vh]'
        }`}>
        <video
          muted
          playsInline
          autoPlay
          loop
          controls
          src={title?.attributes?.video?.data?.attributes?.url || '/video/our-product.mp4'}
          className={`w-full h-full  object-fill absolute top-0    `}
        />
      </section>
     }  */}
    

       
     

      <section className="w-full h-full     bg-[#FFFFFF] ">
        
        <div className="w-full  pb-10">
          <div className='bg-[radial-gradient(circle_at_center,#3e73a7,#074989)] pb-10 w-full'>
          <div className="flex w-full    justify-center pt-5 space-x-2 items-center relative before:absolute before:-bottom-3 before:w-20   before:h-0.5 before:bg-white">
            <Link className="  text-[#fff] opacity-[.5] text-sm font-bold  " href={`/${locale}/our-product/` || ''}>
              {locale === 'kn' ? 'ನಮ್ಮ ಉತ್ಪನ್ನಗಳು' : 'Our Products'}
            </Link>

            <p className="text-white">&gt;</p>
            <Link className=" text-[#fff] opacity-[.5] text-sm font-bold  " href={`/${locale}/our-product/`}>
              {title?.attributes?.title}
            </Link>
            <p className="text-white">&gt;</p>
            <Link className="  text-sm font-bold text-white" href={''}>
              {title?.attributes?.title}
            </Link>
          </div>
          <div className="w-full max-w-7xl m-auto flex flex-col justify-center items-center space-y-4 pt-10 ">
            <h1 className="text-[#fff] opacity-[.5] relative  m-auto text-center z-10 font-heading text-4xl font-extrabold uppercase">
              {title?.attributes?.title} {locale === 'kn' ? ' ' : 'Family'}
            </h1>

            {/* <p className="text-2xl ">{title?.attributes?.description}</p> */}
          </div>
          </div>


          
          <div
            className={`w-full h-full mt-10 max-w-[1600px] m-auto  flex flex-col space-y-5 ${
              title?.attributes?.Heading ? 'mt-' : ''
            } `}>
            {/* <div className="mb-20    relative w-full  flex justify-center items-center ">
              <h1 className=" text-primary-main relative  m-auto text-center z-10 font-heading text-4xl font-extrabold uppercase">
                {title?.attributes?.title} {locale === 'kn' ? ' ' : 'Family'}
              </h1>
            </div> */}

            <div className="flex w-full justify-evenly items-start space-x-5">
              <div className="w-full max-w-8xl m-auto h-full pt-10 place-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                {product?.map((item, id) => {
                  return (
                    <div
                      key={id}
                      className={`max-w-96 h-full   relative flex flex-col justify-between items-start ${
                        item?.attributes?.isLatest ? 'our-product-latest' : ''
                      } `}>
                      {item?.attributes?.isLatest && (
                        <img loading="lazy" decoding="async"
                          src="/images/product-new/new.gif"
                          className="w-20 absolute right-5  z-[10]"
                        />
                      )}

                      <Fade top>
                        <div className="w-full   justify-center items-center flex p-2  ">
                          <Carousel
                            className="w-2xl h-96"
                            autoPlay={false}
                            interval={2000}
                            showStatus={false}
                            infiniteLoop
                            showThumbs={false}
                            showIndicators={false}>
                            {item?.attributes?.image?.data?.map((item, id) => {
                              const validExtensions = [
                                '.png',
                                '.jpg',
                                '.jpeg',
                                '.JPG',
                                '.JPEG',
                                '.PNG'
                              ];
                              if (validExtensions.includes(item?.attributes?.ext)) {
                                return (
                                  <img loading="lazy" decoding="async"
                                    key={id}
                                    src={item?.attributes?.url}
                                    className="w-40 h-80  object-contain transition-transform duration-300 ease-in-out hover:scale-125"
                                  />
                                );
                              } else {
                                return (
                                  <video
                                    autoPlay
                                    controls
                                    loop
                                    muted
                                    key={id}
                                    src={item?.attributes?.url}
                                    className="w-full h-80   object-contain  transition-all duration-300 hover:scale-105"
                                  />
                                );
                              }
                            })}
                          </Carousel>
                        </div>
                      </Fade>
                      <Fade bottom>
                        <div
                          className="w-full h-full  p-2 text-justify flex flex-col space-y-3 pb-3 justify-start items-start
                                  ">
                          <p className="text-xl text-center w-full">{item?.attributes?.name}</p>
                          <p
                            className={`text-center w-[80%] m-auto  p-3 rounded-lg ${
                              item?.attributes?.quantity ? 'bg-yellow-300' : 'hidden'
                            }`}>
                            {item?.attributes?.quantity}
                          </p>
                          {/* <p
                            className={`text-md text-center w-full ${
                              item?.attributes?.description ? '' : 'hidden'
                            }`}>
                            {expandedDescriptionIndex === id ||
                            item?.attributes?.description?.length <= 50
                              ? item?.attributes?.description
                              : `${item?.attributes?.description?.substring(0, 100)}... `}

                            {item?.attributes?.description?.length > 100 && (
                              <button
                                className="text-primary-main"
                                onClick={() => handleSeeMoreClick(id)}>
                                {expandedDescriptionIndex === id ? 'See less' : 'See more'}
                              </button>
                            )}
                          </p> */}
                        </div>
                      </Fade>
                    </div>
                  );
                })}
              </div>

              {/* <div className="w-60 pt-10 transition-all duration-300 hidden lg:block">
                <div className="w-full h-fit transition-all duration-300 flex flex-col  shadow-lg    justify-start   items-start rounded-lg border-b-2 border-primary-main  ">
                  <div className="w-full mb-2    shadow-md bg-primary-main  ">
                    <h1 className="p-5 text-lg uppercase   text-white text-center w-full">
                      {' '}
                      {locale === 'kn' ? 'ನಮ್ಮ ಉತ್ಪನ್ನಗಳು' : 'Our Products'}
                    </h1>
                  </div>

                  {showMore
                    ? subcategories?.data?.map((items, idx) => {
                        return (
                          <ProductAccordion
                            title={items?.attributes?.title}
                            id={idx}
                            open={openAccordion == idx}
                            arrow={arrows}
                            onToggle={handleAccordionClick}
                            key={idx}>
                            <ul className="">
                              {items?.attributes?.product_sub_items?.data?.map((item, index) => {
                                return (
                                  <Link
                                    href={`/${locale}/our-product/${items?.id}` || ''}
                                    key={index}
                                    onClick={() => setOpenNav((prev) => !prev)}>
                                    <Fade right>
                                      <li
                                        key={index}
                                        className="flex items-center  relative  text-light-light4 border-b-2 border-b-light-light4 pb-2 space-x-3 ">
                                        <span>{item?.attributes?.name}</span>
                                      </li>
                                    </Fade>
                                  </Link>
                                );
                              })}
                            </ul>
                          </ProductAccordion>
                        );
                      })
                    : categories?.data?.map((items, idx) => {
                        if (idx <= 10) {
                          return (
                            <ProductAccordion
                              title={items?.attributes?.title}
                              id={idx}
                              open={openAccordion == idx}
                              arrow={arrows}
                              onToggle={handleAccordionClick}
                              key={idx}>
                              <ul className="">
                                {items?.attributes?.subcategories?.data?.map((item, index) => {
                                  return (
                                    <Link
                                      href={`/${locale}/our-product/${item?.id}` || ''}
                                      key={index}
                                      onClick={() => setOpenNav((prev) => !prev)}>
                                      <Fade right>
                                        <li
                                          key={index}
                                          className="flex items-center  relative  text-light-light4 border-b-2 border-b-light-light4 pb-2 space-x-3 ">
                                          <span>{item?.attributes?.title}</span>
                                        </li>
                                      </Fade>
                                    </Link>
                                  );
                                })}
                              </ul>
                            </ProductAccordion>
                          );
                        }
                      })}
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Milk;