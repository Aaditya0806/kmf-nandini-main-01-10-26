import useApi from '@/hooks/useApi';
import React from 'react';
 
import { useState, useEffect } from 'react';
import useLocale from '@/hooks/useLocale';
 

function GrowthProcess({ setLoading }) {
  const [growthProcess, setGrowthProcess] = useState([]);
  const [growthProcessHeader, setGrowthProcessHeader] = useState([]);
  const locale = useLocale().locale;

  const axios = useApi();
  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/api/growht-processes?sort[0]=year:asc');

      const { data: growthProcessHeaderData } = await axios.get(
        `/api/growthprocessheaders?sort[0]=createdAt:asc`
      );

      setGrowthProcessHeader(growthProcessHeaderData?.data);
      setGrowthProcess(data?.data);
      setLoading(false);
    })();
  }, []);
  return (
    <div className="w-full flex-col max-w-7xl m-auto mb-10 rounded-md shadow-md  bg-[#FDF9F7]     overflow-auto  items-start justify-start p-10 space-y-5">
      <table className="table-fixed  border-spacing-y-2	 border-collapse border-black border      min-w-full">
        <thead className=" text-center ">
          <tr className="text-[5.6px]   md:text-lg bg-secondary-main   ">
            <th className="p-2 border-r border-black">S.NO</th>
            <th className="p-2 border-r border-black">KEY ITEMS</th>
            <th className="p-2 border-r border-black ">UNIT</th>
            {growthProcess?.map((gp, id) => (
              <th className="w-20 border-r border-black" key={gp?.id}>
                {gp?.attributes?.year}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="text-left  text-[5.6px] md:text-lg">
          {growthProcessHeader.map((header, id) => {
             

            return (
              <tr key={header?.id} className="border-t-2   border-black    ">
                <td className="p-2 text-[5.6px] md:text-lg border-r  border-black uppercase text-center font-content">
                  {id + 1}
                </td>
                <td className="p-2 text-[5.6px] md:text-lg  border-r uppercase text-center border   border-black font-content">
                  {header?.attributes?.header}
                </td>
                <td className="p-2 text-[5.6px] md:text-lg border-r font-content  border-black">
                  {header?.attributes?.unit}
                </td>

                {growthProcess.map((gp, id) => {
                  return<td className="max-w-32 text-[5.6px] md:text-lg border-r border-black  text-center " key={id}>
                    {gp?.attributes[header?.attributes?.key]}
                  </td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default GrowthProcess;
