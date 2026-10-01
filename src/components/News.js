import Link from 'next/link'
import React from 'react'

function News({date,image,title,link}) {
  return (
    <Link href={link||''}>

    <div className="relative">
              <div className="max-w-[400px] h-96 overflow-hidden">
                <img loading="lazy" decoding="async"
                  src={image}
                  className="w-full object-cover hover:scale-[1.2]  "
                  style={{ transition: '1s all' }}
                />
              </div>
              <div className="absolute bottom-9 left-7">
                <p className="text-light-light4 text-[12px]">{date}</p>
                <p className="text-light-light4 text-[24px]">{title}</p>
              </div>
            </div>
 </Link>
  )
}

export default News