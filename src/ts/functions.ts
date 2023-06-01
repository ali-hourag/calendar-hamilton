import { sortEventsByDateTime } from "./setCalendar.js";
import { Event, ReminderTime, EventType } from "./interface.js";
import { getFormattedDate,  getTotalDaysOfMonth } from "./utils.js";
import { topBarMonthClicked } from "./setCalendar.js";

/**
 * This function sets the history of events on the aside element.
 * It fills it with all the events in an ordered manner.
 */
export function setHistoryOfEvents() {
    let arrayEvents = sortEventsByDateTime();
    const historyDiv: (HTMLDivElement | null) = document.querySelector(".history-events-container_div");
    const burgerBtn: (HTMLButtonElement | null) = document.querySelector(".header-burger-history_btn");
    if (arrayEvents === undefined) return;
    if (historyDiv === null) return;
    if (burgerBtn === null) return;
    historyDiv.replaceChildren();
    arrayEvents.forEach((event: Event): void => {
        const containerOfEvent: (HTMLDivElement) = document.createElement("div");
        const titleEvent: (HTMLHeadingElement) = document.createElement("h3");
        const dateEvent: (HTMLParagraphElement) = document.createElement("p");

        containerOfEvent.classList.add("container-event-history_div");
        containerOfEvent.setAttribute("event-id", event.id.toString());
        containerOfEvent.setAttribute("data-bs-toggle", "modal");
        containerOfEvent.setAttribute("data-bs-target", "#modal-info-event");
        containerOfEvent.addEventListener("click", eventInfoClicked);
        let displayBurguerBtn: string = window.getComputedStyle(burgerBtn).display;
        if (event.title.length > 6 && displayBurguerBtn === "none") titleEvent.innerText = `${event.title.slice(0, 6)}..`;
        else titleEvent.innerText = event.title;
        let dateE: Date = new Date(event.initialDate);
        dateEvent.innerText = `${dateE.getDate()}/${dateE.getMonth() + 1}/${dateE.getFullYear()}`;

        historyDiv.appendChild(containerOfEvent);
        containerOfEvent.appendChild(titleEvent);
        containerOfEvent.appendChild(dateEvent);
    })
}
//-------------------------------------------------------------------------------------------------------------------------
/**
 * This function is called when an event is clicked and shows us the modal
 * with the information of the event.
 * This is set on the functions of showCalendar and setHistoryOfEvents
 */
