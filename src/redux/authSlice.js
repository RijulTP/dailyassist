import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedInUser: "",
  userId: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedInUser: (state, action) => {
      console.log("setting the logged in user to",action,"=====")
      state.loggedInUser = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setLoginStatus: (state, action) => {
      console.log("setting the username to",action,"=====")
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setLoggedInUser, setUserId, setLoginStatus } = authSlice.actions;

export default authSlice.reducer;
