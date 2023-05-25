

export function setHeader(): void {
    const body = document.querySelector("#body");

    /* Two buttons are created that do the function, the first one opens the event modal and the second one 
     makes a collapse in responsive mode to open the event history */
    const header = document.createElement("header");
    const newEventButton = document.createElement("button");
    const paragraphCurrentYear = document.createElement("p");
    const emptyDiv = document.createElement("div");
    const burguerButton = document.createElement("button");
    const burguerDiv = document.createElement("div");

    header.classList.add("header", "d-flex", "justify-content-between", "align-items-center");
    newEventButton.classList.add("ml-3", "btn", "new-event-button");
    paragraphCurrentYear.classList.add("class", "current-year");
    emptyDiv.classList.add("class", "empty-div");
    burguerButton.classList.add("class", "style-events-show");
    burguerDiv.classList.add("class", "container-span-show-button");

    newEventButton.setAttribute("data-bs-toggle", "modal");
    newEventButton.setAttribute("data-bs-target", "#modal-new-event");
    burguerButton.setAttribute("type", "button");
    burguerButton.setAttribute("data-bs-toggle", "collapse");
    burguerButton.setAttribute("data-bs-target", "#burguer-event");
    burguerButton.setAttribute("aria-expanded", "false");
    burguerButton.setAttribute("aria-controls", "burguer-event");

    newEventButton.innerText = "New Event";
    paragraphCurrentYear.innerText = "2023";

    // Loop to create span from array to contain of burguer button
    const spanArray = [1, 2, 3];

    spanArray.forEach((element) => {
        const spanBurguer = document.createElement("span");
        spanBurguer.classList.add("class", "span-show-button");
        burguerDiv.appendChild(spanBurguer);
    });

    body?.appendChild(header);
    header.appendChild(newEventButton),
        header.appendChild(paragraphCurrentYear);
    header.appendChild(emptyDiv);
    header.appendChild(burguerButton);
    burguerButton.appendChild(burguerDiv);

    //call to setMain
    setMain();
}
export function setMain(): void {
    //Crear main cosas que son staticas
    // const main =
    const mainSection = document.createElement("section");
    const topBarDiv = document.createElement("div");
    const monthsContainerDiv = document.createElement("div");
    const topBarNextGear = document.createElement("div");

    mainSection.classList.add("topbar-container", "d-flex", "flex-row", "flex-nowrap", "vw-100");
    topBarDiv.classList.add("topbar-previous-year", "d-flex", "justify-content-center", "align-items-center");
    monthsContainerDiv.classList.add("months-container", "d-flex", "flex-row");
    topBarNextGear.classList.add("topbar-next-year", "d-flex", "justify-content-center", "align-items-center");

    const arrayMonths = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    let divMonths = document.createElement("div");

    arrayMonths.forEach((months, i) => {

        const inputMonths = document.createElement("input");
        const labelMonths = document.createElement("label");
        divMonths.classList.add("topbar-month");
        inputMonths.setAttribute("id", `${i}`);
        inputMonths.setAttribute("class", "input-topbar-months");
        inputMonths.setAttribute("type", "radio");
        inputMonths.setAttribute("name", "months");
        inputMonths.setAttribute("value", `${i}`);
        labelMonths.setAttribute("for", `${i}`);
        labelMonths.setAttribute("class", "label-topbar-months");
        labelMonths.textContent = months;
        divMonths.appendChild(inputMonths);
        divMonths.append(labelMonths);
        monthsContainerDiv.appendChild(divMonths);

    })
    console.log(divMonths);

    mainSection.appendChild(topBarDiv);
    topBarDiv.appendChild(monthsContainerDiv);
    monthsContainerDiv.appendChild(divMonths);
    mainSection.appendChild(topBarNextGear);


}
setMain();


export function setTopBar(): void {

}

export function setCalendarContainer(): void {
    const body = document.querySelector("#body");

    const sectionDays = document.createElement("section");
    const asideHistory = document.createElement("aside");
    const titleHistory = document.createElement("h4");
    const paragraphHistory = document.createElement("p");
    const asideDays = document.createElement("aside");
    const sectionCardsDays = document.createElement("section");

    sectionDays.classList.add("calendar-container");
    asideHistory.classList.add("events-history-container");
    titleHistory.classList.add("history-events-title", "text-center", "p-3");
    paragraphHistory.classList.add("text-center");
    asideDays.classList.add("days-of-week");
    sectionCardsDays.classList.add("days-month-container");


    asideHistory.setAttribute("id", "burguer-event");

    titleHistory.innerText = "HISTORY";
    paragraphHistory.innerText = "Submit project - 28/05"// esto se cambia


    // Loop to create days elemnts to the top of calendar container
    const arrayDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    arrayDays.forEach((element, i) => {
        const h4 = document.createElement("h4");
        h4.classList.add("days-of-week");
        h4.innerText = `${i}`;
        asideDays.appendChild(h4);
    });

    /* Loop for the cards contain
    const cardDate:any = [];// esto se cambia

    cardDate.forEach(()=> {
        const  cardDayDiv = document.createElement("div");
    const numberParagraph = document.createElement("p");
    const eventParagraph = document.createElement("p");
    cardDayDiv.classList.add("day-number-calendar");
    numberParagraph.classList.add("add-event-calendar");
    eventParagraph.classList.add("entry-day-calendar");
    numberParagraph.innerText = "1";// esto se cambia
    eventParagraph.innerText = "+";// esto se cambia
    sectionCardsDays.appendChild(cardDate);
    })*/

    body?.appendChild(sectionDays);
    sectionDays.appendChild(asideHistory);
    asideHistory.appendChild(titleHistory);
    asideHistory.appendChild(paragraphHistory);
    body?.appendChild(asideDays);
    body?.appendChild(sectionCardsDays);
}
