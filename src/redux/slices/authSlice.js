// src/features/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  token: localStorage.getItem('jwt') || null, // Check if there's a saved token
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      localStorage.setItem('jwt', action.payload.token); // Save token to localStorage
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('jwt'); // Remove token from localStorage
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;