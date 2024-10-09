import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { useCalendarStore, useUiStore } from "../../hooks";
import { addHours } from "date-fns";

export const FabAddNew = () => {

    const { modalOpen } = useUiStore();
    const dispatch = useDispatch<AppDispatch>();
    const { setActiveEvent } = useCalendarStore();

    const onSartNewEvent = () => {
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: '#fafafa',
            user: {
                _id: '123',
                name: 'Adán Vera'
            }
        });
        dispatch(modalOpen());
    }

    return (
        <button
            className="btn btn-primary fab"
            onClick={onSartNewEvent}
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}
