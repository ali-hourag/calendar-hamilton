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
                let finalArray = [];
                sortedArrayByReminderTime.forEach((arrayEvent) => {
                    if (arrayEvent[1] > totalMinsCurrentTime)
                        finalArray.push(arrayEvent);
                });
                if (finalArray.length > 0) {
                    let totalMinsReminder = finalArray[0][1];
                    const eventId = finalArray[0][0];
                    let eventsInLS = JSON.parse(eventEntered);
                    const eventToRemind = eventsInLS[eventId - 1];
                    if (totalMinsReminder > totalMinsCurrentTime) {
                        let timeToTimeout = (totalMinsReminder - totalMinsCurrentTime) * 60000;
                        setTimeout(() => {
                            const containerReminderDiv = document.querySelector("#container-reminder");
                            const textReminder = document.querySelector("#paragraph-reminder");
                            const textReminderTime = document.querySelector("#paragraph-reminder-time");
                            if (textReminder === null)
                                return;
                            if (textReminderTime === null)
                                return;
                            if (containerReminderDiv === null)
                                return;
                            textReminder.innerText = eventToRemind.title;
                            let minReminder = eventToRemind.reminder;
                            let timeToRemind = 0;
                            switch (minReminder) {
                                case "five":
                                    timeToRemind = 5;
                                    break;
                                case "ten":
                                    timeToRemind = 10;
                                    break;
                                case "fifteen":
                                    timeToRemind = 15;
                                    break;
                                case "thirty":
                                    timeToRemind = 30;
                                    break;
                                case "one-hour":
                                    timeToRemind = 60;
                                    break;
                            }
                            textReminderTime.innerText = `${timeToRemind} minute left to event`;
                            containerReminderDiv.classList.remove("reminder-div-display-none");
                            setTimeout(() => {
                                eventsInLS[eventId - 1].isCheckedReminder = false;
                                localStorage.setItem("events", JSON.stringify(eventsInLS));
                                containerReminderDiv.classList.add("reminder-div-display-none");
                            }, 10000);
                        }, timeToTimeout);
                    }
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