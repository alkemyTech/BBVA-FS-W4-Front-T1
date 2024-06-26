import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  selectedDay: "",
  totalInverted: 0,
};

const simulatedFixedTermSlice = createSlice({
  name: "simulatedData",
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
      state.selectedDay = "";
    },
    setTotalInverted: (state, action) => {
      state.totalInverted = action.payload;
    },
  },
});

export const {
  setSimulatedFixedTerm,
  clearSimulatedFixedTerm,
  setSelectedDay,
  clearSelectedDay,
  setTotalInverted,
} = simulatedFixedTermSlice.actions;

export default simulatedFixedTermSlice.reducer;
