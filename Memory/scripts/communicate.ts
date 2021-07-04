//import { ServerRequest } from "./server";

namespace ServerRequest {

    async function datenAlsHTML(): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);
        let url: string = "https://servertest123somussdasssein.herokuapp.com";
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        //let url:  RequestInfo = "http://localhost:8100";
        url += "/html" + "?" + query.toString();
       
        let response: Response = await fetch(url);
        let inhalt: string = await response.text();
     
        
        
        let ausgabe: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("antwort");
    

        ausgabe.innerHTML = inhalt;
       
        


    }


    async function datenAlsJSON(): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);
        let url: string = "https://servertest123somussdasssein.herokuapp.com";
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        //let url:  RequestInfo = "http://localhost:8100";
        url += "/json" + "?" + query.toString();
        
        let response: Response = await fetch(url);
        let objektJSON: Formulardaten = await response.json();
        console.log(objektJSON);

    }

    let htmlButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("htmlbutton");
    htmlButton.addEventListener("click", datenAlsHTML);

    let jsonButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("jsonbutton");
    jsonButton.addEventListener("click", datenAlsJSON);


    interface Formulardaten {
        vorname: string;
        nachname: string;
        nachricht: string;




    }

}

