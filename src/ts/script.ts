import { setHeader } from "./setHTML.js";
import { checkModalValidity } from "./validateModal.js";

window.addEventListener("load", loadPage);


function loadPage(): void {
    setHeader();
    checkModalValidity();
}
