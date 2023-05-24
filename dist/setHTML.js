export function setHeader() {
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
}
export function setMain() {
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
    });
    console.log(divMonths);
    mainSection.appendChild(topBarDiv);
    topBarDiv.appendChild(monthsContainerDiv);
    monthsContainerDiv.appendChild(divMonths);
    mainSection.classList.add("topbar-container", "d-flex", "flex-row", "flex-nowrap", "vw-100");
    topBarDiv.classList.add("topbar-previous-year", "d-flex", "justify-content-center", "align-items-center");
    monthsContainerDiv.classList.add("months-container", "d-flex", "flex-row");
}
setMain();
export function setTopBar() {
}
export function setCalendarContainer() {
}
//# sourceMappingURL=setHTML.js.map