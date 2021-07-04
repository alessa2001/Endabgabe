window.addEventListener("load", ns);
function ns():void{
    
        document.getElementsByClassName("nav")[0].addEventListener("mouseenter", bg);
        document.getElementsByClassName("nav")[0].addEventListener("mouseleave", bg2);

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