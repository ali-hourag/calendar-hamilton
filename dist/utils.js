import { setCalendar } from "./setCalendar.js";
export function setAsideHistoryOfEvents() {
    const burgerBtn = document.querySelector(".header-burger-history_btn");
    const asideHistoryOfEvents = document.querySelector(".history-events-container_aside");
    if (burgerBtn === null)
        return;
    if (asideHistoryOfEvents === null)
        return;
    const displayBurgerBtn = window.getComputedStyle(burgerBtn).display;
    (displayBurgerBtn === "none") ? asideHistoryOfEvents.classList.add("show") : asideHistoryOfEvents.classList.remove("show");
    window.addEventListener("resize", setResizedAsideHistoryOfEvents);
}
function setResizedAsideHistoryOfEvents() {
    const asideHistoryOfEvents = document.querySelector(".history-events-container_aside");
    if (asideHistoryOfEvents === null)
        return;
    (window.innerWidth > 1100) ? asideHistoryOfEvents.classList.add("show") : asideHistoryOfEvents.classList.remove("show");
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
function getTotalDaysOfMonth(month, year) {
    let daysFebruary = 28;
    if (isLeapYear(year)) {
        daysFebruary = 29;
    }
    const arrayOfTotalDays = [31, daysFebruary, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return 1;
}
function isLeapYear(year) {
    let isLeapYearTrue = false;
    if (year % 4 === 0) {
        if (year % 400 === 0) {
            isLeapYearTrue = true;
        }
        else {
            if (year % 100 !== 0)
                isLeapYearTrue = true;
        }
    }
    return isLeapYearTrue;
}
//# sourceMappingURL=utils.js.map