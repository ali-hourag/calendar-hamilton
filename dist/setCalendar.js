import { getTotalDaysOfMonth } from "./utils.js";
import { clearModal } from "./validateModal.js";
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
function getYearMonth() {
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
        const containerEntryDay = document.querySelector(`#weekday-${i}`);
        const paragraphEntryDay = document.querySelector(`#p-day-${i}`);
        const spanEntryDay = document.querySelector(`#span-day-${i}`);
        const entryDayInfoDiv = document.querySelector(`#div-day-info-${i}`);
        if (containerEntryDay === null)
            return;
        if (paragraphEntryDay === null)
            return;
        if (spanEntryDay === null)
            return;
        if (entryDayInfoDiv === null)
            return;
        containerEntryDay.classList.add("show-entry-day-calendar");
        paragraphEntryDay.classList.add("show-entry-paragraph");
        paragraphEntryDay.innerText = counterMonthDays.toString();
        spanEntryDay.innerText = "+";
        spanEntryDay.classList.add("show-entry-day-span");
        spanEntryDay.setAttribute("number-day", counterMonthDays.toString());
        entryDayInfoDiv.classList.add("show-entry-day_div");
        let eventsDivId = `#div-events-day-${i}`;
        setEntryDayEvents(year, month, counterMonthDays, eventsDivId);
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
    }
}
function fillEntryDays() {
    const entryDaysDiv = document.querySelectorAll(".entry-day-calendar_div");
    for (let i = 28; i < 42; i++) {
        entryDaysDiv[i].classList.remove("entry-day-display-none");
    }
}
function topBarMonthClicked() {
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
function cleanDaysInCalendar() {
    const daysInCalendar = document.querySelectorAll(".show-entry-day-calendar");
    const entryDayInfoP = document.querySelectorAll(".show-entry-paragraph");
    const entryDayInfoSpan = document.querySelectorAll(".show-entry-day-span");
    const entryDayInfoDiv = document.querySelectorAll(".show-entry-day_div");
    if (daysInCalendar.length > 0) {
        daysInCalendar.forEach((dayInCalendar, day) => {
            dayInCalendar.classList.remove("show-entry-day-calendar");
            entryDayInfoP[day].classList.remove("show-entry-paragraph");
            entryDayInfoP[day].innerText = "";
            entryDayInfoSpan[day].innerText = "";
            entryDayInfoSpan[day].classList.remove("show-entry-day-span");
            entryDayInfoSpan[day].removeAttribute("number-day");
            entryDayInfoDiv[day].classList.remove("show-entry-day_div");
        });
    }
}
function setEntryDayEvents(year, month, dayOfMonth, divId) {
    let eventEntered = localStorage.getItem("events");
    if (eventEntered === null)
        return;
    let events = JSON.parse(eventEntered);
    let dateEvent = new Date(events[0].initialDate);
    console.log(dateEvent.getFullYear());
}
function entryDayEventClicked() {
    let dayClicked = this.getAttribute("number-day");
    if (dayClicked !== null)
        localStorage.setItem("new-event-day", dayClicked);
    clearModal();
}
function getDayOfWeekOfDayEntered(year, month, dayOfMonth) {
    return new Date(`${year}-${month}-${dayOfMonth}`).getDay();
}
//# sourceMappingURL=setCalendar.js.map