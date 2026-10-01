

import Link from 'next/link'
import React from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view';
 import { Fade } from 'react-reveal';
function UnionCard({name,image,description,link,idx}) {
 
  return (
    <div className=" w-full h-full grid md:grid-cols-2 border-b  p-2    ">
      {
        idx % 2===0 
        ?
        <Fade left>
        <div className='w-full h-72 pb-10 flex justify-center items-center'>
    

  <PhotoProvider >
   
      <PhotoView src={image} height="400px"  >
      <img loading="lazy" decoding="async" src={image} className=' max-w-[400px] h-full object-fill'/>
      </PhotoView>
  

</PhotoProvider>

    
  </div>

<Link href={link || ''} className='w-full flex flex-col justify-start items-start space-y-6'>

    <h1 className=' text-xl text-center  md:text-3xl md:text-start uppercase text-primary-main'>{name}</h1>
    <p className='text-sm  text-justify'>{description?.[0]?.children?.[0]?.text}</p>

 

  
  </Link>
    </Fade>
        :


        <Fade right>
            <div className='w-full h-72 pb-10 flex justify-center items-center'>
        

      <PhotoProvider >
       
          <PhotoView src={image} height="400px"  >
          <img loading="lazy" decoding="async" src={image} className=' max-w-[400px] h-full object-fill'/>
          </PhotoView>
      
    
    </PhotoProvider>
   
        
      </div>

<Link href={link || ''} className='w-full flex flex-col justify-start items-start space-y-6'>
   
        <h1 className='text-xl text-center md:text-3xl md:text-start  uppercase text-primary-main'>{name}</h1>
        <p className='text-sm  text-justify'>{description?.[0]?.children?.[0]?.text}</p>
    
     
   
      
      </Link>
        </Fade>
      }
    
   </div>
  )
}

export default UnionCard