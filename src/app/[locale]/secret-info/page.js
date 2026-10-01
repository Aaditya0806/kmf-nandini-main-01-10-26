import React from 'react';
import { Header } from '@/components/Header';
// import img1 from "@/images/pdf/1.png"
// import img2 from "@/images/pdf/2.png"
// import img3 from "@/images/pdf/3.png"
// import img4 from "@/images/pdf/4.png"
// import img5 from "@/images/pdf/5.png"
// import img6 from "@/images/pdf/6.png"
// import img7 from "@/images/pdf/7.png"
// import img8 from "@/images/pdf/8.png"
import img1 from "@/images/scret-new/secret-1.png"
import img2 from "@/images/scret-new/secret-2.png"
import img3 from "@/images/scret-new/secret-3.png"
import img4 from "@/images/scret-new/secret-4.png"
import img5 from "@/images/scret-new/secret-5.png"
import img6 from "@/images/scret-new/secret-6.png"
import img7 from "@/images/scret-new/secret-7.png"
import img8 from "@/images/scret-new/secret-8.png"
import img9 from "@/images/scret-new/secret-9.png"
import img10 from "@/images/scret-new/secret-10.png"
import img11 from "@/images/scret-new/secret-11.png"




function SecretInfo() {
  // const milkData = [
  //   {
  //     SlNo: 1,
  //     Code: 'BB',
  //     title:'Bengaluru Co-operative Milk Union Limited.',
  //     ManufacturingAddress:
  //       'Bengaluru Dairy, Dr.M.H.Marigowda Road, D.R.College Post, Bengaluru – 560 029, Karnataka, India',
  //     LicNo: '10014043000721',
  //     ConsumerCareCell: {
  //       Designation: 'Deputy Manager (Mktg)',
  //       Email: 'mktg@bamulnandini.coop',
  //       TollFreeNo: '1800-425-6797'
  //     }
  //   },
  //   {
  //     SlNo: 2,
  //     Code: 'BH',
  //     title:'Bengaluru Co-operative Milk Union Limited.',
  //     ManufacturingAddress: 'Hosakote Dairy, Bengaluru rural – 562 114, Karnataka, India',
  //     LicNo: '10014043000701',
  //     ConsumerCareCell: {
  //       Designation: 'Deputy Manager (Mktg)',
  //       Email: 'mktg@bamulnandini.coop',
  //       TollFreeNo: '1800-425-6797'
  //     }
  //   },
  //   {
  //     SlNo: 3,
  //     Code: 'BK',
  //     title:'Bengaluru Co-operative Milk Union Limited.',
  //     ManufacturingAddress:
  //       'Nandini Milk Products Complex, A Unit of BAMUL, Survey No. 275/1, Shivanahally, Kanakapura Taluk, Ramanagara – 562 117, Karnataka, India',
  //     LicNo: '10018043002112',
  //     ConsumerCareCell: {
  //       Designation: 'Deputy Manager (Mktg)',
  //       Email: 'mktg@bamulnandini.coop',
  //       TollFreeNo: '1800-425-6797'
  //     }
  //   },
  //   {
  //     SlNo: 4,
  //     Code: 'BG',
  //     title:'Belagavi Co-operative Milk Union Limited.',
  //     ManufacturingAddress: 'Mahantesh Nagar, Belagavi – 590 017, Karnataka, India',
  //     LicNo: '10015043001268',
  //     ConsumerCareCell: {
  //       Designation: 'Marketing officer',
  //       Email: 'mktg@bemul.com',
  //       Phone: '0831-2405760',
  //       TollFreeNo: '1800-425-75655'
  //     }
  //   },
  //   {
  //     SlNo: 5,
  //     Code: 'CH',
  //     title:'Chamarajanagara Co-operative Milk Union Limited.',
      
  //     ManufacturingAddress:
  //       'Kuderu Village, Santhemarahalli Hobli, Chamarajanagara – 571 316, Karnataka',
  //     LicNo: '10018043002160',
  //     ConsumerCareCell: {
  //       Designation: 'Manager(Mktg)',
  //       Email: 'chamulmis@gmail.com',
  //       Phone: '08226-234848'
  //     }
  //   },
  //   {
  //     SlNo: 6,
  //     Code: 'CB',
  //     title:'Chikkaballapura Co-operative Milk Union Limited.',

  //     ManufacturingAddress:
  //       'Mega Dairy, Nandi Cross, Doddamarali Post, Chikkaballapura – 562 103, Karnataka, India',
  //     LicNo: '10017043001879',
  //     ConsumerCareCell: {
  //       Designation: 'Manager(Mktg)',
  //       Email: 'mdchimul2024@gmail.com',
  //       Phone: '7760964560',
  //       TollFreeNo: '1800-425-7576'
  //     }
  //   },
  //   {
  //     SlNo: 7,
  //     Code: 'DM',
  //     title:'Dakshina Kannada Co-operative Milk Union Limited',

  //     ManufacturingAddress: 'Mangalore dairy, Kulashekara, Mangalore – 575 005, Karnataka, India',
  //     LicNo: '10012043000216',
  //     ConsumerCareCell: {
  //       Designation: 'Deputy Manager (Mktg)',
  //       Email: 'mm.dkmul@gmail.com',
  //       Phone: '0824-2230326',
  //       TollFreeNo: '1800-425-9333'
  //     }
  //   },
  //   {
  //     SlNo: 8,
  //     Code: 'DU',
  //     title:'Dakshina Kannada Co-operative Milk Union Limited',

  //     ManufacturingAddress: 'Udupi Dairy, Uggelbettu, Uppooru – 576 105, Udupi, Karnataka, India',
  //     LicNo: '10020043003096',
  //     ConsumerCareCell: {
  //       Designation: 'Deputy Manager (Mktg)',
  //       Email: 'mm.dkmul@gmail.com',
  //       Phone: '0824-2230326',
  //       TollFreeNo: '1800-425-9333'
  //     }
  //   },
  //   {
  //     SlNo: 9,
  //     Code: 'DA',
  //     title:'Dharwad, Gadag & Uttarkannada Co-operative Milk Union Limited',

  //     ManufacturingAddress:
  //       'Product Dairy, KIADB Lakkamanahalli, Industrial Area, Dharwad – 580 004, Karnataka, India',
  //     LicNo: '10014043000750',
  //     ConsumerCareCell: {
  //       Designation: 'Manager(Mktg)',
  //       Email: 'dhamulmkt@gmail.com',
  //       Phone: '0836-2467643',
  //       TollFreeNo: '1800-425-0447'
  //     }
  //   },
  //   {
  //     SlNo: 10,
  //     Code: 'DD',
  //     title:'KMF Dempo Dairy Limited.',

  //     ManufacturingAddress:
  //       'Asangi Village, Rabakavi- Banahatti, Bagalkote – 587 311, Karnataka, India',
  //     LicNo: '10012043000255',
  //     ConsumerCareCell: {
  //       Designation: 'Deputy Manager (Mktg)',
  //       Email: 'dempodairy@yahoo.co.in',
  //       Phone: '9591806252'
  //     }
  //   },
  //   {
  //     SlNo: 11,
  //     Code: 'HA',
  //     title:'Hassan Co-operative Milk Union Limited.',

  //     ManufacturingAddress:
  //       'Main Dairy, Industrial Estate, B.M Road, Hassan – 573 201, Karnataka, India',
  //     LicNo: '10013043000493',
  //     ConsumerCareCell: {
  //       Designation: 'Deputy Manager (Mktg)',
  //       Email: 'hamul77@yahoo.co.in',
  //       Phone: '08172-240609',
  //       TollFreeNo: '1800-425-5075'
  //     }
  //   },
  //   {
  //     SlNo: 12,
  //     Code: 'HK',
  //     title:'Hassan Co-operative Milk Union Limited.',

  //     ManufacturingAddress: 'Kudige Dairy, Somawarpet Taluk, Kodagu – 571 232, Karnataka, India',
  //     LicNo: '11215319000064',
  //     ConsumerCareCell: {
  //       Designation: 'Deputy Manager (Mktg)',
  //       Email: 'hamul77@yahoo.co.in',
  //       Phone: '08172-240609',
  //       TollFreeNo: '1800-425-5075'
  //     }
  //   },
  //   {
  //     SlNo: 13,
  //     Code: 'SH',
  //     title:'SKA Foods Speciality Private Limited.',

  //     ManufacturingAddress:
  //       'Dairy Plant with UHT Milk Plant, Survey No. 5/2, Jangamanakoppa Village, Karajagi Hobli, Agadi Post, Haveri – 581 128, Karnataka, India',
  //     LicNo: '11223999000010',
  //     ConsumerCareCell: {
  //       Designation: 'Assistant Manager(Mktg)',
  //       Email: 'mkthavemul@gmail.com',
  //       Phone: '08375-200650'
  //     }
  //   },
  //   {
  //     SlNo: 14,
  //     Code: 'KH',
  //     title:'Kalaburagi – Bidar & Yadgir Co-operative Milk Union Limited.',
      
  //     ManufacturingAddress: 'Humnabad, Kalaburagi – 585 104, Karnataka, India',
  //     LicNo: '10013043000520',
  //     ConsumerCareCell: {
  //       Designation: 'Deputy Manager (Mktg)',
  //       Email: 'gumulmktg@gmail.com',
  //       TollFreeNo: '1800-425-8193'
  //     }
  //   },
  //   {
  //     SlNo: 15,
  //     Code: 'KB',
  //     title:'Kalaburagi – Bidar & Yadgir Co-operative Milk Union Limited.',

  //     ManufacturingAddress: 'Bidar Dairy, Janawada Road, Bidar – 585 401, Karnataka, India',
  //     LicNo: '11215306000817',
  //     ConsumerCareCell: {
  //       Designation: 'Deputy Manager (Mktg)',
  //       Email: 'gumulmktg@gmail.com',
  //       TollFreeNo: '1800-425-8193'
  //     }
  //   },
  //   {
  //     SlNo: 16,
  //     Code: 'KD',
  //     title:'Kolar Co-operative Milk Union Limited.',

  //     ManufacturingAddress: 'Kolar Dairy, NH 75, Huttur Post, Kolar – 563 102, Karnataka, India',
  //     LicNo: '10012043000195',
  //     ConsumerCareCell: {
  //       Designation: 'Manager(Mktg)',
  //       Email: 'komulmd@yahoo.co.in',
  //       Phone: '7760964557',
  //       TollFreeNo: '1800-425-2350'
  //     }
  //   },
  //   {
  //     SlNo: 17,
  //     Code: 'MY',
  //     title:'Mysore Co-operative Milk Union Limited',

  //     ManufacturingAddress: 'Allanahalli Village, Mysore – 570 028, Karnataka, India',
  //     LicNo: '10019043002527',
  //     ConsumerCareCell: {
  //       Designation: 'Manager(Mktg)',
  //       Email: 'mismymul@gmail.com',
  //       Phone: '0821-2474000',
  //       TollFreeNo: '1800-425-7300'
  //     }
  //   },
  //   {
  //     SlNo: 18,
  //     Code: 'MYD',
  //     title:'Mysore District Co-operative Milk Producers Societies Union Limited',

  //     ManufacturingAddress:
  //       'Main Dairy Complex, Male Mahadeshwara road, Siddarthanagara, Mysuru-570 011, Karnataka, India',
  //     LicNo: '11224999000439',
  //     ConsumerCareCell: {
  //       Designation: 'Manager(Mktg)',
  //       Email: 'mismymul@gmail.com',
  //       Phone: '0821-2474000',
  //       TollFreeNo: '1800-425-7300'
  //     }
  //   },
  //   {
  //     SlNo: 19,
  //     Code: 'MA',
  //     title:'Mandya Co-operative Milk Union Limited',

  //     ManufacturingAddress: 'Product Dairy, Gejjalagere – 571 428, Mandya, Karnataka, India',
  //     LicNo: '10012043000208',
  //     ConsumerCareCell: {
  //       Designation: 'Manager(Mktg)',
  //       Email: 'manmul1987@gmail.com',
  //       Phone: '9513888244',
  //       TollFreeNo: '1800-425-6592'
  //     }
  //   },
  //   {
  //     SlNo: 20,
  //     Code: 'MK',
  //     title:'Mandya Co-operative Milk Union Limited',

  //     ManufacturingAddress:
  //       'UHT Milk Plant, Kumbalagodu, Plot No. 13 A&B. KIADB Industrial Area, Kengeri Hobli, Bengaluru – 560 074, Karnataka, India',
  //     LicNo: '10013043000511',
  //     ConsumerCareCell: {
  //       Designation: 'Manager(Mktg)',
  //       Email: 'manmul1987@gmail.com',
  //       Phone: '9513888244',
  //       TollFreeNo: '1800-425-6592'
  //     }
  //   },
  //   {
  //     SlNo: 21,
  //     Code: 'MD',
  //     title:'Mother Dairy, A Unit of KMF',

  //     ManufacturingAddress: 'GKVK Post, Yelahanka, Bengaluru – 560 065, Karnataka, India',
  //     LicNo: '10012043000211',
  //     ConsumerCareCell: {
  //       Designation: 'Manager(Mktg)',
  //       Email: 'tellus@motherdairykmf.in',
  //       Phone: '080 - 28460175',
  //       TollFreeNo: '1800-425-0175'
  //     }
  //   },
  //   {
  //     SlNo: 22,
  //     Code: 'NP',
  //     title:'Nandini Milk Products',

  //     ManufacturingAddress:
  //       'KMF Complex, Dr.M.H.Marigowda Road, Bengaluru – 560 029, Karnataka, India',
  //     LicNo: '10014043000707',
  //     ConsumerCareCell: {
  //       Designation: 'Manager(QA)',
  //       Email: 'kmf.nmp@kmf.coop',
  //       Phone: '080-25536003'
  //     }
  //   },
  //   {
  //     SlNo: 23,
  //     Code: 'NC',
  //     title:'Nandini Hi-Tech Product Plant',

  //     ManufacturingAddress:
  //       'Shettihalli Village, Janivara (Post), Channarayapatna Taluk, Hassan – 573 116, Karnataka, India',
  //     LicNo: '10013043000517',
  //     ConsumerCareCell: {
  //       Designation: 'Manager(Mktg)',
  //       Email: 'mpp_crp@yahoo.com',
  //       Phone: '08176 - 254268',
  //       TollFreeNo: '1800-425-5076'
  //     }
  //   },
  //   {
  //     SlNo: 24,
  //     Code: 'NR',
  //     title:'Nandini Hi-Tech Mega Powder Plant',

  //     ManufacturingAddress:
  //       'Kannamangala village, Kasaba Hobli, Kanva Post, Channapatna Taluk, Ramanagara – 562 108, Karnataka',
  //     LicNo: '10019043002926',
  //     ConsumerCareCell: {
  //       Designation: 'Manager',
  //       Email: 'kmfgmrpp@gmail.com',
  //       Phone: '9606012526'
  //     }
  //   },
  //   {
  //     SlNo: 25,
  //     Code: 'RB',
  //     title:'Raichur, Ballari, Koppal & Vijayanagara Co-operative Milk Union Limited',

  //     ManufacturingAddress:
  //       'Ballari Dairy, Sanjay Gandhinagar, Cantonment, Ballari – 583 104, Karnataka, India',
  //     LicNo: '10013043000643',
  //     ConsumerCareCell: {
  //       Designation: 'Deputy Manager (Mktg)',
  //       Email: 'mdrbkmul@gmail.com',
  //       Phone: '08392-266108',
  //       TollFreeNo: '1800-425-6108'
  //     }
  //   },
  //   {
  //     SlNo: 26,
  //     Code: 'RR',
  //     title:'Raichur, Ballari, Koppal & Vijayanagara Co-operative Milk Union Limited',

  //     ManufacturingAddress: 'Raichur Dairy, Raichur – 584 134, Karnataka, India',
  //     LicNo: '11219324000117',
  //     ConsumerCareCell: {
  //       Designation: 'Deputy Manager (Mktg)',
  //       Email: 'mdrbkmul@gmail.com',
  //       Phone: '08392-266108',
  //       TollFreeNo: '1800-425-6108'
  //     }
  //   },
  //   {
  //     SlNo: 27,
  //     Code: 'BU',
  //     title:'Raichur, Ballari, Koppal & Vijayanagara Co-operative Milk Union Limited',

  //     ManufacturingAddress: 'Budagumpa Dairy, Koppal – 583 228, Karnataka, India',
  //     LicNo: '10018043002051',
  //     ConsumerCareCell: {
  //       Designation: 'Deputy Manager (Mktg)',
  //       Email: 'mdrbkmul@gmail.com',
  //       Phone: '08392-266108',
  //       TollFreeNo: '1800-425-6108'
  //     }
  //   },
  //   {
  //     SlNo: 28,
  //     Code: 'SS',
  //     title:'Shivamogga, Davanagere & Chitradurga Co-operative MilkUnion Limited.',

  //     ManufacturingAddress:
  //       'Shivamogga Dairy, Machenahalli , Nidige Post, Shivamogga – 577 222, Karnataka, India',
  //     LicNo: '10012043000196',
  //     ConsumerCareCell: {
  //       Designation: 'Manager(Mktg)',
  //       Email: 'md_shimul@yahoo.com',
  //       Phone: '08182-246344'
  //     }
  //   },
  //   {
  //     SlNo: 29,
  //     Code: 'SD',
  //     title:'Shivamogga, Davanagere & Chitradurga Co-operative MilkUnion Limited.',
      
  //     ManufacturingAddress:
  //       'Davanagere Dairy, Doddabathi Post, Davanagere – 577 566, Karnataka, India',
  //     LicNo: '10012043000202',
  //     ConsumerCareCell: {
  //       Designation: 'Manager(Mktg)',
  //       Email: 'md_shimul@yahoo.com',
  //       Phone: '08182-246344'
  //     }
  //   },
  //   {
  //     SlNo: 30,
  //     Code: 'DS',
  //     title:'Sirsi Dairy Private Limited.',

  //     ManufacturingAddress:
  //       'Survey No. 41, Hanumanti Village, Kumata Road, Sirsi – 581 450, Karnataka, India',
  //     LicNo: '11221329000351',
  //     ConsumerCareCell: {
  //       Designation: 'Manager(Mktg)',
  //       Email: 'dhamulmkt@gmail.com',
  //       Phone: '0836-2467643',
  //       TollFreeNo: '1800-425-0447'
  //     }
  //   },
  //   {
  //     SlNo: 31,
  //     Code: 'TD',
  //     title:'Tumkur Co-operative Milk Union Limited.',

  //     ManufacturingAddress: 'B.H Road, Mallasandra, Tumkur – 572 107, Karnataka, India',
  //     LicNo: '10012043000242',
  //     ConsumerCareCell: {
  //       Designation: 'Manager(Mktg)',
  //       Email: 'mdtmu@yahoo.com',
  //       Phone: '0816-2206297',
  //       TollFreeNo: '1800-425-6088'
  //     }
  //   },
  //   {
  //     SlNo: 32,
  //     Code: 'VV',
  //     title:'Vijayapur & Bagalkot Co-operative Milk Union Limited.',

  //     ManufacturingAddress: 'Vijayapur Dairy, Butanal, Vijayapur – 586 103, Karnataka, India',
  //     LicNo: '10020043003402',
  //     ConsumerCareCell: {
  //       Designation: 'Manager(Mktg)',
  //       Email: 'bimulmktg@gmail.com',
  //       Phone: '9591999483',
  //       TollFreeNo: '1800-425-1949'
  //     }
  //   },
  //   {
  //     SlNo: 33,
  //     Code: 'VB',
  //     title:'Vijayapur & Bagalkot Co-operative Milk Union Limited.',

  //     ManufacturingAddress: 'Bagalkot Dairy, Vijayapur – 587 102, Karnataka, India',
  //     LicNo: '11215301000249',
  //     ConsumerCareCell: {
  //       Designation: 'Manager(Mktg)',
  //       Email: 'bimulmktg@gmail.com',
  //       Phone: '9591999483',
  //       TollFreeNo: '1800-425-1949'
  //     }
  //   },
  //   {
  //     SlNo: 34,
  //     Code: 'BI',
  //     title:'Nandini Ice Cream Plant',

  //     ManufacturingAddress:
  //       'Nandini Ice Cream Plant, A Unit of KMF, Sanjay Gandhi Nagar, Cantonment, Ballari – 583 104, Karnataka, India',
  //     LicNo: '11214305000123',
  //     ConsumerCareCell: {
  //       Designation: ' ',
  //       Email: ' ',
  //       Phone: ' ',
  //       TollFreeNo: ' '
  //     }
  //   },
   
  // ];
  return (
    <div className="w-full h-full">
      <div className="container flex flex-col justify-center items-center mx-auto my-8 ">
        <img loading="lazy" decoding="async" src={img1.src} alt="" />
        <img loading="lazy" decoding="async" src={img2.src} className='mt-[-2px]' alt="" />
        <img loading="lazy" decoding="async" className='ml-[-2px]' src={img3.src} alt="" />
        <img loading="lazy" decoding="async"  src={img4.src} alt="" />
        <img loading="lazy" decoding="async" className='ml-[7px] mt-[-4px]' src={img5.src} alt="" />
        <img loading="lazy" decoding="async" className='mt-[-24px] ml-[5px] ' src={img6.src} alt="" />
        <img loading="lazy" decoding="async" className='ml-[4px]' src={img7.src} alt="" />
        <img loading="lazy" decoding="async" className='ml-[4px]' src={img8.src} alt="" />
        <img loading="lazy" decoding="async" className='ml-[4px]' src={img9.src} alt="" />
        <img loading="lazy" decoding="async" className='ml-[4px]' src={img10.src} alt="" />
        <img loading="lazy" decoding="async" className='ml-[4px]' src={img11.src} alt="" />

        {/* <h1 className="text-2xl font-bold text-center mb-4">Milk Union Data</h1> */}

    
        {/* <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border border-gray-300">Sl. No</th>
                <th className="px-4 py-2 border border-gray-300">Code</th>
                <th className="px-4 py-2 border border-gray-300">Manufacturing Address</th>
              </tr>
            </thead>
            <tbody>
              {milkData.map((data) => (
                <tr key={data.SlNo}>
                  <td className="px-4 py-2 border border-gray-300 text-center">{data.SlNo}</td>
                  <td className="px-4 py-2 border border-gray-300 text-center">{data.Code}</td>
                  <td className="px-4 py-2 border border-gray-300">
                    <strong>{data.title}</strong>
                    <p>{data.ManufacturingAddress}</p>  
                    <strong>LIC NO: {data.LicNo}</strong> <br/>
                     <p>ConsumerCareCell: {data?.ConsumerCareCell.Designation || ''}</p>  
                    <p>e-mail: {data?.ConsumerCareCell.Email}</p> 
                    <p> Ph: {data?.ConsumerCareCell.Phone}</p>  
                    <p> Toll Free No.: {data?.ConsumerCareCell.TollFreeNo}</p>  
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}
      </div>
    </div>
  );
}

export default SecretInfo;
