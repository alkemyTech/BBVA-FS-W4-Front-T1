import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '',
    status: '',
    open: false,
  },
  reducers: {
    showNotification: (state, action) => {
      state.message = action.payload.message;
      state.status = action.payload.status;
      state.open = true;
    },
    hideNotification: (state) => {
      state.open = false;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
