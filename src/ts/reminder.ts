import { sortEventsByDateTime } from "./setCalendar.js";
import { Event } from "./interface.js";
import { getFormattedDate } from "./utils.js";

export function checkReminders() {
    let eventEntered: string | null = localStorage.getItem("events");
    if (eventEntered !== null) {
        let events: Array<Event> | undefined = sortEventsByDateTime();
        let eventsWithReminder: Array<Event> = [];
        events?.forEach((event: Event): void => {
            if (event.isCheckedReminder && event.reminder !== "default") eventsWithReminder.push(event);
        })

        if (eventsWithReminder.length > 0) {
            let dateToday: Date = new Date();
            let year: number = dateToday.getFullYear();
            let month: number = dateToday.getMonth() + 1;
            let day: number = dateToday.getDate();
            let eventsReminderToday: Array<Event> = [];
            let formattedDayToday: string = getFormattedDate(year, month, day);

            eventsWithReminder.forEach((event: Event): void => {
                let eventDate: Date = new Date(event.initialDate);
                let eventYear: number = eventDate.getFullYear();
                let eventMonth: number = eventDate.getMonth() + 1;
                let eventDay: number = eventDate.getDate();
                let formattedDayEvent: string = getFormattedDate(eventYear, eventMonth, eventDay);
                if (formattedDayToday === formattedDayEvent) {
                    eventsReminderToday.push(event);
                }
            })

            if (eventsReminderToday.length > 0) {
                // 16:20 --> 16*60 + 20 = 980
                // Recordatorio --> 10 min
                // 980 - 10 = 970 min para el aviso
                // contando desde las 00:00
                // 10:01--> 10* 60 + 1 --> 601
                // 970 - 601 = 369
                // 16:30 --> 990 
                // Recordatorio --> 30 min
                // 960
                // [[11, 970], [7, 960]]
                let arrayDataEvents: Array<Array<number>> = [];
                eventsReminderToday.forEach((event: Event): void => {
                    let timeArray: Array<string> = event.initialTime.split(":");
                    let hour: number = parseInt(timeArray[0]);
                    let min: number = parseInt(timeArray[1]);
                    let totalMin: number = hour * 60 + min;
                    let reminderTime: number = 0;
                    switch (event.reminder) {
                        case "five": reminderTime = 5;
                            break;
                        case "ten": reminderTime = 10;
                            break;
                        case "fifteen": reminderTime = 15;
                            break;
                        case "thirty": reminderTime = 30;
                            break;
                        case "one-hour": reminderTime = 60;
                            break;
                    }
                    let arrayDataEvent: Array<number> = [event.id, totalMin - reminderTime];
                    arrayDataEvents.push(arrayDataEvent);
                })

                let sortedArrayByReminderTime: Array<Array<number>> = sortArrayBySecondElemByBubble(arrayDataEvents);
                let hourToday: number = dateToday.getHours();
                let minToday: number = dateToday.getMinutes();
                let totalMinsCurrentTime: number = hourToday * 60 + minToday;
                let totalMinsReminder: number = sortedArrayByReminderTime[0][1];


                if (totalMinsReminder > totalMinsCurrentTime) {
                    let timeToTimeout: number = (totalMinsReminder - totalMinsCurrentTime) * 60000;
                    setTimeout(() => {
                        checkReminders();
                    }, timeToTimeout);
                }
            }
        }
    }
}


//---------------------------------------------------------------------------------------------------------------------------------------
function sortArrayBySecondElemByBubble(arrayEntered: Array<Array<number>>): Array<Array<number>> {
    const arrayL: number = arrayEntered.length;
    for (let i = 0; i < arrayL; i++) {
        for (let j = 0; j < arrayL - 1 - i; j++) {
            if (arrayEntered[j][1] > arrayEntered[j + 1][1]) {
                [arrayEntered[j], arrayEntered[j + 1]] = [arrayEntered[j + 1], arrayEntered[j]];
            }
        }
    }
    return arrayEntered;
}