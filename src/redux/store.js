import { configureStore } from '@reduxjs/toolkit';
import userSlice from "./userslice"; // Import your userSlice reducer

const initialState = {
    loggedinuser: { value: "guest" }, // Set initial logged-in user ID
};

const store = configureStore({
    reducer: {
        loggedinuser: userSlice.reducer
    }
});

export default store;


