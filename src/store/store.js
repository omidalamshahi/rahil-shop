import { configureStore } from '@reduxjs/toolkit';

import shopSlice from './reducer';

const store = configureStore({
  reducer: {
    shop: shopSlice.reducer,
  },
});

export default store;
