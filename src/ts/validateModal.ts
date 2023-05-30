import { Event } from "./interface.js";
import { EventType, ReminderTime } from "./interface.js";
import { getFormattedDate } from "./utils.js";

/**
 * This function is called from the script.ts and it is responsible
 * for the validation of the modal that appears when the new event button is clicked.
 * It adds eventListeners to the different inputs.
 * @returns nothing
 */
export function checkModalValidity(): void {

    const modalTitleEvent: (HTMLInputElement | null) = document.querySelector("#title-event");
    const modalInitialDate: (HTMLInputElement | null) = document.querySelector("#init-date");
    const modalInitialTime: (HTMLInputElement | null) = document.querySelector("#init-time");
    const modalCheckEndDate: (HTMLInputElement | null) = document.querySelector("#check-end-date");
    const modalCheckReminderEvent: (HTMLInputElement | null) = document.querySelector("#check-reminder-event");
    const modalBtnSave: (HTMLButtonElement | null) = document.querySelector(".modal-save_btn");
    const modalSection: (HTMLDivElement | null) = document.querySelector("#modal-new-event");
    const headerNewEventBtn: (HTMLButtonElement | null) = document.querySelector("#header-new-event_btn");
    const textAreaModal: (HTMLTextAreaElement | null) = document.querySelector("#text-area-modal");

    if (modalTitleEvent === null) return;
    if (modalInitialDate === null) return;
    if (modalInitialTime === null) return;
    if (modalCheckEndDate === null) return;
    if (modalCheckReminderEvent === null) return;
    if (modalBtnSave === null) return;
    if (modalSection === null) return;
    if (headerNewEventBtn === null) return;
    if (textAreaModal === null) return;

    //Set default value for initial date and time
    modalInitialDate.value = getCurrentFormattedDate();
    modalInitialTime.value = getCurrentFormattedTime();

    modalTitleEvent.addEventListener("focusout", checkModalInputValidity);
    modalInitialDate.addEventListener("focusout", checkModalInputValidity);
    modalInitialTime.addEventListener("focusout", checkModalInputValidity);
    textAreaModal.addEventListener("focusout", checkModalTextAreaValidity);

    modalCheckEndDate.addEventListener("change", checkboxChecked);
    modalCheckReminderEvent.addEventListener("change", checkboxChecked);

    modalBtnSave.addEventListener("click", saveModalContent);
    headerNewEventBtn.addEventListener("click", newEventBtnClicked);

}

//------------------------------------------------------------------------------------------------------------
/**
 * @param receives an input element that has had the event of focusout.
 * This function will put the border on red if it is not correct
 * and depending on which input has been clicked if it needs further validation it will
 * redirect it to another more specific validation function
 */
function checkModalInputValidity(this: HTMLInputElement): void {
    //Para el error llamar una función que le pasamos el mensaje y el elemento.

    if (this.value.trim() === "") {
        this.value = ""; //In the case of the date and clock input
        this.classList.add("invalid-input-modal");
    }
    else if (this.getAttribute("id") === "title-event" && this.value.length > 60) { //To check title validity 
        this.value = "";
        this.classList.add("invalid-input-modal");
    }
    else {
        this.classList.remove("invalid-input-modal");
    }

    let inputID: (string | null) = this.getAttribute("id");
    if (inputID === null) return;
    switch (inputID) {
        case "init-time": checkValidInitialTime();
        case "init-date": checkValidInitialDate();
        case "type-of-time": checkValidTimeSelect();
    }

    if (["init-time", "end-time"].indexOf(inputID) !== -1) checkValidEndTime();
    if (["init-time", "init-date", "end-date", "end-time"].indexOf(inputID) !== -1) checkReminderValidity();
    if (["init-date", "end-date"].indexOf(inputID) !== -1) checkValidEndDate();
}

//------------------------------------------------------------------------------------------------------------
/**
 * @param receives an input element of checkbox type that has been clicked.
 * It is responsible for showing parts of the modal that are hidden and call the
 * respective function to make a more specific validation of tha specific part.
 */
