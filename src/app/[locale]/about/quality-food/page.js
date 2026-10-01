'use client';
import React, { useEffect, useState } from 'react';
 import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/navigation';
import Follow from '@/components/Follow.js';
import Footer from '@/components/Footer';
import { useParams } from 'next/navigation';
import useApi from '@/hooks/useApi';
import { useMyContext } from '@/context/headerContext';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { PhotoProvider,PhotoView } from 'react-photo-view';
import { FreeMode, Pagination, Autoplay } from 'swiper/modules';
import { IoHomeOutline } from 'react-icons/io5';

import { Fade, Zoom } from 'react-reveal';

function OrganizationChart() {
  const locale = useParams().locale;
  const axios= useApi()
  const [banner,setBanner]=useState([])
  const [quality,setQuality]=useState([])
  const { isScroll, setIsScroll, id, setId } = useMyContext();
  const [previewCount,setPreviewCount]=useState(1)
  useEffect(()=>{
    (
      async()=>{
        const {data:banner}=await axios.get('/api/food-safety')
        setQuality(banner.data)
        setBanner(banner?.data)
      }
    )()

     

  },[])

  useEffect(() => {
    const updateScreensize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth > 768) {
        setPreviewCount(3);
      } else {
        setPreviewCount(1);
      }
    };
    updateScreensize();
    window.addEventListener('resize', updateScreensize);
    return () => window.removeEventListener('resize', updateScreensize);
  },[]);


   const data = [
    {
      id: 1,
      product: "Milk and Milk Products",
      services: [
        "Quality & Compositional Parameters",
        "Adulteration in Milk & Ghee",
        "Minerals",
        "Fatty Acid Composition",
        "Pesticide Residues",
        "Antibiotic Residue",
        "Heavy Metals",
        "Microbial Parameters",
        "Aflatoxin M1",
      ],
    },
    {
      id: 2,
      product: "Cattle Feed and Feed Ingredients",
      services: ["Compositional Parameters", "Aflatoxin B1/B2/G1/G2"],
    },
    {
      id: 3,
      product: "Mineral Mixture",
      services: ["Compositional Parameters"],
    },
    {
      id: 4,
      product: "Oils and Fats",
      services: ["General Parameters", "Fatty Acid Composition"],
    },
    {
      id: 5,
      product: "Water",
      services: ["General Parameters", "Microbial Parameters"],
    },
    {
      id: 6,
      product: "Spices and Condiments",
      services: ["General Parameters"],
    },
    {
      id: 7,
      product: "Cereals & Cereal Products",
      services: ["General Parameters", "Heavy Metals", "Microbial Parameters"],
    },
    {
      id: 8,
      product: "Ready to Eat foods",
      services: [
        "General Parameters",
        "Heavy Metals",
        "Microbial Parameters",
        "Pesticide Residues",
      ],
    },
    {
      id: 9,
      product: "Nuts and Nut Products",
      services: [
        "General Parameters",
        "Heavy Metals",
        "Microbial Parameters",
        "Pesticide Residues",
        "Aflatoxin / Mycotoxin",
      ],
    },
    {
      id: 10,
      product: "Proprietary Food",
      services: [
        "General Parameters",
        "Heavy Metals",
        "Microbial Parameters",
        "Pesticide Residues",
      ],
    },
    {
      id: 11,
      product: "Bakery Products",
      services: [
        "General Parameters",
        "Heavy Metals",
        "Microbial Parameters",
        "Mycotoxins",
      ],
    },
  ];
  const imageArr=['/images/quality/1.jpg','/images/quality/2.jpg','/images/quality/3.jpg','/images/quality/4.jpg','/images/quality/5.jpg','/images/quality/6.jpg','/images/quality/7.jpg','/images/quality/8.jpg','/images/quality/9.jpg','/images/quality/10.jpg','/images/quality/11.jpg','/images/quality/12.jpg','/images/quality/13.jpg','/images/quality/14.jpg','/images/quality/15.jpg','/images/quality/16.jpg','/images/quality/17.jpg','/images/quality/18.jpg','/images/quality/19.jpg','/images/quality/20.jpg']
  return (
    <div className={`w-full h-full absolute   z-[-1] ${isScroll ? ' md:top-48' : ''}  `}>
    <section className={`w-full h-full md:h-[700px] pt-28 relative  grid place-items-center `}>
     {/* <img loading="lazy" decoding="async" src={banner?banner[0]:HeroImg.src} className="w-full h-full absolute top-0 z-[-1]" />
      */}
     <video
       src={banner?.attributes?.banner?.data?.attributes?.url}
       muted
       autoPlay
       loop
       controls
       playsInline
       className={`w-full  h-full    object-cover absolute top-0  ${
         isScroll ? 'h-[400px]' : ''
       } `}
     />
   </section>

   <div className="flex w-full    justify-center pt-5 space-x-2 items-center relative before:absolute before:-bottom-3 before:w-20   before:h-0.5 before:bg-primary-main">
            <Link className="  text-sm font-bold  " href={`/${locale}/animal-husbandry/scheme` || ''}>
            <IoHomeOutline size={20} />
            </Link>

            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold text-primary-main  " href={`/${locale}/our-product/`}>
             
              {locale==='kn'?'ಗುಣಮಟ್ಟ ಮತ್ತು ಆಹಾರ ಸುರಕ್ಷತೆ':' Quality Food Safety'}
            </Link>
            
          </div>

          <div className='w-full mt-20 relative m-auto h-auto     '>

          <div className="absolute w-full h-full z-[-10] ">
            <div className="w-full h-full flex justify-between items-center">
              <div className="w-20 md:w-40 h-8 bg-red-600"></div>
              <div className="w-20 md:w-40 h-8 bg-red-600"></div>
            </div>
          </div>
            <Swiper
           slidesPerView={previewCount}
              freeMode={true}
           
              spaceBetween={20}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false
              }}
              modules={[FreeMode, Autoplay]}
              className="w-full max-w-[1400px] m-auto">

                 {imageArr.map((item,id)=>{
                 
                  return(
                    <SwiperSlide key={id} className='w-full' >
                     
                     <Zoom>
                    <PhotoProvider className='w-full' >
                        
                        <PhotoView src={item} height="400px"  >
                        <img loading="lazy" decoding="async" className=' m-auto w-52 h-52 md:w-[400px] md:h-96 object-fill' src={item} alt="" />
                        </PhotoView>
                    
                  
                  </PhotoProvider>
          
          </Zoom>
                      </SwiperSlide>
                  )
                 })}
                     
                      
                      
                
            </Swiper>
             
        
          </div>

          <div className="   mt-20  relative w-full  flex justify-center items-center ">
            <Fade bottom>
            
              <h1 className=" text-primary-main relative z-10 font-heading text-2xl font-extrabold uppercase">
              {locale==='kn'?'ಗುಣಮಟ್ಟ ಮತ್ತು ಆಹಾರ ಸುರಕ್ಷತೆ':'          Quality and Food Safety'}
              </h1>

              </Fade>
            </div>
    
      <section className=" relative w-full flex flex-col p-2     mb-10 max-w-7xl m-auto h-auto pt-20  ">
   
