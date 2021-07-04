window.addEventListener("load", menu);
function menu():void{
    
    for(let i : number = 0; i<document.getElementsByClassName("nav").length;i++){
        document.getElementsByClassName("nav")[i].addEventListener("mouseenter", bg);
        document.getElementsByClassName("nav")[i].addEventListener("mouseleave", bg2);
      
    }
    }
    function bg(e:Event):void{
        window.localStorage.clear();
        console.log(e.target);
        let ak:HTMLImageElement = <HTMLImageElement>e.target.firstElementChild;
        ak.src= "bilder/farbkleks.gif";
    }
    function bg2(e:Event):void{
        let ak:HTMLImageElement = <HTMLImageElement>e.target.firstElementChild;
        ak.src= "bilder/farbkleks.png";
    }