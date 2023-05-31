import { sortEventsByDateTime } from "./setCalendar.js";
import { getFormattedDate } from "./utils.js";
export function setHistoryOfEvents() {
    let arrayEvents = sortEventsByDateTime();
    const historyDiv = document.querySelector(".history-events-container_div");
    const burgerBtn = document.querySelector(".header-burger-history_btn");
    if (arrayEvents === undefined)
        return;
    if (historyDiv === null)
        return;
    if (burgerBtn === null)
        return;
    historyDiv.replaceChildren();
    arrayEvents.forEach((event) => {
        const containerOfEvent = document.createElement("div");
        const titleEvent = document.createElement("h3");
        const dateEvent = document.createElement("p");
        containerOfEvent.classList.add("container-event-history_div");
        containerOfEvent.setAttribute("event-id", event.id.toString());
        containerOfEvent.setAttribute("data-bs-toggle", "modal");
        containerOfEvent.setAttribute("data-bs-target", "#modal-info-event");
        containerOfEvent.addEventListener("click", eventInfoClicked);
        let displayBurguerBtn = window.getComputedStyle(burgerBtn).display;
        if (event.title.length > 8 && displayBurguerBtn === "none")
            titleEvent.innerText = `${event.title.slice(0, 8)}..`;
        else
            titleEvent.innerText = event.title;
        let dateE = new Date(event.initialDate);
        dateEvent.innerText = `${dateE.getDate()}/${dateE.getMonth() + 1}/${dateE.getFullYear()}`;
        historyDiv.appendChild(containerOfEvent);
        containerOfEvent.appendChild(titleEvent);
        containerOfEvent.appendChild(dateEvent);
    });
}
export function eventInfoClicked() {
    const eventsItem = localStorage.getItem("events");
    const eventId = this.getAttribute("event-id");
    console.log(eventId);
    const titleEventInfoH2 = document.querySelector(".modal-info-title");
    const initialValuesP = document.querySelectorAll(".initial-values-p");
    const divEndValue = document.querySelector(".end-values");
    const divInfoReminder = document.querySelector(".info-reminder");
    const textAreaDescription = document.querySelector(".info-description-textarea");
    const eventTypeP = document.querySelector(".info-event-type");
    if (eventTypeP === null)
        return;
    if (textAreaDescription === null)
        return;
    if (eventId === null)
        return;
    if (eventsItem === null)
        return;
    if (titleEventInfoH2 === null)
        return;
    if (divEndValue === null)
        return;
    if (divInfoReminder === null)
        return;
    let events = JSON.parse(eventsItem);
    let eventClicked = events[parseInt(eventId) - 1];
    titleEventInfoH2.innerText = eventClicked.title;
    let date = new Date(eventClicked.initialDate);
    let dateEvent = getFormattedDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
    initialValuesP[1].innerText = `${dateEvent.split("-").reverse().join("/")} at ${eventClicked.initialTime}`;
    console.log(divEndValue);
    if (eventClicked.isCheckedEndEvent) {
        const endValuesP = document.querySelectorAll(".end-values-p");
        divEndValue.classList.remove("modal-display-none");
        let dateEnd = new Date(eventClicked.endDate);
        let dateEndEvent = getFormattedDate(dateEnd.getFullYear(), dateEnd.getMonth() + 1, dateEnd.getDate());
        endValuesP[1].innerText = `${dateEndEvent.split("-").reverse().join("/")}`;
        if (eventClicked.endTime !== "")
            endValuesP[1].innerText += ` at ${eventClicked.endTime}`;
    }
    else
        divEndValue.classList.add("modal-display-none");
    if (eventClicked.isCheckedReminder && eventClicked.reminder !== "default") {
        const reminderTimeP = document.querySelector(".info-reminder-p");
        if (reminderTimeP === null)
            return;
        divInfoReminder.classList.remove("modal-display-none");
        let reminderT = eventClicked.reminder;
        let reminderMinutes = 0;
        switch (reminderT) {
            case "five":
                reminderMinutes = 5;
                break;
            case "ten":
                reminderMinutes = 10;
                break;
            case "fifteen":
                reminderMinutes = 15;
                break;
            case "thirty":
                reminderMinutes = 30;
                break;
            case "one-hour":
                reminderMinutes = 60;
                break;
        }
        reminderTimeP.innerText = `Reminder set ${reminderMinutes} minutes before.`;
    }
    else
        divInfoReminder.classList.add("modal-display-none");
    if (eventClicked.description !== "") {
        textAreaDescription.innerText = eventClicked.description;
    }
    else
        textAreaDescription.innerText = "";
    if (eventClicked.eventType !== "default") {
        let eType = eventClicked.eventType;
        let typeEvent = "";
        switch (eType) {
            case "meeting":
                typeEvent = "Meeting";
                break;
            case "personal":
                typeEvent = "Personal";
                break;
            case "sports":
                typeEvent = "Sports";
                break;
            case "study":
                typeEvent = "Study";
                break;
        }
        eventTypeP.innerText = `Type of event: ${typeEvent}`;
    }
    else
        eventTypeP.innerText = "";
}
//# sourceMappingURL=functions.js.map