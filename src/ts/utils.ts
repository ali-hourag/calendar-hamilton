
/**
 * This function is responsible for fixing the aside that shows the
 * history of events depending on which screen size we are on. So,
 * if the burger button is displayed, it means that we are on a device <= 750 px
 * and the aside does not have to be showed since it will be shown by clicking on the
 * burger button.
 * Otherwise, it is shown always.
 */
export function setAsideHistoryOfEvents(): void {
    const burgerBtn: (HTMLButtonElement | null) = document.querySelector(".header-burger-history_btn");
    const asideHistoryOfEvents: (HTMLElement | null) = document.querySelector(".history-events-container_aside");
    if (burgerBtn === null) return;
    if (asideHistoryOfEvents === null) return;

    const displayBurgerBtn: string = window.getComputedStyle(burgerBtn).display;
    if (displayBurgerBtn === "none") asideHistoryOfEvents.classList.add("show");
    else asideHistoryOfEvents.classList.remove("show");

    window.addEventListener("resize", setResizedAsideHistoryOfEvents);
}
/**
 * This function does the same as @function setAsideHistoryOfEvents()
 * The difference is that the other one is called when the page is on load.
 * And this one when the screen is resized.
 */
function setResizedAsideHistoryOfEvents(): void {
    const asideHistoryOfEvents: (HTMLElement | null) = document.querySelector(".history-events-container_aside");
    if (asideHistoryOfEvents === null) return;
    if (window.innerWidth > 750) asideHistoryOfEvents.classList.add("show");
    else asideHistoryOfEvents.classList.remove("show");
}