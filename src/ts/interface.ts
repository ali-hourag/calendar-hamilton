
export type EventType = "default" | "meeting" | "personal" | "study" | "sports";
export type ReminderTime = "default" | "five" | "ten" | "fifteen" | "thirty" | "one-hour";



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