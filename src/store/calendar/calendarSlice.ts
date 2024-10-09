import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';


const tempEvent = [{
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

  }
});

// Action creators are generated for each case reducer function
export const { 
  
} = calendarSlice.actions;