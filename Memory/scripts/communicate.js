"use strict";
//import { ServerRequest } from "./server";
var ServerRequest;
(function (ServerRequest) {
    async function datenAlsHTML() {
        let formData = new FormData(document.forms[0]);
        let url = "https://servertest123somussdasssein.herokuapp.com";
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
        let url = "https://servertest123somussdasssein.herokuapp.com";
        let query = new URLSearchParams(formData);
        //let url:  RequestInfo = "http://localhost:8100";
        url += "/json" + "?" + query.toString();
        let response = await fetch(url);
        let objektJSON = await response.json();
        console.log(objektJSON);
    }
    let htmlButton = document.getElementById("htmlbutton");
    htmlButton.addEventListener("click", datenAlsHTML);
    let jsonButton = document.getElementById("jsonbutton");
    jsonButton.addEventListener("click", datenAlsJSON);
})(ServerRequest || (ServerRequest = {}));
//# sourceMappingURL=communicate.js.map