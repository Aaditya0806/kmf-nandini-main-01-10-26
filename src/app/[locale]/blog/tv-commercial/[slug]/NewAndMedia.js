import React from 'react';

function NewsAndMedia() {
 
  return (
    <div className="w-full p-2 m-auto h-auto flex flex-col justify-center items-center ">
      <iframe
        src="https://www.youtube.com/embed/UAgaqU1kQeA?si=J1AxtUwUVSzrUnP4"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
        className="w-72 m-auto md:w-full  md:max-w-[1350px]   md:h-[500px]"></iframe>
    </div>
  );
}

export default NewsAndMedia;
