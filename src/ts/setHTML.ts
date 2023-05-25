

export function setHeader(): void {
    const body: (HTMLBodyElement | null) = document.querySelector("body");
    const header: (HTMLElement) = document.createElement("header");
    const headerNewEventButton: (HTMLButtonElement) = document.createElement("button");
    const headerYearH1: (HTMLHeadingElement) = document.createElement("h1");
    const headerEmptyDiv: (HTMLDivElement) = document.createElement("div");
    const headerBurguerButton: (HTMLButtonElement) = document.createElement("button");
    const burguerDiv: (HTMLDivElement) = document.createElement("div");
    if (body === null) return;

    header.classList.add("header");
    header.setAttribute("id", "header");
    headerNewEventButton.classList.add("header-new-event_btn", "ml-3", "btn", "d-flex", "justify-content-center", "align-items-center");
    headerNewEventButton.setAttribute("data-bs-toggle", "modal");
    headerNewEventButton.setAttribute("data-bs-target", "#modal-new-event");
    headerNewEventButton.setAttribute("type", "button");
    headerYearH1.classList.add("header-year_h1");
    headerYearH1.setAttribute("id", "currentYear");
    headerEmptyDiv.classList.add("header-empty_div");
    headerBurguerButton.classList.add("header-burger-history_btn");
    headerBurguerButton.setAttribute("type", "button");
    headerBurguerButton.setAttribute("data-bs-toggle", "collapse");
    headerBurguerButton.setAttribute("data-bs-target", "#burger-event");
    headerBurguerButton.setAttribute("aria-expanded", "false");
    headerBurguerButton.setAttribute("aria-controls", "burger-event");
    burguerDiv.classList.add("header-burger-container_btn");
    for (let i = 0; i < 3; i++) {
        const burgerSpan = document.createElement("span");
        burgerSpan.classList.add("header-burger-content_span");
        burguerDiv.appendChild(burgerSpan);
    }


    headerNewEventButton.innerText = "New Event";
    headerYearH1.innerText = "2023";


    body.appendChild(header);
    header.appendChild(headerNewEventButton),
        header.appendChild(headerYearH1);
    header.appendChild(headerEmptyDiv);
    header.appendChild(headerBurguerButton);
    headerBurguerButton.appendChild(burguerDiv);

    setTopBar();
}



function setTopBar(): void {
    const body: (HTMLBodyElement | null) = document.querySelector("body");
    const main: (HTMLElement) = document.createElement("main");
    const topBarSectionContainer: (HTMLElement) = document.createElement("section");
    const topBarPreviousYearDiv: (HTMLDivElement) = document.createElement("div");
    const topBarMonthsContainer: (HTMLDivElement) = document.createElement("div");
    const topBarNextYearDiv: (HTMLDivElement) = document.createElement("div");
    if (body === null) return;

    main.classList.add("main");
    main.setAttribute("id", "main");
    topBarSectionContainer.classList.add("topbar-container", "d-flex", "flex-row", "flex-nowrap", "vw-100");
    topBarPreviousYearDiv.classList.add("topbar-previous-year_div", "d-flex", "justify-content-center", "align-items-center");
    topBarMonthsContainer.classList.add("topbar-months-container", "d-flex", "flex-row");
    topBarNextYearDiv.classList.add("topbar-next-year_div", "d-flex", "justify-content-center", "align-items-center");

    body.appendChild(main);
    main.appendChild(topBarSectionContainer);
    topBarSectionContainer.appendChild(topBarPreviousYearDiv);
    topBarSectionContainer.appendChild(topBarMonthsContainer);
    topBarSectionContainer.appendChild(topBarNextYearDiv);

    //Fill the topBarMonthsContainer div with months
    const arrayMonths: Array<string> = [
        "JANUARY",
        "FEBRUARY",
        "MARCH",
        "APRIL",
        "MAY",
        "JUNE",
        "JULY",
        "AUGUST",
        "SEPTEMBER",
        "OCTOBER",
        "NOVEMBER",
        "DECEMBER"
    ];

    arrayMonths.forEach((month: string, i: number): void => {
        const topBarMonthDiv: (HTMLDivElement) = document.createElement("div");
        const topBarMonthInput: (HTMLInputElement) = document.createElement("input");
        const topBarMonthLabel: (HTMLLabelElement) = document.createElement("label");

        //to set month-january and so on
        let monthSelected: string = month.toLocaleLowerCase();
        let monthId: string = `month-${monthSelected}`;

        topBarMonthDiv.classList.add("topbar-month_div");
        topBarMonthInput.classList.add("topbar-month_input");
        topBarMonthInput.setAttribute("id", monthId);
        topBarMonthInput.setAttribute("type", "radio");
        topBarMonthInput.setAttribute("name", "months");
        topBarMonthInput.setAttribute("value", monthId);
        topBarMonthInput.setAttribute("numberMonth", `${i + 1}`);
        topBarMonthLabel.classList.add("topbar-month_label");
        topBarMonthLabel.setAttribute("for", monthId);
        topBarMonthLabel.setAttribute("numberMonth", `${i + 1}`);
        topBarMonthLabel.innerText = month;

        topBarMonthDiv.appendChild(topBarMonthInput);
        topBarMonthDiv.appendChild(topBarMonthLabel);
        topBarMonthsContainer.appendChild(topBarMonthDiv)
    })

    topBarPreviousYearDiv.innerText = "<";
    topBarNextYearDiv.innerText = ">";

    setCalendarContainer();
}



