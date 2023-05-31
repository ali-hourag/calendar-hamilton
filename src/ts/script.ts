import { setHeader } from "./setHTML.js";
import { checkModalValidity, checkLastDate } from "./validateModal.js";
import { setAsideHistoryOfEvents, eventListenerChangeYear } from "./utils.js";
import { setCalendar, sortEventsByDateTime } from "./setCalendar.js";
import { setHistoryOfEvents } from "./functions.js";
import { checkReminders } from "./reminder.js";

window.addEventListener("load", loadPage);


function loadPage(): void {
    setHeader();
    setAsideHistoryOfEvents();
    eventListenerChangeYear();
    setCalendar();
    checkModalValidity();
    setHistoryOfEvents();
    checkReminders();
}