function checkboxChecked(this: HTMLInputElement): void {
    const endDateContainerDiv: (HTMLDivElement | null) = document.querySelector("#end-date-container");
    const reminderContainerDiv: (HTMLDivElement | null) = document.querySelector("#reminder-container");
    if (endDateContainerDiv === null) return;
    if (reminderContainerDiv === null) return;
    if (this.id === "check-end-date") {
        endDateContainerDiv.classList.toggle("modal-display-none");
        endDateContainerDiv.classList.toggle("d-flex");
        if (!endDateContainerDiv.classList.contains("modal-display-none")) checkEndDateValidity();

    } else {
        reminderContainerDiv.classList.toggle("modal-display-none");
        reminderContainerDiv.classList.toggle("d-flex");
        if (!reminderContainerDiv.classList.contains("modal-display-none")) checkReminderValidity();
    }
}
//------------------------------------------------------------------------------------------------------------
/**
 * This function checks when focusing out from the initial time.
 * if no initial time has been set, then the default is the currentTime
 */
function checkValidInitialTime() {
    const modalInitialTime: (HTMLInputElement | null) = document.querySelector("#init-time");
    if (modalInitialTime === null) return;
    const date: Date = new Date();

    if (modalInitialTime.value.trim() === "") {
        modalInitialTime.setAttribute("error-init-time", "Not correct");
        modalInitialTime.value = getCurrentFormattedTime();
    } else {
        modalInitialTime.setAttribute("error-init-time", "");
    }
}
//------------------------------------------------------------------------------------------------------------
/**
 * This function checks when focusing out from the initial time.
 * if no initial time has been set, then the default is the currentTime
 */
function checkValidInitialDate() {
    const modalInitialDate: (HTMLInputElement | null) = document.querySelector("#init-date");
    if (modalInitialDate === null) return;
    const date: Date = new Date();

    if (modalInitialDate.value.trim() === "" || modalInitialDate.value.length > 10) {
        modalInitialDate.setAttribute("error-init-date", "Invalid date");
        modalInitialDate.classList.add("invalid-input-modal");
        setInitialDate();
    } else {
        modalInitialDate.setAttribute("error-init-date", "");
    }
}
//------------------------------------------------------------------------------------------------------------
/**
 * This function does not receive or return anything but puts an eventListener to both inputs inside
 * the end Time container div 
 */
function checkEndDateValidity(): void {
    const endDateInput: (HTMLInputElement | null) = document.querySelector("#end-date");
    const endTimeInput: (HTMLInputElement | null) = document.querySelector("#end-time");
    if (endDateInput === null) return;
    if (endTimeInput === null) return;

    endTimeInput.disabled = true;
    endTimeInput.value = "";
    endDateInput.value = "";
    endDateInput.classList.remove("invalid-input-modal");

    endDateInput.addEventListener("focusout", checkModalInputValidity);
    endTimeInput.addEventListener("focusout", checkModalInputValidity);
}
//------------------------------------------------------------------------------------------------------------
/**
 * Thi cuntion checks if the end date entered is valid or not.
 * It puts the border on red if needed. If the end date is before the
 * initial date or the initial date has not been entered
 */
function checkValidEndDate(): void {
    const endDateInput: (HTMLInputElement | null) = document.querySelector("#end-date");
    const endTimeInput: (HTMLInputElement | null) = document.querySelector("#end-time");
    const modalInitialDate: (HTMLInputElement | null) = document.querySelector("#init-date");
    if (endDateInput === null) return;
    if (modalInitialDate === null) return;
    if (endTimeInput === null) return;

    if (endDateInput.value.trim() !== "") {
        if ((checkLastDate(endDateInput.value, modalInitialDate.value) || endDateInput.value === modalInitialDate.value) &&
            endDateInput.value.length <= 10) {
            endDateInput.classList.remove("invalid-input-modal");
            endTimeInput.disabled = false;
            checkValidEndTime();
        } else {
            endDateInput.value = "";
            endDateInput.classList.add("invalid-input-modal");
            endTimeInput.disabled = true;
            endTimeInput.value = "";
        }
    } else {
        endDateInput.value = "";
        endDateInput.classList.add("invalid-input-modal");
        endTimeInput.disabled = true;
        endTimeInput.value = "";
    }
}

