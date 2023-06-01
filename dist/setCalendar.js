import { getTotalDaysOfMonth, getFormattedDate, adjustTopScrollBar, adjustCalendarScrollBar, getDayOfWeekOfDayEntered } from "./utils.js";
import { clearModal, checkLastTime, checkLastDate } from "./validateModal.js";
import { eventInfoClicked, setPreviousMonth, setNextMonth, getYearMonth, fillEntryDays, cleanDaysInCalendar } from "./functions.js";
export function setCalendar() {
    const burgerBtn = document.querySelector(".header-burger-history_btn");
    if (burgerBtn === null)
        return;
    let displayBurguerBtn = window.getComputedStyle(burgerBtn).display;
    (displayBurguerBtn === "none") ? setCalendarDesktop() : setCalendarSmallDevice();
}
function setCalendarDesktop() {
    let arrayYM = getYearMonth();
    if (arrayYM === undefined)
        return;
    let year = arrayYM[0];
    let month = arrayYM[1];
    const day = 1;
    let dayOfWeek = getDayOfWeekOfDayEntered(year, month, day);
    showDaysInCalendar(year, month, dayOfWeek);
}
function setCalendarSmallDevice() {
    let arrayYM = getYearMonth();
    if (arrayYM === undefined)
        return;
    let year = arrayYM[0];
    let month = arrayYM[1];
    showDaysInCalendar(year, month, 1);
}
function showDaysInCalendar(year, month, dayOfWeek) {
    const entryDaysDisplayNone = document.querySelectorAll(".entry-day-display-none");
    if (entryDaysDisplayNone.length > 0)
        fillEntryDays();
    cleanDaysInCalendar();
    const burgerBtn = document.querySelector(".header-burger-history_btn");
    if (burgerBtn === null)
        return;
    let displayBurguerBtn = window.getComputedStyle(burgerBtn).display;
    let daysOfMonth = getTotalDaysOfMonth(month, year);
    if (dayOfWeek === 0)
        dayOfWeek = 7;
    const date = new Date();
    let counterMonthDays = 1;
    for (let i = dayOfWeek; i < (daysOfMonth + dayOfWeek); i++) {
        const containerEntryDay = document.querySelector(`#entry-day-${i}`);
        const paragraphEntryDay = document.querySelector(`#p-day-${i}`);
        const spanEntryDay = document.querySelector(`#span-day-${i}`);
        const entryDayInfoDiv = document.querySelector(`#div-day-info-${i}`);
        const entryDayEventsDiv = document.querySelector(`#div-day-events-${i}`);
        if (containerEntryDay === null)
            return;
        if (paragraphEntryDay === null)
            return;
        if (spanEntryDay === null)
            return;
        if (entryDayInfoDiv === null)
            return;
        if (entryDayEventsDiv === null)
            return;
        containerEntryDay.classList.add("show-entry-day-calendar");
        paragraphEntryDay.classList.add("show-entry-paragraph");
        paragraphEntryDay.innerText = counterMonthDays.toString();
        spanEntryDay.innerText = "+";
        spanEntryDay.classList.add("show-entry-day-span");
        spanEntryDay.setAttribute("number-day", counterMonthDays.toString());
        entryDayEventsDiv.classList.add("show-entry-day-events_div");
        counterMonthDays += 1;
        spanEntryDay.addEventListener("click", entryDayEventClicked);
    }
    if ((year === date.getFullYear()) && (month === date.getMonth() + 1)) {
        const entryDaysShowed = document.querySelectorAll(".show-entry-day-calendar");
        entryDaysShowed[date.getDate() - 1].classList.add("bg-current-day");
    }
    else {
        const entryCurrentDay = document.querySelector(".bg-current-day");
        if (entryCurrentDay !== null)
            entryCurrentDay.classList.remove("bg-current-day");
    }
    if (displayBurguerBtn !== "none") {
        const entryDaysDiv = document.querySelectorAll(".entry-day-calendar_div");
        for (let i = daysOfMonth; i < 42; i++) {
            entryDaysDiv[i].classList.add("entry-day-display-none");
        }
        adjustTopScrollBar();
        adjustCalendarScrollBar();
    }
    setEntryDayEvents(year, month);
    setPreviousMonth(year, month, dayOfWeek);
    setNextMonth(year, month, dayOfWeek);
}
export function setEntryDayEvents(year, month) {
    const nListentryDayEventsDiv = document.querySelectorAll(".show-entry-day-events_div");
    let eventEntered = localStorage.getItem("events");
    if (eventEntered === null)
        return;
    let events = JSON.parse(eventEntered);
    events.forEach(event => {
        let dateEvent = new Date(event.initialDate);
        let yearEvent = dateEvent.getFullYear();
        let monthEvent = dateEvent.getMonth() + 1;
        let dayEvent = dateEvent.getDate();
        let eventHour = event.initialTime;
        if (yearEvent === year && monthEvent === month) {
            let arrayPEventsOfDay = Array.from(nListentryDayEventsDiv[dayEvent - 1].children);
            const pEventDay = document.createElement("p");
            pEventDay.classList.add("event-entered-day_p");
            pEventDay.setAttribute("event-id", event.id.toString());
            pEventDay.setAttribute("event-hour", eventHour);
            pEventDay.setAttribute("data-bs-toggle", "modal");
            pEventDay.setAttribute("data-bs-target", "#modal-info-event");
            pEventDay.addEventListener("click", eventInfoClicked);
            if (event.title.length > 10)
                pEventDay.innerText = `${event.title.slice(0, 10)}..`;
            else
                pEventDay.innerText = event.title;
            if (arrayPEventsOfDay.length > 0) {
                for (let i = 0; i < arrayPEventsOfDay.length; i++) {
                    let pEventOfDay = arrayPEventsOfDay[i];
                    let eventOfDayInitialTime = pEventOfDay.getAttribute("event-hour");
                    if (eventOfDayInitialTime !== null) {
                        if (checkLastTime(eventOfDayInitialTime, eventHour)) {
                            pEventOfDay.insertAdjacentElement("beforebegin", pEventDay);
                            i = arrayPEventsOfDay.length;
                        }
                        else if (i === arrayPEventsOfDay.length - 1) {
                            pEventOfDay.insertAdjacentElement("afterend", pEventDay);
                        }
                    }
                }
            }
            else
                nListentryDayEventsDiv[dayEvent - 1].appendChild(pEventDay);
        }
    });
}
export function topBarMonthClicked() {
    const burgerBtn = document.querySelector(".header-burger-history_btn");
    if (burgerBtn === null)
        return;
    let displayBurguerBtn = window.getComputedStyle(burgerBtn).display;
    const selectedYear = document.querySelector("#selected-year");
    let getMonth = this.getAttribute("number-month");
    if (selectedYear === null)
        return;
    if (getMonth === null)
        return;
    let year = parseInt(selectedYear.innerText);
    let month = parseInt(getMonth);
    if (displayBurguerBtn === "none") {
        let dayOfWeek = getDayOfWeekOfDayEntered(year, month, 1);
        showDaysInCalendar(year, month, dayOfWeek);
    }
    else
        showDaysInCalendar(year, month, 1);
}
export function sortEventsByDateTime() {
    let eventEntered = localStorage.getItem("events");
    if (eventEntered === null)
        return;
    let events = JSON.parse(eventEntered);
    let orderedEvents = [events[0]];
    for (let i = 1; i < events.length; i++) {
        let eventDate = new Date(events[i].initialDate);
        let unYear = eventDate.getFullYear();
        let unMonth = eventDate.getMonth() + 1;
        let unDay = eventDate.getDate();
        let unHour = events[i].initialTime;
        let unorderedDateEvent = getFormattedDate(unYear, unMonth, unDay);
        for (let j = 0; j < orderedEvents.length; j++) {
            let orEventDate = new Date(orderedEvents[j].initialDate);
            let orYear = orEventDate.getFullYear();
            let orMonth = orEventDate.getMonth() + 1;
            let orDay = orEventDate.getDate();
            let orHour = orderedEvents[j].initialTime;
            let orderedDateEvent = getFormattedDate(orYear, orMonth, orDay);
            if (checkLastDate(orderedDateEvent, unorderedDateEvent)) {
                orderedEvents.splice(j, 0, events[i]);
                j = orderedEvents.length;
            }
            else if (orderedDateEvent === unorderedDateEvent) {
                if (checkLastTime(orHour, unHour) || orHour === unHour) {
                    orderedEvents.splice(j, 0, events[i]);
                    j = orderedEvents.length;
                }
            }
            if (j === orderedEvents.length - 1) {
                orderedEvents.push(events[i]);
                j = orderedEvents.length;
            }
        }
    }
    return orderedEvents;
}
function entryDayEventClicked() {
    let dayClicked = this.getAttribute("number-day");
    if (dayClicked !== null)
        localStorage.setItem("new-event-day", dayClicked);
    clearModal();
}
//# sourceMappingURL=setCalendar.js.map