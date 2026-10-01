import React from 'react'
import './style.css'
import Link from 'next/link'
import comingSoonImg from '@/images/notfound/comingsoon.png'
import { IoHomeOutline } from 'react-icons/io5';

function ComingSoon() {
  return (
    <div class="flex-container">
    <div class="text-center">
      <h1>
        <span class="fade-in" id="digit1">C</span>
        <span class="fade-in" id="digit2">O</span>
        <span class="fade-in" id="digit3">M</span>
        <span class="fade-in" id="digit3">I</span>
        <span class="fade-in" id="digit3">N</span>
        <span class="fade-in" id="digit3">G</span>
      </h1>
      <h3 class="fadeIn">COMING SOON</h3>
      
      <Link  href='/' type="button" name="button" className='flex justify-center items-center space-x-4'><IoHomeOutline size={40} /> <span>Return To Home</span></Link>
    </div>
    <img loading="lazy" decoding="async" src={comingSoonImg.src}/>
  </div>
  )
}

export default ComingSoon