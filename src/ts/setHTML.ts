

export function setHeader(): void {
    // const header = document.

    const newEventButton = document.createElement("button");
    const paragraphCurrentYear = document.createElement("p");
    const emptyDiv = document.createElement("div");
    const burguerButton = document.createElement("button");
    const burguerDiv = document.createElement("div");

    newEventButton.classList.add("ml-3", "btn", "new-event-button");
    paragraphCurrentYear.classList.add('class', 'current-year');
    emptyDiv.classList.add('class', 'empty-div');
    burguerButton.classList.add('class', 'style-events-show');
    burguerDiv.setAttribute('class', 'container-span-show-button');


    newEventButton.setAttribute('data-bs-toggle', 'modal');
    newEventButton.setAttribute('data-bs-target', '#modal-new-event');
    burguerButton.setAttribute('type', 'button');
    burguerButton.setAttribute('data-bs-toggle', 'collapse');
    burguerButton.setAttribute('data-bs-target', '#burguer-event');
    burguerButton.setAttribute('aria-expanded', 'false');
    burguerButton.setAttribute('aria-controls', 'burguer-event');

    newEventButton.textContent = 'New Event';
    paragraphCurrentYear.textContent = '2023';

    for (let i = 0; i < 3; i++) {
        const spanShowButton = document.createElement('span');
        spanShowButton.classList.add('class', 'span-show-button');
        burguerDiv.appendChild(spanShowButton);
    }






    //llame a main
}
/*<header id="header" class="header d-flex justify-content-between align-items-center">
        <!-- Button trigger modal -->
        <button type="button" class="ml-3 btn new-event-button" data-bs-toggle="modal"
            data-bs-target="#modal-new-event">
            New Event
        </button>
        <p class="current-year" id="currentYear">2023</p>
        <div class="empty-div"></div>
        <!--EN RESPONSIVE PARA ENSEÑAR EL HISTORIAL DE EVENTOS-->
        <button class="style-events-show" type="button" data-bs-toggle="collapse" data-bs-target="#burguer-event"
            aria-expanded="false" aria-controls="burguer-event">
            <div class="container-span-show-button">
                <span class="span-show-button"></span>
                <span class="span-show-button"></span>
                <span class="span-show-button"></span>
            </div>
        </button>





    </header>*/
export function setMain(): void {
    //Crear main cosas que son staticas
// const main =
const mainSection = document.createElement("section");
const topBarDiv = document.createElement("div");
const monthsContainerDiv = document.createElement("div");


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
    inputMonths.setAttribute("class","input-topbar-months" );
    inputMonths.setAttribute("type", "radio");
    inputMonths.setAttribute("name", "months");
    inputMonths.setAttribute("value", `${i}`);
    labelMonths.setAttribute("for",`${i}`);
    labelMonths.setAttribute("class", "label-topbar-months" );
    labelMonths.textContent = months;
    divMonths.appendChild(inputMonths);
    divMonths.append(labelMonths);
    monthsContainerDiv.appendChild(divMonths);

})
console.log(divMonths);

mainSection.appendChild(topBarDiv);
topBarDiv.appendChild(monthsContainerDiv);
monthsContainerDiv.appendChild(divMonths);

mainSection.classList.add("topbar-container", "d-flex", "flex-row", "flex-nowrap", "vw-100");
topBarDiv.classList.add("topbar-previous-year", "d-flex", "justify-content-center", "align-items-center");
monthsContainerDiv.classList.add("months-container", "d-flex", "flex-row");

}
setMain();

export function setTopBar(): void {

}

export function setCalendarContainer(): void {

}