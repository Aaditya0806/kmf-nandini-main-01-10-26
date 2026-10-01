import React from 'react'
import calenderIco from '@/images/homeImages/notification/calender.svg';
import Link from 'next/link';
import { useParams } from 'next/navigation';

function TenderNotification({date,title,link}) {
  const inputDate = new Date(date);

  // Get the month name and day number
  const options = { month: 'long', day: 'numeric' };
  const formattedDate = inputDate.toLocaleDateString('en-US', options);
  
  // Extract month and day from the formatted date
  const [monthName, dayNumber] = formattedDate.split(' ');
  
  // Create the desired object
  const resultObject = {
    month: monthName,
    day: parseInt(dayNumber, 10),
  };

 const locale=useParams().locale
  return (
 
    <div className="w-full flex flex-col space-y-4 justify-center items-center bg-white p-5 rounded-lg border-b-2 border-primary-main sm:flex-row sm:justify-between">
    <div className=" w-full flex items-center space-x-3">
      <div className="relative ">
        <img loading="lazy" decoding="async" src={calenderIco.src} className="w-20 h-16" />
        <div className="absolute flex flex-col justify-center items-center left-5  top-5 sm:left-7  ">
          <p className="text-xs">{resultObject.day}</p>
          <p className="text-xs uppercase">{resultObject.month?.substring(0,3)}</p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-start">
        <h1>{locale==='en'?"Tender Notificaiton":`
ಟೆಂಡರ್ ಅಧಿಸೂಚನೆ`}</h1>
        <p className=" text-sm text-neutral-dark1">
          {title}
        </p>
      </div>
    </div>

    <div className="">
      <Link href={link}>
        <button className="w-40 h-5 border border-primary-main p-5 flex items-center justify-center text-primary-main rounded-md">
        {locale==='en'?"View all":`
ಎಲ್ಲಾ ವೀಕ್ಷಿಸಿ`}
        </button>
      </Link>
    </div>
  </div>
  )
}

export default TenderNotification