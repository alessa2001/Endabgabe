"use strict";
window.addEventListener("load", ns);
function ns() {
    document.getElementsByClassName("nav")[0].addEventListener("mouseenter", bg);
    document.getElementsByClassName("nav")[0].addEventListener("mouseleave", bg2);
}
function bg(e) {
    window.localStorage.clear();
    console.log(e.target);
    let ak = e.target.firstElementChild;
    ak.src = "../bilder/farbkleks.gif";
}
function bg2(e) {
    let ak = e.target.firstElementChild;
    ak.src = "../bilder/farbkleks.png";
}
//# sourceMappingURL=score.js.map