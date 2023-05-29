import { setHeader } from "./setHTML.js";
import { checkModalValidity } from "./validateModal.js";
import { setAsideHistoryOfEvents, eventListenerChangeYear } from "./utils.js";
import { setCalendar } from "./setCalendar.js";
window.addEventListener("load", loadPage);
function loadPage() {
    setHeader();
    setAsideHistoryOfEvents();
    eventListenerChangeYear();
    setCalendar();
    checkModalValidity();
}
//# sourceMappingURL=script.js.map