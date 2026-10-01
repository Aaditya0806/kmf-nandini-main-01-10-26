'use client';
import React, { useEffect, useState } from 'react';
import sweet from '@/images/recipes/sweet.jpg';
import Follow from '@/components/Follow.js';
import Footer from '@/components/Footer';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import useApi from '@/hooks/useApi';

import useLocale from '@/hooks/useLocale';

import { Carousel as Carousels } from 'react-responsive-carousel';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useParams } from 'next/navigation';
import { VscArrowSmallRight } from 'react-icons/vsc';
import { VscArrowSmallLeft } from 'react-icons/vsc';

const RecipeDetail = ({ slug }) => {
  const [recipeDetail, SetRecipeDetail] = useState([]);
  const axios = useApi();
  const param = useParams();
  const locale = useLocale().locale;
  useEffect(() => {
    (async () => {
      const { data: recipe } = await axios.get('/api/recipes');
      const recipeDetail = recipe?.data?.filter((item) => item?.id === parseInt(param.slug));
       
      SetRecipeDetail(recipeDetail[0]);
    })();
  }, []);

  return (
    <div className="w-full h-full">
      <div className="w-full h-full md:mt-20 md:pb-40">
        <div className="flex flex-col justify-center items-center">
          <div className="mb-4  mt-20  relative w-full  flex justify-center items-center ">
            <h1 className=" text-primary-main relative  m-auto text-center z-10 font-heading text-5xl font-extrabold uppercase">
            {locale==='kn'?'ನಂದಿನಿ ಪಾಕವಿಧಾನಗಳು':'Nandini Recipies'}
            </h1>
          </div>
          <div className="w-40 h-1 bg-primary-main mt-"></div>
          <h1 className="text-primary-main  text-2xl md:text-4xl mt-10">
            {recipeDetail && recipeDetail?.attributes?.title}
          </h1>
        </div>

        <div className="w-full h-full relative mt-10 md:mt-20 ">
          <div className="relative w-full h-auto">
            <div className="absolute w-full h-full z-[-10] ">
              <div className="w-full h-full flex justify-between items-center">
                <div className="w-40 h-8 bg-red-600"></div>
                <div className="w-40 h-8 bg-red-600"></div>
              </div>
            </div>

            <div className="absolute w-full h-full z-[1] ">
              <div className="w-full h-full flex justify-center items-center">
                <div className="max-w-3xl w-full h-full flex justify-between items-center p-5">
                  <VscArrowSmallLeft size={60} className="text-white" />
                  <VscArrowSmallRight size={60} className="text-white" />
                </div>
              </div>
            </div>
 
            <Carousels
              className="w-2xl h-[500px] relative z-[2]"
              autoPlay={true}
              interval={4000}
              showStatus={false}
              infiniteLoop
              showThumbs={false}
              showIndicators={true}
              showArrows={true}>
              <div className="m-auto max-w-3xl h-[500px] flex justify-center items-center p-1">
                <img loading="lazy" decoding="async"
                  className="w-full  "
                  src={recipeDetail && recipeDetail?.attributes?.image?.data?.[0]?.attributes?.url}
                  alt=""
                />
              </div>
                 
              <div className="m-auto max-w-3xl h-[500px] flex justify-center items-center p-1">
                <video preload="none"
                  className=" w-full h-full object-fill"
                  muted
                  controls
                  loop
                  playsInline
                  src={
                    recipeDetail && recipeDetail?.attributes?.video?.data?.[0]?.attributes?.url
                  }></video>
              </div>
            </Carousels>
          </div>
          {/* <div className="w-full h-full flex justify-center items-center gap-10 p-10">
            <div className="w-20 h-20 bg-red-400"></div>
            <div className="w-20 h-20 bg-red-400"></div>
          </div> */}
        </div>
      </div>
       
<Footer />
    </div>
  );
};

export default RecipeDetail;