import { parseISO } from "date-fns";

interface Event {
    start: string;
    end: string;
    [key: string]: any; // To allow other properties
}

interface ParsedEvent {
    start: Date;
    end: Date;
    [key: string]: any; // To allow other properties
}

export const convertEventDate = (events: Event[]): ParsedEvent[] => {
    return events.map((event) => {
        return {
            ...event,
            start: parseISO(event.start),
            end: parseISO(event.end)
        };
    });
}
