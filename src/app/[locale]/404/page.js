import React from 'react'
import './style.css'
import Link from 'next/link'
import notfoundImg from '@/images/notfound/notfound.png'
import { IoHomeOutline } from 'react-icons/io5';

function FourOFour() {
  return (
    <div class="flex-container">
    <div class="text-center">
      <h1>
        <span class="fade-in" id="digit1">4</span>
        <span class="fade-in" id="digit2">0</span>
        <span class="fade-in" id="digit3">4</span>
      </h1>
      <h3 class="fadeIn">PAGE NOT FOUND</h3>
      
      <Link  href='/' type="button" name="button" className='flex justify-center items-center space-x-4'><IoHomeOutline size={40} /> <span>Return To Home</span></Link>
    </div>
    <img loading="lazy" decoding="async" src={notfoundImg.src}/>
  </div>
  )
}

export default FourOFour