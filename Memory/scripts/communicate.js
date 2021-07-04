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
    let htmlButton = document.getElementById("htmlbutton");
    htmlButton.addEventListener("click", datenAlsHTML);
})(ServerRequest || (ServerRequest = {}));
//# sourceMappingURL=communicate.js.map