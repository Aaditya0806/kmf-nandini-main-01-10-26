import React from 'react'
 
import useApi from '@/hooks/useApi'
import { useState,useEffect } from 'react'
import Link from 'next/link'
function UnitOfKMF({setLoading}) {
  const axios=useApi()
  const[kmfUnits,setKmfUnits]=useState([])

  useEffect(()=>{
    (
    async()=>{
      const {data}=await axios.get('/api/about-unit-kmfs?sort[0]=order:asc')
      setKmfUnits(data?.data)
 
      setLoading(false)
    }

    )()
  },[])

  return (
    <div className="w-full flex-col p-10 items-start justify-start  space-y-5">

    <div className='w-full '>
      <h1 className='text-lg  font-black'>KMF has the following Units functioning directly under its control:</h1>

    </div>

    <div className='w-full'>
          <ul className='w-full flex flex-col space-y-4 justify-start items-start'>
            {kmfUnits?.map((item,idx)=>{
                return(
                    <Link key={idx} href={item?.attributes?.url || ''} className='text-[#356CFC] bg-white shadow-md w-full rounded-xl p-4'>{item?.attributes?.title}</Link>
                )
            })}

          </ul>
    </div>
    
  </div>
  )
}

export default UnitOfKMF