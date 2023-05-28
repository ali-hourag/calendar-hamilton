/*****************************************************+
 * 
 */
// Event Properties
enum Events {
    meeting = "Meeting",
    personal = "Personal",
    study = "Study",
    sports = "Sports",
}

enum Alerts {
    fiveMinutes = 5,
    tenMinutes = 10,
    fifteenMinutes = 15,
    thirtyMinutes = 30,
    oneHour = 60
}


export interface DateProperties {
    title: string;
    description: string;
    eventType: Events;
    timeAlerts: Alerts;
    intialDate: Date;
    initialTime: Date;
    endDate: Date;
    endTime: Date;
    isCheckedEndEvent: boolean;
    isCheckedReminder: boolean;
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