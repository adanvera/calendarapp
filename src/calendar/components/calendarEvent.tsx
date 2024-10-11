
interface EventProps<T> {
    event?: T;
    title?: string;
    start?: Date;
    end?: Date;
    allDay?: boolean;
    continuesPrior?: boolean;
    continuesAfter?: boolean;
    isStart?: boolean;
    isEnd?: boolean;
    dayWrapper?: any;
    getters?: any;
    accessors?: any;
    components?: any;
}

export const calendarEvent = (props: EventProps<any>) => {
    const { event } = props;
    const { title, user } = event;
    const name = user ? user.name !== undefined ? user.name : '' : '';
    const lastname = user ? user.lastname !== undefined ? user.lastname : '' : '';
    const fullName = `${name} ${lastname}`;
    return (
        <>
            <div>
                <strong>{title}</strong>
                <span> - {fullName}</span>
            </div>
        </>
    )
}
