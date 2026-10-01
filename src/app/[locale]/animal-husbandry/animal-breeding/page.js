'use client';
import React,{useEffect,useState} from 'react';

import Footer from '@/components/Footer';
import { useMyContext } from '@/context/headerContext';
import useLocale from '@/hooks/useLocale';
 
import Link from 'next/link';
 import useApi from '@/hooks/useApi';
 import { BlocksRenderer } from '@strapi/blocks-react-renderer';
 import { Swiper, SwiperSlide } from 'swiper/react';
 import { PhotoProvider,PhotoView } from 'react-photo-view';
 import { FreeMode, Pagination, Autoplay } from 'swiper/modules';
import { Fade, Zoom } from 'react-reveal';
import { IoHomeOutline } from 'react-icons/io5';
// import image1 from "@/images/animal-breeding/one.jpg"
import image1 from "../../../../images/animal-breeding/one.jpg"
import image2 from "../../../../images/animal-breeding/two.jpg"
import image3 from "../../../../images/animal-breeding/three.jpg"
import image4 from "../../../../images/animal-breeding/four.jpg"
import image5 from "../../../../images/animal-breeding/five.jpg"
import image6 from "../../../../images/animal-breeding/six.jpg"
import image7 from "../../../../images/animal-breeding/seven.jpg"
 


function AnimalBreeding() {
  const axios =useApi()
  const { isScroll } = useMyContext();
  const locale = useLocale().locale;
  const [animalBreeding, setAnimalBreeding] = useState([]);
  const [readMore, setReadMore] = useState(false);
const [previewCount,setPreviewCount]=useState(3)

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/api/animal-breedings');
       console.log("bleeding",data.data)
      setAnimalBreeding(data.data);
   
    })();
  }, []);
    
  
  const toggleReadMore = () => {
    setReadMore(!readMore);
  };
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

  const imageArr=[
    image1.src, image2.src, image3.src, image4.src, image5.src, image6.src, image7.src
  ]

return(
 
    <div className={`w-full h-full absolute   z-[-1] ${isScroll ? ' md:top-48' : ''}  `}>
          <div className='w-full md:mt-20 relative m-auto h-auto     '>

<div className="absolute w-full h-full z-[-10] ">
  <div className="w-full h-full flex justify-between items-center">
    <div className="w-40 h-8 bg-red-600"></div>
    <div className="w-40 h-8 bg-red-600"></div>
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
              <img loading="lazy" decoding="async" className='w-full max-w-2xl h-96 object-fill' src={item} alt="" />
              </PhotoView>
          
        
        </PhotoProvider>

</Zoom>
            </SwiperSlide>
        )
       })}
           
            
            
      
  </Swiper>
   

