import { sortEventsByDateTime } from "./setCalendar.js";
import { getFormattedDate, getTotalDaysOfMonth } from "./utils.js";
import { topBarMonthClicked } from "./setCalendar.js";
export function setHistoryOfEvents() {
    let arrayEvents = sortEventsByDateTime();
    const historyDiv = document.querySelector(".history-events-container_div");
    const burgerBtn = document.querySelector(".header-burger-history_btn");
    if (arrayEvents === undefined)
        return;
    if (historyDiv === null)
        return;
    if (burgerBtn === null)
        return;
    historyDiv.replaceChildren();
    arrayEvents.forEach((event) => {
        const containerOfEvent = document.createElement("div");
        const titleEvent = document.createElement("h3");
        const dateEvent = document.createElement("p");
        containerOfEvent.classList.add("container-event-history_div");
        containerOfEvent.setAttribute("event-id", event.id.toString());
        containerOfEvent.setAttribute("data-bs-toggle", "modal");
        containerOfEvent.setAttribute("data-bs-target", "#modal-info-event");
        containerOfEvent.addEventListener("click", eventInfoClicked);
        let displayBurguerBtn = window.getComputedStyle(burgerBtn).display;
        if (event.title.length > 6 && displayBurguerBtn === "none")
            titleEvent.innerText = `${event.title.slice(0, 6)}..`;
        else
            titleEvent.innerText = event.title;
        let dateE = new Date(event.initialDate);
        dateEvent.innerText = `${dateE.getDate()}/${dateE.getMonth() + 1}/${dateE.getFullYear()}`;
        historyDiv.appendChild(containerOfEvent);
        containerOfEvent.appendChild(titleEvent);
        containerOfEvent.appendChild(dateEvent);
    });
}
export function eventInfoClicked() {
    const eventsItem = localStorage.getItem("events");
    const eventId = this.getAttribute("event-id");
    console.log(eventId);
    const titleEventInfoH2 = document.querySelector(".modal-info-title");
    const initialValuesP = document.querySelectorAll(".initial-values-p");
    const divEndValue = document.querySelector(".end-values");
    const divInfoReminder = document.querySelector(".info-reminder");
    const textAreaDescription = document.querySelector(".info-description-textarea");
    const eventTypeP = document.querySelector(".info-event-type");
    if (eventTypeP === null)
        return;
    if (textAreaDescription === null)
        return;
    if (eventId === null)
        return;
    if (eventsItem === null)
        return;
    if (titleEventInfoH2 === null)
        return;
    if (divEndValue === null)
        return;
    if (divInfoReminder === null)
        return;
    let events = JSON.parse(eventsItem);
    let eventClicked = events[parseInt(eventId) - 1];
    titleEventInfoH2.innerText = eventClicked.title;
    let date = new Date(eventClicked.initialDate);
    let dateEvent = getFormattedDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
    initialValuesP[1].innerText = `${dateEvent.split("-").reverse().join("/")} at ${eventClicked.initialTime}`;
    console.log(divEndValue);
    if (eventClicked.isCheckedEndEvent) {
        const endValuesP = document.querySelectorAll(".end-values-p");
        divEndValue.classList.remove("modal-display-none");
        let dateEnd = new Date(eventClicked.endDate);
        let dateEndEvent = getFormattedDate(dateEnd.getFullYear(), dateEnd.getMonth() + 1, dateEnd.getDate());
        endValuesP[1].innerText = `${dateEndEvent.split("-").reverse().join("/")}`;
        if (eventClicked.endTime !== "")
            endValuesP[1].innerText += ` at ${eventClicked.endTime}`;
    }
    else
        divEndValue.classList.add("modal-display-none");
    if (eventClicked.isCheckedReminder && eventClicked.reminder !== "default") {
        const reminderTimeP = document.querySelector(".info-reminder-p");
        if (reminderTimeP === null)
            return;
        divInfoReminder.classList.remove("modal-display-none");
        let reminderT = eventClicked.reminder;
        let reminderMinutes = 0;
        switch (reminderT) {
            case "five":
                reminderMinutes = 5;
                break;
            case "ten":
                reminderMinutes = 10;
                break;
            case "fifteen":
                reminderMinutes = 15;
                break;
            case "thirty":
                reminderMinutes = 30;
                break;
            case "one-hour":
                reminderMinutes = 60;
                break;
        }
        reminderTimeP.innerText = `Reminder set ${reminderMinutes} minutes before.`;
    }
    else
        divInfoReminder.classList.add("modal-display-none");
    if (eventClicked.description !== "") {
        textAreaDescription.innerText = eventClicked.description;
    }
    else
        textAreaDescription.innerText = "";
    if (eventClicked.eventType !== "default") {
        let eType = eventClicked.eventType;
        let typeEvent = "";
        switch (eType) {
            case "meeting":
                typeEvent = "Meeting";
                break;
            case "personal":
                typeEvent = "Personal";
                break;
            case "sports":
                typeEvent = "Sports";
                break;
            case "study":
                typeEvent = "Study";
                break;
        }
        eventTypeP.innerText = `Type of event: ${typeEvent}`;
    }
    else
        eventTypeP.innerText = "";
}
export function getYearMonth() {
    const selectedYear = document.querySelector("#selected-year");
    const topBarMonthsInput = document.querySelectorAll(".topbar-month_input");
    const date = new Date();
    const currentYear = date.getFullYear();
    let month;
    if (selectedYear === null)
        return;
    if (currentYear === parseInt(selectedYear.innerText)) {
        month = date.getMonth() + 1;
        topBarMonthsInput[month - 1].checked = true;
    }
    else {
        month = 1;
        topBarMonthsInput[0].checked = true;
    }
    let year = parseInt(selectedYear.innerText);
    topBarMonthsInput.forEach(topBarMonth => {
        topBarMonth.addEventListener("click", topBarMonthClicked);
    });
    return [year, month];
}
export function setPreviousMonth(year, month, dayOfWeek) {
    let emptyDays = 7 - dayOfWeek + 1;
    let daysToFill = 7 - emptyDays;
    let previousMonth = month - 1;
    let previousYear = year;
    if (month === 1) {
        previousYear = year - 1;
        previousMonth = 12;
    }
    let totaDaysPreviousMonth = getTotalDaysOfMonth(previousMonth, previousYear);
    let i = 0;
    while (i < daysToFill) {
        const emptyEntryDayP = document.querySelector(`#p-day-${i + 1}`);
        if (emptyEntryDayP === null)
            return;
        emptyEntryDayP.innerText = (totaDaysPreviousMonth - daysToFill + i + 1).toString();
        i++;
    }
}
export function setNextMonth(year, month, dayOfWeek) {
    let totalDaysOfThisMonth = getTotalDaysOfMonth(month, year);
    let counterNextMonth = 1;
    let posFirstDayNextMonth = dayOfWeek + totalDaysOfThisMonth;
    for (let i = posFirstDayNextMonth; i <= 42; i++) {
        const emptyEntryDayP = document.querySelector(`#p-day-${i}`);
        if (emptyEntryDayP === null)
            return;
        emptyEntryDayP.innerText = counterNextMonth.toString();
        counterNextMonth++;
    }
}
export function fillEntryDays() {
    const entryDaysDiv = document.querySelectorAll(".entry-day-calendar_div");
    for (let i = 28; i < 42; i++) {
        entryDaysDiv[i].classList.remove("entry-day-display-none");
    }
}
export function cleanDaysInCalendar() {
    const nListdaysInCalendar = document.querySelectorAll(".show-entry-day-calendar");
    const nListentryDayInfoP = document.querySelectorAll(".show-entry-paragraph");
    const nListentryDayInfoSpan = document.querySelectorAll(".show-entry-day-span");
    const nListentryDayEventsDiv = document.querySelectorAll(".show-entry-day-events_div");
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
export function getYearMonthSelected() {
    const yearSelected = document.querySelector("#selected-year");
    const topBarMonths = document.querySelectorAll(".topbar-month_input");
    if (yearSelected === null)
        return;
    if (topBarMonths === null)
        return;
    let month = 0;
    topBarMonths.forEach((topBarMonth) => {
        let numberMonth = topBarMonth.getAttribute("number-month");
        if (numberMonth === null)
            return;
        if (topBarMonth.checked)
            month = parseInt(numberMonth);
    });
    let year = parseInt(yearSelected.innerText);
    return [year, month];
}
