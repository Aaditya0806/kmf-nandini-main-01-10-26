'use client';
import React, { useState,useEffect } from 'react';
import Follow from '@/components/Follow.js';
import Footer from '@/components/Footer';
import { useMyContext } from '@/context/headerContext';
import useLocale from '@/hooks/useLocale';
import Link from 'next/link';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import useApi from '@/hooks/useApi';
import { Fade } from 'react-reveal';
import { IoHomeOutline } from 'react-icons/io5';

function AnimalHealth() {
  const { isScroll } = useMyContext();
  const locale = useLocale().locale;
  const [animalHealth,setAnimalHealth]=useState([])
  const [readMore, setReadMore] = useState(false);
  const [readMoreHealth,setReadMoreHealth]=useState(false)
  const [healthCamps,setHealthCamps]=useState([])

  const axios = useApi();
  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/api/animal-healths?sort[0]=createdAt:asc')
      const { data:health } = await axios.get('/api/health-camps')
      setHealthCamps(health.data);
      setAnimalHealth(data.data);
     
    })();
  }, []);

  const toggleReadMore = () => {
    setReadMore(!readMore);
  };

  const toggleHealthReadMore = () => {
    setReadMoreHealth(!readMoreHealth);
  };
  return (
    <div className={`w-full h-full absolute   z-[-1] ${isScroll ? ' md:top-48' : ''}  `}>
      <section className={`w-full h-full md:h-[700px] pt-28 relative  grid place-items-center `}>
         <img loading="lazy" decoding="async" src={'/animal-husbandary/animal-husbandary.png'} className="w-full h-full absolute top-0 z-[-1]" />
        
        {/* <video
          src="/video/precrument.mp4"
          muted
          autoPlay
          loop
          controls
          playsInline
          className={`w-full  h-full    object-cover absolute top-0 z-[-1] ${
            isScroll ? 'h-[400px]' : ''
          } `}
        /> */}
      </section>
      <div className="flex w-full flex-wrap    justify-center pt-5 space-x-2 items-center relative before:absolute before:-bottom-3 before:w-20   before:h-0.5 before:bg-primary-main">
                      <Link className="  text-sm font-bold  " href={`/` || ''}>
                      <IoHomeOutline size={20} />
            </Link>

            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold " href={`${locale==='kn'?'/kn/animal-husbandry/procurement':'/en/animal-husbandry/procurement'}`}>
            {locale==='kn'?' ಹಾಲು ಶೇಖರಣೆ':'Procurement'}
              
            </Link>

            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold text-primary-main " href={`${locale==='kn'?'/kn/animal-husbandry/animal-health':'/en/animal-husbandry/animal-health'}`}>
            {locale==='kn'?'  ಪಶು ಆರೋಗ್ಯ':'Animal Health'}
            </Link>

            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold   " href={`${locale==='kn'?'/kn/animal-husbandry/animal-breeding':'/en/animal-husbandry/animal-breeding'}`}>
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
      <section className=" relative w-full   h-auto pt-10  ">
        <div className="w-full  h-full flex flex-col p-3 space-y-3 lg:flex-row lg:p-10 lg:space-x-10">
          <div className="w-full flex flex-col space-y-2 justify-center items-start    p-1   ">

          <div className="mb-5 md:mb-20    relative w-full  flex justify-center items-center ">
               
              <h1 className=" text-primary-main relative z-10 font-heading text-4xl font-extrabold uppercase">
              {locale==='kn'?'ಪಶು ಆರೋಗ್ಯ':'Animal Health'}
              </h1>
            </div>
           

            <Fade bottom>

            <div className="w-full h-full flex gap-10 justify-center items-center flex-wrap  ">
            {animalHealth?.map((_, id) => {
                return (
                  <div
                    key={id}
                    className="max-w-2xl w-full  m-3 rounded-3xl min-h-[500px] relative   shadow-2xl bg-slate-50 p-4">
                    <div className="m-auto relative w-full h-full ">

                      


                    <div className=' w-full z-[-10]     flex justify-center items-center'>
            <img loading="lazy" decoding="async" src='/images/heading/heading-color/group.png' className='absolute z-[1] w-[450px] top-[-30px] sm:top-[-56px] object-cover  sm:object-contain'/>


                        <h1 className="w-full relative max-w-[300px] m-auto text-center  text-primary-main text-sm sm:text-xl   z-[100] ">
                        {_?.attributes?.title}
                        </h1>
                        </div>
                      
                  
                     
                      <div className="mt-20 ">
                        {_?.attributes?.content && (
                          <BlocksRenderer
                            content={readMore ? _?.attributes?.content: _?.attributes?.content.slice(0,6) }
                            blocks={{
                              paragraph: ({ children }) => <p className="text-xs md:text-lg">{children}</p>,
                              heading: ({ children, level }) => {
                                switch (level) {
                                  case 1:
                                    return (
                                      <h1 className="text-xl text-primary-main">{children}</h1>
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
                                return <li>{children}</li>;
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



      <section className=" relative w-full   h-auto pt-10  ">
        <div className="w-full  h-full flex flex-col p-3 space-y-3 lg:flex-row lg:p-10 lg:space-x-10">
          <div className="w-full flex flex-col space-y-2 justify-center items-start    p-1   ">

          <div className="mb-5 md:mb-20     relative w-full  flex justify-center items-center ">
            
              <h1 className=" text-primary-main relative z-10 font-heading text-4xl font-extrabold uppercase">
              {locale==='kn'?'':'Health Camps'}
              </h1>
            </div>
           

            <Fade bottom>

            <div className="w-full h-full flex gap-10 justify-center items-center flex-wrap  ">
            {healthCamps?.map((_, id) => {
                return (
                  <div
                    key={id}
                    className="max-w-2xl w-full m-10 rounded-3xl min-h-[500px] relative   shadow-2xl bg-slate-50 p-5">
                    <div className="m-auto relative w-full h-full ">

                      


                    <div className=' w-full z-[-10]     flex justify-center items-center'>
            <img loading="lazy" decoding="async" src='/images/heading/heading-color/group.png' className='absolute z-[1] w-[450px] top-[-30px] sm:top-[-56px]  object-cover  sm:object-contain'/>


                        <h1 className="w-full relative max-w-[300px] m-auto text-center  text-primary-main text-sm sm:text-xl   z-[100] ">
                        {_?.attributes?.title}
                        </h1>
                        </div>
                      
                  
                     
                      <div className="mt-20 ">
                        {_?.attributes?.content && (
                          <BlocksRenderer
                            content={readMore ? _?.attributes?.content: _?.attributes?.content.slice(0,6) }
                            blocks={{
                              paragraph: ({ children }) => <p className="text-xs md:text-lg">{children}</p>,
                              heading: ({ children, level }) => {
                                switch (level) {
                                  case 1:
                                    return (
                                      <h1 className="md:text-2xl text-primary-main">{children}</h1>
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
                                return <li className='text-xs md:text-lg'>{children}</li>;
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

<button onClick={toggleHealthReadMore} className='w-full flex justify-end text-primary-main'>
                  {readMoreHealth ? 'Read less' : 'Read more'}
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

export default AnimalHealth;