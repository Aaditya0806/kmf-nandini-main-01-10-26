import React from 'react'
import sweet from '@/images/recipes/sweet.jpg'
import Link from 'next/link'
import { Fade } from 'react-reveal'


const Recipes = ({image,title,link}) => {
  return (
    <Link href={link || ''} className='w-full h-full'>
    <div className='w-full max-w-[30rem] h-[400px] mt-10'>
      <Fade top>
    <div className='w-full h-full'>
       <img loading="lazy" decoding="async"   src={image} className='w-full h-full' alt="" />
    </div>
</Fade>

<Fade bottom>
    <h3 className='text-3xl mt-10 mb-10'>
     {title}

    </h3>
    </Fade>
    <hr className='bg-slate-300 h-[2px]' />
</div>
</Link>
  )
}

export default Recipes