//------------------------------------------------------------------------------------------------------------
/**
 * This function checks that the time in which the event ends is valid or not by
 * checking the end Date, initial date and initial time so that we know if an end time 
 * can be entered or not.
 */
function checkValidEndTime() {
    const endDateInput: (HTMLInputElement | null) = document.querySelector("#end-date");
    const modalInitialDate: (HTMLInputElement | null) = document.querySelector("#init-date");
    const endTimeInput: (HTMLInputElement | null) = document.querySelector("#end-time");
    const modalInitialTime: (HTMLInputElement | null) = document.querySelector("#init-time");
    if (endDateInput === null) return;
    if (modalInitialDate === null) return;
    if (endTimeInput === null) return;
    if (modalInitialTime === null) return;
    endTimeInput.classList.remove("invalid-input-modal");

    if (endTimeInput.value.trim() !== "" && endDateInput.value === modalInitialDate.value) {
        if (!checkLastTime(endTimeInput.value, modalInitialTime.value) || endTimeInput.value === modalInitialTime.value) {
            endTimeInput.classList.add("invalid-input-modal");
            endTimeInput.value = "";
        }
    }
}

//------------------------------------------------------------------------------------------------------------
/**
 * 
 * @param time1 hours:mins string
 * @param time2 hours:mins string
 * @returns true if time1 is bigger and after time2
 */
function checkLastTime(time1: string, time2: string): boolean {

    let arrayTime1: string[] = time1.split(":");
    let arrayTime2: string[] = time2.split(":");

    let time1Hour: number = parseInt(arrayTime1[0]), time1Mins: number = parseInt(arrayTime1[1]);
    let time2Hour: number = parseInt(arrayTime2[0]), time2Mins: number = parseInt(arrayTime2[1]);

    let time1Bigger: boolean = false;

    if (time1Hour > time2Hour) time1Bigger = true;
    else if (time1Hour < time2Hour) time1Bigger = false;
    else {
        if (time1Mins > time2Mins) time1Bigger = true;
        else time1Bigger = false;
    }

    return time1Bigger;
}

//------------------------------------------------------------------------------------------------------------
/**
 * 
 * @param date1 date string "year-month-day"
 * @param date2 date string "year-month-day"
 * @returns true if date1 > date2
 */
function checkLastDate(date1: string, date2: string): boolean {

    let arrayDate1: string[] = date1.split("-");
    let arrayDate2: string[] = date2.split("-");

    let date1Day: number = parseInt(arrayDate1[2]), date1Month: number = parseInt(arrayDate1[1]), date1Year: number = parseInt(arrayDate1[0]);
    let date2Day: number = parseInt(arrayDate2[2]), date2Month: number = parseInt(arrayDate2[1]), date2Year: number = parseInt(arrayDate2[0]);

    let date1Bigger: boolean = false;

    if (date1Year > date2Year) date1Bigger = true;
    else if (date1Year < date2Year) date1Bigger = false;
    else {
        if (date1Month > date2Month) date1Bigger = true;
        else if (date1Month < date2Month) date1Bigger = false;
        else {
            if (date1Day > date2Day) date1Bigger = true;
            else if (date1Day < date2Day) date1Bigger = false;
        }
    }
    return date1Bigger;
}
//------------------------------------------------------------------------------------------------------------
/**
 * does not receive or return anything, but it is responsible for the validity of the part of the modal that
 * sets a reminder for that event.
 */

