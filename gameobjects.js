function Asteroid(autoPlace, golden, px, py, x, y, size = 10 * increase, speedMultiplier = 1, pSize = 4){
    this.size = size;
    this.vx = (Math.random() * 2 - 1) * speedMultiplier * increase;
    this.vy = (Math.random() * 2 - 1) * speedMultiplier * increase;
    this.decayFrames = (this.size * 3) * 20 + Math.random() * decayRandomness;
    this.frames = 0; 
    this.golden = golden;
    this.img = new Image();
    this.bouncedLast = false;
    if(this.golden){
        this.img.src = "yellowAsteroid.png";
    }
    else{
        this.img.src = "redAsteroid.png";
    }
    if(autoPlace){
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        while(dist(this.x, this.y, px, py) < 60 * increase){
            this.x = Math.random() * width;
            this.y = Math.random() * height;
        }
    }
    else{
        this.x = x;
        this.y = y;
        while(dist(this.x, this.y, px, py) < pSize * 4 * increase){
            this.x += this.vx;
            this.y += this.vy;
        }
    }
    this.decay = function(){
        this.frames += 1;
        if(this.frames > this.decayFrames * game.decayMultiplier){
            return true;
        }
        return false;
    }
    this.update = function(){
        this.x += this.vx;
        this.y += this.vy;
        var bouncedRight = 0;
        var bouncedUp = 0;
        if(this.x < 0){
            this.vx *= bounceLeft * -1;
            this.x += this.vx * 2;
            bouncedRight = 5;
        }
        if(this.x + this.size> width){
            this.vx *= bounceRight * -1;
            this.x += this.vx * 2;
            bouncedRight = -5;
        }
        if(this.y < 0){
            this.vy *= bounceUp * -1;
            this.y += this.vy * 2;
            bouncedUp = 5;
        }
        if(this.y + this.size> height){
            this.vy *= bounceDown * -1;
            this.y += this.vy * 2;
            bouncedUp = -5;
        }
        if(this.bouncedLast && (bouncedRight || bouncedUp)){
            this.x += bouncedRight;
            this.y += bouncedUp;
        }
        this.bouncedLast = (bouncedRight || bouncedUp);
    }
    this.display = function(){
        ctx.drawImage(this.img, this.x, this.y, this.size, this.size);
    }
}
function  Player(x, y, vx, vy, drag = 0.97, size = 4, color = "rgb(255, 255, 255)", bounceLeft = 1, bounceRight = 1, bounceUp = 1, bounceDown = 1){
    this.screenWidth = width;
    this.screenHeight = height;
    this.bounceLeft = bounceLeft;
    this.bounceRight = bounceRight;
    this.bounceUp = bounceUp;
    this.bounceDown = bounceDown;
    this.size = size;
    this.color = color;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.drag = drag;
    this.img = new Image();
    this.img.src = "Astronaut.png";
    this.bouncedLast = false;
    this.updateVelocities = function(){
        var bouncedRight = 0;
        var bouncedUp = 0;
        if(this.x < 0){
            this.vx *= this.bounceLeft * -1;
            this.x += this.vx * 2;
            bouncedRight = 5;
        }
        if(this.x + this.size  * increase> this.screenWidth){
            this.vx *= this.bounceRight * -1;
            this.x += this.vx * 2;
            bouncedRight = -5;
        }
        if(this.y < 0){
            this.vy *= this.bounceUp * -1;
            this.y += this.vy * 2;
            bouncedUp = 5;
        }
        if(this.y + this.size * increase> this.screenHeight){
            this.vy *= this.bounceDown * -1;
            this.y += this.vy * 2;
            bouncedUp = -5;
        }
        if(this.bouncedLast && (bouncedRight || bouncedUp)){
            this.x += bouncedRight;
            this.y += bouncedUp;
        }
        this.bouncedLast = (bouncedRight || bouncedUp);

        this.vx *= this.drag;
        this.vy *= this.drag;
    }
    this.jetPack = function(x, y){
        this.vx += x;
        this.vy += y;
    }
    this.updatePosition = function(){
        this.x += this.vx * increase;
        this.y += this.vy * increase;
    }
    this.display = function(){
        ctx.fillStyle = this.color;
        ctx.drawImage(this.img, this.x - 5, this.y - 5, 10 * increase, 10 * increase);
    }
}
function Powerup(x, y, vx, vy, type, powerupDecay_, size = 5 * increase){
    this.screenWidth = width;
    this.screenHeight = height;
    this.bounceLeft = 1;
    this.bounceRight = 1;
    this.bounceUp = 1;
    this.bounceDown = 1;
    this.x = x;
    this.y = y;
    this.vx = vx * increase;
    this.vy = vy * increase;
    this.type = type;
    this.size = size;
    this.decayFrames = powerupDecay_;
    this.frames = 0;
    this.update = function(){
        if(this.x < 0){
            this.vx *= this.bounceLeft * -1;
            this.x += this.vx * 2;
        }
        if(this.x + this.size > this.screenWidth){
            this.vx *= this.bounceRight * -1;
            this.x += this.vx * 2;
        }
        if(this.y < 0){
            this.vy *= this.bounceUp * -1;
            this.y += this.vy * 2;
        }
        if(this.y + this.size> this.screenHeight){
            this.vy *= this.bounceDown * -1;
            this.y += this.vy * 2;
        }
        this.x += this.vx;
        this.y += this.vy;
    }
    this.decay = function(){
        this.frames += 1;
        if(this.frames >= this.decayFrames){
            return 1;
        }
        return 0;
    }
    this.display = function(){
        ctx.fillStyle = "green";
        ctx.lineWidth = 3 * increase;
        if(this.type == "Extra Life"){
            ctx.strokeStyle = "red";
        }
        if(this.type == "Unlimited Power"){
            ctx.strokeStyle = "rgb(25, 50, 250)";
        }
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }
}

