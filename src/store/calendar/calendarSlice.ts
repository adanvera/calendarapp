import { createSlice } from '@reduxjs/toolkit';

export const calendarSlice = createSlice({
  name: 'calendar ',
  initialState: {
    counter: 10
  },
  reducers: {
    decrement: (state) => {
      state.counter += 1;
    },
  }
});

// Action creators are generated for each case reducer function
export const { decrement } = calendarSlice.actions;