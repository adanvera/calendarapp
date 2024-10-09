import { getMessages, localizer } from "../../helpers";
import { calendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from "../components";
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
  const { events, setActiveEvent } = useCalendarStore();

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

  /*
  * Function to handle the double click event
  * @param event
  * @returns void
  * @autor Adán Vera
  * */
  const onDoubleClick = (event: any) => {
    dispatch(modalOpen());
  }

  /*
  * Function to handle the select event
  * @param event
  * @returns void
  * @autor Adán Vera
  * */
  const onSelectEvent = (event: any) => {
    setActiveEvent(event);
  }

  /*
  * Function to handle the view change
  * @param event
  * @returns void
  * @autor Adán Vera
  * */
  const onViewChange = (event: any) => {
    setLastView(event)
  }

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
      <FabAddNew />
      <FabDelete />
    </>
  )
}
