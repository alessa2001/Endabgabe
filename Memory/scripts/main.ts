let muster:number = 8;
let bilder:string[] = [];
let bilderMe1:string[] = [];
let bilderMe2:string[] = [];
let uberprufen:Event[] = [];
let zeit : Date = new Date;
let zeitEnde : Date;
let gesamtzeit:number;
let counter:number = 0;
window.addEventListener("load", laden);

interface ServerAntwort {
    src: string;
}

async function laden(): Promise<void> {
        
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
        bilder.push(antwort[i].src);
    }
    
    generateGame();
}

function generateGame():void{
    
    for(let i:number=0;i<muster;i++){
       let schreiben:number= Math.round(Math.random()*(bilder.length-1));
       bilderMe1.push(bilder[schreiben]);
       bilderMe2.push(bilder[schreiben]);
        bilder.splice(schreiben,1);
    }
    console.log(bilderMe2);
    for(let i:number=0;i<muster;i++){
       let schreiben:number= Math.round(Math.random()*(bilderMe2.length-1));
       bilderMe1.push(bilderMe2[schreiben]);
       bilderMe2.splice(schreiben,1);
       
    }
    
    console.log(bilderMe1);
    for(let i:number=0; i<muster*2;i++){
    let content : HTMLDivElement = <HTMLDivElement>document.getElementById("spielfeld");
       
        let karte:HTMLDivElement = document.createElement("div");
        let karteBild:HTMLImageElement = document.createElement("img");
        karte.className = "karte"
       /* karte.style.top = ""+Math.random()*(window.innerHeight/(muster-i))+"px";
        karte.style.left = ""+Math.random()*(window.innerWidth/(muster-i))+"px";*/
        karteBild.addEventListener("click", anschauen);
        karteBild.src = ""+bilderMe1[i];
        karteBild.className= "karteImg";
       karte.slot = ""+bilderMe1[i];
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
    for(let i:number=0;i< document.getElementsByClassName("nav").length;i++){
        document.getElementsByClassName("nav")[i].addEventListener("mouseenter", bg);
        document.getElementsByClassName("nav")[i].addEventListener("mouseleave", bg2);
    }

}

function anschauen(e:Event):void{

    if(uberprufen.length<2 ){
      
let ak:HTMLDivElement = <HTMLDivElement>e.target.parentElement;
ak.classList.add('click');
let bildAk:HTMLImageElement = <HTMLImageElement>e.target;
bildAk.classList.add('clickImg');
uberprufen.push(e);
//console.log(e.target);
window.setTimeout(uberprufenf ,4000);
    }
}

function uberprufenf():void{
    if(uberprufen.length>1 ){
        if(uberprufen[0].target.parentElement.slot == uberprufen[1].target.parentElement.slot && uberprufen[0].target.parentElement.id != uberprufen[1].target.parentElement.id ){ 
            
                let mk1:HTMLDivElement = <HTMLDivElement>uberprufen[0].target.parentElement;
                mk1.classList.add('entfernen');
                let mk2:HTMLDivElement = <HTMLDivElement>uberprufen[1].target.parentElement;
                mk2.classList.add('entfernen');
                counter++;
                
        }
        else{
            let mk1:HTMLDivElement = <HTMLDivElement>uberprufen[0].target.parentElement;
            mk1.classList.remove('click');
            let mk2:HTMLDivElement = <HTMLDivElement>uberprufen[1].target.parentElement;
            mk2.classList.remove('click');
    
            let mkB1:HTMLImageElement = <HTMLImageElement>uberprufen[0].target;
            mkB1.classList.remove('clickImg');
            let mkB2:HTMLImageElement = <HTMLImageElement>uberprufen[1].target;
            mkB2.classList.remove('clickImg');
        }
        uberprufen = [];
        gameEnde();
    }
}
function gameEnde():void{
 if(counter == muster){
    zeitEnde = new Date;
    gesamtzeit =  Math.floor((zeitEnde.getTime()-zeit.getTime())/1000);
    window.open("../html/score.html?" + gesamtzeit,"_self");
    
 }

 
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