import { setHeader } from "./setHTML.js";
import { checkModalValidity } from "./utils.js";

window.addEventListener("load", loadPage);


function loadPage(): void {
    setHeader();
    checkModalValidity();
}
