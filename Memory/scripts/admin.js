"use strict";
let bilderanz = 8;
let bilderSrc = [];
let src;
window.addEventListener("load", bilderladen);
async function bilderladen() {
    let formData = new FormData(document.forms[0]);
    let _url = "https://memoryal.herokuapp.com";
    //let _url: RequestInfo = "http://localhost:8100";
    _url = _url + "/bilder";
    console.log(_url);
    let query = new URLSearchParams(formData);
    _url = _url + "?" + query.toString();
    let response = await fetch(_url);
    let antwort = await response.json();
    console.log(antwort);
    for (let i = 0; i < antwort.length; i++) {
        bilderSrc.push(antwort[i].src);
    }
    generateImage();
}
function generateImage() {
    document.getElementById("loading").style.opacity = "0";
    document.getElementById("loading").style.display = "none";
    console.log("sd");
    for (let i = 0; i < bilderSrc.length; i++) {
        let content = document.getElementById("contentBilder");
        let karte = document.createElement("div");
        let karteBild = document.createElement("img");
        karte.className = "karte";
        /* karte.style.top = ""+Math.random()*(window.innerHeight/(muster-i))+"px";
         karte.style.left = ""+Math.random()*(window.innerWidth/(muster-i))+"px";*/
        karteBild.addEventListener("click", mull);
        karteBild.src = "" + bilderSrc[i];
        karteBild.className = "karteImg";
        karte.id = "" + i;
        if (Math.random() < 0.5) {
            karte.style.webkitTransform = "rotate(" + Math.random() * 20 + "deg)";
        }
        else {
            karte.style.webkitTransform = "rotate(" + Math.random() * -20 + "deg)";
        }
        content.appendChild(karte);
        karte.appendChild(karteBild);
    }
    let mulleimer = document.getElementById("mulleimer");
    mulleimer.addEventListener("mouseenter", mullcolor);
    mulleimer.addEventListener("mouseleave", mulloff);
    mulleimer.addEventListener("click", deletSrc);
    for (let i = 0; i < document.getElementsByClassName("nav").length; i++) {
        document.getElementsByClassName("nav")[i].addEventListener("mouseenter", bg);
        document.getElementsByClassName("nav")[i].addEventListener("mouseleave", bg2);
    }
}
function mull(e) {
    for (let i = 0; i < document.getElementsByClassName("karte").length; i++) {
        let akBild = e.target;
        let akBildVergleich = document.getElementsByClassName("karte")[i].firstChild;
        let ak = e.target.parentElement;
        if (akBild.src.toString() == akBildVergleich.src.toString()) {
            ak.classList.add('auswahl');
        }
        else {
            akBildVergleich.parentElement.classList.remove("auswahl");
        }
    }
}
function mullcolor() {
    let bgchange = document.getElementsByTagName("html")[0];
    bgchange.style.backgroundImage = "url(../bilder/bgAdminHover.png)";
}
function mulloff() {
    let bgchange = document.getElementsByTagName("html")[0];
    bgchange.style.backgroundImage = "url(../bilder/bgAdmin.png)";
}
async function send() {
    let formData = new FormData(document.forms[0]);
    let _url = "https://memoryal.herokuapp.com";
    //let _url: RequestInfo = "http://localhost:8100";
    let query = new URLSearchParams(formData);
    _url = _url + "/sendurl";
    _url = _url + "?" + query.toString();
    console.log(_url);
    let response = await fetch(_url);
    let benutzer = await response.json();
    console.log(benutzer);
    window.open("../html/admin.html?", "_self");
}
async function deletSrc() {
    let _url = "https://memoryal.herokuapp.com";
    //let _url: RequestInfo = "http://localhost:8100";
    _url = _url + "/delurl";
    let aksrc = document.getElementsByClassName("auswahl")[0].firstChild;
    _url = _url + "?src=" + aksrc.src.toString();
    console.log(_url);
    let response = await fetch(_url);
    let benutzer = await response.json();
    console.log(benutzer);
    window.open("../html/admin.html?", "_self");
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
document.querySelector("#send").addEventListener("click", send);
//# sourceMappingURL=admin.js.map