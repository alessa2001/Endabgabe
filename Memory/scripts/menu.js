"use strict";
window.addEventListener("load", menu);
function menu() {
    for (let i = 0; i < document.getElementsByClassName("nav").length; i++) {
        document.getElementsByClassName("nav")[i].addEventListener("mouseenter", bg);
        document.getElementsByClassName("nav")[i].addEventListener("mouseleave", bg2);
    }
}
function bg(e) {
    let ak = e.target;
    ak.style.backgroundImage = "url(bilder/farbkleks.gif)";
}
function bg2(e) {
    let ak = e.target;
    ak.style.backgroundImage = "url(bilder)";
}
//# sourceMappingURL=menu.js.map