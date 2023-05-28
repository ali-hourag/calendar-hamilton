
// Event Properties
// export enum EventType {
//     "default",
//     "meeting",
//     "personal",
//     "study",
//     "sports",
// }
export type EventType = "default" | "meeting" | "personal" | "study" | "sports";
export type ReminderTime = "default" | "five" | "ten" | "fifteen" | "thirty" | "one-hour";

// export enum ReminderTime {
//     "default",
//     "five",
//     "ten",
//     "fifteen",
//     "thirty",
//     "one-hour"
// }

export interface Event {
    id: number;
    title: string;
    initialDate: Date;
    initialTime: string;
    isCheckedEndEvent: boolean;
    endDate: Date | "";
    endTime: string;
    isCheckedReminder: boolean;
    reminder: ReminderTime;
    description: string;
    eventType: EventType;
}


// Calendar Properties
interface EnumEventsItem {
    id: number;
    label: string;
    key: any;
}
export interface CalendarProperties {
    currentMonth: string;
    currentYear: string;
    currentDay: string;
    title: string;
    eventList: EnumEventsItem[];
}