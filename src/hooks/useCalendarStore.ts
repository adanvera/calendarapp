import { useDispatch, useSelector } from "react-redux";
import {
    addNewEvent,
    AppDispatch,
    onDeleteEvent,
    onSetActiveEvent,
    onUpdaEvent,
    RootState
} from "../store";

export const useCalendarStore = () => {

    const dispatch = useDispatch<AppDispatch>();

    /**
     * Get the actions and datas from the calendar store
     * @returns actions/data
     * @author Adán Vera
     */
    const { events, activeEvent } = useSelector((state: RootState) => state.calendar);

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
        if (calendarEvent._id) {
            dispatch(onUpdaEvent({
                ...calendarEvent,
            }));
        } else {
            dispatch(addNewEvent({
                ...calendarEvent,
                _id: new Date().getTime(),
            }));
        }
    }

    /**
     * @description Function to start deleting an event
     * @returns void
     */
    const startDeleteEvent = () => {
        dispatch(onDeleteEvent());
    }

    return {
        events,
        activeEvent,
        setActiveEvent,
        startNewEvent,
        startDeleteEvent,
        hasEventSelected: !!activeEvent
    }
}