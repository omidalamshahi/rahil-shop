import { createSlice } from '@reduxjs/toolkit';

const shopReducer = createSlice({
  name: 'shop',
  initialState: {
    products: {
      error: null,
      loading: false,
      data: {},
    },
    cart: {
      error: null,
      loading: false,
      data: {},
    },
  },

  reducers: {
    // getProducts
    // addTransactionStart(state) {
    //   state.transactions.loading = true;
    //   state.transactions.error = null;
    // },
    // addTransactionSuccess(state, action) {
    //   state.transactions.loading = false;
    //   state.transactions.data = {
    //     ...state.transactions.data,
    //     ...(action.payload?.newTransaction || {}),
    //   };
    //   state.historyTimeline.data = {
    //     ...action.payload?.newHistoryTimeline,
    //   };
    //   state.itemsHistory.data = {
    //     ...action.payload?.newItemsHistory,
    //   };
    // },
    // addTransactionFailure(state, action) {
    //   state.transactions.loading = false;
    //   state.transactions.error = action.payload?.error || 'Unknown error';
    // },
  },
});

export const shopMutation = shopReducer.actions;
export default shopReducer;

// const state = useStore().getState();
// export const selectRegisterItemById = (itemId) => {
//   console.log(state.steam.registeredItems.data[itemId])
//   return state.steam.registeredItems.data[itemId];
// };
