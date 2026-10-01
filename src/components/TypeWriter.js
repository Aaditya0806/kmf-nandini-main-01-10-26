import React from 'react';
import { useState, useEffect } from 'react';

function TypeWriter({ text, delay }) {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex,  setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [delay, currentIndex, text]);

  
  return <p className="text-justify  text-[10px] md:text-lg text-white">{text}</p>;
}

export default TypeWriter;
