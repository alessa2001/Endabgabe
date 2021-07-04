//import { ServerRequest } from "./server";

namespace ServerRequest {
    interface ServerAntwort {
        name: string;
        zeit: string;
    }
    let time:string;
    let vergleich:number[] = [];
    let vergleich2:number[] = [];
    let platz:number[] = [];

    async function print(): Promise<void> {
        
        let formData: FormData = new FormData(document.forms[0]);

        let _url: RequestInfo = "https://memoryal.herokuapp.com";
        //let _url: RequestInfo = "http://localhost:8100";

        _url = _url + "/paste";
        console.log(_url);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        _url = _url + "?" + query.toString();
        let response: Response = await fetch(_url);
       
        let antwort: ServerAntwort[] = <ServerAntwort[]> await response.json();
        for(let i:number = 0; i<antwort.length; i++){
            vergleich.push(parseInt(antwort[i].zeit));
            vergleich2.push(parseInt(antwort[i].zeit));
        }
        
        vergleich2.sort(function(a,b) {
            return a - b;
        });
        console.log(vergleich,vergleich2);
        for(let i:number = 0; i<antwort.length; i++){
            for(let l:number = 0; l<antwort.length; l++){
                if(vergleich2[i]==vergleich[l]){
                    platz.push(l);
                }
        }
    }
    console.log(platz);
   
        for(let i:number = 0; i<10;i++){
            let ausgabe: HTMLTableCellElement = <HTMLTableCellElement>document.getElementById(""+(i+1));
           
            ausgabe.innerHTML = "<td>"+antwort[ platz[i]].name+"</td> <td>"+antwort[platz[i]].zeit+" s</td>";
        }
        time = window.location.toString().split("?")[1];
      if(time != undefined){
          send();
      }
    }
    async function send(): Promise<void> {
        let nickname = prompt("Dein Nickname", "");

        let _url: RequestInfo = "https://memoryal.herokuapp.com";
        //let _url: RequestInfo = "http://localhost:8100";

        _url = _url + "/send";
       
       _url = _url + "?src=" + nickname + "&zeit="+time;
      
        console.log(_url);
        let response: Response = await fetch(_url);
        let benutzer: ServerAntwort = await response.json();
        console.log(benutzer);
        window.open("../html/score.html","_self");
    }


    window.addEventListener("load", print);



}


