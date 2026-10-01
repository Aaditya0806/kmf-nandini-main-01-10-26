import React from 'react'
import propTypes from 'prop-types'

function AchienvmentCard({img,title}) {
  return (
    <div
    className="relative max-w-64 h-72 rounded-lg overflow-hidden after:absolute after:w-full after:h-full after:bg-black after:inset-0 after:opacity-[.5]"
    style={{ boxShadow: '0px 11px 49px 0px rgba(0, 0, 0, 0.15)' }}>
    <img loading="lazy" decoding="async" src={img} className="w-full h-full object-cover " />
    <p className="absolute bottom-8 left-3 text-[23px] text-white z-10 uppercase">
      {title}
    </p>
  </div>
  )
}


AchienvmentCard.propTypes={
    img:propTypes.string,
    title:propTypes.string
}

export default AchienvmentCard