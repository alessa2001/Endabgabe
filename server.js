"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerRequest = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var ServerRequest;
(function (ServerRequest) {
    let _url = "mongodb+srv://User1:User1Gisistgeil@clustermuster.u2vhe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    console.log("Starting server"); //Starting server wird ausgegeben
    let port = Number(process.env.PORT);
    if (!port) //Port == "Hafen"
        port = 8100; //Port wird mit dem Wert 8100 initialisiert
    let server = Http.createServer(); //Server wird erstellt
    server.addListener("request", handleRequest); //Dem Server wird ein Listener angehängt, der die Funktion handleRequest aufruft
    server.addListener("listening", handleListen); //Dem Server wird ein Listener angehängt, der die Funktion handleListen aufruft
    server.listen(port); //Der Server hört auf den port
    function handleListen() {
        console.log("Listening"); // Listening wird in der Konsole ausgegeben
    }
    async function handleRequest(_request, _response) {
        console.log("I hear voices!"); //I hear voices wird im Terminal ausgegeben
        _response.setHeader("content-type", "text/html; charset=utf-8"); //Die Eigenschaften des Headers werden festgelegt mit setHeader
        _response.setHeader("Access-Control-Allow-Origin", "*"); //Zugangsberechtigung wird festgelegt, wer hat Zugriff?
        console.log(_request.url); //Die URL vom Request wird ausgegeben
        //Adresse parsen (umwandeln):
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            let pathname = url.pathname;
            let benutzerBeispiel = { name: url.query.name + "", zeit: url.query.zeit + "" };
            if (pathname == "/send") {
                let jsonString = JSON.stringify(url.query);
                console.log(jsonString);
                console.log(benutzerBeispiel);
                console.log("Database connected");
                sendData(benutzerBeispiel);
                _response.write(JSON.stringify(benutzerBeispiel));
            }
            else if (pathname == "/paste") {
                _response.write(JSON.stringify(await pasteData()));
            }
        }
        _response.end(); //Die Response wird beendet
    }
    async function sendData(_b) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        console.log("Database send");
        let benutzer = mongoClient.db("memoryal").collection("score");
        benutzer.insertOne(_b);
    }
    async function pasteData() {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        console.log("Database paste");
        let benutzer = mongoClient.db("memoryal").collection("score");
        let cursor = benutzer.find();
        let ergebnis = await cursor.toArray();
        return ergebnis;
    }
})(ServerRequest = exports.ServerRequest || (exports.ServerRequest = {}));
//# sourceMappingURL=server.js.map