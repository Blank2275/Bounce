function Asteroid(autoPlace, golden, px, py, x, y, size = 10 * increase, speedMultiplier = 1, pSize = 4){
    this.size = size;
    this.vx = (Math.random() * 2 - 1) * speedMultiplier * increase;
    this.vy = (Math.random() * 2 - 1) * speedMultiplier * increase;
    this.decayFrames = (this.size * 3) * 20 + Math.random() * decayRandomness;
    this.frames = 0; 
    this.golden = golden;
    this.img = new Image();
    if(this.golden){
        this.img.src = "yellowAsteroid.png";
    }
    else{
        this.img.src = "redAsteroid.png";
    }
    if(autoPlace){
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        while(dist(this.x, this.y, px, py) < 120 * increase){
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

        if(this.x < 0){
            this.vx *= bounceLeft * -1;
            this.x += this.vx * 2;
        }
        if(this.x > width){
            this.vx *= bounceRight * -1;
            this.x += this.vx * 2;
        }
        if(this.y < 0){
            this.vy *= bounceUp * -1;
            this.y += this.vy * 2;
        }
        if(this.y > height){
            this.vy *= bounceDown * -1;
            this.y += this.vy * 2;
        }
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
    this.updateVelocities = function(){
        if(this.x < 0){
            this.vx *= this.bounceLeft * -1;
            this.x += this.vx * 2;
        }
        if(this.x > this.screenWidth){
            this.vx *= this.bounceRight * -1;
            this.x += this.vx * 2;
        }
        if(this.y < 0){
            this.vy *= this.bounceUp * -1;
            this.y += this.vy * 2;
        }
        if(this.y > this.screenHeight){
            this.vy *= this.bounceDown * -1;
            this.y += this.vy * 2;
        }
        var magnitude = Math.sqrt(this.vx ^ 2 + this.vy ^ 2);
        if(magnitude > 2){
            this.vx *= 1 - (4 * (1 - this.drag));
            this.vy *= 1 - (4 * (1 - this.drag));                       
        }
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
        if(this.x > this.screenWidth){
            this.vx *= this.bounceRight * -1;
            this.x += this.vx * 2;
        }
        if(this.y < 0){
            this.vy *= this.bounceUp * -1;
            this.y += this.vy * 2;
        }
        if(this.y > this.screenHeight){
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
function dist(x1, y1, x2, y2){
    return Math.hypot(x1 - x2, y1 - y2);
}
function circleCollision(x1, y1, x2, y2, r1, r2){
    if(dist(x1, y1, x2, y2) < r1 + r2){
        return true;
    }
    return false;
}
function drawHealthBar(x, y, width, height, color, percent){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width * percent, height);
}