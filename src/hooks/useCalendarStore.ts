import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, onSetActiveEvent, RootState } from "../store"; // Adjust the import path according to your project structure

export const useCalendarStore = () => {
    
    const dispatch = useDispatch<AppDispatch>();
    
    /**
     * Get the actions and datas from the calendar store
     * @returns actions/data
     * @author Adán Vera
     */
    const { events, activeEvent } = useSelector((state: RootState) => state.calendar);

    /**
     * Function to set the active event
     * @param calendarEvent
     * @returns void
     * @author Adán Vera
     */
    const setActiveEvent = (calendarEvent: any) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    return {
        events,
        activeEvent,
        setActiveEvent
    }
}