import { useReducer } from 'react';
import SvgContainer from '../ui/SvgContainer';

const ACTIONS = {
  INC: 'increment',
  DEC: 'decrement',
  JMP: 'jump',
};

const PhotoSlider2 = ({ imgList, startingIndex = 0 }) => {
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
    <div className="group relative overflow-auto flex flex-col gap-5">
      {/* <img
        src={imgList[curIndex]}
        className="w-full h-[80%] object-cover m-auto"
      /> */}
      {/* {Object.keys(imgList).length > 1 && (
        <>
          <img
            src={imgList[curIndex]}
            className="w-full h-[80%] object-cover m-auto"
          />
        </>
      )} */}

      {imgList.map((item, index) => {
        return (
          <img
            src={item}
            className="w-full h-[80%] object-cover m-auto"
          />
        );
      })}

      {Object.keys(imgList).length > 1 && (
        <div>
          <div
            className="absolute top-0 left-0 text-[#f7f7f7] w-[50%] h-full flex items-center justify-start z-202 cursor-pointer"
            onClick={() => {
              changeCurIndex({ type: ACTIONS.DEC });
            }}
          >
            <SvgContainer
              icon="ArrowLeft"
              size="3rem"
              className={'bg-[#00000036] rounded-[5px]'}
            />
          </div>

          <div
            className="absolute top-0 right-0 text-[#f7f7f7] w-[50%] h-full flex items-center justify-end z-202 cursor-pointer"
            onClick={() => {
              changeCurIndex({ type: ACTIONS.INC });
            }}
          >
            <SvgContainer
              icon="ArrowRight"
              size="3rem"
              className={'bg-[#00000036] rounded-[5px]'}
            />
          </div>

          <div
            id="slider"
            className="flex justify-center items-center w-full bottom-0  transition-all duration-300 bg-[#000000b0] p-2 z-203
            "
          >
            {imgList.map((item, index) => {
              return (
                <img
                  src={item}
                  className="w-20 h-20 object-cover"
                  style={{
                    opacity: curIndex === index ? '100%' : '50%',
                  }}
                  onClick={() => {
                    changeCurIndex({ type: ACTIONS.JMP, payload: index });
                  }}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
export default PhotoSlider2;
