'use client';
import React, { useState, useEffect } from 'react';
import useApi from '@/hooks/useApi';
import { BlocksContent, BlocksRenderer } from '@strapi/blocks-react-renderer';
function HealthCamps() {
  const [heathCamps, setHealthCamps] = useState([]);
  
  const axios = useApi();
  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/api/health-camps')
      setHealthCamps(data.data);
     
    })();
  }, []);
  return (
    <>
      <section className=" relative w-full   h-auto   ">
        <div className="w-full  h-full flex flex-col p-3 space-y-3 lg:flex-row lg:p-10 lg:space-x-10">
          <div className="w-full flex flex-col space-y-2 justify-center items-start    p-1   ">
            <div className="w-full h-full flex justify-center items-center flex-wrap">
              {heathCamps?.map((_, id) => {
                return (
                  <div
                    key={id}
                    className="max-w-3xl w-full m-10 rounded-3xl min-h-[400px] shadow-2xl bg-slate-50 p-16">
                    <div className="m-auto">
                    <div className=' w-full relative flex justify-center items-center'>
            <img loading="lazy" decoding="async" src='/images/heading/heading-color/group.png' className='absolute z-[1] w-[450px] top-[-56px]   object-contain'/>


                        <h1 className="w-full relative max-w-[300px] m-auto text-center  text-primary-main text-xl   z-[100] ">
                          {' '}
                          {_?.attributes?.title}
                        </h1>
                        </div>
 
                      <div className="mt-20">
                        {_?.attributes?.content && (
                          <BlocksRenderer
                            content={_?.attributes?.content}
                            blocks={{
                              paragraph: ({ children }) => <p className="text-md">{children}</p>,
                              heading: ({ children, level }) => {
                                switch (level) {
                                  case 1:
                                    return (
                                      <h1 className="text-2xl text-primary-main">{children}</h1>
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
                                return <li>{children}</li>;
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
      </section>

     
    </>
  );
}

export default HealthCamps;
