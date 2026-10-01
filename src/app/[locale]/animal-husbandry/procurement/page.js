'use client'
import React,{useState,useEffect} from 'react'
import Footer from '@/components/Footer'
import { useMyContext } from '@/context/headerContext'
import useLocale from '@/hooks/useLocale'
import Link from 'next/link'
import useApi from '@/hooks/useApi'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import { IoHomeOutline } from 'react-icons/io5';
import Follow from '@/components/Follow'

import { Fade } from 'react-reveal'
function Procurement() {
    const { isScroll}=useMyContext()
    const locale=useLocale().locale
    const [procure,setProcure]=useState([])
const axios =useApi()

    useEffect(() => {
      (async () => {
        const { data } = await axios.get('/api/procurements');
      setProcure(data.data)
        
       
         
      })();
    }, []);

  return (
    <div className={`w-full h-full absolute   z-[-1] ${isScroll ? ' md:top-48' : ''}  `}>
    <section className={`w-full h-full md:h-[700px] pt-28 relative  grid place-items-center `}>
      {/* <img loading="lazy" decoding="async" src={banner?banner[0]:HeroImg.src} className="w-full h-full absolute top-0 z-[-1]" />
       */}
      <video
        src="/video/precrument.mp4"
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
    <div className="flex w-full flex-wrap   justify-center pt-5 space-x-2 items-center relative before:absolute before:-bottom-3 before:w-20   before:h-0.5 before:bg-primary-main">
                      <Link className="  text-sm font-bold  " href={`/` || ''}>
                      <IoHomeOutline size={20} />
            </Link>

            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold text-primary-main" href={`${locale==='kn'?'/kn/animal-husbandry/procurement':'/en/animal-husbandry/procurement'}`}>
            {locale==='kn'?' ಹಾಲು ಶೇಖರಣೆ':'Procurement'}
              
            </Link>

            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold  " href={`${locale==='kn'?'/kn/animal-husbandry/animal-health':'/en/animal-husbandry/animal-health'}`}>
            {locale==='kn'?'  ಪಶು ಆರೋಗ್ಯ':'Animal Health'}
            </Link>

            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold  " href={`${locale==='kn'?'/kn/animal-husbandry/animal-breeding':'/en/animal-husbandry/animal-breeding'}`}>
            {locale==='kn'?'ಪಶು ಸಂತಾನಾಭಿವೃದ್ಧಿ ಕಾರ್ಯಕ್ರಮ':'Animal Breeding Program'}
            </Link>

            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold  " href={`${locale==='kn'?'/kn/animal-husbandry/feed-and-fodder':'/en/animal-husbandry/feed-and-fodder'}`}>
            {locale==='kn'?'ಮೇವು ಚಟುವಟಿಕೆಗಳು':'Fodder Activities'}
            </Link>

            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold  "  href={`${locale==='kn'?'/kn/animal-husbandry/scheme':'/en/animal-husbandry/scheme'}`}>
            {locale==='kn'?'ಯೋಜನೆಗಳು/ ಅನುದಾನಗಳು':'Schemes/Grants'}
            </Link>

            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold  " href={`${locale==='kn'?'/kn/women-empowerment':'/en/women-empowerment'}`}>
            {locale==='kn'?'ಸ್ಟೆಪ್ ಯೋಜನೆ':'Step'}
            </Link>
            
      </div>
    <section className=" relative w-full max-w-7xl m-auto h-auto pt-[50px]  ">
        <div className="w-full shadow-md  h-full flex flex-col        ">
          

        
             
            <div className=' w-full relative flex   justify-center items-center'>
         


                        <h1 className="w-full relative uppercase   m-auto text-center  text-primary-main text-4xl   z-[100] ">
                        {locale==='kn'?' ಹಾಲು ಶೇಖರಣೆ':'Procurement'}
                        </h1>
             </div>
                       
                       
                       
                       
                        {procure?.map((_, id) => {
                return (
                  <div
                    key={id}
                    className="  w-full  p-2 rounded-3xl    ">
                    <div className="m-auto">
                    
                      <div className=" ">
                        {_?.attributes?.content && (
                          <BlocksRenderer
                            content={_?.attributes?.content}
                            blocks={{
                              paragraph: ({ children }) =><Fade bottom> <p className=" text-sm text-justify md:text-lg">{children}</p></Fade>,
                              heading: ({ children, level }) => {
                                switch (level) {
                                  case 1:
                                    return (
                                      <h1 className="text-2xl text-primary-main mt-5">{children}</h1>
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
                      </div>
                    </div>
                  </div>
                );
              })}
             
 
             
          
         
          
          
         
        </div>

 
      </section>
  
     
<Footer />
  </div>
  )
}

export default Procurement