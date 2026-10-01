import React from 'react'
import { Header } from '@/components/Header'
// import secretinfoImg from "@/images/Privateinfo-new.png"
import secretinfoImg from "@/images/private-info-26.png"


function PrivateInfo() {
  return (

   <div className='w-full h-full'>
      
      <div className='w-full md:h-[98vh] flex justify-center '>
         
         <div className='w-[95%] md:w-[45%] mt-10 h-auto'>
            <img loading="lazy" decoding="async" className='w-full h-full' src={secretinfoImg.src} alt="" />
         </div>
          
      </div>
       <div className='hidden lg:block w-full h-[400px]'></div> 
     
      
    </div>
  )
}

export default PrivateInfo
