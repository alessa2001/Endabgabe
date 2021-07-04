import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace ServerRequest {

    let _url: string = "mongodb+srv://User1:User1Gisistgeil@clustermuster.u2vhe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    //let _url: string = "mongodb://localhost:27017";
   

    interface ServerAntwort {
        name: string;
        zeit: string;
    }

    console.log("Starting server"); //Starting server wird ausgegeben
    let port: number = Number(process.env.PORT);
    if (!port) //Port == "Hafen"
        port = 8100; //Port wird mit dem Wert 8100 initialisiert

    let server: Http.Server = Http.createServer(); //Server wird erstellt
    server.addListener("request", handleRequest); //Dem Server wird ein Listener angehängt, der die Funktion handleRequest aufruft
    server.addListener("listening", handleListen); //Dem Server wird ein Listener angehängt, der die Funktion handleListen aufruft
    server.listen(port); //Der Server hört auf den port


    function handleListen(): void {
        console.log("Listening"); // Listening wird in der Konsole ausgegeben
    }
    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        console.log("I hear voices!"); //I hear voices wird im Terminal ausgegeben
        _response.setHeader("content-type", "text/html; charset=utf-8"); //Die Eigenschaften des Headers werden festgelegt mit setHeader
        _response.setHeader("Access-Control-Allow-Origin", "*"); //Zugangsberechtigung wird festgelegt, wer hat Zugriff?


        console.log(_request.url); //Die URL vom Request wird ausgegeben
        //Adresse parsen (umwandeln):
        if (_request.url) {

            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            let pathname: string = <string>url.pathname;
            let benutzerBeispiel: ServerAntwort = { name: url.query.name + "", zeit: url.query.zeit + "" };

            if (pathname == "/send") {
                let jsonString: string = JSON.stringify(url.query);

                console.log(jsonString);
                console.log(benutzerBeispiel);

                console.log("Database connected");
                sendData(benutzerBeispiel);

                _response.write(JSON.stringify(benutzerBeispiel));
               

            } else if (pathname == "/paste") {
                _response.write(JSON.stringify( await pasteData()));

            }
        }
        _response.end(); //Die Response wird beendet
    }
    async function sendData(_b: ServerAntwort): Promise<void> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        console.log("Database send");
        let benutzer: Mongo.Collection = mongoClient.db("memoryal").collection("score");
        benutzer.insertOne(_b);

    }
    async function pasteData(): Promise<ServerAntwort[]> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        console.log("Database paste");
        let benutzer: Mongo.Collection = mongoClient.db("memoryal").collection("score");
        let cursor: Mongo.Cursor = benutzer.find();
        let ergebnis: ServerAntwort[] = await cursor.toArray();
        return ergebnis;
    }
}