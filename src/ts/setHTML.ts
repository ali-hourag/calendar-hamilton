

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
    headerNewEventButton.setAttribute("id", "header-new-event_btn");
    headerNewEventButton.setAttribute("data-bs-target", "#modal-new-event"); //modal-new-event or modal-info-event to see info event
    headerNewEventButton.setAttribute("type", "button");
    headerYearH1.classList.add("header-year_h1");
    headerYearH1.setAttribute("id", "selected-year");
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
        topBarMonthInput.setAttribute("number-month", `${i + 1}`);
        topBarMonthLabel.classList.add("topbar-month_label");
        topBarMonthLabel.setAttribute("for", monthId);
        topBarMonthLabel.setAttribute("number-month", `${i + 1}`);
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

    setEntryDaysCalendar();

    //Add days inside the aside element of daysOfWeek
    const arrayDaysOfWeek: Array<string> = ["M", "T", "W", "T", "F", "S", "S"];
    arrayDaysOfWeek.forEach((day: string, i: number) => {
        const dayOfWeekH4: (HTMLHeadingElement) = document.createElement("h4");
        dayOfWeekH4.classList.add("day-of-week_h4");
        dayOfWeekH4.setAttribute("id", `${i + 1}`);
        dayOfWeekH4.innerText = day;

        daysOfWeekAside.appendChild(dayOfWeekH4);
    })
    setModalNewEvent();
}


function setEntryDaysCalendar(){
    const daysOfMonthCalendarSection: (HTMLElement | null) = document.querySelector(".days-month-container_section");
    if(daysOfMonthCalendarSection === null) return;
    for(let i = 1; i <= 42; i++){
        const entryDayContainerDiv: (HTMLDivElement | null) = document.createElement("div");
        const entryDayInfoDiv: (HTMLDivElement | null) = document.createElement("div");
        const entryDayInfoP: (HTMLParagraphElement | null) = document.createElement("p");
        const entryDayInfoSpan: (HTMLSpanElement | null) = document.createElement("span");
        if(entryDayContainerDiv === null) return;
        if(entryDayInfoDiv === null) return;
        if(entryDayInfoP === null) return;
        if(entryDayInfoSpan === null) return;
        
        entryDayContainerDiv.classList.add("entry-day-calendar_div");
        entryDayContainerDiv.setAttribute("id", `weekday-${i}`);
        entryDayInfoDiv.classList.add("entry-day-info_div");
        entryDayInfoDiv.setAttribute("id", `div-day-info-${i}`);
        entryDayInfoP.classList.add("entry-day-info-number_p");
        entryDayInfoP.setAttribute("id", `p-day-${i}`);
        entryDayInfoSpan.classList.add("entry-day-info-add_span");
        entryDayInfoSpan.setAttribute("id", `span-day-${i}`);

        daysOfMonthCalendarSection.appendChild(entryDayContainerDiv);
        entryDayContainerDiv.appendChild(entryDayInfoDiv);
        entryDayInfoDiv.appendChild(entryDayInfoP);
        entryDayInfoDiv.appendChild(entryDayInfoSpan);

        //entryDayInfoP.innerText = i.toString();
        //entryDayInfoSpan.innerText = "+";
    }
}

