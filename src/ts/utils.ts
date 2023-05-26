/*Events details
Before the event is created, the required fields must be completed by the user. If they are not, the user cannot create that event
Title (max length 60 characters, required)✅
Initial Date with time (required)✅
Include a checkbox to add an optional end date (optional)✅
If it is checked, it will display a new input to add a date to save the end date of the event✅
This will create an end date for the event. The duration will be the time between the start date and the end date
Both dates should be storing the date and time
The date should be rendered in the local format of the user
A checkbox to set a reminder that let the user know when an event is happening.(optional)✅
If the checkbox is selected it must display a select element with the following options:
5 minutes before
10 minutes before
15 minutes before
30 minutes before
1 hour before
You must use the setInterval function to check every 10 seconds if the event has a reminder.
If the event has expired (if it has an end date or at the end of the day if not) you should show the event name with a different style. 
Event description (a text box with a max length of 500 characters, optional)✅
Type of event (select, required)
Meeting
Personal
Study
etc
Create a type/interface with all possible Event properties:
initialDate: Datetime
title: string
eventType: Create a type enum with the possible values.
…
*/

export function validateNewEvent(): void {

    

    const titleEvent: HTMLInputElement | null = document.querySelector("#title-event") as HTMLInputElement;
    const initDate: HTMLInputElement = document.querySelector("#init-date") as HTMLInputElement;
    const appTime: HTMLInputElement = document.querySelector("#appt-time") as HTMLInputElement;
    const modalForm: HTMLFormElement = document.querySelector("#modal-form") as HTMLFormElement;

    titleEvent.addEventListener("focusout", function () {

        if (titleEvent.value.length > 10) {
            titleEvent.setCustomValidity("The value cannot contain more than 60 characters.");
            titleEvent.reportValidity();
            return;
        } else if (titleEvent.value === "") {
            titleEvent.setCustomValidity("This field cannot be empty");
            titleEvent.reportValidity();
            return;
        } else {
            titleEvent.setCustomValidity("");
        }
    });

    initDate.addEventListener("focusout", function () {
        if (initDate.value === "") {
            initDate.setCustomValidity("This field cannot be empty");
            initDate.reportValidity();
            return;
        } else {
            initDate.setCustomValidity("");
        }
    });

    appTime.addEventListener("focusout", function () {
        if (appTime.value === "") {
            appTime.setCustomValidity("This field cannot be empty");
            appTime.reportValidity();
            return;
        } else {
            appTime.setCustomValidity("");
        }
    });

    modalForm.addEventListener("submit", function (event) {
        if (!titleEvent.value || !initDate.value || !appTime.value) {
            event.preventDefault();
            alert("All fields are required!");
        }
    });
    showOptionsEvent();
}
/*check-end-date */

function showOptionsEvent(): void {

    const checkEndDate: HTMLInputElement | null = document.querySelector("#check-end-date") as HTMLInputElement;
    const endDateSection: HTMLDivElement | null = document.querySelector("#end-date-container") as HTMLDivElement;
    const checkEndOfEvent: HTMLInputElement | null = document.querySelector("#check-end-of-event") as HTMLInputElement;
    const endTimeSection: HTMLDivElement | null = document.querySelector("#end-time-container") as HTMLDivElement;
    const typeOfTime: HTMLSelectElement = document.querySelector("#type-of-time") as HTMLSelectElement;
    const textAreaModal: HTMLTextAreaElement = document.querySelector("#text-area-modal") as HTMLTextAreaElement;
    const typeOfDate: HTMLSelectElement = document.querySelector("#type-of-date") as HTMLSelectElement;
    const modalForm: HTMLFormElement = document.querySelector("#modal-form") as HTMLFormElement;
    
    checkEndDate.addEventListener("click", function () {
        endDateSection.classList.toggle("modal-div");
        endDateSection.classList.toggle("d-flex");
    });

    checkEndOfEvent.addEventListener("click", function () {
        endTimeSection.classList.toggle("modal-div");
        endTimeSection.classList.toggle("d-flex");
    });

    typeOfTime.addEventListener("focusout", function () {
        if (typeOfTime.value === "") {
            typeOfTime.setCustomValidity("Choose time to remind");
            typeOfTime.reportValidity();
            return;
        } else {
            typeOfTime.setCustomValidity("");
        }
    });

    textAreaModal.addEventListener("focusout", function () {
        if (textAreaModal.value.length > 5) {
            textAreaModal.setCustomValidity("The value cannot contain more than 500 characters.");
            textAreaModal.reportValidity();
            return;
        } else {
            textAreaModal.setCustomValidity("");
        }
    });

    typeOfDate.addEventListener("focusout", function () {
        if (typeOfDate.value === "") {
            typeOfDate.setCustomValidity("Choose date to remind");
            typeOfDate.reportValidity();
            return;
        } else {
            typeOfDate.setCustomValidity("");
        }
    });
    
    modalForm.addEventListener("submit", function (event) {
        if (!typeOfTime|| !typeOfDate || !textAreaModal) {
            event.preventDefault();
            alert("All fields are required!");
        }
    });
}