"use strict";
window.addEventListener("load", menu);
function menu() {
    for (let i = 0; i < document.getElementsByClassName("nav").length; i++) {
        document.getElementsByClassName("nav")[i].addEventListener("mouseenter", bg);
        document.getElementsByClassName("nav")[i].addEventListener("mouseleave", bg2);
    }
}
function bg(e) {
    window.localStorage.clear();
    console.log(e.target);
    let ak = e.target.firstElementChild;
    ak.src = "bilder/farbkleks.gif";
}
function bg2(e) {
    let ak = e.target.firstElementChild;
    ak.src = "bilder/farbkleks.png";
}
//# sourceMappingURL=menu.js.map