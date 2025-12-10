import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

//style
import cx from 'classnames';

const Header = () => {
  return (
    <>
      <div className={'sticky w-[100%] z-[999] top-0'}>
        <div
          className="text-black bg-[#f6f6f6]"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
            height: '3rem',
            paddingInline: '1.75rem',
            fontWeight: '400',
            fontSize: '14px',
            color: 'rgb(0, 0, 0)',
            letterSpacing: '0.1rem',
            textTransform: 'uppercase',
            userSelect: 'none',
          }}
        >
          <div
            style={
              {
                // fontWeight: '500',
                // fontSize: '14px',
                // color: 'rgb(75, 75, 75)',
              }
            }
          >
            <Link to="/">PORTFOLIO</Link>
          </div>
          <div>
            <Link to="/shop">SHOP</Link>
          </div>
          <div>
            <Link to="/info">INFO</Link>
          </div>
          <div>
            <Link to="/test1">Test1</Link>
          </div>
          <div>
            <Link to="/test2">Test2</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
