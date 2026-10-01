import Link from 'next/link';
import React from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { Carousel } from 'react-responsive-carousel';
import { Fade } from 'react-reveal';

function UnionCard({ name, image, description, link, idx }) {
   
  return (
    
    <div className=" w-full h-full grid md:grid-cols-2 border-b  p-2     ">
      {idx % 2 === 0 ? (
        <Fade left>
          <div className="w-full h-full pb-10 flex justify-center items-center">
            <Carousel
              className=" w-full h-full"
              autoPlay={true}
              interval={2000}
              showStatus={false}
              infiniteLoop
              showThumbs={false}
              showIndicators={false}>
              {image?.data?.map((item, id) => {
                return (
                  <img loading="lazy" decoding="async"
                    key={id}
                    src={item?.attributes?.url}
                    className=" max-w-[400px] h-full object-cover"
                  />
                );
              })}
            </Carousel>
          </div>

          <Link
            href={link || ''}
            className="w-full flex flex-col justify-start items-start space-y-6">
            <h1 className="text-xl md:text-4xl text-center md:text-start  uppercase text-primary-main">{name}</h1>
            <p className="text-md  text-justify">{description?.[0]?.children?.[0]?.text}</p>
          </Link>
        </Fade>
      ) : (
        <Fade right>
          <div className="w-full h-full pb-10 flex justify-center items-center">
            <Carousel
              className=" w-full h-full"
              autoPlay={true}
              interval={2000}
              showStatus={false}
              infiniteLoop
              showThumbs={false}
              showIndicators={false}>
              {image?.data?.map((item, id) => {
                return (
                  <img loading="lazy" decoding="async"
                    key={id}
                    src={item?.attributes?.url}
                    className=" max-w-[400px] h-full object-cover"
                  />
                );
              })}
            </Carousel>
          </div>

          <Link
            href={link || ''}
            className="w-full flex flex-col justify-start items-start space-y-6">
            <h1 className="text-xl md:text-4xl text-center md:text-start uppercase text-primary-main">{name}</h1>
            <p className="text-md  text-justify">{description?.[0]?.children?.[0]?.text}</p>
          </Link>
        </Fade>
      )}
    </div>
  );
}

export default UnionCard;