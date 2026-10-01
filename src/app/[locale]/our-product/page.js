'use client';
import React, { useEffect, useState } from 'react';
import useApi from '@/hooks/useApi';
import HeroImg from '@/images/milk-union/milk-union-home.png';
import pro1 from '@/images/product/all/1.png';


import Follow from '@/components/Follow.js';
import Footer from '@/components/Footer';
import ProductCard from './[slug]/ProductCard';
import useLocale from '@/hooks/useLocale';
import { useMyContext } from '@/context/headerContext';
import { Fade, Zoom } from 'react-reveal';
import Link from 'next/link';
import ProductScrollSection from './ProductScrollSection';

function Products() {
  const [categories, setCategories] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [banner, setBanner] = useState();
  const [currentIdx,setCurrentIdx]=useState(0)
  const axios = useApi();
  const locale = useLocale().locale;
  const { isScroll, setIsScroll, id, setId } = useMyContext();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/api/categories?sort[0]=order:asc');
      const { data: subcategory } = await axios.get('/api/subcategories?sort[0]=createdAt:asc');

      setBanner(data?.data?.map((item) => item?.attributes?.banner?.data?.attributes?.url));
      setCategories(data.data?.sort((a, b) => b.attributes.createdAt - a.attributes?.createdAt));

      if (id) {
        const filterItems = subcategory?.data?.filter(
          (item) => item?.attributes?.category?.data?.id === parseInt(id)
        );
        setSubcategory(filterItems);
      } else {
        setSubcategory(subcategory.data);
      }
    })();
  }, [id]);

  const handleIdx=(idx)=>{
    setCurrentIdx(idx)
    setId(idx)
  }
  const handleProduct = async (id) => {
    const { data } = await axios.get(`/api/subcategories?sort[0]=createdAt:asc`);

    if (id === 'all') {
      setSubcategory(data.data);
    } else {
      const subcategory = data?.data?.filter(
        (item) => item?.attributes?.category?.data?.id === parseInt(id)
      );
      setSubcategory(subcategory);
    }
  };



  return (
    <div className={`w-full h-full absolute  z-[-1] ${isScroll ? ' md:top-48' : ''}  `}>
      {/* <section className={`w-full    h-full md:h-[700px] md:pt-28 relative  grid place-items-center `}>
        
        <video
          src="/video/our-product.mp4"
          muted
          autoPlay
          loop
          controls
          playsInline
          className={`w-full  h-full  object-fill    absolute top-0   ${
            isScroll ? 'h-[400px]' : ''
          } `}
        />
      </section> */}

      {/* <section className="w-full   max-w-[1500px]   m-auto mb-10">
      <div className=" mb-4 md:mb-24 mt-4 md:mt-20  relative w-full  flex justify-center items-center ">
          
              <h1 className=" text-primary-main relative max-w-[300px] m-auto text-center z-10 font-heading text-3xl font-extrabold uppercase">
             {locale==='kn'?'ನಂದಿನಿ ಉತ್ಪನ್ನಗಳು':'Our Products'}
              </h1>
            </div>

        <div className="w-full  grid grid-cols-4 gap-4 p-2 md:grid-cols-7 lg:grid-flow-col   md:space-x-4 ">
          <p
            className="font-subheading transition-all w-full  text-center text-sm cursor-pointer  hover:scale-[1.1]"
            onClick={() => handleProduct('all')}>
          {locale==='kn'?'ಎಲ್ಲವೂ':'  All   '}
          </p>
          {categories?.map((item, id) => {
             
            return (

              <div  className='relative '  key={item?.id}>

               
                {item?.attributes?.hasNewProduct  &&
                <Zoom>
                 <img loading="lazy" decoding="async" src='/images/product-new/new.gif' className='w-10 absolute left-5 -top-8'/>
                 </Zoom>
                }
               
               <Fade top>
                <Link
                href='#product-cards'
                onClick={() => handleIdx(item?.id)}
                className={`font-subheading w-full text-center transition-all duration-300 text-sm cursor-pointer  hover:scale-[1.3] ${item?.id===currentIdx?'text-primary-main underline pb-1':''} ${locale==='kn'?'text-sm':''} `}>
                {item?.attributes?.title}
                </Link>
                </Fade>
                </div>
              
            );
          })}
        </div>

        <div className="w-full h-full grid grid-cols-3 p-2 place-items-center    gap-5 pt-10" id='product-cards'>
          {subcategory?.map((item, idx) => {
            return (
              <ProductCard
                key={item?.idx}
                title={item?.attributes?.title}
                image={item?.attributes?.image?.data?.[0]?.attributes?.url}
                link={`/${locale}/our-product/${item?.id}`}
              />
            );
          })}
        </div>
      </section> */}
      <ProductScrollSection subcategory={subcategory} locale={locale}/>
       
<Footer />
    </div>
  );
}

export default Products;
