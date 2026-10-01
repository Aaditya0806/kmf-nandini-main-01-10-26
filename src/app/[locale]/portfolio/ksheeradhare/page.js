"use client"
import React, { useEffect, useState } from 'react'
import titleBG from '@/images/portfolio/title-bg.png';
import Follow from '@/components/Follow.js';
import Footer from '@/components/Footer';
import flag from '@/images/portfolio/flag.jpg';
import useLocale from '@/hooks/useLocale';
import Link from 'next/link';
import { data } from 'autoprefixer';
import axios from 'axios';
import useApi from '@/hooks/useApi';


import { BlocksRenderer } from '@strapi/blocks-react-renderer';
const KsheeraDhare = () => {
  const locale = useLocale().locale;
  const [dhare, setDhare] = useState([]);
  // const [allUnions, setAllUnions] = useState([]);

  const axios = useApi();

  useEffect(() => {
    (async () => {
      // const { data } = await axios.get(`/api/milk-unions/${param?.slug}`);
      const { data: dhare } = await axios.get(`/api/ksheera-dhare`);
       
 
    
      setDhare(dhare?.data);

    })();
  }, []);

  return (
     <div className='w-full h-full'>
        <div className="flex w-full    justify-center pt-5 space-x-2 items-center relative before:absolute before:-bottom-3 before:w-20   before:h-0.5 before:bg-primary-main">
            <Link className="  text-sm font-bold  " href={`/${locale}/portfolio/#ACHIEVEMENTS` || ''}>
            {locale==='en'?'KMF ACHIEVEMENTS':'ಕಹಾಮ ಸಾಧನೆಗಳು'}
            </Link>

           
            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold text-primary-main" href={''}>
                {locale === 'en' ?  'KSHEERADHARE' : 'ಕ್ಷೀರಧಾರೆ'}
            </Link>
          </div>
        <div className='w-full h-auto'>
        <div className=' relative w-full h-full flex flex-col items-center justify-center mt-20'>

            <h1 className='text-primary-main text-2xl md:text-5xl  ' >  {locale === 'en' ?  'KSHEERADHARE' : 'ಕ್ಷೀರಧಾರೆ'} </h1>
            <div className='bg-primary-main w-[200px] h-[4px] mt-2'></div>

            <img loading="lazy" decoding="async" className='absolute top-[-50px] left-[38%] md:left-[52%] w-40 ' src={titleBG.src} alt="" />
        </div>


        
        
    </div>

    <div className='w-full h-auto'>
        
            <div className=' hidden lg:block relative w-full max-h-[500px] h-full z-[-1]'>
                <img loading="lazy" decoding="async" className='w-full h-full' src={flag.src} alt="" />
                <div className='absolute top-[60px] lg:top-0 xl:top-[60px] w-full h-full'>
                    <div className='w-full h-full flex justify-center items-center'>
                    <div className='max-w-xl lg:max-w-lg xl:max-w-xl w-full m-auto'>
                       <h1 className='text-primary-main text-2xl md:text-4xl text-center font-bold ' >  
                       {locale === 'en' ? "Ksheerdhare Project" : "ಕ್ಷೀರ ಧಾರೆ,"}
                       </h1>
                 <div className='mt-6'>
                  <p className=' text-sm md:text-lg lg:text-sm xl:text-2xl text-center '>
                  {locale === 'en' ? "An ambitious scheme of the Karnataka State Government, the “Ksheerdhare” scheme has been implemented for the following objectives:" : "ಕರ್ನಾಟಕ ರಾಜ್ಯ ಸರ್ಕಾರದ ದ ಮಹತ್ವಾಕಾಂಕ್ಷೆಯ ಯೋಜನೆ. 'ಕ್ಷೀರಧಾರೆ' ಯೋಜನೆಯನ್ನು ಈ ಕೆಳಗಿನ ಉದ್ದೇಶಗಳಿಗಾಗಿ ಜಾರಿಗೊಳಿಸಲಾಗಿದೆ."}
                  
                  </p>
                 </div>
                       </div>
                    </div>
                </div>
            </div>  

            <div className='w-full h-auto flex flex-wrap justify-center'>
               
                 <div className='block lg:hidden max-w-xl w-full m-3 md:m-10 rounded-3xl  shadow-2xl h-auto bg-slate-50 p-6 md:p-16'>
                       <div className='m-auto'>
                       <h1 className='text-primary-main text-2xl md:text-3xl font-bold' >   {locale === 'en' ? "Ksheerdhare Project" : "ಕ್ಷೀರ ಧಾರೆ,"} </h1>
                 <div className=' mt-10'>
                  <p className=''>
                  {locale === 'en' ? "An ambitious scheme of the Karnataka State Government, the “Ksheerdhare” scheme has been implemented for the following objectives:" : "ಕರ್ನಾಟಕ ರಾಜ್ಯ ಸರ್ಕಾರದ ದ ಮಹತ್ವಾಕಾಂಕ್ಷೆಯ ಯೋಜನೆ. 'ಕ್ಷೀರಧಾರೆ' ಯೋಜನೆಯನ್ನು ಈ ಕೆಳಗಿನ ಉದ್ದೇಶಗಳಿಗಾಗಿ ಜಾರಿಗೊಳಿಸಲಾಗಿದೆ."}                
                  </p>
                 </div>
                       </div>
                 </div>
                 <div className='max-w-xl w-full m-3 md:m-10 rounded-3xl  shadow-2xl h-auto bg-slate-50 p-6 md:p-16'>
                       <div className='m-auto'>
                       <h1 className='text-primary-main text-2xl md:text-3xl font-bold' > 
                       {locale === 'en' ? "Objectives of the Milk Producer Incentive Scheme:" : "ಹಾಲು ಉತ್ಪಾದಕರ ಪ್ರೋತ್ಸಾಹ ಯೋಜನೆಯ ಉದ್ದೇಶಗಳು:"}
                         </h1>
                 <div className=' mt-10'>
                  <ul className='list-disc text-left'>
                  <li>
                  {locale === 'en' ? "To make dairy farming profitable at village level to promote and expand dairy farming." : "	ಹೈನುಗಾರಿಕೆಯನ್ನು ಉತ್ತೇಜಿಸಲು ಮತ್ತು ವಿಸ್ತರಿಸಲು ಗ್ರಾಮ ಮಟ್ಟದಲ್ಲಿ ಹೈನುಗಾರಿಕೆಯನ್ನು ಲಾಭದಾಯಕವಾಗಿಸಲು."}
                  

                  </li>
                  <li>
                  {locale === 'en' ? "To motivate youth / unemployed people to take up dairy farming at village level." : "ಯುವಕರು/ನಿರುದ್ಯೋಗಿಗಳು ಗ್ರಾಮ ಮಟ್ಟದಲ್ಲಿ ಹೈನುಗಾರಿಕೆಯನ್ನು ಕೈಗೊಳ್ಳುವಂತೆ ಪ್ರೇರೇಪಿಸುವುದು.,"}
                  	

                  </li>
                  <li>
                  {locale === 'en' ? "For economic and social security of milk producers engaged in dairy farming." : "ಹೈನುಗಾರಿಕೆಯಲ್ಲಿ ತೊಡಗಿರುವ ಹಾಲು ಉತ್ಪಾದಕರ ರ‍್ಥಿಕ ಮತ್ತು ಸಾಮಾಜಿಕ ಭದ್ರತೆಗಾಗಿ."}
                  

                  </li>
                  <li>
                  {locale === 'en' ? "For increase in milk production for food security" : "ಆಹಾರ ಭದ್ರತೆಗಾಗಿ ಹಾಲಿನ ಉತ್ಪಾದನೆ ಹೆಚ್ಚಳಕ್ಕಾಗಿ."}
                  	

                  </li>
                 
                  </ul>
                 </div>
                       </div>
                 </div>


                 <div className='max-w-xl w-full m-3 md:m-10 rounded-3xl  shadow-2xl h-auto bg-slate-50 p-6 md:p-16'>
                       <div className='m-auto'>
                       <h1 className='text-primary-main text-2xl md:text-3xl font-bold' > 
                       {locale === 'en' ? "Scheme implementation details" : "ಯೋಜನೆಯ ಅನುಷ್ಠಾನದ ವಿವರಗಳು"}
                        </h1>
                 <div className='mt-10'>
                  <ul className='list-disc text-left'>
                  <li>
                  {locale === 'en' ? "The scheme was implemented on 08.09.2008." : "ಯೋಜನೆಯನ್ನು 08.09.2008 ರಂದು ಜಾರಿಗೊಳಿಸಲಾಯಿತು."}
                    

                  </li>
                  <li>
                  {locale === 'en' ? "Incentive came into effect on 09.09.2008 (Rs.2/- per litre)" : "ಪ್ರೋತ್ಸಾಹಧನವು 09.09.2008 ರಂದು ಜಾರಿಗೆ ಬಂದಿತು (ಪ್ರತಿ ಲೀಟರ್‌ಗೆ ರೂ.೨/-)"}
                	

                  </li>
                  <li>
                  {locale === 'en' ? "Incentive per litre increased from Rs.2/- to Rs.4/- for milk on 14.05.2013." : "	14.05.2013 ರಂದು ಹಾಲಿಗೆ ರೂ. 2/- ರಿಂದ ರೂ.4/- ಕ್ಕೆ ಪ್ರತಿ ಲೀಟರ್‌ಗೆ ಪ್ರೋತ್ಸಾಹಧನವನ್ನು ಹೆಚ್ಚಿಸಲಾಗಿದೆ."}
                  

                  </li>
                  <li>
                  {locale === 'en' ? "Incentive per litre increased from Rs.4/- to Rs.5/- per litre of milk and continued from 19.11.2016." : "	ಪ್ರತಿ ಲೀಟರ್ ಹಾಲಿಗೆ ರೂ.4/- ರಿಂದ ರೂ.5/- ಕ್ಕೆ ಪ್ರತಿ ಲೀಟರ್‌ಗೆ ಪ್ರೋತ್ಸಾಹಧನವನ್ನು ಹೆಚ್ಚಿಸಲಾಗಿದೆ ಮತ್ತು 19.11.2016 ರಿಂದ ಮುಂದುವರೆಯಿತು."}
                  

                  </li>
                  </ul>
                 </div>
                       </div>
                 </div>

              
                
            </div>
               
          </div>




          <div className="w-full flex flex-col max-w-7xl m-auto mb-10 rounded-md shadow-md  bg-slate-50     overflow-auto  items-center justify-center p-10 ">


          {dhare && dhare.attributes && dhare.attributes.content && (
                    <BlocksRenderer
                      content={ dhare.attributes.content}
                      blocks={{
                        // You can use the default components to set class names...
                   
                        code: ({ children }) => {
                          const columns =
                            children?.[0]?.props?.text.split(',')[0].trim() === 'columns'
                              ? children?.[0]?.props?.text.split(',').slice(1)
                              : [];

                          return (
                            <table className="table-fixed   border-spacing-y-2	 border-collapse border-black border   w-[80%]  md:w-[70%]  lg:w-[50%] ">
                              <thead className=" text-center bg-orange-400 text-primary-main">
                                {columns?.map((item, id) => {
                                  return (
                                    <th className="p-2 w-14   border-r border-black font-bold " key={id}>
                                      {item}
                                    </th>
                                  );
                                })}
                              </thead>
                              <tbody className="text-center  text-md ">
                                <tr className="w-full ">
                                  {children?.[0]?.props?.text.split(',')[0].trim() !== 'columns' &&
                                    children?.[0]?.props?.text?.split(',')?.map((item, id) => {
                                      return (
                                        <td className=" p-2 w-14 text-md font-content border-r border-black " key={id}>
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

                 
                      }}
                    />
                  )}


{/* 
      <table className="table-fixed  border-spacing-y-2	 border-collapse border-black border      min-w-full">
        <thead className=" text-left ">
          <tr className="text-md">
            <th className="p-2">Year</th>
            <th className="p-2 ">Rs. in Crores	</th>

             
          </tr>
        </thead>

        <tbody className="text-left  text-md">

              <tr className='border-t-2 border-black  '>
                <td className='p-2 text-md uppercase text-start border border-r border-black font-content'>2008-09</td>
                <td className='p-2 text-md font-content border-r border-black'>110.00</td>


                  

              </tr>
              <tr className='border-t-2 border-black  '>
                <td className='p-2 text-md uppercase text-start border border-r border-black font-content'>2009-10</td>
                <td className='p-2 text-md font-content border-r border-black'>224.99</td>


                  

              </tr>
              <tr className='border-t-2 border-black  '>
                <td className='p-2 text-md uppercase text-start border border-r border-black font-content'>2010-11</td>
                <td className='p-2 text-md font-content border-r border-black'>302.65</td>


                  

              </tr>
              <tr className='border-t-2 border-black  '>
                <td className='p-2 text-md uppercase text-center border border-r border-black font-content font-bold'>Total</td>
                <td className='p-2 text-md  font-content border-r border-black font-bold'>14126.70</td>


                  

              </tr>
          
        </tbody>
      </table> */}
    </div>


  
    <Footer/>
    </div>
  
  )
}

export default KsheeraDhare
