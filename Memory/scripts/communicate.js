"use strict";
//import { ServerRequest } from "./server";
var ServerRequest;
(function (ServerRequest) {
    async function datenAlsHTML() {
        let formData = new FormData(document.forms[0]);
        let url = "https://memoryal.herokuapp.com";
        let query = new URLSearchParams(formData);
        //let url:  RequestInfo = "http://localhost:8100";
        url += "/html" + "?" + query.toString();
        let response = await fetch(url);
        let inhalt = await response.text();
        let ausgabe = document.getElementById("antwort");
        ausgabe.innerHTML = inhalt;
    }
    async function datenAlsJSON() {
        let formData = new FormData(document.forms[0]);
        let url = "https://memoryal.herokuapp.com";
        let query = new URLSearchParams(formData);
        //let url:  RequestInfo = "http://localhost:8100";
        url += "/json" + "?" + query.toString();
        let response = await fetch(url);
        let objektJSON = await response.json();
        let ausgabe = document.getElementById("1");
        ausgabe.innerHTML = "<td>" + objektJSON.vorname + "</td> <td>" + objektJSON.nachname + "</td>";
    }
    let htmlButton = document.getElementById("htmlbutton");
    htmlButton.addEventListener("click", datenAlsHTML);
    let jsonButton = document.getElementById("jsonbutton");
    jsonButton.addEventListener("click", datenAlsJSON);
})(ServerRequest || (ServerRequest = {}));
//# sourceMappingURL=communicate.js.map