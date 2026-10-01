'use client';

import React, { useEffect, useState } from 'react';
import Logo from '@/images/logo/logo.png';
import HeroImg from '@/images/milk-union/milk-union-home.png';
import unionMapImg from '@/images/milk-union/union-map.png';
import UnionCard from './UnionCard';
import Follow from '@/components/Follow.js';
import Footer from '@/components/Footer';
import useApi from '@/hooks/useApi';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import useLocale from '@/hooks/useLocale';
import { IoHomeOutline } from 'react-icons/io5';

import { useMyContext } from '@/context/headerContext';
function MilkUnion() {
  const [milkUnion, setMilkUnions] = useState([]);
  const Api = useApi();
  const params=useParams()
  const [loading,setLoading]=useState(true)
  const {isScroll} =useMyContext()
const locale=useLocale().locale
  useEffect(() => {
    (async () => {
      const { data } = await Api.get('/api/milk-unions?sort[0]=order:asc');
      
      setMilkUnions(data.data);
      setLoading(false)
    })();
  }, []);
  return (
    <div className={`w-full h-full absolute top-0 z-[-1]  ${isScroll?'top-36':''}`}>
      <section className={`w-full h-72 pt-28 relative  grid place-items-center company-bg`}>
        <img loading="lazy" decoding="async" src={HeroImg.src} className="w-full h-full absolute top-0 z-[-1]" />
        <img loading="lazy" decoding="async" src={Logo.src} alt="milk-union-logo" className="w-[200px] " />
      </section>

      <section className="w-full p-2  ">
        <div
          className="max-w-7xl  m-auto p-3  rounded-tl-3xl  rounded-br-3xl  bg-white md:h-[674px] "
          style={{ boxShadow: '0px 11px 49px 0px rgba(0, 0, 0, 0.15)' }}>
      <iframe src="https://www.google.com/maps/d/u/0/embed?mid=14_yIj9s5_1n5VOPDac5zG7F_0hRgLFo&ehbc=2E312F&noprof=1" width="100%" height="100%"></iframe>
        </div>
      </section>

      <section className="w-full    pt-10 ">
      <div className="mb-12  mt-20  relative w-full  flex justify-center items-center ">
          
              <h1 className=" text-primary-main relative max-w-[600px] m-auto text-center z-10 font-heading text-5xl font-extrabold uppercase">
             {locale==='kn'?'':'Milk Unions'}
              </h1>
            </div>
      <div className='flex justify-center space-x-3 items-center mt-10 border-b w-fit m-auto'>
        <Link className='font-bold hover:text-secondary-main' href={`${locale==='kn'?'/kn':'/'}`}><IoHomeOutline size={20} /></Link>
        <Link className='text-secondary-main font-bold hover:text-secondary-main' href={`/${locale}/milk-union`}>/ {locale==="en" ?"Milk Unions":"ಹಾಲು ಒಕ್ಕೂಟಗಳು"}</Link>
      </div>

    
        <div className="max-w-[1400px] m-auto p-2 shadow-lg mt-10    shadow-white bg-white flex flex-col justify-center items-center space-y-5">
          {milkUnion.map((union, id) => {
         
            return (
            
              <UnionCard
                key={union?.id}
                idx={id}
                name={union?.attributes?.name}
                image={union?.attributes?.image}
                description={union?.attributes?.about}
                link={`/${params.locale}/milk-union/${union?.id}`}
            
              />
            
            );
          })}
        </div>
      </section>

       
<Footer />
    </div>
  );
}

export default MilkUnion;