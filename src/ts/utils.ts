import { setCalendar } from "./setCalendar.js";
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
    (displayBurgerBtn === "none")? asideHistoryOfEvents.classList.add("show"): asideHistoryOfEvents.classList.remove("show");

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
    (window.innerWidth > 1100)? asideHistoryOfEvents.classList.add("show"):asideHistoryOfEvents.classList.remove("show");
}

//------------------------------------------------------------------------------------------------------
export function eventListenerChangeYear(): void {
    const getPreviousYear: (HTMLDivElement | null) = document.querySelector(".topbar-previous-year_div");
    const getNextYear: (HTMLDivElement | null) = document.querySelector(".topbar-next-year_div");
    if(getPreviousYear === null) return;
    if(getNextYear === null) return;

    getPreviousYear.addEventListener("click", changeYearClicked);
    getNextYear.addEventListener("click", changeYearClicked);
} 

//---------------------------------------------------------------------------------------------------
function changeYearClicked(this: HTMLDivElement){
    const selectedYear: (HTMLHeadingElement | null) = document.querySelector("#selected-year");
    if(selectedYear === null) return;

    if(this.classList.contains("topbar-previous-year_div")){
        selectedYear.innerText = (parseInt(selectedYear.innerText) - 1).toString();
    } else selectedYear.innerText = (parseInt(selectedYear.innerText) + 1).toString();
    setCalendar();
}

function getTotalDaysOfMonth(month: number, year: number):number {
    let daysFebruary: number = 28;
    if(isLeapYear(year)){
        daysFebruary = 29;
    }
    const arrayOfTotalDays: Array<number> = [31, daysFebruary, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return 1;
}

function isLeapYear(year: number): boolean {
    let isLeapYearTrue: boolean = false;
    if(year % 4 === 0){
        if(year % 400 === 0){
            isLeapYearTrue = true;
        } else{
            if(year % 100 !== 0) isLeapYearTrue = true;
        }
    }

    return isLeapYearTrue;
}