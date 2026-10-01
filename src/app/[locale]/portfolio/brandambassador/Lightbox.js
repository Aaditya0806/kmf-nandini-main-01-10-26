// Lightbox.js
import React from 'react';

const Lightbox = ({ videoUrl, onClose }) => {
  return (
    <div className='fixed top-0 left-0 w-full h-[100Vh] bg-black  z-[100]'>
        <div className='relative z-[1000] w-full h-full flex justify-center items-center'>
    <div className="" onClick={onClose}>
      <div className=' w-full h-full  bg-black'>

      </div>
      <div className=" ">
       
        <video className="" controls autoPlay>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Lightbox;
