import { createSlice } from '@reduxjs/toolkit';

//fix this plzzz
import.meta.glob('../assets/Images/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
});
const Kalender = import.meta.glob(
  '../assets/Images/Kalender/*.{jpg,jpeg,png,webp,avif}',
  {
    eager: true,
  }
);
const KalenderSmall = import.meta.glob(
  '../assets/Images/Kalender/small/*.{jpg,jpeg,png,webp,avif}',
  {
    eager: true,
  }
);
import.meta.glob('../assets/Images/shop/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
});
import.meta.glob('../assets/Images/rahil/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
});

import imgShop2 from '../assets/Images/shop/Mousse au chocolat.jpg';
import imgShop3 from '../assets/Images/shop/Tomate Mozzarella.jpg';
import imgShop4 from '../assets/Images/shop/Veggie Döner.jpg';

const tempProducts = {
  'painting-001': {
    title: 'Calendar 2026',
    price: 33,
    detail: `
    Details:
    Printed on 250g paper
    Edition of 50, each signed`,
    imgList: Object.values(Kalender).map((item) => item.default),
    imgListSmall: Object.values(KalenderSmall).map((item) => item.default),
    stripe: 'price_1ScxEd5SqYSXvBNRX6FqJOuP',
  },
  'painting-002': {
    title: 'Mousse au chocolat',
    price: 60,
    imgList: [imgShop2],
    imgListSmall: [],
    stripe: 'price_1ScxGs5SqYSXvBNRaN4KaikV',
  },
  'painting-003': {
    title: 'Tomate Mozzarella',
    price: 60,
    imgList: [imgShop3],
    imgListSmall: [],
    stripe: 'price_1ScxHq5SqYSXvBNRkOILgpj7',
  },
  'painting-004': {
    title: 'Veggie Döner',
    price: 38,
    imgList: [imgShop4],
    imgListSmall: [],
    stripe: 'price_1ScxIg5SqYSXvBNRbP9Jwwqp',
  },
};

const shopReducer = createSlice({
  name: 'shop',
  initialState: {
    products: {
      error: null,
      loading: false,
      data: tempProducts,
    },
    cart: {
      error: null,
      loading: false,
      data: {},
    },
  },

  reducers: {
    cartStart(state) {
      state.cart.loading = true;
      state.cart.error = false;
    },
    cartFailure(state, action) {
      state.cart.loading = false;
      state.cart.error = action.payload?.errorMessage || 'Unknown Error';
    },

    getCartSuccess(state, action) {
      state.cart.loading = false;
      state.cart.data = {
        ...(action.payload.cart || {}),
      };
    },
    addToCartSuccess(state, action) {
      state.cart.loading = false;
      const newCartItem = action.payload.newCartItem || {};
      const newCart = { ...state.cart.data, ...newCartItem };
      state.cart.data = newCart;
      localStorage.setItem('cart', JSON.stringify(newCart));
    },
    removeCartItemSuccess(state, action) {
      state.cart.loading = false;
      const oldCart = { ...state.cart.data };
      const id = action.payload.itemId;
      const { [id]: _, ...newCart } = oldCart;
      state.cart.data = newCart;
      localStorage.setItem('cart', JSON.stringify(newCart));
    },
    clearCartSuccess(state) {
      state.cart.data = {};
      localStorage.removeItem('cart');
    },
  },
});

export const shopMutation = shopReducer.actions;
export default shopReducer;

// const state = useStore().getState();
// export const selectRegisterItemById = (itemId) => {
//   console.log(state.steam.registeredItems.data[itemId])
//   return state.steam.registeredItems.data[itemId];
// };
