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
    document.getElementById("loading").style.opacity = "0";
    document.getElementById("loading").style.display = "none";
    console.log("sd");
    for(let i:number=0; i<bilderSrc.length;i++){
    let content : HTMLDivElement = <HTMLDivElement>document.getElementById("contentBilder");
       
        let karte:HTMLDivElement = document.createElement("div");
        let karteBild:HTMLImageElement = document.createElement("img");
        karte.className = "karte"
       /* karte.style.top = ""+Math.random()*(window.innerHeight/(muster-i))+"px";
        karte.style.left = ""+Math.random()*(window.innerWidth/(muster-i))+"px";*/
        karteBild.addEventListener("click", mull);
        karteBild.src = ""+bilderSrc[i];
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
    mulleimer.addEventListener("click", deletSrc);
    for(let i:number=0;i< document.getElementsByClassName("nav").length;i++){
        document.getElementsByClassName("nav")[i].addEventListener("mouseenter", bg);
        document.getElementsByClassName("nav")[i].addEventListener("mouseleave", bg2);
    }

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
    window.open("../html/admin.html?" ,"_self");
}

async function deletSrc():Promise<void>{

    let _url: RequestInfo = "https://memoryal.herokuapp.com";
    //let _url: RequestInfo = "http://localhost:8100";
    _url = _url + "/delurl";

    let aksrc:HTMLImageElement = <HTMLImageElement>document.getElementsByClassName("auswahl")[0].firstChild;
    

   _url = _url + "?src="+ aksrc.src.toString();
  
    console.log(_url);
    let response: Response = await fetch(_url);
    let benutzer: ServerAntwort = await response.json();
    console.log(benutzer);
    window.open("../html/admin.html?" ,"_self");
}


function bg(e:Event):void{
    window.localStorage.clear();
    console.log(e.target);
    let ak:HTMLImageElement = <HTMLImageElement>e.target.firstElementChild;
    ak.src= "../bilder/farbkleks.gif";
}
function bg2(e:Event):void{
    let ak:HTMLImageElement = <HTMLImageElement>e.target.firstElementChild;
    ak.src= "../bilder/farbkleks.png";
}

document.querySelector("#send").addEventListener("click", send);