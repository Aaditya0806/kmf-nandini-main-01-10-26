'use client';

import React, { useState, useEffect } from 'react';
import AboutHeroImg from '@/images/about/mission/about-hero.png';
import newsImg1 from '@/images/blog/newImg.png';
import Follow from '@/components/Follow.js';
import Footer from '@/components/Footer';
import useApi from '@/hooks/useApi';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import useLocale from '@/hooks/useLocale';
import { Carousel } from 'react-responsive-carousel';
function BlogDetail() {
  const param = useParams();
  const axios = useApi();
  const [blog, setBlog] = useState([]);
  const [recentNew, setRecentNew] = useState([]);
const locale=useLocale().locale
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/api/blog-posts/${param?.slug}`);
      const { data: recentnew } = await axios.get(
        '/api/blog-posts?sort[0]=date:desc&_limit=3'
      );

      
      setBlog(data.data);
   
      if(recentnew?.data?.length > 3){
        setRecentNew(recentnew.data?.slice(0,3));
      }
      else{
        setRecentNew(recentnew?.data)
      }
 
    })();
  }, []);

  return (
    <div className="w-full h-full absolute top-36 z-[-1] ">
      <section className={`w-full  h-80 pt-28 relative  grid place-items-center company-bg`}>
        <img loading="lazy" decoding="async" src={AboutHeroImg.src} className="w-full h-full object-cover absolute top-0 z-[-1]" />
      </section>    
      
      
      <div className="flex w-full    justify-center pt-5 space-x-2 items-center relative before:absolute before:-bottom-3 before:w-20   before:h-0.5 before:bg-primary-main">
                      <Link className="  text-sm font-bold  " href={`/` || ''}>
              Home
            </Link>

            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold    " href={`/${locale}/blog/gallery`}>
              Gallery
            </Link>

            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold text-primary-main  " href={` `}>
              Blog
            </Link>
            
          </div>

      <section className="w-full h-auto pt-10  mb-20 ">
        <div className="w-full p-4 flex  flex-col flex-wrap  justify-center items-center lg:flex-row lg:justify-around lg:items-start">
          <div className="max-w-4xl flex flex-col items-start justify-center space-y-5  ">
            <div className="w-full h-full flex justify-center items-center">

            <Carousel
                          className="w-2xl h-96"
                          autoPlay={true}
                          interval={4000}
                          showStatus={false}
                          infiniteLoop
                          showThumbs={false}
                          showIndicators={false}
                          showArrows={true}
                          
                          >
                          {blog?.attributes?.image?.data?.map((item, id) => {
                          
                          return(

                            <img loading="lazy" decoding="async"
                            key={id}
                            src={item?.attributes?.url}
                            className="w-40 h-80  object-contain  transition-all duration-300 hover:scale-[1.1]"
                          />
                          )
                            
                             
                           
                            }  
                            
                          
                          )}
                        </Carousel>
             
            </div>

            <div className="w-full relative flex justify-between items-center before:absolute before:-bottom-3 before:w-full before:h-0.5 before:bg-neutral-dark4 ">
              <p className="text-sm text-neutral-dark1">{blog?.attributes?.date}</p>
              <p className="text-sm text-neutral-dark1">By: Admin</p>
            </div>

            <div className="flex flex-col justify-start items-start space-y-5">
              <h1 className="text-xl font-bold text-justify">{blog?.attributes?.title}</h1>

              {blog?.attributes?.content?.map((item, idx) => {
                return (
                  <p key={idx} className="text-sm text-neutral-dark1 text-justify">
                    {item?.children[0]?.text}
                  </p>
                );
              })}
            </div>
          </div>

          <div className="flex w-full   flex-wrap sm:flex-nowrap  gap-5 justify-evenly  lg:flex-col lg:max-w-md  items-start lg:justify-center space-y-5  pt-10 lg:pt-0 ">
            <div className="w-full flex flex-col justify-center items-center lg:items-start space-y-6">
              <div>
                <h1 className="text-primary-main   text-lg">Recent News</h1>
              </div>

              {recentNew?.map((news, idx) => {
                return (
                  <Link href={`/${news?.attributes?.locale}/blog/${news?.id}`} key={idx}>
                    <div className="max-w-72 h-36  relative  before:absolute before:-bottom-3 before:w-full before:h-0.5 before:bg-neutral-dark4">
                      <div className=" w-full  h-full flex justify-center items-start space-x-4">
                        <div className="w-72 h-40">
                          <img loading="lazy" decoding="async"
                            src={news?.attributes?.image?.data?.[0]?.attributes?.url}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex w-full flex-col justify-between items-start h-full">
                          <p className="text-sm text-neutral-dark1 text-justify">
                            {news?.attributes?.title}
                          </p>
                          <p className="text-xs text-neutral-dark1">{news?.attributes?.date}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

        
          </div>
        </div>
      </section>

       
<Footer />
    </div>
  );
}

export default BlogDetail;
