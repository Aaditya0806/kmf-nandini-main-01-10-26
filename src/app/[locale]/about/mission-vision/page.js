'use client';
import React, { useEffect, useState } from 'react';
 
import CowImg1 from '@/images/about/mission/about-cow-1.png';
import CowImg2 from '@/images/about/mission/about-cow-2.png';
import MV from '@/images/about/mission/vision-mission.png';
 
import Footer from '@/components/Footer';
import { useParams } from 'next/navigation';
import useApi from '@/hooks/useApi';
import { useMyContext } from '@/context/headerContext';
import { Fade, Zoom } from 'react-reveal';
function MissionVission() {
  const locale = useParams().locale;
  const axios = useApi();
  const [purpose, setPurpose] = useState([]);
  const { isScroll, setIsScroll, id, setId } = useMyContext();
  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/api/mission-vissions');
      console.log("mission",data.data[0]?.attributes?.vission[0]?.children[0].text)
      setPurpose(data.data[0]);
       
    })();
  }, []);

  return (
    <div className={`w-full h-full absolute   z-[-1] ${isScroll ? ' md:top-48' : ''}  `}>
    
      {purpose?.attributes?.bannervideo?.data ?
       <section className={`w-full h-[600px] pt-28 relative  grid place-items-center `}>
       {/* <img loading="lazy" decoding="async" src={banner?banner[0]:HeroImg.src} className="w-full h-full absolute top-0 z-[-1]" />
        */}
       
       <video
         src={purpose?.attributes?.bannervideo?.data?.attributes?.url || ''}
         muted
         autoPlay
         loop
         controls
         playsInline
         className={`w-full  h-full    object-cover absolute top-0   ${
           isScroll ? 'h-[400px]' : ''
         } `}
       />
     </section>
     :
      <section className={`w-full h-[200px] md:h-[450px] lg:h-[750px] pt-28 relative grid place-items-center `}>
       
      <Fade top>
      <img loading="lazy" decoding="async"
        src={MV.src}
        
        className={`w-full  h-full    object-fill absolute top-0 z-[-1] ${
          isScroll ? 'h-[500px]' : ''
        } `}
      />
      </Fade>
    </section>
      }

 
      <section className="w-full max-w-5xl m-auto h-auto pt-10  ">
        <div className="w-full  h-full flex flex-col p-3 space-y-5  lg:flex-row lg:p-10 lg:space-x-10">
          <div className="w-full flex flex-col justify-center items-center shadow-md ">
            <div className="mb-2   relative w-full  flex justify-center items-center ">
             <Fade bottom>
              <h1 className=" text-primary-main font-heading text-3xl font-extrabold uppercase">
                 
                {/* {purpose?.attributes?.missionandvissiontitle} */}
                
                  {locale === 'en' ? 'VISION AND MISSION' : 'ದೃಷ್ಟಿ ಮತ್ತು ಮಿಷನ್'}
              </h1>
              </Fade>
            </div>

            <ul className="flex flex-col space-y-5 p-6 w-full h-full justify-center items-center  list-disc text-justify text-lg  md:justify-normal md:items-start">
              <h1 className={`text-4xl font-bold ${locale==='kn'?'text-xl':''}`}>{locale === 'kn' ? 'ಘನೋದ್ದೇಶ' : 'Vision'}</h1>
            <Fade bottom>
              {/* {purpose?.attributes?.vission?.map((item, id) => {
                return <li key={id}>{item?.children[0].text}</li>;
              })} */}
               {purpose?.attributes?.vission?.map((item, id) => {
                return <li key={id}>{item?.children[0].text}</li>;
              })}
              {/* <li>To promote producer oriented viable cooperative society to impart an impetus to the rural income, dairy productivity and rural employment.</li>
              <li>To abridge the gap between price of milk procurement and sale price.</li>
              <li>To develop business acumen in marketing and trading disciplines so as to serve consumers with quality milk, give a fillip to the income of milk producers.</li>
              <li>To compete with MNCs and Private Dairies with better quality of milk and milk products and in the process sustain invincibility of cooperatives.</li>
              <li>To march forward with a missionary zeal which will make KMF a trailblazer of exemplary performance and achievements beckoning other Milk Federations in the country in pursuit of total emulation of its good deeds.</li>
               */}

            </Fade>
            </ul>

            <ul className="flex flex-col space-y-5 p-6 w-full h-full justify-center items-center list-disc   text-justify text-lg  md:justify-normal md:items-start">
              <h1 className={`text-4xl font-bold ${locale==='kn'?'text-xl':''}`}>{locale === 'kn' ? 'ಧ್ಯೇಯದೃಷ್ಟಿ' : 'Mission'}</h1>
              
              {purpose?.attributes?.mission?.map((item, id) => {
                return <li key={id}>{item?.children[0].text}</li>;
              })}
               
                {/* <li>Heralding economic, social and cultural prosperity in the lives of our milk producer members by promoting vibrant, self-sustaining and holistic cooperative dairy development in Karnataka State.</li> */}
            </ul>
          </div>
        </div>
      </section>

      <section className="w-full h-auto pt-10   ">
        <div className="w-full  h-full flex flex-col p-3 space-y-5 lg:flex-row lg:p-10 lg:space-x-10">
          <Fade left>
          <div className="w-full   flex justify-center items-center">
            <img loading="lazy" decoding="async" src={CowImg1.src} />
          </div>
          </Fade>

          <div className="w-full flex flex-col justify-center items-start shadow-md ">
            <Fade right>
            <div className="mb-8   relative w-full  flex justify-center items-center ">
             
              <h1 className=" text-primary-main font-heading text-3xl font-extrabold uppercase">
              {/* {purpose?.attributes?.objectivetitle} */}
              {/*  */}   {locale === 'en' ? 'OBJECTIVES' : 'ಉದ್ದೇಶಗಳು'}
              </h1>
            </div>
            </Fade>

            <ul className="flex flex-col space-y-3 p-6 w-full h-full justify-center items-center list-disc text-justify text-lg  md:justify-normal md:items-start">
              <Fade right>
              {purpose?.attributes?.objective?.map((item, id) => {
                return <li key={id}>{item?.children[0].text}</li>;
              })}
            
  {/* <li>KMF is a Cooperative Apex Body in the State of Karnataka representing organisations of milk producers and implementing all-round dairy development activities to achieve the following objectives:</li>
  <li>To ensure assured and remunerative market round the year for the milk produced by the farmer members.</li>
  <li>To make available quality milk and other premier dairy products to urban consumers.</li>
  <li>To build and develop village-level institutions as cooperative model units to manage dairy activities.</li>
  <li>To ensure provision of inputs for milk production, processing facilities and dissemination of know-how.</li>
  <li>To facilitate rural development by providing opportunities for self-employment at village level, preventing migration to urban areas, introducing cash economy, and providing sustained income.</li>
  <li>The philosophy of dairy development is to eliminate middlemen and organise institutions to be owned and managed by the milk producers themselves, employing professionals.</li>
  <li>Achieve economies of scale to ensure maximum returns to milk producers while providing wholesome milk at reasonable price to urban consumers.</li>
  <li>The cooperative network should build a bridge between rural producers and urban consumers, achieving socio-economic development across the State.</li> */}


              </Fade>
            </ul>
          </div>
        </div>
      </section>

      <section className=" relative w-full h-auto pt-10  ">
        <div className="w-full  h-full flex flex-col p-3 justify-center items-center space-y-5 lg:flex-row lg:p-10 lg:space-x-10">
          <div className="w-full flex flex-col justify-center items-center shadow-md ">
              <Fade left>
            <div className="mb-8   relative w-full  flex justify-center items-center ">
              <h1 className=" text-primary-main font-heading text-3xl font-extrabold uppercase">
              {/* {purpose?.attributes?.evalutiontitle} */}
               {locale === 'en' ? 'EVOLUTION' : 'ವಿಕಸನ'}
              </h1>
            </div>
            </Fade>

            <ul className="flex flex-col space-y-3 p-6 w-full h-full justify-center items-center list-disc text-justify text-lg  md:justify-normal md:items-start">
              <Fade left>
              {purpose?.attributes?.evalution?.map((item, id) => {
                return <li key={id}>{item?.children[0].text}</li>;
              })}

            
  {/* <li>Karnataka Milk Federation (KMF) evolved as a premier and profitable dairy farmers organization in Karnataka.</li>
  
  <li>In 1975, Karnataka Dairy Development Corporation (KDDC) was formed as an agency to implement the World Bank–aided Dairy Development Projects.</li>
  
  <li>KDDC expanded rapidly, spreading rural economic activity—Dairying—across the State, leading to the formation of the apex cooperative body KMF in 1984.</li>
  
  <li>KMF covered the entire State with 13 District Co-operative Milk Unions executing major dairy activities including:
    <ul>
      <li>Organization of Dairy Co-operatives</li>
      <li>Milk Routes</li>
      <li>Veterinary Services</li>
      <li>Procurement of milk in two shifts</li>
      <li>Chilling and Processing of milk</li>
      <li>Distribution of milk</li>
      <li>Establishment of Cattle Feed Plants</li>
      <li>Nandini Sperm Station</li>
      <li>Liquid Nitrogen Supply</li>
      <li>Training Centres</li>
    </ul>
  </li>
  
  <li>The system was built on the now well-known ‘ANAND’ pattern of dairy cooperative societies.</li>
  
  <li>Initially, eight southern districts were included with a target of:
    <ul>
      <li>Organizing 1800 Dairy Cooperative Societies</li>
      <li>Forming four Milk Unions</li>
      <li>Setting up processing facilities of 6.5 lakh liters/day by 1984</li>
    </ul>
  </li>
  
  <li>Under Operation Flood II and III (started in 1984 & 1987), the remaining parts of Karnataka were covered.</li>
  
  <li>Thirteen milk unions were organized across 175 talukas of 20 districts, and additional dairy cooperative societies were created.</li>
  
  <li>Processing facilities such as chilling centers, milk dairies, and powder plants were gradually transferred to the control of respective cooperative milk unions.</li>
  
  <li>Additional processing infrastructure was added every decade with support from Govt., Zilla Panchayat, and NDDB under the Perspective Plan.</li>
  
  <li>The goal was to handle increasing milk procurement without declaring milk holidays.</li>
  
  <li>The current processing capacity stands at 57.40 lakh liters/day and continues to be strengthened.</li> */}


              </Fade>
            </ul>
          </div>


          <Fade right>

          <div className="w-full h-full flex justify-center items-center">
            <img loading="lazy" decoding="async" src={CowImg2.src} className=" w-[400px] h-full" />
          </div>
          </Fade>
        </div>

        {/* <img loading="lazy" decoding="async" src={MilkBottomImg.src} className="w-full h-full " /> */}
      </section>

       
<Footer />
    </div>
  );
}

export default MissionVission;
