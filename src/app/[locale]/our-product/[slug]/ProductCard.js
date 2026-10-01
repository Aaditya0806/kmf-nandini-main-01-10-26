import Link from 'next/link'
import React from 'react'
import { Fade } from 'react-reveal'

function ProductCard({title,image,link}) {
  return (
      
    <Link href={link || ''}>
 
    <div className='w-28 h-40 sm:w-72 sm:h-80  bg-[#F7F7F7] shadow-md flex flex-col justify-between items-center overflow-hidden'>
      <Fade top>
    <div className='w-full h-[80%] flex justify-center items-center '>
      <img loading="lazy" decoding="async" src={image}
      className='w-full h-full transition-all duration-300 object-contain hover:scale-[1.1]'
      />  

    </div>
    </Fade>

    <div className='w-full bg-[#F7F7F7] h-[10%] flex justify-center items-center
    '>
      <Fade bottom>
      <p className='text-[8px] md:text-lg uppercase'>{title}</p>
      </Fade>
    </div>
</div>
</Link>
  )
}

export default ProductCard