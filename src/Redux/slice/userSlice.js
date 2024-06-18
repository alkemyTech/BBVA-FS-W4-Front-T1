import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    token: "",
};

export const userSlice = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
      setUser: (state, action) => {
        return (state = action.payload);
      },
      setToken: (state, action) => {
        state.token = action.payload; // Añade una acción para actualizar el token
      },
      clearUser: (state) => {
        state.firstName = "";
        state.lastName = "";
        state.email = "";
        state.token = "";
      },
    },
  });
  
  export const { setUser, setToken, clearUser } = userSlice.actions;
  
  export default userSlice.reducer;