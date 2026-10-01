import React from 'react'
import loaderGif from '@/images/loader.gif'

function Loader() {
  return (
    <div className='w-full h-screen flex justify-center items-center flex-col space-y-3' >
       <img loading="lazy" decoding="async" src={loaderGif.src} className='w-96 '/>
        <h1>LOADING....</h1>
        </div>
  )
}

export default Loader