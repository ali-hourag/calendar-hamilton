export function setCalendar() {
    const burgerBtn = document.querySelector(".header-burger-history_btn");
    if (burgerBtn === null)
        return;
    let displayBurguerBtn = window.getComputedStyle(burgerBtn).display;
    (displayBurguerBtn === "none") ? setCalendarDesktop() : setCalendarSmallDevice();
}
function setCalendarDesktop() {
    const selectedYear = document.querySelector("#selected-year");
    if (selectedYear === null)
        return;
    const date = new Date();
    const currentYear = date.getFullYear();
    let month;
    let day;
    let dayOfWeek;
    if (currentYear === parseInt(selectedYear.innerText)) {
        month = date.getMonth() + 1;
        day = date.getDate();
    }
    else {
        month = 1;
        day = 1;
    }
    dayOfWeek = new Date(`${selectedYear.innerText}-${month.toString()}-${day.toString()}`).getDay();
    showDaysInCalendar(parseInt(selectedYear.innerText), month, day, dayOfWeek);
}
function setCalendarSmallDevice() {
    console.log("movil");
}
function showDaysInCalendar(year, month, day, dayOfWeek) {
    if (dayOfWeek === 0)
        dayOfWeek = 7;
}
//# sourceMappingURL=setCalendar.js.map