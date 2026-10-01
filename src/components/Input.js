import React from 'react'
import propTypes from 'prop-types'
import { Fade } from 'react-reveal'

const Input = ({title,type,style,inputStyle,setInfo,astrik,value,name}) => {
  return (
    <div className={style}>
      <Fade bottom>
      <label htmlFor="name" className='text-base  ' >{title} <span className='text-red-500 text-xl'>{astrik}</span></label>
      <input  onChange={(e)=>setInfo(e)} name={name} value={value} className={`mt-4 w-full rounded-xl border border-neutral-dark4 p-2 bg-neutral-light4 ${inputStyle} `} type={type} />
      </Fade>
    </div>
  )
}


Input.prototype={
  title:propTypes.string.isRequired,
  type:propTypes.string.isRequired,
  style:propTypes.string.isRequired,
  inputStyle:propTypes.string.isRequired

}
export default Input
