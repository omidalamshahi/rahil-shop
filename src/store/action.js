// import axios from 'axios';
import { shopMutation } from './reducer';

const safeAdd = (...args) =>
  args.reduce((sum, n) => sum + Math.round(n * 1000), 0) / 1000;

export const getCartAction = () => {
  console.log('getCart-action');
  return async (dispatch) => {
    dispatch(shopMutation.cartStart());
    try {
      const cart = JSON.parse(localStorage.getItem('cart')) || {};
      dispatch(shopMutation.getCartSuccess({ cart }));
    } catch (error) {
      const errorMessage = error?.message;
      dispatch(shopMutation.cartFailure({ errorMessage }));
    }
  };
};

export const addToCartAction = (newItem) => {
  console.log('addToCart-action');
  return async (dispatch, getState) => {
    dispatch(shopMutation.cartStart());
    try {
      if (!newItem.id || typeof newItem.quantity !== 'number') {
        throw { error: { message: 'Incorect' } };
      }
      const newCartItem = {
        [newItem.id]: { quantity: newItem.quantity, stripe: newItem.stripe },
      };
      dispatch(shopMutation.addToCartSuccess({ newCartItem }));
    } catch (error) {
      const errorMessage = error?.message;
      dispatch(shopMutation.cartFailure({ errorMessage }));
    }
  };
};

export const removeCartItemAction = (productId) => {
  console.log('removeCartItem-action');
  return async (dispatch) => {
    dispatch(shopMutation.cartStart());
    try {
      dispatch(shopMutation.removeCartItemSuccess({ itemId: [productId] }));
    } catch (error) {
      const errorMessage = error?.message;
      dispatch(shopMutation.cartFailure({ errorMessage }));
    }
  };
};
