import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui ',
  initialState: {
    modalSatus: false
  },
  reducers: {
    modalClose: (state,/*action*/) => {
      state.modalSatus = false;
    },
    modalOpen: (state,/*action*/) => {
      state.modalSatus = true;
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  modalClose,
  modalOpen
} = uiSlice.actions;