import Link from 'next/link'
import React from 'react'

function VideoCard({title,video,description}) {
  return (
      
   
 
    <div className='w-80 h-96 bg-[#F7F7F7] shadow-md flex flex-col justify-between items-center overflow-hidden'>
    <div className='w-full h-[70%] flex justify-center items-center '>
      <video autoPlay loop muted controls src={video}
      className='w-full h-full transition-all duration-300 object-contain hover:scale-[1.1]'
      />  

    </div>

    <div className='w-full bg-[#F7F7F7] h-fit p-2  flex flex-col justify-center items-center
    '>
      <p className='text-lg uppercase'>{title}</p>
      <p className='text-sm '>{description}</p>
    </div>
</div>
 
  )
}

export default VideoCard