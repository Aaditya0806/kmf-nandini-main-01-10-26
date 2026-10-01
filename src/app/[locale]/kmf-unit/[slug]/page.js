'use client';
import React, { useEffect, useState } from 'react';
 
import Footer from '@/components/Footer';
import useApi from '@/hooks/useApi';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useMyContext } from '@/context/headerContext';
import locationIco from '@/images/milk-union/icons/location_on.svg';
import mailIco from '@/images/milk-union/icons/mail.svg';
import callIco from '@/images/milk-union/icons/call.svg';
import printIco from '@/images/milk-union/icons/print.svg';
function KmfUnitDetail() {
  
  const [unit, setUnit] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [banner,setBanner]=useState()
  const param = useParams();
  const [allUnits,setAllUnits]=useState([])
  const [unitImages,setUnitImages]=useState([])
  const [loading,setLoading]=useState(true)
  const [bannerImg,setBannerImg]=useState()

  const axios = useApi();
  const [readMore, setReadMore] = useState(false);
  const locale=useParams().locale
  const { isScroll, setIsScroll, id, setId } = useMyContext();
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/api/units-of-kmfs/${param?.slug}`);
      
      const { data:unions } = await axios.get('/api/units-of-kmfs?sort[0]=order:asc');
      setAllUnits(unions?.data)
      setBanner(data?.data?.attributes?.bannervideo?.data?.attributes?.url)
      setBannerImg(data?.data?.attributes?.banner?.data?.attributes?.url)
      setUnit(data?.data);
      setUnitImages(data?.data?.attributes?.image?.data);
      setLoading(false)
    })();
  }, []);

  return (
    <div className={`w-full h-full absolute    z-[-1] ${isScroll ? ' md:top-48' : ''}  `}>

      {banner?
       <section className={`w-full h-full md:h-[600px] pt-28 relative  grid place-items-center `}>
       {/* <img loading="lazy" decoding="async" src={banner?banner[0]:HeroImg.src} className="w-full h-full absolute top-0 z-[-1]" />
        */}
       
       <video
         src={banner || ''}
         muted
         autoPlay
         loop
         controls
         playsInline
         className={`w-full  h-full    object-fill absolute top-2   ${
           isScroll ? '' : ''
         } `}
       />
     </section>:
      <section className={`w-full h-full md:h-[500px] pt-28 relative  grid place-items-center `}>
      {/* <img loading="lazy" decoding="async" src={banner?banner[0]:HeroImg.src} className="w-full h-full absolute top-0 z-[-1]" />
       */}
      
      <img loading="lazy" decoding="async"
        src={bannerImg || ''}
        
        className={`w-full  h-full    object-fill absolute top-0 z-[-1] ${
          isScroll ? 'h-[400px]' : ''
        } `}
      />
    </section>
      }
 
<div className='w-full bg-[#F6F6F6]'>


  <section className="max-w-[1282px]  m-auto grid grid-cols-3 gap-5   p-2 ">
    <div
      className="w-full max-w-7xl h-full  col-span-2  m-auto p-5  rounded-tl-3xl  rounded-br-3xl  bg-white  shadow-sm"
      >
      <div className="w-full h-full flex flex-col space-x-5 justify-center items-center lg:flex-row lg:justify-start">

        {/* {unionImages?.[currentIndex]?
          <div className="w-full flex flex-col justify-center items-center space-y-5">
          <div className="  max-w-[458px]    ">
            <img loading="lazy" decoding="async"
              src={unionImages?.[currentIndex]?.attributes?.url}
              alt="slider-img"
              className="w-full h-full"
            />
          </div>

      
        </div>
        
        :''} */}
      
      <div className="w-full h-full flex flex-col justify-center items-center pt-10 space-y-5 lg:items-start">
      <div className="mb-8    relative w-full  flex justify-center items-center ">
            
              <h1 className=" text-primary-main relative max-w-[300px] m-auto text-center z-10 font-heading text-xl font-extrabold uppercase">
              {unit?.attributes?.title}
              </h1>
            </div>

 
 
<div className=" w-full h-full ">

{unit?.attributes?.description?.length > 2

    ? unit?.attributes?.description?.map((item, idx) => {
      
        if (idx < 5) {
          return (
            <div key={idx} className={`${readMore ? 'hidden' : ''}`}>
              <p className=" text-xs md:text-xl font-josefin  text-justify">{item?.children[0]?.text}</p>

         
            </div>
          );
        }
      })
    : unit?.attributes?.description?.map((item, idx) => {
        return (
          <p key={idx} className="text-xs md:text-xl font-josefin  text-justify">
            {item?.children[0]?.text}
          </p>
        );
      })}

{ readMore && unit?.attributes?.description?.map((item, idx) => (
  <p key={idx} className="text-neutral-dark1 text-xs md:text-lg">
    {item?.children[0]?.text}
  </p>
))}

 

<div
                className={`w-full  flex justify-end items-end text-xs md:text-lg text-primary-main hover:underline cursor-pointer ${readMore?'hidden':''}`}
                onClick={() => setReadMore(true)}>
                  {locale==='kn'?'ಮತ್ತಷ್ಟು ಓದಿ':'Read more...'}
                
              </div>
              <div
                className={`w-full  flex justify-end items-end text-xs md:text-lg text-primary-main hover:underline cursor-pointer ${!readMore?'hidden':'block'}`}
                onClick={() => setReadMore(false)}>
                  {locale==='kn'?'ಕಡಿಮೆ ಓದಿ':'Read Less...'}
                
              </div>

</div>
</div>
      </div>
    </div>


    <div className="w-fit h-fit flex flex-col  shadow-md bg-white p-2  justify-start   items-start rounded-lg border-b-2 border-primary-main  ">
            <div className='w-full    shadow-md bg-white  '>
              <h1 className='p-5'>{locale==='kn'?'ಕಹಾಮ ಘಟಕಗಳು':'KMF UNITS'}</h1>
            </div>
            
            {allUnits?.map((item, id) => {
              
                return (
                  <Link key={id} href={`/${locale}/kmf-unit/${item?.id}`}>
                  <p  className={`  border m-1 p-1 text-xs rounded w-full ${item?.id===parseInt(param?.slug) ?'bg-primary-main text-white':''} `}>
                    {id+1} - {item?.attributes?.title}
                  </p>
                  </Link>
                );
              })}
          </div>
  </section>
  </div>
 
  <section className="w-full   pb-10  p-2 bg-[#F6F6F6]">
        <div className="max-w-[1282px] h-full  m-auto p-5  rounded-lg  bg-primary-darker text-white  shadow-sm ">
          <div className="flex flex-col h-full space-y-1  p-2 justify-between items-start">
            <h1 className="text-2xl">{unit?.attributes?.longtitle}</h1>

            <div className="flex justify-center items-start space-x-4">
              <img loading="lazy" decoding="async" src={locationIco.src} className="w-5 h-5" />
              <p className="text-lg">{unit?.attributes?.address}</p>
            </div>

            <div className="flex justify-center items-start space-x-4">
              <img loading="lazy" decoding="async" src={callIco.src} className="w-5 h-5" />
              <p className="text-lg"> {unit?.attributes?.phone}</p>
            </div>

            <div className="flex justify-center items-start space-x-4">
              <img loading="lazy" decoding="async" src={printIco.src} className="w-5 h-5" />
              <p className="text-lg"> {unit?.attributes?.fax}</p>
            </div>

            <div className="flex justify-center items-start space-x-4">
              <img loading="lazy" decoding="async" src={mailIco.src} className="w-5 h-5" />
              <p className="text-lg"> {unit?.attributes?.email}</p>
            </div>

            <div className="flex justify-end items-end w-full space-x-4">
              <Link href={unit?.attributes?.unionlink || ''}>
                <p className="text-xl   transition-all duration-300 cursor-pointer hover:underline text-white ">
                  {' '}
                  {locale==="en" ?"Know More":"ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ"} ...
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
   
<Footer />
</div>
  );
}

export default KmfUnitDetail;