// VideoComponent.js
import React from 'react';
import rajkumar2 from '@/images/portfolio/rajkumar-2.jpg'


const VideoComponent = ({ onClick }) => {
  return (
    <div className="video-container" onClick={onClick}>
<video autoPlay loop muted controls className='w-full h-full' src="/video/brand-video.mp4"></video>    </div>
  );
};

export default VideoComponent;
