"use client"
import React from 'react'
import banner from '@/images/portfolio/Childrens-min.png';
import titleBG from '@/images/portfolio/title-bg.png';
import Link from 'next/link';
import useLocale from '@/hooks/useLocale';
import Follow from '@/components/Follow.js';
import Footer from '@/components/Footer';
import home from '@/images/portfolio/hom.jpg';
import home2 from '@/images/portfolio/history-of-milk2.png';




const HistoryOfMilk = () => {
    const locale = useLocale().locale;

  return (
    <>
    <div className='w-full h-full'>
      <section className='w-full h-full'>
      <div className="flex w-full    justify-center pt-5 space-x-2 items-center relative before:absolute before:-bottom-3 before:w-20   before:h-0.5 before:bg-primary-main">
            <Link className="  text-sm font-bold  " href={`/${locale}/portfolio/#history-milk` || ''}>
            {locale==='en'?'KMF ACHIEVEMENTS':'ಕಹಾಮ ಸಾಧನೆಗಳು'}
            </Link>

           
            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold text-primary-main" href={''}>
            {locale==='en'?'HISTORY OF MILK':'ಹಾಲಿನ ಇತಿಹಾಸ'} 
            </Link>
          </div>
      <div className=' relative w-full h-auto flex flex-col items-center justify-center mt-20'>

        <h1 className='text-primary-main   flex justify-center items-center text-2xl md:text-4xl  ' >  {locale==='en'?'HISTORY OF MILK':'ಹಾಲಿನ ಇತಿಹಾಸ'}  </h1>
        <div className='bg-primary-main w-[200px] h-[4px] mt-2'></div>
        <img loading="lazy" decoding="async" className='absolute top-[-50px] left-[40%] md:left-[49%] w-40 ' src={titleBG.src} alt="" />
</div>
      </section>
         <section className={`w-full h-auto md:h-[90vh]    mt-10`}>

              
           <img loading="lazy" decoding="async" src={home2.src} alt="" />

        </section>


        <section className="w-full h-auto  md:mt-28 mb-16">
        <div className=" w-full flex flex-col items-center justify-center lg:mt-20 p-3">
        
          <div className="mt-0 md:mt-4  mr-auto ml-auto">
            {/* <p className=" text-primary-main text-3xl text-center md:text-6xl font-bold">
            HISTORY OF MILK
            </p> */}

            <p className="text-lg md:text-xl   mt-6 md:mt-16 max-w-7xl w-full  ">
            {locale === 'en' ? "The history of milk is a fascinating journey that intertwines with the evolution of human civilization and the domestication of animals. As early humans transitioned from a nomadic lifestyle to settled agricultural communities, the realization that certain animals could provide a steady supply of milk marked a pivotal moment. The domestication of animals like cows, goats, and sheep was a transformative development." : "ಹಾಲಿನ ಇತಿಹಾಸವು ಮಾನವ ನಾಗರಿಕತೆಯ ವಿಕಾಸ ಮತ್ತು ಪ್ರಾಣಿಗಳ ಪಳಗಿಸುವಿಕೆಯೊಂದಿಗೆ ಹೆಣೆದುಕೊಂಡಿರುವ ಆಕರ್ಷಕ ಪ್ರಯಾಣವಾಗಿದೆ. ಆರಂಭಿಕ ಮಾನವರು ಅಲೆಮಾರಿ ಜೀವನಶೈಲಿಯಿಂದ ನೆಲೆಸಿದ ಕೃಷಿ ಸಮುದಾಯಗಳಿಗೆ ಪರಿವರ್ತನೆಯಾದಾಗ, ಕೆಲವು ಪ್ರಾಣಿಗಳು ಹಾಲಿನ ಸ್ಥಿರ ಪೂರೈಕೆಯನ್ನು ಒದಗಿಸಬಲ್ಲವು ಎಂಬ ಅರಿವು ಒಂದು ಪ್ರಮುಖ ಕ್ಷಣವಾಗಿದೆ. ಹಸುಗಳು, ಮೇಕೆಗಳು ಮತ್ತು ಕುರಿಗಳಂತಹ ಪ್ರಾಣಿಗಳ ಪಳಗಿಸುವಿಕೆಯು ಒಂದು ಪರಿವರ್ತನೆಯ ಬೆಳವಣಿಗೆಯಾಗಿದೆ."}
              
            </p>


            <p className="text-lg md:text-xl mt-3 max-w-7xl w-full">
            {locale === 'en' ? "Humans first learned to consume the milk of other mammals regularly following the domestication of animals during the Neolithic Revolution or the development of agriculture. This development occurred independently in several global locations from as early as 9000–7000 BC in Mesopotamia." : "ನವಶಿಲಾಯುಗದ ಕ್ರಾಂತಿ ಅಥವಾ ಕೃಷಿಯ ಬೆಳವಣಿಗೆಯ ಸಮಯದಲ್ಲಿ ಪ್ರಾಣಿಗಳ ಪಳಗಿದ ನಂತರ ಮಾನವರು ಮೊದಲು ಇತರ ಸಸ್ತನಿಗಳ ಹಾಲನ್ನು ನಿಯಮಿತವಾಗಿ ಸೇವಿಸಲು ಕಲಿತರು. ಈ ಬೆಳವಣಿಗೆಯು ಮೆಸೊಪಟ್ಯಾಮಿಯಾದಲ್ಲಿ 9000-7000 BCಯಷ್ಟು ಹಿಂದೆಯೇ ಹಲವಾರು ಜಾಗತಿಕ ಸ್ಥಳಗಳಲ್ಲಿ ಸ್ವತಂತ್ರವಾಗಿ ಸಂಭವಿಸಿತು."}
              
            </p>

            <p className="text-lg md:text-xl mt-3 max-w-7xl w-full">
            {locale === 'en' ? "The history of dairy in the Indian subcontinent goes back roughly 8,000 years to the first domestication of zebu cattle, which is thought to have originated in India. By the beginning of the Indus Valley civilisation (c. 3300 – c. 1300 BCE), zebu cattle had been fully domesticated and used for their milk. Sheep and Goats were also domesticated. In the Vedic period (c. 1500 – c. 500 BCE), milk was one of the primary elements of the typical diet. Milk and milk products including clarified butter were consumed. Yogurt (curd) was another form in which milk was consumed during the period. The Vedas describe curdling of milk by mixing a portion of soured milk into it. They also mention curdling of milk by the addition of plant substances such as the bark of the palash tree and the fruit of jujube, which may have contained rennet-like enzymes. These are some of the earliest documented references to enzymatic cheese-making." : "ಭಾರತೀಯ ಉಪಖಂಡದಲ್ಲಿ ಹೈನುಗಾರಿಕೆಯ ಇತಿಹಾಸವು ಸರಿಸುಮಾರು 8,000 ವರ್ಷಗಳ ಹಿಂದೆ ಜೀಬು ಜಾನುವಾರುಗಳ ಮೊದಲ ಪಳಗಿಸುವಿಕೆಗೆ ಹೋಗುತ್ತದೆ, ಇದು ಭಾರತದಲ್ಲಿ ಹುಟ್ಟಿಕೊಂಡಿದೆ ಎಂದು ಭಾವಿಸಲಾಗಿದೆ. ಸಿಂಧೂ ಕಣಿವೆಯ ನಾಗರೀಕತೆಯ ಆರಂಭದ ವೇಳೆಗೆ (c. 3300 – c. 1300 BCE), ಝೆಬು ಜಾನುವಾರುಗಳನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ಸಾಕಲಾಯಿತು ಮತ್ತು ಅವುಗಳ ಹಾಲಿಗಾಗಿ ಬಳಸಲಾಗುತ್ತಿತ್ತು. ಕುರಿ ಮತ್ತು ಮೇಕೆಗಳನ್ನು ಸಹ ಸಾಕಲಾಯಿತು. ವೇದಕಾಲದಲ್ಲಿ (c. 1500 – c. 500 BCE), ಹಾಲು ವಿಶಿಷ್ಟ ಆಹಾರದ ಪ್ರಾಥಮಿಕ ಅಂಶಗಳಲ್ಲಿ ಒಂದಾಗಿತ್ತು. ಸ್ಪಷ್ಟೀಕರಿಸಿದ ಬೆಣ್ಣೆ ಸೇರಿದಂತೆ ಹಾಲು ಮತ್ತು ಹಾಲಿನ ಉತ್ಪನ್ನಗಳನ್ನು ಸೇವಿಸಲಾಗಿದೆ. ಮೊಸರು (ಮೊಸರು) ಈ ಅವಧಿಯಲ್ಲಿ ಹಾಲನ್ನು ಸೇವಿಸುವ ಮತ್ತೊಂದು ರೂಪವಾಗಿದೆ. ವೇದಗಳಲ್ಲಿ ಹುಳಿಯಾದ ಹಾಲಿನ ಒಂದು ಭಾಗವನ್ನು ಬೆರೆಸಿ ಹಾಲು ಮೊಸರು ಮಾಡುವುದನ್ನು ವಿವರಿಸುತ್ತದೆ. ಪಾಲಾಶ್ ಮರದ ತೊಗಟೆ ಮತ್ತು ಹಲಸಿನ ಹಣ್ಣಿನಂತಹ ಸಸ್ಯ ಪದಾರ್ಥಗಳನ್ನು ಸೇರಿಸುವ ಮೂಲಕ ಹಾಲನ್ನು ಮೊಸರು ಮಾಡುವುದನ್ನು ಅವರು ಉಲ್ಲೇಖಿಸುತ್ತಾರೆ, ಇದು ರೆನೆಟ್ ತರಹದ ಕಿಣ್ವಗಳನ್ನು ಹೊಂದಿರಬಹುದು. ಇವುಗಳು ಕಿಣ್ವಕ ಚೀಸ್ ತಯಾರಿಕೆಯ ಆರಂಭಿಕ ದಾಖಲಿತ ಉಲ್ಲೇಖಗಳಾಗಿವೆ."}
              
            </p>

            <p className="text-lg md:text-xl mt-3 max-w-7xl w-full">
            {locale === 'en' ? "According to the Sutra literature, during the period c. 800 – c. 300 BCE, boiled rice with milk or curd continued to be a common food item. Cows used to be milked twice a day. The ones which were pregnant or undergoing their estrous cycle or nursing a calf of another cow were not milked. The preparation of payasa is also noted. Madhuparka – a mixture of honey with curds or ghee was used for welcoming guests. The preparation of a sweet with clarified butter as one of the ingredients is also mentioned." : "ಸೂತ್ರ ಸಾಹಿತ್ಯದ ಪ್ರಕಾರ, ಅವಧಿಯಲ್ಲಿ ಸಿ. 800 - ಸಿ. 300 BCE, ಹಾಲು ಅಥವಾ ಮೊಸರಿನೊಂದಿಗೆ ಬೇಯಿಸಿದ ಅನ್ನವು ಸಾಮಾನ್ಯ ಆಹಾರ ಪದಾರ್ಥವಾಗಿ ಮುಂದುವರೆಯಿತು. ಹಸುಗಳಿಗೆ ದಿನಕ್ಕೆರಡು ಬಾರಿ ಹಾಲು ಕೊಡುತ್ತಿದ್ದರು. ಗರ್ಭಿಣಿಯಾಗಿದ್ದವರು ಅಥವಾ ಅವರ ಈಸ್ಟ್ರಸ್ ಚಕ್ರಕ್ಕೆ ಒಳಗಾಗುವವರು ಅಥವಾ ಇನ್ನೊಂದು ಹಸುವಿನ ಕರುವಿಗೆ ಹಾಲುಣಿಸುತ್ತಿರಲಿಲ್ಲ. ಪಾಯಸ ತಯಾರಿಕೆಯನ್ನೂ ಗಮನಿಸಲಾಗಿದೆ. ಮಧುಪರ್ಕ - ಅತಿಥಿಗಳನ್ನು ಸ್ವಾಗತಿಸಲು ಮೊಸರು ಅಥವಾ ತುಪ್ಪದೊಂದಿಗೆ ಜೇನುತುಪ್ಪದ ಮಿಶ್ರಣವನ್ನು ಬಳಸಲಾಗುತ್ತಿತ್ತು. ಪದಾರ್ಥಗಳಲ್ಲಿ ಒಂದಾದ ಸ್ಪಷ್ಟೀಕರಿಸಿದ ಬೆಣ್ಣೆಯೊಂದಿಗೆ ಸಿಹಿ ತಯಾರಿಕೆಯನ್ನು ಸಹ ಉಲ್ಲೇಖಿಸಲಾಗಿದೆ."}
              
            </p>
          </div>
        </div>
      </section>
       
        
    
       
        
    </div>
    <Footer/>
    </>
  )
}

export default HistoryOfMilk
