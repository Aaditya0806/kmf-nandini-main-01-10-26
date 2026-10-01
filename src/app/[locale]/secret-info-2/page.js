import React from 'react'
import { Header } from '@/components/Header'
import secretinfoImg from "@/images/scret-info-new.png"

function SecretInfo2() {
  return (

    <div className='w-full h-full'>
      
      <div className='w-full h-[98vh] flex justify-center items-center'>
         
         <div className='w-[95%] md:w-[55%] h-auto'>
            <img loading="lazy" decoding="async" className='w-full h-full' src={secretinfoImg.src} alt="" />
         </div>
            
      </div>
      
    </div>
  )
}

export default SecretInfo2