'use client'
import Link from 'next/link'
import React from 'react'

import useLocale from '@/hooks/useLocale'
function ArrivalCard({imgUrl,title,link}) {
    const locale=useLocale().locale
  return (
    <div className=' w-52  h-60   md:w-72 md:h-96'>


    <Link href={link||''}

    className=" w-full h-full   rounded-md overflow-hidden   m-auto group   transition-all duration-500  "
     >
    <div className="p-2 w-full h-[70%]">
      <img loading="lazy" decoding="async"
        src={imgUrl}
        alt="featured-img"
        className=" w-full h-full  transition-all duration-100 group-hover:scale-[1.01] hover:rounded-none "
        style={{ transition: '.4s all' }}
      />
    </div>

    {title &&
    
    <div className="p-2  w-full   rounded-full bg-zinc-300 group-hover:bg-orange-500 ">

    <h1 className="text-sm text-center group-hover:text-white  ">{title}</h1>
  </div>
    }

 

 
  </Link>
  </div>
  )
}

export default ArrivalCard