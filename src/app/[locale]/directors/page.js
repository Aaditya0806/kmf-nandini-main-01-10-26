'use client';

import React, { useEffect, useState } from 'react';
 
import Footer from '@/components/Footer';
import TeamCard from './TeamCard';
import useApi from '@/hooks/useApi';
import { useParams } from 'next/navigation';
import Zoom from 'react-reveal/Zoom';
import { Fade } from 'react-reveal';
import { ParallaxBanner } from 'react-scroll-parallax';
import { useMyContext } from '@/context/headerContext';

function Directors() {
  const [directors, setDirectors] = useState([]);
  const axios = useApi();
  const locale = useParams().locale;
  const [chairmain, setChairman] = useState([]);
   
  const {isScroll} =useMyContext()

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/api/directors?sort[0]=createdAt:asc');

      const { data: chairman } = await axios.get('/api/chairmain');

      const directorsData = data?.data?.map((item, id) => {
        return {
          title: item?.attributes?.name,
          image: item?.attributes?.image?.data?.map((item) => item?.attributes?.url),
          description: item?.attributes?.description
        };
      });
      setDirectors(directorsData);
      setChairman(chairman?.data);
      setLoading(false)
    })();
  }, []);

 

  return (
    <div className={`w-full h-full absolute top-0 z-[-1] ${isScroll?'top-36':''}`}>

<ParallaxBanner
      layers={[
        { image: '/images/board-of-directors.jpeg', speed: -20 },
        {
          speed: -15,
          children: <h></h>
        }
      ]}
      className="  w-full h-[300px] md:h-[600px]   object-contain ">
      <section className={`w-full h-full  md:h-[700px] pt-28 relative  grid place-items-center  `}>
        <img loading="lazy" decoding="async" src={'/images/board-of-directors.jpeg'} className="w-full h-full object-cover absolute   z-[-1]" />
       

      </section>
    </ParallaxBanner>
     

     
    

      <section className="w-full   pt-20  shadow-lg   ">
      <div className="    relative w-full  flex flex-col justify-center items-center ">
            
              <h1 className=" text-primary-main relative z-10 font-heading text-4xl font-extrabold uppercase">
              
          {locale === 'en' ? 'Board of Directors' : 'ಆಡಳಿತ ಮಂಡಳಿ ನಿರ್ದೇಶಕರು'}
              </h1> 
              <br />
              {/* <p className=" text-primary-main relative z-10 font-heading text-xl font-extrabold uppercase">
              
          {locale === 'en' ? 'Will be updated soon' : 'Will be updated soon'}
              </p> */}
            </div>
         
        <div className="  h-full  ">
        <div className='  h-full flex justify-center items-center   '>
          <Fade bottom>
        <div className='w-full max-w-7xl mt-auto min-h-44  md:h-2/4   justify-center items-center  rounded-tl-3xl rounded-br-3xl flex flex-col   p-3'>
            <div className='md:w-1/2 flex   justify-center  items-center mt-6 lg:pt-3 lg:pb-3 md:mt-0 rounded-full transition-all duration-300 hover:scale-[1.1]  '  >
              {/* <Zoom>
              <img loading="lazy" decoding="async" className='w-[200px] h-[200px]  object-cover  sm:w-[350px] sm:h-[390px] transition-all duration-300   ' src={chairmain?.attributes?.image?.data?.attributes?.url} alt="" />
              </Zoom> */}
            </div>
            <div className=' md:w-2/3 flex flex-col justify-center items-center mt-3 md:p-3 md:items-center lg:mt-0 '>
              <div>
                <p className='text-3xl md:text-4xl font-lato font-bold text-center text-black'>{chairmain?.attributes?.name}</p>
                {/* <p className=' text-lg flex justify-center items-center  w-full  font-lato md:text-start text-black '>{chairmain?.attributes?.description}</p> */}
                {
  locale === 'en' ? (
    <p className="text-lg flex justify-center items-center w-full font-lato md:text-center text-black">
      Administrator, <br />
      Karnataka Co-operative Milk Producers’ Federation Ltd. (KMF)
    </p>
  ) : (
    <p className="text-lg flex justify-center items-center w-full font-lato md:text-center text-black">
      ಆಡಳಿತಾಧಿಕಾರಿಗಳು <br />
      ಕರ್ನಾಟಕ ಸಹಕಾರ ಹಾಲು ಉತ್ಪಾದಕರ ಮಹಾಮಂಡಳಿ ನಿಯಮಿತ (ಕೆಎಂಎಫ್)
    </p>
  )
}
                                

              </div>
           
            </div>
        </div>

        </Fade>
    
      </div>
          {/* <div className="grid grid-cols-2 p-2 md:grid-cols-4  sm:grid-cols-3  place-items-center gap-5 md:flex-row mt-10 justify-center">

    
            {directors?.map((item, id) => {
              return (
                <TeamCard
                  key={id}
                  imgUrl={item?.image?.[0]}
                  fullName={item?.title}
                  desc={item?.description}
                /> 
              );
            })}
          </div> */}
        </div>
      </section>

       
<Footer />
    </div>
  );
}

export default Directors;
