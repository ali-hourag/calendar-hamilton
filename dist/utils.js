import { setCalendar } from "./setCalendar.js";
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
            setCalendar();
            localStorage.setItem("view", "desktop");
        }
    }
    else {
        asideHistoryOfEvents.classList.remove("show");
        if (localStorage.getItem("view") === "desktop") {
            setCalendar();
            localStorage.setItem("view", "small");
        }
    }
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
//# sourceMappingURL=utils.js.map