{
  quality?.attributes?.content &&
  <BlocksRenderer
  content={quality?.attributes?.content}
  blocks={{

    
    paragraph: ({ children }) => (
      <Fade bottom>
      <p className="text-neutral900 w-full mb-3 mt-3">{children}</p>
      </Fade>
    ),
   
    heading: ({ children, level }) => {
      switch (level) {
        case 1:
          return <h1 className="text-2xl mt-2 mb-1 text-primary-main">{children}</h1>;
        case 2:
          return <h2 className="text-lg">{children}</h2>;
        case 3:
          return <h3>{children}</h3>;
        case 4:
          return <h4>{children}</h4>;
        case 5:
          return <h5>{children}</h5>;
        case 6:
          return <h6>{children}</h6>;
        default:
          return <h1>{children}</h1>;
      }
    },
    list:({children})=>{
     
   
        return(
          <Fade bottom >
          {children}
          </Fade>
        )
    },

    
    code: ({ children }) => {
      const columns =
        children?.[0]?.props?.text.split(',')[0].trim() === 'columns'
          ? children?.[0]?.props?.text.split(',').slice(1)
          : [];

      return (
        <table className="table-fixed  border-spacing-y-2	 border-collapse border-black border      w-full ">
          <thead className=" text-left ">
            {columns?.map((item, id) => {
              if(id===0){
                return (
                  <th className="p-2 w-16   border-r border-black " key={id}>
                    {item}
                  </th>
                );
              }
              else{
                return (
                  <th className="p-2   border-r border-black " key={id}>
                    {item}
                  </th>
                );
              }
             
            })}
          </thead>
          <tbody className="text-left  text-md ">
            <tr className="w-full ">
              {children?.[0]?.props?.text.split(',')[0].trim() !== 'columns' &&
                children?.[0]?.props?.text?.split(',')?.map((item, id) => {
                  if(id===0){
                    return(
                      <td
                      className=" w-16 p-2 text-md font-content border-r border-black "
                      key={id}>
                      {' '}
                      {item}
                    </td>
                    )
                  }
                  return (
                    <td
                      className=" p-2 text-md font-content border-r border-black "
                      key={id}>
                      {' '}
                      {item}
                    </td>
                  );
                })}
            </tr>
          </tbody>
        </table>
      );
    },

   
    link: ({ children, url }) => <Link to={url}>{children}</Link>
  }}
    
  />
}
         
          



     <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-black text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-black px-3 py-2 text-left">Sr.No</th>
            <th className="border border-black px-3 py-2 text-left">Product Name</th>
            <th className="border border-black px-3 py-2 text-left">Services</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className={row.id % 2 === 0 ? "bg-gray-50" : "bg-white"}>
              <td className="border border-black px-3 py-2 align-top">{row.id}</td>
              <td className="border border-black px-3 py-2 align-top">{row.product}</td>
              <td className="border border-black px-3 py-2 align-top">
                <ul className="list-disc ml-4">
                  {row.services.map((service, index) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>






      </section>

       
<Footer />
    </div>
  );
}

export default OrganizationChart;


 