import { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
const PopUp = ({
  show,
  setShow,
  children,
  style = {},
  className = {},
  ignoreRefs = [], //refs which mouse up inside wont close the popup
  close = () => {
    setShow(false);
  },
}) => {
  const [localShow, setLocalShow] = useState(show);
  const popUpRef = useRef(null);
  const mouseDownInside = useRef(false);

  useEffect(() => {
    setLocalShow(show);
  }, [show]);

  const handleMouseDown = (e) => {
    if (popUpRef.current && popUpRef.current.contains(e.target)) {
      mouseDownInside.current = true;
    } else {
      mouseDownInside.current = false;
    }
  };

  const handleMouseUp = (e) => {
    if (!localShow) return;
    // if (ignoreRefs.length ===0) return;
    const ignoreState =
      ignoreRefs.length ===0
        ? true
        : ignoreRefs
            .map((item) => {
              return !item.current.contains(e.target);
            })
            .reduce((a, b) => a && b);
    if (
      ignoreState &&
      !mouseDownInside.current &&
      popUpRef.current &&
      !popUpRef.current.contains(e.target)
    ) {
      close();
    }
  };

  useEffect(() => {
    if (localShow) {
      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [localShow]);

  return (
    <>
      {localShow && (
        <div
          id="pop-up"
          className={cx('pop-up', className)}
          ref={popUpRef}
          style={{
            width: 'fit-content',
            height: 'fit-content',
            position: 'absolute',
            ...style,
          }}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default PopUp;
