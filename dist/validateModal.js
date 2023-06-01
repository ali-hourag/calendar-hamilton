import { setCalendar } from "./setCalendar.js";
import { getFormattedDate, getTotalMinutes, getCurrentFormattedDate, getCurrentFormattedTime } from "./utils.js";
import { setHistoryOfEvents, getYearMonthSelected } from "./functions.js";
import { checkReminders } from "./reminder.js";
export function checkModalValidity() {
    const modalTitleEvent = document.querySelector("#title-event");
    const modalInitialDate = document.querySelector("#init-date");
    const modalInitialTime = document.querySelector("#init-time");
    const modalCheckEndDate = document.querySelector("#check-end-date");
    const modalCheckReminderEvent = document.querySelector("#check-reminder-event");
    const modalBtnSave = document.querySelector(".modal-save_btn");
    const modalSection = document.querySelector("#modal-new-event");
    const headerNewEventBtn = document.querySelector("#header-new-event_btn");
    const textAreaModal = document.querySelector("#text-area-modal");
    if (modalTitleEvent === null)
        return;
    if (modalInitialDate === null)
        return;
    if (modalInitialTime === null)
        return;
    if (modalCheckEndDate === null)
        return;
    if (modalCheckReminderEvent === null)
        return;
    if (modalBtnSave === null)
        return;
    if (modalSection === null)
        return;
    if (headerNewEventBtn === null)
        return;
    if (textAreaModal === null)
        return;
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
function checkModalInputValidity() {
    if (this.value.trim() === "") {
        this.value = "";
        this.classList.add("invalid-input-modal");
    }
    else if (this.getAttribute("id") === "title-event" && this.value.length > 60) {
        this.value = "";
        this.classList.add("invalid-input-modal");
    }
    else {
        this.classList.remove("invalid-input-modal");
    }
    let inputID = this.getAttribute("id");
    if (inputID === null)
        return;
    switch (inputID) {
        case "init-time": checkValidInitialTime();
        case "init-date": checkValidInitialDate();
        case "type-of-time": checkValidTimeSelect();
    }
    if (["init-time", "end-time"].indexOf(inputID) !== -1)
        checkValidEndTime();
    if (["init-time", "init-date", "end-date", "end-time"].indexOf(inputID) !== -1)
        checkReminderValidity();
    if (["init-date", "end-date"].indexOf(inputID) !== -1)
        checkValidEndDate();
}
function checkboxChecked() {
    const endDateContainerDiv = document.querySelector("#end-date-container");
    const reminderContainerDiv = document.querySelector("#reminder-container");
    if (endDateContainerDiv === null)
        return;
    if (reminderContainerDiv === null)
        return;
    if (this.id === "check-end-date") {
        endDateContainerDiv.classList.toggle("modal-display-none");
        endDateContainerDiv.classList.toggle("d-flex");
        if (!endDateContainerDiv.classList.contains("modal-display-none"))
            checkEndDateValidity();
    }
    else {
        reminderContainerDiv.classList.toggle("modal-display-none");
        reminderContainerDiv.classList.toggle("d-flex");
        if (!reminderContainerDiv.classList.contains("modal-display-none"))
            checkReminderValidity();
    }
}
function checkValidInitialTime() {
    const modalInitialTime = document.querySelector("#init-time");
    if (modalInitialTime === null)
        return;
    const date = new Date();
    if (modalInitialTime.value.trim() === "") {
        modalInitialTime.setAttribute("error-init-time", "Not correct");
        modalInitialTime.value = getCurrentFormattedTime();
    }
    else {
        modalInitialTime.setAttribute("error-init-time", "");
    }
}
function setInitialDate() {
    const modalInitialDate = document.querySelector("#init-date");
    if (modalInitialDate === null)
        return;
    if (localStorage.getItem("new-event-day") === "none")
        modalInitialDate.value = getCurrentFormattedDate();
    else {
        let getYM = getYearMonthSelected();
        if (getYM === undefined)
            return;
        let year = getYM[0];
        let month = getYM[1];
        let getDay = localStorage.getItem("new-event-day");
        let day = 1;
        if (getDay !== null)
            day = parseInt(getDay);
        modalInitialDate.value = getFormattedDate(year, month, day);
    }
}
function checkValidInitialDate() {
    const modalInitialDate = document.querySelector("#init-date");
    if (modalInitialDate === null)
        return;
    const date = new Date();
    if (modalInitialDate.value.trim() === "" || modalInitialDate.value.length > 10) {
        modalInitialDate.setAttribute("error-init-date", "Invalid date");
        modalInitialDate.classList.add("invalid-input-modal");
        setInitialDate();
    }
    else {
        modalInitialDate.setAttribute("error-init-date", "");
    }
}
function checkEndDateValidity() {
    const endDateInput = document.querySelector("#end-date");
    const endTimeInput = document.querySelector("#end-time");
    if (endDateInput === null)
        return;
    if (endTimeInput === null)
        return;
    endTimeInput.disabled = true;
    endTimeInput.value = "";
    endDateInput.value = "";
    endDateInput.classList.remove("invalid-input-modal");
    endDateInput.addEventListener("focusout", checkModalInputValidity);
    endTimeInput.addEventListener("focusout", checkModalInputValidity);
}
function checkValidEndDate() {
    const endDateInput = document.querySelector("#end-date");
    const endTimeInput = document.querySelector("#end-time");
    const modalInitialDate = document.querySelector("#init-date");
    if (endDateInput === null)
        return;
    if (modalInitialDate === null)
        return;
    if (endTimeInput === null)
        return;
    if (endDateInput.value.trim() !== "") {
        if ((checkLastDate(endDateInput.value, modalInitialDate.value) || endDateInput.value === modalInitialDate.value) &&
            endDateInput.value.length <= 10) {
            endDateInput.classList.remove("invalid-input-modal");
            endTimeInput.disabled = false;
            checkValidEndTime();
        }
        else {
            endDateInput.value = "";
            endDateInput.classList.add("invalid-input-modal");
            endTimeInput.disabled = true;
            endTimeInput.value = "";
        }
    }
    else {
        endDateInput.value = "";
        endDateInput.classList.add("invalid-input-modal");
        endTimeInput.disabled = true;
        endTimeInput.value = "";
    }
}
function checkValidEndTime() {
    const endDateInput = document.querySelector("#end-date");
    const modalInitialDate = document.querySelector("#init-date");
    const endTimeInput = document.querySelector("#end-time");
    const modalInitialTime = document.querySelector("#init-time");
    if (endDateInput === null)
        return;
    if (modalInitialDate === null)
        return;
    if (endTimeInput === null)
        return;
    if (modalInitialTime === null)
        return;
    endTimeInput.classList.remove("invalid-input-modal");
    if (endTimeInput.value.trim() !== "" && endDateInput.value === modalInitialDate.value) {
        if (!checkLastTime(endTimeInput.value, modalInitialTime.value) || endTimeInput.value === modalInitialTime.value) {
            endTimeInput.classList.add("invalid-input-modal");
            endTimeInput.value = "";
        }
    }
}
export function checkLastTime(time1, time2) {
    let arrayTime1 = time1.split(":");
    let arrayTime2 = time2.split(":");
    let time1Hour = parseInt(arrayTime1[0]), time1Mins = parseInt(arrayTime1[1]);
    let time2Hour = parseInt(arrayTime2[0]), time2Mins = parseInt(arrayTime2[1]);
    let time1Bigger = false;
    if (time1Hour > time2Hour)
        time1Bigger = true;
    else if (time1Hour < time2Hour)
        time1Bigger = false;
    else {
        if (time1Mins > time2Mins)
            time1Bigger = true;
        else
            time1Bigger = false;
    }
    return time1Bigger;
}
export function checkLastDate(date1, date2) {
    let arrayDate1 = date1.split("-");
    let arrayDate2 = date2.split("-");
    let date1Day = parseInt(arrayDate1[2]), date1Month = parseInt(arrayDate1[1]), date1Year = parseInt(arrayDate1[0]);
    let date2Day = parseInt(arrayDate2[2]), date2Month = parseInt(arrayDate2[1]), date2Year = parseInt(arrayDate2[0]);
    let date1Bigger = false;
    if (date1Year > date2Year)
        date1Bigger = true;
    else if (date1Year < date2Year)
        date1Bigger = false;
    else {
        if (date1Month > date2Month)
            date1Bigger = true;
        else if (date1Month < date2Month)
            date1Bigger = false;
        else {
            if (date1Day > date2Day)
                date1Bigger = true;
            else if (date1Day < date2Day)
                date1Bigger = false;
        }
    }
    return date1Bigger;
}
function checkReminderValidity() {
    const typeOfTime = document.querySelector("#type-of-time");
    const initDateInput = document.querySelector("#init-date");
    const initTimeInput = document.querySelector("#init-time");
    if (initDateInput === null)
        return;
    if (initTimeInput === null)
        return;
    if (typeOfTime === null)
        return;
    typeOfTime.classList.remove("invalid-input-modal");
    let currentDate = getCurrentFormattedDate();
    let currentTime = getCurrentFormattedTime();
    enableTimeSelect();
    if (!checkLastDate(currentDate, initDateInput.value)) {
        if (currentDate === initDateInput.value) {
            if (!checkLastTime(currentTime, initTimeInput.value)) {
                if (currentTime === initTimeInput.value) {
                    disableTimeSelectOptions();
                }
                else {
                    let minutesDifference = getTotalMinutes(initTimeInput.value, currentTime);
                    if (minutesDifference < 5) {
                        typeOfTime.options[1].disabled = true;
                    }
                    if (minutesDifference < 10) {
                        typeOfTime.options[2].disabled = true;
                    }
                    if (minutesDifference < 15) {
                        typeOfTime.options[3].disabled = true;
                    }
                    if (minutesDifference < 30) {
                        typeOfTime.options[4].disabled = true;
                    }
                    if (minutesDifference < 60) {
                        typeOfTime.options[5].disabled = true;
                    }
                }
            }
            else {
                typeOfTime.disabled = true;
                typeOfTime.value = "default";
            }
        }
        else {
            typeOfTime.disabled = false;
            typeOfTime.addEventListener("focusout", checkModalInputValidity);
        }
    }
    else {
        typeOfTime.disabled = true;
        typeOfTime.value = "default";
    }
}
function checkValidTimeSelect() {
    const typeOfTime = document.querySelector("#type-of-time");
    if (typeOfTime === null)
        return;
    if (typeOfTime.value === "default") {
        typeOfTime.classList.add("invalid-input-modal");
    }
    else {
        typeOfTime.classList.remove("invalid-input-modal");
    }
}
function checkModalTextAreaValidity() {
    const textAreaModal = document.querySelector("#text-area-modal");
    if (textAreaModal === null)
        return;
    if (textAreaModal.value.length > 500) {
        textAreaModal.classList.add("invalid-input-modal");
    }
    else
        textAreaModal.classList.remove("invalid-input-modal");
}
function enableTimeSelect() {
    const typeOfTime = document.querySelector("#type-of-time");
    if (typeOfTime === null)
        return;
    typeOfTime.disabled = false;
    typeOfTime.value = "default";
    let options = Array.from(typeOfTime.children);
    options.forEach(option => {
        option.disabled = false;
    });
}
function disableTimeSelectOptions() {
    const typeOfTime = document.querySelector("#type-of-time");
    if (typeOfTime === null)
        return;
    typeOfTime.disabled = false;
    typeOfTime.value = "default";
    let options = Array.from(typeOfTime.children);
    options.forEach(option => {
        option.disabled = true;
    });
}
function newEventBtnClicked() {
    localStorage.setItem("new-event-day", "none");
    clearModal();
}
export function clearModal() {
    const modalTitleEvent = document.querySelector("#title-event");
    const modalInitialDate = document.querySelector("#init-date");
    const modalInitialTime = document.querySelector("#init-time");
    const modalCheckEndDate = document.querySelector("#check-end-date");
    const modalCheckReminderEvent = document.querySelector("#check-reminder-event");
    const endDateInput = document.querySelector("#end-date");
    const endTimeInput = document.querySelector("#end-time");
    const textAreaDescription = document.querySelector("#text-area-modal");
    const typeEventSelect = document.querySelector("#type-of-date");
    const endDateContainerDiv = document.querySelector("#end-date-container");
    const reminderContainerDiv = document.querySelector("#reminder-container");
    if (endDateContainerDiv === null)
        return;
    if (reminderContainerDiv === null)
        return;
    if (modalTitleEvent === null)
        return;
    if (modalInitialDate === null)
        return;
    if (modalInitialTime === null)
        return;
    if (modalCheckEndDate === null)
        return;
    if (modalCheckReminderEvent === null)
        return;
    if (endDateInput === null)
        return;
    if (endTimeInput === null)
        return;
    if (textAreaDescription === null)
        return;
    if (typeEventSelect === null)
        return;
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
    if (modalInitialDate.classList.contains("invalid-input-modal"))
        modalInitialDate.classList.remove("invalid-input-modal");
    if (modalInitialTime.classList.contains("invalid-input-modal"))
        modalInitialTime.classList.remove("invalid-input-modal");
    modalInitialDate.setAttribute("error-init-date", "");
    modalInitialTime.setAttribute("error-init-time", "");
}
function saveModalContent() {
    const modalSaveBtn = document.querySelector(".modal-save_btn");
    const modalTitleEvent = document.querySelector("#title-event");
    const modalInitialDate = document.querySelector("#init-date");
    const modalInitialTime = document.querySelector("#init-time");
    const modalCheckEndDate = document.querySelector("#check-end-date");
    const modalCheckReminderEvent = document.querySelector("#check-reminder-event");
    const endDateInput = document.querySelector("#end-date");
    const endTimeInput = document.querySelector("#end-time");
    const typeOfTime = document.querySelector("#type-of-time");
    const textAreaDescription = document.querySelector("#text-area-modal");
    const typeEventSelect = document.querySelector("#type-of-date");
    const modalBtnClose = document.querySelector(".btn-close");
    const modalBtnSave = document.querySelector(".modal-save_btn");
    const modalBtnCancel = document.querySelector(".modal-cancel_btn");
    const modalSection = document.querySelector("#modal-new-event");
    const headerNewEventBtn = document.querySelector("#header-new-event_btn");
    if (modalSaveBtn === null)
        return;
    if (modalTitleEvent === null)
        return;
    if (modalInitialDate === null)
        return;
    if (modalInitialTime === null)
        return;
    if (modalCheckEndDate === null)
        return;
    if (modalCheckReminderEvent === null)
        return;
    if (endDateInput === null)
        return;
    if (endTimeInput === null)
        return;
    if (typeOfTime === null)
        return;
    if (textAreaDescription === null)
        return;
    if (typeEventSelect === null)
        return;
    if (modalBtnClose === null)
        return;
    if (modalBtnSave === null)
        return;
    if (modalBtnCancel === null)
        return;
    if (modalSection === null)
        return;
    if (headerNewEventBtn === null)
        return;
    let rightData = true;
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
    }
    else {
        modalSaveBtn.setAttribute("error-save-modal", "please, check again the title");
        clearErrorMessage();
        rightData = false;
    }
    if (rightData) {
        let title = modalTitleEvent.value;
        let initialDate = new Date(modalInitialDate.value);
        let initialTime = modalInitialTime.value;
        let isCheckedEndEvent = modalCheckEndDate.checked;
        let endDate;
        if (endDateInput.value === "")
            endDate = "";
        else
            endDate = new Date(endDateInput.value);
        let endTime = endTimeInput.value;
        let isCheckedReminder = modalCheckReminderEvent.checked;
        let reminder = typeOfTime.value;
        let description = textAreaDescription.value;
        let eventType = typeEventSelect.value;
        let id = 0;
        let newEvent = {
            id, title, initialDate, initialTime, isCheckedEndEvent, endDate, endTime,
            isCheckedReminder, reminder, description, eventType
        };
        if (localStorage.getItem("events") !== null) {
            let eventEntered = localStorage.getItem("events");
            if (eventEntered === null)
                return;
            let events = JSON.parse(eventEntered);
            newEvent.id = events.length + 1;
            events.push(newEvent);
            localStorage.setItem("events", JSON.stringify(events));
        }
        else {
            newEvent.id = 1;
            localStorage.setItem("events", `[${JSON.stringify(newEvent)}]`);
        }
        successEventSaved();
        setEventAdded(initialDate.getFullYear(), initialDate.getMonth() + 1);
        setHistoryOfEvents();
        checkReminders();
    }
}
function setEventAdded(year, month) {
    const headerSelectedYear = document.querySelector("#selected-year");
    const topBarMonths = document.querySelectorAll(".topbar-month_input");
    if (headerSelectedYear === null)
        return;
    let monthChecked = 0;
    for (let i = 0; i < topBarMonths.length; i++) {
        if (topBarMonths[i].checked) {
            monthChecked = i + 1;
            i = topBarMonths.length;
        }
    }
    if (parseInt(headerSelectedYear.innerText) === year && monthChecked === month) {
        setCalendar();
    }
}
function clearErrorMessage() {
    const modalSaveBtn = document.querySelector(".modal-save_btn");
    if (modalSaveBtn === null)
        return;
    setTimeout(() => {
        modalSaveBtn.setAttribute("error-save-modal", "");
    }, 3000);
}
function successEventSaved() {
    const modalContainerSection = document.querySelector(".modal-container_section");
    const modalSaveBtn = document.querySelector(".modal-save_btn");
    if (modalContainerSection === null)
        return;
    if (modalSaveBtn === null)
        return;
    modalSaveBtn.classList.add("save-btn-color-success");
    modalSaveBtn.setAttribute("success-save-modal", "SUCCESSFULLY SAVED!");
    setTimeout(() => {
        modalSaveBtn.setAttribute("success-save-modal", "");
        modalSaveBtn.classList.remove("save-btn-color-success");
        clearModal();
    }, 2000);
}
//# sourceMappingURL=validateModal.js.map