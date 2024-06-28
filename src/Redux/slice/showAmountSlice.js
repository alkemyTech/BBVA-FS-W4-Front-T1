import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showAmount: false,
};

const showAmountSlice = createSlice({
  name: 'showAmount',
  initialState,
  reducers: {
    toggleShowAmount: (state) => {
      state.showAmount = !state.showAmount;
    },
    setShowAmount: (state, action) => {
      state.showAmount = action.payload;
    },
  },
});

export const { toggleShowAmount, setShowAmount } = showAmountSlice.actions;

export default showAmountSlice.reducer;
