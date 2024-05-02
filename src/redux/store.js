// store.js

import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice.js"

// Function to load state from local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

// Function to save state to local storage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch (error) {
    // Handle errors while saving state
  }
};

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: preloadedState,
});

// Subscribe to store updates to save state to local storage
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