function ParticleSystem(x, y, count, speed, duration, color  = "white", speedVariation = 0.3, emissionRate = 0, emissionSize = 1, size = 5){
    this.particles = [];
    this.frames = 0;
    this.emissionRate = emissionRate;

    this.x = x;
    this.y = y;
    this.speed = speed;
    this.duration = duration;
    this.speedVariation = speedVariation;
    this.color = color;
    this.emissionSize = emissionSize;
    this.size  = size;

    for(let particle = 0; particle < count; particle += 1){
        this.particles.push(new Particle(x, y, speed + (Math.random() * speedVariation - speedVariation / 2),this.duration, this.color, size));
    }

    this.updatePosition = function(x, y){
        this.x = x;
        this.y = y;
    }
    this.update = function(){
        this.frames += 1;
        if(this.frames % this.emissionRate == 0){
            for(var i = 0; i < this.emissionSize; i++){
                this.particles.push(new Particle(this.x, this.y, this.speed + (Math.random() * this.speedVariation - this.speedVariation / 2), this.duration, this.color, this.size));
            }
        }
        for(let particle in this.particles){
            this.particles[particle].update();
            this.particles[particle].display();
            if(this.particles[particle].decay()){
                this.particles.splice(particle, 1);
            }
        }
    }
}

function Particle(x, y, speed, duration, color, size){
    this.angle = Math.random()* Math.PI * 2;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.color = color;
    this.duration = duration;
    this.frames = 0;
    this.size = size;

    this.update = function(){
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        this.frames += 1;
    }
    this.display = function(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
    this.decay = function(){
        if(this.frames > this.duration + (Math.random() * 10 - 5)){
            return 1;
        }
        return 0;
    }
}

function dist(x1, y1, x2, y2){
    return Math.hypot(x1 - x2, y1 - y2);
}
function circleCollision(x1, y1, x2, y2, r1, r2){
    if(dist(x1, y1, x2, y2) < r1 + r2)
        return true;
    return false;
}
function drawHealthBar(x, y, width, height, color, percent){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width * percent, height);
}

function crumbling_sound(){
    if(soundEffectsOn){
        num = Math.ceil( Math.random() * 3);
        if(num == 0){
            crumbling.play();
        }
        else if(num == 1){
            crumbling2.play();
        }
        else{
            crumbling3.play();
        }
    }
}

function gameover_sound(){
    if(soundEffectsOn){
        gameover.play();
    }
}

function powerup_sound(){
    if(soundEffectsOn){
        powerup.play();
    }
}

function hit_sound(){
    if(soundEffectsOn){
        hit.play();
    }
}

function roundedRect(x, y, width, height, radius){
    ctx.strokeStyle = "white";
    const PI = Math.PI;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.arc(x + width - radius, y + radius, radius, 1.5 * PI, 0);
    ctx.lineTo(x + width, y + height - radius);
    ctx.arc(x + width - radius, y + height - radius, radius, 0, PI / 2)
    ctx.lineTo(x + radius, y + height);
    ctx.arc(x + radius, y + height - radius, radius, PI / 2, PI);
    ctx.lineTo(x, y + radius);
    ctx.arc(x + radius, y + radius, radius, PI, 1.5 * PI);

    ctx.fill();
}