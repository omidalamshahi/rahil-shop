import { useReducer } from 'react';

const ACTIONS = {
  INC: 'increment',
  DEC: 'decrement',
  JMP: 'jump',
};

const changeIndex = (state, action) => {
  switch (action.type) {
    case ACTIONS.INC:
      return state + 1 > list.length - 1 ? 0 : state + 1;
    case ACTIONS.DEC:
      return state - 1 < 0 ? list.length - 1 : state - 1;
    case ACTIONS.JMP:
      return action.payload;
    default:
      return state;
  }
};

const PhotoSliderSmall = ({ imgList, startingIndex = 0 }) => {
  const [curIndex, changeCurIndex] = useReducer(changeIndex, startingIndex);
  return (
    <div className="relative">
      <img
        src={imgList[startingIndex]}
        className="w-[100%] h-130 object-cover m-auto"
      />

      {Object.keys(imgList).length > 0 && (
        <div className="absolute flex justify-center items-center w-full bottom-0 opacity-20 hover:opacity-100 transition-[4s] bg-[#ffffffb0] p-2">
          {imgList.map((item) => {
            return <img src={item} className="w-20 h-20 object-cover" />;
          })}
        </div>
      )}
    </div>
  );
};
export default PhotoSliderSmall;
