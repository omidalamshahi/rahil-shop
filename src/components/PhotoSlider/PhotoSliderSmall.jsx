import { useReducer } from 'react';
import SvgContainer from '../ui/SvgContainer';

const ACTIONS = {
  INC: 'increment',
  DEC: 'decrement',
  JMP: 'jump',
};

const PhotoSliderSmall = ({
  imgList,
  imgListSmall,
  startingIndex = 0,
  onImageClick,
}) => {
  const changeIndex = (state, action) => {
    switch (action.type) {
      case ACTIONS.INC:
        return state + 1 > imgList.length - 1 ? 0 : state + 1;
      case ACTIONS.DEC:
        return state - 1 < 0 ? imgList.length - 1 : state - 1;
      case ACTIONS.JMP:
        return action.payload;
      default:
        return state;
    }
  };
  const [curIndex, changeCurIndex] = useReducer(changeIndex, startingIndex);
  return (
    <div id='photoslidersmall' className="group relative overflow-hidden">
      <img
        src={imgList[curIndex]}
        className="w-full h-130 object-cover m-auto"
        onClick={() => {
          onImageClick(curIndex);
        }}
      />
      {Object.keys(imgList).length > 0 && (
        <>
          <div
            id="slider"
            className="flex justify-center items-center w-full bottom-0  transition-all duration-300 bg-[#ffffffb0] pt-0.5 
            gap-0.5
            group-hover:opacity-100 group-hover:translate-y-0 z-203
            "
          >
            {imgListSmall.map((item, index) => {
              return (
                <img
                  src={item}
                  className="w-10 h-10 object-contain cursor-pointer"
                  style={{
                    opacity: curIndex === index ? '100%' : '80%',
                  }}
                  onClick={() => {
                    changeCurIndex({ type: ACTIONS.JMP, payload: index });
                  }}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
export default PhotoSliderSmall;
