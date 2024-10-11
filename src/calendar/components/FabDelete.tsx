import { useCalendarStore, useUiStore } from "../../hooks";

export const FabDelete = () => {

    const { startDeleteEvent, hasEventSelected } = useCalendarStore();
    const { modalSatus } = useUiStore();

    const onDeleteEVent = () => {
        startDeleteEvent();
    }

    return (
        hasEventSelected && !modalSatus && (
            <button
                className="btn btn-danger fab-danger"
                onClick={onDeleteEVent}
            >
                <i className="fas fa-trash"></i>
            </button>
        )
    )
}
