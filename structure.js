function Game(){
    //scenes: playing, dead, home
    this.scene = "home";
    this.numAsteroids = 6;
    this.extraLifeProbability = 0.001;
    this.unlimitedPowerProbability = 0.001;
    this.powerupDecay = 450;
    this.goldenAsteroidProbability = 0.15;
    this.decayMultiplier = 1;
    this.homeAsteroids = [];
    this.homeAsteroidCount = 10;
    this.homeGoldenAsteroidProbability = 0.35;
    this.gamemode = "Classic";
    this.maxTimer = 60;
    this.restart = function(){
        this.player = new Player(150 * increase, 75 * increase, 0, 0);
        this.asteroidCount = 5;
        this.asteroids = [];
        this.powerups = [];
        this.score = 0;
        this.energyPowerUp = 0;
        this.extraLives = 0;
        this.paused = false;
        this.timer = this.maxTimer;
    }
    this.restart();
    this.update = function(){
        document.getElementById("restart").style.display = "none";
        document.getElementById("restart").style.pointerEvents = "none";
        document.getElementById("difficulty-select").style.display = "none";
        document.getElementById("difficulty-select").style.pointerEvents = "none";
        document.getElementById("gamemode-select").style.display = "none";
        document.getElementById("gamemode-select").style.pointerEvents = "none";
        document.getElementById("restart").style.top = document.getElementById("main").clientHeight * 0.66 + "px";
        if(this.scene == "playing"){
            if(!this.paused){
                document.getElementById("countdown").style.display = "none";
                if(this.gamemode == "Survival"){
                    document.getElementById("countdown").style.display = "block";
                }
                shieldPower += 1;
                if(shieldPower > maxCharge){
                    shieldPower = maxCharge;
                }
                if(shieldOn){
                    if(this.energyPowerUp <= 0){
                        shieldPower -= 2;
                    }
                    if(shieldPower < 0){
                        shieldOn = false;
                        shieldPower = 0;
                    }
                }
                drawHealthBar(0, 0, 50 * increase, 20 * increase, "rgb(25, 50, 250)", shieldPower * (1 / maxCharge));
                if(shieldOn){
                    ctx.fillStyle = "rgb(25, 50, 250)";
                }
                else{
                    ctx.fillStyle = "black";
                }
                ctx.beginPath();
                ctx.arc(13 * increase, 40 * increase, 10 * increase, 0, Math.PI * 2);
                ctx.fill();
                drawHealthBar(0, 130 * increase, 50 * increase, 20 * increase, "rgb(25, 50, 250)", this.energyPowerUp * (1 / 600));
                ctx.fillText("Extra Lives: " + this.extraLives, 0, 115 * increase);
                if(Math.random() < this.extraLifeProbability){
                    this.powerups.push(new Powerup(Math.random() * width, Math.random() * height, Math.random() * 2 -1, Math.random() * 2 - 1, "Extra Life", this.powerupDecay));
                }
                if(Math.random() < this.unlimitedPowerProbability){
                    this.powerups.push(new Powerup(Math.random() * width, Math.random() * height, Math.random() * 2 -1, Math.random() * 2 - 1, "Unlimited Power", this.powerupDecay));
                }
                if(shieldOn){
                    let x = this.player.x + 3.5 * increase;
                    let y = this.player.y + 3.5 * increase;
                    let size = this.player.size;
                    ctx.strokeStyle = "rgb(25, 50, 250)";
                    ctx.lineWidth = 3 * increase;
                    ctx.beginPath();
                    ctx.arc(x, y, (size + 3.5) * increase, Math.PI * (3/2), Math.PI * 2 - shieldPower * (Math.PI * 2 / maxCharge) + Math.PI * (3/2), counterclockwise = true);
                    ctx.stroke();
                }
                this.player.updateVelocities();
                this.player.updatePosition();
                this.player.display();

                ctx.fillStyle = "white";
                ctx.fillText("Score: " + this.score, 5 * increase, 65 * increase);

                if(this.asteroids.length < this.asteroidCount){
                    var gold = Math.random() < this.goldenAsteroidProbability;
                    this.asteroids.push(new Asteroid(true, gold, this.player.x, this.player.y, 0, 0));
                }
                if(this.energyPowerUp > 0){
                    this.energyPowerUp -= 1;
                }
                for(let powerup in this.powerups){
                    this.powerups[powerup].update();
                    this.powerups[powerup].display();
                    var decay = this.powerups[powerup].decay();
                    var x1 = this.powerups[powerup].x;
                    var y1 = this.powerups[powerup].y;
                    var x2 = this.player.x;
                    var y2 = this.player.y;
                    var r1 = this.powerups[powerup].size;
                    var r2 = this.player.size * increase;
                    if(circleCollision(x1, y1, x2, y2, r1, r2)){
                        var type = this.powerups[powerup].type;
                        if(type == "Extra Life"){
                            this.extraLives += 1;
                        }
                        if(type == "Unlimited Power"){
                            this.energyPowerUp = 600;
                        }
                        this.powerups.splice(powerup, 1);
                    }
                    if(decay){
                        this.powerups.splice(powerup, 1);
                    }
                }
                for(let asteroid in this.asteroids){
                    this.asteroids[asteroid].update();
                    this.asteroids[asteroid].display();
                    let decay = this.asteroids[asteroid].decay();
                    if(circleCollision(this.player.x, this.player.y, this.asteroids[asteroid].x, this.asteroids[asteroid].y, this.player.size, this.asteroids[asteroid].size)){
                        if(!shieldOn){
                            if(this.extraLives <= 0){
                                this.scene = "dead";
                            }
                            else{
                                this.asteroids.splice(asteroid, 1);
                                this.extraLives -= 1;
                            }
                        }
                        else{
                            if(!this.asteroids[asteroid].golden){
                                for(let i = 0; i < this.numAsteroids; i++){
                                    this.asteroids.push(new Asteroid(false, false, this.player.x, this.player.y, this.player.x, this.player.y, this.asteroids[asteroid].size / this.numAsteroids * 2, 2, pSize = this.player.size));
                                }
                                this.score += Math.floor(this.asteroids[asteroid].size / increase);
                            }
                            else{
                                this.score += goldenAsteroidScore;
                            }
                            this.asteroids.splice(asteroid, 1);
                        }
                    }
                    if(decay){
                        this.asteroids.splice(asteroid, 1)
                    }
                }
            }
            else{
                ctx.fillStyle = "white";
                ctx.fillText("Paused", 130 * increase, 70 * increase);
            }
        }
        else if(this.scene == "dead"){
            ctx.fillStyle = "rgba(255, 40, 40)";
            ctx.fillRect(80 * increase, 60 * increase, 140 * increase, 30 * increase);
            ctx.fillStyle = "black";
            ctx.font = "40px Arial";
            ctx.fillText("You died with a score of " + this.score, 110 * increase, 75 * increase);
            ctx.font = "30px Arial";
            ctx.fillText("Press enter to restart", 125 * increase, 85 * increase)
            document.getElementById("difficulty-select").style.display = "block";
            document.getElementById("difficulty-select").style.pointerEvents = "auto";
            document.getElementById("gamemode-select").style.display = "block";
            document.getElementById("gamemode-select").style.pointerEvents = "auto";
        }
        else if(this.scene == "win"){
            ctx.fillStyle = "rgb(15, 200, 50)";
            ctx.fillRect(80 * increase, 60 * increase, 140 * increase, 30 * increase);
            ctx.fillStyle = "black";
            ctx.font = "40px Arial";
            ctx.fillText("You won with a score of " + this.score, 110 * increase, 75 * increase);
            ctx.font = "30px Arial";
            ctx.fillText("Press enter to restart", 125 * increase, 85 * increase)
            document.getElementById("difficulty-select").style.display = "block";
            document.getElementById("difficulty-select").style.pointerEvents = "auto";
            document.getElementById("gamemode-select").style.display = "block";
            document.getElementById("gamemode-select").style.pointerEvents = "auto";
        }
        else if(this.scene == "home"){
            //asteroid background
            if(this.homeAsteroids.length < this.homeAsteroidCount){
                var gold = Math.random() < this.homeGoldenAsteroidProbability;
                this.homeAsteroids.push(new Asteroid(true, gold, 0, 0, 0, 0));
            }
            for(let asteroid of this.homeAsteroids){
                asteroid.update();
                asteroid.display();
            }

            ctx.fillStyle = "white";
            ctx.font = "80px Arial";
            ctx.fillText("Bounce", 130 * increase, 70 * increase);
            document.getElementById("restart").style.display = "block";
            document.getElementById("restart").style.pointerEvents = "auto";
            document.getElementById("difficulty-select").style.display = "block";
            document.getElementById("difficulty-select").style.pointerEvents = "auto";
            document.getElementById("gamemode-select").style.display = "block";
            document.getElementById("gamemode-select").style.pointerEvents = "auto";
        }
    }
    this.jetPack = function(x, y){
        this.player.jetPack(x, y);
    };
    this.setDifficulty = function(difficulty){
        document.getElementById("difficulty-display").innerHTML = difficulty;
        if(difficulty == "Easy"){
            this.numAsteroids = 4;
            this.extraLifeProbability = 0.002;
            this.unlimitedPowerProbability = 0.002;
            this.powerupDecay = 700;
            this.goldenAsteroidProbability = 0.35;
            this.decayMultiplier = 0.2;
        }
        else if(difficulty == "Normal"){
            this.numAsteroids = 6;
            this.extraLifeProbability = 0.001;
            this.unlimitedPowerProbability = 0.001;
            this.powerupDecay = 450;
            this.goldenAsteroidProbability = 0.15;
            this.decayMultiplier = 0.5;
        }
        else{
            this.numAsteroids = 9;
            this.extraLifeProbability = 0.0005;
            this.unlimitedPowerProbability = 0.0005;
            this.powerupDecay = 300;
            this.goldenAsteroidProbability = 0.075;
            this.decayMultiplier = 0.8;
        }
    }
    this.setGamemode = function(gamemode){
        document.getElementById("gamemode-display").innerHTML = gamemode;
        this.gamemode = gamemode;
    }
    this.countDown = function(){
        if(this.gamemode == "Survival" && this.scene == "playing" && this.paused == false){
            this.timer -= 1;
            document.getElementById("countdown").innerHTML = this.timer;
            if(this.timer <= 0){
                this.scene = "win";
            }
        }
    };
}