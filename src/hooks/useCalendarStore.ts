import { useDispatch, useSelector } from "react-redux";
import {
    addNewEvent,
    AppDispatch,
    onDeleteEvent,
    onLoadEvents,
    onSetActiveEvent,
    onUpdaEvent,
    RootState
} from "../store";
import { calendarApi } from "../api";
import { convertEventDate } from "../helpers";

export const useCalendarStore = () => {

    const dispatch = useDispatch<AppDispatch>();

    /**
     * Get the actions and datas from the calendar store
     * @returns actions/data
     * @author Adán Vera
     */
    const { events, activeEvent } = useSelector((state: RootState) => state.calendar);

    const startLoadingEvents = async () => {
        try {

            const { data } = await calendarApi.get('/events');
            const events = convertEventDate(data.events);

            dispatch(onLoadEvents(events));

            console.log('eventsevents', events);


        } catch (error) {
            console.log("error", error);
        }
    };

    /**
     * @description Function to set the active event
     * @param calendarEvent
     * @returns void
     * @author Adán Vera
     */
    const setActiveEvent = (calendarEvent: any) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    /** 
    * @description Function to start saving a new event
    * @param calendarEvent
    * @returns void
    * */
    const startNewEvent = async (calendarEvent: any) => {
        if (calendarEvent.id) {
            dispatch(onUpdaEvent({
                ...calendarEvent,
            }));
        } else {
            try {
                const { start, end } = calendarEvent;
                const formatDateTime = (date: Date): string => {
                    const pad = (num: number): string => num.toString().padStart(2, '0');
                    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
                };
                calendarEvent.start = formatDateTime(new Date(start));
                calendarEvent.end = formatDateTime(new Date(end));
                const { data } = await calendarApi.post('/events', calendarEvent);
                dispatch(addNewEvent({ ...calendarEvent, id: data.evento.id }));
            } catch (error) {
                console.log("error", error);
            }


            // dispatch(addNewEvent({
            //     ...calendarEvent,
            //     _id: new Date().getTime(),
            // }));
        }
    }

    /**
     * @description Function to start deleting an event
     * @returns void
     */
    const startDeleteEvent = () => {
        dispatch(onDeleteEvent());
    }

    const hasTrueActiveEvent = activeEvent !== null && Object.keys(activeEvent).length > 0;

    return {
        events,
        activeEvent,
        setActiveEvent,
        startNewEvent,
        startDeleteEvent,
        hasEventSelected: hasTrueActiveEvent,
        startLoadingEvents
    }
}