import { configureStore } from '@reduxjs/toolkit';
import shopReducer from './shopSlice';

const store = configureStore({
  reducer: {
    shop: shopReducer,
  },
});

export default store;
