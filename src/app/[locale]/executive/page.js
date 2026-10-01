'use client'
import React,{useState,useEffect} from 'react'
import directorImg from '@/images/directors/directorsbg.png';

import Follow from '@/components/Follow.js';
import Footer from '@/components/Footer';
import useApi from '@/hooks/useApi';
import { useParams } from 'next/navigation';
import Zoom from 'react-reveal/Zoom';
import { Fade } from 'react-reveal';
import { ParallaxBanner } from 'react-scroll-parallax';
 import { useMyContext } from '@/context/headerContext';

const Executive = () => {
  const [md,setMd]=useState([])
  const [unionCheifs,setUnionCheif]=useState([])

  const [unitCheifs,setUnitCheif]=useState([])
  const [executives,setExecutives]=useState([])
 
  const { isScroll, setIsScroll } = useMyContext();


  const axios =useApi()
  const locale=useParams().locale
  
  useEffect(()=>{
    (
      async()=>{
   

       
        const {data:executive}=await axios.get('/api/executives?sort[0]=order:asc')
        const {data:unitchief}=await axios.get('/api/unitcheifs?sort[0]=order:asc')
        const {data:unioncheif}=await axios.get('/api/unioncheifs?sort[0]=createdAt:asc')
         const {data:chairman}= await axios.get('/api/md')
        
        let orderExecutive = new Array(executive?.data?.length).fill(null);
        let orderUnion = new Array(unioncheif?.data?.length).fill(null);

        let orderUnits = new Array(unitchief?.data?.length).fill(null);

        


        let indexE = 0;
        let indexUT=0;
        let indexUN=0;

        // Executives
        executive?.data.forEach(item => {
          if (item?.attributes?.order != null) {
            orderExecutive[item?.attributes?.order - 1] = item;
          }
        });

        executive?.data.forEach(item => {
          if (item.attributes.order === null) {
            while (orderExecutive[indexE] !== null) {
              indexE++;
            }
            if (indexE < orderExecutive.length) {
              orderExecutive[indexE] = item;
            }
          }
        });


    
 

        // unitCheifs

        unitchief?.data.forEach(item => {
          if (item?.attributes?.order != null) {
            orderUnits[item?.attributes?.order - 1] = item;
          }
        });

        unitchief?.data.forEach(item => {
          if (item.attributes.order === null) {
            while (orderUnits[indexUT] !== null) {
              indexUT++;
            }
            if (indexUT < orderExecutive.length) {
              orderUnits[indexUT] = item;
            }
          }
        });
        
        

   
       
       
        setUnionCheif(unioncheif?.data)
        setUnitCheif(unitchief?.data)
        setExecutives(orderExecutive)
         setMd(chairman?.data)
     
    
      }
    )()
  },[])

   
  return (
    <div className={`w-full h-full absolute   z-[-1]  ${isScroll ? ' md:top-48' : ''} `}>

 
    <section
      className={`w-full h-full  md:h-[500px] pt-28 relative  grid place-items-center company-bg`}>
       
      <img loading="lazy" decoding="async" src="/images/executive.jpg" className="w-full h-full object-cover absolute top-0 z-[-1]" />
    
    </section>

    <section className="w-full   pt-10  ">
    <div className="  relative w-full  flex justify-center items-center ">
           
              <h1 className=" text-primary-main relative z-10 font-heading text-4xl font-extrabold uppercase">
              {locale==='kn'?' ಕಹಾಮದ ಕಾರ್ಯನಿರ್ವಾಹಕ ಅಧಿಕಾರಿಗಳು':'KMF Executives'}
              </h1>
            </div>
    
 { md ? 
  <div className='  h-full flex justify-center items-center   '>
      <Fade bottom>
    <div className='w-full max-w-7xl mt-auto min-h-44  md:h-2/4   justify-center items-center  rounded-tl-3xl rounded-br-3xl flex flex-col   p-3'>
            <div className='md:w-1/2 flex   justify-center  items-center mt-6 lg:pt-3 lg:pb-3 transition-all duration-300 md:mt-0 rounded-full hover:scale-[1.1]  '  >
              <Zoom>
              <img loading="lazy" decoding="async" className='w-[200px] h-[200px]   object-cover  sm:w-[350px] sm:h-[390px] transition-all duration-300   ' src={md?.attributes?.image?.data?.attributes?.url} alt="" />
              </Zoom>
            </div>
            <div className=' md:w-2/3 flex flex-col justify-center items-center mt-3 md:p-3 md:items-center lg:mt-0 '>
              <div>
                <p className='text-3xl md:text-4xl font-lato font-bold text-center md:text-center text-black'>{md?.attributes?.name}</p>
                {/* <p className=' text-lg flex justify-center items-center  w-full  font-lato text-center md:text-start text-black '>{md?.attributes?.description}</p> */}
                                <p className=' text-lg flex justify-center items-center  w-full  font-lato text-center  text-black '>Managing Director, <br/>

Karnataka Co-operative Milk Producers’ Federation Ltd. (KMF)</p>

              </div>
           
            </div>
        </div>
        </Fade>
    
      </div>
 :
 ""}
   

    <div>


    <div className='w-full max-w-[1400px] m-auto p-5   '>
      <div className=''>
        <Fade top>
        <h1 className='text-3xl font-bold font-heading'>
              {locale === "en" ?"Executives":"ಕಾರ್ಯನಿರ್ವಾಹಕರು"}
        </h1>
        </Fade>
      </div>

      <div className='w-full overflow-auto'>
      <table className="      border-spacing-y-2	max-w-7xl  border-collapse w-full border overflow-auto ">
        <thead className=" bg-primary-main text-white min-w-full ">
          <Fade top>
          <tr className="  text-[5.5px]  md:text-lg   ">
            <th className="p-2 text-start font-heading ">
              {locale === "en" ?"Name":"ಹೆಸರು"}
              </th>
          
            <th className="p-2 text-start font-heading">  {locale === "en" ?"Designation":"ಪದನಾಮ"}	</th>
            {/* <th className="p-2 text-start font-heading "> {locale === "en" ?"Department":"ವಿಭಾಗ"} </th> */}
            {/* <th className="p-2 text-start  font-heading"> {locale === "en" ?"Place of working":"ಕಾರ್ಯ ನಿರ್ವಹಿಸುತ್ತಿರುವ ಸ್ಥಳ"}   </th> */}
            <th className="p-2 text-start  font-heading"> {locale === "en" ?"Mobile No":"ದೂರವಾಣಿ ಸಂಖ್ಯೆ"}</th>

            <th className="p-2 text-start  font-heading">  {locale === "en" ?"Email Id":"ಇಮೇಲ್ ಐಡಿ"} </th>

 
          </tr>
          </Fade>
        </thead>

        <tbody className="text-start text-xs     bg-secondary-gradient">
        {executives?.map((item,id)=>{
        
         

 return(
    
    <tr className='border-t  text-[5.5px] md:text-lg' key={id}>
      <Fade bottom>
    <td className="p-1   ">{item?.attributes?.name}</td>
   
    <td className="p-1  ">{item?.attributes?.designation}</td>
    {/* <td className="p-1    ">{item?.attributes?.department}</td>
    <td className="p-1  text-center"> {item?.attributes?.working}</td> */}
    <td className="p-1  text-center"> {item?.attributes?.mobile}</td>
    <td className="p-1  "> {item?.attributes?.email}</td>
    </Fade>
  </tr>
   
 )



} )}

         
      
        </tbody>
      </table>
        </div>


  

      </div>


      <div className='w-full max-w-[1400px] m-auto  p-5 '>
      <div className=''>
        <Fade top>
        <h1 className='text-3xl font-bold font-heading'>
                 {locale === "en" ?"Union Chief":"ಒಕ್ಕೂಟಗಳ ಮುಖ್ಯಸ್ಥರು"}
        </h1>
        </Fade>
      </div>


     <div className='w-full overflow-auto'>
     <table className="  border-spacing-y-2	max-w-7xl  border-collapse w-full border overflow-auto">
        <thead className="bg-primary-main text-white  ">
          <tr className="text-[5.5px] md:text-lg ">
<Fade top>
            <th className="p-2 text-start font-heading ">   {locale === "en" ?"Name":"ಹೆಸರು"}</th>
            {/* <th className="p-2 text-start font-heading"> {locale === "en" ?"Designation":"ಪದನಾಮ"}	</th> */}
            <th className="p-2 text-start font-heading">{locale === "en" ?"Place of working":"ಕಾರ್ಯ ನಿರ್ವಹಿಸುತ್ತಿರುವ ಸ್ಥಳ"} 	</th>
            <th className="p-2   font-heading text-center">{locale === "en" ?"Mobile No":"ದೂರವಾಣಿ ಸಂಖ್ಯೆ"}</th>

{/* <th className="p-2 text-start  font-heading">{locale === "en" ?"Email Id":"ಇಮೇಲ್ ಐಡಿ"}</th> */}
</Fade>
          </tr>
        </thead>

        <tbody className="text-start     bg-secondary-gradient">
        {unionCheifs?.map((item,id)=>{
 


 return(
    
  <tr className='border-t text-[5.5px] md:text-lg' key={id} >
    <Fade bottom>
  <td className="p-1    ">{item?.attributes?.name}</td>
  {/* <td className="p-1  ">{item?.attributes?.designation}</td> */}
  <td className="p-1   overflow-auto">{item?.attributes?.working}</td>
  <td className="p-1   overflow-auto text-center">{item?.attributes?.mobile}</td>
  {/* <td className="p-1   overflow-auto">{item?.attributes?.email}</td> */}
  </Fade>

</tr>
 )



} )}

         
      
        </tbody>
      </table>
     </div>

      </div>


      <div className='w-full p-5  max-w-[1400px]  m-auto overflow-auto'>
      <div className=''>
        <Fade top>
        <h1 className='text-3xl font-bold font-heading'>
        {locale === "en" ?"Unit Chief":"ಘಟಕಗಳ ಮುಖ್ಯಸ್ಥರು"}
              
        </h1>
        </Fade>
      </div>


      <div className='w-full overflow-auto'>
      <table className="  border-spacing-y-2	max-w-7xl  border-collapse w-full border overflow-auto">
        <thead className=" w-full bg-primary-main text-white ">
          <tr className="  text-[5.5px] md:text-lg   ">
            <Fade top>
            <th className="p-2 text-start font-heading"> {locale === "en" ?"Name":"ಹೆಸರು"}</th>
            {/* <th className="p-2 text-start font-heading"> {locale === "en" ?"Designation":"ಪದನಾಮ"}	</th> */}
            <th className="p-2 text-start font-heading ">{locale === "en" ?"Place of working":"ಕಾರ್ಯ ನಿರ್ವಹಿಸುತ್ತಿರುವ ಸ್ಥಳ"} 	</th>
            <th className="p-2   font-heading text-center">{locale === "en" ?"Mobile No":"ದೂರವಾಣಿ ಸಂಖ್ಯೆ"}</th>

{/* <th className="p-2 text-start  font-heading">{locale === "en" ?"Email Id":"ಇಮೇಲ್ ಐಡಿ"}</th> */}
</Fade>
          </tr>
        </thead>

        <tbody className="text-start     bg-secondary-gradient">
        {unitCheifs?.map((item,id)=>{
 


 return(
    
  <tr className='border-t text-[5.5px] md:text-lg' key={id} >
    <Fade bottom>
  <td className="p-1    ">{item?.attributes?.name}</td>
  {/* <td className="p-1  ">{item?.attributes?.designation}</td> */}
  <td className="p-1   overflow-auto">{item?.attributes?.working}</td>
  <td className="p-1   overflow-auto text-center">{item?.attributes?.mobile}</td>

  {/* <td className="p-1   overflow-auto">{item?.attributes?.email}</td> */}
  </Fade>
</tr>
   
 )



} )}

         
      
        </tbody>
      </table>
      </div>

      </div>
    </div>
     
    </section>

    <Footer/>
  </div>
  )
}

export default Executive