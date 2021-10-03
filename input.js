function keyDown(event){
    if(event.keyCode == left){
        leftPower = 1;
    }  
    if(event.keyCode == right){
        rightPower = 1;
    }  
    if(event.keyCode == up){
        upPower = 1;
    }  
    if(event.keyCode == down){
        downPower = 1;
    }  
    //space
    if(event.keyCode == 32){
        shieldOn = true;
        if(event.target == document.body){
            event.preventDefault();
        }
    }
    if(event.keyCode == 13){ 
        if(!(game.scene == "playing")){
            game.restart();
            game.scene = "playing";
        }
    }
    if(event.keyCode == 27){
        game.paused = !game.paused;
        if(game.scene == "tutorial")
            game.scene = "home";
    }
}
function keyUp(event){
    if(event.keyCode == left){
        leftPower = 0;
    }  
    if(event.keyCode == right){
        rightPower = 0;
    }  
    if(event.keyCode == up){
        upPower = 0;
    }  
    if(event.keyCode == down){
        downPower = 0;
    }  
    if(event.keyCode == 32){
        shieldOn = false;
    }
}

function resize(){
    var main = document.getElementById("main");
    main.style.height = main.clientWidth / 2 + "px";
    showMobile();
}

function goHome(){
    game.scene = "home"
}

function restart(){
    game.restart();
    game.scene = "playing";
}

function tutorial(){
    game.restart();
    game.scene = "tutorial";
}

function setDifficulty(difficulty){
    game.setDifficulty(difficulty);
}

function setGamemode(gamemode){
    game.setGamemode(gamemode);
}

function touchmove(e){
    e.preventDefault();
    game.setTouchLocation(e.touches[0].clientX, e.touches[0].clientY);
}

function shieldUp(e){
    shieldOn = true;
}

function shieldDown(e){
    shieldOn = false;
    if(game.scene == "dead" || game.scene == "home"){
        game.restart();
        game.scene = "playing";
    }
}

function sfx(e){
    soundEffectsOn = !soundEffectsOn;
}

function showMobile(){
    if (navigator.userAgent.match(/Android/i)
                || navigator.userAgent.match(/webOS/i)
                || navigator.userAgent.match(/iPhone/i) 
                || navigator.userAgent.match(/iPad/i) 
                || navigator.userAgent.match(/iPod/i)
                || navigator.userAgent.match(/BlackBerry/i)
                || navigator.userAgent.match(/Windows Phone/i)) {
        document.getElementById("mobile").style.display = "block";
        document.getElementById("mobile").style.pointerEvents = "auto";
    }
    else{
        document.getElementById("mobile").style.display = "none";
        document.getElementById("mobile").style.pointerEvents = "none";
    }
}