import { getMessages, localizer } from "../../helpers";
import { calendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from "../components";
import { Calendar, View } from 'react-big-calendar'
import { useEffect, useMemo, useState } from "react";
import { useAuthStore, useCalendarStore } from "../../hooks";
import { useDispatch } from "react-redux";
import { AppDispatch, modalOpen } from "../../store";

export const CalendarPage = () => {

  // variable of the last view
  const [lastView, setLastView] = useState<View>(localStorage.getItem('lastView') as View || 'month');
  const dispatch = useDispatch<AppDispatch>();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const { color } = useAuthStore();

  // function to get the style of the event
  const eventStyleGetter = () => {
    const style = {
      backgroundColor: color,
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white'
    }
    return {
      style
    }
  }

  // usar useMemo para que solo se ejecute cuando cambie el color
  useMemo(() => {
    eventStyleGetter();
  }, [color])

  /*
  * Function to handle the double click event
  * @param event
  * @returns void
  * @autor Adán Vera
  * */
  const onDoubleClick = () => {
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

  useEffect(() => {
    startLoadingEvents();
  }, [])

  return (
    <>
      <Navbar />
      <Calendar
        culture='es-ES'
        localizer={localizer}
        events={events}
        startAccessor={(event: any) => new Date(event.start)}
        defaultView={lastView}
        endAccessor={(event: any) => new Date(event.end)}
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
