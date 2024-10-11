import { createSlice } from '@reduxjs/toolkit';

interface CalendarEvent {
  title: string;
  notes: string;
  end: string | number | Date;
  start: string | number | Date;
  id: string;
  // Add other properties of the event here
}

export const calendarSlice = createSlice({
  name: 'calendar ',
  initialState: {
    activeEvent: null as CalendarEvent | null,
    isLoading: true,
    events: [] as CalendarEvent[]
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
      state.events = state.events.map(event => event.id === payload.id ? payload : event);
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(event => state.activeEvent && event.id !== state.activeEvent.id);
        state.activeEvent = null;
      }
    },
    onLoadEvents: (state, { payload = [] }) => {
      state.isLoading = false;
      // state.events = payload;
      payload.forEach((event: CalendarEvent) => {
        const exists = state.events.some((dbEvent: CalendarEvent) => dbEvent.id === event.id);
        if (!exists) {
          state.events.push(event);
        }
      });
    },
    onLogoutCalendar: (state) => {
      state.activeEvent = null as any;
      state.isLoading = true;
      state.events = null as any;
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  onSetActiveEvent,
  addNewEvent,
  onUpdaEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar
} = calendarSlice.actions;