function setModalNewEvent(): void {
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
    const modalBodySectionEDateEndDiv: (HTMLDivElement) = document.createElement("div");
    const modalBodySectionEDateLabel: (HTMLLabelElement) = document.createElement("label");
    const modalBodySectionEDateInput: (HTMLInputElement) = document.createElement("input");
    const modalBodySectionETimeLabel: (HTMLLabelElement) = document.createElement("label");
    const modalBodySectionETimeInput: (HTMLInputElement) = document.createElement("input");
    const modalBodySectionReminder: (HTMLElement) = document.createElement("section");
    const modalBodySectionReminderLabel: (HTMLLabelElement) = document.createElement("label");
    const modalBodySectionReminderInput: (HTMLInputElement) = document.createElement("input");
    const modalBodySectionReminderContainerDiv: (HTMLDivElement) = document.createElement("div");
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
    const modalFooterCancelBtn: (HTMLButtonElement) = document.createElement("button");
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
    modalFormContainer.setAttribute("id", "modal-form");
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
    modalBodySectionITime.setAttribute("class", bodySectionsClasses1);
    modalBodySectionITimeLabel.classList.add("modal-label");
    modalBodySectionITimeLabel.setAttribute("for", "init-time");
    modalBodySectionITimeInput.classList.add("modal-input");
    modalBodySectionITimeInput.setAttribute("id", "init-time");
    modalBodySectionITimeInput.setAttribute("type", "time");
    modalBodySectionITimeInput.setAttribute("name", "appt-time");
    modalBodySectionEDate.setAttribute("class", bodySectionsClasses2);
    modalBodySectionCheckEDateLabel.classList.add("modal-label");
    modalBodySectionCheckEDateLabel.setAttribute("for", "check-end-date");
    modalBodySectionCheckEDateInput.classList.add("modal-input-checkbox");
    modalBodySectionCheckEDateInput.setAttribute("type", "checkbox");
    modalBodySectionCheckEDateInput.setAttribute("id", "check-end-date");
    modalBodySectionEDateEndDiv.setAttribute("class", "modal-display-none flex-column justify-content-between mb-2 modal-sections");
    modalBodySectionEDateEndDiv.setAttribute("id", "end-date-container");
    modalBodySectionEDateLabel.classList.add("modal-label");
    modalBodySectionEDateLabel.setAttribute("for", "end-date");
    modalBodySectionEDateInput.classList.add("modal-input");
    modalBodySectionEDateInput.setAttribute("type", "date");
    modalBodySectionEDateInput.setAttribute("id", "end-date");
    modalBodySectionEDateInput.setAttribute("name", "end-date");
    modalBodySectionETimeLabel.classList.add("modal-label");
    modalBodySectionETimeLabel.setAttribute("for", "end-time");
    modalBodySectionETimeInput.classList.add("modal-input");
    modalBodySectionETimeInput.setAttribute("id", "end-time");
    modalBodySectionETimeInput.setAttribute("type", "time");
    modalBodySectionETimeInput.setAttribute("name", "end-time");
    modalBodySectionReminder.setAttribute("class", bodySectionsClasses2);
    modalBodySectionReminderLabel.classList.add("modal-label");
    modalBodySectionReminderLabel.setAttribute("for", "check-reminder-event");
    modalBodySectionReminderInput.classList.add("modal-input-checkbox");
    modalBodySectionReminderInput.setAttribute("type", "checkbox");
    modalBodySectionReminderInput.setAttribute("id", "check-reminder-event")
    modalBodySectionReminderContainerDiv.setAttribute("class", "modal-display-none flex-column justify-content-between mb-2 modal-sections");
    modalBodySectionReminderContainerDiv.setAttribute("id", "reminder-container");
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
    modalBodySectionReminderOptionTime6.setAttribute("value", "one-hour");
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
    modalFooterCancelBtn.setAttribute("class", "btn btn-danger w-50 p-2 modal-cancel_btn");
    modalFooterCancelBtn.setAttribute("type", "button");
    modalFooterCancelBtn.setAttribute("data-bs-dismiss", "modal");
    modalFooterSaveBtn.setAttribute("class", "btn btn-success flex-grow-1 p-2 modal-save_btn");
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
    modalBodySectionEDate.appendChild(modalBodySectionEDateEndDiv);
    modalBodySectionEDateEndDiv.appendChild(modalBodySectionEDateLabel);
    modalBodySectionEDateEndDiv.appendChild(modalBodySectionEDateInput);
    modalBodySectionEDateEndDiv.appendChild(modalBodySectionETimeLabel);
    modalBodySectionEDateEndDiv.appendChild(modalBodySectionETimeInput);
    modalBodyContainerDiv.appendChild(modalBodySectionReminder);
    modalBodySectionReminder.appendChild(modalBodySectionReminderLabel);
    modalBodySectionReminderLabel.appendChild(modalBodySectionReminderInput);
    modalBodySectionReminder.appendChild(modalBodySectionReminderContainerDiv);
    modalBodySectionReminderContainerDiv.appendChild(modalBodySectionReminderLegend);
    modalBodySectionReminderContainerDiv.appendChild(modalBodySectionReminderSelectTime);
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
    modalFooterContainerDiv.appendChild(modalFooterCancelBtn);
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
    modalBodySectionReminderOptionTime1.innerText = "Choose Time";
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
    modalFooterCancelBtn.innerText = "Cancel";
    modalFooterSaveBtn.innerText = "Save changes";

    setModalInfoEvent();

}