export function eventInfoClicked(this: HTMLParagraphElement | HTMLDivElement) {
    const eventsItem: string | null = localStorage.getItem("events");
    const eventId: string | null = this.getAttribute("event-id");
    console.log(eventId);
    const titleEventInfoH2: (HTMLHeadingElement | null) = document.querySelector(".modal-info-title");
    const initialValuesP: NodeListOf<HTMLParagraphElement> = document.querySelectorAll(".initial-values-p");
    const divEndValue: (HTMLDivElement | null) = document.querySelector(".end-values");
    const divInfoReminder: (HTMLDivElement | null) = document.querySelector(".info-reminder");
    const textAreaDescription: (HTMLTextAreaElement | null) = document.querySelector(".info-description-textarea");
    const eventTypeP: (HTMLParagraphElement | null) = document.querySelector(".info-event-type");
    if (eventTypeP === null) return;
    if (textAreaDescription === null) return;
    if (eventId === null) return;
    if (eventsItem === null) return;
    if (titleEventInfoH2 === null) return;
    if (divEndValue === null) return;
    if (divInfoReminder === null) return;


    let events: Array<Event> = JSON.parse(eventsItem);
    let eventClicked: Event = events[parseInt(eventId) - 1];

    titleEventInfoH2.innerText = eventClicked.title;

    let date: Date = new Date(eventClicked.initialDate);
    let dateEvent: string = getFormattedDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
    initialValuesP[1].innerText = `${dateEvent.split("-").reverse().join("/")} at ${eventClicked.initialTime}`;

    console.log(divEndValue);
    if (eventClicked.isCheckedEndEvent) {
        const endValuesP: NodeListOf<HTMLParagraphElement> = document.querySelectorAll(".end-values-p");
        divEndValue.classList.remove("modal-display-none");
        let dateEnd: Date = new Date(eventClicked.endDate);
        let dateEndEvent: string = getFormattedDate(dateEnd.getFullYear(), dateEnd.getMonth() + 1, dateEnd.getDate());
        endValuesP[1].innerText = `${dateEndEvent.split("-").reverse().join("/")}`;
        if (eventClicked.endTime !== "") endValuesP[1].innerText += ` at ${eventClicked.endTime}`;
    } else divEndValue.classList.add("modal-display-none");

    if (eventClicked.isCheckedReminder && eventClicked.reminder !== "default") {
        const reminderTimeP: (HTMLParagraphElement | null) = document.querySelector(".info-reminder-p");
        if (reminderTimeP === null) return;
        divInfoReminder.classList.remove("modal-display-none");
        let reminderT: ReminderTime = eventClicked.reminder;
        let reminderMinutes: number = 0;
        switch (reminderT) {
            case "five": reminderMinutes = 5;
                break;
            case "ten": reminderMinutes = 10;
                break;
            case "fifteen": reminderMinutes = 15;
                break;
            case "thirty": reminderMinutes = 30;
                break;
            case "one-hour": reminderMinutes = 60;
                break;
        }
        reminderTimeP.innerText = `Reminder set ${reminderMinutes} minutes before.`;


    } else divInfoReminder.classList.add("modal-display-none");



    if (eventClicked.description !== "") {
        textAreaDescription.innerText = eventClicked.description;
    } else textAreaDescription.innerText = "";


    if (eventClicked.eventType !== "default") {
        let eType: EventType = eventClicked.eventType;
        let typeEvent: string = "";
        switch (eType) {
            case "meeting": typeEvent = "Meeting";
                break;
            case "personal": typeEvent = "Personal";
                break;
            case "sports": typeEvent = "Sports";
                break;
            case "study": typeEvent = "Study";
                break;
        }
        eventTypeP.innerText = `Type of event: ${typeEvent}`;
    } else eventTypeP.innerText = "";

}
//------------------------------------------------------------------------------------------------------
/**
 * This one is called by setCalendar functions and
 * gives us the year and month
 * @return an array of year and month on the page [year, month]
 */
export function getYearMonth(): Array<number> | undefined {
    const selectedYear: (HTMLHeadingElement | null) = document.querySelector("#selected-year");
    const topBarMonthsInput: NodeListOf<HTMLInputElement> = document.querySelectorAll(".topbar-month_input");
    const date: Date = new Date();
    const currentYear: number = date.getFullYear();
    let month: number;
    if (selectedYear === null) return;
    if (currentYear === parseInt(selectedYear.innerText)) {
        month = date.getMonth() + 1;
        topBarMonthsInput[month - 1].checked = true;
    } else {
        month = 1;
        topBarMonthsInput[0].checked = true;
    }
    let year: number = parseInt(selectedYear.innerText);

    topBarMonthsInput.forEach(topBarMonth => {
        topBarMonth.addEventListener("click", topBarMonthClicked);
    })

    return [year, month];
}

//------------------------------------------------------------------------------------------------------
/**
 * Receives a year month and day of week and fills the previous empty spaces.
 * @param year 
 * @param month
 * @param dayOfWeek day of the week in which the month starts
 *                  dayOfWeek = 1 (Monday) --> (2,3,4,5,6) --> dayOfWeek = 0 (sunday)
 */
