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
    }
    if(event.keyCode == 13){ 
        if(!(game.scene == "playing")){
            game.restart();
            game.scene = "playing";
        }
    }
    if(event.keyCode == 27){
        game.paused = !game.paused;
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
}

function goHome(){
    game.scene = "home"
}

function restart(){
    game.restart();
    game.scene = "playing";
}

function setDifficulty(difficulty){
    game.setDifficulty(difficulty);
}

function setGamemode(gamemode){
    game.setGamemode(gamemode);
}