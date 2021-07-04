"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerRequest = void 0;
const Http = require("http");
const Url = require("url");
var ServerRequest;
(function (ServerRequest) {
    console.log("Starting server");
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    let server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);
    function handleListen() {
        console.log("Listening");
    }
    function handleRequest(_request, _response) {
        console.log("empfange daten");
        console.log(_request.url);
        _response.setHeader("Access-Control-Allow-Origin", "*");
        let url = Url.parse(_request.url, true);
        if (url.pathname == "/html") {
            _response.setHeader("content-type", "text/html; charset=utf-8");
            for (let key in url.query) {
                _response.write(key + ":" + url.query[key]);
            }
        }
        _response.end();
    }
})(ServerRequest = exports.ServerRequest || (exports.ServerRequest = {}));
//mongodb+srv://User1:User1Gisistgeil@clustermuster.u2vhe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//# sourceMappingURL=server.js.map