'use client'
import React,{useEffect,useState} from 'react'
import useApi from '@/hooks/useApi';
import Link from 'next/link';
import useLocale from '@/hooks/useLocale';
import { Fade } from 'react-reveal';
 

function BlogCard() {
    const [blogs,setBlogs]=useState([])
    const axios=useApi()
    const monthsName=['January','February','March','April','May','June','July','August','September','October','November','December']
    const locale=useLocale().locale
    const [itemShow,setItemShow]=useState(10)
    useEffect(() => {
        (async () => {
          const { data } = await axios.get('/api/blog-posts?sort[0]=date:desc');
     
          setBlogs(data.data);
          
     
        })();
      }, []);
    
  return (
    <div className='w-full h-full mb-20  '>

        {
            blogs?.map((item,id)=>{
                if(id<itemShow){
                    return(
                        <div key={id} className='w-full flex flex-col md:flex-row  space-y-5 md:space-x-5 p-10 justify-center items-center'>
                            <Fade left>
                        <Link href={`/${locale}/blog/${item?.id}`} className='w-40 h-20 flex flex-col justify-center items-center transition-all duration-300 border hover:scale-[1.2]'>
                                <p className='text-xl'>{new Date(item?.attributes?.date).getDate()}</p>
                                <div className='flex justify-center items-center text-sm text-slate-500'>
                                    <p >{monthsName[new Date(item?.attributes?.date).getMonth()]}</p>-<p>{new Date(item?.attributes?.date).getFullYear()}</p>
                                </div>
                        </Link>
                                </Fade>

                                <Fade right>
                        <div className='w-full text-center md:text-start'>
                          
                                <h1 className='text-xl text-primary-main'>{item?.attributes?.title}</h1>
                                {item?.attributes?.content?.map((items,idx)=>{
                                    if(idx==0){
                                        return(

                                            <p key={idx} className='text-slate-500 text-justify'>{items?.children[0]?.text}</p>
                                        )
                                    }
                                   
                                })}
                             
                                <Link href={`/${locale}/blog/${item?.id}`} className='hover:text-green-500 uppercase'>{locale==='kn'?'ಮತ್ತಷ್ಟು ಓದಿ':'Read More...'}</Link>
                        </div>
                        </Fade>
                </div>
                    )
                }
                
                
            })
        }

    <div className='w-full flex justify-center items-center'>
        <button onClick={()=>setItemShow(prev=>prev+15)} className=' w-full max-w-32 h-10 bg-green-500 text-white  shadow-md rounded-md'>{locale==='kn'?'ಮತ್ತಷ್ಟು ಓದಿ':'Load More...'}</button>
    </div>
          
    </div>
  )
}

export default BlogCard