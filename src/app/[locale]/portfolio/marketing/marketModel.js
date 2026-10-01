// TenderDetailsModal.jsx

import React, { useEffect, useState } from 'react';
import Rodal from 'rodal';


const MarketModel = ({ closeModal,market ,close}) => {
  const [mobileWidth, setMobileWidth] = useState(null);

   useEffect(()=>{
   const handleResize=()=>{
    if(window.innerWidth === 786){
       setMobileWidth(250)
    }
    else{
      setMobileWidth(700)
    }
   }

   window.addEventListener('resize',handleResize);
   
   },[])  
 
  return (

    <Rodal visible={closeModal} onClose={()=>close(!closeModal)} animation='door'  className='overflow-auto w-[90%]' width={mobileWidth} >
    <div className='w-full h-full p-2 md:p-4  flex flex-col justify-center items-center space-y-5 overflow-auto'>

      <div className='w-full h-[10%]'>

    
        <h1 className='text-xl md:text-2xl text-primary-main'>{market?.attributes?.title}</h1>
        </div>


        {/* <div className='w-full h-[60%]  '>
          <img loading="lazy" decoding="async" src={kymMilk?.attributes?.image?.data?.attributes?.url} className='w-full max-w-[90%] h-full object-containf  m-auto'/>
        </div> */}

      <div className='w-full h-[70%]  '>
      {market?.attributes?.content?.map((item, idx) => {
                return (
                  <p key={idx} className="text-lg md:text-xl ove text-neutral-dark1 text-justify">
                    {item?.children[0]?.text}
                  </p>
                );
              })}
      </div>
      

    </div>
   </Rodal>
  );
};

export default MarketModel;