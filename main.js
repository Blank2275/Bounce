/*
High priority
-Golden Asteroid ✅
-Power ups
    -Extra life✅
    -Unlimited Shield Power✅
Lower priority
-Art
-Sound Effects
-Music
*/
var canvas;
var ctx;
const left = 65;
const right = 68;
const up = 87;
const down = 83; 
const jetPackSpeed = 0.35;

var game = new Game();

var bounceLeft = 1;
var bounceRight = 1;
var bounceUp = 1;
var bounceDown = 1;

var screenHeight = 150;
var screenWidth = 300;

var leftPower = 0;
var rightPower = 0;
var upPower = 0;
var downPower = 0;

var shieldOn = false;
maxCharge = 100;
var shieldPower = maxCharge;

var decayRandomness = 60;

var goldenAsteroidScore = 30;
var goldenAsteroidProbability = 0.15;

//powerups
var extraLifeProbability = 0.001;
var unlimitedPowerProbability = 0.001;
var powerupDecay = 450;

var width = 1600;
var height = 800;
var increase = width / 300;
window.onload = function(){
    resize();
    canvas = document.getElementById("main");
    canvas.width = 1600;
    canvas.height = 800;
    ctx = canvas.getContext("2d");
    animate();
};

function animate(){
    //keyboard input
    if(leftPower){
        game.jetPack(-jetPackSpeed, 0);
    }
    if(rightPower){
        game.jetPack(jetPackSpeed, 0);
    }
    if(upPower){
        game.jetPack(0, -jetPackSpeed);
    }
    if(downPower){
        game.jetPack(0, jetPackSpeed);
    }
    if(!(game.paused || game.scene == "dead") || game.scene == "home"){
        ctx.clearRect(0, 0, width, height);
    }
    game.update();
    requestAnimationFrame(animate);
}
setInterval(function(){game.countDown();}, 1000);