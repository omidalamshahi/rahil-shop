import { useDispatch, useSelector } from 'react-redux';
import SvgContainer from '../../components/ui/SvgContainer';
import { addToCartAction, removeCartItemAction } from '../../store/action';
import PhotoSliderSmall from '../../components/PhotoSlider/PhotoSliderSmall';
import HoverCycler from '../../components/ui/HoverCycler';
import Product from './product';
import PopUp from '../../components/layouts/PopUp';
import { useState } from 'react';

// fix
const itemInventory = 20;

const ShopItem = ({ item }) => {
  // console.log(item)
  const [showProduct, setShowProduct] = useState(false);
  const dispatch = useDispatch();
  const itemCartQuantity =
    useSelector((state) => state.shop.cart?.data[item.id])?.quantity || 0;

  const addToCart = () => {
    const newItem = {
      id: item.id,
      quantity: 1,
    };
    dispatch(addToCartAction(newItem));
  };
  const editCart = (data) => {
    if (data.quantity > itemInventory) {
      return;
    }
    if (data.quantity === 0) {
      removeFromCart(item.id);
      return;
    }
    const newItem = {
      id: item.id,
      quantity: data.quantity,
    };
    dispatch(addToCartAction(newItem));
  };
  const removeFromCart = () => {
    dispatch(removeCartItemAction(item.id));
  };

  return (
    <>
      <div
        key={item.id}
        className="simple-border overflow-hidden flex flex-col justify-between"
      >
        <PhotoSliderSmall
          imgList={item.imgList}
          imgListSmall={item.imgListSmall}
          onImageClick={(index) => {
            setShowProduct(true);
          }}
        />

        <div
          className="px-4 pt-2 pb-4 flex flex-col"
        >
          <h2 className="text-xl">{item.title}</h2>
          <div className="mt-2 text-gray-700 text-[14px]">
            €{item.price.toFixed(2)}{' '}
            {/* <span className="text-[12px] text-gray-500">(+ shipping)</span> */}
          </div>

          {itemCartQuantity === 0 ? (
            <div className="mt-auto pt-4 select-none">
              <button
                href={item.link}
                className="w-full flex items-center justify-center text-center py-1 hover:opacity-90 "
                style={{
                  border: '1px solid #919191',
                }}
                onClick={() => {
                  addToCart(item);
                }}
              >
                {/* <SvgContainer icon={'CartAdd'} size={'1.2rem'} /> */}
                <span className="text-[13px] font-[200]">ADD</span>
              </button>
            </div>
          ) : (
            <div className="mt-auto pt-4 flex justify-around select-none">
              <div className="flex items-center gap-3 text-center">
                <button
                  className="w-4 h-4"
                  onClick={() => {
                    editCart({
                      quantity: itemCartQuantity + -1,
                    });
                  }}
                >
                  <SvgContainer icon={'Minus1'} size={'12px'} />
                </button>
                <div className="w-6 h-6 text-center">{itemCartQuantity}</div>
                <button
                  className="w-4 h-4"
                  onClick={() => {
                    editCart({
                      quantity: itemCartQuantity + +1,
                    });
                  }}
                >
                  <SvgContainer icon={'Plus1'} size={'12px'} />
                </button>
              </div>
              <button
                onClick={() => {
                  // removeFromCart(item);
                }}
                className="simple-border flex gap-2 bg-[#ffffff] text-center px-4 py-1.5 hover:opacity-90 "
              >
                <span className="text-[13px] font-[200]">Process order</span>
              </button>
            </div>
          )}
        </div>
      </div>
      <PopUp show={showProduct} setShow={setShowProduct}>
        <Product
          item={item}
          close={() => {
            setShowProduct(false);
          }}
        />
      </PopUp>
    </>
  );
};
export default ShopItem;
