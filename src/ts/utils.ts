// const date: Date = new Date();
// console.log(date.getHours() + ":" + date.getMinutes());
// console.log(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());
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
    const modalForm: (HTMLFormElement | null) = document.querySelector("#modal-form");
    const modalCheckEndDate: (HTMLInputElement | null) = document.querySelector("#check-end-date");
    const modalCheckReminderEvent: (HTMLInputElement | null) = document.querySelector("#check-reminder-event");
    const date: Date = new Date();



    if (modalTitleEvent === null) return;
    if (modalInitialDate === null) return;
    if (modalInitialTime === null) return;
    if (modalForm === null) return;
    if (modalCheckEndDate === null) return;
    if (modalCheckReminderEvent === null) return;

    //Set default value for initial date and time
    modalInitialDate.value = getCurrentFormattedDate();
    modalInitialTime.value = getCurrentFormattedTime();

    modalTitleEvent.addEventListener("focusout", checkModalInputValidity);
    modalInitialDate.addEventListener("focusout", checkModalInputValidity);
    modalInitialTime.addEventListener("focusout", checkModalInputValidity);

    modalCheckEndDate.addEventListener("change", endDateChecked);
    modalCheckReminderEvent.addEventListener("change", endDateChecked);

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

    //CHANGE THIS TO A SWITCH CASE!!!!!!!
    //and use a finally for the commmon things!!!!


    if (this.getAttribute("id") === "init-time") {
        checkValidInitialTime();
        checkValidEndTime();
        checkReminderValidity();
    }
    else if (this.getAttribute("id") === "init-date") {
        checkValidInitialDate();
        checkValidEndDate();
        checkReminderValidity();
    }
    else if (this.getAttribute("id") === "end-date") {
        checkValidEndDate();
        checkReminderValidity();
    }
    else if (this.getAttribute("id") === "end-time") {
        checkValidEndTime();
        checkReminderValidity();
    }
    else if (this.getAttribute("id") === "type-of-time") checkValidTimeSelect();
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
        modalInitialTime.value = getCurrentFormattedTime();
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
    if (modalInitialDate.value.trim() === "") {
        modalInitialDate.value = getCurrentFormattedDate();
    }
}
//------------------------------------------------------------------------------------------------------------
/**
 * @param receives an input element of checkbox type that has been clicked.
 * It is responsible for showing parts of the modal that are hidden and call the
 * respective function to make a more specific validation of tha specific part.
 */
function endDateChecked(this: HTMLInputElement): void {
    const endDateContainerDiv: (HTMLDivElement | null) = document.querySelector("#end-date-container");
    const reminderContainerDiv: (HTMLDivElement | null) = document.querySelector("#reminder-container");
    if (endDateContainerDiv === null) return;
    if (reminderContainerDiv === null) return;
    if (this.id === "check-end-date") {
        endDateContainerDiv.classList.toggle("modal-div");
        endDateContainerDiv.classList.toggle("d-flex");
        if (!endDateContainerDiv.classList.contains("modal-div")) checkEndDateValidity();

    } else {
        reminderContainerDiv.classList.toggle("modal-div");
        reminderContainerDiv.classList.toggle("d-flex");
        if (!reminderContainerDiv.classList.contains("modal-div")) checkReminderValidity();
    }
}
//------------------------------------------------------------------------------------------------------------
/**
 * does not receive or return anything, but it is responsible for the validity of the part of the modal that
 * sets a reminder for that event.
 */

