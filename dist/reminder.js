import { sortEventsByDateTime } from "./setCalendar.js";
import { getFormattedDate } from "./utils.js";
export function checkReminders() {
    let eventEntered = localStorage.getItem("events");
    if (eventEntered !== null) {
        let events = sortEventsByDateTime();
        let eventsWithReminder = [];
        events === null || events === void 0 ? void 0 : events.forEach((event) => {
            if (event.isCheckedReminder && event.reminder !== "default")
                eventsWithReminder.push(event);
        });
        if (eventsWithReminder.length > 0) {
            let dateToday = new Date();
            let year = dateToday.getFullYear();
            let month = dateToday.getMonth() + 1;
            let day = dateToday.getDate();
            let eventsReminderToday = [];
            let formattedDayToday = getFormattedDate(year, month, day);
            eventsWithReminder.forEach((event) => {
                let eventDate = new Date(event.initialDate);
                let eventYear = eventDate.getFullYear();
                let eventMonth = eventDate.getMonth() + 1;
                let eventDay = eventDate.getDate();
                let formattedDayEvent = getFormattedDate(eventYear, eventMonth, eventDay);
                if (formattedDayToday === formattedDayEvent) {
                    eventsReminderToday.push(event);
                }
            });
            if (eventsReminderToday.length > 0) {
                let arrayDataEvents = [];
                eventsReminderToday.forEach((event) => {
                    let timeArray = event.initialTime.split(":");
                    let hour = parseInt(timeArray[0]);
                    let min = parseInt(timeArray[1]);
                    let totalMin = hour * 60 + min;
                    let reminderTime = 0;
                    switch (event.reminder) {
                        case "five":
                            reminderTime = 5;
                            break;
                        case "ten":
                            reminderTime = 10;
                            break;
                        case "fifteen":
                            reminderTime = 15;
                            break;
                        case "thirty":
                            reminderTime = 30;
                            break;
                        case "one-hour":
                            reminderTime = 60;
                            break;
                    }
                    let arrayDataEvent = [event.id, totalMin - reminderTime];
                    arrayDataEvents.push(arrayDataEvent);
                });
                let sortedArrayByReminderTime = sortArrayBySecondElemByBubble(arrayDataEvents);
                let hourToday = dateToday.getHours();
                let minToday = dateToday.getMinutes();
                let totalMinsCurrentTime = hourToday * 60 + minToday;
                let totalMinsReminder = sortedArrayByReminderTime[0][1];
                if (totalMinsReminder > totalMinsCurrentTime) {
                    let timeToTimeout = (totalMinsCurrentTime - totalMinsReminder) * 60000;
                    setTimeout(() => {
                        checkReminders();
                    }, timeToTimeout);
                }
            }
        }
    }
}
function sortArrayBySecondElemByBubble(arrayEntered) {
    const arrayL = arrayEntered.length;
    for (let i = 0; i < arrayL; i++) {
        for (let j = 0; j < arrayL - 1 - i; j++) {
            if (arrayEntered[j][1] > arrayEntered[j + 1][1]) {
                [arrayEntered[j], arrayEntered[j + 1]] = [arrayEntered[j + 1], arrayEntered[j]];
            }
        }
    }
    return arrayEntered;
}
//# sourceMappingURL=reminder.js.map