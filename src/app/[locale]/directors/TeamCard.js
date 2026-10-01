import React from 'react';
import propTypes from 'prop-types';
import { Fade } from 'react-reveal';

const TeamCard = ({ imgUrl, desc, fullName }) => {
  return (
    <div className="w-full max-w-64 h-[400px] md:max-w-[320px] md:h-[400px] relative rounded-tl-3xl rounded-br-3xl  shadow-md  overflow-hidden  group  transition-all duration-400 ease-in-out ">
      <Fade top>
      <div className=" w-full h-[60%] overflow-hidden ">
        <img loading="lazy" decoding="async"
          src={imgUrl}
          alt="featured-img"
          className="w-full h-full group-hover:scale-[1.1] object-contain"
          style={{ transition: '.4s all' }}
        />
      </div></Fade>

      <Fade bottom>

      <div className="mt-5 h-[40%]   flex justify-center items-center flex-col p-4 space-y-3 ">
        <p className=" text-sm  md:text-lg font-bold text-center text-neutral-dark1">{fullName}</p>
        <h1 className=" text-xs md:text-sm text-center ">{desc}</h1>
      </div>
      </Fade>
    </div>
  );
};

TeamCard.propTypes = {
  imgUrl: propTypes.string,
  fullName: propTypes.string,
  desc: propTypes.string
};

export default TeamCard;
