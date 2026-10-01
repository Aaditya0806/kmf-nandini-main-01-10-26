'use client';
import React,{useState,useEffect} from 'react';
import Follow from '@/components/Follow.js';
import Footer from '@/components/Footer';
import { useMyContext } from '@/context/headerContext';
import useLocale from '@/hooks/useLocale';
import Link from 'next/link';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import useApi from '@/hooks/useApi';
function Other() {
  const { isScroll } = useMyContext();
  const locale = useLocale().locale;
  const [scheme,setScheme]=useState([])
  const axios=useApi()
  useEffect(()=>{
    (
      async()=>{
        const {data}=await axios.get('/api/schemes')
        setScheme(data.data)
      }
    )()
  },[])
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

      <div className="flex w-full    justify-center pt-5 space-x-2 items-center relative before:absolute before:-bottom-3 before:w-20   before:h-0.5 before:bg-primary-main">
            <Link className="  text-sm font-bold  " href={`/${locale}/animal-husbandry/scheme` || ''}>
            {locale === "en" ? "Schemes":"ಯೋಜನೆಗಳು"}
            </Link>

            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold   " href={`/${locale}/animal-husbandry/scheme/goi`}>
                  {locale === "en" ? "GOI":"ಕೇಂದ್ರ ಸರಕಾರದ ಯೋಜನೆಗಳು"}
            </Link>
            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold   " href={`/${locale}/animal-husbandry/scheme/gok`}>
               {locale === "en" ? "GOK":"ರಾಜ್ಯ ಸರಕಾರದ ಯೋಜನೆಗಳು"}
            </Link>
            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold  text-primary-main " href={`/${locale}/animal-husbandry/scheme/other-scheme`}>
                {locale === "en" ? "Other Schemes":"ಇತರೆ ಯೋಜನೆಗಳು"}
            </Link>
            
          </div>
      <h1 className="text-2xl  w-full mt-5 p-3 uppercase bg-primary-main text-white  shadow-lg relative flex justify-center items-center before:absolute before:-bottom-3 before:w-40   before:h-1 before:bg-primary-main  ">
      {locale === "en" ? "Other Schemes":"ಇತರೆ ಯೋಜನೆಗಳು"}
      </h1>
      <section className=" relative  w-full flex flex-col space-y-5 mb-10 max-w-7xl m-auto h-auto pt-10  ">
        <div className="w-full h-full flex space-y-3 flex-col text-center">
          <h1 className="text-2xl text-primary-main">   {locale === "en" ? "SRI KSHETRA DHARMASTHALA RURAL DEVELOPMENT PROJECT (SKDRDP)":"ಶ್ರೀ ಕ್ಷೇತ್ರ ಧರ್ಮಸ್ಥಳ ಗ್ರಾಮೀಣಾಭಿವೃದ್ಧಿ ಯೋಜನೆ (SKDRDP)"}</h1>

          <h2 className="text-lg">{locale === "en" ? "For construction of buildings, equipments, artificial insemination kit, milk testing machine and other office equipments of HSCs.":"HSC ಗಳ ಕಟ್ಟಡಗಳು, ಉಪಕರಣಗಳು, ಕೃತಕ ಗರ್ಭಧಾರಣೆಯ ಕಿಟ್, ಹಾಲು ಪರೀಕ್ಷಾ ಯಂತ್ರ ಮತ್ತು ಇತರ ಕಚೇರಿ ಉಪಕರಣಗಳ ನಿರ್ಮಾಣಕ್ಕಾಗಿ."} </h2>
        {
  scheme?.[0]?.attributes?.Other &&
  <BlocksRenderer
  content={scheme?.[0]?.attributes?.Other}
  blocks={{
    paragraph:({children})=><p className="text-md">{children}</p>,
    heading: ({ children, level }) => {
      switch (level) {
        case 1:
          return <h1 className="text-2xl text-primary-main">{children}</h1>;
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
<li>{children}</li>
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
            return (
              <th className="p-2   border-r border-black " key={id}>
                {item}
              </th>
            );
          })}
        </thead>
        <tbody className="text-left  text-md ">
          <tr className="w-full ">
            {children?.[0]?.props?.text.split(',')[0].trim() !== 'columns' &&
              children?.[0]?.props?.text?.split(',')?.map((item, id) => {
                return (
                  <td className=" p-2 text-md font-content border-r border-black " key={id}>
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
    quote:({children})=><h1 className='text-2xl bg-primary-main text-white p-2 shadow-lg'>{children}</h1>
  }}
    
  />
}
         
        </div>

        



      </section>

       
<Footer />
    </div>
  );
}

export default Other;