export function setPreviousMonth(year: number, month: number, dayOfWeek: number): void {
    let emptyDays: number = 7 - dayOfWeek + 1;
    let daysToFill: number = 7 - emptyDays;
    let previousMonth: number = month - 1;
    let previousYear: number = year;
    if (month === 1) {
        previousYear = year - 1;
        previousMonth = 12;
    }
    let totaDaysPreviousMonth: number = getTotalDaysOfMonth(previousMonth, previousYear);
    let i = 0;
    while (i < daysToFill) {
        const emptyEntryDayP: HTMLDivElement | null = document.querySelector(`#p-day-${i + 1}`);
        if (emptyEntryDayP === null) return;
        emptyEntryDayP.innerText = (totaDaysPreviousMonth - daysToFill + i + 1).toString();
        i++;
    }
}
//------------------------------------------------------------------------------------------------------
/**
 * Receives a year month and day of week and fills the next empty spaces.
 * @param year 
 * @param month
 * @param dayOfWeek day of the week in which the month starts
 *                  dayOfWeek = 1 (Monday) --> (2,3,4,5,6) --> dayOfWeek = 0 (sunday)
 */
export function setNextMonth(year: number, month: number, dayOfWeek: number): void{
    let totalDaysOfThisMonth: number = getTotalDaysOfMonth(month, year);
    let counterNextMonth: number = 1;
    let posFirstDayNextMonth: number = dayOfWeek + totalDaysOfThisMonth;
    for(let i = posFirstDayNextMonth; i <= 42; i++) {
        const emptyEntryDayP: HTMLDivElement | null = document.querySelector(`#p-day-${i}`);
        if (emptyEntryDayP === null) return;
        emptyEntryDayP.innerText = counterNextMonth.toString();
        counterNextMonth++;
    }
}

//------------------------------------------------------------------------------------------------------
/**
 * remove unnecesary div in responsive design 
 */
export function fillEntryDays(): void {
    const entryDaysDiv: NodeListOf<HTMLDivElement> = document.querySelectorAll(".entry-day-calendar_div");
    for (let i = 28; i < 42; i++) {
        entryDaysDiv[i].classList.remove("entry-day-display-none");
    }
}
//------------------------------------------------------------------------------------------------------
/**
 * clean show days in calendar
 */
export function cleanDaysInCalendar(): void {
    const nListdaysInCalendar: NodeListOf<HTMLDivElement> = document.querySelectorAll(".show-entry-day-calendar");
    const nListentryDayInfoP: NodeListOf<HTMLParagraphElement> = document.querySelectorAll(".show-entry-paragraph");
    const nListentryDayInfoSpan: NodeListOf<HTMLSpanElement> = document.querySelectorAll(".show-entry-day-span");
    const nListentryDayEventsDiv: NodeListOf<HTMLDivElement> = document.querySelectorAll(".show-entry-day-events_div");

    if (nListdaysInCalendar.length > 0) {
        nListdaysInCalendar.forEach((dayInCalendar, day) => {
            dayInCalendar.classList.remove("show-entry-day-calendar");
            nListentryDayInfoP[day].classList.remove("show-entry-paragraph");
            nListentryDayInfoP[day].innerText = "";
            nListentryDayInfoSpan[day].innerText = "";
            nListentryDayInfoSpan[day].classList.remove("show-entry-day-span");
            nListentryDayInfoSpan[day].removeAttribute("number-day");
            nListentryDayEventsDiv[day].classList.remove("show-entry-day-events_div");
            nListentryDayEventsDiv[day].replaceChildren();
        });
    }
}
//------------------------------------------------------------------------------------------------------------
/**
 * This function return an array of the selected year and month.
 * The year is the heading number and the month is the 
 * input checked in the topBar months container div
 */
export function getYearMonthSelected(): Array<number> | undefined {
    const yearSelected: (HTMLHeadingElement | null) = document.querySelector("#selected-year");
    const topBarMonths: NodeListOf<HTMLInputElement> = document.querySelectorAll(".topbar-month_input")
    if (yearSelected === null) return;
    if (topBarMonths === null) return;
    let month: number = 0;
    topBarMonths.forEach((topBarMonth: HTMLInputElement): void => {
        let numberMonth: string | null = topBarMonth.getAttribute("number-month");
        if (numberMonth === null) return;
        if (topBarMonth.checked) month = parseInt(numberMonth);
    })
    let year: number = parseInt(yearSelected.innerText);
    return [year, month];
}