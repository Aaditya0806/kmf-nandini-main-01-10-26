import useLocale from '@/hooks/useLocale';
import React,{useState,useEffect} from 'react'

function Counter({endNumber,title}) {
  const [currentNumber, setCurrentNumber] = useState(0);
  const locale=useLocale().locale

  useEffect(() => {
    const duration = 3000; // Animation duration in milliseconds
    const step = Math.ceil(endNumber / (duration / 50)); // Calculate step size

    const interval = setInterval(() => {
      setCurrentNumber(prevNumber => {
        const nextNumber = prevNumber + step;
        return nextNumber >= endNumber ? endNumber : nextNumber; // Ensure end number is reached
      });
    }, 50); // Update every 50 milliseconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [endNumber]);

  return (
    <div className='flex flex-col  space-y-10  justify-center items-center'>
        <p className='text-lg lg:text-[100px] text-white font-subheading flex justify-center items-center'>
          
          {title==='Milk Unions' || title==='Kmf Units' || title==='ಹಾಲು ಒಕ್ಕೂಟಗಳು' || title==='ಕಹಾಮ ಘಟಕಗಳು' ?currentNumber.toLocaleString() : currentNumber.toLocaleString().concat('+')}
          
          
          </p>
        <p className={` text-white text-center uppercase  ${locale==='kn'?' text-[6px] md:text-lg':'text-[6px] md:text-sm'} `}>{title}</p>
    </div>
  )
}

export default Counter