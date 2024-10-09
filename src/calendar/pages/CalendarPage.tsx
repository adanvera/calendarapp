import { addHours } from "date-fns";
import { getMessages, localizer } from "../../helpers";
import { calendarEvent, CalendarModal, Navbar } from "../components";
import { Calendar, View } from 'react-big-calendar'
import { useState } from "react";
import { useCalendarStore, useUiStore } from "../../hooks";
import { useDispatch } from "react-redux";
import { AppDispatch, modalOpen } from "../../store";

export const CalendarPage = () => {

  // variable of the last view
  const [lastView, setLastView] = useState<View>(localStorage.getItem('lastView') as View || 'month');
  const { modalSatus } = useUiStore();
  const dispatch = useDispatch<AppDispatch>();
  const { events } = useCalendarStore();

  // function to get the style of the event
  const eventStyleGetter = () => {
    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white'
    }
    return {
      style
    }
  }

  // Functions to handle the events

  const onDoubleClick = (event: any) => {
    console.log('onDoubleClick', event);
    dispatch(modalOpen());
  }

  const onSelectEvent = (event: any) => {
    console.log('onSelectEvent', event);
  }

  const onViewChange = (event: any) => {
    localStorage.setItem('lastView', event)
    setLastView(event)
  }

  // end of the event functions

  return (
    <>
      <Navbar />
      <Calendar
        culture='es-ES'
        localizer={localizer}
        events={events}
        startAccessor="start"
        defaultView={lastView}
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px )' }}
        messages={getMessages}
        eventPropGetter={eventStyleGetter}
        components={{
          event: (props) => calendarEvent(props)
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
      />
      <CalendarModal />
    </>
  )
}
