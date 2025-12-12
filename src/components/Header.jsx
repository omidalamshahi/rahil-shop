import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

//style
import cx from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import SvgContainer from '../ui/SvgContainer';
import Cart from '../pages/Cart';
import PopUp from '../components/layouts/PopUp';

const Header = () => {
  const cart = useSelector((state) => state.shop.cart.data || []);
  const cartRef = useRef(null);
  const [showCart, setShowCart] = useState(false);
  const [cartLength, setCartLenght] = useState(0);
  useEffect(() => {
    let itemCount = 0;
    Object.values(cart).forEach((item) => {
      itemCount += item.quantity;
    });
    setCartLenght(itemCount);
  }, [cart]);

  return (
    <>
      <div className={'sticky w-full z-999 top-0'}>
        <div
          className="text-black bg-[#f6f6f6] flex items-center"
          // className="text-black bg-[#c3ccd4] flex items-center"
          style={{
            gap: '2rem',
            height: '3rem',
            fontWeight: '400',
            fontSize: '14px',
            color: 'rgb(0, 0, 0)',
            letterSpacing: '0.1rem',
            textTransform: 'uppercase',
            userSelect: 'none',
          }}
        >
          <div className="flex-1"></div>
          <div className="flex-5 flex justify-center gap-8">
            <div>
              <Link to="/">PORTFOLIO</Link>
            </div>
            <div>
              <Link to="/shop">SHOP</Link>
            </div>
            <div>
              <Link to="/info">INFO</Link>
            </div>
          </div>

          <button
            className="flex-1 flex"
            ref={cartRef}
            onClick={() => {
              setShowCart(true);
            }}
          >
            {cartLength !== 0 && (
              <>
                <SvgContainer icon={'Cart'} size={'1.1rem'} />
                <span className="font-semibold text-[#545454]">
                  {cartLength}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
      <PopUp show={showCart} setShow={setShowCart} ignoreRefs={[cartRef]}>
        <Cart setShow={setShowCart} />
      </PopUp>
      {/* {showCart && (
      )} */}
    </>
  );
};

export default Header;
