import { useEffect, useReducer, useRef, useState } from 'react';
import classes from './PhotoSlider3.module.css';
import cx from 'classnames';
import SvgContainer from '../../ui/SvgContainer';
import BaseDrag from '../../ui/BaseDrag';

const ACTIONS = {
  INC: 'increment',
  DEC: 'decrement',
  JMP: 'jump',
};

const PhotoSlider3 = ({ list = [], chosenIndex = 0, setShow = () => {} }) => {
  const closePhotoSlider = () => {
    setShow(false);
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
  const [curIndex, changeCurIndex] = useReducer(changeIndex, chosenIndex);

  const [isScrolled, setIsScrolled] = useState(0);
  const scrolled = () => {
    setIsScrolled(window.innerHeight);
  };
  const keypress = (e) => {
    // e.preventDefault();
    switch (e.key) {
      case 'ArrowLeft':
        changeCurIndex({ type: ACTIONS.DEC });
        break;
      case 'ArrowRight':
        changeCurIndex({ type: ACTIONS.INC });

        break;
      case 'Escape':
        closePhotoSlider();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    scrolled();
    // document.body.style.overflow = 'hidden';
    window.addEventListener('resize', scrolled);
    window.addEventListener('keydown', keypress);
    return () => {
      // document.body.style.overflow = 'auto';
      window.removeEventListener('resize', scrolled);
      window.removeEventListener('keydown', keypress);
    };
  }, []);

  return (
    <>
      <div
        // className={classes['photo-slider-container']}
        style={{
          height: isScrolled + 'px',
          // position: 'fixed',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',

          // zIndex: '2001',
          top: '0',
          left: '0',
          width: '100%',
          // height: '100vh',
        }}
      >
        <div
          className={cx(
            // classes['photo-slider_img-container'],
            classes['middle']
          )}
          style={{
            zIndex: '2001',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transform: 'translateY(-5%)',

            position: 'relative',
            width: '100%',
            height: '100%',
          }}
        >
          <div
            // className={classes['photo-slider_img-warper']}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <img
              // className={classes['photo-slider_img']}
              src={list[curIndex]}
              // src='https://platinumlist.net/guide/wp-content/uploads/2023/03/IMG-worlds-of-adventure.webp'
              alt=""
              style={{
                maxHeight: isScrolled - isScrolled / 10 + 'px',
                maxWidth: '85%',
                // width: '90%',
                userSelect: 'none',
              }}
            />
          </div>

          <div
            onClick={() => {
              // changeIndex(curIndex - 1);
              changeCurIndex({ type: ACTIONS.DEC });
            }}
            className={cx(
              classes['photo-slider_arrow'],
              classes['photo-slider_arrow-left']
            )}
            style={{}}
          >
            <SvgContainer
              icon="ArrowLeft"
              color="white"
              size="3rem"
              svgContainerClassName={
                classes['photo-slider_arrow-left_svg-container']
              }
              svgContainerStyle={{
                width: '15%',
                height: '3rem',
              }}
            />
          </div>
          <div
            onClick={() => {
              // changeIndex(curIndex + 1);
              changeCurIndex({ type: ACTIONS.INC });
            }}
            className={cx(
              classes['photo-slider_arrow'],
              classes['photo-slider_arrow-right']
            )}
            style={
              {
                // minHeight: '50vh',
              }
            }
          >
            <SvgContainer
              icon="ArrowRight"
              color="white"
              size="3rem"
              svgContainerClassName={
                classes['photo-slider_arrow-right_svg-container']
              }
              svgContainerStyle={{
                width: '15%',
                height: '3rem',
              }}
            />
          </div>
        </div>
        {/* <div
          style={{
            position: 'fixed',
            zIndex: '3000',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#262627',
            // overflow: 'hidden',
            width: '85%',
            // width: '100%',
            height: '12%',
            bottom: '2%',

            // opacity: '0.8',
          }}
        >
          <BaseDrag
            direction="row"
            // scrollbar={false}
            displayChildIndex={curIndex}
            backdrop={false}
          >
            {list.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    changeCurIndex({ type: ACTIONS.JMP, payload: index });
                  }}
                  style={{
                    // maxWidth: '200px',
                    // maxHeight: '50%',
                    alignSelf: 'center',
                  }}
                >
                  <img
                    src={item}
                    style={{
                      maxWidth: '10vh',
                      // maxHeight: '5%',

                      // maxHeight: '10rem',
                      // opacity: index === curIndex ? '1' : '0.5',
                      filter:
                        index === curIndex
                          ? 'blur(0px) brightness(1)'
                          : 'brightness(0.6)',

                      cursor: 'pointer',
                    }}
                  />
                </div>
              );
            })}
          </BaseDrag>
        </div> */}
      </div>
    </>
  );
};
export default PhotoSlider3;
