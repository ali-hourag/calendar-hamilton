import { getTotalDaysOfMonth, getFormattedDate, adjustTopScrollBar, adjustCalendarScrollBar, getDayOfWeekOfDayEntered } from "./utils.js";
import { clearModal, checkLastTime, checkLastDate } from "./validateModal.js"
import { Event } from "./interface.js";
import { eventInfoClicked, setPreviousMonth, setNextMonth, getYearMonth, fillEntryDays, cleanDaysInCalendar } from "./functions.js";


/**
 * Function called when the web is loaded and when a new event
 * has been saved or a month or year has been changed or clicked.
 */
export function setCalendar(): void {
    const burgerBtn: (HTMLButtonElement | null) = document.querySelector(".header-burger-history_btn");
    if (burgerBtn === null) return;

    let displayBurguerBtn: string = window.getComputedStyle(burgerBtn).display;
    (displayBurguerBtn === "none") ? setCalendarDesktop() : setCalendarSmallDevice();
}

//------------------------------------------------------------------------------------------------------
/**
 * If the web is on desktop size, this one is called by the setCalendar
 */
function setCalendarDesktop(): void {
    let arrayYM: Array<number> | undefined = getYearMonth();
    if (arrayYM === undefined) return;
    let year: number = arrayYM[0];
    let month: number = arrayYM[1];
    const day: number = 1; //Day in which the month starts
    let dayOfWeek: number = getDayOfWeekOfDayEntered(year, month, day);

    showDaysInCalendar(year, month, dayOfWeek);
}
//------------------------------------------------------------------------------------------------------
/**
 * If the web is on small size, this one is called by the setCalendar
 */
function setCalendarSmallDevice(): void {
    let arrayYM: Array<number> | undefined = getYearMonth();
    if (arrayYM === undefined) return;
    let year: number = arrayYM[0];
    let month: number = arrayYM[1];
    //Always starts at the top, since there is no topbar with the days of the week
    showDaysInCalendar(year, month, 1);
}


//------------------------------------------------------------------------------------------------------
/**
 * This one sets the calendar up and shows the assigned month.
 * @param year 
 * @param month
 * @param dayOfWeek day of the week in which the month starts
 *                  dayOfWeek = 1 (Monday) --> (2,3,4,5,6) --> dayOfWeek = 0 (sunday)
 */
