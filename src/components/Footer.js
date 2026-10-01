'use client';
import React, { useEffect, useState } from 'react';
import locationVectorIco from '../images/footer/locationVector.svg';
import callVectorIco from '../images/footer/callVector.svg';
import msgVectorIco from '../images/footer/msgVector.svg';
import footerbg from '@/images/homeImages/footer-bg.png';

import { MdLocationOn, MdEmail } from 'react-icons/md';
import { FcCustomerSupport, FcCallback } from 'react-icons/fc';

import useApi from '@/hooks/useApi';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Follow from './Follow';
import { trackCreditClick } from '@/lib/analytics';

// TODO(KMF): paste the KMF-MIS (Central Office) URL here. While empty, the
// name is shown as plain text instead of a link that goes nowhere.
const KMF_MIS_URL = '';
const VELOZITY_CREDIT_URL =
  'https://www.velozityglobal.com/case-studies/kmf-nandini/?utm_source=kmfnandini&utm_medium=referral&utm_campaign=footer_credit';

function Footer() {
  const [footerItem, setFooterItem] = useState([]);
  const params = useParams();
  const axios = useApi();
  const locale = params.locale;

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/api/footers');
      const footer = data?.data?.map((item) => {
        return {
          address: item?.attributes?.address,
          telephone: item?.attributes?.telephone,
          email: item?.attributes?.email,
          copyright: item?.attributes?.copyright
        };
      });
      setFooterItem(footer);
    })();
  }, [params?.locale]);
  return (
    <section className="w-full mt-10 md:min-h-[462px] relative">

      <Follow/>

      <img loading="lazy" decoding="async" src={footerbg.src} className='absolute inset-0 w-full h-full object-fill'/>
      <div className=" z-1 relative h-fit  max-w-[1282px]  pt-5 pb-20 md:pb-5  m-auto flex flex-col justify-between items-center md:items-start">
        <div className="   md:mt-[167px] w-full h-full flex  justify-center items-start   md:flex-row md:justify-between md:items-start">
          <div className="flex flex-col justify-center items-center md:items-start p-1 max-w-96 space-y-5">
            <h1 className="text-[12px] md:text-lg mb-5 relative before:absolute before:-bottom-3 before:w-10 before:h-1 before:bg-primary-lighter hover:scale-125 transition-all duration-300">
           {locale==='kn'?'ವಿಳಾಸ':'Address'}
            </h1>

            <div className="flex h-full justify-center items-start space-x-3">
              <MdLocationOn size={50} height={20} color='red'/>

              <div className="flex flex-col justify-center items-center md:items-start space-y-5">
                <p className="text-neutral-dark1 text-left text-[7px] md:text-sm ">
                  {footerItem?.[0]?.address}
                  {/* Karnataka Co-operative Milk Producers Federation Ltd No 2915, D. R. College Post, Dr M H Marigowda Road, Bangalore-560029, Karnataka. */}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full h-full p-2 max-w-96 justify-center space-y-5 items-center md:items-start">
            <h1 className="text-[12px] md:text-lg mb-5 relative before:absolute before:-bottom-3 before:w-10 before:h-1 before:bg-primary-lighter hover:scale-125 transition-all duration-300">
          
            {locale==='kn'?'ದೂರವಾಣಿ':'Telephone'}

            </h1>

            <div className="flex justify-start items-start space-x-3">
            <FcCallback size={50} height={30} color='red'/>

              <div className="flex flex-col justify-center items-start space-y-5">
                <p className="text-neutral-dark1 text-left text-[7px] md:text-sm">
                  {footerItem?.[0]?.telephone}
                  {/* 080-260 96800 Helpline : 1800 425 8030 toll free 10:00AM - 5:45PM (Except Second Saturday, Fourth Saturday, Sunday and other State Government Holidays) */}
                </p>
              </div>
            </div>
          </div>

          <div className="flex w-full h-full flex-col p-2 max-w-96 space-y-5 justify-center items-center md:items-start">
            <h1 className="text-[12px] md:text-lg mb-5 relative before:absolute before:-bottom-3 before:w-16 before:h-1 before:bg-primary-lighter hover:scale-125 transition-all duration-300">
            
            {locale==='kn'?'ಮಿಂಚಂಚೆ':'Email'}

            </h1>

            <div className="flex justify-center items-start space-x-3">
            <MdEmail size={20} height={30} color='red'/>
              <div className="flex flex-col justify-center items-start space-y-5">
                <p className="text-neutral-dark1 text-left text-[7px] md:text-sm"> 
                  {footerItem?.[0]?.email}
                  {/* customercare.nandini@kmf.coop */}

                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full h-full justify-center items-center md:pt-10  space-y-6  flex-wrap md:flex-row">
          <div className="flex flex-col justify-start items-start">
            <p className="text-xs md:text-sm text-center w-full">
              <Link href={`/${locale === 'kn' ? 'kn' : 'en'}/careers`} className="text-blue-500 font-bold underline">
                {locale === 'kn' ? 'ಉದ್ಯೋಗಾವಕಾಶಗಳು / ನೇಮಕಾತಿ' : 'Careers & Recruitment'}
              </Link>
            </p>
            <p className="text-xs md:text-sm text-center">© Copyright ©2024 - 2025 Karnataka Milk Federation</p>
            <p className="text-xs md:text-sm text-center flex justify-center items-center w-full">
              {' '}
              All rights reserved to{' '}
              {KMF_MIS_URL ? (
                <Link href={KMF_MIS_URL} className="text-blue-500 text-[10px] ml-2 md:text-sm text-center font-bold">
                  {' '}
                  KMF-MIS (CENTRAL OFFICE).
                </Link>
              ) : (
                <span className="text-blue-500 text-[10px] ml-2 md:text-sm text-center font-bold">
                  KMF-MIS (CENTRAL OFFICE).
                </span>
              )}
            </p>
          </div>
        </div>

        <p className='text-center text-xs md:text-lg w-full'>Designed, developed &amp; managed by <Link href={VELOZITY_CREDIT_URL} target='_blank' rel='noopener' onClick={() => trackCreditClick('footer')} className='text-blue-500 underline'>Velozity Global Solutions</Link></p>
      </div>
    </section>
  );
}

export default Footer;
