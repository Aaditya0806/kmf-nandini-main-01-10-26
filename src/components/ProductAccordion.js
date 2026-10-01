'use client';
import { useState } from 'react';
import PropTypes from 'prop-types';

const ProductAccordion = ({ title, children, open, arrow, onToggle, id }) => {
   
  return (
    <li className="w-full list-none transition-all duration-300 bg-primary-main ">
      <button
        className="flex items-center justify-between relative  text-light-light4 border-b-2 border-b-light4 p-4 w-full "
        onClick={() => {
          onToggle(id);
        }}>
        <div className="w-full flex space-x-2 ">
          <span className=' text-sm text-white'>{title}</span>
        </div>

        <img loading="lazy" decoding="async" src={open ? arrow.up : arrow.down} className="bg-white" />
      </button>
      {open && <div className="p-4 bg-secondary-main">{children}</div>}
    </li>
  );
};

ProductAccordion.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
  arrow: PropTypes.object,
  id: PropTypes.number.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default ProductAccordion;
