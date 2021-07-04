let bilderanz:number = 8;
let bilderSrc:string[] = [];
let src:string;
window.addEventListener("load", bilderladen);

interface ServerAntwort {
    src: string;
}

async function bilderladen(): Promise<void> {
        
    let formData: FormData = new FormData(document.forms[0]);

    let _url: RequestInfo = "https://memoryal.herokuapp.com";
    //let _url: RequestInfo = "http://localhost:8100";

    _url = _url + "/bilder";
    console.log(_url);
    let query: URLSearchParams = new URLSearchParams(<any>formData);
    _url = _url + "?" + query.toString();
    let response: Response = await fetch(_url);
   
    let antwort: ServerAntwort[] = <ServerAntwort[]> await response.json();
    console.log(antwort);
    for(let i:number=0; i<antwort.length;i++){
        bilderSrc.push(antwort[i].src);
    }
    
    generateImage();
}

function generateImage():void{
   
    console.log(bilderSrc);
    for(let i:number=0; i<bilderanz;i++){
    let content : HTMLDivElement = <HTMLDivElement>document.getElementById("contentBilder");
       
        let karte:HTMLDivElement = document.createElement("div");
        let karteBild:HTMLImageElement = document.createElement("img");
        karte.className = "karte"
       /* karte.style.top = ""+Math.random()*(window.innerHeight/(muster-i))+"px";
        karte.style.left = ""+Math.random()*(window.innerWidth/(muster-i))+"px";*/
        karteBild.addEventListener("click", mull);
        karteBild.src = "../bilderSpiel/"+bilderSrc[i];
        karteBild.className= "karteImg";
        karte.id = ""+i;
        if(Math.random()<0.5){
            karte.style.webkitTransform = "rotate("+Math.random()*20+"deg)";
        }
        else{
            karte.style.webkitTransform = "rotate("+Math.random()*-20+"deg)";
        }
       
        content.appendChild(karte);
        karte.appendChild(karteBild);
    }
    let mulleimer : HTMLDivElement = <HTMLDivElement>document.getElementById("mulleimer");
    mulleimer.addEventListener("mouseenter", mullcolor);
    mulleimer.addEventListener("mouseleave", mulloff);
}
function mull(e:Event) : void{
    for(let i:number=0; i<document.getElementsByClassName("karte").length;i++){
        let akBild:HTMLImageElement = <HTMLImageElement>e.target;
        let akBildVergleich:HTMLImageElement = <HTMLImageElement>document.getElementsByClassName("karte")[i].firstChild;
        let ak:HTMLDivElement = <HTMLDivElement>e.target.parentElement;
  
        if(akBild.src.toString() == akBildVergleich.src.toString()){
            
            ak.classList.add('auswahl');
        }
        else{
           akBildVergleich.parentElement.classList.remove("auswahl");
        } 
       
    }
    
}

function mullcolor():void{
    let bgchange : HTMLHtmlElement = <HTMLHtmlElement>document.getElementsByTagName("html")[0];
    bgchange.style.backgroundImage = "url(../bilder/bgAdminHover.png)";
}
function mulloff():void{
    let bgchange : HTMLHtmlElement = <HTMLHtmlElement>document.getElementsByTagName("html")[0];
    bgchange.style.backgroundImage = "url(../bilder/bgAdmin.png)";
}


async function send(): Promise<void> {
    let formData: FormData = new FormData(document.forms[0]);

    let _url: RequestInfo = "https://memoryal.herokuapp.com";
    //let _url: RequestInfo = "http://localhost:8100";
    let query: URLSearchParams = new URLSearchParams(<any>formData);
    _url = _url + "/sendurl";
   
   _url = _url + "?"+ query.toString();
  
    console.log(_url);
    let response: Response = await fetch(_url);
    let benutzer: ServerAntwort = await response.json();
    console.log(benutzer);
  
}
document.querySelector("#send").addEventListener("click", send);