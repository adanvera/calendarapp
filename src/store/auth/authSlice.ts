import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth ',
  initialState: {
    satus: 'checking', // 'checking' | 'authenticated' | 'not-authenticated'
    user: null as null | Record<string, any>,
    errorMessage: ''
  },
  reducers: {
    checking: (state) => {
      state.satus = 'checking';
      state.user = {} as Record<string, any>;
      state.errorMessage = undefined as any;
    },
    login: (state, { payload }) => {
      state.satus = 'authenticated';
      state.user = payload;
    },
    logout: (state) => {
      state.satus = 'not-authenticated';
      state.user = {} as Record<string, any>;
      state.errorMessage = undefined as any;
    }
  }
});

// Action creators are generated for each case reducer function
export const { checking, login, logout } = authSlice.actions;