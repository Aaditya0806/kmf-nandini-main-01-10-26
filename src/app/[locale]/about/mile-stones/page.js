'use client';
import React, { useEffect, useState } from 'react';
 
import 'swiper/css';
import 'swiper/css/navigation';
 
import Footer from '@/components/Footer';
import useApi from '@/hooks/useApi';
 
import useLocale from '@/hooks/useLocale';
import Fade from 'react-reveal'

import { useMyContext } from '@/context/headerContext';
function OrganizationChart() {
  const [mileStones, setMileStone] = useState([]);
  const [selectedYear, setSelectedYear] = useState(1955);
  const [nextYear, setNextYear] = useState(1955);
  const [description, setDescription] = useState([]);
  const pagesToShow = 4; // Number of pagination numbers to show
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = description?.slice(indexOfFirstItem, indexOfLastItem);
 const {isScroll} =useMyContext()
  
  const axios = useApi();
  const locale = useLocale().locale;
  const [openAccordion, setOpenAccordion] = useState(null);

  const handleToggle = (idx, year) => {
    handleYear(year);
    setOpenAccordion(openAccordion === idx ? null : idx);
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/api/milestones?sort[0]=year:asc');
    //   const { data: banner } = await axios.get('/api/milestone-banner');
      const milestones = data?.data?.map((item) => {
        return {
           year: item?.attributes?.year, 
           description: item?.attributes?.description };
      });

      const filterDataDatewise=[
        {
          year:1955,
          description:milestones?.filter(item=>item?.year >= 1955 && item?.year <= 1965)
        },
        {
          year:1965,
          description:milestones?.filter(item=>item?.year >= 1955 && item?.year <= 1965)
        },
        {
          year:1975,
          description:milestones?.filter(item=>item?.year > 1965 && item?.year <= 1975)
        },
        {
          year:1985,
          description:milestones?.filter(item=>item?.year > 1975 && item?.year <= 1985)
        },
        {
          year:1995,
          description:milestones?.filter(item=>item?.year > 1985 && item?.year <= 1995)
        },
        {
          year:2000,
          description:milestones?.filter(item=>item?.year > 1995 && item?.year <= 2000)
        },
        {
          year:2005,
          description:milestones?.filter(item=>item?.year > 2000 && item?.year <= 2005)
        },
        {
          year:2010,
          description:milestones?.filter(item=>item?.year > 2005 && item?.year <= 2010)
        },
        {
          year:2015,
          description:milestones?.filter(item=>item?.year > 2010 && item?.year <= 2015)
        },
        {
          year:2020,
          description:milestones?.filter(item=>item?.year > 2015 && item?.year <= 2020)
        },
        {
          year:2025,
          description:milestones?.filter(item=>item?.year > 2020 && item?.year <= 2025)
        },

      ]
 

      const filterdata = milestones?.filter(
        (item) => parseInt(item.year) >= selectedYear && parseInt(item.year) <= nextYear
      );
      setMileStone(filterDataDatewise);
      setBanner(banner?.data);
      setDescription(filterdata);
      setLoading(false);
    })();

   
  }, [selectedYear, nextYear]);

  const handleYear = (year) => {
    const startYear = Math.min(selectedYear, year);
    const endYear = Math.max(selectedYear, year);

    setSelectedYear(startYear);
    setNextYear(endYear);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationNumbers = () => {
    const totalPages = Math.ceil(description.length / itemsPerPage);
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
          }`}>
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

  return (
    <div className={`w-full h-full absolute top-0 z-[-1] top-36 ${isScroll?'':''}`}>
      <h1 className="text-primary-main w-full max-w-7xl m-auto text-center pt-20 font-heading text-3xl font-extrabold uppercase">
        {locale === 'kn' ? 'ಮೈಲಿಗಲ್ಲು' : 'Milestones'}
      </h1>

      <section className="w-full pb-20 h-auto mb-[150px] m-auto max-w-7xl shadow-lg shadow-gray-600 mt-10">
        {mileStones?.sort((a, b) => b.year - a.year)?.map((item, id) => {
           
          if (id % 2 === 0) {
            return (
              <div className="w-full h-auto" key={id}>
                <div className="w-full mb-10 space-x-5 flex justify-center items-center relative">
                  <div className="relative max-w-60">
                    <div className="w-40 h-40 border-white border-r-secondary-main rounded-[50%] border-[20px] flex justify-center items-center">
                      <div className="w-20 h-20 border-secondary-main rounded-full border-4"></div>
                    </div>

                    <div
                      onClick={() => handleToggle(id, item?.year)}
                      className="milestone-pulse w-5 h-5 flex justify-center items-center absolute bottom-[-25px] left-[120px] rounded-full"></div>
                  </div>

                  <div className="text-5xl font-bold text-secondary-main">{item.year}</div>
                </div>

                {/* inner milestone */}
                <div
                  className={`w-full flex flex-col p-2 max-w-5xl m-auto space-y-6 justify-center items-center mt-[150px] transition-all duration-500 ${
                    openAccordion === id ? 'block' : 'hidden'
                  }`}>
                   
                  {item.description?.sort((a,b)=>b.year-a.year)?.map((item, id) => {
                  
                    if (id % 2 === 0) {
                      return (
                        <Fade bottom key={id}>
                        <div  className="w-full space-x-3 grid grid-cols-2 relative">
                               
                          <div className="flex justify-center items-center">
                            <div className="text-4xl font-bold text-secondary-main pt-2">{item.year}</div>
                            <div className="flex justify-center items-center">
                              <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                              <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                              </div>
                            </div>
                          </div>
                   
                          <div className="w-full max-w-96 m-auto">{item?.description}</div>
                       
                        </div>
                        </Fade>
                      );
                    } else {

                     
                      return (
                        <Fade bottom key={id}>
                        <div key={id} className="w-full grid grid-cols-2 relative">
                          <div className="w-full m-auto max-w-96">{item?.description}</div>
                          <div className="flex justify-center items-center w-full">
                            <div className="flex justify-center items-center">
                              <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                              </div>
                              <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                            </div>
                            <div className="inline-block text-4xl font-bold text-primary-main pt-2">{item.year}</div>
                          </div>
                        </div>
                        </Fade>
                      );
                     
                    }
                  })}
                </div>
              </div>
            );
          } else {
            return (
              
              <div className="w-full h-auto" key={id}>
                <div className="w-full flex justify-center items-center mb-10 space-x-5">
                  <div className="text-5xl font-bold text-primary-main">{item.year}</div>
                  <div className="w-full max-w-60 relative">
                    <div className="w-40 h-40 border-l-primary-main border-white rounded-[50%] border-[20px] flex justify-center items-center">
                      <div className="w-20 h-20 border-primary-main rounded-full border-4"></div>
                    </div>
                    <div
                      onClick={() => handleToggle(id, item?.year)}
                      className="milestone-pulse w-5 h-5 flex justify-center items-center absolute bottom-[-25px] left-[15px] rounded-full"></div>
                  </div>
                </div>

                <div
                  className={`w-full flex flex-col p-2 max-w-5xl m-auto space-y-6 justify-center items-center mt-[150px] transition-all duration-500 ${
                    openAccordion === id ? 'block' : 'hidden'
                  }`}>
                  {item?.description?.sort((a,b)=>b.year-a.year)?.map((item, id) => {
                    if (id % 2 === 0) {
                      return (
                        <Fade bottom key={id}>
                        <div key={id} className="w-full space-x-3 grid grid-cols-2 relative">
                          <div className="flex justify-center items-center">
                            <div className="text-4xl font-bold text-secondary-main pt-2">{item.year}</div>
                            <div className="flex justify-center items-center">
                              <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                              <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                              </div>
                            </div>
                          </div>
                          <div className="w-full max-w-96 m-auto">{item?.description}</div>
                        </div>
                        </Fade>
                      );
                    } else {
                      return (
                        <div key={id} className="w-full grid grid-cols-2 relative">
                          <div className="w-full m-auto max-w-96">{item?.description}</div>
                          <div className="flex justify-center items-center w-full">
                            <div className="flex justify-center items-center">
                              <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                              </div>
                              <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                            </div>
                            <div className="inline-block text-4xl font-bold text-primary-main pt-2">{item.year}</div>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            );
          }
        })}
      </section>

       
<Footer />
    </div>
  );
}

export default OrganizationChart;