import { getTotalDaysOfMonth } from "./utils.js";
export function setCalendar() {
    const burgerBtn = document.querySelector(".header-burger-history_btn");
    if (burgerBtn === null)
        return;
    let displayBurguerBtn = window.getComputedStyle(burgerBtn).display;
    (displayBurguerBtn === "none") ? setCalendarDesktop() : setCalendarSmallDevice();
}
function setCalendarDesktop() {
    const selectedYear = document.querySelector("#selected-year");
    const topBarMonthsInput = document.querySelectorAll(".topbar-month_input");
    const date = new Date();
    const currentYear = date.getFullYear();
    let month;
    let day;
    let dayOfWeek;
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
    day = 1;
    dayOfWeek = new Date(`${selectedYear.innerText}-${month.toString()}-${day.toString()}`).getDay();
    showDaysInCalendar(parseInt(selectedYear.innerText), month, dayOfWeek);
    topBarMonthsInput.forEach(topBarMonth => {
        topBarMonth.addEventListener("click", topBarMonthClicked);
    });
}
function setCalendarSmallDevice() {
    console.log("movil");
}
function showDaysInCalendar(year, month, dayOfWeek) {
    cleanDaysInCalendar();
    if (dayOfWeek === 0)
        dayOfWeek = 7;
    let daysOfMonth = getTotalDaysOfMonth(month, year);
    let counterMonthDays = 1;
    for (let i = dayOfWeek; i < (daysOfMonth + dayOfWeek); i++) {
        const containerEntryDay = document.querySelector(`#weekday-${i}`);
        const paragraphEntryDay = document.querySelector(`#p-day-${i}`);
        if (containerEntryDay === null)
            return;
        if (paragraphEntryDay === null)
            return;
        containerEntryDay.classList.add("show-entry-day-calendar");
        paragraphEntryDay.classList.add("show-entry-paragraph");
        paragraphEntryDay.innerText = counterMonthDays.toString();
        counterMonthDays += 1;
    }
}
function topBarMonthClicked() {
    this.getAttribute("number-month");
}
function cleanDaysInCalendar() {
    const daysInCalendar = document.querySelectorAll(".show-entry-day-calendar");
    const entryDayInfoP = document.querySelectorAll(".show-entry-paragraph");
    if (daysInCalendar.length > 0) {
        daysInCalendar.forEach((dayInCalendar, day) => {
            console.log(dayInCalendar);
            console.log(day);
            dayInCalendar.classList.remove("show-entry-day-calendar");
            entryDayInfoP[day].classList.remove("show-entry-paragraph");
        });
    }
}
function getDayOfWeekOfDayEntered(year, month, dayOfMonth) {
    return 1;
}
//# sourceMappingURL=setCalendar.js.map