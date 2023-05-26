

export function checkModalValidity(): void{
    const modalTitleEvent: (HTMLInputElement | null) = document.querySelector("#title-event");
    const modalInitialDate: (HTMLInputElement | null) = document.querySelector("#init-date");
    const modalInitialTime: (HTMLInputElement | null) = document.querySelector("#init-time");
    const modalForm: (HTMLFormElement | null) = document.querySelector("#modal-form");
    const modalCheckEndDate: (HTMLInputElement | null) = document.querySelector("#check-end-date");
    const modalCheckReminderEvent: (HTMLInputElement | null) = document.querySelector("#check-reminder-event");

    if(modalTitleEvent === null) return;
    if(modalInitialDate === null) return;
    if(modalInitialTime === null) return;
    if(modalForm === null) return;
    if(modalCheckEndDate === null) return;
    if(modalCheckReminderEvent === null) return;

    modalTitleEvent.addEventListener("focusout", checkModalInputValidity);
    modalInitialDate.addEventListener("focusout", checkModalInputValidity);
    modalInitialTime.addEventListener("focusout", checkModalInputValidity);
    
    modalCheckEndDate.addEventListener("change", endDateChecked);
    modalCheckReminderEvent.addEventListener("change", endDateChecked);

}
//------------------------------------------------------------------------------------------------------------
/**
 * 
 */
function checkModalInputValidity(this: HTMLInputElement): void{
    //Para el error llamar una función que le pasamos el mensaje y el elemento.

    if(this.value.trim() === "") {
        this.value = ""; //In the case of the date and clock input
        this.classList.add("invalid-input-modal");
    }
    else if(this.getAttribute("id") === "title-event" && this.value.length > 60){ //To check title validity 
        this.value = "";
        this.classList.add("invalid-input-modal");
    } 
    else{
        this.classList.remove("invalid-input-modal");
    }
    if(this.getAttribute("id") === "end-date") checkValidEndDate();
    else if(this.getAttribute("id") === "end-time") checkValidEndTime();

    if(this.getAttribute("id") === "type-of-time") checkValidTimeSelect();
}
//------------------------------------------------------------------------------------------------------------
/**
 * 
 */
function endDateChecked(this: HTMLInputElement): void{
    const endDateContainerDiv: (HTMLDivElement | null) = document.querySelector("#end-date-container");
    const reminderContainerDiv: (HTMLDivElement | null) = document.querySelector("#reminder-container");
    if(endDateContainerDiv === null) return;
    if(reminderContainerDiv === null) return;
    if(this.id === "check-end-date"){
        endDateContainerDiv.classList.toggle("modal-div");
        endDateContainerDiv.classList.toggle("d-flex");
        if(!endDateContainerDiv.classList.contains("modal-div")) checkEndDateValidity();

    } else {
        reminderContainerDiv.classList.toggle("modal-div");
        reminderContainerDiv.classList.toggle("d-flex");
        if(!reminderContainerDiv.classList.contains("modal-div")) checkReminderValidity();
    }
}
//------------------------------------------------------------------------------------------------------------
/**
 * 
 */

function checkReminderValidity(): void{
    const typeOfTime: (HTMLSelectElement | null) = document.querySelector("#type-of-time");
    const textAreaModal: (HTMLTextAreaElement | null) = document.querySelector("#text-area-modal");
    const typeOfDate: (HTMLSelectElement | null) = document.querySelector("#type-of-date");
    if(typeOfTime === null) return;
    if(textAreaModal === null) return;
    if(typeOfDate === null) return;

    typeOfTime.addEventListener("focusout", checkModalInputValidity);
    textAreaModal.addEventListener("focusout", checkModalTextAreaValidity);
}
//------------------------------------------------------------------------------------------------------------
/**
 * 
 */

function checkModalTextAreaValidity(): void {
    const textAreaModal: (HTMLTextAreaElement | null) = document.querySelector("#text-area-modal");
    if(textAreaModal === null) return;

    if(textAreaModal.value.length > 500) {
        textAreaModal.classList.add("invalid-input-modal");
    } else textAreaModal.classList.remove("invalid-input-modal");
    console.log(textAreaModal.value)
}

//------------------------------------------------------------------------------------------------------------
/**
 * 
 */

