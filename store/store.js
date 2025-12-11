import { configureStore } from '@reduxjs/toolkit';

import shopSlice from './steam/reducer';

const store = configureStore({
  reducer: {
    shop: shopSlice.reducer,
  },
});

export default store;
