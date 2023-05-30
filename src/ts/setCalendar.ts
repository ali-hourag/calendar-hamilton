import {getTotalDaysOfMonth } from "./utils.js";
import {clearModal} from "./validateModal.js"

export function setCalendar(): void {
    const burgerBtn: (HTMLButtonElement | null) = document.querySelector(".header-burger-history_btn");
    if (burgerBtn === null) return;

    let displayBurguerBtn: string = window.getComputedStyle(burgerBtn).display;
    (displayBurguerBtn === "none") ? setCalendarDesktop() : setCalendarSmallDevice();
}

//------------------------------------------------------------------------------------------------------
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
function setCalendarSmallDevice(): void {
    let arrayYM: Array<number> | undefined = getYearMonth();
    if (arrayYM === undefined) return;
    let year: number = arrayYM[0];
    let month: number = arrayYM[1];
    //Always starts at the top, since there is no topbar with the days of the week
    showDaysInCalendar(year, month, 1);
}
//------------------------------------------------------------------------------------------------------
function getYearMonth(): Array<number> | undefined {
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
function showDaysInCalendar(year: number, month: number, dayOfWeek: number): void {
    const entryDaysDisplayNone: NodeListOf<HTMLDivElement> = document.querySelectorAll(".entry-day-display-none");
    if(entryDaysDisplayNone.length > 0) fillEntryDays();
    cleanDaysInCalendar();
    const burgerBtn: (HTMLButtonElement | null) = document.querySelector(".header-burger-history_btn");
    if (burgerBtn === null) return;
    let displayBurguerBtn: string = window.getComputedStyle(burgerBtn).display;
    let daysOfMonth: number = getTotalDaysOfMonth(month, year);
    if (dayOfWeek === 0) dayOfWeek = 7;
    const date: Date = new Date();
    let counterMonthDays: number = 1;

    for (let i = dayOfWeek; i < (daysOfMonth + dayOfWeek); i++) {
        const containerEntryDay: (HTMLDivElement | null) = document.querySelector(`#weekday-${i}`);
        const paragraphEntryDay: (HTMLParagraphElement | null) = document.querySelector(`#p-day-${i}`);
        const spanEntryDay: (HTMLSpanElement | null) = document.querySelector(`#span-day-${i}`);
        const entryDayInfoDiv: (HTMLDivElement | null) = document.querySelector(`#div-day-info-${i}`);
        if (containerEntryDay === null) return;
        if (paragraphEntryDay === null) return;
        if (spanEntryDay === null) return;
        if(entryDayInfoDiv === null) return;

        containerEntryDay.classList.add("show-entry-day-calendar");
        paragraphEntryDay.classList.add("show-entry-paragraph");
        paragraphEntryDay.innerText = counterMonthDays.toString();
        spanEntryDay.innerText = "+";
        spanEntryDay.classList.add("show-entry-day-span");
        spanEntryDay.setAttribute("number-day", counterMonthDays.toString());
        entryDayInfoDiv.classList.add("show-entry-day_div");
        counterMonthDays += 1;

        spanEntryDay.addEventListener("click", entryDayEventClicked);
    }
    
    if((year === date.getFullYear()) && (month === date.getMonth() + 1)) {
        const entryDaysShowed: NodeListOf<HTMLDivElement> = document.querySelectorAll(".show-entry-day-calendar");
        entryDaysShowed[date.getDate() - 1].classList.add("bg-current-day")
    } else {
        const entryCurrentDay: (HTMLDivElement | null) = document.querySelector(".bg-current-day");
        if(entryCurrentDay !== null) entryCurrentDay.classList.remove("bg-current-day");
    }
    if(displayBurguerBtn !== "none") {
        const entryDaysDiv: NodeListOf<HTMLDivElement> = document.querySelectorAll(".entry-day-calendar_div");
        for (let i = daysOfMonth; i < 42; i++) {
            entryDaysDiv[i].classList.add("entry-day-display-none");
        }
    }
}
//------------------------------------------------------------------------------------------------------
function fillEntryDays(): void {
    const entryDaysDiv: NodeListOf<HTMLDivElement> = document.querySelectorAll(".entry-day-calendar_div");
        for (let i = 28; i < 42; i++) {
            entryDaysDiv[i].classList.remove("entry-day-display-none");
        }
}
//------------------------------------------------------------------------------------------------------
function topBarMonthClicked(this: HTMLInputElement): void {
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
function cleanDaysInCalendar(): void {
    const daysInCalendar: NodeListOf<HTMLDivElement> = document.querySelectorAll(".show-entry-day-calendar");
    const entryDayInfoP: NodeListOf<HTMLParagraphElement> = document.querySelectorAll(".show-entry-paragraph");
    const entryDayInfoSpan: NodeListOf<HTMLSpanElement> = document.querySelectorAll(".show-entry-day-span");
    const entryDayInfoDiv: NodeListOf<HTMLDivElement> = document.querySelectorAll(".show-entry-day_div");

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
//------------------------------------------------------------------------------------------------------
function entryDayEventClicked(this:HTMLSpanElement): void {
    let dayClicked: string | null = this.getAttribute("number-day");
    if(dayClicked !== null) localStorage.setItem("new-event-day", dayClicked);
    clearModal();
}


//------------------------------------------------------------------------------------------------------
/**
 * @return the return is a number that indicates the day of the week
 * goin from 0-6 being 0 sunday and 6 saturday
 */
function getDayOfWeekOfDayEntered(year: number, month: number, dayOfMonth: number): number {
    return new Date(`${year}-${month}-${dayOfMonth}`).getDay();
}

