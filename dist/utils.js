export function validateNewEvent() {
    const titleEvent = document.querySelector("#title-event");
    const initDate = document.querySelector("#init-date");
    const appTime = document.querySelector("#appt-time");
    const modalForm = document.querySelector("#modal-form");
    titleEvent.addEventListener("focusout", function () {
        if (titleEvent.value.length > 10) {
            titleEvent.setCustomValidity("The value cannot contain more than 60 characters.");
            titleEvent.reportValidity();
            return;
        }
        else if (titleEvent.value === "") {
            titleEvent.setCustomValidity("This field cannot be empty");
            titleEvent.reportValidity();
            return;
        }
        else {
            titleEvent.setCustomValidity("");
        }
    });
    initDate.addEventListener("focusout", function () {
        if (initDate.value === "") {
            initDate.setCustomValidity("This field cannot be empty");
            initDate.reportValidity();
            return;
        }
        else {
            initDate.setCustomValidity("");
        }
    });
    appTime.addEventListener("focusout", function () {
        if (appTime.value === "") {
            appTime.setCustomValidity("This field cannot be empty");
            appTime.reportValidity();
            return;
        }
        else {
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
function showOptionsEvent() {
    const checkEndDate = document.querySelector("#check-end-date");
    const endDateSection = document.querySelector("#end-date-container");
    const checkEndOfEvent = document.querySelector("#check-end-of-event");
    const endTimeSection = document.querySelector("#end-time-container");
    const typeOfTime = document.querySelector("#type-of-time");
    const textAreaModal = document.querySelector("#text-area-modal");
    const typeOfDate = document.querySelector("#type-of-date");
    const modalForm = document.querySelector("#modal-form");
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
        }
        else {
            typeOfTime.setCustomValidity("");
        }
    });
    textAreaModal.addEventListener("focusout", function () {
        if (textAreaModal.value.length > 5) {
            textAreaModal.setCustomValidity("The value cannot contain more than 500 characters.");
            textAreaModal.reportValidity();
            return;
        }
        else {
            textAreaModal.setCustomValidity("");
        }
    });
    typeOfDate.addEventListener("focusout", function () {
        if (typeOfDate.value === "") {
            typeOfDate.setCustomValidity("Choose date to remind");
            typeOfDate.reportValidity();
            return;
        }
        else {
            typeOfDate.setCustomValidity("");
        }
    });
    modalForm.addEventListener("submit", function (event) {
        if (!typeOfTime || !typeOfDate || !textAreaModal) {
            event.preventDefault();
            alert("All fields are required!");
        }
    });
}
//# sourceMappingURL=utils.js.map