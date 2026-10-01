"use client"
import React, { useEffect, useState } from 'react'
import titleBG from '@/images/portfolio/title-bg.png';
import Follow from '@/components/Follow.js';
import Footer from '@/components/Footer';
import flag from '@/images/portfolio/flag.jpg';
import award1 from '@/images/portfolio/Award1.png';
import award2 from '@/images/portfolio/Award2.png';
import award3 from '@/images/portfolio/Award3.png';
import award4 from '@/images/portfolio/Award4.png';
import useLocale from '@/hooks/useLocale';
import Link from 'next/link';
import Marquee from './Marquee';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import useApi from '@/hooks/useApi';





const Awards = () => {
      const locale = useLocale().locale;
      const axios = useApi();

      const [award, setAward] = useState([]);
      useEffect(() => {
        (async () => {
          const { data } = await axios.get('/api/awards');
        
          setAward(data.data)
           
        
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
             {locale === 'en' ?   'AWARDS' : 'ಪ್ರಶಸ್ತಿಗಳು'}
            </Link>
          </div>
    <div className='w-full h-auto mt-20'>
    <div className=' relative w-full h-full flex flex-col items-center justify-center mt-20'>

        <h1 className='text-primary-main text-2xl md:text-5xl  ' > {locale === 'en' ?   'AWARDS' : 'ಪ್ರಶಸ್ತಿಗಳು'} </h1>
        <div className='bg-primary-main w-[100px] h-[4px] mt-2'></div>

        <img loading="lazy" decoding="async" className='absolute top-[-50px] left-[47%] w-40 ' src={titleBG.src} alt="" />
    </div>


    
    
</div>

<div className='w-full h-auto'>
    



        
        <div className=' hidden lg:block relative w-full max-h-[500px] h-full z-[-1]'>
                <img loading="lazy" decoding="async" className='w-full h-full' src={flag.src} alt="" />
                <div className='absolute top-[60px] lg:top-0 xl:top-[60px] w-full h-full'>
                    <div className='w-full h-full flex justify-center items-center'>
                    <div className='max-w-xl lg:max-w-lg xl:max-w-xl w-full m-auto'>
                       <h1 className='text-primary-main text-2xl md:text-3xl ' > {locale === 'en' ?   '2009 : Nandini  Brand of KMF Won The Most Valuable Brand in Karnataka Award  in the Sunday Indian & IIPM regional excellence awards.' : 'ಕೆ.ಎಂ.ಎಫ್ ನ ನಂದಿನಿ ಬ್ರ್ಯಾಂಡ್ 2009 ರಲ್ಲಿ ಸಂಡೇ ಇಂಡಿಯನ್ ಮತ್ತು IIPM ಪ್ರಾದೇಶಿಕ ಶ್ರೇಷ್ಠ ಪ್ರಶಸ್ತಿಯಲ್ಲಿ ಕರ್ನಾಟಕದ ಅತ್ಯಂತ ಮೌಲ್ಯಯುತ ಬ್ರಾಂಡ್ ಎಂದು ಗುರುತಿಸಲ್ಪಟ್ಟಿದೆ.'} </h1>
                
                       </div>
                    </div>
                </div>
            </div>  

            <div className='w-full h-auto flex flex-wrap justify-center'>
               
                 <div className='block lg:hidden max-w-xl w-full m-3 md:m-10 rounded-3xl  shadow-2xl h-auto bg-slate-50 p-6 md:p-16'>
                       <div className='m-auto'>
                       <h1 className='text-primary-main text-2xl md:text-3xl ' >  {locale === 'en' ?   '2009 : Nandini  Brand of KMF Won The Most Valuable Brand in Karnataka Award  in the Sunday Indian & IIPM regional excellence awards.' : 'ಕೆ.ಎಂ.ಎಫ್ ನ ನಂದಿನಿ ಬ್ರ್ಯಾಂಡ್ 2009 ರಲ್ಲಿ ಸಂಡೇ ಇಂಡಿಯನ್ ಮತ್ತು IIPM ಪ್ರಾದೇಶಿಕ ಶ್ರೇಷ್ಠ ಪ್ರಶಸ್ತಿಯಲ್ಲಿ ಕರ್ನಾಟಕದ ಅತ್ಯಂತ ಮೌಲ್ಯಯುತ ಬ್ರಾಂಡ್ ಎಂದು ಗುರುತಿಸಲ್ಪಟ್ಟಿದೆ.'}   </h1>

                       </div>
                 </div>
                 <div className='max-w-xl w-full m-3 md:m-10 rounded-3xl  shadow-2xl h-auto bg-slate-50 p-6 md:p-16'>
                       <div className='m-auto'>
                       <h1 className='text-primary-main text-2xl  ' > {locale === 'en' ?   '2009 : Nandini  Brand of KMF Won The Most Valuable Brand in Karnataka Award  in the Sunday Indian & IIPM regional excellence awards.' : 'ಕೆ.ಎಂ.ಎಫ್ ನ ನಂದಿನಿ ಬ್ರ್ಯಾಂಡ್ 2009 ರಲ್ಲಿ ಸಂಡೇ ಇಂಡಿಯನ್ ಮತ್ತು IIPM ಪ್ರಾದೇಶಿಕ ಶ್ರೇಷ್ಠ ಪ್ರಶಸ್ತಿಯಲ್ಲಿ ಕರ್ನಾಟಕದ ಅತ್ಯಂತ ಮೌಲ್ಯಯುತ ಬ್ರಾಂಡ್ ಎಂದು ಗುರುತಿಸಲ್ಪಟ್ಟಿದೆ.'}  </h1>
                 
                       </div>
                 </div>


                 <div className='max-w-xl w-full m-3 md:m-10 rounded-3xl  shadow-2xl h-auto bg-slate-50 p-6 md:p-16'>
                       <div className='m-auto'>
                       <h1 className='text-primary-main text-2xl  ' >  {locale === 'en' ?   '2010 : Indias Largest selling English monthly Magazine Readers Digest carried out a Trusted Brand Survey  during 2010 and has given confirmed  Gold Award in the Milk Category.  Survey comprised over 1.3 million readers across the country.' : 'ಭಾರತದಾದ್ಯಂತ ವಿಶ್ವಾಸನೀಯ ಹಾಗೂ ಜನಪ್ರಿಯ ಇಂಗ್ಲೀಷ್ ನಿಯತಕಾಲಿಕ ಪತ್ರಿಕೆಯಾದ ರೀಡರ್ಸ್ ಡೈಜೆಸ್ಟ್ ರವರು 2010 ರಲ್ಲಿ ವಿಶ್ವಾಸಾರ್ಹ ಬ್ರಾಂಡ್ ಸಮೀಕ್ಷೆಯನ್ನು ನಡೆಸಿ ಕೆ.ಎಂ.ಎಫ್ ನ ನಂದಿನಿಗೆ ಹಾಲು ವಿಭಾಗದಲ್ಲಿ ಚಿನ್ನದ ಪ್ರಶಸ್ತಿಯನ್ನು ನೀಡಿ ಗೌರವಿಸಿದೆ. ಸಮೀಕ್ಷೆಯು ದೇಶಾದ್ಯಂತ 1.3 ಮಿಲಿಯನ್ ಓದುಗರ ಅಭಿಪ್ರಾಯವನ್ನು ಒಳಗೊಂಡಿತ್ತು.'}   </h1>
                
                       </div>
                 </div>

                 <div className='max-w-xl w-full m-3 md:m-10 rounded-3xl  shadow-2xl h-auto bg-slate-50 p-6 md:p-16'>
                       <div className='m-auto'>
                       <h1 className='text-primary-main text-2xl  ' >{locale === 'en' ?   '“NANDINI” AWARDED AS ONE OF THE TOP BRAND IN THE BANGALORE BRAND SUMMIT-2014 At the Bangalore Brand Summit 2014 award ceremony KMF was presented with an  Indias premier marketing award recognizing excellence among the Bangalore Hot 50 Brands. ' : '2014 ರಲ್ಲಿ ಬೆಂಗಳೂರಿನಲ್ಲಿ ಜರುಗಿದ “ಬೆಂಗಳೂರು ಬ್ರಾಂಡ್ ಶೃಂಗಸಭೆ-2014” ರ ಪ್ರಶಸ್ತಿ ಪ್ರಧಾನ ಸಮಾರಂಭದಲ್ಲಿ ಕೆ.ಎಂ.ಎಫ್ ನ ನಂದಿನಿಯನ್ನು ಟಾಪ್ ಬ್ರಾಂಡ್‌ಗಳಲ್ಲೊಂದೆಂದು ಗುರುತಿಸುವುದರ ಜೊತೆಗೆ ಭಾರತದ ಪ್ರೀಮಿಯರ ಮಾರ್ಕೆಟಿಂಗ್ ಪ್ರಶಸ್ತಿಯನ್ನು ನೀಡಲಾಯಿತು.'} </h1>
                
                       </div>
                 </div>

                 <div className='max-w-xl w-full m-3 md:m-10 rounded-3xl  shadow-2xl h-auto bg-slate-50 p-6 md:p-16'>
                       <div className='m-auto'>
                       <h1 className='text-primary-main text-2xl  ' >  {locale === 'en' ? '08-Jun-2015 Rotary Club of Bangalore president Ram Kumarr Seshu presented the Corporate Citizen Award, 2014-15, to KMF Managing Director Sri.S.N.Jayaram IAS, at the Rotary Club of Bangalore on Monday-08.06.2015.' : '08.06.2015 ರಂದು ಬೆಂಗಳೂರಿನ ರೋಟರಿ ಕ್ಲಬ್‌ನಲ್ಲಿ ರೋಟರಿ ಕ್ಲಬ್ ಆಫ್ ಬೆಂಗಳೂರು ಅಧ್ಯಕ್ಷರಾದ ರಾಮ್ ಕುಮಾರ್ ಶೇಷು ರವರು 2014-15ನೇ ಸಾಲಿನ ಕಾರ್ಪೊರೇಟ್ ಸಿಟಿಜನ್ ಪ್ರಶಸ್ತಿಯನ್ನು ಕೆ.ಎಂ.ಎಫ್ ವ್ಯವಸ್ಥಾಪಕ ನಿರ್ದೇಶಕ ಶ್ರೀ.ಎಸ್.ಎನ್.ಜಯರಾಮ್ ಐಎಎಸ್ ಅವರಿಗೆ ಪ್ರದಾನ ಮಾಡಿದರು.'}  </h1>
                
                       </div>
                 </div>

              
                
            </div>


<div className='w-full h-auto mt-10 '>
<h1 className="p-5  text-primary-main text-4xl uppercase text-center">{locale === 'en' ?   'AWARDS' : 'ಪ್ರಶಸ್ತಿಗಳು'}</h1>
<div className="marquee-notification h-full flex lg:gap-5 xl:gap-44 justify-evenly space-x-3 mt-10">



          {/* {award.map((item,idx)=>{
                
                return( */}
              {/* <div key={idx}
                  className=" w-96 md:w-72     h-96  rounded-md overflow-hidden   m-auto group   transition-all duration-100  "
                  >
                  <div className="p-2 w-full h-[70%]">
                  <PhotoProvider >
                          
                          <PhotoView src={item?.attributes?.image?.data?.[0]?.attributes?.url} width="400px" height="400px"  >
                         
                          <img loading="lazy" decoding="async"
                        src={item?.attributes?.image?.data?.[0]?.attributes?.url}
                        alt="featured-img"
                        className=" w-full h-full rounded-full transition-all duration-100 group-hover:scale-[1.01] hover:rounded-none "
                        />   
                                               </PhotoView>
                      
                    
                    </PhotoProvider>
                       
                  </div>

                  <div className="p-2  w-full   rounded-full bg-zinc-300 group-hover:bg-orange-500 ">
                        <h1 className="text-sm text-center group-hover:text-white  "> {item?.attributes?.title}
</h1>
                  </div>

                  
                  </div> */}



             <div 
                  className=" w-96 md:w-72     h-96  rounded-md overflow-hidden   m-auto group   transition-all duration-100  "
                  >
                  <div className="p-2 w-full h-[70%]">
                  <PhotoProvider >
                          
                          <PhotoView src={award1.src} width="400px" height="400px"  >
                         
                          <img loading="lazy" decoding="async"
                        src={award1.src}
                        alt="featured-img"
                        className=" w-full h-full rounded-full transition-all duration-100 group-hover:scale-[1.01] hover:rounded-none "
                        />   
                                               </PhotoView>
                      
                    
                    </PhotoProvider>
                       
                  </div>

                  <div className="p-2  w-full   rounded-full bg-zinc-300 group-hover:bg-orange-500 ">
                        <h1 className="text-sm text-center group-hover:text-white  "> DAIRY INNOVATION AWARD 2022
</h1>
                  </div>

                  
                  </div> 



             <div 
                  className=" w-96 md:w-72     h-96  rounded-md overflow-hidden   m-auto group   transition-all duration-100  "
                  >
                  <div className="p-2 w-full h-[70%]">
                  <PhotoProvider >
                          
                          <PhotoView src={award2.src} width="400px" height="400px"  >
                         
                          <img loading="lazy" decoding="async"
                        src={award2.src}
                        alt="featured-img"
                        className=" w-full h-full rounded-full transition-all duration-100 group-hover:scale-[1.01] hover:rounded-none "
                        />   
                                               </PhotoView>
                      
                    
                    </PhotoProvider>
                       
                  </div>

                  <div className="p-2  w-full   rounded-full bg-zinc-300 group-hover:bg-orange-500 ">
                        <h1 className="text-sm text-center group-hover:text-white  "> BUSINESS EXCELLENCE AWARD
</h1>
                  </div>

                  
                  </div> 



             <div 
                  className=" w-96 md:w-72     h-96  rounded-md overflow-hidden   m-auto group   transition-all duration-100  "
                  >
                  <div className="p-2 w-full h-[70%]">
                  <PhotoProvider >
                          
                          <PhotoView src={award3.src} width="400px" height="400px"  >
                         
                          <img loading="lazy" decoding="async"
                        src={award3.src}
                        alt="featured-img"
                        className=" w-full h-full rounded-full transition-all duration-100 group-hover:scale-[1.01] hover:rounded-none "
                        />   
                                               </PhotoView>
                      
                    
                    </PhotoProvider>
                       
                  </div>

                  <div className="p-2  w-full   rounded-full bg-zinc-300 group-hover:bg-orange-500 ">
                        <h1 className="text-sm text-center group-hover:text-white  "> NCDFI AWARD 2023
</h1>
                  </div>

                  
                  </div> 



             <div 
                  className=" w-96 md:w-72     h-96  rounded-md overflow-hidden   m-auto group   transition-all duration-100  "
                  >
                  <div className="p-2 w-full h-[70%]">
                  <PhotoProvider >
                          
                          <PhotoView src={award4.src} width="400px" height="400px"  >
                         
                          <img loading="lazy" decoding="async"
                        src={award4.src}
                        alt="featured-img"
                        className=" w-full h-full rounded-full transition-all duration-100 group-hover:scale-[1.01] hover:rounded-none "
                        />   
                                               </PhotoView>
                      
                    
                    </PhotoProvider>
                       
                  </div>

                  <div className="p-2  w-full   rounded-full bg-zinc-300 group-hover:bg-orange-500 ">
                        <h1 className="text-sm text-center group-hover:text-white  "> BRAND
FOOTPRINT AWARD 2022
</h1>
                  </div>

                  
                  </div> 
                {/* )
              })} */}

      
              </div>


</div>
            
           
      </div>




<Footer/>
</div>
  
  )
}

export default Awards
