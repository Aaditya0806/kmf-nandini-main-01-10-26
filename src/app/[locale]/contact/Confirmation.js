'use client'
import React from 'react'
import { GiConfirmed } from "react-icons/gi";

function Confirmation({handleReset}) {
  return (
   
<div className="fixed inset-0 flex items-center justify-center   backdrop-blur-sm z-[100] confirm-dialog ">
    <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
        <div className="w-[400px] opacity-25   h-full absolute z-10 inset-0"></div>
        <div className=" bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative shadow-lg">
            <div className="md:flex items-center">
                <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                <GiConfirmed size={40} color='green' />
                
                </div>
                <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                <p className="font-bold">Your Details has sent!</p>
                <p className="text-sm text-gray-700 mt-1">We will get back to you.!
                </p>
                </div>
            </div>
            <div className="text-center md:text-right mt-4 md:flex md:justify-end">
                <button onClick={(e)=>handleReset()}   id="confirm-delete-btn" className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-green-200 text-green-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2">
                    Done
                </button>
                
            </div>
        </div>
    </div>
</div>
  )
}

export default Confirmation