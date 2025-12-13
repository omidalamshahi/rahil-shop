import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartAction } from '../store/action';

import ShopItem from './components/ShopItem';

const Shop = () => {
  const products = useSelector((state) => state.shop.products.data);
  return (
    <div className="min-h-screen bg-[#ffffff] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(products).map(([id, item]) => (
            <ShopItem item={{ ...item, id }} key={id} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Shop;
