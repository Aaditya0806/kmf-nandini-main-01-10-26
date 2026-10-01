'use client';

import React, { useEffect, useState } from 'react';
import AboutHeroImg from '@/images/about/mission/about-hero.png';
import Link from 'next/link';
import useApi from '@/hooks/useApi';

import Follow from '@/components/Follow.js';
import Footer from '@/components/Footer';
import downarrowIco from '@/images/icons/downarrow.svg';
import uparrowIco from '@/images/icons/uparrow.svg';

import { useParams } from 'next/navigation';
import TvcommercialAccordion from '@/components/TvcommercialAccordion';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import NandiniProducts from './NandiniProducts';
import Punnet from './Punnet';
import NewsAndMedia from './NewAndMedia';
import FoodStops from './FoodStops';
import DairyTour from './DairyTour';
import { Fade } from 'react-reveal';
import NandiniAdds from './NandiniAdds';
import { SwiperSlide,Swiper } from 'swiper/react';
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCoverflow,
  Autoplay,
  FreeMode
} from 'swiper/modules';


function TvcommercialDetails() {
   
  const [assets, setAssets] = useState([]);
  const [brandAmbassador, setBrandAmbassador] = useState([]);
   
  const [openAccordion, SetOpenAccordion] = useState(null);
  const [brandAsset, setBrandAsset] = useState([]);
  const [url, setUrl] = useState('');
  const axios = useApi();
  const param=useParams()
  const [commercialCategory, setCommercialCategory] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const vidLinks = [
    {
      link:'https://www.youtube.com/embed/4p2JGB-5y1Y?si=yQYm3CxsKByamgHI',
      order:1
    },
    {
      link:'https://www.youtube.com/embed/OHlTeqgxCZo?si=PS5o8Z90ugN60OkW',
      order:2
    },
    {
      link:'https://www.youtube.com/embed/VO-6K2rUrNU?si=dyOXQKqx6PNjMZt0',
      order:3
    },

    
    
    
  
  ];
  const handleVideoClick = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

 
//  const subId=window.location.search?.split("=")[1]
 
 
   
  const arrows = {
    down: downarrowIco.src,
    up: uparrowIco.src
  };
  const locale = useParams().locale;
  const handleAccordionClick = (accordionId) => {
    SetOpenAccordion(openAccordion === accordionId ? null : accordionId);
  };

  useEffect(() => {
    (async () => {
        const { data: brandAmbassador } = await axios.get('/api/brand-ambassadors');
 
        const { data: commercialCategory } = await axios.get('/api/tv-commercials');
        // const { data: commercialItems } = await axios.get('/api/tv-commercial-items?sort[0]=createdAt:asc');
        const brandAsset= commercialCategory?.data?.filter(item=>item?.id===parseInt(param.slug))
         setUrl(brandAsset?.[0]?.attributes?.video?.data?.attributes?.url);
        console.log("second",brandAsset?.[0]?.attributes?.video?.data?.attributes?.url);
 

      // if(subId){
      //  const brandAsset= brandAmbassador?.data?.filter(item=>item?.id===parseInt(subId))
      
      //   setAssets(brandAsset?.sort((a,b)=>b.attributes.createdAt-a.attributes.createdAt))
     
      // }
      // else{
      //   const brandAsset= commercialItems?.data?.filter(item=> item?.attributes?.tv_commercial?.data?.id===parseInt(param.slug))
        
      //   const sortedArray=brandAsset.sort((a,b)=>b.id-a.id)
        
      //   setAssets(brandAsset.sort((a,b)=>b?.id-a?.id))
      // }
     
      setBrandAmbassador(brandAmbassador.data)
      setCommercialCategory(commercialCategory.data)
    })();
  }, []);

 

  return (
    <div className="w-full  absolute md:top-52 z-[-1]     ">
    <section className={`w-full    h-[200px] md:h-[450px] lg:h-[750px] pt-28 relative  grid place-items-center  `}>
    <div className="w-full h-full flex justify-between items-center relative z-[-10]">
            <div className="w-40 h-8 bg-red-600"></div>
            <div className="w-40 h-8 bg-red-600"></div>
          </div>
      <img loading="lazy" decoding="async" src={'/images/gallery.png'} className="w-full max-w-7xl h-full object-fill absolute top-0 z-[-1]" />
    </section>
      <section className="w-full h-fit m-auto pt-10   ">
        <div className="w-full space-y-5 p-4 ">
          <div className="   relative w-full  flex justify-center items-center ">
            <h1 className=" text-primary-main relative z-10 font-heading text-4xl font-extrabold uppercase">
              {locale === 'en'
                ? `Gallery`
                : `
ಗ್ಯಾಲರಿ`}
            </h1>
          </div>

          <div className="w-full flex justify-center items-center pt-10 relative before:absolute before:-bottom-3 before:w-full before:max-w-[1400px] before:h-0.5 before:bg-neutral-dark4">
            <ul className="flex gap-5">
              <Link href={`/${locale}/blog/gallery`}>
                <li
                  className={` 
                   text-[11px] md:text-sm relative  
                       
                  uppercase`}>
                  NEWS AND EVENTS
                </li>
              </Link>

              <Link href={`/${locale}/blog/press-release`}>
                <li
                  className={` 
                 text-[11px] md:text-sm relative  
                       
                  uppercase`}>
                  {locale==='kn'?'ಮಾದ್ಯಮ ಪ್ರಕಟಣೆ':'Press Release'}
                </li>
              </Link>

              <Link href={`/${locale}/blog/tv-commercial`}>
             
              <li
                className={` 
                   text-primary-main text-[11px] md:text-xl font-bold relative before:absolute before:-bottom-3 before:w-full before:h-0.5 before:bg-primary-main
                         
                    uppercase`}>
                {locale==='kn'?'ಟಿ.ವಿ. ಜಾಹೀರಾತುಗಳು':'Tv commercial'}
              </li>

              </Link>
            </ul>
          </div>
        </div>

        <div className="w-full h-auto  flex-col-reverse md:flex-row  mt-10 flex   justify-center items-start   ">
          <section className="max-w-[1282px] p-2 m-auto w-full h-full bg-white   ">
            <div className="w-full h-full flex flex-col space-x-5 justify-between items-start lg:flex-row lg:justify-start">
              <div className="w-full h-full flex flex-col space-y-28   ">

            <div className='w-full h-full'>
             

             
           
              
           
       <Fade bottom>
           <div className='w-full h-full   flex flex-col flex-wrap     gap-5 lg:flex-row lg:items-start'>


          {/* {subId && assets?.[0]?.attributes?.assets?.data?.[0]?.attributes?.ext.includes('.mp4') && */}


 
      
          
          <div className="w-full m-auto h-auto flex flex-col justify-center items-center ">
          <video
            src={url}
            title="YouTube video player22"
            autoPlay
            loop
            muted
            controls
            allowfullscreen
            className="w-full max-w-[1400px] m-auto h-[500px]        "></video>
        </div>
          {/* } */}



{/* {!subId && param?.slug==='5' && <NewsAndMedia/>}
{!subId && param?.slug==='3' && <NandiniAdds/>}
{!subId && param?.slug==='4' && <FoodStops/>}
{!subId && param?.slug==='6' && <DairyTour/>} */}


     


{/* //punnet rajkumar */}
{/* {subId==='3' && param?.slug==='3' &&
            vidLinks?.sort((a,b)=>b.order-a.order).map((item, id) => {
              return (
                <iframe
                  key={id}
                  className='w-72 m-auto md:w-full  md:max-w-[1350px]   md:h-[500px] '
                  
                  src={item.link}
                  title="YouTube video player2222"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen></iframe>
              );
            })} */}
 
 {/* {
  subId ?
  assets?.map((items)=>{
               
    return(
      items.attributes.assets?.data?.map((item,id)=>{
    
    const validExtensions = ['.png', '.jpg', '.jpeg', '.JPG', '.JPEG', '.PNG'];
    const validExtensionsVid=['.mp4','.mov']
    if (validExtensions.includes(item?.attributes?.ext)) {
      return (
      <div key={id} className=' w-full h-full relative'>

        <img loading="lazy" decoding="async"
          
          src={item?.attributes?.url}
          className="w-96 h-80    transition-all duration-300  "
        />



 
        </div>
      );
  } 
  else{
    if(validExtensionsVid.includes(item?.attributes?.ext))
    return (

      <div>
      <video preload="none"
        
        controls
        loop
        muted
        key={id}
        src={item?.attributes?.url}
        className=" w-72 md:w-[400px]   h-[250px]     transition-all duration-300  "
        onClick={() => handleVideoClick(item?.attributes?.url)}
      />

</div>

    );
  }
})
)
})




  :
  assets?.map((items,id)=>{
    
    const validExtensionsVid=['.mp4','.mov','.MP4','.MOV']
    console.log(items?.attributes?.assets?.data?.[0]?.attributes?.ext);
 
    const validExtensions = ['.png', '.jpg', '.jpeg', '.JPG', '.JPEG', '.PNG'];
    if (validExtensions.includes(items?.attributes?.assets?.data?.[0]?.attributes?.ext)) {
      return (
       <div key={id} className='  h-full relative'>
         <PhotoProvider >

<PhotoView src={items?.attributes?.assets?.data?.[0]?.attributes?.url}>

        <img loading="lazy" decoding="async"
          
          src={items?.attributes?.assets?.data?.[0]?.attributes?.url}
          className="w-96 h-80    transition-all duration-300  "
        />
        </PhotoView>
       </PhotoProvider>

        </div>
      );  
    
     
    
    
  } 

  else{
 
    if(validExtensionsVid.includes(items?.attributes?.assets?.data?.[0]?.attributes?.ext)){
      console.log("items in gallery",items);
      return (

        <div  key={id} className='w-72 mt-16  m-auto md:w-[400px]   md:h-[250px] object-fill      transition-all duration-300 '>
        <video preload="none"
          
          controls
          loop
          muted
         
          src={items?.attributes?.assets?.data?.[0]?.attributes?.url}
          className="w-72  m-auto md:w-[400px]   md:h-[250px] object-fill      transition-all duration-300  "
          onClick={() => handleVideoClick(items?.attributes?.assets?.data?.[0]?.attributes?.url)}
        />
        <h1 className='text-[8px] pt-5 shadow-lg p-3 md:text-xs uppercase '>{items?.attributes?.name}</h1>
    </div>
      );
    }
   
  }

  
})
 
}         */}



            


  {
    assets?.map((items,id)=>{
      if(items?.attributes?.youtube_link){
         
        return(

          <div key={id} className='w-72  m-auto md:w-[400px] mt-16  md:h-[250px]'>
          <iframe
                
                className="w-72  m-auto md:w-[400px]   md:h-[250px] object-fill      transition-all duration-300  "
                src={items?.attributes?.youtube_link}
                title="YouTube video player1111"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
 <h1 className='text-[8px] pt-5   p-3 md:text-sm uppercase '>{items?.attributes?.name}</h1>
                </div>
        )
      }
      
    })
  }
                  
           
             </div>
             </Fade>
          
            </div>
 


             


          
                      
                         
                   
             
                
              </div>

             
            </div>

          </section>
          <div className=" p-2 w-full md:max-w-60 md:mr-10 h-full transition-all duration-300  ">
          <Link       href={`/${locale}/blog/tv-commercial/brandambassador`|| ''}>
                      <Fade right>
                    
                    <li
                   
                   
                      className="w-full list-none transition-all duration-300 bg-primary-main ">
                      <button className="flex items-center justify-between relative  text-light-light4 border-b-2 border-b-light4 p-2 md:p-4 w-full ">
                        <div className="w-full flex space-x-2 ">
                          <span className=" text-[8px] md:text-[10px] text-white uppercase">Brand Ambassador</span>
                        </div>
                      </button>
                    </li>
                    </Fade>
                    </Link>

                {commercialCategory?.map((item, id) => {
 
                  return (
                    
                    <Link    key={id}  href={`/${locale}/blog/tv-commercial/${item?.id}` || ''}>
                    <li
                   
                   
                      className={`w-full list-none transition-all duration-300  bg-primary-main`}>
                      <button className="flex items-center justify-between relative  text-light-light4 border-b-2 border-b-light4 p-2 md:p-4 w-full ">
                        <div className="w-full flex space-x-2 ">
                          <span className="text-[8px] md:text-[10px] text-start text-white">{item?.attributes?.title}</span>
                        </div>
                      </button>
                    </li>
                    </Link>
                  );
                })}
              </div>
        </div>
      </section>



      {selectedVideo && (
        <div className="modal">
          <div className="modal-content">
            <span className="close z-40 " onClick={closeModal}>&times;</span>
            <video controls src={selectedVideo} autoPlay className="modal-video w-full max-w-7xl h-[500px] object-fill">
               
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

       
<Footer />
    </div>
  );
}

export default TvcommercialDetails;
