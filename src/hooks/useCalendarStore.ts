import { useSelector } from "react-redux";
import { RootState } from "../store"; // Adjust the import path according to your project structure

export const useCalendarStore = () => {

    const {
        events,
        activeEvent
    } = useSelector((state: RootState) => state.calendar);

    return {
        events,
        activeEvent
    }
}