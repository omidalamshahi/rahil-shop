import { useState, useRef } from 'react';

const CYCLE_SPEED = 1000;
const HoverCycler = ({ imgList, className, style }) => {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  const startCycle = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % imgList.length);
    }, CYCLE_SPEED);
  };

  const stopCycle = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  return (
    <img
      src={imgList[index]}
      alt=""
      className={'transition-all duration-300' + className}
      style={{ style }}
      onMouseEnter={startCycle}
      onMouseLeave={stopCycle}
    />
  );
};
export default HoverCycler;
