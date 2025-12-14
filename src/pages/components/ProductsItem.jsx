import { useDispatch, useSelector } from 'react-redux';
import SvgContainer from '../../components/ui/SvgContainer';
import { addToCartAction, removeCartItemAction } from '../../store/action';
import PhotoSliderSmall from '../../components/PhotoSlider/PhotoSliderSmall';
import HoverCycler from '../../components/ui/HoverCycler';
import { div } from 'framer-motion/client';
import PhotoSlider2 from '../../components/PhotoSlider/PhotoSlider2';

// fix
const itemInventory = 20;
const Product = ({ item, close }) => {
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
    <div className="fixed top-15 left-0 w-full z-400">
      <div
        className="backdrop -z-1"
        onClick={() => {
          close();
        }}
      />
      <div
        key={item.id}
        className="m-auto w-[80%] max-h-[calc(100vh-75px)]
         bg-white rounded-[5px] shadow-md overflow-hidden flex flex-col
         sm:flex-row
         "
      >
        {/* <img
          src={item.imgList[0]}
          alt={item.title}
          className="w-full h-130 object-cover"
        /> */}
        {/* <PhotoSliderSmall imgList={item.imgList} /> */}
        <PhotoSlider2 imgList={item.imgList} />
        {/* {item.id !== 'painting-002' && (
      )}
      {item.id === 'painting-002' && (
        <HoverCycler
          imgList={item.imgList}
          className="w-full h-130 object-cover"
        />
      )} */}

        {/* <div className="p-4 flex flex-col">
          <div>
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <div className="mt-2 text-gray-700">
              €{item.price.toFixed(2)}{' '}
              <span className="text-sm text-gray-500">(+ shipping)</span>
            </div>
            <span className="text-sm text-gray-500">{item.detail}</span>
          </div>

          {itemCartQuantity === 0 ? (
            <div className="pt-4 select-none">
              <button
                href={item.link}
                className="bg-[#dce0ff] w-full flex items-center justify-center text-center py-2 rounded-[5px] shadow-md font-semibold hover:opacity-90 "
                style={{
                  boxShadow: 'rgba(0, 0, 0, 0.25) 0px 6px 6px -4px',
                }}
                onClick={() => {
                  addToCart(item);
                }}
              >
                <SvgContainer icon={'CartAdd'} size={'1.2rem'} />
                <span>Add to Cart</span>
              </button>
            </div>
          ) : (
            <div className="pt-4 flex justify-around select-none">
              <div className="flex items-center gap-1 py-2 text-center">
                <button
                  className="bg-[#eeeeee] rounded-[5px] w-5 h-5 "
                  onClick={() => {
                    editCart({
                      quantity: itemCartQuantity + -1,
                    });
                  }}
                >
                  <SvgContainer icon={'Minus1'} />
                </button>
                <div
                  className="w-6 h-6 text-center font-semibold"
                  // style={{ border: '1px solid black' }}
                >
                  {itemCartQuantity}
                </div>
                <button
                  className="bg-[#e9e9e9] rounded-[5px] w-5 h-5"
                  onClick={() => {
                    editCart({
                      quantity: itemCartQuantity + +1,
                    });
                  }}
                >
                  <SvgContainer icon={'Plus1'} />
                </button>
              </div>
              <button
                onClick={() => {
                  removeFromCart(item);
                }}
                className="flex gap-2 bg-[#ffebeb] text-center px-4 py-2 rounded-[5px] shadow-md font-semibold hover:opacity-90 "
                style={{
                  boxShadow: 'rgba(0, 0, 0, 0.25) 0px 6px 6px -4px',
                }}
              >
                <SvgContainer icon={'CartRemove'} size={'1.2rem'} />
                <span>Remove from Cart</span>
              </button>
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
};
export default Product;
