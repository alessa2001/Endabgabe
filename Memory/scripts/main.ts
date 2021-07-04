let muster:number = 8;
let bilder:string[] = ["blume.jpg","blume2.jpg","blume3.jpg","blume4.jpg","blume5.jpg","blume6.jpg","blume7.jpg","blume8.jpg"];
let bilderMe1:string[] = [];
let bilderMe2:string[] = [];
let uberprufen:Event[] = [];
let zeit : Date = new Date;
let zeitEnde : Date;
let gesamtzeit:number;
let counter:number = 0;
window.addEventListener("load", generateGame);
function generateGame():void{
    
    for(let i:number=0;i<muster;i++){
       let schreiben:number= Math.round(Math.random()*(bilder.length-1));
       bilderMe1.push(bilder[schreiben]);
       bilderMe2.push(bilder[schreiben]);
        bilder.splice(schreiben,1);
    }
    for(let i:number=0;i<muster;i++){
       let schreiben:number= Math.random()*bilder.length;
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
        karteBild.src = "../bilderSpiel/"+bilderMe1[i];
        karteBild.className= "karteImg";
       karte.title = ""+bilderMe1[i];
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
        if(uberprufen[0].target.parentElement.title == uberprufen[1].target.parentElement.title && uberprufen[0].target.parentElement.id != uberprufen[1].target.parentElement.id ){ 
            
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
    window.open("file:///C:/Users/dalal/Alessa/Studium/Semester_2/GIS/GIS-SoSe.2021/Memory/html/score.html?" + gesamtzeit,"_blank");
    
 }
}