function checkReminderValidity(): void {
    const typeOfTime: (HTMLSelectElement | null) = document.querySelector("#type-of-time");
    const initDateInput: (HTMLInputElement | null) = document.querySelector("#init-date");
    const initTimeInput: (HTMLInputElement | null) = document.querySelector("#init-time");
    if (initDateInput === null) return;
    if (initTimeInput === null) return;
    if (typeOfTime === null) return;


    typeOfTime.classList.remove("invalid-input-modal");

    let currentDate: string = getCurrentFormattedDate();
    let currentTime: string = getCurrentFormattedTime();

    enableTimeSelect();

    //If current date is NOT bigger than initial date
    if (!checkLastDate(currentDate, initDateInput.value)) {

        if (currentDate === initDateInput.value) {
            //If the current date is equal to the initial date
            //then check the time

            if (!checkLastTime(currentTime, initTimeInput.value)) {
                //if the currentTime is NOT bigger than the initialTime 

                if (currentTime === initTimeInput.value) {
                    //If currentTime is equal to initial date

                    //Disable select options
                    disableTimeSelectOptions();

                } else {
                    //If current time smaller than initial date

                    let minutesDifference: number = getTotalMinutes(initTimeInput.value, currentTime);
                    if (minutesDifference < 5) {
                        typeOfTime.options[1].disabled = true;
                    } if (minutesDifference < 10) {
                        typeOfTime.options[2].disabled = true;
                    } if (minutesDifference < 15) {
                        typeOfTime.options[3].disabled = true;
                    } if (minutesDifference < 30) {
                        typeOfTime.options[4].disabled = true;
                    } if (minutesDifference < 60) {
                        typeOfTime.options[5].disabled = true;
                    }
                }

            } else {
                //If the current time is bigger than the end time, then 
                //disable the select since it can not be entered

                typeOfTime.disabled = true;
                typeOfTime.value = "default";
            }

        } else {
            //If not equal, then it is smaller
            //When the currentDate is smaller than the initial date, then enable and give it an 
            //eventListener

            typeOfTime.disabled = false;
            typeOfTime.addEventListener("focusout", checkModalInputValidity);
        }

    } else {
        //If the current date IS BIGGER than the initial date, just disable it
        typeOfTime.disabled = true;
        typeOfTime.value = "default";
    }

}


//------------------------------------------------------------------------------------------------------------
/**
 * This function does not receive or return anything but checks that a type of time has been entered if the 
 * reminder part has been clicked.
 */

function checkValidTimeSelect(): void {
    const typeOfTime: (HTMLSelectElement | null) = document.querySelector("#type-of-time");

    if (typeOfTime === null) return;

    if (typeOfTime.value === "default") {
        typeOfTime.classList.add("invalid-input-modal");
    } else {
        typeOfTime.classList.remove("invalid-input-modal");
    }
}
//------------------------------------------------------------------------------------------------------------
/**
 * Does not receive or return anything, but is responsible for the validation of
 * the textarea inside the set Reminder part of the modal
 * 
 */

function checkModalTextAreaValidity(): void {
    const textAreaModal: (HTMLTextAreaElement | null) = document.querySelector("#text-area-modal");

    if (textAreaModal === null) return;

    if (textAreaModal.value.length > 500) {
        textAreaModal.classList.add("invalid-input-modal");
    } else textAreaModal.classList.remove("invalid-input-modal");
}

//------------------------------------------------------------------------------------------------------------
/**
 * @param time1 hour:minutes PRE
 * @param time2 hour:minutes PRE
 * PRE: time1 has to be bigger (>) than time 2
 * @return returns total minutes between those 2 times
 */
function getTotalMinutes(time1: string, time2: string): number {
    let arrTime1: string[] = time1.split(":");
    let arrTime2: string[] = time2.split(":");
    let totalMinsTime1: number = (parseInt(arrTime1[0]) * 60) + parseInt(arrTime1[1]);
    let totalMinsTime2: number = (parseInt(arrTime2[0]) * 60) + parseInt(arrTime2[1]);

    return totalMinsTime1 - totalMinsTime2;
}
//------------------------------------------------------------------------------------------------------------
/**
 * Does not return or receive anything, just enables the time select
 * and every option
 */
function enableTimeSelect() {
    const typeOfTime: (HTMLSelectElement | null) = document.querySelector("#type-of-time");
    if (typeOfTime === null) return;
    typeOfTime.disabled = false;
    typeOfTime.value = "default";
    let options: Array<HTMLOptionElement> = Array.from(typeOfTime.children) as Array<HTMLOptionElement>;
    options.forEach(option => {
        option.disabled = false;
    })
}
//------------------------------------------------------------------------------------------------------------
/**
 * Does not return or receive anything, just disables the time select options
 */
