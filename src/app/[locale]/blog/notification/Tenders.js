import React, { useState } from 'react';
import Link from 'next/link';
import formatDateToDDMMYY from '@/lib/api/formatDate';
import { trackFileDownload } from '@/lib/analytics';

function Tenders({ title, tenderNo, date, link, startDate }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const openPreview = () => {
    if (!link) return;
    trackFileDownload(link);
    setIsPreviewOpen(true);
  };

  const closePreview = () => setIsPreviewOpen(false);

  return (
    <ul role="list" className="divide-y  bg-white divide-gray-100 w-full border-b-2 shadow-md p-3 border-primary-main  ">

      <li className="flex justify-between gap-x-6 py-5">
        <div className="flex min-w-0 gap-x-4">

          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">{title}</p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{tenderNo}</p>
            <div className='flex space-x-4'>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">Start Date: {formatDateToDDMMYY(startDate)}</p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">Last Date: {formatDateToDDMMYY(date)}</p>
            </div>

          </div>
        </div>
        <div className=" shrink-0  flex  flex-row  items-end  justify-end gap-2">
         {link ? (
           <button onClick={openPreview} className="text-sm leading-6 cursor-pointer bg-primary-gradient p-2 text-white"> Review </button>
         ) : (
           <span aria-disabled="true" className="text-sm leading-6 bg-gray-300 p-2 text-white cursor-not-allowed opacity-60 pointer-events-none"> Review </span>
         )}
         {link ? (
           <Link href={link} className="text-sm leading-6 cursor-pointer bg-primary-gradient p-2   text-white" download target='blank'> Download </Link>
         ) : (
           <span aria-disabled="true" className="text-sm leading-6 bg-gray-300 p-2 text-white cursor-not-allowed opacity-60 pointer-events-none"> Download </span>
         )}
        </div>
      </li>

      {isPreviewOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4"
          onClick={closePreview}
        >
          <div
            className="relative bg-white w-full max-w-4xl h-[70vh] md:h-[90vh] rounded shadow-lg flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-3 border-b">
              <p className="text-sm font-semibold text-gray-800 truncate pr-4">{title}</p>
              <button
                onClick={closePreview}
                className="text-gray-700 hover:text-black text-2xl leading-none px-2"
                aria-label="Close preview"
              >
                &times;
              </button>
            </div>
            <iframe
              src={link}
              title={title || 'PDF Preview'}
              className="w-full h-full flex-1"
            />
          </div>
        </div>
      )}

  </ul>
  );
}

export default Tenders;
