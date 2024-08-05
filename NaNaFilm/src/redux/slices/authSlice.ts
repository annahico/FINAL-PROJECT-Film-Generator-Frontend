// src/redux/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "../../utils/interface/types";

// Helper function to safely get and parse data from localStorage
const getLocalStorageItem = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error parsing localStorage item ${key}:`, error);
    return null;
  }
};

// Define the initial state for the auth slice
const initialState: AuthState = {
  currentUser: getLocalStorageItem<User>("user"),
  token: getLocalStorageItem<string>("token") ?? null,
};

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<User | null>) {
      state.currentUser = action.payload;
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
  },
});

// Export actions
export const { setCurrentUser, setToken } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