function setCalendarContainer(): void {
    const main: (HTMLElement | null) = document.querySelector(".main");
    const calendarContainerSection: (HTMLElement) = document.createElement("section");
    const historyEventsAside: (HTMLElement) = document.createElement("aside");
    const historyEventsAsideTitleH4: (HTMLHeadingElement) = document.createElement("h4");
    const daysOfWeekAside: (HTMLElement) = document.createElement("aside");
    const daysOfMonthCalendarSection: (HTMLElement) = document.createElement("section");
    if (main === null) return;

    calendarContainerSection.classList.add("calendar-container");
    historyEventsAside.classList.add("history-events-container_aside", "collapse");
    historyEventsAside.setAttribute("id", "burger-event");
    historyEventsAsideTitleH4.classList.add("history-events-title_h4", "p-3");
    historyEventsAsideTitleH4.innerText = "HISTORY";
    daysOfWeekAside.classList.add("days-of-week-container_aside");
    daysOfMonthCalendarSection.classList.add("days-month-container_section");

    main.appendChild(calendarContainerSection);
    calendarContainerSection.appendChild(historyEventsAside);
    historyEventsAside.appendChild(historyEventsAsideTitleH4);
    calendarContainerSection.appendChild(daysOfWeekAside);
    calendarContainerSection.appendChild(daysOfMonthCalendarSection);


    //Add days inside the aside element of daysOfWeek
    const arrayDaysOfWeek: Array<string> = ["M", "T", "W", "T", "F", "S", "S"];
    arrayDaysOfWeek.forEach((day: string, i: number) => {
        const dayOfWeekH4: (HTMLHeadingElement) = document.createElement("h4");
        dayOfWeekH4.classList.add("day-of-week_h4");
        dayOfWeekH4.setAttribute("id", `${i + 1}`);
        dayOfWeekH4.innerText = day;

        daysOfWeekAside.appendChild(dayOfWeekH4);
    })
    setModal();
}

