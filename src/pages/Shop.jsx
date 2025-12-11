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

const Shop = () => {
  const items = [
    {
      id: 'painting-001',
      title: 'Calendar 2026',
      priceNet: 33,
      vat: 0.19,
      img: imgShop1,
      stripe: 'price_1ScxEd5SqYSXvBNRX6FqJOuP',
    },
    {
      id: 'painting-002',
      title: 'Mousse au chocolat',
      priceNet: 60,
      vat: 0.19,
      img: imgShop2,
      stripe: 'price_1ScxGs5SqYSXvBNRaN4KaikV',
    },
    {
      id: 'painting-003',
      title: 'Tomate Mozzarella',
      priceNet: 60,
      vat: 0.19,
      img: imgShop3,
      stripe: 'price_1ScxHq5SqYSXvBNRkOILgpj7',
    },
    {
      id: 'painting-003',
      title: 'Veggie Döner',
      priceNet: 38,
      vat: 0.19,
      img: imgShop4,
      stripe: 'price_1ScxIg5SqYSXvBNRbP9Jwwqp',
    },
    // {
    //   id: 'painting-004',
    //   title: 'Still Here Still Life, Week 115',
    //   priceNet: 60,
    //   vat: 0.19,
    //   img: imgShop5,
    //   link: 'YOUR_PAYMENT_LINK_3',
    // },
    // {
    //   id: 'painting-005',
    //   title: 'Anjir, Feige',
    //   priceNet: 38,
    //   vat: 0.19,
    //   img: imgShop6,
    //   link: 'YOUR_PAYMENT_LINK_3',
    // },
    // {
    //   id: 'painting-006',
    //   title: 'Kiwiorange',
    //   priceNet: 38,
    //   vat: 0.19,
    //   img: imgShop7,
    //   link: 'YOUR_PAYMENT_LINK_3',
    // },
    // {
    //   id: 'painting-007',
    //   title: 'Kürbise',
    //   priceNet: 38,
    //   vat: 0.19,
    //   img: imgShop8,
    //   link: 'YOUR_PAYMENT_LINK_3',
    // },
    // {
    //   id: 'painting-008',
    //   title: 'Chinapfanne',
    //   priceNet: 38,
    //   vat: 0.19,
    //   img: imgShop9,
    //   link: 'YOUR_PAYMENT_LINK_3',
    // },
    // {
    //   id: 'painting-009',
    //   title: 'Feta Minze',
    //   priceNet: 38,
    //   vat: 0.19,
    //   img: imgShop10,
    //   link: 'YOUR_PAYMENT_LINK_3',
    // },
  ];

  const addToCart = (data) => {
    alert(`
      Dast Nazan...
      Hanoz Amade nist! :)
      `)
    return;
    const oldCart = localStorage.getItem('cart');
    const newItem = {
      id: data.id,
      quantity: 1,
      stripe: data.stripe,
    };
    const newCart = [...oldCart, newItem];
    localStorage.setItem('cart', newCart);
  };

  return (
    <div className="min-h-screen bg-[#e6e6e6] p-6">
      <div className="max-w-6xl mx-auto">
        {/* <h1 className="text-3xl font-bold mb-6">My Art Shop</h1> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => {
            const priceGross = item.priceNet.toFixed(2);
            return (
              <div
                key={item.id}
                className="bg-white rounded-[5px] shadow-md overflow-hidden flex flex-col"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-130 object-cover"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <div className="mt-2 text-gray-700">
                    €{priceGross}{' '}
                    <span className="text-sm text-gray-500">(+ shipping)</span>
                  </div>

                  <div className="mt-auto pt-4">
                    <button
                      href={item.link}
                      className="bg-[#abb5ff] w-full block text-center py-2 rounded-[5px] shadow-md font-semibold hover:opacity-90 "
                      target="_blank"
                      onClick={() => {
                        addToCart(item);
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        {/* <div className="mt-12 text-xs text-gray-500 text-center">
          Prices include VAT. Shipping calculated during checkout.
        </div> */}
      </div>
    </div>
  );
};
export default Shop;
