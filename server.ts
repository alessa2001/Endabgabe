import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace ServerRequest {
    console.log("Starting server");
    let port: number = Number(process.env.PORT); 
    if (!port) 
        port = 8100;

    let server: Http.Server = Http.createServer(); 
    server.addListener("request", handleRequest); 
    server.addListener("listening", handleListen);
    server.listen(port);
    
    function handleListen(): void {
        console.log("Listening"); 
    }


    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
          console.log("empfange daten"); 
        console.log(_request.url);
      
        _response.setHeader("Access-Control-Allow-Origin", "*");
        let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);

        if (url.pathname == "/html") {
            _response.setHeader("content-type", "text/html; charset=utf-8");
            for (let key in url.query) {
                _response.write(key + ":" + url.query[key] );

            }
        }
       
        _response.end();
    }
  
}
//mongodb+srv://User1:User1Gisistgeil@clustermuster.u2vhe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority