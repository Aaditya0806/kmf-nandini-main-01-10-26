import React from 'react';
 
import useApi from '@/hooks/useApi';
import { useState,useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Fade, Zoom } from 'react-reveal';
function OngoingAndFuture({ setLoading}) {

  const [futureProjects,setFutureProjects]=useState([])
  const [ongoingProjects,setOngoingProjects]=useState([])
  const axios=useApi()
  const locale=useParams()?.locale
  useEffect(()=>{
    (async()=>{
      const {data}= await axios.get('/api/projects?sort[0]=order:asc')
      const incomingFutureProjects=data?.data?.filter(item=>item?.attributes?.status==='future')
      const incomingOngoingProjects=data?.data?.filter(item=>item?.attributes?.status==='ongoing')
      setFutureProjects(incomingFutureProjects)
      setOngoingProjects(incomingOngoingProjects)
      setLoading(false)
    })()
  },[])

   const futureProjectss = [
  {
    slNo: 1,
    project:
      "Establishment of a new Milk Powder Plant with an approximate outlay of Rs. 300 crores in Ramanagara District to meet surplus milk conversion requirement of southern Karnataka."
  },
  {
    slNo: 2,
    project:
      "Establishment of Milk Powder Plant of 30 MT capacity at Channarayapatna by KMF through NDDB at a cost of Rs. 104 crores."
  },
  {
    slNo: 3,
    project:
      "Supply & erection of silos, construction of housing complex and other essential works at Shikaripura Cattle Feed Plant at a cost of Rs. 15 crores with Government grants."
  },
  {
    slNo: 4,
    project:
      "Construction work of Bengaluru Sales Depot at a cost of Rs. 1.75 crores."
  },
  {
    slNo: 5,
    project:
      "Construction of a godown at a cost of Rs. 5 crores at Rajankunte Cattle Feed Plant."
  },
  {
    slNo: 6,
    project:
      "Ice Cream Plant at Hassan of 10 TLPD capacity at an estimated cost of Rs. 20 crores."
  },
  {
    slNo: 7,
    project:
      "Flexi Pack Plant of 80 TLPD capacity at Belgaum Dairy at an estimated cost of Rs. 20 crores."
  },
  {
    slNo: 8,
    project:
      "Flexi Pack Plant of 80 TLPD capacity at Tumkur Dairy at an estimated cost of Rs. 23 crores."
  },
  {
    slNo: 9,
    project:
      "Flexi Pack Plant of 60–100 TLPD capacity at Koppala Dairy at an estimated cost of Rs. 38 crores."
  },
  {
    slNo: 10,
    project:
      "Flexi Pack Plant of 80 TLPD capacity at Mangalore Dairy at an estimated cost of Rs. 29 crores."
  },
  {
    slNo: 11,
    project:
      "1.5 LLPD capacity UHT Brick Format Plant at Mother Dairy at an estimated cost of Rs. 30 crores."
  },
  {
    slNo: 12,
    project:
      "2 LLPD capacity UHT Brick Format Plant at Hassan Dairy at an estimated cost of Rs. 55 crores."
  },
  {
    slNo: 13,
    project:
      "Development works including fodder production and bull mother farm development at Nandini Sperm Station, Hessaraghatta at a cost of Rs. 4 crores under National Dairy Plan/GOK."
  },
  {
    slNo: 14,
    project:
      "3 LLPD to 5 LLPD capacity Dairy at Davanagere at an estimated cost of Rs. 80 crores."
  },
  {
    slNo: 15,
    project:
      "Mega Dairy at Mysore at an estimated cost of Rs. 160 crores."
  },
  {
    slNo: 16,
    project:
      "New 2 LLPD to 3 LLPD capacity Dairy and 1 LLPD UHT Plant at Chamarajanagara at an estimated cost of Rs. 95 crores."
  },
  {
    slNo: 17,
    project:
      "50 TLPD to 100 TLPD capacity Dairy at Bagalkote at an estimated cost of Rs. 29 crores."
  },
  {
    slNo: 18,
    project:
      "Establishment of UHT Flavoured Milk in PET bottles, Milk Shakes and Paneer Plant in proposed new Product Block at Mother Dairy."
  },
  {
    slNo: 19,
    project:
      "Establishment of Corrugated Box Manufacturing Unit at Challaghatta at an approximate cost of Rs. 15 crores."
  },
  {
    slNo: 20,
    project:
      "Expansion of Nandini Packaging Film Plant at Munnekolala at an approximate cost of Rs. 32 crores."
  },
  {
    slNo: 21,
    project:
      "New Cattle Feed Plant of 500 MTD capacity."
  },
  {
    slNo: 22,
    project:
      "Mega Dairy at Mandya with capacity of 8 to 12 LLPD."
  }
];


const ongoingProjectss = [
  {
    sno: 1,
    projectName:
      "Establishment of Mega Dairy plant of capacity 10–15 Lakh Liters per day with 60 MTPD Powder Plant at Hassan for Hassan Milk Union."
  },
  {
    sno: 2,
    projectName:
      "Establishment of Mega Dairy plant of capacity 10–15 Lakh Liters per day at Tumkur for Tumkur Milk Union."
  },
  {
    sno: 3,
    projectName:
      "Construction of Ladies Hostel building with 400 capacity for Tumkur Milk Union at Tumkur."
  },
  {
    sno: 4,
    projectName:
      "Establishment of Group Captive Solar Power Project including Operation & Maintenance for 25 years for Karnataka Cooperative Milk Producers Federation Limited (KMF) and its member Milk Unions."
  },
  {
    sno: 5,
    projectName:
      "Establishment of Mega Dairy plant of capacity 1 Lakh Liter per day at Arabagonda Village for Haveri Milk Union under Government of Karnataka grants."
  },
  {
    sno: 6,
    projectName:
      "Construction of Boiler House and supply, erection, and commissioning of 5 Ton capacity Boiler to Dempo Dairy at Asangi."
  },
  {
    sno: 7,
    projectName:
      "Revamping of Main Dairy and construction of Mega UHT Godown with Moving Racking System at Hassan for Hassan Milk Union."
  },
  {
    sno: 8,
    projectName:
      "Revamping of Effluent Treatment Plant at Kalburgi Dairy and construction of Nandini Milk Parlours at various locations under Kalburgi Milk Union region."
  },
  {
    sno: 9,
    projectName:
      "Establishment of 5000 Liter capacity Ice Cream Plant at Vijayapura District under PPP mode."
  },
  {
    sno: 10,
    projectName:
      "Establishment of new Cattle Feed Plants at Priyapatnam (Mysore District) and Hospet (Vijaynagara District) under PPP mode to meet increasing cattle feed demand."
  },
  {
    sno: 11,
    projectName:
      "Establishment of a Curd Blast Facility at Mother Dairy Unit, Yelahanka."
  },
  {
    sno: 12,
    projectName:
      "Strengthening and infrastructure development works at various KMF Cattle Feed Plants and other units."
  }
];


  return (
    <div className="w-full flex-col    max-w-5xl m-auto h-full   overflow-auto  items-start justify-start p-10 space-y-5">
  
      <table className="table-fixed  bg-[#FDF9F7] rounded-ld shadow-md border-spacing-y-2	 border-collapse border     min-w-full">
        <thead className=" ">
          <tr className="text-md   bg-secondary-lighter ">
          <th className="p-2">{locale==='en'?'S.NO':'ಕ್ರ.ಸಂ'}</th>
            <th className="p-2 text-start">{locale==='en'?'ONGOING PROJECTS':'ಪ್ರಸ್ತುತ ಯೋಜನೆಗಳು'}</th>
          </tr>
        </thead>



        <tbody className="text-start  text-sm">
          {ongoingProjects?.map((item, idx) => {
         return (
          <tr key={idx}>
            <td className="p-2 text-center text-lg ">{idx+1}</td>
            <Zoom>
            <td className="p-2 text-lg">{item?.attributes?.project_name}</td>
            </Zoom>
          </tr>
        );
         
          })}
        </tbody>
      </table>
    



      <table className="table-auto shadow-md bg-[#FDF9F7] rounded-lg  border-spacing-y-2	 border-collapse border      min-w-full">
        <thead className="  ">
          <tr className="text-md bg-secondary-lighter ">
            <th className="p-2">{locale==='en'?'S.NO':'ಕ್ರ.ಸಂ'}</th>
            <th className="p-2 text-start">{locale==='en'?'FUTURE PROJECTS':'ಭವಿಷ್ಯದ ಯೋಜನೆಗಳು'}</th>
          </tr>
        </thead>

        <tbody className="text-start  text-sm">
          {futureProjects?.map((item, idx) => {
         
            return (
              <tr key={idx} className='border border-2'>
                
                <td className="p-2 text-center text-lg ">{idx+1}</td>
                <Zoom>
                <td className="p-2 text-lg">{item?.attributes?.project_name}</td>
                </Zoom>
              </tr>
            );
          })}
        </tbody>
      </table>



    </div>
  );
}

export default OngoingAndFuture;