function disableTimeSelectOptions() {
    const typeOfTime: (HTMLSelectElement | null) = document.querySelector("#type-of-time");
    if (typeOfTime === null) return;
    typeOfTime.disabled = false;
    typeOfTime.value = "default";
    let options: Array<HTMLOptionElement> = Array.from(typeOfTime.children) as Array<HTMLOptionElement>;
    options.forEach(option => {
        option.disabled = true;
    })
}
//------------------------------------------------------------------------------------------------------------
/**
 * If the current date the month is less than 10, it will be 1, 2, 3
 * However, for some functions we want it to be 01, 02, 03..
 * the same happens for the days.
 * This functions solves that and returns the correct date if needed.
 * @return returns current formatted date
 */
export function getCurrentFormattedDate(): string {
    let date: Date = new Date();
    let actualMonth: string;
    let actualDay: string;
    if ((date.getMonth() + 1) < 10) {
        actualMonth = `0${date.getMonth() + 1}`;
    } else {
        actualMonth = `${date.getMonth() + 1}`;
    }
    if ((date.getDate()) < 10) {
        actualDay = `0${date.getDate()}`;
    } else {
        actualDay = `${date.getDate()}`;
    }
    let currentDate: string = `${date.getFullYear()}-${actualMonth}-${actualDay}`;

    return currentDate;
}
//------------------------------------------------------------------------------------------------------------
/**
 * If the current time the hour or minute is less than 10, it will be 1, 2, 3
 * However, for some functions we want it to be 01, 02, 03..
 * This functions solves that and returns the correct date if needed.
 * @return returns current formatted date
 */
function getCurrentFormattedTime(): string {
    let date: Date = new Date();
    let actualHour: string;
    let actualMinutes: string;
    if (date.getHours() < 10) {
        actualHour = `0${date.getHours()}`;
    } else {
        actualHour = `${date.getHours()}`;
    }
    if ((date.getMinutes()) < 10) {
        actualMinutes = `0${date.getMinutes()}`;
    } else {
        actualMinutes = `${date.getMinutes()}`;
    }
    let currentTime: string = `${actualHour}:${actualMinutes}`;

    return currentTime;
}
//------------------------------------------------------------------------------------------------------------
function newEventBtnClicked(){
    localStorage.setItem("new-event-day", "none");
    clearModal();
}
//------------------------------------------------------------------------------------------------------------
/**
 * This function clears the inputs and select inside the new event modal
 */
