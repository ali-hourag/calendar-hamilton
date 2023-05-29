import { getTotalDaysOfMonth } from "./utils.js";

export function setCalendar(): void {
    const burgerBtn: (HTMLButtonElement | null) = document.querySelector(".header-burger-history_btn");
    if (burgerBtn === null) return;

    let displayBurguerBtn: string = window.getComputedStyle(burgerBtn).display;
    (displayBurguerBtn === "none") ? setCalendarDesktop() : setCalendarSmallDevice();
}

//------------------------------------------------------------------------------------------------------
function setCalendarDesktop(): void {
    //ESTUDIAR SI ES EL MISMO AÑO!!! PARA PONER FECHA ACTUAL O EL AÑO EN ENERO DIA 1
    const selectedYear: (HTMLHeadingElement | null) = document.querySelector("#selected-year");
    const topBarMonthsInput: NodeListOf<HTMLInputElement> = document.querySelectorAll(".topbar-month_input");
    const date: Date = new Date();
    const currentYear: number = date.getFullYear();
    let month: number;
    let day: number;
    let dayOfWeek: number;
    if (selectedYear === null) return;
    if (currentYear === parseInt(selectedYear.innerText)) {
        month = date.getMonth() + 1;
        topBarMonthsInput[month - 1].checked = true;
    } else {
        month = 1;
        topBarMonthsInput[0].checked = true;
    }
    day = 1;
    dayOfWeek = new Date(`${selectedYear.innerText}-${month.toString()}-${day.toString()}`).getDay();

    showDaysInCalendar(parseInt(selectedYear.innerText), month, dayOfWeek);
    topBarMonthsInput.forEach(topBarMonth => {
        topBarMonth.addEventListener("click", topBarMonthClicked);
    })
}

function setCalendarSmallDevice(): void {
    console.log("movil");
}

function showDaysInCalendar(year: number, month: number, dayOfWeek: number): void {
    cleanDaysInCalendar();
    if (dayOfWeek === 0) dayOfWeek = 7;
    let daysOfMonth: number = getTotalDaysOfMonth(month, year);

    let counterMonthDays: number = 1;

    for (let i = dayOfWeek; i < (daysOfMonth + dayOfWeek); i++) {
        const containerEntryDay: (HTMLDivElement | null) = document.querySelector(`#weekday-${i}`);
        const paragraphEntryDay: (HTMLParagraphElement | null) = document.querySelector(`#p-day-${i}`);
        if (containerEntryDay === null) return;
        if(paragraphEntryDay === null) return;

        containerEntryDay.classList.add("show-entry-day-calendar");
        paragraphEntryDay.classList.add("show-entry-paragraph");
        paragraphEntryDay.innerText = counterMonthDays.toString();
        counterMonthDays += 1;
    }
}

function topBarMonthClicked(this: HTMLInputElement): void {
    this.getAttribute("number-month");
}

function cleanDaysInCalendar(): void {
    const daysInCalendar: NodeListOf<HTMLDivElement> = document.querySelectorAll(".show-entry-day-calendar");
    const entryDayInfoP: NodeListOf<HTMLParagraphElement> = document.querySelectorAll(".show-entry-paragraph");
    
    
   if(daysInCalendar.length > 0) {
    daysInCalendar.forEach((dayInCalendar, day)=> {
        console.log(dayInCalendar);
        console.log(day);
        dayInCalendar.classList.remove("show-entry-day-calendar");
        entryDayInfoP[day].classList.remove("show-entry-paragraph");
    })
   }
}


/**
 * @return the return is a number that indicates the day of the week
 * goin from 0-6 being 0 monday and 6 sunday
 */
function getDayOfWeekOfDayEntered(year: number, month: number, dayOfMonth: number): number {

    return 1;
}

