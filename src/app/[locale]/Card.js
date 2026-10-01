import React from 'react';
import propTypes from 'prop-types';
 
 
import Link from 'next/link';
 

function Card({ imgUrl, title, link }) {
 
 
  return (
 
      <div
        className="w-full max-w-72 h-52 md:max-w-96 relative  md:h-96 bg-light-light4 rounded-md overflow-hidden   m-auto   "
        style={{ boxShadow: '0px 11px 49px 0px rgba(0, 0, 0, 0.15)' }}>
        <div className="  w-full h-full">
          <img loading="lazy" decoding="async"
            src={imgUrl}
            alt="featured-img"
            className="  w-full  object-cover  h-full hover:scale-[1.1] "
            style={{ transition: '.4s all' }}
          />
        </div>

   

        <div className="absolute h-full w-full bg-black/80 inset-0 flex items-center justify-center -bottom-10 hover:bottom-0 opacity-0 transition-all duration-300  card-hover">
        <Link href={link|| ''}> <button className="bg-primary-main  w-48 h-12  uppercase    text-neutral-light4 font-semibold rounded-md">
                {title}
              </button>

              </Link>
           
      </div>
      </div>
 
  );
}

Card.propTypes = {
  imgUrl: propTypes.string,
  title: propTypes.string
};

export const LinkCard = ({ imgUrl, title, description }) => {
  return (
    <div className="flex flex-col justify-center items-center ">
      <div
        className="p-2 w-20 h-20 md:w-40 md:h-40 flex justify-center items-center border-neutral-dark1   bg-neutral-light4 rounded-full"
        style={{ boxShadow: '0px 8px 24px 0px rgba(0, 0, 0, 0.12)' }}>
        <img loading="lazy" decoding="async"
          src={imgUrl}
          alt="featured-img"
          className=" w-10 h-10 object-contain hover:rotate-45 "
          style={{ transition: '.4s all' }}
        />
      </div>

      <div className="mt-10 flex flex-col justify-center items-center">
        <h1 className="text-xs md:text-lg text-center ">{title}</h1>
        <p className="text-justify text-[#595959]">{description}</p>
      </div>
    </div>
  );
};
export default Card;