export function clearModal() {
    const modalTitleEvent: (HTMLInputElement | null) = document.querySelector("#title-event");
    const modalInitialDate: (HTMLInputElement | null) = document.querySelector("#init-date");
    const modalInitialTime: (HTMLInputElement | null) = document.querySelector("#init-time");
    const modalCheckEndDate: (HTMLInputElement | null) = document.querySelector("#check-end-date");
    const modalCheckReminderEvent: (HTMLInputElement | null) = document.querySelector("#check-reminder-event");
    const endDateInput: (HTMLInputElement | null) = document.querySelector("#end-date");
    const endTimeInput: (HTMLInputElement | null) = document.querySelector("#end-time");
    const textAreaDescription: (HTMLTextAreaElement | null) = document.querySelector("#text-area-modal");
    const typeEventSelect: (HTMLSelectElement | null) = document.querySelector("#type-of-date");
    const endDateContainerDiv: (HTMLDivElement | null) = document.querySelector("#end-date-container");
    const reminderContainerDiv: (HTMLDivElement | null) = document.querySelector("#reminder-container");
    if (endDateContainerDiv === null) return;
    if (reminderContainerDiv === null) return;
    if (modalTitleEvent === null) return;
    if (modalInitialDate === null) return;
    if (modalInitialTime === null) return;
    if (modalCheckEndDate === null) return;
    if (modalCheckReminderEvent === null) return;
    if (endDateInput === null) return;
    if (endTimeInput === null) return;
    if (textAreaDescription === null) return;
    if (typeEventSelect === null) return;
    modalTitleEvent.value = "", endDateInput.value = "", endTimeInput.value = "", textAreaDescription.value = "";
    setInitialDate();
    
    modalInitialTime.value = getCurrentFormattedTime();
    modalCheckEndDate.checked = false;
    endDateContainerDiv.classList.add("modal-display-none");
    endDateContainerDiv.classList.remove("d-flex");
    modalCheckReminderEvent.checked = false;
    reminderContainerDiv.classList.add("modal-display-none");
    reminderContainerDiv.classList.remove("d-flex");
    typeEventSelect.value = "default";
    if(modalInitialDate.classList.contains("invalid-input-modal")) modalInitialDate.classList.remove("invalid-input-modal");
    if(modalInitialTime.classList.contains("invalid-input-modal")) modalInitialTime.classList.remove("invalid-input-modal");
    modalInitialDate.setAttribute("error-init-date", "");
    modalInitialTime.setAttribute("error-init-time", "");
}
//------------------------------
function setInitialDate(){
    const modalInitialDate: (HTMLInputElement | null) = document.querySelector("#init-date");
    if(modalInitialDate === null) return;
    if(localStorage.getItem("new-event-day") === "none") modalInitialDate.value = getCurrentFormattedDate();
    else {
        let getYM: Array<number> | undefined = getYearMonthSelected();
        if (getYM === undefined) return;
        let year: number = getYM[0];
        let month: number = getYM[1];
        let getDay: string | null = localStorage.getItem("new-event-day");
        let day: number = 1;
        if(getDay !== null) day = parseInt(getDay);
        modalInitialDate.value = getFormattedDate(year, month, day);
    }
}
//------------------------------------------------------------------------------------------------------------
function getYearMonthSelected(): Array<number> | undefined{
    const yearSelected: (HTMLHeadingElement | null) = document.querySelector("#selected-year");
    const topBarMonths: NodeListOf<HTMLInputElement> = document.querySelectorAll(".topbar-month_input")
    if(yearSelected === null) return;
    if(topBarMonths === null) return;
    let month: number = 0;
    topBarMonths.forEach((topBarMonth: HTMLInputElement): void => {
        let numberMonth: string | null = topBarMonth.getAttribute("number-month");
        if(numberMonth === null) return;
        if(topBarMonth.checked) month = parseInt(numberMonth);
    })
    let year: number = parseInt(yearSelected.innerText);
    return [year, month];
}
//------------------------------------------------------------------------------------------------------------
/**
 * This function saves the information inside the modal if it is correct
 */
