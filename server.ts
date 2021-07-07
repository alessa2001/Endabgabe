import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace ServerRequest {

    let _url: string = "mongodb+srv://User1:User1Gisistgeil@clustermuster.u2vhe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
   

    interface ScoreDaten {
        name: string;
        zeit: string;
    }

    interface BildSrc {
        src: string;
    }

    let port: number = Number(process.env.PORT);
    if (!port)
        port = 8100; 

    let server: Http.Server = Http.createServer(); 
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen); 
    server.listen(port); 


    function handleListen(): void {
    }
    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        _response.setHeader("content-type", "text/html; charset=utf-8"); 
        _response.setHeader("Access-Control-Allow-Origin", "*"); 


        console.log(_request.url); 

        if (_request.url) {

            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            let pathname: string = <string>url.pathname;
            let benutzerBeispiel: ScoreDaten = { name: url.query.name + "", zeit: url.query.zeit + "" };
            let bildSrc: BildSrc = { src: url.query.src+""};
            if (pathname == "/schicken") {
               
                sendData(benutzerBeispiel);

                _response.write(JSON.stringify(benutzerBeispiel));
               

            }   else if (pathname == "/sendurl") {
                let jsonString: string = JSON.stringify(url.query);

                console.log(jsonString);
                console.log(bildSrc);

                console.log("Database connected");
                sendDataUrl(bildSrc);

                _response.write(JSON.stringify(benutzerBeispiel));
               

            }else if (pathname == "/delurl") {
                let jsonString: string = JSON.stringify(url.query);

                console.log(jsonString);
                console.log(bildSrc);

                console.log("Database connected");
               delDataUrl(bildSrc);

                _response.write(JSON.stringify(benutzerBeispiel));
               

            } else if (pathname == "/laden") {
                _response.write(JSON.stringify( await pasteData()));

            }
            else if (pathname == "/bilder") {
                _response.write(JSON.stringify( await pasteDataBilder()));

            }
        }
        _response.end(); 
    }
    async function sendData(_b: ScoreDaten): Promise<void> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        console.log("Database send");
        let benutzer: Mongo.Collection = mongoClient.db("memoryal").collection("score");
        benutzer.insertOne(_b);

    }
    async function sendDataUrl(_b: BildSrc): Promise<void> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        console.log("Database send");
        let benutzer: Mongo.Collection = mongoClient.db("memoryal").collection("src");
        benutzer.insertOne(_b);

    }
    async function delDataUrl(_b: BildSrc): Promise<void> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        console.log("Database send");
        let benutzer: Mongo.Collection = mongoClient.db("memoryal").collection("src");
        benutzer.deleteOne(_b);

    }
    async function pasteData(): Promise<ScoreDaten[]> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        console.log("Database paste");
        let benutzer: Mongo.Collection = mongoClient.db("memoryal").collection("score");
        let cursor: Mongo.Cursor = benutzer.find();
        let ergebnis: ScoreDaten[] = await cursor.toArray();
        return ergebnis;
    }

    async function pasteDataBilder(): Promise<ScoreDaten[]> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        console.log("Database paste");
        let benutzer: Mongo.Collection = mongoClient.db("memoryal").collection("src");
        let cursor: Mongo.Cursor = benutzer.find();
        let ergebnis: ScoreDaten[] = await cursor.toArray();
        return ergebnis;
    }
}