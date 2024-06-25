import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  selectedDay: '',
};

const simulatedFixedTermSlice = createSlice({
  name: 'simulatedData',
  initialState,
  reducers: {
    setSimulatedFixedTerm: (state, action) => {
      state.data = action.payload;
    },
    clearSimulatedFixedTerm: (state) => {
      state.data = null;
    },
    setSelectedDay: (state, action) => {
        state.selectedDay = action.payload;
      },
      clearSelectedDay: (state) => {
        state.selectedDay = '';
      },
  },
});

export const { setSimulatedFixedTerm, clearSimulatedFixedTerm, setSelectedDay,  clearSelectedDay} = simulatedFixedTermSlice.actions;

export default simulatedFixedTermSlice.reducer;
