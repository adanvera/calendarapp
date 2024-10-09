import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';


const tempEvent = [{
  _id: new Date().getTime(),
  title: 'Event slice redux',
  notes: 'this is a note',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Adán'
  }
}]

export const calendarSlice = createSlice({
  name: 'calendar ',
  initialState: {
    activeEvent: null,
    events: tempEvent
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    addNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdaEvent: (state, { payload }) => {
      state.events = state.events.map(event => event._id === payload._id ? payload : event);
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(event => event._id !== state.activeEvent._id);
        state.activeEvent = null;
      }
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  onSetActiveEvent,
  addNewEvent,
  onUpdaEvent,
  onDeleteEvent
} = calendarSlice.actions;