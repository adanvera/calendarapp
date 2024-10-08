
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
    const { title , user} = event;

    return (
        <>
            <div>
                <strong>{title}</strong>
                <span> - {user.name}</span>
            </div>
        </>
    )
}
