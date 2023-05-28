import { setHeader } from "./setHTML.js";
import { checkModalValidity } from "./validateModal.js";
import { setAsideHistoryOfEvents } from "./utils.js";
window.addEventListener("load", loadPage);
function loadPage() {
    setHeader();
    checkModalValidity();
    setAsideHistoryOfEvents();
}
//# sourceMappingURL=script.js.map