function setModalInfoEvent() {
    const main: (HTMLBodyElement | null) = document.querySelector(".main");
    const modalContainerDiv1: (HTMLDivElement | null) = document.createElement("div");
    const modalContainerDiv2: (HTMLDivElement | null) = document.createElement("div");
    const modalContentDiv: (HTMLDivElement | null) = document.createElement("div");
    const modalHeaderContainerDiv: (HTMLDivElement | null) = document.createElement("div");
    const modalHeaderH1: (HTMLHeadingElement | null) = document.createElement("h1");
    const modalHeaderBtn: (HTMLButtonElement | null) = document.createElement("button");
    const modalBodyContainerDiv: (HTMLDivElement | null) = document.createElement("div");
    const modalBodyTitleH2: (HTMLHeadingElement | null) = document.createElement("h2");
    const modalBodyInitialDiv: (HTMLDivElement | null) = document.createElement("div");
    const modalBodyInitialP1: (HTMLParagraphElement | null) = document.createElement("p");
    const modalBodyInitialP2: (HTMLParagraphElement | null) = document.createElement("p");
    const modalBodyEndDiv: (HTMLDivElement | null) = document.createElement("div");
    const modalBodyEndP1: (HTMLParagraphElement | null) = document.createElement("p");
    const modalBodyEndP2: (HTMLParagraphElement | null) = document.createElement("p");
    const modalBodyReminderDiv: (HTMLDivElement | null) = document.createElement("div");
    const modalBodyReminderP: (HTMLParagraphElement | null) = document.createElement("p");
    const modalBodyDescriptionDiv: (HTMLDivElement | null) = document.createElement("div");
    const modalBodyDescriptionP1: (HTMLParagraphElement | null) = document.createElement("p");
    const modalBodyDescriptionTArea: (HTMLTextAreaElement | null) = document.createElement("textarea");
    const modalBodyDescriptionP2: (HTMLParagraphElement | null) = document.createElement("p");
    const modalFooterContainerDiv: (HTMLDivElement | null) = document.createElement("div");
    const modalFooterCancelBtn: (HTMLButtonElement | null) = document.createElement("button");
    if (main === null) return;

    let classInfoModal: string = "d-flex flex-row justify-content-between align-items-center";

    modalContainerDiv1.classList.add("modal", "fade");
    modalContainerDiv1.setAttribute("id", "modal-info-event");
    modalContainerDiv1.setAttribute("tabindex", "-1");
    modalContainerDiv1.setAttribute("role", "dialog");
    modalContainerDiv1.setAttribute("aria-labelledby", "modaliInfoEvent");
    modalContainerDiv1.setAttribute("aria-hidden", "true");
    modalContainerDiv2.setAttribute("class", "modal-dialog modal-dialog-centered modal-dialog-scrollable");
    modalContainerDiv2.setAttribute("role", "document");
    modalContentDiv.classList.add("modal-content", "modal-info-content");
    modalHeaderContainerDiv.classList.add("modal-header");
    modalHeaderH1.classList.add("modal-title");
    modalHeaderH1.setAttribute("id", "modal-info-title_h1");
    modalHeaderBtn.classList.add("btn-close");
    modalHeaderBtn.setAttribute("type", "button");
    modalHeaderBtn.setAttribute("data-bs-dismiss", "modal");
    modalHeaderBtn.setAttribute("aria-label", "close");
    modalBodyContainerDiv.classList.add("modal-body", "d-flex", "flex-column", "justify-content-center");
    modalBodyTitleH2.setAttribute("class", `modal-info-title text-center`);
    modalBodyInitialDiv.setAttribute("class", `initial-values ${classInfoModal}`);
    modalBodyInitialP1.classList.add("initial-values-p");
    modalBodyInitialP2.classList.add("initial-values-p");
    modalBodyEndDiv.setAttribute("class", `end-values ${classInfoModal}`);
    modalBodyEndP1.classList.add("end-values-p");
    modalBodyEndP2.classList.add("end-values-p");
    modalBodyReminderDiv.setAttribute("class", `info-reminder ${classInfoModal}`);
    modalBodyReminderP.classList.add("info-reminder-p");
    modalBodyDescriptionDiv.setAttribute("class", "info-description d-flex flex-column justify-content-center align-items-center");
    modalBodyDescriptionP1.classList.add("info-description-p1");
    modalBodyDescriptionTArea.classList.add("info-description-textarea", "mb-2");
    modalBodyDescriptionTArea.setAttribute("maxlength", "500");
    modalBodyDescriptionTArea.setAttribute("rows", "4");
    modalBodyDescriptionTArea.setAttribute("cols", "35");
    modalBodyDescriptionTArea.setAttribute("disabled", "true");
    modalBodyDescriptionP2.classList.add("info-event-type");

    modalFooterContainerDiv.classList.add("modal-footer");
    modalFooterCancelBtn.classList.add("btn", "btn-secondary", "modal-cancel_btn");
    modalFooterCancelBtn.setAttribute("type", "button");
    modalFooterCancelBtn.setAttribute("data-bs-dismiss", "modal");

    modalContainerDiv1.appendChild(modalContainerDiv2);
    modalContainerDiv2.appendChild(modalContentDiv);
    modalContentDiv.appendChild(modalHeaderContainerDiv);
    modalHeaderContainerDiv.appendChild(modalHeaderH1);
    modalHeaderContainerDiv.appendChild(modalHeaderBtn);
    modalContentDiv.appendChild(modalBodyContainerDiv);
    modalBodyContainerDiv.appendChild(modalBodyTitleH2);
    modalBodyContainerDiv.appendChild(modalBodyInitialDiv);
    modalBodyInitialDiv.appendChild(modalBodyInitialP1);
    modalBodyInitialDiv.appendChild(modalBodyInitialP2);
    modalBodyContainerDiv.appendChild(modalBodyEndDiv);
    modalBodyEndDiv.appendChild(modalBodyEndP1);
    modalBodyEndDiv.appendChild(modalBodyEndP2);
    modalBodyContainerDiv.appendChild(modalBodyReminderDiv);
    modalBodyReminderDiv.appendChild(modalBodyReminderP);
    modalBodyContainerDiv.appendChild(modalBodyDescriptionDiv);
    modalBodyDescriptionDiv.appendChild(modalBodyDescriptionP1);
    modalBodyDescriptionDiv.appendChild(modalBodyDescriptionTArea);
    modalBodyDescriptionDiv.appendChild(modalBodyDescriptionP2);
    modalContentDiv.appendChild(modalFooterContainerDiv);
    modalFooterContainerDiv.appendChild(modalFooterCancelBtn);

    main.appendChild(modalContainerDiv1);

    modalHeaderH1.innerText = "Event Info";
    modalFooterCancelBtn.innerText = "close";
    modalBodyTitleH2.innerText = "TITLE";
    modalBodyInitialP1.innerText = "Starts on: ";
    modalBodyInitialP2.innerText = "12/12/2023 at 13:45";
    modalBodyEndP1.innerText = "Ends on: ";
    modalBodyEndP2.innerText = "12/12/2023 at 13:45";
    modalBodyReminderP.innerText = "Reminder set 30 minutes before.";
    modalBodyDescriptionP1.innerText = "Description:";
    modalBodyDescriptionP2.innerText = "Type of event: Meeting";

}