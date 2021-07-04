//import { ServerRequest } from "./server";

namespace ServerRequest {
    interface ServerAntwort {
        name: string;
        zeit: string;


    }

    async function print(): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);

        let _url: RequestInfo = "https://servertest123somussdasssein.herokuapp.com";
        //let _url: RequestInfo = "http://localhost:8100";

        _url = _url + "/paste";
        console.log(_url);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        _url = _url + "?" + query.toString();
        let response: Response = await fetch(_url);
       
        let antwort: ServerAntwort[] = <ServerAntwort[]> await response.json();
        let ausgabe: HTMLTableCellElement = <HTMLTableCellElement>document.getElementById("1");
    

        ausgabe.innerHTML = "<td>"+antwort[1].name+"</td> <td>"+antwort[1].zeit+"</td>";
        



    }
    async function send(): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);

        let _url: RequestInfo = "https://servertest123somussdasssein.herokuapp.com";
        //let _url: RequestInfo = "http://localhost:8100";

        _url = _url + "/send";

        console.log(_url);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        _url = _url + "?" + query.toString();
        let response: Response = await fetch(_url);
        let benutzer: ServerAntwort = await response.json();
        console.log(benutzer);
    }

    document.querySelector("#print").addEventListener("click", print);
    document.querySelector("#send").addEventListener("click", send);



}


