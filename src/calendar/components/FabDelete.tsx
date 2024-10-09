import { useCalendarStore } from "../../hooks";

export const FabDelete = () => {

    const { startDeleteEvent, hasEventSelected } = useCalendarStore();

    const onDeleteEVent = () => {
        startDeleteEvent();
    }

    return (
        hasEventSelected && (
            <button
                className="btn btn-danger fab-danger"
                onClick={onDeleteEVent}
            >
                <i className="fas fa-trash"></i>
            </button>
        )
    )
}
