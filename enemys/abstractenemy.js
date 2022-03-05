class AbstractEnemy {
    
    constructor(game, x, y) {
        Object.assign(game, x, y);
        this.velocity = { x: 0, y: 0};
    }

    chooseDirection(entity, distMin, distMax) {
        let direction = false;
        let distance = getDistance(this.x, this.y, entity.x, entity.y);
        if (distance > distMax) {
            direction = this.moveTowards(entity);
        } else if (distance < distMin) {
            direction = this.moveAway(entity);
        } else {
            direction = this.randomMovement();
        }
        return direction;
    }
    moveTowards(entity) {
        let isMovingX = false;
        let isMovingY = false;
        if(entity.x > this.x && !this.collideX) { //move right
            this.velocity.x = this.SET_VELOCITY.x * this.game.clockTick;
            isMovingX = true;
        } else if(entity.x < this.x && !this.collideX) { //move left
            this.velocity.x = -1 * (this.SET_VELOCITY.x * this.game.clockTick);
            isMovingX = true;
        } else {
            this.velocity.x = 0;
            isMovingX = false;
        }
        
        if(entity.y > this.y && !this.collideY) { //move down
            this.velocity.y = this.SET_VELOCITY.y * this.game.clockTick;
            isMovingY = true;
        } else if(entity.y < this.y && !this.collideY) { //move up
            this.velocity.y = -1 * (this.SET_VELOCITY.y * this.game.clockTick);
            isMovingY = true;
        } else {
            this.velocity.y = 0;
            isMovingY = false
        }
        if (isMovingX && isMovingY && !(this.collideX && this.collideY)) {
            this.velocity.x = (this.velocity.x / 2) * Math.sqrt(2);
            this.velocity.y = (this.velocity.y / 2) * Math.sqrt(2);
        }
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        return isMovingX || isMovingY;
    };

    moveAway(entity) {
        let isMovingX = false;
        let isMovingY = false;
        if(entity.x > this.x && !this.collideX) { //move right
            this.velocity.x = -this.SET_VELOCITY.x * this.game.clockTick;
            isMovingX = true;
        } else if(entity.x < this.x && !this.collideX) { //move left
            this.velocity.x = (this.SET_VELOCITY.x * this.game.clockTick);
            isMovingX = true;
        } else {
            this.velocity.x = 0;
            isMovingX = false;
        }
        
        if(entity.y > this.y && !this.collideY) { //move down
            this.velocity.y = -this.SET_VELOCITY.y * this.game.clockTick;
            isMovingY = true;
        } else if(entity.y < this.y && !this.collideY) { //move up
            this.velocity.y = (this.SET_VELOCITY.y * this.game.clockTick);
            isMovingY = true;
        } else {
            this.velocity.y = 0;
            isMovingY = false
        }
        
        if (isMovingX && isMovingY && !(this.collideX && this.collideY)) {
            this.velocity.x = (this.velocity.x / 2) * Math.sqrt(2);
            this.velocity.y = (this.velocity.y / 2) * Math.sqrt(2);
        }
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    return isMovingX || isMovingY;
    };

    randomMovement() {
        let randomDirectionX = getRandomInteger(-5350, 5350);
        let randomDirectionY = getRandomInteger(-5350, 5350);
        let isMovingX = false;
        let isMovingY = false;
        if((randomDirectionX > this.x) && !this.collideX) { //move right
            this.velocity.x = this.SET_VELOCITY.x * this.game.clockTick;
            isMovingX = true;
        } else if((randomDirectionX < this.x) && !this.collideX) { //move left
            this.velocity.x = -1 * (this.SET_VELOCITY.x * this.game.clockTick);
            isMovingX = true;
        } else {
            this.velocity.x = 0;
            isMovingX = false;
        }
        
        if((randomDirectionY > this.y) && !this.collideY) { //move down
            this.velocity.y = this.SET_VELOCITY.y * this.game.clockTick;
            isMovingY = true;
        } else if((randomDirectionY < this.y) && !this.collideY) { //move up
            this.velocity.y = -1 * (this.SET_VELOCITY.y * this.game.clockTick);
            isMovingY = true;
        } else {
            this.velocity.y = 0;
            isMovingY = false
        }
        if (isMovingX && isMovingY && !(this.collideX && this.collideY)) {
            this.velocity.x = (this.velocity.x / 2) * Math.sqrt(2);
            this.velocity.y = (this.velocity.y / 2) * Math.sqrt(2);
        }
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        return isMovingX || isMovingY;
    };

    collide() {
        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (that.velocity.y > 0) { // Traveling down.
                    if (entity instanceof AbstractEnvironment && that.BB.bottom >= entity.BB.top) {
                        that.collideX = false;
                        that.velocity.y = 0;
                        that.y -= 2; 
                        that.collideY = true;
                    }
                } 
                else if (that.velocity.y < 0 && that.BB.bottom > entity.BB.bottom) { // traveling up.
                    if (entity instanceof AbstractEnvironment && that.BB.top <= entity.BB.bottom) {
                        that.collideX = false;
                        that.velocity.y = 0;
                        that.y += 2; 
                        that.collideY = true;
                    }
                }
                else if (that.velocity.x > 0) { // traveling right.
                    if (entity instanceof AbstractEnvironment && that.BB.right >= entity.BB.left) {
                        that.collideY = false;
                        that.velocity.x = 0;
                        that.x -= 2; 
                        that.collideX = true;
                    }
                }
                else if (that.velocity.x < 0) { // traveling left.
                    if (entity instanceof AbstractEnvironment && that.BB.left <= entity.BB.right) {
                        that.collideY = false;
                        that.velocity.x = 0;
                        that.x += 2; 
                        that.collideX = true;
                    }
                }
            } else {
                that.collideX = false;
                that.collideY = false;
            }
        });
    }
}