function showDaysInCalendar(year: number, month: number, dayOfWeek: number): void {
    const entryDaysDisplayNone: NodeListOf<HTMLDivElement> = document.querySelectorAll(".entry-day-display-none");
    if (entryDaysDisplayNone.length > 0) fillEntryDays();
    cleanDaysInCalendar();
    const burgerBtn: (HTMLButtonElement | null) = document.querySelector(".header-burger-history_btn");
    if (burgerBtn === null) return;
    let displayBurguerBtn: string = window.getComputedStyle(burgerBtn).display;
    let daysOfMonth: number = getTotalDaysOfMonth(month, year);
    if (dayOfWeek === 0) dayOfWeek = 7;
    const date: Date = new Date();
    let counterMonthDays: number = 1;

    for (let i = dayOfWeek; i < (daysOfMonth + dayOfWeek); i++) {
        const containerEntryDay: (HTMLDivElement | null) = document.querySelector(`#entry-day-${i}`);
        const paragraphEntryDay: (HTMLParagraphElement | null) = document.querySelector(`#p-day-${i}`);
        const spanEntryDay: (HTMLSpanElement | null) = document.querySelector(`#span-day-${i}`);
        const entryDayInfoDiv: (HTMLDivElement | null) = document.querySelector(`#div-day-info-${i}`);
        const entryDayEventsDiv: (HTMLDivElement | null) = document.querySelector(`#div-day-events-${i}`);
        if (containerEntryDay === null) return;
        if (paragraphEntryDay === null) return;
        if (spanEntryDay === null) return;
        if (entryDayInfoDiv === null) return;
        if (entryDayEventsDiv === null) return;

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
        const entryDaysShowed: NodeListOf<HTMLDivElement> = document.querySelectorAll(".show-entry-day-calendar");
        entryDaysShowed[date.getDate() - 1].classList.add("bg-current-day")
    } else {
        const entryCurrentDay: (HTMLDivElement | null) = document.querySelector(".bg-current-day");
        if (entryCurrentDay !== null) entryCurrentDay.classList.remove("bg-current-day");
    }
    //To hide remaining days so that they are not showing on mobile devices
    if (displayBurguerBtn !== "none") {
        const entryDaysDiv: NodeListOf<HTMLDivElement> = document.querySelectorAll(".entry-day-calendar_div");
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
//------------------------------------------------------------------------------------------------------
/**
 * 
 * @param year 
 * @param month 
 * show events each month in respective day
 */

export function setEntryDayEvents(year: number, month: number): void {
    const nListentryDayEventsDiv: NodeListOf<HTMLDivElement> = document.querySelectorAll(".show-entry-day-events_div");
    let eventEntered: string | null = localStorage.getItem("events");
    if (eventEntered === null) return;
    let events: Array<Event> = JSON.parse(eventEntered);
    events.forEach(event => {
        let dateEvent: Date = new Date(event.initialDate);
        let yearEvent: number = dateEvent.getFullYear();
        let monthEvent: number = dateEvent.getMonth() + 1;
        let dayEvent: number = dateEvent.getDate();
        let eventHour: string = event.initialTime;

        if (yearEvent === year && monthEvent === month) {
            let arrayPEventsOfDay: Array<HTMLParagraphElement> = Array.from(nListentryDayEventsDiv[dayEvent - 1].children) as Array<HTMLParagraphElement>;
            const pEventDay: (HTMLParagraphElement) = document.createElement("p");
            pEventDay.classList.add("event-entered-day_p");
            pEventDay.setAttribute("event-id", event.id.toString());
            pEventDay.setAttribute("event-hour", eventHour);
            pEventDay.setAttribute("data-bs-toggle", "modal");
            pEventDay.setAttribute("data-bs-target", "#modal-info-event");
            pEventDay.addEventListener("click", eventInfoClicked);
            if (event.title.length > 10) pEventDay.innerText = `${event.title.slice(0, 10)}..`
            else pEventDay.innerText = event.title;

            if (arrayPEventsOfDay.length > 0) {
                for (let i = 0; i < arrayPEventsOfDay.length; i++) {
                    let pEventOfDay: (HTMLParagraphElement) = arrayPEventsOfDay[i];
                    let eventOfDayInitialTime: string | null = pEventOfDay.getAttribute("event-hour");
                    if (eventOfDayInitialTime !== null) {

                        if (checkLastTime(eventOfDayInitialTime, eventHour)) {
                            pEventOfDay.insertAdjacentElement("beforebegin", pEventDay);
                            i = arrayPEventsOfDay.length;
                        } else if (i === arrayPEventsOfDay.length - 1) {
                            pEventOfDay.insertAdjacentElement("afterend", pEventDay);
                        }
                    }
                }
            } else nListentryDayEventsDiv[dayEvent - 1].appendChild(pEventDay);
        }
    })
}

//------------------------------------------------------------------------------------------------------
/**
 * 
 * @param -> input checkbox checked elements
 * set calendar when month is clicked
 * 
 */

export function topBarMonthClicked(this: HTMLInputElement): void {
    const burgerBtn: (HTMLButtonElement | null) = document.querySelector(".header-burger-history_btn");
    if (burgerBtn === null) return;
    let displayBurguerBtn: string = window.getComputedStyle(burgerBtn).display;
    const selectedYear: (HTMLHeadingElement | null) = document.querySelector("#selected-year");
    let getMonth: string | null = this.getAttribute("number-month");
    if (selectedYear === null) return;
    if (getMonth === null) return;
    let year: number = parseInt(selectedYear.innerText);
    let month: number = parseInt(getMonth);
    if (displayBurguerBtn === "none") {
        let dayOfWeek: number = getDayOfWeekOfDayEntered(year, month, 1);
        showDaysInCalendar(year, month, dayOfWeek);
    } else showDaysInCalendar(year, month, 1);
}

//------------------------------------------------------------------------------------------------------
/**
 * This function orders the event by the initialDate and
 * the initial time, being the date and time by the
 * following format: 23-03-11  and time being,  12:34
 * @returns Array<Event> Array of ordered events
 */

export function sortEventsByDateTime(): Array<Event> | undefined {
    let eventEntered: string | null = localStorage.getItem("events");
    if (eventEntered === null) return;
    let events: Array<Event> = JSON.parse(eventEntered);
    let orderedEvents: Array<Event> = [events[0]];

    for (let i = 1; i < events.length; i++) {
        let eventDate: Date = new Date(events[i].initialDate);
        let unYear: number = eventDate.getFullYear();
        let unMonth: number = eventDate.getMonth() + 1;
        let unDay: number = eventDate.getDate();
        let unHour: string = events[i].initialTime;
        let unorderedDateEvent: string = getFormattedDate(unYear, unMonth, unDay);
        for (let j = 0; j < orderedEvents.length; j++) {

            //[2,1,5,3,7]
            //[2]
            //[1,2]
            //[1,2,5]

            let orEventDate: Date = new Date(orderedEvents[j].initialDate);
            let orYear: number = orEventDate.getFullYear();
            let orMonth: number = orEventDate.getMonth() + 1;
            let orDay: number = orEventDate.getDate();
            let orHour: string = orderedEvents[j].initialTime;
            let orderedDateEvent: string = getFormattedDate(orYear, orMonth, orDay);

            if (checkLastDate(orderedDateEvent, unorderedDateEvent)) {
                orderedEvents.splice(j, 0, events[i]);
                j = orderedEvents.length;
            } else if (orderedDateEvent === unorderedDateEvent) {
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
//------------------------------------------------------------------------------------------------------
/**
 * @param span element containing a + and toggles the new event modal
 * so that we can enter new events
 */
function entryDayEventClicked(this: HTMLSpanElement): void {
    let dayClicked: string | null = this.getAttribute("number-day");
    if (dayClicked !== null) localStorage.setItem("new-event-day", dayClicked);
    clearModal();
}


