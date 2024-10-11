import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { useAuthStore, useCalendarStore, useUiStore } from "../../hooks";
import { addHours } from "date-fns";

export const FabAddNew = () => {
    const { modalOpen } = useUiStore();
    const dispatch = useDispatch<AppDispatch>();
    const { setActiveEvent } = useCalendarStore();
    const { color, user } = useAuthStore();
    const uid = user ? user.uid : '';
    const name = user ? user.name === undefined ? '' : user.name : '';
    const lastname = user ? user.lastname === undefined ? '' : user.lastname : '';
    const fullName = user ? `${name.toLowerCase()} ${lastname.toLowerCase()}` : '';

    const onSartNewEvent = () => {
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: '#fafafa',
            user: {
                _id: uid,
                name: fullName
            }
        });
        dispatch(modalOpen());
    }

    return (
        <button
            className="btn btn-primary fab addnew"
            style={{
                backgroundColor: color,
                borderColor: color
            }}
            onClick={onSartNewEvent}
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}
