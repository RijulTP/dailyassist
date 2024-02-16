import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "loggedinuser",
  initialState: {
    value: "guest",
  },
  reducers: {
    updateLoggedInUser(state, action) {
      const newUserId = action.payload;
      state.value = newUserId;
    },
  },
})

export const { updateLoggedInUser } = userSlice.actions;
export default userSlice; // Export the entire slice
