/* note:

1.scrollbar has some inertia but not good. remove or fix.
2.ability to add margin(some space) for scrollbar(addition to two version which exist)
3.user-select=none while scrolling or overall
4.scrollbar need to be fixed(size change,disappearance)
5.make a way to start at different point of scroll


 end note*/

import React, { useRef, useState, useEffect } from 'react';

// style
import cx from 'classnames';
import classes from './BaseDrag.module.css';

const BaseDrag = ({
  children,
  style = {},
  className = '',
  direction = 'column',
  scrollbar = true,
  overlayScrollbar = false,
  scrollbarSize = 10,
  hoverDisplay = false,
  displayChildIndex = 0,
}) => {
  const sliderRef = useRef(null);
  const scrollbarXRef = useRef(null);
  const scrollbarYRef = useRef(null);
  const xAxios = direction === 'row';
  const yAxios = direction === 'column';

  const [hasScrollbar, setHasScrollbar] = useState(scrollbar);

  const [isScrolling, setIsScrolling] = useState(false);
  const mouseCoords = useRef({
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0,
  });
  const mouseCoordsReset = () => {
    mouseCoords.current = { startX: 0, startY: 0, scrollLeft: 0, scrollTop: 0 };
  };

  const [scrollPosX, setScrollPosX] = useState(0);
  useEffect(() => {
    console.log(scrollPosX);
  }, [scrollPosX]);

  const [scrollPosY, setScrollPosY] = useState(0);

  //jump scroll based on displayChildIndex
  useEffect(() => {
    setTimeout(() => {
      handleScrollWithTransition();
    }, 100);
  }, [displayChildIndex]);
  const easeInOut4 = (elapsedTime, startValue, endValue, duration) => {
    elapsedTime = elapsedTime / (duration / 2);
    if (elapsedTime < 0.01) return startValue;
    if (elapsedTime < 1)
      return (endValue / 2) * elapsedTime * elapsedTime + startValue;
    elapsedTime--;
    return (-endValue / 2) * (elapsedTime * (elapsedTime - 2) - 1) + startValue;
  };

  const handleScrollWithTransition = () => {
    const sliderChild = sliderRef.current.children[displayChildIndex];
    if (!sliderChild) return;
    const sliderChildRect = sliderChild.getBoundingClientRect();
    const startScrollLeft = sliderRef.current.scrollLeft;
    const scrollValue = sliderChildRect.x - sliderChildRect.width;
    const startTime = performance.now();
    const duration = 250;
    const animateScroll = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const easedScrollLeft = easeInOut4(
        elapsedTime,
        startScrollLeft,
        scrollValue,
        duration
      );
      sliderRef.current.scrollLeft = easedScrollLeft;
      if (elapsedTime < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };
  //jump scroll based on displayChildIndex//

  useEffect(() => {
    if (xAxios) {
      sliderRef.current.scrollLeft = scrollPosX;
    } else if (yAxios) {
      sliderRef.current.scrollTop = scrollPosY;
    }
  }, [scrollPosX, scrollPosY]);

  const MAX_SCROLLBAR_LENGTH = 40;
  const [sliderScrollLength, setSliderScrollLength] = useState(0);
  useEffect(() => {
    if (!hasScrollbar) return;

    const sliderCurrent = sliderRef.current;
    const scrollbarCurrent = xAxios
      ? scrollbarXRef.current
      : scrollbarYRef.current;
    if (!sliderCurrent || !scrollbarCurrent) return;
    const sliderOffset = xAxios
      ? sliderCurrent.offsetWidth
      : sliderCurrent.offsetHeight;
    const sliderScrollLength = xAxios
      ? sliderCurrent.scrollWidth
      : sliderCurrent.scrollHeight;

    if (sliderScrollLength - sliderOffset === 0) {
      setHasScrollbar(false);
      return;
    }
    const newScrollbarLength =
      (sliderOffset / sliderScrollLength) * sliderOffset;
    const scrollbarStyle = xAxios ? 'width' : 'height';

    scrollbarCurrent.style[scrollbarStyle] = `${Math.floor(
      Math.max(newScrollbarLength, MAX_SCROLLBAR_LENGTH)
    )}px`;
    handleThumbPosition();
  }, [sliderScrollLength]);

  // handle for thumb position based on scroll Event on sliderRef
  useEffect(() => {
    if (!hasScrollbar) return;

    const elementRef = sliderRef.current;
    elementRef.addEventListener('scroll', handleThumbPosition);
    return () => {
      elementRef.removeEventListener('scroll', handleThumbPosition);
    };
  }, []);

  const handleThumbPosition = () => {
    if (!hasScrollbar) return;

    const scroll = sliderRef.current;
    const scrollbar = xAxios ? scrollbarXRef.current : scrollbarYRef.current;
    const scrollbarParentNode = scrollbar.parentNode;

    const scrollPositionRatio = xAxios
      ? scroll.scrollLeft / (scroll.scrollWidth - scroll.offsetWidth)
      : scroll.scrollTop / (scroll.scrollHeight - scroll.offsetHeight);
    const newThumbPosition = xAxios
      ? scrollPositionRatio *
        (scrollbarParentNode.offsetWidth - scrollbar.offsetWidth)
      : scrollPositionRatio *
        (scrollbarParentNode.offsetHeight - scrollbar.offsetHeight);
    const scrollbarTransform = xAxios
      ? `translateX(${newThumbPosition}px)`
      : `translateY(${newThumbPosition}px)`;
    if (xAxios) {
      scrollbar.style.transform = scrollbarTransform;
    } else if (yAxios) {
      scrollbar.style.transform = scrollbarTransform;
    }
  };

  ////////////  handleDrag   ////////////
  const [isDraggingContent, setIsDraggingContent] = useState(false);
  const inertialScrollDataRef = useRef({
    previousPos: 0,
    currentPos: 0,
    startTime: null,
  });
  const handleDragStart = (e) => {
    if (e.button !== 0) return;
    if (!sliderRef?.current?.children[0]) return;

    stopAnimation();
    inertialScrollDataRef.current.startTime = new Date();
    //drag initials
    const sliderCurrent = sliderRef.current;
    const startX = e.pageX - sliderCurrent.offsetLeft;
    const startY = e.pageY - sliderCurrent.offsetTop;
    const scrollLeft = Math.ceil(sliderCurrent.scrollLeft);
    const scrollTop = Math.ceil(sliderCurrent.scrollTop);
    mouseCoords.current = { startX, startY, scrollLeft, scrollTop };
    setIsDraggingContent(true);
  };

  //// handleDragEndInertialScroll ////
  const MAX_TIME_ACCEPTABLE_BETWEEN_MOVEMENT = 10; //millisecond
  const SCROLL_ACCELERATION_FACTOR = 2000; //higher number mean faster scroll
  const MIN_ANIMATION_DURATION = 150;
  const handleDragEndInertialScroll = () => {
    const { currentPos, previousPos, startTime } =
      inertialScrollDataRef.current;
    const distance = currentPos - previousPos;
    const distanceAbs = Math.abs(currentPos - previousPos);

    if (distanceAbs <= 0) return;
    if (new Date() - startTime > MAX_TIME_ACCEPTABLE_BETWEEN_MOVEMENT) return; // long time before last movement (0 means instant movement change)
    const currentScrollPos = xAxios
      ? sliderRef.current.scrollWidth
      : sliderRef.current.scrollHeight;
    const ScrollWidthAbs = Math.abs(currentScrollPos);
    const distancePercentage = distanceAbs / ScrollWidthAbs;
    const acceleration = distancePercentage * SCROLL_ACCELERATION_FACTOR;
    const newPosToAnimate = currentPos + distance * acceleration;
    const animationDuration = Math.min(
      MIN_ANIMATION_DURATION + MIN_ANIMATION_DURATION * Math.abs(acceleration)
    );

    animateScroll(currentPos, newPosToAnimate, animationDuration, extraEaseOut);
  };

  const handleDragEnd = (e) => {
    // Check if the dragging has passed the initial margin.
    if (isRunning.current) {
      handleDragEndInertialScroll();
    }
    inertialScrollDataRef.current = {
      previousPos: 0,
      currentPos: 0,
      startTime: null,
    };

    setIsDraggingContent(false);
    setIsScrolling(false);
    mouseCoordsReset();
    isRunning.current = false;
  };

  useEffect(() => {
    if (isDraggingContent) {
      window.addEventListener('mousemove', handleDrag);
      window.addEventListener('mouseup', handleDragEnd);
    }
    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', handleDragEnd);
    };
  }, [isDraggingContent]);

  const isRunning = useRef(false); // FlagCheck if the dragging has passed the initial margin.
  let movementMargin = 0; //saves movementMargin with direction for future movement ignoring the Initial margin
  const SCROLL_ACCELERATION = 1.5; // Speed multiplier base on mouse movement
  const MARGIN_LIMIT = 7; // limits to mouse movement before scrolling
  const handleDrag = (e) => {
    e.preventDefault();
    if (!isDraggingContent) return;
    const currentMousePos = xAxios
      ? e.pageX - sliderRef.current.offsetLeft
      : e.pageY - sliderRef.current.offsetTop;
    const startMousePos = xAxios
      ? mouseCoords.current.startX
      : mouseCoords.current.startY;

    const newScrollPos =
      (currentMousePos - startMousePos) * SCROLL_ACCELERATION;

    if (!isRunning.current) {
      movementMargin = Math.sign(newScrollPos) * MARGIN_LIMIT;
      if (Math.abs(newScrollPos) <= Math.abs(movementMargin)) {
        return;
      }
      setIsScrolling(true);
      isRunning.current = true;
    }
    document.body.style.cursor = 'grabbing';
    inertialScrollDataRef.current.startTime = new Date();
    inertialScrollDataRef.current.previousPos =
      inertialScrollDataRef.current.currentPos;
    if (xAxios) {
      inertialScrollDataRef.current.currentPos =
        mouseCoords.current.scrollLeft - newScrollPos + movementMargin;
      setScrollPosX(
        mouseCoords.current.scrollLeft - newScrollPos + movementMargin
      );
    }
    if (yAxios) {
      inertialScrollDataRef.current.currentPos =
        mouseCoords.current.scrollTop - newScrollPos + movementMargin;
      setScrollPosY(
        mouseCoords.current.scrollTop - newScrollPos + movementMargin
      );
    }
  };

  //// handleScrollThumb ////
  const [isDraggingScrollbar, setIsDraggingScrollbar] = useState(false);
  const handleScrollThumbStart = (e) => {
    if (!hasScrollbar) return;
    if (e.button !== 0) return;
    if (!sliderRef?.current?.children[0]) return;

    stopAnimation();

    const startX = e.pageX - sliderRef.current.offsetLeft;
    const startY = e.pageY - sliderRef.current.offsetTop;
    const scrollLeft = Math.ceil(sliderRef.current.scrollLeft);
    const scrollTop = Math.ceil(sliderRef.current.scrollTop);
    mouseCoords.current = { startX, startY, scrollLeft, scrollTop };
    setIsDraggingScrollbar(true);
  };
  const handleScrollThumbEnd = () => {
    setIsDraggingScrollbar(false);
    setIsScrolling(false);
    mouseCoordsReset();
  };

  const handleScrollThumb = (e) => {
    e.preventDefault();
    if (!hasScrollbar) return;
    if (!isDraggingScrollbar) return;

    stopAnimation();

    if (xAxios) {
      const { offsetWidth, scrollWidth, offsetLeft } = sliderRef.current;
      const currentMousePos = e.pageX - offsetLeft;
      const xMultiplier =
        (scrollWidth - offsetWidth) /
        (scrollbarXRef.current.parentNode.offsetWidth -
          scrollbarXRef.current.offsetWidth);

      const newScrollX =
        (currentMousePos - mouseCoords.current.startX) * xMultiplier;
      setScrollPosX(mouseCoords.current.scrollLeft + newScrollX);
    }
    if (yAxios) {
      const { offsetHeight, scrollHeight, offsetTop } = sliderRef.current;
      const currentMousePos = e.pageY - offsetTop;
      const yMultiplier =
        (scrollHeight - offsetHeight) /
        (scrollbarYRef.current.parentNode.offsetHeight -
          scrollbarYRef.current.offsetHeight);
      const newScrollY =
        (currentMousePos - mouseCoords.current.startY) * yMultiplier;
      setScrollPosY(mouseCoords.current.scrollTop + newScrollY);
    }
    setIsScrolling(true);
  };
  useEffect(() => {
    if (!hasScrollbar) return;
    if (isDraggingScrollbar) {
      window.addEventListener('mousemove', handleScrollThumb);
      window.addEventListener('mouseup', handleScrollThumbEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleScrollThumb);
      window.removeEventListener('mouseup', handleScrollThumbEnd);
    };
  }, [isDraggingScrollbar]);

  //// troughScroll ////
  const handleScrollTrough = (e) => {
    if (!hasScrollbar) return;
    if (!sliderRef?.current?.children[0]) return;
    if (e.target !== e.currentTarget) return;

    stopAnimation();

    const SCROLL_FACTOR = 0.75;
    const scrollbarStyle = xAxios
      ? scrollbarXRef.current.style
      : scrollbarYRef.current.style;
    const sliderOffset = xAxios
      ? sliderRef.current.offsetWidth
      : sliderRef.current.offsetHeight;
    const sliderScrollPos = xAxios
      ? sliderRef.current.scrollLeft
      : sliderRef.current.scrollTop;

    const clickPos = xAxios ? e.nativeEvent.layerX : e.nativeEvent.layerY;
    const scrollDirection =
      +scrollbarStyle.transform.match(/[-+]?[0-9]*\.?[0-9]+/)[0] < clickPos
        ? 1
        : -1;

    const scrollDistance = sliderOffset * scrollDirection * SCROLL_FACTOR;
    const newScrollPos = sliderScrollPos + scrollDistance;
    animateScroll(sliderScrollPos, newScrollPos, 200, easeInOut);
  };

  //////// animateScroll ////////
  let animationStartTime = null;
  let animationFrameId = null;
  const isAnimating = useRef(false);
  //ease functions
  const easeInOut = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const extraEaseOut = (t) => 1 - Math.pow(1 - t, 20);
  const easeInOut3 = (t) =>
    t < 0.5 ? 0.5 * extraEaseOut(2 * t) : 0.5 * (2 - extraEaseOut(2 - 2 * t));

  const animateScroll = (
    startPoint,
    endPoint,
    duration,
    easingFunction = (t) => t
  ) => {
    console.log(startPoint, endPoint, duration);
    const requestAnimationFrameFunc =
      window.requestAnimationFrame ||
      (() => {
        console.warn(
          'requestAnimationFrame is not supported. Animation is skipped.'
        );
      });
    cancelAnimationFrame(animationFrameId);
    stopAnimation();
    // animationFrameId = null;
    isAnimating.current = true;

    const step = (timestamp) => {
      if (!isAnimating.current) return;

      if (!animationStartTime) animationStartTime = timestamp;

      const progress = Math.min(1, (timestamp - animationStartTime) / duration);
      const easedProgress = easingFunction(progress); // Apply the specified easing function
      const newPosition = startPoint + (endPoint - startPoint) * easedProgress;
      // console.log('2', startPoint, newPosition);

      const scrollLength = xAxios
        ? sliderRef.current.scrollWidth
        : sliderRef.current.scrollHeight;

      if (0 > newPosition || scrollLength < newPosition) {
        stopAnimation();
      }

      if (xAxios) {
        setScrollPosX((prev) => {
          if (prev === newPosition) return prev;
          if (Math.abs(prev - newPosition) < 1) {
            stopAnimation();
            return prev;
          }
          return newPosition;
        });
      } else if (yAxios) {
        setScrollPosY((prev) => {
          if (prev === newPosition) return prev;
          if (Math.abs(prev - newPosition) < 1) {
            stopAnimation();
            return prev;
          }
          return newPosition;
        });
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrameFunc(step); // Continue animating
      } else {
        animationStartTime = null;
        animationFrameId = null;
      }
    };
    // Start the animation
    animationFrameId = requestAnimationFrameFunc(step);
  };
  const stopAnimation = () => {
    isAnimating.current = false;
    animationStartTime = null;
    animationFrameId = null;
  };

  //needs to be used more on baseDrag maybe later 14*8*2023
  useEffect(() => {
    if (!scrollbar) return;
    const element = sliderRef.current;
    if (!element) return;
    const resizeObserver = new ResizeObserver((entries) => {
      // console.log(entries);
      for (const entry of entries) {
        const { scrollWidth, scrollHeight, offsetWidth, offsetHeight } =
          entry.target;
        const sliderScrollLength = xAxios ? scrollWidth : scrollHeight;
        const sliderOffset = xAxios ? offsetWidth : offsetHeight;
        if (sliderScrollLength - sliderOffset === 0) {
          setHasScrollbar(false);
        } else {
          setHasScrollbar(true);
        }
      }
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.unobserve(element);
    };
  }, []);

  return (
    <div
      className={cx(
        classes['base-drag__container']
        // classes['add-task__form-textarea']
      )}
      style={{
        ...style,
        gridTemplateRows: hasScrollbar && xAxios && '1fr 0.6rem',
        gridTemplateColumns: hasScrollbar && yAxios && '1fr 0.6rem',
      }}
    >
      <div
        ref={sliderRef}
        className={`${className} ${cx(classes['base-drag__children-wrapper'])}`}
        style={{
          flexDirection: direction,
          overflowY: xAxios && 'hidden',
          overflowX: yAxios && 'hidden',
        }}
        onMouseDown={handleDragStart}
        onMouseOver={() => {
          // the only way that i got the updated sliderScrollLength
          setSliderScrollLength((prev) => {
            const newSliderScrollLength = xAxios
              ? sliderRef.current.scrollWidth
              : sliderRef.current.scrollHeight;
            if (newSliderScrollLength === prev) {
              return prev;
            }
            return newSliderScrollLength;
          });
        }}
      >
        {children}
      </div>

      <div
        className={cx(
          classes['base-drag__backdrop'],
          isScrolling && classes['base-drag__backdrop__active']
        )}
      ></div>

      {hasScrollbar && xAxios && (
        <>
          <div
            className={cx(
              classes['base-drag__scrollbar__container'],
              classes['base-drag__scrollbar-x__container'],
              hoverDisplay && classes['base-drag__scrollbar__hover-effect']
            )}
            style={{
              height: `${scrollbarSize}px`,
              bottom:
                hasScrollbar &&
                xAxios &&
                overlayScrollbar &&
                `${-scrollbarSize}px`,
            }}
            onClick={handleScrollTrough}
          >
            <div
              className={cx(
                classes['base-drag__scrollbar'],
                classes['base-drag__scrollbar-x']
              )}
              ref={scrollbarXRef}
              onMouseDown={handleScrollThumbStart}
            ></div>
          </div>
        </>
      )}
      {hasScrollbar && yAxios && (
        <>
          <div
            className={cx(
              classes['base-drag__scrollbar__container'],
              classes['base-drag__scrollbar-y__container'],
              hoverDisplay && classes['base-drag__scrollbar__hover-effect']
            )}
            style={{
              width: `${scrollbarSize}px`,
              right:
                hasScrollbar &&
                yAxios &&
                overlayScrollbar &&
                `${-scrollbarSize}px`,
            }}
            onClick={handleScrollTrough}
          >
            <div
              className={cx(
                classes['base-drag__scrollbar'],
                classes['base-drag__scrollbar-y']
              )}
              ref={scrollbarYRef}
              onMouseDown={handleScrollThumbStart}
            ></div>
          </div>
        </>
      )}
    </div>
  );
};

export default BaseDrag;

// do not remove
{
  /* {React.cloneElement(children, {
             onWheel: handleWheelScrollStart,
             // onScroll: (e) => {
             // },
           })} */
}

// const updatedChildren = React.Children.map(children, (child) => {
//   // Clone the child element and append the 'hi' element
//   const updatedChild = React.cloneElement(
//     child,
//     {
//       style: { ...child.props.style, position: 'relative' },
//     },
//     [(child.props.children, backdrop)]
//   );
//   // return updatedChild;
//   return React.cloneElement(child, {
//     style: { ...child.props.style, position: 'relative' },
//   }, [child.props.children, backdrop]);
// });

// ease function for animation scroll function
// const easeOut = (t) => 1 - Math.pow(1 - t, 3);
// const easeIn = (t) => t * t;
// const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
// do not remove
