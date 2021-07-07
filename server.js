"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerRequest = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var ServerRequest;
(function (ServerRequest) {
    let _url = "mongodb+srv://User1:User1Gisistgeil@clustermuster.u2vhe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    let server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);
    function handleListen() {
    }
    async function handleRequest(_request, _response) {
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        console.log(_request.url);
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            let pathname = url.pathname;
            let benutzerBeispiel = { name: url.query.name + "", zeit: url.query.zeit + "" };
            let bildSrc = { src: url.query.src + "" };
            if (pathname == "/schicken") {
                sendData(benutzerBeispiel);
                _response.write(JSON.stringify(benutzerBeispiel));
            }
            else if (pathname == "/sendurl") {
                let jsonString = JSON.stringify(url.query);
                console.log(jsonString);
                console.log(bildSrc);
                console.log("Database connected");
                sendDataUrl(bildSrc);
                _response.write(JSON.stringify(benutzerBeispiel));
            }
            else if (pathname == "/delurl") {
                let jsonString = JSON.stringify(url.query);
                console.log(jsonString);
                console.log(bildSrc);
                console.log("Database connected");
                delDataUrl(bildSrc);
                _response.write(JSON.stringify(benutzerBeispiel));
            }
            else if (pathname == "/laden") {
                _response.write(JSON.stringify(await pasteData()));
            }
            else if (pathname == "/bilder") {
                _response.write(JSON.stringify(await pasteDataBilder()));
            }
        }
        _response.end();
    }
    async function sendData(_b) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        console.log("Database send");
        let benutzer = mongoClient.db("memoryal").collection("score");
        benutzer.insertOne(_b);
    }
    async function sendDataUrl(_b) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        console.log("Database send");
        let benutzer = mongoClient.db("memoryal").collection("src");
        benutzer.insertOne(_b);
    }
    async function delDataUrl(_b) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        console.log("Database send");
        let benutzer = mongoClient.db("memoryal").collection("src");
        benutzer.deleteOne(_b);
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
    async function pasteDataBilder() {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        console.log("Database paste");
        let benutzer = mongoClient.db("memoryal").collection("src");
        let cursor = benutzer.find();
        let ergebnis = await cursor.toArray();
        return ergebnis;
    }
})(ServerRequest = exports.ServerRequest || (exports.ServerRequest = {}));
//# sourceMappingURL=server.js.map