const Shop = () => {
  const items = [
    {
      id: 'painting-001',
      title: 'Calendar 2026',
      priceNet: 33,
      vat: 0.19,
      img: '/src/assets/art2.jpg',
      link: 'YOUR_PAYMENT_LINK_1', // Stripe Payment Link or any checkout URL
    },
    {
      id: 'painting-002',
      title: 'Mousse au chocolat',
      priceNet: 60,
      vat: 0.19,
      img: '/src/assets/shop/Mousse au chocolat.jpg',
      link: 'YOUR_PAYMENT_LINK_2',
    },
    {
      id: 'painting-003',
      title: 'Tomate Mozzarella',
      priceNet: 60,
      vat: 0.19,
      img: '/src/assets/shop/Tomate Mozzarella.jpg',
      link: 'YOUR_PAYMENT_LINK_3',
    },
    {
      id: 'painting-003',
      title: 'Veggie Döner',
      priceNet: 38,
      vat: 0.19,
      img: '/src/assets/shop/Veggie Döner.jpg',
      link: 'YOUR_PAYMENT_LINK_3',
    },
    {
      id: 'painting-004',
      title: 'Still Here Still Life, Week 115',
      priceNet: 60,
      vat: 0.19,
      img: '/src/assets/shop/Still Here Still Life, Week 115.jpg',
      link: 'YOUR_PAYMENT_LINK_3',
    },
    {
      id: 'painting-005',
      title: 'Anjir, Feige',
      priceNet: 38,
      vat: 0.19,
      img: '/src/assets/shop/Anjir, Feige.jpg',
      link: 'YOUR_PAYMENT_LINK_3',
    },
    {
      id: 'painting-006',
      title: 'Kiwiorange',
      priceNet: 38,
      vat: 0.19,
      img: '/src/assets/shop/Kiwiorange.jpg',
      link: 'YOUR_PAYMENT_LINK_3',
    },
    {
      id: 'painting-007',
      title: 'Kürbise',
      priceNet: 38,
      vat: 0.19,
      img: '/src/assets/shop/Kürbise.jpg',
      link: 'YOUR_PAYMENT_LINK_3',
    },
    {
      id: 'painting-008',
      title: 'Chinapfanne',
      priceNet: 38,
      vat: 0.19,
      img: '/src/assets/shop/Chinapfanne.jpg',
      link: 'YOUR_PAYMENT_LINK_3',
    },
    {
      id: 'painting-009',
      title: 'Feta Minze',
      priceNet: 38,
      vat: 0.19,
      img: '/src/assets/shop/Feta Minze.jpg',
      link: 'YOUR_PAYMENT_LINK_3',
    },
  ];
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Art Shop</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => {
            const priceGross = item.priceNet.toFixed(2);
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-60 object-cover"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <div className="mt-2 text-gray-700">
                    €{priceGross}{' '}
                    <span className="text-sm text-gray-500">(+ shipping)</span>
                  </div>

                  <div className="mt-auto pt-4">
                    {item.link && item.link !== 'YOUR_PAYMENT_LINK_1' ? (
                      <a
                        href={item.link}
                        className="block text-center py-2 rounded-xl shadow-md font-semibold hover:opacity-90"
                      >
                        Buy now
                      </a>
                    ) : (
                      <button
                        onClick={() =>
                          alert('Set your payment link for ' + item.title)
                        }
                        className="w-full py-2 rounded-xl shadow-md font-semibold hover:opacity-90"
                      >
                        Buy now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-12 text-xs text-gray-500 text-center">
          Prices include VAT. Shipping calculated during checkout.
        </div>
      </div>
    </div>
  );
};
export default Shop;
