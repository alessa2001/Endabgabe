"use strict";
let muster = 8;
let bilder = [];
let bilderMe1 = [];
let bilderMe2 = [];
let uberprufen = [];
let zeit = new Date;
let zeitEnde;
let gesamtzeit;
let counter = 0;
window.addEventListener("load", laden);
async function laden() {
    let formData = new FormData(document.forms[0]);
    let _url = "https://memoryal.herokuapp.com";
    _url = _url + "/bilder";
    console.log(_url);
    let query = new URLSearchParams(formData);
    _url = _url + "?" + query.toString();
    let response = await fetch(_url);
    let antwort = await response.json();
    console.log(antwort);
    for (let i = 0; i < antwort.length; i++) {
        bilder.push(antwort[i].src);
    }
    generateGame();
}
function generateGame() {
    document.getElementById("loading").style.opacity = "0";
    document.getElementById("loading").style.display = "none";
    for (let i = 0; i < muster; i++) {
        let schreiben = Math.round(Math.random() * (bilder.length - 1));
        bilderMe1.push(bilder[schreiben]);
        bilderMe2.push(bilder[schreiben]);
        bilder.splice(schreiben, 1);
    }
    console.log(bilderMe2);
    for (let i = 0; i < muster; i++) {
        let schreiben = Math.round(Math.random() * (bilderMe2.length - 1));
        bilderMe1.push(bilderMe2[schreiben]);
        bilderMe2.splice(schreiben, 1);
    }
    console.log(bilderMe1);
    for (let i = 0; i < muster * 2; i++) {
        let content = document.getElementById("spielfeld");
        let karte = document.createElement("div");
        let karteBild = document.createElement("img");
        karte.className = "karte";
        /* karte.style.top = ""+Math.random()*(window.innerHeight/(muster-i))+"px";
         karte.style.left = ""+Math.random()*(window.innerWidth/(muster-i))+"px";*/
        karteBild.addEventListener("click", anschauen);
        karteBild.src = "" + bilderMe1[i];
        karteBild.className = "karteImg";
        karte.slot = "" + bilderMe1[i];
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
    for (let i = 0; i < document.getElementsByClassName("nav").length; i++) {
        document.getElementsByClassName("nav")[i].addEventListener("mouseenter", bg);
        document.getElementsByClassName("nav")[i].addEventListener("mouseleave", bg2);
    }
}
function anschauen(e) {
    if (uberprufen.length < 2) {
        let ak = e.target.parentElement;
        ak.classList.add('click');
        let bildAk = e.target;
        bildAk.classList.add('clickImg');
        uberprufen.push(e);
        //console.log(e.target);
        window.setTimeout(uberprufenf, 4000);
    }
}
function uberprufenf() {
    if (uberprufen.length > 1) {
        if (uberprufen[0].target.parentElement.slot == uberprufen[1].target.parentElement.slot && uberprufen[0].target.parentElement.id != uberprufen[1].target.parentElement.id) {
            let mk1 = uberprufen[0].target.parentElement;
            mk1.classList.add('entfernen');
            let mk2 = uberprufen[1].target.parentElement;
            mk2.classList.add('entfernen');
            counter++;
        }
        else {
            let mk1 = uberprufen[0].target.parentElement;
            mk1.classList.remove('click');
            let mk2 = uberprufen[1].target.parentElement;
            mk2.classList.remove('click');
            let mkB1 = uberprufen[0].target;
            mkB1.classList.remove('clickImg');
            let mkB2 = uberprufen[1].target;
            mkB2.classList.remove('clickImg');
        }
        uberprufen = [];
        gameEnde();
    }
}
function gameEnde() {
    if (counter == muster) {
        zeitEnde = new Date;
        gesamtzeit = Math.floor((zeitEnde.getTime() - zeit.getTime()) / 1000);
        window.open("../html/score.html?" + gesamtzeit, "_self");
    }
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
//# sourceMappingURL=main.js.map