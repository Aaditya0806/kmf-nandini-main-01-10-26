'use client';

import womenEmpwerImg from '@/images/women-empower/women-empower.png';
import { womenEmpowerment } from '@/configtext/womenEmpowerment';
import { useEffect, useState } from 'react';
import Follow from '@/components/Follow.js';
import Footer from '@/components/Footer';
import useApi from '@/hooks/useApi';
import { useParams } from 'next/navigation';
import rightArrow from '@/images/women-empower/rightArrow.svg';
import Link from 'next/link';
import { Fade } from 'react-reveal';
import { IoHomeOutline } from 'react-icons/io5';
import { useMyContext } from '@/context/headerContext';

function WomenEmpowerment() {
  const [womenEmpower, setWomenEmpower] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const locale = useParams()?.locale;
  const axios = useApi();

  const {isScroll}=useMyContext()

  const handleButton = (idx) => {
    setCurrentIndex(idx);
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/api/women-empowerments');
      const womenEmpowerData = data?.data?.map((item, id) => {
        return {
          title: item?.attributes?.title,
          description: item?.attributes?.content
        };
      });
      setWomenEmpower(womenEmpowerData);
  
    })();
  }, []);
  return (
    <div className={`w-full h-full absolute top-0 z-[-1] bg-[#F6F6F6] ${isScroll?'top-36':''}`}>
      <section className={`w-full h-full md:h-[800px] pt-28 relative  grid place-items-center `}>
        <img loading="lazy" decoding="async"
          src={'/images/step-bg.png'}
          className="w-full h-full object-fill absolute top-0 z-[-1]"
        />
      </section>


      <div className="flex w-full   flex-wrap  justify-center pt-5 space-x-2 items-center relative before:absolute before:-bottom-3 before:w-20   before:h-0.5 before:bg-primary-main">
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
            <Link className="  text-sm font-bold text-primary-main  " href={`${locale==='kn'?'/kn/women-empowerment':'/en/women-empowerment'}`}>
            {locale==='kn'?'ಸ್ಟೆಪ್ ಯೋಜನೆ':'Step'}
            </Link>
            
      </div>
      <div className="flex w-full    justify-center pt-10 space-x-2 items-center relative before:absolute before:-bottom-3 before:w-20   before:h-0.5 before:bg-primary-main">
                

            <Link className="  text-sm font-bold " href={`${locale==='kn'?'/kn/portfolio#ACHIEVEMENTS':'/en/portfolio#ACHIEVEMENTS'}`}>
            {locale==='kn'?'ಪೋರ್ಟ್ಫೋಲಿಯೋಗೆ ಹಿಂದಿರುಗಲು':'Back to portfolio'}
              
            </Link>

          
            
      </div>
      <section className="w-full max-w-7xl m-auto h-auto p-4  flex justify-center items-center flex-col  space-y-6  ">
      <div className="   mt-20  relative w-full  flex justify-center items-center ">
          
              <h1 className=" text-primary-main relative max-w-[300px] m-auto text-center z-10 font-heading text-xl font-extrabold uppercase">
              {locale === 'en' ? 'STEP' : 'ಸ್ಟೆಪ್ ಯೋಜನೆ'}
              </h1>
            </div>
         
        <p className="text-justify text-xs md:text-xl text-neutral-dark1">
          {locale === 'en'
            ? ` Support to Training and Employment Programme (STEP) for Women was launched by the Ministry
          of Women & Child Development, Government of India, as one of the measures to ensure well
          being of women in the traditional informal sector in the year 1986 and advocates the
          objective of extending training for upgradation of skills and sustainable employment for
          women through a variety of action oriented projects which employ women in large numbers.`
            : `ಮಹಿಳೆಯರಿಗಾಗಿ ವೃತ್ತಿ ತರಬೇತಿ ಮತ್ತು ಉದ್ಯೋಗ ಬೆಂಬಲಿತ ಯೋಜನೆಯನ್ನು(ಸ್ಟೆಪ್) ಭಾರತ ಸರ್ಕಾರದ ಮಹಿಳಾ ಮತ್ತು ಮಕ್ಕಳ ಅಭಿವೃದ್ಧಿ ಸಚಿವಾಲಯದ 1986ರಲ್ಲ್ಲಿ ಪ್ರಾರಂಭವಾಗಿರುತ್ತದೆ. ಅಸಂಘಟಿತ ವಲಯದಲ್ಲಿರುವ ಮಹಿಳೆಯರನ್ನು ಸಾಮಾಜಿಕವಾಗಿ ಮತ್ತು ಆರ್ಥಿಕವಾಗಿ ಅಭಿವೃದ್ಧಿಪಡಿಸುವುದು  ಯೋಜನೆಯ ಮುಖ್ಯ ಉದ್ದೇಶವಾಗಿರುತ್ತದೆ. ಅಲ್ಲದೇ ಮಹಿಳೆಯರಲ್ಲಿ ವೃತ್ತಿ ಕೌಶಲ್ಯತೆ ಅಭಿವೃದ್ಧಿ ಪಡಿಸುವ ತರಬೇತಿಗಳನ್ನು ಹಾಗೂ ನಿರಂತರ ಆದಾಯ ತರುವಂತಹ ಉದ್ಯೋಗಗಳನ್ನು ಕಲ್ಪಿಸಿ ಹೆಚ್ಚಿನ ಮಹಿಳೆಯರನ್ನು ಉದ್ಯೋಗಗಳಲ್ಲಿ ತೊಡಗಿಸುವ ಉದ್ದೇಶ ಹೊಂದಿದೆ.`}
        </p>
      </section>

      <div className='w-full  '>

     

      <section className=" max-w-7xl m-auto h-auto p-5 flex   justify-center items-start    space-y-6  xl:flex-row xl:justify-evenly xl:items-start md:space-x-5">
      <Fade top>
        <div className="w-full xl:max-w-2xl flex flex-col justify-center items-start rounded-tl-3xl  rounded-br-3xl  bg-white space-y-6 p-2 ">

       
        <div className=" mb-5 md:mb-20  mt-20  relative w-full  flex justify-center items-center ">
              <img loading="lazy" decoding="async"
                src="/images/heading/heading-color/group.png"
                className="absolute   w-[530px]  md:top-[-70px]    object-contain"
              />
              <h1 className=" text-primary-main relative max-w-[300px] m-auto text-center z-10 font-heading text-[5.5px] md:text-sm font-extrabold uppercase">
              {womenEmpower[currentIndex]?.title}
              </h1>
            </div>
        
          
          {womenEmpower[currentIndex]?.description?.map((item, id) => {
            return (
              <p  key={id} className="text-[7px] md:text-xl text-neutral-dark1 text-justify">{item?.children?.[0]?.text}</p>
            );
          })}
        </div>
        </Fade>

        <div className="flex flex-col justify-center items-start rounded-tl-3xl  rounded-br-3xl  bg-white p-5">
          <div>
            <h1 className=" text-xs md:text-xl">{locale==='en'?`WOMEN EMPOWERTMENT`:`ಮಹಿಳಾ ಸಬಲೀಕರಣ`}</h1>
          </div>

          <div className="w-full h-ful pt-5">
            <ul className="w-full flex flex-col justify-center items-center space-y-1">
              {womenEmpower?.map((items, idx) => {
                return (
                  <li
                    key={idx}
                    className=" relative w-full h-full flex justify-start p-2 space-x-3 items-center text-[5.5px] md:text-lg before:absolute before:w-full  before:h-0.5 before:bg-neutral-dark4 before:bottom-0"
                    onClick={() => handleButton(idx)}>
                    <img loading="lazy" decoding="async" src={rightArrow.src} className='w-2' />
                    <Fade right>
                    <p
                      className={` cursor-pointer ${
                        idx === currentIndex ? 'text-primary-main font-bold' : 'text-neutral-dark1'
                      } uppercase`}>
                      {items.title}
                    </p>
                    </Fade>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
      </div>
       
<Footer />
    </div>
  );
}

export default WomenEmpowerment;