function checkValidTimeSelect(): void {
    
    const typeOfTime: (HTMLSelectElement | null) = document.querySelector("#type-of-time");
    if(typeOfTime === null) return;
    console.log(typeOfTime.value)
    if(typeOfTime.value === "default") {
        typeOfTime.classList.add("invalid-input-modal");
    } else {
        typeOfTime.classList.remove("invalid-input-modal");
    }
}


//------------------------------------------------------------------------------------------------------------
/**
 * 
 */
function checkEndDateValidity(): void {
    const endDateInput: (HTMLInputElement | null) = document.querySelector("#end-date");
    const endTimeInput: (HTMLInputElement | null) = document.querySelector("#end-time");
    if(endDateInput === null) return;
    if(endTimeInput === null) return;

    endDateInput.addEventListener("focusout", checkModalInputValidity);
    endTimeInput.addEventListener("focusout", checkModalInputValidity);
}
//------------------------------------------------------------------------------------------------------------
/**
 * 
 */
function checkValidEndDate(): void {
    const endDateInput: (HTMLInputElement | null) = document.querySelector("#end-date");
    const modalInitialDate: (HTMLInputElement | null) = document.querySelector("#init-date");
    if(endDateInput === null) return;
    if(modalInitialDate === null) return;
    
    if(modalInitialDate.value.trim() === ""){
        endDateInput.classList.add("invalid-input-modal");
        endDateInput.value = "";
    } else {
        if (endDateInput.value.trim() !== ""){
            if(checkLastDate(endDateInput.value, modalInitialDate.value) || endDateInput.value === modalInitialDate.value){
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
 * 
 */


function checkValidEndTime() {
    const endDateInput: (HTMLInputElement | null) = document.querySelector("#end-date");
    const modalInitialDate: (HTMLInputElement | null) = document.querySelector("#init-date");
    const endTimeInput: (HTMLInputElement | null) = document.querySelector("#end-time");
    const modalInitialTime: (HTMLInputElement | null) = document.querySelector("#init-time");
    if(endDateInput === null) return;
    if(modalInitialDate === null) return;
    if(endTimeInput === null) return;
    if(modalInitialTime === null) return;

    if(endTimeInput.value.trim() !== "" && modalInitialTime.value.trim() !== "" 
            && endDateInput.value === modalInitialDate.value) {
        if(!checkLastTime(endTimeInput.value, modalInitialTime.value) || endTimeInput.value === modalInitialTime.value) {
            endTimeInput.classList.add("invalid-input-modal");
            endTimeInput.value = "";
        } 
        
    }
}
//------------------------------------------------------------------------------------------------------------
/**
 * 
 */
function checkLastTime(time1: string , time2: string): boolean {

    let arrayTime1: string[] = time1.split(":");
    let arrayTime2: string[] = time2.split(":");

    let time1Hour: number = parseInt(arrayTime1[0]), time1Mins: number = parseInt(arrayTime1[1]);
    let time2Hour: number = parseInt(arrayTime2[0]), time2Mins: number = parseInt(arrayTime2[1]);

    let time1Bigger: boolean = false;

    if(time1Hour > time2Hour) time1Bigger = true;
    else if(time1Hour < time2Hour) time1Bigger = false;
    else {
        if(time1Mins > time2Mins) time1Bigger = true;
        else time1Bigger = false;
    }

    return time1Bigger;
}
//------------------------------------------------------------------------------------------------------------
/**
 * 
 */
function checkLastDate(date1: string , date2: string): boolean{

    let arrayDate1: string[] = date1.split("-");
    let arrayDate2: string[] = date2.split("-");

    let date1Day: number = parseInt(arrayDate1[2]), date1Month: number = parseInt(arrayDate1[1]), date1Year: number = parseInt(arrayDate1[0]);
    let date2Day: number = parseInt(arrayDate2[2]), date2Month: number = parseInt(arrayDate2[1]), date2Year: number = parseInt(arrayDate2[0]);

    let date1Bigger: boolean = false;

    if(date1Year > date2Year) date1Bigger = true;
    else if(date1Year < date2Year) date1Bigger = false;
    else {
        if(date1Month > date2Month) date1Bigger = true;
        else if(date1Month < date2Month) date1Bigger = false;
        else {
            if(date1Day > date2Day) date1Bigger = true;
            else if(date1Day < date2Day) date1Bigger = false;
        }
    } 
    return date1Bigger;
}

// export function validateNewEvent(): void {

//     const titleEvent: HTMLInputElement | null = document.querySelector("#title-event") as HTMLInputElement;
//     const initDate: HTMLInputElement = document.querySelector("#init-date") as HTMLInputElement;
//     const appTime: HTMLInputElement = document.querySelector("#init-time") as HTMLInputElement;
//     const modalForm: HTMLFormElement = document.querySelector("#modal-form") as HTMLFormElement;

//     titleEvent.addEventListener("focusout", function () {
//         if (titleEvent.value.length > 60) {
//             titleEvent.setCustomValidity("The value cannot contain more than 60 characters.");
//         }

//          else if (titleEvent.value === "") {
//             titleEvent.setCustomValidity("This field cannot be empty");
//             titleEvent.reportValidity();
//             return;
//         } else {
//             titleEvent.setCustomValidity("");
//         }
//     });

//     initDate.addEventListener("focusout", function () {
//         if (initDate.value === "") {
//             initDate.setCustomValidity("This field cannot be empty");
//             initDate.reportValidity();
//             return;
//         } else {
//             initDate.setCustomValidity("");
//         }
//     });

//     appTime.addEventListener("focusout", function () {
//         if (appTime.value === "") {
//             appTime.setCustomValidity("This field cannot be empty");
//             appTime.reportValidity();
//             return;
//         } else {
//             appTime.setCustomValidity("");
//         }
//     });

//     modalForm.addEventListener("submit", function (event) {
//         if (!titleEvent.value || !initDate.value || !appTime.value) {
//             event.preventDefault();
//             alert("All fields are required!");
//         }
//     });
//     showOptionsEvent();
// }
// /*check-end-date */

// function showOptionsEvent(): void {

//     const checkEndDate: HTMLInputElement | null = document.querySelector("#check-end-date") as HTMLInputElement;
//     const endDateSection: HTMLDivElement | null = document.querySelector("#end-date-container") as HTMLDivElement;
//     const checkEndOfEvent: HTMLInputElement | null = document.querySelector("#check-end-of-event") as HTMLInputElement;
//     const endTimeSection: HTMLDivElement | null = document.querySelector("#end-time-container") as HTMLDivElement;
//     const typeOfTime: HTMLSelectElement = document.querySelector("#type-of-time") as HTMLSelectElement;
//     const textAreaModal: HTMLTextAreaElement = document.querySelector("#text-area-modal") as HTMLTextAreaElement;
//     const typeOfDate: HTMLSelectElement = document.querySelector("#type-of-date") as HTMLSelectElement;
//     const modalForm: HTMLFormElement = document.querySelector("#modal-form") as HTMLFormElement;
    
//     checkEndDate.addEventListener("click", function () {
//         endDateSection.classList.toggle("modal-div");
//         endDateSection.classList.toggle("d-flex");
//     });

//     checkEndOfEvent.addEventListener("click", function () {
//         endTimeSection.classList.toggle("modal-div");
//         endTimeSection.classList.toggle("d-flex");
//     });

//     typeOfTime.addEventListener("focusout", function () {
//         if (typeOfTime.value === "") {
//             typeOfTime.setCustomValidity("Choose time to remind");
//             typeOfTime.reportValidity();
//             return;
//         } else {
//             typeOfTime.setCustomValidity("");
//         }
//     });

//     textAreaModal.addEventListener("focusout", function () {
//         if (textAreaModal.value.length > 5) {
//             textAreaModal.setCustomValidity("The value cannot contain more than 500 characters.");
//             textAreaModal.reportValidity();
//             return;
//         } else {
//             textAreaModal.setCustomValidity("");
//         }
//     });

//     typeOfDate.addEventListener("focusout", function () {
//         if (typeOfDate.value === "") {
//             typeOfDate.setCustomValidity("Choose date to remind");
//             typeOfDate.reportValidity();
//             return;
//         } else {
//             typeOfDate.setCustomValidity("");
//         }
//     });
    
//     modalForm.addEventListener("submit", function (event) {
//         if (!typeOfTime|| !typeOfDate || !textAreaModal) {
//             event.preventDefault();
//             alert("All fields are required!");
//         }
//     });
// }