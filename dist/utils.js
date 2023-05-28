export function setAsideHistoryOfEvents() {
    const burgerBtn = document.querySelector(".header-burger-history_btn");
    const asideHistoryOfEvents = document.querySelector(".history-events-container_aside");
    if (burgerBtn === null)
        return;
    if (asideHistoryOfEvents === null)
        return;
    const displayBurgerBtn = window.getComputedStyle(burgerBtn).display;
    if (displayBurgerBtn === "none")
        asideHistoryOfEvents.classList.add("show");
    else
        asideHistoryOfEvents.classList.remove("show");
    window.addEventListener("resize", setResizedAsideHistoryOfEvents);
}
function setResizedAsideHistoryOfEvents() {
    const asideHistoryOfEvents = document.querySelector(".history-events-container_aside");
    if (asideHistoryOfEvents === null)
        return;
    if (window.innerWidth > 750)
        asideHistoryOfEvents.classList.add("show");
    else
        asideHistoryOfEvents.classList.remove("show");
}
//# sourceMappingURL=utils.js.map