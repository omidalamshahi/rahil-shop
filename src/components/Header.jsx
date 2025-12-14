import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

//style
import cx from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import SvgContainer from './ui/SvgContainer';
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
          // className="text-black  flex items-center"
          className="text-black bg-[#ffffffdb] flex items-center"
          style={{
            gap: '2rem',
            height: '3rem',
            fontWeight: '300',
            fontSize: '14px',
            color: 'rgb(0, 0, 0)',
            letterSpacing: '0.1rem',
            textTransform: 'uppercase',
            userSelect: 'none',
            borderBottom:'1px solid #8c8c8c'
          }}
        >
          <div className="flex-1"></div>
          <div className="flex-5 flex justify-center gap-8">
            {/* <div>
              <Link to="/">PORTFOLIO</Link>
            </div>
            <div>
              <Link to="/shop">SHOP</Link>
            </div>
            <div>
              <Link to="/info">INFO</Link>
            </div> */}
                        <div>
              <Link to="/">Rahil Alamshahi</Link>
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
                <SvgContainer icon={'Cart2'} size={'1.1rem'} />
                <span className="font-[400] text-[12px] text-[#000000]">
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
