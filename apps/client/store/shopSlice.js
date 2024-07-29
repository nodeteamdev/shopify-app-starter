import { createSlice } from '@reduxjs/toolkit';

const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    shop: '',
  },
  reducers: {
    setShop: (state, action) => {
      state.shop = action.payload;
    },
  },
});

export const { setShop } = shopSlice.actions;
export default shopSlice.reducer;
