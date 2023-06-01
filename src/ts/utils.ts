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
//---------------------------------------------------------------------------------------------------------
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
            cleanDay();
            setCurrentDay();
        }

    } else {
        asideHistoryOfEvents.classList.remove("show");
        if (localStorage.getItem("view") === "desktop") {
            setCalendar();
            setHistoryOfEvents()
            localStorage.setItem("view", "small");
            cleanDay();
            setCurrentDay();
        }
    }
}
//---------------------------------------------------------------------------------------------------
/**
 * This function clean coloured current day.
 */
function cleanDay() {
    const colouredDay: (HTMLDivElement | null) = document.querySelector(".bg-current-day");
    if (colouredDay !== null) colouredDay.classList.remove("bg-current-day");
}
//---------------------------------------------------------------------------------------------------
/**
 * This function sets the current date with a background color.
 */
function setCurrentDay() {
    console.log("llamado");
    const selectedYear: (HTMLHeadingElement | null) = document.querySelector("#selected-year");
    const topbarMonths: (NodeListOf<HTMLInputElement>) = document.querySelectorAll(".topbar-month_input");
    const colouredDay: (HTMLDivElement | null) = document.querySelector(".bg-current-day");
    if (colouredDay !== null) colouredDay.classList.remove("bg-current-day");
    if (selectedYear === null) return;
    const date: Date = new Date();

    let year: number = parseInt(selectedYear.innerText);
    let found: boolean = false;
    let i: number = 0;
    while (!found) {
        if (!topbarMonths[i].checked) i++;
        else found = true;
    }

    let month: number = i + 1;
    if ((year === date.getFullYear()) && (month === date.getMonth() + 1)) {
        const entryDaysShowed: NodeListOf<HTMLDivElement> = document.querySelectorAll(".show-entry-day-calendar");
        entryDaysShowed[date.getDate() - 1].classList.add("bg-current-day");
    } else {
        const entryCurrentDay: (HTMLDivElement | null) = document.querySelector(".bg-current-day");
        if (entryCurrentDay !== null) entryCurrentDay.classList.remove("bg-current-day");
    }
}
//---------------------------------------------------------------------------------------------------
/**
 * Adjusts the scrollbar so that in responsive design we always
 * see the checked month. It moves it to the right place automatically.
 */
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
/**
 * Adjusts the scroll so that when a month is clicked, the scrollbar return to
 * the default position at the start of the container
 */
export function adjustCalendarScrollBar(): void {
    const entryDaysCalendarContainer: (HTMLDivElement | null) = document.querySelector(".days-month-container_section");
    if (entryDaysCalendarContainer === null) return;
    entryDaysCalendarContainer.scrollTop = 0;
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
function changeYearClicked(this: HTMLDivElement): void {
    const selectedYear: (HTMLHeadingElement | null) = document.querySelector("#selected-year");
    if (selectedYear === null) return;

    if (this.classList.contains("topbar-previous-year_div")) {
        selectedYear.innerText = (parseInt(selectedYear.innerText) - 1).toString();
    } else selectedYear.innerText = (parseInt(selectedYear.innerText) + 1).toString();
    setCalendar();
}
//---------------------------------------------------------------------------------------------------
/**
 * @param month -> we get the total days of this month
 * @param year -> year to which the month belongs to
 * @return total days of a specific month
 */
export function getTotalDaysOfMonth(month: number, year: number): number {
    let daysFebruary: number = 28;
    if (isLeapYear(year)) {
        daysFebruary = 29;
    }

    const arrayOfTotalDays: Array<number> = [31, daysFebruary, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    return arrayOfTotalDays[month - 1];
}
//---------------------------------------------------------------------------------------------------
/**
 * 
 * @param year -> we want to know if this year is leap or not
 * @returns -> boolean if is leap or not
 */
function isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 4 === 0 && year % 100 === 0 && year % 400 === 0);
}

//---------------------------------------------------------------------------------------------------
/**
 * if we get a date, we get it in this way -> 2023-2-8;
 * However, if the days of month are < than 10, then we want
 * a 0 in front of them -> 2023-02-08
 * @param year year passed
 * @param month month passed
 * @param day day of month passed
 * @return string of the date formatted (2023-2-8  ->  2023-02-08)
 */
export function getFormattedDate(year: number, month: number, day: number): string {
    let correctMonth: string = month.toString();
    let correctDay: string = day.toString();
    if (month < 10) correctMonth = `0${correctMonth}`;
    if (day < 10) correctDay = `0${correctDay}`;
    return `${year}-${correctMonth}-${correctDay}`;
}

//------------------------------------------------------------------------------------------------------
/**
 * @return the return is a number that indicates the day of the week
 * goin from 0-6 being 0 sunday and 6 saturday
 */
export function getDayOfWeekOfDayEntered(year: number, month: number, dayOfMonth: number): number {
    return new Date(`${year}-${month}-${dayOfMonth}`).getDay();
}
//------------------------------------------------------------------------------------------------------------
/**
 * @param time1 hour:minutes PRE
 * @param time2 hour:minutes PRE
 * PRE: time1 has to be bigger (>) than time 2
 * @return returns total minutes between those 2 times
 */
export function getTotalMinutes(time1: string, time2: string): number {
    let arrTime1: string[] = time1.split(":");
    let arrTime2: string[] = time2.split(":");
    let totalMinsTime1: number = (parseInt(arrTime1[0]) * 60) + parseInt(arrTime1[1]);
    let totalMinsTime2: number = (parseInt(arrTime2[0]) * 60) + parseInt(arrTime2[1]);

    return totalMinsTime1 - totalMinsTime2;
}
//------------------------------------------------------------------------------------------------------------
/**
 * If the current date the month is less than 10, it will be 1, 2, 3
 * However, for some functions we want it to be 01, 02, 03..
 * the same happens for the days.
 * This functions solves that and returns the correct date if needed.
 * @return returns current formatted date
 */
export function getCurrentFormattedDate(): string {
    let date: Date = new Date();
    let actualMonth: string;
    let actualDay: string;
    if ((date.getMonth() + 1) < 10) {
        actualMonth = `0${date.getMonth() + 1}`;
    } else {
        actualMonth = `${date.getMonth() + 1}`;
    }
    if ((date.getDate()) < 10) {
        actualDay = `0${date.getDate()}`;
    } else {
        actualDay = `${date.getDate()}`;
    }
    let currentDate: string = `${date.getFullYear()}-${actualMonth}-${actualDay}`;

    return currentDate;
}