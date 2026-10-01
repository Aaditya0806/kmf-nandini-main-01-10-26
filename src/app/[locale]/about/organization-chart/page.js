'use client';
import React, { useEffect, useState } from 'react';
import organizationHero from '@/images/about/organization-chart/organization-hero.png';
import milkRight from '@/images/about/organization-chart/milk-right.png';
import Hero from '@/images/about/organization-chart/Farmer.png';
 
import {Fade,Zoom} from 'react-reveal'
import 'swiper/css';
import 'swiper/css/navigation';
 
import Footer from '@/components/Footer';
import { useParams } from 'next/navigation';
import { useMyContext } from '@/context/headerContext';
import useApi from '@/hooks/useApi';
 
import { achievements as achievementItems } from '@/configtext/companyProfile';
import Counter from '@/components/Counter';
import { ParallaxBanner } from "react-scroll-parallax";


function OrganizationChart() {
  const locale = useParams().locale;
  const [banner,setBanner]=useState([])
 
  const { isScroll, setIsScroll } = useMyContext();

  const axios=useApi()
  useEffect(()=>{
    (
      async()=>{
        const {data:banner}=await axios.get('/api/organization-chart')
        const { data } = await axios.get('/api/kmf-acheivment');
        setBanner(banner?.data)
        setAchievments(achievementItems);
      }
    )()
  },[])

  useEffect(() => {
   

    const handleSlideView = () => {
      const screen = window.innerWidth;
      if (screen < 1113) {
        // setSlideView(2);
      }
      if (screen < 779) {
        // setSlideView(1);
      }
    };
    handleSlideView();

    window.addEventListener('resize', handleSlideView);
    return () => window.removeEventListener('resize', handleSlideView);
  }, []);
  return (
    <div className={`w-full h-full absolute top-0 z-[-1] ${isScroll ? 'top-36 md:h-[400px]' : 'h-[90vh]'}`}>
      <ParallaxBanner
        layers={[
          { image: "/images/home-about.png", speed: -20 },
          {
            speed: -15,
            children: (
<h></h>
            ),
          },
           
        ]}
        className={`  w-full       object-contain ${isScroll ? 'md:mt-10' : ''} `}
      >
           
           <div className='w-full h-fit max-w-[1400px]  pt-10 m-auto flex flex-col space-y-5 mb-5 relative bg-organization '>
          <div className='w-full flex justify-center items-center'>
          <div className="md:mb-10   relative w-full  flex justify-center items-center ">
          
              
              <h1 className=" text-white text-center relative z-10 font-heading text-4xl font-bold uppercase">
              {locale==='kn'?'ಕಹಾಮ ಸಂಸ್ಥೆಯ ಬಗ್ಗೆ':'About Organization'}
              </h1>
            </div>
            
                
          </div>
          <Zoom>
          <div className=' w-full md:pt-10 grid grid-cols-4  md:h-[600px] gap-10 relative organization-bg'>
          <Counter  title={locale==='kn'?'ಹಳ್ಳಿಗಳು':'Villages'} endNumber={26000}/>
          <Counter  title={locale==='kn'?"ಹಾಲು ಉತ್ಪಾದಕ ಸದಸ್ಯರು":"Lakh Milk Producer Members"} endNumber={27}/>

          <Counter  title={locale==='kn'?"ಹಾಲು ಸಹಕಾರಿ ಸಂಘಗಳು":"Functioning Dairy co-coperative societies"} endNumber={16000}/>

          <Counter  title={locale==='kn'?"ಪ್ರತಿದಿನ  ಹಾಲು ಶೇಖರಣೆ":"Lakh KGs of Milk Procurement Per day"} endNumber={99}/>

          <Counter  title={locale==='kn'?"ಹಾಲು ಮತ್ತು ಹಾಲಿನ ಉತ್ಪನ್ನಗಳು":"Milk and Milk Products"} endNumber={175}/>
          <Counter  title={locale==='kn'?"ಹಾಲು ಒಕ್ಕೂಟಗಳು":"Milk Unions"} endNumber={16}/>
          <Counter  title={locale==='kn'?"ಕಹಾಮ ಘಟಕಗಳು":"Kmf Units"} endNumber={15}/>
          <Counter  title={locale==='kn'?"ಪ್ರತಿದಿನ ರೈತರಿಗೆ ಪಾವತಿ ":"Crores Payment Per day to farmers"} endNumber={35}/>


          </div>
          </Zoom>
         
          

        </div>
       
      </ParallaxBanner>
      <section className={` relativew-full w-full m-auto  mt-5 h-full md:h-[500px]   relative  grid place-items-center `}>

      <div className="absolute w-full h-full z-[-10] ">
            <div className="w-full h-full flex justify-between items-center">
              <div className="w-20 md:w-40 h-8 bg-red-600"></div>
              <div className="w-20 md:w-40 h-8 bg-red-600"></div>
            </div>
          </div>

          <Fade bottom>
        <img loading="lazy" decoding="async"
          src={Hero.src}
          className=" w-96 md:w-full  md:max-w-7xl md:h-[500px] object-contain    "
        />
</Fade>

      </section>

      

  

      <section className="w-full  max-w-[1500px] m-auto h-auto  mt-20   ">
        <div className="   w-full  h-full flex flex-col p-3 space-y-2 lg:flex-row lg:p-5 lg:space-x-10">
          {locale === 'en' ? (
            <div className="w-full flex flex-col justify-center items-start   ">
                 <div className="mb-2  relative w-full    ">
           
              <h1 className=" text-primary-main relative z-10 font-heading text-2xl font-extrabold uppercase">
              {locale==='kn'?'ಕಹಾಮ ಸಂಸ್ಥೆಯ ಬಗ್ಗೆ':'About Organization'}
              </h1>
            </div>
              <Fade bottom>
              <p className="text-lg text-justify p-2">
                The organization is three tiered on Co-operative principles.
              </p>
              </Fade>

              <Fade bottom>
              <ul className="flex flex-col space-y-5 p-6 w-full  justify-center items-start list-disc text-justify text-lg  md:justify-normal md:items-start">
                <li>Dairy Co-operative Societies at grass root level.</li>

                <li>District Co-operative Milk Unions at single / multi district level.</li>

                <li>Milk Federation at State level.</li>
              </ul>
              </Fade>


              <Fade bottom>
              <p className="text-lg text-justify p-2">
                All above three are governed by democratically elected board from among the milk
                producers. Under the direction of elected boards, KMF, various functional Units &
                Unions are performing the assigned tasks to ensure fulfilment of organisation
                objectives.
              </p>
              </Fade>
            </div>



          ) :
          
          (
            <div className="w-full flex flex-col justify-center items-start shadow-md ">
              <h1 className="text-2xl font-heading text-center w-full shadow-md p-3 shadow-black bg-primary-gradient  text-white">ಸಂಸ್ಥೆಯ ವಿನ್ಯಾಸ
</h1>

              <p className="text-lg text-justify p-2">
              
              ಸಹಕಾರಿ ತತ್ವಗಳ ಆಧಾರದ ಮೇಲೆ ರೂಪಗೊಂಡಿದ್ದು, ಸಂಸ್ಥೆಯು 3 ಹಂತಗಳಲ್ಲಿ ವಿನ್ಯಾಸಗೊಂಡಿದೆ.

              </p>

              <ul className="flex flex-col space-y-5 p-6 w-full  justify-center items-start list-disc text-justify text-lg  md:justify-normal md:items-start">
                <li>
                ⁠ಪ್ರಾಥಮಿಕ ಹಂತದಲ್ಲಿ ಹಾಲು ಉತ್ಪಾದಕರ ಸಹಕಾರ ಸಂಘಗಳು
</li>

                <li>
                ಜಿಲ್ಲಾ ಮಟ್ಟದಲ್ಲಿ ಸಹಕಾರಿ ಹಾಲು ಒಕ್ಕೂಟಗಳು
</li>

                <li>
                ರಾಜ್ಯ ಮಟ್ಟದಲ್ಲಿ ಸಹಕಾರಿ ಹಾಲು ಮಹಾಮಂಡಳಿ
</li>
              </ul>
              <p className="text-lg text-justify p-2">
              ಮೇಲಿನ ಮೂರು ಹಂತಗಳು ಹಾಲು ಉತ್ಪಾದಕರಿಂದ ಚುನಾಯಿತ ಆಡಳಿತ ಮಂಡಳಿಯ ಸದಸ್ಯರಿಂದ ನಿರ್ವಹಿಸಲಾಗುತ್ತಿದೆ. ರಾಜ್ಯಮಟ್ಟದ ಕೆ.ಎಂ.ಎಫ್ ಘಟಕಗಳು, ಜಿಲ್ಲಾ ಹಾಲು ಒಕ್ಕೂಟಗಳು ಹಾಗೂ ಪ್ರಾಥಮಿಕ ಹಾಲು ಉತ್ಪಾದಕರ ಸಹಕಾರ ಸಂಘಗಳು ಸಹಕಾರಿ ಹೈನೋದ್ಯಮದ ಧ್ಯೇಯೋದ್ದೇಶಗಳನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಅನುಷ್ಠಾನಗೊಳಿಸಲು ಕೈ ಜೋಡಿಸಿ ಕೆಲಸ ಮಾಡುತ್ತಿವೆ.
              </p>
            </div>
          )}

          <div className="w-full   flex justify-center items-center">
            <img loading="lazy" decoding="async" src={milkRight.src} />
          </div>
        </div>
      </section>


    

       
<Footer />
    </div>
  );
}

export default OrganizationChart;
