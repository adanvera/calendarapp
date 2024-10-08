import { addHours } from "date-fns";
import { getMessages, localizer } from "../../helpers";
import { calendarEvent, CalendarModal, Navbar } from "../components";
import { Calendar, View } from 'react-big-calendar'
import { useState } from "react";

export const CalendarPage = () => {

  // variable of the last view
  const [ lastView, setLastView ] = useState<View>(localStorage.getItem('lastView') as View || 'month')

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

  // Array of events
  const myEventsList = [{
    title: 'All Day Event very long title',
    notes: 'this is a note',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
      _id: '123',
      name: 'Adán'
    }
  }]

  // Functions to handle the events

  const onDoubleClick = (event: any) => {
    console.log('onDoubleClick',event);
  }

  const onSelectEvent = (event: any) => {
    console.log('onSelectEvent', event);
  }

  const onViewChange = (event: any) => {
    localStorage.setItem('lastView', event)
    setLastView(event)
  }

  return (
    <>
      <Navbar />
      <Calendar
        culture='es-ES'
        localizer={localizer}
        events={myEventsList}
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
