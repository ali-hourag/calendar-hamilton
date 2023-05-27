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
    modalInitialDate.value = getCurrentFormattedDate();
    modalInitialTime.value = getCurrentFormattedTime();
    modalTitleEvent.addEventListener("focusout", checkModalInputValidity);
    modalInitialDate.addEventListener("focusout", checkModalInputValidity);
    modalInitialTime.addEventListener("focusout", checkModalInputValidity);
    modalCheckEndDate.addEventListener("change", checkboxChecked);
    modalCheckReminderEvent.addEventListener("change", checkboxChecked);
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
function checkValidInitialDate() {
    const modalInitialDate = document.querySelector("#init-date");
    if (modalInitialDate === null)
        return;
    const date = new Date();
    if (modalInitialDate.value.trim() === "" || modalInitialDate.value.length > 10) {
        modalInitialDate.setAttribute("error-init-date", "Invalid date");
        modalInitialDate.classList.add("invalid-input-modal");
        modalInitialDate.value = getCurrentFormattedDate();
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
    console.log(endDateInput.value);
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
            endDateInput.classList.add("invalid-input-modal");
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
function checkReminderValidity() {
    const typeOfTime = document.querySelector("#type-of-time");
    const textAreaModal = document.querySelector("#text-area-modal");
    const typeOfDate = document.querySelector("#type-of-date");
    const initDateInput = document.querySelector("#init-date");
    const initTimeInput = document.querySelector("#init-time");
    if (initDateInput === null)
        return;
    if (initTimeInput === null)
        return;
    if (typeOfTime === null)
        return;
    if (textAreaModal === null)
        return;
    if (typeOfDate === null)
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
    textAreaModal.addEventListener("focusout", checkModalTextAreaValidity);
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
function getTotalMinutes(time1, time2) {
    let arrTime1 = time1.split(":");
    let arrTime2 = time2.split(":");
    let totalMinsTime1 = (parseInt(arrTime1[0]) * 60) + parseInt(arrTime1[1]);
    let totalMinsTime2 = (parseInt(arrTime2[0]) * 60) + parseInt(arrTime2[1]);
    return totalMinsTime1 - totalMinsTime2;
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
function getCurrentFormattedDate() {
    let date = new Date();
    let actualMonth;
    let actualDay;
    if ((date.getMonth() + 1) < 10) {
        actualMonth = `0${date.getMonth() + 1}`;
    }
    else {
        actualMonth = `${date.getMonth() + 1}`;
    }
    if ((date.getDate()) < 10) {
        actualDay = `0${date.getMonth()}`;
    }
    else {
        actualDay = `${date.getDate()}`;
    }
    let currentDate = `${date.getFullYear()}-${actualMonth}-${actualDay}`;
    return currentDate;
}
function getCurrentFormattedTime() {
    let date = new Date();
    let actualHour;
    let actualMinutes;
    if (date.getHours() < 10) {
        actualHour = `0${date.getHours()}`;
    }
    else {
        actualHour = `${date.getHours()}`;
    }
    if ((date.getMinutes()) < 10) {
        actualMinutes = `0${date.getMinutes()}`;
    }
    else {
        actualMinutes = `${date.getMinutes()}`;
    }
    let currentTime = `${actualHour}:${actualMinutes}`;
    return currentTime;
}
//# sourceMappingURL=validateModal.js.map