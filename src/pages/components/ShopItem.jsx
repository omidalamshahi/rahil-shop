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
        style={{
          // boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
          // boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 4.6px -2px',
          border: '1px solid #ccc',
        }}
        className="bg-white rounded-[5px] overflow-hidden flex flex-col justify-between"
      >
        <PhotoSliderSmall
          imgList={item.imgList}
          imgListSmall={item.imgListSmall}
          onImageClick={(index) => {
            setShowProduct(true);
          }}
        />

        <div className="p-4 flex flex-col">
          <h2 className="text-xl">{item.title}</h2>
          <div className="mt-2 text-gray-700 text-[14px]">
            €{item.price.toFixed(2)}{' '}
            <span className="text-[12px] text-gray-500">(+ shipping)</span>
          </div>

          {itemCartQuantity === 0 ? (
            <div className="mt-auto pt-4 select-none">
              <button
                href={item.link}
                className="bg-[#ffffff] w-full flex items-center justify-center text-center py-2 hover:opacity-90 "
                style={{
                  border: '1px solid #414141',
                }}
                onClick={() => {
                  addToCart(item);
                }}
              >
                {/* <SvgContainer icon={'CartAdd'} size={'1.2rem'} /> */}
                <span>Add to Cart</span>
              </button>
            </div>
          ) : (
            <div className="mt-auto pt-4 flex justify-around select-none">
              <div className="flex items-center gap-1 text-center">
                {/* <button
                  className="w-3.5 h-3.5"
                  style={{
                    border: '1px solid #414141',
                  }}
                  onClick={() => {
                    editCart({
                      quantity: itemCartQuantity + -1,
                    });
                  }}
                >
                  <SvgContainer icon={'Minus1'} size={'10px'} />
                </button>
                <div
                  className="w-6 h-6 text-center"
                  // style={{ border: '1px solid black' }}
                >
                  {itemCartQuantity}
                </div>
                <button
                  className="w-3.5 h-3.5"
                  style={{
                    border: '1px solid #414141',
                  }}
                  onClick={() => {
                    editCart({
                      quantity: itemCartQuantity + +1,
                    });
                  }}
                >
                  <SvgContainer icon={'Plus1'} size={'10px'} />
                </button> */}
                <select
                  name="choice"
                  style={{ background: '#fff', border: '1px solid black' }}
                >
                  <option value="">1</option>
                  <option value="">2</option>
                  <option value="">3</option>
                  <option value="">4</option>
                  <option value="">5</option>
                  <option value="">6</option>
                  <option value="">7</option>
                  <option value="">8</option>
                  <option value="">9</option>
                  <option value="">10</option>
                </select>
              </div>
              <button
                onClick={() => {
                  removeFromCart(item);
                }}
                className="flex gap-2 bg-[#ffffff] text-center px-4 py-2   hover:opacity-90 "
                style={{
                  // boxShadow: 'rgba(0, 0, 0, 0.25) 0px 6px 6px -4px',
                  border: '1px solid #414141',
                }}
              >
                {/* <SvgContainer icon={'CartRemove'} size={'1rem'} /> */}
                <span className="text-[12px]">Remove</span>
                {/* <span>Remove from Cart</span> */}
              </button>
              {/* <button
                className="flex gap-2 bg-[#ffffff] text-center px-4 py-2   hover:opacity-90 text-[12px]"
                style={{
                  // boxShadow: 'rgba(0, 0, 0, 0.25) 0px 6px 6px -4px',
                  border: '1px solid #414141',
                }}
                onClick={() => {
                  setShowProduct(true);
                }}
              >
                View More
              </button> */}
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