function checkReminderValidity(): void {
    const typeOfTime: (HTMLSelectElement | null) = document.querySelector("#type-of-time");
    const textAreaModal: (HTMLTextAreaElement | null) = document.querySelector("#text-area-modal");
    const typeOfDate: (HTMLSelectElement | null) = document.querySelector("#type-of-date");
    const endDateInput: (HTMLInputElement | null) = document.querySelector("#end-date");
    const endTimeInput: (HTMLInputElement | null) = document.querySelector("#end-time");
    if (endDateInput === null) return;
    if (endTimeInput === null) return;
    if (typeOfTime === null) return;
    if (textAreaModal === null) return;
    if (typeOfDate === null) return;

    let currentDate: string = getCurrentFormattedDate();
    let currentTime: string = getCurrentFormattedTime();

    enableTimeSelect();


    if (endDateInput.value.trim() !== "") {

        if (!checkLastDate(currentDate, endDateInput.value)) {
            //Si son iguales, comparar las horas y pondremos algunas cosas en disabled 
            //dependiendo del tiempo podrá elegir algunas sí y otras no
            // typeOfTime.options[2].disabled = true;
            if (currentDate === endDateInput.value) {
                console.log("la fecha actual es igual bro, hay que ver klk");
                //If the current time is equal end time
                if (endTimeInput.value.trim() !== "") {
                    //If the currentTime is bigger than the endTime
                    if (!checkLastTime(currentTime, endTimeInput.value)) {
                        //if the currentTime is not bigger than the entTime 
                        console.log("im here");
                        typeOfTime.disabled = false;
                        let arrCurrentTime: Array<string> = currentTime.split(":");
                        let arrEndTimeInput: Array<string> = endTimeInput.value.split(":");
                        let cTimeHour: number = parseInt(arrCurrentTime[0]), cTimeMin: number = parseInt(arrCurrentTime[1]);
                        let eTHour: number = parseInt(arrEndTimeInput[0]), eTMin: number = parseInt(arrEndTimeInput[1]);
                        if (eTHour === cTimeHour) {

                            //if the endTime Hour is the same as the current Hour, then disable the 1 Hour option 
                            //and study how much time there is between them
                            if ((eTMin - cTimeMin) > 5) {
                                typeOfTime.options[1].disabled = true;
                            } if ((eTMin - cTimeMin) > 10) {
                                typeOfTime.options[2].disabled = true;
                            } if ((eTMin - cTimeMin) > 15) {
                                typeOfTime.options[3].disabled = true;
                            } if ((eTMin - cTimeMin) > 30) {
                                typeOfTime.options[4].disabled = true;
                            } if ((eTMin - cTimeMin) > 45) {
                                typeOfTime.options[6].disabled = true;
                            }

                        }
                    } else {
                        //If the current time is bigger than the end time, then 
                        //disable the select since it can not be entered
                        typeOfTime.disabled = true;
                        typeOfTime.value = "default";
                    }
                } else {
                    //Study what happens if the endTime input is not available
                    //See the initial time
                    const modalInitialTime: (HTMLInputElement | null) = document.querySelector("#init-time");
                    if (modalInitialTime === null) return;

                    if (!checkLastTime(currentTime, modalInitialTime.value)) {
                        //If the initial time is bigger than the current time
                        //Study which options are enabled
                        console.log("initial time bigger than current time and same date");
                        //Call to the getTotalMinutes();
                        let minutesDifference: number = getTotalMinutes(modalInitialTime.value, currentTime);
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


                    } else {
                        //If the currentTime is bigger than the initialTime
                        typeOfTime.disabled = true;
                        typeOfTime.value = "default";
                    }

                }

            } else {
                //When the currentDate is smaller than the end date, then enable and give it an 
                //eventListener
                console.log("la fecha actual es menor, hay que ver klk");
                typeOfTime.disabled = false;
                typeOfTime.addEventListener("focusout", checkModalInputValidity);
            }


        } else {
            //If the current date is bigger than the end date, just disable it
            typeOfTime.disabled = true;
            typeOfTime.value = "default";
            console.log("la fecha actual es mayor bro");
        }
    } else {
        //study what happens if the endInput value is not there
        //see the initial date and initial hour

    }


    textAreaModal.addEventListener("focusout", checkModalTextAreaValidity);
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
    let options: Array<HTMLOptionElement> = Array.from(typeOfTime.children) as Array<HTMLOptionElement>;
    options.forEach(option => {
        option.disabled = false;
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
function getCurrentFormattedDate(): string {
    let date: Date = new Date();
    let actualMonth: string;
    let actualDay: string;
    if ((date.getMonth() + 1) < 10) {
        actualMonth = `0${date.getMonth() + 1}`;
    } else {
        actualMonth = `${date.getMonth() + 1}`;
    }
    if ((date.getDate()) < 10) {
        actualDay = `0${date.getMonth()}`;
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
    console.log(textAreaModal.value)
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
 * This function does not receive or return anything but puts an eventListener to both inputs inside
 * the end Time container div 
 */
function checkEndDateValidity(): void {
    const endDateInput: (HTMLInputElement | null) = document.querySelector("#end-date");
    const endTimeInput: (HTMLInputElement | null) = document.querySelector("#end-time");
    if (endDateInput === null) return;
    if (endTimeInput === null) return;

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
    const modalInitialDate: (HTMLInputElement | null) = document.querySelector("#init-date");
    if (endDateInput === null) return;
    if (modalInitialDate === null) return;

    if (modalInitialDate.value.trim() === "") {
        endDateInput.classList.add("invalid-input-modal");
        endDateInput.value = "";
    } else {
        if (endDateInput.value.trim() !== "") {
            if (checkLastDate(endDateInput.value, modalInitialDate.value) || endDateInput.value === modalInitialDate.value) {
                endDateInput.classList.remove("invalid-input-modal");
                checkValidEndTime();
            } else {
                endDateInput.value = "";
                endDateInput.classList.add("invalid-input-modal");
            }
        }
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

    if (endTimeInput.value.trim() !== "" && modalInitialTime.value.trim() !== ""
        && endDateInput.value === modalInitialDate.value) {
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