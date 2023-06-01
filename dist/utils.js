import { setCalendar } from "./setCalendar.js";
import { setHistoryOfEvents } from "./functions.js";
export function setAsideHistoryOfEvents() {
    const burgerBtn = document.querySelector(".header-burger-history_btn");
    const asideHistoryOfEvents = document.querySelector(".history-events-container_aside");
    if (burgerBtn === null)
        return;
    if (asideHistoryOfEvents === null)
        return;
    const displayBurgerBtn = window.getComputedStyle(burgerBtn).display;
    if (displayBurgerBtn === "none") {
        localStorage.setItem("view", "desktop");
        asideHistoryOfEvents.classList.add("show");
    }
    else {
        localStorage.setItem("view", "small");
        asideHistoryOfEvents.classList.remove("show");
    }
    window.addEventListener("resize", setResizedAsideHistoryOfEvents);
}
function setResizedAsideHistoryOfEvents() {
    const asideHistoryOfEvents = document.querySelector(".history-events-container_aside");
    if (asideHistoryOfEvents === null)
        return;
    if (window.innerWidth > 1100) {
        asideHistoryOfEvents.classList.add("show");
        if (localStorage.getItem("view") === "small") {
            cleanDay();
            setCalendar();
            setHistoryOfEvents();
            localStorage.setItem("view", "desktop");
        }
    }
    else {
        asideHistoryOfEvents.classList.remove("show");
        if (localStorage.getItem("view") === "desktop") {
            cleanDay();
            setCalendar();
            setHistoryOfEvents();
            localStorage.setItem("view", "small");
        }
    }
}
function cleanDay() {
    const colouredDay = document.querySelector(".bg-current-day");
    if (colouredDay !== null)
        colouredDay.classList.remove("bg-current-day");
}
export function adjustTopScrollBar() {
    const topBarMonthsContainer = document.querySelector(".topbar-months-container");
    const topBarInputMonths = document.querySelectorAll(".topbar-month_input");
    if (topBarMonthsContainer === null)
        return;
    let posMonth = 0;
    for (let i = 0; i < topBarInputMonths.length; i++) {
        if (topBarInputMonths[i].checked) {
            posMonth = i;
            i = topBarInputMonths.length;
        }
    }
    topBarMonthsContainer.scrollLeft = 100 * (posMonth - 1);
}
export function adjustCalendarScrollBar() {
    const entryDaysCalendarContainer = document.querySelector(".days-month-container_section");
    if (entryDaysCalendarContainer === null)
        return;
    entryDaysCalendarContainer.scrollTop = 0;
}
export function eventListenerChangeYear() {
    const getPreviousYear = document.querySelector(".topbar-previous-year_div");
    const getNextYear = document.querySelector(".topbar-next-year_div");
    if (getPreviousYear === null)
        return;
    if (getNextYear === null)
        return;
    getPreviousYear.addEventListener("click", changeYearClicked);
    getNextYear.addEventListener("click", changeYearClicked);
}
function changeYearClicked() {
    const selectedYear = document.querySelector("#selected-year");
    if (selectedYear === null)
        return;
    if (this.classList.contains("topbar-previous-year_div")) {
        selectedYear.innerText = (parseInt(selectedYear.innerText) - 1).toString();
    }
    else
        selectedYear.innerText = (parseInt(selectedYear.innerText) + 1).toString();
    setCalendar();
}
export function getTotalDaysOfMonth(month, year) {
    let daysFebruary = 28;
    if (isLeapYear(year)) {
        daysFebruary = 29;
    }
    const arrayOfTotalDays = [31, daysFebruary, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return arrayOfTotalDays[month - 1];
}
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 4 === 0 && year % 100 === 0 && year % 400 === 0);
}
export function getFormattedDate(year, month, day) {
    let correctMonth = month.toString();
    let correctDay = day.toString();
    if (month < 10)
        correctMonth = `0${correctMonth}`;
    if (day < 10)
        correctDay = `0${correctDay}`;
    return `${year}-${correctMonth}-${correctDay}`;
}
export function getDayOfWeekOfDayEntered(year, month, dayOfMonth) {
    return new Date(`${year}-${month}-${dayOfMonth}`).getDay();
}
export function getTotalMinutes(time1, time2) {
    let arrTime1 = time1.split(":");
    let arrTime2 = time2.split(":");
    let totalMinsTime1 = (parseInt(arrTime1[0]) * 60) + parseInt(arrTime1[1]);
    let totalMinsTime2 = (parseInt(arrTime2[0]) * 60) + parseInt(arrTime2[1]);
    return totalMinsTime1 - totalMinsTime2;
}
export function getCurrentFormattedDate() {
    let date = new Date();
    let actualMonth;
    let actualDay;
    if ((date.getMonth() + 1) < 10) {
        actualMonth = `0${date.getMonth() + 1}`;
    }
    else {
        actualMonth = `${date.getMonth() + 1}`;
    }
    if ((date.getDate()) < 10) {
        actualDay = `0${date.getDate()}`;
    }
    else {
        actualDay = `${date.getDate()}`;
    }
    let currentDate = `${date.getFullYear()}-${actualMonth}-${actualDay}`;
    return currentDate;
}
export function getCurrentFormattedTime() {
    let date = new Date();
    let actualHour;
    let actualMinutes;
    if (date.getHours() < 10) {
        actualHour = `0${date.getHours()}`;
    }
    else {
        actualHour = `${date.getHours()}`;
    }
    if ((date.getMinutes()) < 10) {
        actualMinutes = `0${date.getMinutes()}`;
    }
    else {
        actualMinutes = `${date.getMinutes()}`;
    }
    let currentTime = `${actualHour}:${actualMinutes}`;
    return currentTime;
}
//# sourceMappingURL=utils.js.map