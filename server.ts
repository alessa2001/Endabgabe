import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace ServerRequest {

    let orders: Mongo.Collection;
    
    let port: number = Number(process.env.PORT); 
    if (!port) 
        port = 8100;

        let databaseUrl: string = "https://mongodbnetbrowser.herokuapp.com/?u=User1&p=User1Gisistgeil&a=clustermuster.u2vhe.mongodb.net&n=memoryal&c=score";

    let server: Http.Server = Http.createServer(); 
    server.addListener("request", handleRequest); 
    server.addListener("listening", handleListen);
    server.listen(port);
    
    connectToDatabase(databaseUrl);

    function handleListen(): void {
        console.log("Listening"); 
    }


    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
          console.log("empfange daten"); 
        
      
        _response.setHeader("Access-Control-Allow-Origin", "*");
        let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);

    
        if (url.pathname == "/json") {
            _response.setHeader("content-type", "application/json"); 
            let jsonString: String = JSON.stringify(url.query);
            _response.write(jsonString);

           
        }
        _response.end();
    }
  async function connectToDatabase(_url: string): Promise<void>{
      let options: Mongo.MongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true};
      let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
      await mongoClient.connect();
      orders = mongoClient.db("memoryal").collection("score");
      console.log(orders != undefined);
  }
}
//mongodb+srv://User1:User1Gisistgeil@clustermuster.u2vhe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority