import React from 'react'
import { FaFacebook, FaTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
 
import Fade from 'react-reveal/Fade';

function Follow() {
  return (
    <div className='w-full z-[10]  absolute top-[-31px] sm:top-[100px] flex justify-center space-x-5 items-center'>
    <Fade bottom>


    <div className=' text-2xl md:text-5xl  font-light font-serif'>
        Follow us:
    </div>
    </Fade>

    <div className='w-fulll '>
          <ul className='w-full flex justify-center space-x-5 items-center'>
            <Fade top>
            <li className='border-r-2 p-2 transition-all duration-150 hover:scale-[1.1]'>
              <a href='https://www.facebook.com/kmfnandini.coop'>
                <FaFacebook size={20} className='hover:text-blue-500 hover:scale-[1.1] transition-all duration-150'/>
              </a>
            </li>

            </Fade>


            <Fade bottom>
            <li className='border-r-2 p-2 transition-all duration-150 hover:scale-[1.1]'>
              <a href='https://www.instagram.com/kmfnandini.coop?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='>
                <FaInstagram size={20} className='hover:text-pink-500 hover:scale-[1.1] transition-all duration-150'/>
              </a>
            </li>
            </Fade>


            <Fade top>
            <li className='border-r-2 p-2 transition-all duration-150 hover:scale-[1.1]'>
              <a href="https://www.youtube.com/@kmfnandini12">
               <FaYoutube size={20} className='hover:text-red-500 hover:scale-[1.1] transition-all duration-150'/>
              </a>
            </li>
            </Fade>

            <Fade top>
            <li className='border-r-2 p-2 transition-all duration-150 hover:scale-[1.1]'>
              <a href="mailto:customercare.nandini@kmf.coop">
               <SiGmail size={20} className='hover:text-red-500 hover:scale-[1.1] transition-all duration-150'/>
              </a>
            </li>
            </Fade>


            <Fade top>
            <li className='border-r-2 p-2 transition-all duration-150 hover:scale-[1.1]'>
              <a href="https://twitter.com/kmfnandinimilk">
               <FaXTwitter size={20} className='hover:text-grey-500 hover:scale-[1.1] transition-all duration-150'/>
              </a>
            </li>
            </Fade>

          </ul>
    </div>
  </div>
  )
}

export default Follow