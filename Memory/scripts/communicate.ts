//import { ServerRequest } from "./server";

namespace ServerRequest {

    async function datenAlsHTML(): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);
        let url: string = "https://memoryal.herokuapp.com";
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        //let url:  RequestInfo = "http://localhost:8100";
        url += "/html" + "?" + query.toString();
       
        let response: Response = await fetch(url);
        let inhalt: string = await response.text();
     
        
        
        let ausgabe: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("antwort");
    

        ausgabe.innerHTML = inhalt;
       
        


    }



    let htmlButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("htmlbutton");
    htmlButton.addEventListener("click", datenAlsHTML);




}

