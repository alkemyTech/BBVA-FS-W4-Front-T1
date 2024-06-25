import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedDestination: null,
  confirmedDestination: false,
};

const transferSlice = createSlice({
  name: "transfer",
  initialState,
  reducers: {
    setSelectedDestination: (state, action) => {
      state.selectedDestination = action.payload;
    },
    clearSelectedDestination: (state) => {
      state.selectedDestination = null;
      state.confirmedDestination = false;
    },
    setConfirmedDestination: (state) => {
      state.confirmedDestination = true;
    },
    setDestinationAndConfirm: (state, action) => {
      state.selectedDestination = action.payload;
      state.confirmedDestination = true;
    },
  },
});

export const {
  setSelectedDestination,
  clearSelectedDestination,
  setConfirmedDestination,
  setDestinationAndConfirm,
} = transferSlice.actions;
export default transferSlice.reducer;
