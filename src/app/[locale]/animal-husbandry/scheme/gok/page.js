'use client';
import React, { useEffect, useState } from 'react';
import Follow from '@/components/Follow.js';
import Footer from '@/components/Footer';
import { useMyContext } from '@/context/headerContext';
import useLocale from '@/hooks/useLocale';
import useApi from '@/hooks/useApi';
import { BlocksContent, BlocksRenderer } from '@strapi/blocks-react-renderer';
 import Link from 'next/link';
 import rightArrow from '@/images/women-empower/rightArrow.svg';
import { Fade } from 'react-reveal';

function GOK() {
  const { isScroll } = useMyContext();
  const locale = useLocale().locale;
  const [scheme,setScheme]=useState([])
  const [readMore,setReadMore]=useState(false)
  const [showmore,setShowMore]=useState(false)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bhagaya,setBhagaya]=useState([])
const axios=useApi()

const handleButton = (idx) => {
  setCurrentIndex(idx);
};
  useEffect(()=>{
    (
      async()=>{
        const {data}=await axios.get('/api/goks?sort[0]=createdAt:asc')
        // const { data: bhagaya } = await axios.get(`/api/ksheerabhagaya`);
        const gokData = data?.data?.map((item, id) => {
          return {
            title: item?.attributes?.title,
            content: item?.attributes?.content
          };
        });

        // setBhagaya(bhagaya?.data);
        setScheme(gokData)
      }
    )()
  },[])

  const toggleReadMore = () => {
    setReadMore(!readMore);
  };
  return (
    <div className={`w-full h-full absolute     ${isScroll ? ' md:top-48' : ''}  `}>
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
          className={`w-full  h-full    object-cover absolute top-0   ${
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
            <Link className="  text-sm font-bold  text-primary-main " href={`/${locale}/animal-husbandry/scheme/gok`}>
               {locale === "en" ? "GOK":"ರಾಜ್ಯ ಸರಕಾರದ ಯೋಜನೆಗಳು"}
            </Link>
            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold   " href={`/${locale}/animal-husbandry/scheme/other-scheme`}>
                {locale === "en" ? "Other Schemes":"ಇತರೆ ಯೋಜನೆಗಳು"}
            </Link>
            
          </div>

          <div className="  mt-20  relative w-full  flex justify-center items-center ">
             
              <h1 className=" text-primary-main relative z-10 font-heading text-2xl font-extrabold uppercase">
              {locale==='kn'?'ರಾಜ್ಯ ಸರಕಾರದ ಯೋಜನೆಗಳು':'Government Of Karnataka'}
              </h1>
            </div>
    

            <section className='relative w-full max-w-7xl  p-4  m-auto md:pt-20   h-auto  '>
            {bhagaya && bhagaya.attributes && bhagaya.attributes.content && (
                    <BlocksRenderer
                      content={ bhagaya.attributes.content}
                      blocks={{
                        // You can use the default components to set class names...
                        paragraph:({children})=>{
                          return <p className='text-xs text-justify p-3 md:text-lg'>{children}</p>
                        },
                        heading: ({ children, level }) => {
                          switch (level) {
                            case 1:
                              return (
                              
                    <div className=' w-full relative flex justify-center mt-20 mb-20 items-center'>
                    <img loading="lazy" decoding="async" src='/images/heading/heading-color/group.png' className='absolute z-[1] w-[450px]    top-[-50pxx]   object-contain'/>
        
        
                                <h1 className="w-full relative max-w-[300px] m-auto text-center  text-primary-main text-sm md:text-lg   z-[100] ">
                                  {' '}
                                  {children}
                                </h1>
                     </div>
                              );
                            case 2:
                              return <h2 className=" text-sm md:text-lg">{children}</h2>;
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
                        code: ({ children }) => {
                          const columns =
                            children?.[0]?.props?.text.split(',')[0].trim() === 'columns'
                              ? children?.[0]?.props?.text.split(',').slice(1)
                              : [];

                          return (
                            <table className="table-fixed  border-spacing-y-2	 border-collapse border-black border overflow-auto     w-full ">
                              <thead className=" text-left bg-orange-400 text-primary-main">
                                {columns?.map((item, id) => {
                                  console.log(item,id)
                                  if(id===0){
                                    return (
                                      <th className="p-2 w-[4px]  text-[5.5px] md:text-lg  border-r border-black " key={id}>
                                        {item}
                                      </th>
                                    );
                                  }else{
                                    return (
                                      <th className="p-2  text-[5.5px] md:text-lg  border-r border-black " key={id}>
                                        {item}
                                      </th>
                                    );
                                  }
                               
                                })}
                              </thead>
                              <tbody className="text-left  text-[5.5px] md:text-lg ">
                                <tr className="w-full ">
                                  {children?.[0]?.props?.text.split(',')[0].trim() !== 'columns' &&
                                    children?.[0]?.props?.text?.split(',')?.map((item, id) => {

                                      if(id===0){

                                        return (
                                          <td className=" w-[4px] p-2 text-md font-content border-r border-black " key={id}>
                                            {' '}
                                            {item}
                                          </td>
                                        );
                                      }
                                      else{

                                        return (
                                          <td className=" p-2 text-md font-content border-r border-black " key={id}>
                                            {' '}
                                            {item}
                                          </td>
                                        );
                                      }
                                    
                                    })}
                                </tr>
                              </tbody>
                            </table>
                          );
                        },

                 
                      }}
                    />
                  )}
            </section>
            <section className=" relative w-full   h-auto   ">
            <section className=" max-w-7xl m-auto h-auto p-3 flex   justify-center items-start    space-y-6  xl:flex-row xl:justify-evenly xl:items-start md:space-x-2">

            <Fade left>
        <div className="w-full shadow-lg flex flex-col justify-center items-start rounded-tl-3xl  rounded-br-3xl  bg-white space-y-6 p-5 ">
        <div className=" mb-5 md:mb-20  mt-20  relative w-full   flex justify-center items-center ">
              <img loading="lazy" decoding="async"
                src="/images/heading/heading-color/group.png"
                className="absolute   w-[530px] top-[-18px] sm:top-[-50px]    object-contain"
              />
              <br /><br />
              <h1 className=" text-primary-main relative max-w-[100px] md:max-w-[800px] m-auto text-center z-10 font-heading text-[4px] md:text-sm font-extrabold uppercase">
              {scheme[currentIndex]?.title}
              GOK Schemes
              </h1>
            </div>
          {/* <p>
  <strong>1. Ksheera Bhagya:</strong><br/><br/>
  • The Ksheera Bhagya Scheme was launched on 1st Aug 2013 by the Government of Karnataka in coordination with KMF to provide nutritious milk to School and Anganwadi children for healthy growth and development.<br/>
  • It was a dream project conceived by KMF based on the suggestion of the Honorable Chief Minister of Karnataka to help poor children and also support milk producers by utilizing surplus milk.<br/><br/>
  The Gist of the Ksheera Bhagya Scheme is as follows:
</p>


<table border="1" cellpadding="6" cellspacing="0">
  <thead>
    <tr>
      <th>Sl. No.</th>
      <th>GIST</th>
      <th>Schools</th>
      <th>Anganwadi</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Schools / Anganwadi covered</td>
      <td>51,000 nos</td>
      <td>64,000 nos</td>
    </tr>
    <tr>
      <td>2</td>
      <td>No. of Children</td>
      <td>65 lakhs</td>
      <td>39 lakhs</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Beneficiaries</td>
      <td>1st to 10th Standard Govt & Aided Schools</td>
      <td>Children (1–6 years)</td>
    </tr>
    <tr>
      <td>4</td>
      <td>Milk Powder Required</td>
      <td>18g WMP (150 ml milk, 3 days/week)</td>
      <td>15g SMP (1 serving)</td>
    </tr>
    <tr>
      <td>5</td>
      <td>Milk Required Per Day</td>
      <td>4.25 LLPD</td>
      <td>2.57 LLPD</td>
    </tr>
    <tr>
      <td>6</td>
      <td>Cost / Child / One Serve</td>
      <td>Rs. 5.25 Approx.</td>
      <td>Rs. 3.64 Approx.</td>
    </tr>
  </tbody>
</table>


<br/>

<p>
  <strong>2. Amruth Yojane:</strong><br/><br/>
  The scheme was introduced in the 2007–08 budget to support socio-economic upliftment of Devadasis, widows, SC and ST women by providing a milch animal.
  The initial cost was Rs.20,000 (2007–08 to 2009–10), later increased to Rs.35,000.<br/>
  • Subsidy: 50% to widows & Devadasis, 60% to SC, 75% to ST.<br/><br/>
  In 2014–15, the Government enhanced the cost to Rs.50,000 and decided to give two animals per beneficiary with 25% subsidy (general widows & Devadasis) and 75% subsidy (SC/ST).<br/><br/>
  Under the scheme, Rs.5722.50 lakhs has been released. Up to Aug 2015, a total of 39,897 milch cows have been purchased with an expenditure of Rs.4923.13 lakhs.
</p>

<p>
  <strong>3. Milk Incentives to Milk Producers:</strong><br/><br/>
  Introduced in 2008–09 to encourage rural farmers to take up dairying by offering Rs.2 per litre.
  From 14-05-2013, the incentive was increased to Rs.4 per litre.<br/><br/>
  Up to June 2015, Rs.3151.86 crore has been given to milk producers through societies,
  benefiting around 8.20 lakh farmers per month.
</p> */}



         
          {scheme[currentIndex]?.content?.map((item, id) => {
            return (
              <p  key={id} className="text-[10px] md:text-xl text-neutral-dark1 text-justify">{item?.children?.[0]?.text}</p>
            );
          })}
          
        </div>
        </Fade>

        <div className="flex flex-col justify-center items-start rounded-tl-3xl   rounded-br-3xl  bg-white p-5">
          <div>
            <h1 className=" text-xs  text-center md:text-xl uppercase">{locale==='kn'?`ಕೇಂದ್ರ ಸರಕಾರದ ಯೋಜನೆಗಳು`:`Government Of Karnataka `}</h1>
          </div>

          <div className="w-full h-ful pt-5 shadow-md">

            <ul className="w-full flex flex-col justify-center items-center space-y-3">
          
              { scheme?.map((items, idx) => {
                
                  return (
                    
                    <li
                      key={idx}
                      className=" cursor-pointer relative w-full h-full flex justify-start p-2 pb-2 space-x-3 items-center text-[5.5px] md:text-sm before:absolute before:w-[120px]  md:before:w-full  before:h-0.5 before:bg-neutral-dark4 before:bottom-0"
                      onClick={() => handleButton(idx)}>
                      <img loading="lazy" decoding="async" src={rightArrow.src} className='w-4' />
                      <Fade right >
                      <p
                        className={`${
                          idx === currentIndex ? 'text-primary-main font-bold' : 'text-neutral-dark1'
                        } uppercase`}>
                        {items.title}
                      </p>
                      </Fade>
                    </li>
                     
                  );
            

               
              })
              
              
             
}
            
            </ul>
          </div>
        </div>
      </section>


         
      </section>

       
<Footer />
    </div>
  );
}

export default GOK;
