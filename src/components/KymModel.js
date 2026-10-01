'use client'
// TenderDetailsModal.jsx

import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Rodal from 'rodal';


const KnmModel = ({ closeModal,kymMilk ,close}) => {
  const [windowWidht,setWindowWidth]=useState(null)
  useEffect(()=>{
      const w=window.innerWidth;
      if(w>700){
        setWindowWidth(600)
      }
      else{
        setWindowWidth(400)
      }
  },[])
 

  return (

    <Rodal visible={closeModal} onClose={()=>close(!closeModal)} animation='door'  className='overflow-auto w-full z-[10]' height={500} width={windowWidht}  >
    <div className='w-full h-full p-4 relative   flex flex-col justify-center items-center space-y-5 overflow-auto'>

      <div className='w-full h-[10%]'>

    
        <h1 className='text-xl text-primary-main'>{kymMilk?.attributes?.title}</h1>
        </div>


        {/* <div className='w-full h-[60%]  '>
          <img loading="lazy" decoding="async" src={kymMilk?.attributes?.image?.data?.attributes?.url} className='w-full max-w-[90%] h-full object-containf  m-auto'/>
        </div> */}

      <div className='w-full h-[70%]  '>
     {kymMilk?.attributes?.description && (
                    <BlocksRenderer
                      content={
                        kymMilk?.attributes?.description
                      }
                      blocks={{
                        // You can use the default components to set class names...
                        paragraph: ({ children }) => (
                          <p className="text-neutral900 text-justify w-full">{children}</p>
                        ),
                        // ...or point to a design system
                        heading: ({ children, level }) => {
                          switch (level) {
                            case 1:
                              return <h1 className="text-xl text-primary-main">{children}</h1>;
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
                        code: ({ children }) => {
                          const columns =
                            children?.[0]?.props?.text.split(',')[0].trim() === 'columns'
                              ? children?.[0]?.props?.text.split(',').slice(1)
                              : [];

                          return (
                            <table className="table-fixed  border-spacing-y-2	 border-collapse border-black border      w-full ">
                              <thead className=" text-left ">
                                {columns?.map((item, id) => {
                                   
                                    return (
                                      <th className="p-2   border-r border-black " key={id}>
                                        {item}
                                      </th>
                                    );
                                  
                                 
                                })}
                              </thead>
                              <tbody className="text-left  text-md ">
                                <tr className="w-full ">
                                  {children?.[0]?.props?.text.split(',')[0].trim() !== 'columns' &&
                                    children?.[0]?.props?.text?.split(',')?.map((item, id) => {
                                       
                                        return (
                                          <td
                                            className=" p-2 text-sm font-content border-r border-black "
                                            key={id}>
                                            {' '}
                                            {item}
                                          </td>
                                        );
                                      
                                  
                                    })}
                                </tr>
                              </tbody>
                            </table>
                          );
                        },
                        list:({children})=>{
                          return <ul className='flex flex-col justify-start items-start space-y-2 list-disc pt-3'>
                            {children}
                            </ul>
                        },

                        image:({image})=>{
                          return <img loading="lazy" decoding="async" src={image.url} className='max-w-[300px] m-auto'/>
                        },
                        // For links, you may want to use the component from your router or framework
                        link: ({ children, url }) => <Link to={url}>{children}</Link>
                      }}
                    />
                  )}
      </div>
      

    </div>
   </Rodal>
  );
};

export default KnmModel;