import { setCalendar } from "./setCalendar.js";
import { setHistoryOfEvents } from "./functions.js";
/**
 * This function is responsible for fixing the aside that shows the
 * history of events depending on which screen size we are on. So,
 * if the burger button is displayed, it means that we are on a device <= 750 px
 * and the aside does not have to be showed since it will be shown by clicking on the
 * burger button.
 * Otherwise, it is shown always.
 */
export function setAsideHistoryOfEvents(): void {
    const burgerBtn: (HTMLButtonElement | null) = document.querySelector(".header-burger-history_btn");
    const asideHistoryOfEvents: (HTMLElement | null) = document.querySelector(".history-events-container_aside");
    if (burgerBtn === null) return;
    if (asideHistoryOfEvents === null) return;

    const displayBurgerBtn: string = window.getComputedStyle(burgerBtn).display;
    if (displayBurgerBtn === "none") {
        localStorage.setItem("view", "desktop");
        asideHistoryOfEvents.classList.add("show");
    } else {
        localStorage.setItem("view", "small");
        asideHistoryOfEvents.classList.remove("show");
    }

    window.addEventListener("resize", setResizedAsideHistoryOfEvents);
}
/**
 * This function does the same as @function setAsideHistoryOfEvents()
 * The difference is that the other one is called when the page is on load.
 * And this one when the screen is resized.
 */
function setResizedAsideHistoryOfEvents(): void {
    const asideHistoryOfEvents: (HTMLElement | null) = document.querySelector(".history-events-container_aside");
    if (asideHistoryOfEvents === null) return;
    if (window.innerWidth > 1100) {
        asideHistoryOfEvents.classList.add("show");
        if (localStorage.getItem("view") === "small") {
            setCalendar();
            setHistoryOfEvents()
            localStorage.setItem("view", "desktop");
        }

    } else {
        asideHistoryOfEvents.classList.remove("show");
        if (localStorage.getItem("view") === "desktop") {
            setCalendar();
            setHistoryOfEvents()
            localStorage.setItem("view", "small");
        }
    }
}

//------------------------------------------------------------------------------------------------------
export function eventListenerChangeYear(): void {
    const getPreviousYear: (HTMLDivElement | null) = document.querySelector(".topbar-previous-year_div");
    const getNextYear: (HTMLDivElement | null) = document.querySelector(".topbar-next-year_div");
    if (getPreviousYear === null) return;
    if (getNextYear === null) return;

    getPreviousYear.addEventListener("click", changeYearClicked);
    getNextYear.addEventListener("click", changeYearClicked);
}

//---------------------------------------------------------------------------------------------------
function changeYearClicked(this: HTMLDivElement) {
    const selectedYear: (HTMLHeadingElement | null) = document.querySelector("#selected-year");
    if (selectedYear === null) return;

    if (this.classList.contains("topbar-previous-year_div")) {
        selectedYear.innerText = (parseInt(selectedYear.innerText) - 1).toString();
    } else selectedYear.innerText = (parseInt(selectedYear.innerText) + 1).toString();
    setCalendar();
}
//---------------------------------------------------------------------------------------------------
export function getTotalDaysOfMonth(month: number, year: number): number {
    let daysFebruary: number = 28;
    if (isLeapYear(year)) {
        daysFebruary = 29;
    }

    const arrayOfTotalDays: Array<number> = [31, daysFebruary, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    return arrayOfTotalDays[month - 1];
}
//---------------------------------------------------------------------------------------------------

function isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 4 === 0 && year % 100 === 0 && year % 400 === 0);
}

//---------------------------------------------------------------------------------------------------
export function getFormattedDate(year: number, month: number, day: number): string {
    let correctMonth: string = month.toString();
    let correctDay: string = day.toString();
    if (month < 10) correctMonth = `0${correctMonth}`;
    if (day < 10) correctDay = `0${correctDay}`;
    return `${year}-${correctMonth}-${correctDay}`;
}

//---------------------------------------------------------------------------------------------------

export function adjustTopScrollBar(): void {
    const topBarMonthsContainer: (HTMLDivElement | null) = document.querySelector(".topbar-months-container");
    const topBarInputMonths: NodeListOf<HTMLInputElement> = document.querySelectorAll(".topbar-month_input");
    if (topBarMonthsContainer === null) return;
    let posMonth: number = 0;
    for (let i = 0; i < topBarInputMonths.length; i++) {
        if (topBarInputMonths[i].checked) {
            posMonth = i;
            i = topBarInputMonths.length;
        }
    }
    topBarMonthsContainer.scrollLeft = 100 * (posMonth - 1);
}
//---------------------------------------------------------------------------------------------------
export function adjustCalendarScrollBar() {
    const entryDaysCalendarContainer: (HTMLDivElement | null) = document.querySelector(".days-month-container_section");
    if (entryDaysCalendarContainer === null) return;
    entryDaysCalendarContainer.scrollTop = 0;
}