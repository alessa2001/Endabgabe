"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerRequest = void 0;
const Http = require("http");
const Url = require("url");
var ServerRequest;
(function (ServerRequest) {
    console.log("Starting server"); //"Starting server" wird in der Konsole ausgegeben
    let port = Number(process.env.PORT); //es wird eine neue Variable "Port" angelegt
    if (!port) //stellt sozusagen eine Art Hafen dar
        port = 8100; //Der Port(Hafen) wird mit "8100" initialisiert
    let server = Http.createServer(); //hier wird ein neuer Server erstellt
    server.addListener("request", handleRequest); //der Server bekommt einen Listener dazu, welcher die Funktion handleRequest aufruft
    server.addListener("listening", handleListen); //ebenfalls wird ein zweiter Listener angehängt, der die Funktion handleListen aufruft
    server.listen(port); // Der Server hört sozusagen dem vorher definierten Port zu
    // Hier wird der Server generiert/erzeugt. Unter anderem werden ihm ein Port und ein Listener zugewiesen, der auf den Eingang von Dateien wartet.
    function handleListen() {
        console.log("Listening"); //Es wird Listening in der Konsole ausgegeben
    }
    function handleRequest(_request, _response) {
        console.log("I hear voices"); //es wird "I hear voices" in der Konsole ausgegeben
        console.log(_request.url); //URL vom Request wird in der Konsole ausgegeben
        // Eigenschaften des Headers werden mit setHeader festgelegt
        _response.setHeader("Access-Control-Allow-Origin", "*"); // es wird festegelgt wer darauf zugreifen darf
        let url = Url.parse(_request.url, true);
        if (url.pathname == "/html") {
            _response.setHeader("content-type", "text/html; charset=utf-8");
            for (let key in url.query) {
                _response.write(key + ":" + url.query[key] + "</br>");
            }
        }
        if (url.pathname == "/json") {
            _response.setHeader("content-type", "application/json");
            let jsonString = JSON.stringify(url.query);
            _response.write(jsonString);
        }
        _response.end();
    }
})(ServerRequest = exports.ServerRequest || (exports.ServerRequest = {}));
//mongodb+srv://User1:User1Gisistgeil@clustermuster.u2vhe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//# sourceMappingURL=server.js.map