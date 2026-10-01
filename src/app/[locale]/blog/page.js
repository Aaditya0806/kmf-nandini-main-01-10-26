'use client';

import React,{useState,useEffect} from 'react';
import AboutHeroImg from '@/images/about/mission/about-hero.png';
 
import Footer from '@/components/Footer';
import useApi from '@/hooks/useApi';
 

function Blog() {

  const axios = useApi();
  const[blogs,setBlogs]=useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = blogs?.slice(indexOfFirstItem, indexOfLastItem);
  const pagesToShow = 4; // Number of pagination numbers to show
  const [loading,setLoading]=useState(true)
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ... (existing code)

  const handleBlogItem = (blogDetails) => {
 
    setSelectedBlog(blogDetails);
    setIsModalOpen(true);
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/api/blog-posts?sort[0]=date:desc');
 
      setBlogs(data.data);
      setLoading(false)
 
    })();
  }, []);

 
  const renderPaginationNumbers = () => {
    const totalPages = Math.ceil(blogs?.length / itemsPerPage);
    const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

    const paginationNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      paginationNumbers.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`mx-1 px-3 py-1 rounded ${
            currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
          }`}
        >
          {i}
        </button>
      );
    }

    if (startPage > 1) {
      paginationNumbers.unshift(<span key="ellipsis-start">...</span>);
    }

    if (endPage < totalPages) {
      paginationNumbers.push(<span key="ellipsis-end">...</span>);
    }

    return paginationNumbers;
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="w-full h-full absolute top-36 z-[-1]  ">
      <section className={`w-full  h-80 pt-28 relative  grid place-items-center company-bg `}>
        <img loading="lazy" decoding="async" src={AboutHeroImg.src} className="w-full h-full object-cover absolute top-0 z-[-1]" />
      </section>

      <section className="w-full h-auto pt-10 relative    ">

      <h1 className='text-2xl font-heading text-center w-full shadow-md p-3 shadow-black bg-primary-gradient  text-white '>LATEST NEWS</h1>
        <div className="relative z-[100] w-4/5 m-auto flex flex-wrap justify-evenly items-center gap-6 p-3   ">
           

{currentProducts?.map((item,id)=>{
  if(id % 2 == 0){
    return(
       
      <div className='w-full p-2 lg:p-10 bg-[#ededed]' key={id}>
      <div className=' w-full flex flex-col lg:flex-row  p-6 md:p-10 m-auto'>
          <div className=' w-[100%] lg:w-[50%] flex justify-center items-center'>
              <img loading="lazy" decoding="async" className=' h-72 md:h-96 w-96' src={item?.attributes?.image?.data?.attributes?.url} alt="" />
          </div>
          <div className=' w-[100%] lg:w-[50%] '>
              <h1 className='text-primary-main text-2xl md:text-4xl  lg:text-5xl mt-5 lg:mt-0 text-center lg:text-start'>{item?.attributes?.title} </h1>
         
                {item?.attributes?.content?.map((item,id)=>{
                  return(
                    <p className='mt-10  md:text-lg' key={id}>
                      {item?.children[0].text}
                      </p>
                  )
                })}
 
        
  
          </div>
      </div>
  </div>
    )
  }
  else{
    return(
      <div className=' w-full h-full ' key={id}>

     
      <div className='relative w-full p-2 lg:p-10 bg-white' key={id}>
      <div className=' w-full flex flex-col lg:flex-row  p-6 md:p-10 m-auto'>
          <div className=' w-[100%] lg:w-[50%] flex justify-center items-center'>
              <img loading="lazy" decoding="async" className=' h-72 md:h-96 w-96' src={item?.attributes?.image?.data?.attributes?.url} alt="" />
          </div>
          <div className=' w-[100%] lg:w-[50%] '>
              <h1 className='text-primary-main text-2xl md:text-4xl  lg:text-5xl mt-5 lg:mt-0 text-center lg:text-start' >{item?.attributes?.title} </h1>
         
                {item?.attributes?.content?.map((item,id)=>{
                  return(
                    <p className='mt-10  md:text-lg' key={id}>
                      {item?.children[0].text}
                      </p>
                  )
                })}
        
  
          </div>
      </div>
      <div className=' md:w-72 h-5  md:h-10 bg-red-600 absolute z-[-10] top-[50%] left-[-20%] '>
                 
                 </div>
                 <div className=' md:w-72 h-5  md:h-10 bg-red-600 absolute z-[-10] top-[50%] right-[-20%] '>
                            
                 </div>
  </div>

  </div>
    )
   
  }

})}

          


          
        </div>

        <div className="flex justify-center items-center mt-10 pb-10 space-x-2 ">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="mx-1 px-3 py-1 rounded font-heading bg-gray-300 text-gray-800"
          >
            Previous
          </button>

          {renderPaginationNumbers()}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(blogs?.length / itemsPerPage)}
            className="mx-1 px-3 py-1 font-heading rounded bg-gray-300 text-gray-800"
          >
            Next
          </button>
        </div>
      </section>
       
       
<Footer />
    </div>
  );
}

export default Blog;
