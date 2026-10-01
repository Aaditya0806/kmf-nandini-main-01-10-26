import { trackFileDownload } from '@/lib/analytics';
import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'; // Required for CSS styles
import './style.css'; // Custom CSS file for styling

// Set worker URL for pdf.js
 

function PdfPreview({ pdfUrl }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="pdf-preview-container shadow-lg shadow-black  ">
      <Document
        file={pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page
          pageNumber={pageNumber}
          className="pdf-preview-page"
          width={400}
        />
      </Document>
      <div className="pdf-preview-options flex flex-col justify-center items-center text-sm gap-2">
        <div className='flex'>
        <p className="page-number">Page {pageNumber} of {numPages}</p>
<div className='flex justify-center items-center space-x-3'>
<button className='text-sm  rounded-full w-5 h-5 flex items-center justify-center cursor-pointer bg-primary-gradient p-1 text-white  ' onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber <= 1}>&lt;</button>
<button className='text-sm  rounded-full w-5 h-5 flex items-center justify-center cursor-pointer bg-primary-gradient p-1 text-white  ' onClick={() => setPageNumber(pageNumber + 1)} disabled={pageNumber >= numPages}>&gt;</button>
</div>

        </div>

<div className='flex justify-center items-center space-x-3 m-2 '>
<button className="text-sm  cursor-pointer bg-primary-gradient p-2 text-white  " onClick={() => { trackFileDownload(pdfUrl); window.open(pdfUrl, '_blank'); }}>View Fullscreen</button>
        <a className="text-sm  cursor-pointer bg-primary-gradient p-2 text-white  " href={pdfUrl} download >Download PDF</a>
</div>

      </div>
    </div>
  );
}

export default PdfPreview;