function setModal(): void {
    const main: (HTMLElement | null) = document.querySelector(".main");
    const modalSectionContainer: (HTMLElement) = document.createElement("section");
    const modalFormContainer: (HTMLFormElement) = document.createElement("form");
    const modalDivContainer: (HTMLDivElement) = document.createElement("div");
    const modalHeaderContainerDiv: (HTMLDivElement) = document.createElement("div");
    const modalHeaderTitleH4: (HTMLHeadingElement) = document.createElement("h4");
    const modalHeaderBtn: (HTMLButtonElement) = document.createElement("button");
    const modalBodyContainerDiv: (HTMLDivElement) = document.createElement("div");
    const modalBodySectionTitle: (HTMLElement) = document.createElement("section");
    const modalBodySectionTitleLabel: (HTMLLabelElement) = document.createElement("label");
    const modalBodySectionTitleInput: (HTMLInputElement) = document.createElement("input");
    const modalBodySectionIDate: (HTMLElement) = document.createElement("section");
    const modalBodySectionIDateLabel: (HTMLLabelElement) = document.createElement("label");
    const modalBodySectionIDateInput: (HTMLInputElement) = document.createElement("input");
    const modalBodySectionITime: (HTMLElement) = document.createElement("section");
    const modalBodySectionITimeLabel: (HTMLLabelElement) = document.createElement("label");
    const modalBodySectionITimeInput: (HTMLInputElement) = document.createElement("input");
    const modalBodySectionEDate: (HTMLElement) = document.createElement("section");
    const modalBodySectionCheckEDateLabel: (HTMLLabelElement) = document.createElement("label");
    const modalBodySectionCheckEDateInput: (HTMLInputElement) = document.createElement("input");
    const modalBodySectionEDateLabel: (HTMLLabelElement) = document.createElement("label");
    const modalBodySectionEDateInput: (HTMLInputElement) = document.createElement("input");
    const modalBodySectionETimeLabel: (HTMLLabelElement) = document.createElement("label");
    const modalBodySectionETimeInput: (HTMLInputElement) = document.createElement("input");
    const modalBodySectionReminder: (HTMLElement) = document.createElement("section");
    const modalBodySectionReminderLabel: (HTMLLabelElement) = document.createElement("label");
    const modalBodySectionReminderInput: (HTMLInputElement) = document.createElement("input");
    const modalBodySectionReminderLegend: (HTMLLegendElement) = document.createElement("legend");
    const modalBodySectionReminderSelectTime: (HTMLSelectElement) = document.createElement("select");
    const modalBodySectionReminderOptionTime1: (HTMLOptionElement) = document.createElement("option");
    const modalBodySectionReminderOptionTime2: (HTMLOptionElement) = document.createElement("option");
    const modalBodySectionReminderOptionTime3: (HTMLOptionElement) = document.createElement("option");
    const modalBodySectionReminderOptionTime4: (HTMLOptionElement) = document.createElement("option");
    const modalBodySectionReminderOptionTime5: (HTMLOptionElement) = document.createElement("option");
    const modalBodySectionReminderOptionTime6: (HTMLOptionElement) = document.createElement("option");
    const modalBodySectionReminderDescriptionLabel: (HTMLLabelElement) = document.createElement("label");
    const modalBodySectionReminderDescriptionTextArea: (HTMLTextAreaElement) = document.createElement("textarea");
    const modalBodySectionReminderSelectType: (HTMLSelectElement) = document.createElement("select");
    const modalBodySectionReminderOptionType1: (HTMLOptionElement) = document.createElement("option");
    const modalBodySectionReminderOptionType2: (HTMLOptionElement) = document.createElement("option");
    const modalBodySectionReminderOptionType3: (HTMLOptionElement) = document.createElement("option");
    const modalBodySectionReminderOptionType4: (HTMLOptionElement) = document.createElement("option");
    const modalBodySectionReminderOptionType5: (HTMLOptionElement) = document.createElement("option");
    const modalFooterContainerDiv: (HTMLDivElement) = document.createElement("div");
    const modalFooterCloseBtn: (HTMLButtonElement) = document.createElement("button");
    const modalFooterSaveBtn: (HTMLButtonElement) = document.createElement("button");
    if (main === null) return;

    let bodySectionsClasses1: string = "d-flex justify-content-between mb-2 modal-sections";
    let bodySectionsClasses2: string = "d-flex flex-column justify-content-between mb-2 modal-sections";

    modalSectionContainer.classList.add("modal-container_section", "modal", "fade");
    modalSectionContainer.setAttribute("id", "modal-new-event");
    modalSectionContainer.setAttribute("role", "document");
    modalSectionContainer.setAttribute("tabindex", "-1");
    modalSectionContainer.setAttribute("aria-labelledby", "modal-label-event");
    modalSectionContainer.setAttribute("aria-hidden", "true");
    modalFormContainer.classList.add("modal-dialog", "modal-dialog-scrollable", "modal-dialog-centered", "fs-3");
    modalDivContainer.classList.add("modal-content", "modal-height");
    modalHeaderContainerDiv.classList.add("modal-header");
    modalHeaderTitleH4.classList.add("modal-title");
    modalHeaderTitleH4.setAttribute("id", "modal-label-event");
    modalHeaderBtn.classList.add("btn-close");
    modalHeaderBtn.setAttribute("type", "button");
    modalHeaderBtn.setAttribute("data-bs-dismiss", "modal");
    modalHeaderBtn.setAttribute("aria-label", "Close");
    modalBodyContainerDiv.classList.add("modal-body");
    modalBodySectionTitle.setAttribute("class", bodySectionsClasses1);
    modalBodySectionTitleLabel.classList.add("modal-label");
    modalBodySectionTitleLabel.setAttribute("for", "title-event");
    modalBodySectionTitleInput.classList.add("modal-input");
    modalBodySectionTitleInput.setAttribute("id", "title-event");
    modalBodySectionTitleInput.setAttribute("type", "text");
    modalBodySectionTitleInput.setAttribute("name", "title");
    modalBodySectionIDate.setAttribute("class", bodySectionsClasses1);
    modalBodySectionIDateLabel.classList.add("modal-label");
    modalBodySectionIDateLabel.setAttribute("for", "init-date");
    modalBodySectionIDateInput.classList.add("modal-input");
    modalBodySectionIDateInput.setAttribute("id", "init-date");
    modalBodySectionIDateInput.setAttribute("type", "date");
    modalBodySectionIDateInput.setAttribute("name", "appt-date");
    modalBodySectionIDateInput.setAttribute("value", "2017-06-01");
    modalBodySectionITime.setAttribute("class", bodySectionsClasses1);
    modalBodySectionITimeLabel.classList.add("modal-label");
    modalBodySectionITimeLabel.setAttribute("for", "init-time");
    modalBodySectionITimeInput.classList.add("modal-input");
    modalBodySectionITimeInput.setAttribute("id", "init-time");
    modalBodySectionITimeInput.setAttribute("type", "time");
    modalBodySectionITimeInput.setAttribute("name", "appt-time");
    modalBodySectionITimeInput.setAttribute("value", "13:30");
    modalBodySectionEDate.setAttribute("class", bodySectionsClasses2);
    modalBodySectionCheckEDateLabel.classList.add("modal-label");
    modalBodySectionCheckEDateLabel.setAttribute("for", "check-end-date");
    modalBodySectionCheckEDateInput.classList.add("modal-input-checkbox");
    modalBodySectionCheckEDateInput.setAttribute("type", "checkbox");
    modalBodySectionCheckEDateInput.setAttribute("id", "check-end-date");
    modalBodySectionEDateLabel.classList.add("modal-label");
    modalBodySectionEDateLabel.setAttribute("for", "end-date");
    modalBodySectionEDateInput.classList.add("modal-input");
    modalBodySectionEDateInput.setAttribute("type", "date");
    modalBodySectionEDateInput.setAttribute("id", "end-date");
    modalBodySectionEDateInput.setAttribute("name", "end-date");
    modalBodySectionEDateInput.setAttribute("value", "2017-06-01");
    modalBodySectionETimeLabel.classList.add("modal-label");
    modalBodySectionETimeLabel.setAttribute("for", "end-time");
    modalBodySectionETimeInput.classList.add("modal-input");
    modalBodySectionETimeInput.setAttribute("id", "end-time");
    modalBodySectionETimeInput.setAttribute("type", "time");
    modalBodySectionETimeInput.setAttribute("name", "end-time");
    modalBodySectionETimeInput.setAttribute("value", "13:30");
    modalBodySectionReminder.setAttribute("class", bodySectionsClasses2);
    modalBodySectionReminderLabel.classList.add("modal-label");
    modalBodySectionReminderLabel.setAttribute("for", "check-end-of-event");
    modalBodySectionReminderInput.classList.add("modal-input-checkbox");
    modalBodySectionReminderInput.setAttribute("type", "checkbox");
    modalBodySectionReminderInput.setAttribute("id", "check-end-of-event")
    modalBodySectionReminderSelectTime.setAttribute("class", "modal-input select-arrow-styles select-hide-arrow");
    modalBodySectionReminderSelectTime.setAttribute("id", "type-of-time");
    modalBodySectionReminderSelectTime.setAttribute("name", "time-option");
    modalBodySectionReminderSelectTime.setAttribute("value", "default");
    modalBodySectionReminderSelectTime.setAttribute("required", "true");
    modalBodySectionReminderOptionTime1.setAttribute("value", "default");
    modalBodySectionReminderOptionTime1.setAttribute("selected", "true");
    modalBodySectionReminderOptionTime1.setAttribute("disabled", "true");
    modalBodySectionReminderOptionTime2.setAttribute("value", "five");
    modalBodySectionReminderOptionTime3.setAttribute("value", "ten");
    modalBodySectionReminderOptionTime4.setAttribute("value", "fifteen");
    modalBodySectionReminderOptionTime5.setAttribute("value", "thirty");
    modalBodySectionReminderOptionTime6.setAttribute("value", "one hour");
    modalBodySectionReminderDescriptionLabel.classList.add("modal-label");
    modalBodySectionReminderDescriptionLabel.setAttribute("for", "text-area-modal");
    modalBodySectionReminderDescriptionTextArea.setAttribute("class", "modal-input mb-2");
    modalBodySectionReminderDescriptionTextArea.setAttribute("id", "text-area-modal");
    modalBodySectionReminderDescriptionTextArea.setAttribute("maxlength", "500");
    modalBodySectionReminderDescriptionTextArea.setAttribute("rows", "4");
    modalBodySectionReminderDescriptionTextArea.setAttribute("cols", "35");
    modalBodySectionReminderSelectType.setAttribute("class", "modal-input select-arrow-styles select-hide-arrow");
    modalBodySectionReminderSelectType.setAttribute("id", "type-of-date");
    modalBodySectionReminderSelectType.setAttribute("name", "date-option");
    modalBodySectionReminderSelectType.setAttribute("value", "default");
    modalBodySectionReminderSelectType.setAttribute("required", "true");
    modalBodySectionReminderOptionType1.setAttribute("value", "default");
    modalBodySectionReminderOptionType1.setAttribute("selected", "true");
    modalBodySectionReminderOptionType1.setAttribute("disabled", "true");
    modalBodySectionReminderOptionType2.setAttribute("value", "meeting");
    modalBodySectionReminderOptionType3.setAttribute("value", "personal");
    modalBodySectionReminderOptionType4.setAttribute("value", "study");
    modalBodySectionReminderOptionType5.setAttribute("value", "sports");
    modalFooterContainerDiv.classList.add("modal-footer", "d-flex");
    modalFooterCloseBtn.setAttribute("class", "btn btn-danger w-50 p-2 modal-close_btn");
    modalFooterCloseBtn.setAttribute("type", "button");
    modalFooterCloseBtn.setAttribute("data-bs-dismiss", "modal");
    modalFooterSaveBtn.setAttribute("class", "btn btn-success flex-grow-1 p-2 modal-save-btn");
    modalFooterSaveBtn.setAttribute("type", "button");




    main.appendChild(modalSectionContainer);
    modalSectionContainer.appendChild(modalFormContainer);
    modalFormContainer.appendChild(modalDivContainer);
    modalDivContainer.appendChild(modalHeaderContainerDiv);
    modalHeaderContainerDiv.appendChild(modalHeaderTitleH4);
    modalHeaderContainerDiv.appendChild(modalHeaderBtn);
    modalDivContainer.appendChild(modalBodyContainerDiv);
    modalBodyContainerDiv.appendChild(modalBodySectionTitle);
    modalBodySectionTitle.appendChild(modalBodySectionTitleLabel);
    modalBodySectionTitle.appendChild(modalBodySectionTitleInput);
    modalBodyContainerDiv.appendChild(modalBodySectionIDate);
    modalBodySectionIDate.appendChild(modalBodySectionIDateLabel);
    modalBodySectionIDate.appendChild(modalBodySectionIDateInput);
    modalBodyContainerDiv.appendChild(modalBodySectionITime);
    modalBodySectionITime.appendChild(modalBodySectionITimeLabel);
    modalBodySectionITime.appendChild(modalBodySectionITimeInput);
    modalBodyContainerDiv.appendChild(modalBodySectionEDate);
    modalBodySectionEDate.appendChild(modalBodySectionCheckEDateLabel);
    modalBodySectionCheckEDateLabel.appendChild(modalBodySectionCheckEDateInput);
    modalBodySectionEDate.appendChild(modalBodySectionEDateLabel);
    modalBodySectionEDate.appendChild(modalBodySectionEDateInput);
    modalBodySectionEDate.appendChild(modalBodySectionETimeLabel);
    modalBodySectionEDate.appendChild(modalBodySectionETimeInput);
    modalBodyContainerDiv.appendChild(modalBodySectionReminder);
    modalBodySectionReminder.appendChild(modalBodySectionReminderLabel);
    modalBodySectionReminderLabel.appendChild(modalBodySectionReminderInput);
    modalBodySectionReminder.appendChild(modalBodySectionReminderLegend);
    modalBodySectionReminder.appendChild(modalBodySectionReminderSelectTime);
    modalBodySectionReminderSelectTime.appendChild(modalBodySectionReminderOptionTime1);
    modalBodySectionReminderSelectTime.appendChild(modalBodySectionReminderOptionTime2);
    modalBodySectionReminderSelectTime.appendChild(modalBodySectionReminderOptionTime3);
    modalBodySectionReminderSelectTime.appendChild(modalBodySectionReminderOptionTime4);
    modalBodySectionReminderSelectTime.appendChild(modalBodySectionReminderOptionTime5);
    modalBodySectionReminderSelectTime.appendChild(modalBodySectionReminderOptionTime6);
    modalBodySectionReminder.appendChild(modalBodySectionReminderDescriptionLabel);
    modalBodySectionReminder.appendChild(modalBodySectionReminderDescriptionTextArea);
    modalBodySectionReminder.appendChild(modalBodySectionReminderSelectType);
    modalBodySectionReminderSelectType.appendChild(modalBodySectionReminderOptionType1);
    modalBodySectionReminderSelectType.appendChild(modalBodySectionReminderOptionType2);
    modalBodySectionReminderSelectType.appendChild(modalBodySectionReminderOptionType3);
    modalBodySectionReminderSelectType.appendChild(modalBodySectionReminderOptionType4);
    modalBodySectionReminderSelectType.appendChild(modalBodySectionReminderOptionType5);
    modalDivContainer.appendChild(modalFooterContainerDiv);
    modalFooterContainerDiv.appendChild(modalFooterCloseBtn);
    modalFooterContainerDiv.appendChild(modalFooterSaveBtn);


    modalHeaderTitleH4.innerText = "New Event";
    modalBodySectionTitleLabel.innerText = "Title";
    modalBodySectionIDateLabel.innerText = "Initial date";
    modalBodySectionITimeLabel.innerText = "Initial time";
    modalBodySectionCheckEDateLabel.innerHTML += " End date event"; //After input child
    modalBodySectionEDateLabel.innerText = "End date";
    modalBodySectionETimeLabel.innerText = "End time";
    modalBodySectionReminderLabel.innerHTML += " Remind me when this event expires";
    modalBodySectionReminderLegend.innerText = "Time";
    modalBodySectionReminderOptionTime1.innerText = "Choose time";
    modalBodySectionReminderOptionTime2.innerText = "5 minutes";
    modalBodySectionReminderOptionTime3.innerText = "10 minutes";
    modalBodySectionReminderOptionTime4.innerText = "15 minutes";
    modalBodySectionReminderOptionTime5.innerText = "30 minutes";
    modalBodySectionReminderOptionTime6.innerText = "1 hour";
    modalBodySectionReminderDescriptionLabel.innerText = "Description";
    modalBodySectionReminderOptionType1.innerText = "Choose Type";
    modalBodySectionReminderOptionType2.innerText = "Meeting";
    modalBodySectionReminderOptionType3.innerText = "Personal";
    modalBodySectionReminderOptionType4.innerText = "Study";
    modalBodySectionReminderOptionType5.innerText = "Sports";
    modalFooterCloseBtn.innerText = "Close";
    modalFooterSaveBtn.innerText = "Save changes";

}