import React from 'react';

function DairyTour() {
 
  return (
    <div className="w-full m-auto   h-auto flex flex-col justify-center items-center ">
      <video preload="none"
        src="https://kmf-public.s3.ap-south-1.amazonaws.com/KMF_corporate_ad_new_updated_IDF_12_09_2022_fad98dc011.mp4"
        title="YouTube video player"
        controls
        loop
        muted
        className="w-72 m-auto md:w-full  md:max-w-[1350px]   md:h-[500px]"></video>
    </div>
  );
}

export default DairyTour;
