import { setHeader } from "./setHTML.js";
import { checkModalValidity, checkLastDate } from "./validateModal.js";
import { setAsideHistoryOfEvents, eventListenerChangeYear } from "./utils.js";
import { setCalendar, sortEventsByDateTime } from "./setCalendar.js";
import { setHistoryOfEvents } from "./functions.js";

window.addEventListener("load", loadPage);

//console.log(sortEventsByDateTime());

function loadPage(): void {
    setHeader();
    setAsideHistoryOfEvents();
    eventListenerChangeYear();
    setCalendar();
    checkModalValidity();
    setHistoryOfEvents();
}
