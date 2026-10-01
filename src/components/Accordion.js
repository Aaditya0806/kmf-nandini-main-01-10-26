'use client';
import { useState } from 'react';
import PropTypes from 'prop-types';

const AccordionItem = ({ title, children, open, arrow, onToggle, id }) => {
   
  return (
    <li className=" ">
      <button
        className="flex items-center justify-between relative  text-light-light4 border-b-2 border-b-light4 p-4 w-full "
        onClick={() => {
          onToggle(id);
        }}>
        <div className="flex space-x-2 ">
          <span>{title}</span>
        </div>

        <img loading="lazy" decoding="async" src={open ? arrow.up : arrow.down} className="bg-white" />
      </button>
      {open && <div className="p-4 bg-primary-darker">{children}</div>}
    </li>
  );
};

AccordionItem.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
  arrow: PropTypes.object,
  id: PropTypes.number.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default AccordionItem;
