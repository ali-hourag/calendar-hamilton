import { checkModalValidity } from "./validateModal";


checkModalValidity



// export function checkModalValidity(): void {

//     const modalTitleEvent: (HTMLInputElement | null) = document.querySelector("#title-event");
//     const modalInitialDate: (HTMLInputElement | null) = document.querySelector("#init-date");
//     const modalInitialTime: (HTMLInputElement | null) = document.querySelector("#init-time");
//     const modalCheckEndDate: (HTMLInputElement | null) = document.querySelector("#check-end-date");
//     const modalCheckReminderEvent: (HTMLInputElement | null) = document.querySelector("#check-reminder-event");
//     const modalBtnSave: (HTMLButtonElement | null) = document.querySelector(".modal-save_btn");
//     const modalSection: (HTMLDivElement | null) = document.querySelector("#modal-new-event");
//     const headerNewEventBtn: (HTMLButtonElement | null) = document.querySelector("#header-new-event_btn");
//     const textAreaModal: (HTMLTextAreaElement | null) = document.querySelector("#text-area-modal");

//     if (modalTitleEvent === null) return;
//     if (modalInitialDate === null) return;
//     if (modalInitialTime === null) return;
//     if (modalCheckEndDate === null) return;
//     if (modalCheckReminderEvent === null) return;
//     if (modalBtnSave === null) return;
//     if (modalSection === null) return;
//     if (headerNewEventBtn === null) return;
//     if (textAreaModal === null) return;

//     //Set default value for initial date and time
//     modalInitialDate.value = getCurrentFormattedDate();
//     modalInitialTime.value = getCurrentFormattedTime();

//     modalTitleEvent.addEventListener("focusout", checkModalInputValidity);
//     modalInitialDate.addEventListener("focusout", checkModalInputValidity);
//     modalInitialTime.addEventListener("focusout", checkModalInputValidity);
//     textAreaModal.addEventListener("focusout", checkModalTextAreaValidity);

//     modalCheckEndDate.addEventListener("change", checkboxChecked);
//     modalCheckReminderEvent.addEventListener("change", checkboxChecked);

//     modalBtnSave.addEventListener("click", saveModalContent);
//     headerNewEventBtn.addEventListener("click", clearModal);

// }


/******************************************************************************************************************/

// function checkLastTime(time1: string, time2: string): boolean {

//     let arrayTime1: string[] = time1.split(":");
//     let arrayTime2: string[] = time2.split(":");

//     let time1Hour: number = parseInt(arrayTime1[0]), time1Mins: number = parseInt(arrayTime1[1]);
//     let time2Hour: number = parseInt(arrayTime2[0]), time2Mins: number = parseInt(arrayTime2[1]);

//     let time1Bigger: boolean = false;

//     if (time1Hour > time2Hour) time1Bigger = true;
//     else if (time1Hour < time2Hour) time1Bigger = false;
//     else {
//         if (time1Mins > time2Mins) time1Bigger = true;
//         else time1Bigger = false;
//     }

//     return time1Bigger;
// }


/********************************************************************************************************************************* */

// function checkLastDate(date1: string, date2: string): boolean {

//     let arrayDate1: string[] = date1.split("-");
//     let arrayDate2: string[] = date2.split("-");

//     let date1Day: number = parseInt(arrayDate1[2]), date1Month: number = parseInt(arrayDate1[1]), date1Year: number = parseInt(arrayDate1[0]);
//     let date2Day: number = parseInt(arrayDate2[2]), date2Month: number = parseInt(arrayDate2[1]), date2Year: number = parseInt(arrayDate2[0]);

//     let date1Bigger: boolean = false;

//     if (date1Year > date2Year) date1Bigger = true;
//     else if (date1Year < date2Year) date1Bigger = false;
//     else {
//         if (date1Month > date2Month) date1Bigger = true;
//         else if (date1Month < date2Month) date1Bigger = false;
//         else {
//             if (date1Day > date2Day) date1Bigger = true;
//             else if (date1Day < date2Day) date1Bigger = false;
//         }
//     }
//     return date1Bigger;
// }