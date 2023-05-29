

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
    if (selectedYear === null) return;
    const date: Date = new Date();
    const currentYear: number = date.getFullYear();
    let month: number;
    let day: number;
    let dayOfWeek: number;
    if (currentYear === parseInt(selectedYear.innerText)) {
        month = date.getMonth()+ 1;
        day = date.getDate();
    } else {
        month = 1;
        day = 1;
    }
    dayOfWeek = new Date(`${selectedYear.innerText}-${month.toString()}-${day.toString()}`).getDay();
    showDaysInCalendar(parseInt(selectedYear.innerText), month, day, dayOfWeek);
}

function setCalendarSmallDevice(): void {
    console.log("movil");
}

function showDaysInCalendar(year: number, month: number, day: number, dayOfWeek: number): void {
    if(dayOfWeek === 0) dayOfWeek = 7;
    //for (let i = dayOfWeek, i > )
}