function saveModalContent(): void {
    const modalSaveBtn: (HTMLButtonElement | null) = document.querySelector(".modal-save_btn");
    const modalTitleEvent: (HTMLInputElement | null) = document.querySelector("#title-event");
    const modalInitialDate: (HTMLInputElement | null) = document.querySelector("#init-date");
    const modalInitialTime: (HTMLInputElement | null) = document.querySelector("#init-time");
    const modalCheckEndDate: (HTMLInputElement | null) = document.querySelector("#check-end-date");
    const modalCheckReminderEvent: (HTMLInputElement | null) = document.querySelector("#check-reminder-event");
    const endDateInput: (HTMLInputElement | null) = document.querySelector("#end-date");
    const endTimeInput: (HTMLInputElement | null) = document.querySelector("#end-time");
    const typeOfTime: (HTMLSelectElement | null) = document.querySelector("#type-of-time");
    const textAreaDescription: (HTMLTextAreaElement | null) = document.querySelector("#text-area-modal");
    const typeEventSelect: (HTMLSelectElement | null) = document.querySelector("#type-of-date");
    const modalBtnClose: (HTMLButtonElement | null) = document.querySelector(".btn-close");
    const modalBtnSave: (HTMLButtonElement | null) = document.querySelector(".modal-save_btn");
    const modalBtnCancel: (HTMLButtonElement | null) = document.querySelector(".modal-cancel_btn");
    const modalSection: (HTMLDivElement | null) = document.querySelector("#modal-new-event");
    const headerNewEventBtn: (HTMLButtonElement | null) = document.querySelector("#header-new-event_btn");


    if (modalSaveBtn === null) return;
    if (modalTitleEvent === null) return;
    if (modalInitialDate === null) return;
    if (modalInitialTime === null) return;
    if (modalCheckEndDate === null) return;
    if (modalCheckReminderEvent === null) return;
    if (endDateInput === null) return;
    if (endTimeInput === null) return;
    if (typeOfTime === null) return;
    if (textAreaDescription === null) return;
    if (typeEventSelect === null) return;
    if (modalBtnClose === null) return;
    if (modalBtnSave === null) return;
    if (modalBtnCancel === null) return;
    if (modalSection === null) return;
    if (headerNewEventBtn === null) return;


    //Check that everything has been entered right
    let rightData: boolean = true;

    //No need to see initial date and initial time, since they will always have a default value
    if (modalTitleEvent.value !== "") {
        if (modalCheckEndDate.checked) {
            if (endDateInput.value === "") {
                modalSaveBtn.setAttribute("error-save-modal", "please, check again end date");
                clearErrorMessage();
                rightData = false;
            }
        }
        if (modalCheckReminderEvent.checked) {
            if (!typeOfTime.disabled && !typeOfTime.options[1].disabled && typeOfTime.value === "default") {
                modalSaveBtn.setAttribute("error-save-modal", "please, check the reminder time");
                clearErrorMessage();
                rightData = false;
            }
        }
    } else {
        modalSaveBtn.setAttribute("error-save-modal", "please, check again the title");
        clearErrorMessage();
        rightData = false;
    }

    //If rightData variable is true, then we can proceed to save the event entered
    if (rightData) {

        let title: string = modalTitleEvent.value;
        let initialDate: Date = new Date(modalInitialDate.value);
        let initialTime: string = modalInitialTime.value;
        let isCheckedEndEvent: boolean = modalCheckEndDate.checked;
        let endDate: Date | "";
        if (endDateInput.value === "") endDate = "";
        else endDate = new Date(endDateInput.value);
        let endTime: string = endTimeInput.value;
        let isCheckedReminder: boolean = modalCheckReminderEvent.checked;
        let reminder: ReminderTime = typeOfTime.value as ReminderTime;
        let description: string = textAreaDescription.value;
        let eventType: EventType = typeEventSelect.value as EventType;
        let id: number = 0;

        let newEvent: Event = {
            id, title, initialDate, initialTime, isCheckedEndEvent, endDate, endTime,
            isCheckedReminder, reminder, description, eventType
        };

        if (localStorage.getItem("events") !== null) {
            let eventEntered: string | null = localStorage.getItem("events");
            if (eventEntered === null) return;
            let events: Array<Event> = JSON.parse(eventEntered);
            newEvent.id = events.length + 1;
            events.push(newEvent);
            localStorage.setItem("events", JSON.stringify(events));
        } else {
            newEvent.id = 1;
            localStorage.setItem("events", `[${JSON.stringify(newEvent)}]`);
        }
        successEventSaved();
    }
}
//------------------------------------------------------------------------------------------------------------
/**
 * 
 * This function clears the error message after 3 seconds
 */
function clearErrorMessage(): void {
    const modalSaveBtn: (HTMLButtonElement | null) = document.querySelector(".modal-save_btn");
    if (modalSaveBtn === null) return;
    setTimeout(() => {
        modalSaveBtn.setAttribute("error-save-modal", "");
    }, 3000);
}
//------------------------------------------------------------------------------------------------------------
/**
 * 
 * Called when the event has been successfully saved.
 * Shows message and calls the function to clear the modal
 */
function successEventSaved(): void {
    const modalContainerSection: (HTMLElement | null) = document.querySelector(".modal-container_section");
    const modalSaveBtn: (HTMLButtonElement | null) = document.querySelector(".modal-save_btn");
    if (modalContainerSection === null) return;
    if (modalSaveBtn === null) return;
    modalSaveBtn.classList.add("save-btn-color-success");
    modalSaveBtn.setAttribute("success-save-modal", "SUCCESSFULLY SAVED!");
    setTimeout(() => {
        modalSaveBtn.setAttribute("success-save-modal", "");
        modalSaveBtn.classList.remove("save-btn-success");
        clearModal();
    }, 2000)
}