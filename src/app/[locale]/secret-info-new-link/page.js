import React from 'react'
import { Header } from '@/components/Header'
// import secretinfoImg from "@/images/scret-info-1.jpeg"
import secretinfoImg from "@/images/scret-info-new-link.png"

function SecretInfoLink() {
  return (

    <div className='w-full h-full'>
      
      <div className='w-full md:h-[98vh]  flex justify-center items-center'>
         
         <div className='w-[95%] md:w-[45%] h-auto'>
            <img loading="lazy" decoding="async" className='w-full h-full' src={secretinfoImg.src} alt="" />
         </div>
            
      </div>
      
    </div>
  )
}

export default SecretInfoLink