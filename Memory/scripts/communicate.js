"use strict";
//import { ServerRequest } from "./server";
var ServerRequest;
(function (ServerRequest) {
    async function print() {
        let formData = new FormData(document.forms[0]);
        let _url = "https://servertest123somussdasssein.herokuapp.com";
        //let _url: RequestInfo = "http://localhost:8100";
        _url = _url + "/paste";
        console.log(_url);
        let query = new URLSearchParams(formData);
        _url = _url + "?" + query.toString();
        let response = await fetch(_url);
        let antwort = await response.json();
        let ausgabe = document.getElementById("1");
        ausgabe.innerHTML = "<td>" + antwort[1].name + "</td> <td>" + antwort[1].zeit + "</td>";
    }
    async function send() {
        let formData = new FormData(document.forms[0]);
        let _url = "https://servertest123somussdasssein.herokuapp.com";
        //let _url: RequestInfo = "http://localhost:8100";
        _url = _url + "/send";
        console.log(_url);
        let query = new URLSearchParams(formData);
        _url = _url + "?" + query.toString();
        let response = await fetch(_url);
        let benutzer = await response.json();
        console.log(benutzer);
    }
    document.querySelector("#print").addEventListener("click", print);
    document.querySelector("#send").addEventListener("click", send);
})(ServerRequest || (ServerRequest = {}));
//# sourceMappingURL=communicate.js.map