import imgShop1 from '../assets/shop/kalender.jpg';
import imgShop2 from '../assets/shop/Mousse au chocolat.jpg';
import imgShop3 from '../assets/shop/Tomate Mozzarella.jpg';
import imgShop4 from '../assets/shop/Veggie Döner.jpg';
import imgShop5 from '../assets/shop/Still Here Still Life, Week 115.jpg';
import imgShop6 from '../assets/shop/Anjir, Feige.jpg';
import imgShop7 from '../assets/shop/Kiwiorange.jpg';
import imgShop8 from '../assets/shop/Kürbise.jpg';
import imgShop9 from '../assets/shop/Chinapfanne.jpg';
import imgShop10 from '../assets/shop/Feta Minze.jpg';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartAction } from '../store/action';

import ShopItem from './components/ShopItem';

const Shop = () => {
  const products = useSelector((state) => state.shop.products.data);
  return (
    <div className="min-h-screen bg-[#e6e6e6] p-6">
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
