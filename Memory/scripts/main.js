"use strict";
let muster = 8;
let bilder = ["blume.jpg", "blume2.jpg", "blume3.jpg", "blume4.jpg", "blume5.jpg", "blume6.jpg", "blume7.jpg", "blume8.jpg"];
let bilderMe1 = [];
let bilderMe2 = [];
let uberprufen = [];
let zeit = new Date;
let zeitEnde;
let gesamtzeit;
let counter = 0;
window.addEventListener("load", generateGame);
function generateGame() {
    for (let i = 0; i < muster; i++) {
        let schreiben = Math.round(Math.random() * (bilder.length - 1));
        bilderMe1.push(bilder[schreiben]);
        bilderMe2.push(bilder[schreiben]);
        bilder.splice(schreiben, 1);
    }
    for (let i = 0; i < muster; i++) {
        let schreiben = Math.random() * bilder.length;
        bilderMe1.push(bilderMe2[schreiben]);
        bilderMe2.splice(schreiben, 1);
    }
    console.log(bilderMe1);
    for (let i = 0; i < muster * 2; i++) {
        let content = document.getElementById("spielfeld");
        let karte = document.createElement("div");
        karte.className = "karte";
        /* karte.style.top = ""+Math.random()*(window.innerHeight/(muster-i))+"px";
         karte.style.left = ""+Math.random()*(window.innerWidth/(muster-i))+"px";*/
        karte.addEventListener("click", anschauen);
        karte.style.backgroundImage = "url(../bilderSpiel/" + bilderMe1[i] + ")";
        karte.title = "" + bilderMe1[i];
        karte.id = "" + i;
        if (Math.random() < 0.5) {
            karte.style.webkitTransform = "rotate(" + Math.random() * 20 + "deg)";
        }
        else {
            karte.style.webkitTransform = "rotate(" + Math.random() * -20 + "deg)";
        }
        content.appendChild(karte);
    }
}
function anschauen(e) {
    zeitEnde = new Date;
    gesamtzeit = Math.floor((zeitEnde.getTime() - zeit.getTime()) / 1000);
    window.open("file:///C:/Users/dalal/Alessa/Studium/Semester_2/GIS/GIS-SoSe.2021/Memory/html/score.html?" + gesamtzeit);
    if (uberprufen.length < 2) {
        let ak = e.target;
        ak.classList.add('click');
        uberprufen.push(e);
        console.log(e.target.title);
        window.setTimeout(uberprufenf, 4000);
    }
}
function uberprufenf() {
    if (uberprufen.length > 1) {
        if (uberprufen[0].target.title == uberprufen[1].target.title && uberprufen[0].target.id != uberprufen[1].target.id) {
            let mk1 = uberprufen[0].target;
            mk1.classList.add('entfernen');
            let mk2 = uberprufen[1].target;
            mk2.classList.add('entfernen');
            counter++;
        }
        else {
            let mk1 = uberprufen[0].target;
            mk1.classList.remove('click');
            let mk2 = uberprufen[1].target;
            mk2.classList.remove('click');
        }
        uberprufen = [];
        gameEnde();
    }
}
function gameEnde() {
    if (counter == muster) {
        zeitEnde = new Date;
        gesamtzeit = Math.floor((zeitEnde.getTime() - zeit.getTime()) / 1000);
        window.open("file:///C:/Users/dalal/Alessa/Studium/Semester_2/GIS/GIS-SoSe.2021/Memory/html/score.html?" + gesamtzeit);
    }
}
//# sourceMappingURL=main.js.map