import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // set credential to userinfo state
    setCrendials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    // remove credential from state and local storage
    logout: (state, action) => {
      state.userInfo = "";
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCrendials, logout } = authSlice.actions;

export default authSlice.reducer;
