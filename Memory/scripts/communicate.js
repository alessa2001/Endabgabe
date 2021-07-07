"use strict";
var ServerRequest;
(function (ServerRequest) {
    let time;
    let vergleich = [];
    let vergleich2 = [];
    let platz = [];
    async function laden() {
        let formData = new FormData(document.forms[0]);
        let _url = "https://memoryal.herokuapp.com";
        _url = _url + "/laden";
        console.log(_url);
        let query = new URLSearchParams(formData);
        _url = _url + "?" + query.toString();
        let response = await fetch(_url);
        let antwort = await response.json();
        for (let i = 0; i < antwort.length; i++) {
            vergleich.push(parseInt(antwort[i].zeit));
            vergleich2.push(parseInt(antwort[i].zeit));
        }
        vergleich2.sort(function (a, b) {
            return a - b;
        });
        console.log(vergleich, vergleich2);
        for (let i = 0; i < antwort.length; i++) {
            for (let l = 0; l < antwort.length; l++) {
                if (vergleich2[i] == vergleich[l]) {
                    platz.push(l);
                }
            }
        }
        console.log(platz);
        for (let i = 0; i < 10; i++) {
            let ausgabe = document.getElementById("" + (i + 1));
            ausgabe.innerHTML = "<td>" + antwort[platz[i]].name + "</td> <td>" + antwort[platz[i]].zeit + " s</td>";
        }
        time = window.location.toString().split("?")[1];
        if (time != undefined) {
            schicken();
        }
    }
    async function schicken() {
        let nickname = prompt("Dein Nickname", "");
        let _url = "https://memoryal.herokuapp.com";
        //let _url: RequestInfo = "http://localhost:8100";
        _url = _url + "/schicken";
        _url = _url + "?name=" + nickname + "&zeit=" + time;
        console.log(nickname);
        let response = await fetch(_url);
        let benutzer = await response.json();
        console.log(benutzer);
        window.open("../html/score.html", "_self");
    }
    window.addEventListener("load", laden);
})(ServerRequest || (ServerRequest = {}));
//# sourceMappingURL=communicate.js.map