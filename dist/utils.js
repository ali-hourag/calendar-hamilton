export function checkModalValidity() {
    const modalTitleEvent = document.querySelector("#title-event");
    const modalInitialDate = document.querySelector("#init-date");
    const modalInitialTime = document.querySelector("#init-time");
    const modalForm = document.querySelector("#modal-form");
    const modalCheckEndDate = document.querySelector("#check-end-date");
    const modalCheckReminderEvent = document.querySelector("#check-reminder-event");
    if (modalTitleEvent === null)
        return;
    if (modalInitialDate === null)
        return;
    if (modalInitialTime === null)
        return;
    if (modalForm === null)
        return;
    if (modalCheckEndDate === null)
        return;
    if (modalCheckReminderEvent === null)
        return;
    modalTitleEvent.addEventListener("focusout", checkModalInputValidity);
    modalInitialDate.addEventListener("focusout", checkModalInputValidity);
    modalInitialTime.addEventListener("focusout", checkModalInputValidity);
    modalCheckEndDate.addEventListener("change", endDateChecked);
    modalCheckReminderEvent.addEventListener("change", endDateChecked);
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
    if (this.getAttribute("id") === "end-date")
        checkValidEndDate();
    else if (this.getAttribute("id") === "end-time")
        checkValidEndTime();
    if (this.getAttribute("id") === "type-of-time")
        checkValidTimeSelect();
}
function endDateChecked() {
    const endDateContainerDiv = document.querySelector("#end-date-container");
    const reminderContainerDiv = document.querySelector("#reminder-container");
    if (endDateContainerDiv === null)
        return;
    if (reminderContainerDiv === null)
        return;
    if (this.id === "check-end-date") {
        endDateContainerDiv.classList.toggle("modal-div");
        endDateContainerDiv.classList.toggle("d-flex");
        if (!endDateContainerDiv.classList.contains("modal-div"))
            checkEndDateValidity();
    }
    else {
        reminderContainerDiv.classList.toggle("modal-div");
        reminderContainerDiv.classList.toggle("d-flex");
        if (!reminderContainerDiv.classList.contains("modal-div"))
            checkReminderValidity();
    }
}
function checkReminderValidity() {
    const typeOfTime = document.querySelector("#type-of-time");
    const textAreaModal = document.querySelector("#text-area-modal");
    const typeOfDate = document.querySelector("#type-of-date");
    if (typeOfTime === null)
        return;
    if (textAreaModal === null)
        return;
    if (typeOfDate === null)
        return;
    typeOfTime.addEventListener("focusout", checkModalInputValidity);
    textAreaModal.addEventListener("focusout", checkModalTextAreaValidity);
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
    console.log(textAreaModal.value);
}
function checkValidTimeSelect() {
    const typeOfTime = document.querySelector("#type-of-time");
    if (typeOfTime === null)
        return;
    console.log(typeOfTime.value);
    if (typeOfTime.value === "default") {
        typeOfTime.classList.add("invalid-input-modal");
    }
    else {
        typeOfTime.classList.remove("invalid-input-modal");
    }
}
function checkEndDateValidity() {
    const endDateInput = document.querySelector("#end-date");
    const endTimeInput = document.querySelector("#end-time");
    if (endDateInput === null)
        return;
    if (endTimeInput === null)
        return;
    endDateInput.addEventListener("focusout", checkModalInputValidity);
    endTimeInput.addEventListener("focusout", checkModalInputValidity);
}
function checkValidEndDate() {
    const endDateInput = document.querySelector("#end-date");
    const modalInitialDate = document.querySelector("#init-date");
    if (endDateInput === null)
        return;
    if (modalInitialDate === null)
        return;
    if (modalInitialDate.value.trim() === "") {
        endDateInput.classList.add("invalid-input-modal");
        endDateInput.value = "";
    }
    else {
        if (endDateInput.value.trim() !== "") {
            if (checkLastDate(endDateInput.value, modalInitialDate.value) || endDateInput.value === modalInitialDate.value) {
                endDateInput.classList.remove("invalid-input-modal");
                checkValidEndTime();
            }
            else {
                endDateInput.value = "";
                endDateInput.classList.add("invalid-input-modal");
            }
        }
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
    if (endTimeInput.value.trim() !== "" && modalInitialTime.value.trim() !== ""
        && endDateInput.value === modalInitialDate.value) {
        if (!checkLastTime(endTimeInput.value, modalInitialTime.value) || endTimeInput.value === modalInitialTime.value) {
            endTimeInput.classList.add("invalid-input-modal");
            endTimeInput.value = "";
        }
    }
}
function checkLastTime(time1, time2) {
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
function checkLastDate(date1, date2) {
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
//# sourceMappingURL=utils.js.map