</div>
      <div className="flex w-full  flex-wrap   justify-center pt-5 space-x-2 items-center relative before:absolute before:-bottom-3 before:w-20   before:h-0.5 before:bg-primary-main">
                      <Link className="  text-sm font-bold  " href={`/` || ''}>
                      <IoHomeOutline size={20} />
            </Link>

            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold " href={`${locale==='kn'?'/kn/animal-husbandry/procurement':'/en/animal-husbandry/procurement'}`}>
            {locale==='kn'?' ಹಾಲು ಶೇಖರಣೆ':'Procurement'}
              
            </Link>

            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold  " href={`${locale==='kn'?'/kn/animal-husbandry/animal-health':'/en/animal-husbandry/animal-health'}`}>
            {locale==='kn'?'  ಪಶು ಆರೋಗ್ಯ':'Animal Health'}
            </Link>

            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold text-primary-main  " href={`${locale==='kn'?'/kn/animal-husbandry/animal-breeding':'/en/animal-husbandry/animal-breeding'}`}>
            {locale==='kn'?'ಪಶು ಸಂತಾನಾಭಿವೃದ್ಧಿ ಕಾರ್ಯಕ್ರಮ':'Animal Breeding Program'}
            </Link>

            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold  " href={`${locale==='kn'?'/kn/animal-husbandry/feed-and-fodder':'/en/animal-husbandry/feed-and-fodder'}`}>
            {locale==='kn'?'ಮೇವು ಚಟುವಟಿಕೆಗಳು':'Fodder Activities'}
            </Link>

            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold   "  href={`${locale==='kn'?'/kn/animal-husbandry/scheme':'/en/animal-husbandry/scheme'}`}>
            {locale==='kn'?'ಯೋಜನೆಗಳು/ ಅನುದಾನಗಳು':'Schemes/Grants'}
            </Link>

            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold  " href={`${locale==='kn'?'/kn/women-empowerment':'/en/women-empowerment'}`}>
            {locale==='kn'?'ಸ್ಟೆಪ್ ಯೋಜನೆ':'Step'}
            </Link>
            
      </div>
      <div className="flex w-full    justify-center pt-10 space-x-2 items-center relative before:absolute before:-bottom-3 before:w-20   before:h-0.5 before:bg-primary-main">
                

                <Link className="  text-sm font-bold " href={`${locale==='kn'?'/kn/portfolio#ACHIEVEMENTS':'/en/portfolio#ACHIEVEMENTS'}`}>
                {locale==='kn'?'ಪೋರ್ಟ್ಫೋಲಿಯೋಗೆ ಹಿಂದಿರುಗಲು':'Back to portfolio'}
                  
                </Link>
    
              
                
          </div>

      <section className="w-full h-auto p-10 mt-10   relative flex justify-center items-center flex-col   ">
        <div className="w-full flex flex-col justify-center items-center space-y-5">
       

      
          <div className="     relative w-full  flex justify-center items-center ">
             
              <h1 className=" text-primary-main relative z-10 font-heading text-2xl font-extrabold uppercase">
             {locale==='kn'?'ಪಶು ಸಂತಾನಾಭಿವೃದ್ಧಿ ಕಾರ್ಯಕ್ರಮ':'Animal Breeding'}
              </h1>
            </div>
          
        </div>
      </section>

      <section className=" relative w-full   h-auto   ">
        <div className="w-full  h-full flex flex-col p-3 space-y-3 lg:flex-row lg:p-10 lg:space-x-10">
          <div className="w-full h-full flex flex-col space-y-2 justify-center items-start    p-1   ">
          <Fade bottom>
            <div className="w-full h-full flex justify-center items-center flex-wrap">
              {animalBreeding?.map((_, id) => {
                return (
                  <div
                    key={id}
                    className="max-w-3xl w-full m-10 rounded-3xl  min-h-[400px] shadow-2xl bg-slate-50 p-5">
                    <div className="m-auto">


                    <div className=' w-full relative flex justify-center items-center'>
            <img loading="lazy" decoding="async" src='/images/heading/heading-color/group.png' className='absolute z-[1] w-full max-w-[450px] top-[-30px] sm:top-[-56px] object-cover   sm:object-contain'/>

<Fade bottom>


                        <h1 className="w-full relative max-w-[300px] m-auto text-center  text-primary-main text-sm sm:text-xl   z-[100] ">
                          {' '}
                          {_?.attributes?.title}
                        </h1>
                        </Fade>
                        </div>



                    
                      <div className="mt-20">
                      {_?.attributes?.content && (
                          <BlocksRenderer
                            content={readMore ? _?.attributes?.content: _?.attributes?.content.slice(0,3) }
                            blocks={{
                              paragraph: ({ children }) => <p className="text-md">{children}</p>,
                              heading: ({ children, level }) => {
                                switch (level) {
                                  case 1:
                                    return (
                                      <h1 className="text-2xl text-primary-main">{children}</h1>
                                    );
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
                              list: ({ children }) => {
                                return children
                              },
                              code: ({ children }) => (
                                <h1 className="text-2xl bg-primary-main text-white p-2 shadow-lg">
                                  {children}
                                </h1>
                              )
                            }}
                          />
                        )}

{
  _?.attributes?.content.length>3 &&

<button onClick={toggleReadMore} className='w-full flex justify-end text-primary-main'>
                  {readMore ? 'Read less' : 'Read more'}
                </button>
            }
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            </Fade>

          </div>
        </div>
      </section>
    

       
<Footer />
    </div>
  );
}

export default AnimalBreeding;