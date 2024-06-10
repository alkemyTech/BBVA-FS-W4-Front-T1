import { createSlice } from '@reduxjs/toolkit';

const saldoSlice = createSlice({
  name: 'saldo',
  initialState: {
    value: 0
  },
  reducers: {
    incrementarSaldo: (state, action) => {
      state.value += action.payload;
    },
    decrementarSaldo: (state, action) => {
      state.value -= action.payload;
    }
  }
});

export const { incrementarSaldo, decrementarSaldo } = saldoSlice.actions;
export default saldoSlice.reducer;