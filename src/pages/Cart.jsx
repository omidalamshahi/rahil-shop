import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { addToCartAction, removeCartItemAction } from '../store/action';

//components
import SvgContainer from '../ui/SvgContainer';

// fix
const itemInventory = 20;

const Cart = ({ setShow }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.shop.cart.data);
  const products = useSelector((state) => state.shop.products.data);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    if (Object.keys(cart).length === 0) {
      setShow(false);
    }
  }, [cart]);

  useEffect(() => {
    let total = 0;
    Object.keys(cart).forEach((itemId) => {
      const itemPrice = products[itemId].priceNet;
      const itemQuantity = cart[itemId].quantity;
      total += itemQuantity * itemPrice;
    });
    setCartTotal(total);
  }, [cart]);

  const checkout = async () => {
    if (!cart || Object.keys(cart).length === 0) return;
    const readyCart = Object.keys(cart)
      .map((id) => {
        const product = products[id];
        const item = cart[id];
        if (!product?.stripe) return null;
        if (typeof item?.quantity !== 'number' || item.quantity <= 0)
          return null;

        return {
          priceId: product.stripe,
          quantity: item.quantity,
        };
      })
      .filter(Boolean);
    if (readyCart.length === 0) return;
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: readyCart }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };

  const close = () => {
    setShow(false);
  };

  const editCart = (data) => {
    if (!data.id || typeof data.quantity !== 'number') return;
    if (data.quantity > itemInventory) return;
    if (data.quantity === 0) {
      removeFromCart(data.id);
      return;
    }
    const newItem = {
      id: data.id,
      quantity: data.quantity,
    };
    dispatch(addToCartAction(newItem));
  };
  const removeFromCart = (id) => {
    dispatch(removeCartItemAction(id));
  };
  return (
    <div
      className="fixed flex flex-col w-120 max-w-[90vw] right-0 z-1000 bg-[#f1f1f1e9] shadow-md max-h-[calc(100vh-3rem)] px-4 py-2 gap-2 overflow-auto mt-2 rounded-[5px]"
      // style={{ backdropFilter: 'blur(5px)' }}
    >
      <button
        className="absolute top-2 right-2 bg-[#ff6a6a] rounded-[5px]"
        onClick={close}
      >
        <SvgContainer icon={'Cancel2'} size={'1.5rem'} />
      </button>
      <div className="font-semibold text-[1.3rem] px-1">You Cart</div>
      <div className="flex flex-col gap-4">
        {Object.entries(cart).map(([id, cartItem]) => {
          const itemCartQuantity = cart[id]?.quantity;
          const item = products[id];
          return (
            <div
              key={id}
              className="bg-[#ffffffdc] rounded-[5px] overflow-hidden p-4 flex gap-4"
            >
              <img
                src={item.imgList[0]}
                alt={item.title}
                className="w-25 h-35 object-contain"
              />
              <div className="flex flex-col flex-1 justify-center">
                <div className="flex px-2 gap-4">
                  <div>
                    <h2 className="text-xl font-semibold">{item.title}</h2>
                    <div className="mt-2 text-gray-700">
                      €{item.priceNet.toFixed(2)}
                    </div>
                  </div>
                </div>
                {/* <div className="p-4 pt-4 flex justify-end gap-5 select-none "> */}
                <div className="p-4 pt-4 ml-auto flex flex-wrap gap-5 select-none">
                  <div className="flex items-center gap-0 py-2 text-center ">
                    <button
                      className="bg-[#eeeeee] rounded-[5px] p-0.5"
                      onClick={() => {
                        editCart({
                          id: id,
                          quantity: itemCartQuantity + -1,
                        });
                      }}
                    >
                      <SvgContainer icon={'Minus1'} size={'0.9rem'} />
                    </button>
                    <div className="w-6 h-6 text-center font-semibold">
                      {itemCartQuantity}
                    </div>
                    <button
                      className="bg-[#e9e9e9] rounded-[5px]  p-0.5"
                      onClick={() => {
                        editCart({
                          id: id,
                          quantity: itemCartQuantity + +1,
                        });
                      }}
                    >
                      <SvgContainer icon={'Plus1'} size={'0.9rem'} />
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      removeFromCart(id);
                    }}
                    className="flex items-center gap-2 bg-[#ffebeb] text-center px-2 py-2 rounded-[5px] font-semibold hover:opacity-90 text-[0.8rem]"
                  >
                    <SvgContainer icon={'CartRemove'} size={'1rem'} />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-around gap-3 p-4 mx-2">
        <div className="font-semibold">
          <span>Total: </span>
          <span>€</span>
          <span>{cartTotal}</span>
          <span className="text-sm text-gray-500"> (+ shipping)</span>
        </div>
        <button
          onClick={checkout}
          className="flex gap-2 bg-[#87e098] px-4 py-2 rounded-[5px] font-semibold hover:opacity-90"
        >
          <SvgContainer icon={'Checkout'} size={'1.2rem'} />
          <span className="">Checkout</span>
        </button>
      </div>
    </div>
  );
};
export default Cart;
