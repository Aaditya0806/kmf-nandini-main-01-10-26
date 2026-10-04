'use client';

import {  useEffect, useState } from 'react';
import logo from '@/images/logo/logo.png';
import corpoLogo from '@/images/logo/corpo-logo.jpg';
import logokn from '@/images/logo/logo-kn.png';
import rotatedLogo from '@/images/logo/logo-letter.png';

import AccordionItem from '@/components/Accordion';
import { mobileHeader } from '@/configtext/header';
import downarrowIco from '@/images/icons/downarrow.svg';
import uparrowIco from '@/images/icons/uparrow.svg';
import locationIco from '@/images/header-ico/location.svg';
import contactIco from '@/images/header-ico/contact.svg';
 

import { RxCrossCircled } from 'react-icons/rx';
import useLocale from '@/hooks/useLocale';
import Link from 'next/link';

import facebookIco from '@/images/footer/FB.svg';
import mailIco from '@/images/footer/Email.svg';
import twitterIco from '@/images/footer/X.svg';
import insta from '@/images/footer/insta.svg';
import ytIco from '@/images/footer/yt.svg';
import { FaLocationDot } from "react-icons/fa6";
import useApi from '@/hooks/useApi';
import { useParams, usePathname } from 'next/navigation';
import { IoChevronDown } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { useMyContext } from '@/context/headerContext';
import { RiMenuAddFill } from "react-icons/ri";
import { MdCall, MdLocationOn } from 'react-icons/md';
 
 
export const Header = () => {
  const [openAccordion, SetOpenAccordion] = useState(null);
  
  const [open, setOpen] = useState(null);
  const [productSub, setProductSub] = useState([]);
  const [unionSub, setUnionSub] = useState([]);
  const [kmfUnits, setKmfUnits] = useState([]);
  const [headerItem, setHeaderItem] = useState([]);
  const [latestNews, setLateatNews] = useState([]);
  const { locale } = useLocale();
  const axios = useApi();
  let headItem = mobileHeader[locale];
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isSticky, setIsSticky] = useState(false);
 const {isScroll,setIsScroll,id,setId}=useMyContext()
 const [products,setProducts]=useState([])
 const [rotateLogo, setRotateLogo] = useState(false); // State to control logo rotation
  const {openNav,setOpenNav} =useMyContext()
   const [subcategory, setSubcategory] = useState([]);
    useEffect(() => {
       (async () => {
        //  const { data } = await axios.get('/api/categories?sort[0]=order:asc');
         const { data: subcategory } = await axios.get('/api/subcategories?sort[0]=createdAt:asc');
   
        //  setBanner(data?.data?.map((item) => item?.attributes?.banner?.data?.attributes?.url));
        //  setCategories(data.data?.sort((a, b) => b.attributes.createdAt - a.attributes?.createdAt));

         setSubcategory(subcategory.data);
   
        //  if (id) {
        //    const filterItems = subcategory?.data?.filter(
        //      (item) => item?.attributes?.category?.data?.id === parseInt(id)
        //    );
        //    setSubcategory(filterItems);
        //  } else {
        //    setSubcategory(subcategory.data);
        //  }
       })();
     }, []);
 useEffect(() => {
   // When component mounts, trigger logo rotation after 1 second
   const timeout = setInterval(() => {
     setRotateLogo(true);
   }, 1000);

   return () => clearInterval(timeout);
 }, []);
 
  useEffect(() => {
   
    (async () => {
       
      const { data } = await axios.get('/api/subcategories?sort[0]=createdAt:asc');
      const { data: milkunion } = await axios.get('/api/milk-unions?sort[0]=order:asc');
      const { data: kmfUnit } = await axios.get('/api/units-of-kmfs?sort[0]=order:asc');
      const { data: header } = await axios.get('/api/header');
      const {data:product}=await axios.get('/api/product-sub-items?sort[0]=createdAt:asc')
 
 
      
      // const {data:latestNews}=await axios.get('/api/latest-new')

      const productSubitems = data?.data?.map((category, idx) => {
        
        return {
          title: category?.attributes?.title,
          link: `/${locale}/our-product/${category?.id}`,
          product:product?.data?.filter(item=>item?.attributes?.subcategory?.data?.attributes?.title===category?.attributes?.title),
          id:category?.attributes?.category?.data?.id

        };
      });
 
       
      const unionSubitems = milkunion?.data?.map((category, idx) => {
        return {
          title: category?.attributes?.name,
          link: `/${locale}/milk-union/${category?.id}`
        };
      });

       
      const kmfSubitems = kmfUnit?.data?.map((category, idx) => {
        return {
          title: category?.attributes?.title,
          link: `/${locale}/kmf-unit/${category?.id}`
        };
      });

      setUnionSub(unionSubitems);
      setProductSub(productSubitems);
      setKmfUnits(kmfSubitems);
      setHeaderItem(header?.data);
      setLateatNews(latestNews?.data);
      setProducts(product.data)
    })();
  }, [params.locale]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 153;
      if(scrollPosition>threshold) setIsScroll(true)
     

      setIsSticky(scrollPosition > threshold);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  for (let i = 0; i < headItem?.length; i++) {
    // if (headItem[i].title === 'OUR PRODUCTS' || headItem[i].title === 'ನಮ್ಮ ಉತ್ಪನ್ನಗಳು') {
    //   headItem[i].subItems =[...productSub]
      
    // }
    if (headItem[i].title === 'MILK UNIONS' || headItem[i].title === 'ಹಾಲು ಒಕ್ಕೂಟಗಳು') {
      headItem[i].subItems =unionSub
    }
    if (headItem[i].title === 'KMF UNITS' || headItem[i].title === 'ಕಹಾಮ ಘಟಕಗಳು') {
      headItem[i].subItems = kmfUnits;
    }
  }

  const handleLanguageChange = () => {
    
    if (pathname === '/kn') {
      return router.push('/');
    }
    if (pathname === '/') {
      return router.push('/kn');
    }
    const newLanguagePrefix = pathname.startsWith('/kn') ? '/en' : '/kn';
    const newUrl = pathname.replace(/^\/(kn|en)\//, newLanguagePrefix + '/');
    router.push(newUrl);
  };

  const arrows = {
    down: downarrowIco.src,
    up: uparrowIco.src
  };

  const handleAccordionClick = (accordionId) => {
    SetOpenAccordion(openAccordion === accordionId ? null : accordionId);
  };
  
  const handleMainHeader=(idx)=>{
  
    setOpen(null)
    setId(idx)
  }

  const headerPathname=pathname===`/${locale}/portfolio`
 
const productMegaMenu = {
  categories: [
    "Milk",
    "Curd",
    "Lassi",
    "Buttermilk",
    "Paneer",
    "Ghee",
    "Cheese",
    "Cold Coffee",
    "Whey Drink",
  ],
  products: [
    { name: "Gold Milk", img: "/dummy/milk1.png" },
    { name: "Super Gold", img: "/dummy/milk2.png" },
    { name: "Buffalo Milk", img: "/dummy/milk3.png" },
    { name: "Toned Milk", img: "/dummy/milk4.png" },
    { name: "Full Cream", img: "/dummy/milk5.png" },
    { name: "Standardized", img: "/dummy/milk6.png" },
    { name: "Slim Milk", img: "/dummy/milk7.png" },
    { name: "Cow Milk", img: "/dummy/milk8.png" },
  ],
};


  return (
    <>
      <div className={` w-full h-full relative z-20  block  `}>

        <Link href={`/${locale}/offers/`} className='w-20 h-15 fixed z-[10] right-5 top-2'>

            <img loading="lazy" decoding="async"  src='/poster/offer.gif' className='w-full h-full'/>
        </Link>
        {/* UPPER HEADER  */}

        <div className={`w-full `}>
          <div
            className={`relative flex h-[120px] w-full items-center justify-between gap-3 bg-white px-3 md:h-[150px] md:px-8 ${headerPathname ? 'hidden' : ''}`}
            onMouseEnter={() => setOpen(null)}>
            {/* Brand */}
            <div className="flex items-center gap-3 md:gap-5">
              <Link href={`/${locale}`} aria-label="KMF Nandini" className="shrink-0">
                <img loading="lazy" decoding="async" src={locale === 'kn' ? logokn.src : logo.src} alt="logo-home" className="w-[76px] sm:w-[140px]" />
              </Link>
              {headerItem?.attributes?.title && (
                <p className={`font-extrabold font-heading text-primary-darker ${locale === 'kn' ? 'text-[12px] sm:text-[18px]' : 'text-[9px] sm:text-[14px]'}`}>{headerItem.attributes.title}</p>
              )}
              <img loading="lazy" decoding="async" className="hidden h-14 w-14 sm:block md:h-24 md:w-24" src={corpoLogo.src} alt="International Year of Cooperatives 2025" />
            </div>

            {/* Contact cluster: desktop only */}
            <div className="hidden items-center gap-5 pr-24 lg:flex xl:gap-7">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                  <MdLocationOn size={24} />
                </span>
                <p className="text-[13px] font-semibold leading-snug text-gray-800">
                  {headerItem?.attributes?.address?.map((item, id) => (
                    <span key={id} className="block">
                      {item?.children[0]?.text}
                    </span>
                  ))}
                </p>
              </div>

              <span className="h-12 w-px bg-neutral-light1" aria-hidden="true" />

              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-subtle text-primary-main">
                  <MdCall size={22} />
                </span>
                <p className="max-w-[300px] text-[12px] leading-snug text-gray-600">
                  {headerItem?.attributes?.time?.map((item, id) => (
                    <span key={id} className={`block ${id === 0 ? 'text-[15px] font-extrabold text-primary-darker' : ''}`}>
                      {item?.children[0]?.text}
                    </span>
                  ))}
                </p>
              </div>

              <span className="h-12 w-px bg-neutral-light1" aria-hidden="true" />

              <div className="flex flex-col items-end gap-2">
                <button
                  type="button"
                  className="rounded-full border-2 border-primary-main px-4 py-1.5 text-sm font-bold text-primary-main transition-colors hover:bg-primary-main hover:text-white"
                  onClick={handleLanguageChange}>
                  {locale === 'en' ? 'ಕನ್ನಡ' : 'English'}
                </button>
                <div className="flex items-center gap-2">
                  {[
                    ['https://www.facebook.com/kmfnandini.coop', facebookIco.src, 'Facebook'],
                    ['https://twitter.com/kmfnandinimilk', twitterIco.src, 'X'],
                    [`/${locale}/contact`, mailIco.src, 'Contact'],
                    ['https://www.instagram.com/kmfnandini.coop?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', insta.src, 'Instagram'],
                    ['https://www.youtube.com/@kmfnandini12', ytIco.src, 'YouTube'],
                  ].map(([href, src, name]) => (
                    <Link key={name} href={href} aria-label={name} className="rounded-full p-1 transition-transform duration-200 hover:scale-110">
                      <img loading="lazy" decoding="async" src={src} alt="" className="h-6 w-6" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Phones and tablets: language toggle only */}
            <div className="flex items-center pr-20 lg:hidden">
              <button type="button" className="rounded-full border-2 border-primary-main px-3 py-1 text-xs font-bold text-primary-main" onClick={handleLanguageChange}>
                {locale === 'en' ? 'ಕನ್ನಡ' : 'English'}
              </button>
            </div>

            {latestNews?.attributes?.title && (
              <p className="marquee-notification absolute bottom-1 left-3 right-3 overflow-hidden text-xs font-bold text-red-600 md:left-auto md:w-1/2">{latestNews.attributes.title}</p>
            )}
          </div>

          {/* MAIN HEADER DOWN  */}

          <div className={`w-full    ${isSticky ? 'sticky-header  bg-[#06498a63]':'bg-primary-gradient'} `}>
            <div
              className={`relative z-20 m-auto h-[50px] w-full max-w-[85%] p-5 lg:max-w-[97%] lg:px-2 2xl:max-w-[88%]`}>
              <div className=" w-full h-full flex justify-between items-center lg:hidden ">
                <div onClick={() => setOpenNav((prev) => !prev)}>
                      <RiMenuAddFill size={30} color='white'/>
                </div>
              </div>

              <div className="w-full h-full hidden lg:block   ">
                <ul className="flex h-full w-full items-center justify-between font-semibold uppercase tracking-wide text-white">
                  {headItem?.map((header, i) => {
                    const isProductMenu =
                    header.title === "OUR PRODUCTS";

                    const hasItems = header?.subItems?.length;
                    const isLink = header?.link;
                   
                    const isVirtual=header.title==='VIRTUAL TOUR'|| header.title==='ವರ್ಚುವಲ್ ಟೂರ್'
                   
                    
                      const route = typeof isLink === 'string' ? isLink.replace(/^\/(en|kn)/, '').split('?')[0] : '';
                      const here = typeof pathname === 'string' ? pathname.replace(/^\/(en|kn)/, '') : '';
                      const isActive = !!route && route !== '/' && here.startsWith(route);
                      return (
                        <li
                          key={i}
                          className={`relative flex h-full min-w-0 items-center ${header.wideOnly ? 'hidden min-[1440px]:flex' : ''}`}
                          onMouseEnter={() => setOpen(hasItems ? i : null)}>
                          <Link
                            href={isLink ? isLink : '#'}
                            target={isVirtual ? '_blank' : '_self'}
                            className={`relative flex h-full items-center justify-center gap-1 px-1.5 py-1 text-center text-[10.5px] leading-[1.2] transition-colors hover:text-secondary-lighter xl:px-2.5 xl:text-[12px] ${isVirtual ? '!h-auto whitespace-nowrap border border-white/70 !px-3 !py-1.5 hover:border-secondary-lighter' : ''} ${open === i || isActive ? 'text-secondary-lighter' : ''}`}>
                            <span className="max-w-[9.5rem]">{header.title}</span>
                            {hasItems ? <IoChevronDown size={12} className={`transition-transform ${open === i ? 'rotate-180' : ''}`} aria-hidden="true" /> : null}
                          </Link>
                            {hasItems && (
                              <div>
                                {isProductMenu?

                                <div
                                className={`absolute left-0 top-[2.71rem] z-50 flex w-[810px] border-t-2 border-white/40 bg-primary-darker normal-case tracking-normal shadow-lg ${
                                  open === i ? 'visible' : 'invisible'
                                }`}
                                onMouseLeave={() => setOpen(null)}>
        {/* LEFT CATEGORY LIST */}
        <div className="w-[220px] bg-primary-darker p-3">
          <ul className="max-h-[400px] space-y-0.5 overflow-y-auto text-sm">
            {/* {header.subItems?.map((subItem, idx) => {
                                  
                                    return (
                                      <Link
                                        href={subItem?.link || ''}
                                        className="block px-2 py-1.5 text-[13px] font-bold text-white hover:text-secondary-lighter"
                                        key={idx}
                                        onClick={() => setOpen(null)}>
                                        <li key={idx}>
                                          {subItem.title}
                                          

                                       
                                          </li>
                                      </Link>
                                    );
                                  })} */}
                                  <Link href={`/${locale}/our-product/`} >
                                  <li className="block px-2 py-1.5 text-[13px] font-bold text-white hover:text-secondary-lighter" >
                                          All Products
                                          
                                          </li>
                                          </Link>
            {subcategory?.map((subItem, idx) => {
                                  
                                    return (
                                      <Link
                                        href={`/${locale}/our-product/${subItem.id}`}
                                        className="block px-2 py-1 text-[12px] text-white/90 hover:text-secondary-lighter"
                                        key={idx}
                                        onClick={() => setOpen(null)}>
                                        <li key={idx} className='uppercase'>
                                          {subItem?.attributes?.title}
                                          

                                       
                                          </li>
                                      </Link>
                                    );
                                  })}
                                    <Link href={`/${locale}/nandini-recipes/`} >
                                  <li className='mt-2 block border-t border-white/15 px-2 pt-2 text-[12px] text-white/90 hover:text-secondary-lighter'>

                                  Nandini Recipes
                                  </li>
                                  </Link>
                                   <Link href={`/${locale}/contact?category=bulk-order`}>
                                  <li className='block px-2 py-1 text-[12px] text-white/90 hover:text-secondary-lighter'>
                            
                                    Bulk Order
                                  </li>
                                  </Link>
                                  {[
                                    ['dealership', 'Dealership & Franchise'],
                                    ['notify-me', 'Notify Me When Available'],
                                    ['complaint', 'File a Complaint'],
                                  ].map(([slug, title]) => (
                                    <Link key={slug} href={`/${locale}/${slug}`} onClick={() => setOpen(null)}>
                                      <li className="block px-2 py-1 text-[12px] text-white/90 hover:text-secondary-lighter">{title}</li>
                                    </Link>
                                  ))}
            
          </ul>
        </div>

        {/* RIGHT PRODUCT GRID */}
        <div className="flex-1 bg-white p-6">
          <div className="grid grid-cols-4 gap-6 overflow-y-auto max-h-[400px]">
            {subcategory.map((p, idx) => (
             
              <Link key={idx} href={`/${locale}/our-product/${p.id}`}>
              <div
                
                className="text-center group cursor-pointer"
              >
                <img loading="lazy" decoding="async"
                  src={p?.attributes?.image?.data?.[0]?.attributes?.url}
                  alt={p?.attributes?.title}
                  className="h-20 mx-auto object-contain group-hover:scale-110 transition"
                />
                <p className="text-xs mt-2 text-gray-700 uppercase">
                  {p?.attributes?.title}
                </p>
              </div>
              </Link>
              
            ))}
          </div>
        </div>
      </div>
                                
                                
                                :

                                
                                <div
                                className={`absolute left-0 top-[2.71rem] z-50 w-[250px] border-t-2 border-white/40 bg-primary-darker normal-case tracking-normal shadow-lg ${
                                  open === i ? 'visible' : 'invisible'
                                }`}
                                onMouseLeave={() => setOpen(null)}>
                                  <ul className="max-h-[360px] w-full divide-y divide-white/10 overflow-auto">
                                  {header.subItems?.map((subItem, idx) => {
                                    return (
                                      <li key={idx}>
                                        <Link
                                          href={subItem?.link || ''}
                                          className="block px-4 py-2.5 text-[13px] text-white transition-colors hover:bg-white/10 hover:text-secondary-lighter"
                                          onClick={() => setOpen(null)}>
                                          {subItem.title}
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                                
                                
                              </div>

                                }
                              
                              </div>
                            )}
                        </li>
                      );
                  })}
                </ul>
              </div>
            </div>
          </div>
   
        </div>
       

 

        <div
          className={`w-full h-screen  bg-[#0E86E7] fixed top-0 z-[20] overflow-scroll   lg:hidden  ${
            openNav ? 'left-0 ' : 'left-[-1200px]   '
          }`}
          style={{ transition: 'all .8s' }}>
          <div className='w-full'>
            <div className="flex justify-end items-center p-5">
              <RxCrossCircled size={40} color="white" onClick={() => setOpenNav((prev) => !prev)} />
            </div>

            <div className="flex justify-center items-center">
            <img loading="lazy" decoding="async"
          src={locale === 'kn' ? logokn.src : logo.src} // Use rotated logo when rotateLogo is true
          alt="logo-home"
          className={`w-[70px] sm:w-[150px] ${rotateLogo ? '' : ''}`} // Apply rotation class
        />
            </div>

            
            <div className=" w-full  max-w-40 m-auto space-x-5 mt-10  flex justify-center items-center      ">
                      <div className="w-fit">
                      <FaLocationDot color='white' />
                      </div>

                      <p className={`w-full text-white font-heading flex flex-col font-black/10 ${locale==='kn'?'text-[10px]':'text-[10px]'}  `}>
                      {/* <span className="block"> 12915, KMF Complex,
Bengaluru - 560 029</span> */}
                        {headerItem?.attributes?.address?.map((item, id) => {
                          return (
                            <span key={id} className="block">
                              {item?.children[0]?.text}
                            </span>
                          );
                        })}
                      </p>
           </div>


           <div className=" w-full   p-2 m-auto space-x-5     flex justify-center items-center      ">
                     

                      <p className={`w-full text-white text-center font-heading flex flex-col font-black/10 ${locale==='kn'?'text-[10px]':'text-[10px]'}  `}>
                      {/* 1800 425 8030 toll free <br/>
10:00 AM - 5:45 PM <br/>
Except on Second Saturday and Fourth<br/>
Saturday, Sunday & State Govt. Holidays */}
                        {headerItem?.attributes?.time?.map((item, id) => {
                          return (
                            <span key={id} className="block">
                              {item?.children[0]?.text}
                            </span>
                          );
                        })}
                      </p>
           </div>

           <div className="flex space-x-5 justify-center p-2  items-center">
                      <Link
                        href={'https://www.facebook.com/kmfnandini.coop'}
                        className="hover:scale-125 transition-all duration-300">
                        <img loading="lazy" decoding="async" src={facebookIco.src} className="w-7" />
                      </Link>
                      <Link
                        href={'https://twitter.com/kmfnandinimilk'}
                        className="hover:scale-125 transition-all duration-300">
                        <img loading="lazy" decoding="async" src={twitterIco.src} className="w-7" />
                      </Link>
                      <Link
                        href={`/${locale}/contact`}
                        className="hover:scale-125 transition-all duration-300">
                        {' '}
                        <img loading="lazy" decoding="async" src={mailIco.src} className="w-7" />
                      </Link>
                      <Link
                        href={
                          'https://www.instagram.com/kmfnandini.coop?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
                        }
                        className="hover:scale-125 transition-all duration-300">
                        {' '}
                        <img loading="lazy" decoding="async" src={insta.src} className="w-7" />
                      </Link>
                      <Link
                        href={
                          'https://www.youtube.com/@kmfnandini12'
                        }
                        className="hover:scale-125 transition-all duration-300">
                        {' '}
                        <img loading="lazy" decoding="async" src={ytIco.src} className="w-7" />
                      </Link>
                    </div>

            <div>
              <ul className="overflow-auto">
                {headItem?.map((items, idx) => {
                  const hasItems = items?.subItems?.length;
                  if (hasItems) {
                    return (
                      <AccordionItem
                        title={items.title}
                        id={idx}
                        open={openAccordion == idx}
                        arrow={arrows}
                        onToggle={handleAccordionClick}
                        key={idx}>
                        <ul className="">
                          {items?.subItems?.filter((sub) => !sub.desktopOnly).map((items, index) => {
                            return (
                              <Link
                                href={items?.link || ''}
                                key={index}
                                onClick={() => setOpenNav((prev) => !prev)}>
                                <li
                                  key={index}
                                  className="flex items-center  relative  text-light-light4 border-b-2 border-b-light-light4 pb-2 space-x-3 ">
                                  <span>{items.title}</span>
                                </li>
                              </Link>
                            );
                          })}
                        </ul>
                      </AccordionItem>
                    );
                  } else {
                    return (
                      <Link
                        href={items?.link || ''}
                        key={idx}
                        onClick={() => setOpenNav((prev) => !prev)}>
                        <li className=" " key={idx}>
                          <button className="flex items-center justify-between relative  text-light-light4 border-b-2 border-b-light4 p-4 w-full ">
                            <div className="flex space-x-2 ">
                              <span>{items.title}</span>
                            </div>
                          </button>
                        </li>
                      </Link>
                    );
                  }
                })}

                
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

