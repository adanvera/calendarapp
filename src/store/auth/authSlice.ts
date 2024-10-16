import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth ',
  initialState: {
    status: 'not-authenticated', // 'checking' | 'authenticated' | 'not-authenticated'
    user: null as null | Record<string, any>,
    errorMessage: undefined as any,
    color: localStorage.getItem('color') || '#3498db'
  },
  reducers: {
    checking: (state) => {
      state.status = 'checking';
      state.user = {} as Record<string, any>;
      state.errorMessage = undefined as any;
    },
    login: (state, { payload }) => {
      state.status = 'authenticated';
      state.user = payload;
    },
    logout: (state, { payload }) => {
      state.status = 'not-authenticated';
      state.user = {} as Record<string, any>;
      state.errorMessage = payload;
    },
    clearError: (state) => {
      state.errorMessage = undefined as any;
    },
    updateColor: (state, { payload }) => {
      state.color = payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { checking, login, logout, clearError , updateColor} = authSlice.actions;