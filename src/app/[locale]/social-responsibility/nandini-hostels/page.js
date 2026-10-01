'use client';
import React, { useState,useEffect } from 'react';
import Follow from '@/components/Follow.js';
import Footer from '@/components/Footer';
import { useMyContext } from '@/context/headerContext';
import useLocale from '@/hooks/useLocale';
import Link from 'next/link';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { IoHomeOutline } from 'react-icons/io5';

import useApi from '@/hooks/useApi';
import { Fade } from 'react-reveal';
function NandiniHostels() {
  const { isScroll } = useMyContext();
  const locale = useLocale().locale;
  const [hostel,setHostels]=useState([])

  const axios = useApi();
useEffect(() => {
  (async () => {
    try {
      const { data } = await axios.get('/api/nandini-hostels');
      setHostels(data.data);
      console.log('nandini-hostels', data);
    } catch (err) {
      console.error('API error:', err.response?.data || err.message);
    }
  })();
}, []);


  return (
    <div className={`w-full h-full absolute company-bg   z-[-1] ${isScroll ? ' md:top-48' : ''}  `}>
  
      <div className="flex w-full    justify-center pt-5 space-x-2 items-center relative before:absolute before:-bottom-3 before:w-20   before:h-0.5 before:bg-primary-main">
                      <Link className="  text-sm font-bold  " href={`/` || ''}>
                      <IoHomeOutline size={20} />

            </Link>

            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold    " href={` `}>
              {locale==='kn'?'ಸಾಮಾಜಿಕ ಜವಾಬ್ದಾರಿಗಳು':'Social Responsiblites'}
            </Link>

            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold text-primary-main  " href={` `}>

            {locale==='kn'?'ನಂದಿನಿ ವಸತಿ ನಿಲಯ':'Nandini Hostels'}
              
            </Link>
            
      </div>
      <section className=" relative w-full   h-auto pt-10  ">
        <div className="w-full  h-full flex flex-col p-3 space-y-3 lg:flex-row lg:p-10 lg:space-x-10">
          <div className="w-full flex flex-col space-y-2 justify-center items-start    p-1   ">

          <div className="mb-10    relative w-full  flex justify-center items-center ">
             
              <h1 className=" text-primary-main relative z-10 font-heading text-4xl font-extrabold uppercase">
              {locale==='kn'?'ನಂದಿನಿ ವಸತಿ ನಿಲಯ':'Nandini Hostels'}
              </h1>
            </div>
           

            

            <div className="w-full h-full flex justify-center items-center flex-wrap">
            
              
              
                <div className='w-full h-auto   max-w-7xl bg-white shadow-lg p-5'>
                       {/* <h1 className="text-2xl text-primary-main mt-5">NANDINI DAIRY FARMERS WELFARE TRUST</h1>  <br />
                       <Fade bottom> <p className="text-md text-primary-main">NANDINI GIRL STUDENTS HOSTEL, BOOPASANDRA, B-94</p></Fade><br />
                        <ul className='list-disc flex-col flex space-y-5 ml-5'>
<li>                          On 20th September 2007 “Nandini Girl Students Hostel had been inaugurated in the location of  4th Cross, 4th Main, Vinayaka Layout, Boopasandra, Bangalore-94, under the supervision & guidelines of “Nandini Dairy Farmers Welfare Trust, KMF Complex, Dr M H Marigowda Road, Bangalore-29 
</li> 
<li>Nandini Girl Students Hostel is facilitating accommodation for Graduates(any), Post Graduates (any), Professional courses studying girl children of Nandini Dairy Farmers, who are the active members of Nandini Milk Dairy Society which is controlled by different district Milk Unions of all over the Karnataka.
</li> 
<li>Nandini Girl Students Hostel has capacity of 290 students accommodation facility.</li> 
<li>To get a seat in Nandini Hostel, Nandini Dairy Farmers childrens should get approved from concerned Milk Dairy Society Board with submitting  necessary documents & that should be verified and attested by concerned District Milk Unions of all over the Karnataka. Afterwards all the documents forwarded from Milk Union will be verified from NDFWT official & approved by the Secretary of the Trust, afterwards student will be accommodated as per the availability of the seat in the hostel.
</li> 
<li>Monthly accommodation and food charges Rs.3000/- per students</li> 
<li>Student monthly fees includes facility of lodging with all necessary amenities & boarding with morning breakfast with milk/coffee, lunch, evening milk/coffee/tea & dinner with nutritious vegetable foods.
</li> 
<li>For the protection purpose, Bio Metric Thumbing Machine has been installed to record incoming and outgoing information of the students.
</li> 
<li>Weekly once health check-up facility has been organized for the students well-being.
</li> 
<li>Fore security of the students, a female warden/security guard has been deployed and CC Cameras has been installed around the hostel.
Also facilitating Library for students.
</li>
<li>For the sake of students physical and mental vitality, Trust facilitating indoor & outdoor sports equipments as per their free time. 
</li>
<li>To give homely feeling to the student all religious festivals, cultural celebration & national festivals etc., are celebrating very well & all the students  are making use of it & staying very happily.
</li>
<li>For the good management of the hostel, committee meeting will be held from time to time.
</li>


                                 </ul> */}

                                


                {hostel?.map((_, id) => {
                return (
                  <div
                    key={id}
                    className="  w-full  rounded-3xl     ">
                    <div className="m-auto">
                      <Fade top>
                      <h1 className="text-primary-main text-xl md:text-3xl text-center ">
                        {' '}
                        {_?.attributes?.title}{' '}
                      </h1>
                      </Fade>
                      <div className="mt-10 p-10">
                        {_?.attributes?.content && (
                          <BlocksRenderer
                            content={_?.attributes?.content}
                            blocks={{
                              paragraph: ({ children }) => <Fade bottom> <p className="text-md">{children}</p></Fade>,
                              heading: ({ children, level }) => {
                                switch (level) {
                                  case 1:
                                    return (
                                      <h1 className="text-2xl text-primary-main mt-5">{children}</h1>
                                    );
                                  case 2:
                                    return <h2 className="text-lg">{children}</h2>;
                                  case 3:
                                    return <h3>{children}</h3>;
                                  case 4:
                                    return <h4>{children}</h4>;
                                  case 5:
                                    return <h5>{children}</h5>;
                                  case 6:
                                    return <h6>{children}</h6>;
                                  default:
                                    return <h1>{children}</h1>;
                                }
                              },
                              list: ({ children }) => {
                                return (
                                  <ul className='list-disc flex-col flex space-y-5'>
                                    {children}
                                  </ul>
                                )
                              },
                              code: ({ children }) => (
                                <h1 className="text-2xl bg-primary-main text-white p-2 shadow-lg">
                                  {children}
                                </h1>
                              )
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })} 
                </div>


            </div>
          </div>
        </div>
      </section>

       
<Footer />
    </div>
  );
}

export default NandiniHostels;
