window.addEventListener("load", menu);
function menu():void{
    
    for(let i : number = 0; i<document.getElementsByClassName("nav").length;i++){
        document.getElementsByClassName("nav")[i].addEventListener("mouseenter", bg);
        document.getElementsByClassName("nav")[i].addEventListener("mouseleave", bg2);
      
    }
    }
    function bg(e:Event):void{
        let ak:HTMLElement = <HTMLElement>e.target;
        ak.style.backgroundImage = "url(bilder/farbkleks.gif)";
    }
    function bg2(e:Event):void{
        let ak:HTMLElement = <HTMLElement>e.target;
        ak.style.backgroundImage = "url(bilder)";
    }