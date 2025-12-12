import { createSlice } from '@reduxjs/toolkit';


//fix this plzzz
import imgShop1 from '../assets/shop/kalender.jpg';
import imgShop2 from '../assets/shop/Mousse au chocolat.jpg';
import imgShop3 from '../assets/shop/Tomate Mozzarella.jpg';
import imgShop4 from '../assets/shop/Veggie Döner.jpg';
const tempProducts = {
  'painting-001': {
    // id: 'painting-001',
    title: 'Calendar 2026',
    priceNet: 33,
    vat: 0.19,
    img: imgShop1,
    stripe: 'price_1ScxEd5SqYSXvBNRX6FqJOuP',
  },
  'painting-002': {
    // id: 'painting-002',
    title: 'Mousse au chocolat',
    priceNet: 60,
    vat: 0.19,
    img: imgShop2,
    stripe: 'price_1ScxGs5SqYSXvBNRaN4KaikV',
  },
  'painting-003': {
    // id: 'painting-003',
    title: 'Tomate Mozzarella',
    priceNet: 60,
    vat: 0.19,
    img: imgShop3,
    stripe: 'price_1ScxHq5SqYSXvBNRkOILgpj7',
  },
  'painting-004': {
    // id: 'painting-004',
    title: 'Veggie Döner',
    priceNet: 38,
    vat: 0.19,
    img: imgShop4,
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
  },
});

export const shopMutation = shopReducer.actions;
export default shopReducer;

// const state = useStore().getState();
// export const selectRegisterItemById = (itemId) => {
//   console.log(state.steam.registeredItems.data[itemId])
//   return state.steam.registeredItems.data[itemId];
// };
