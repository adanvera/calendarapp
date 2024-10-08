import { addHours } from "date-fns";
import { getMessages, localizer } from "../../helpers";
import { calendarEvent, Navbar } from "../components";
import { Calendar } from 'react-big-calendar'


export const CalendarPage = () => {

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

  return (
    <>
      <Navbar />
      <Calendar
        culture='es-ES'
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px )' }}
        messages={getMessages}
        eventPropGetter={eventStyleGetter}
        components={{
          event: (props) => calendarEvent(props)
        }}
      />
    </>
  )
}
